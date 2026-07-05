import os
import json
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load database and RAG helpers
from database import search_similar_chunks, init_db
from duckduckgo_search import DDGS

# Find the project root directory and load .env
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(backend_dir)
dotenv_path = os.path.join(project_root, ".env")
load_dotenv(dotenv_path=dotenv_path)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("TutorBackend")

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    logger.warning("GEMINI_API_KEY is not set. Gemini features will fail.")
else:
    genai.configure(api_key=api_key)

def search_web(query: str, max_results: int = 3) -> str:
    """Searches the web using DuckDuckGo, with a fallback to Wikipedia Search if it fails."""
    logger.info(f"Searching the web for: '{query}'")
    
    # Try DuckDuckGo first
    backends = ["lite", "html", "auto"]
    for backend in backends:
        try:
            with DDGS() as ddgs:
                results = list(ddgs.text(query, backend=backend, max_results=max_results))
                if results:
                    logger.info(f"Web search succeeded using DuckDuckGo ({backend}).")
                    snippets = []
                    for r in results:
                        title = r.get("title", "No Title")
                        href = r.get("href", "#")
                        body = r.get("body", "")
                        snippets.append(f"Title: {title}\nURL: {href}\nContent: {body}")
                    return "\n\n---\n\n".join(snippets)
        except Exception as e:
            logger.warning(f"DuckDuckGo backend '{backend}' failed: {e}")
            continue
            
    # Fallback to Wikipedia search API
    logger.info("DuckDuckGo search returned no results or failed. Falling back to Wikipedia API search...")
    try:
        import urllib.request
        import urllib.parse
        import json
        import re
        
        # Clean query for URL
        safe_query = urllib.parse.quote_plus(query)
        url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={safe_query}&format=json"
        
        req = urllib.request.Request(
            url, 
            headers={"User-Agent": "FMGEStudyTutor/1.0 (contact: admin@example.com; medical study helper bot)"}
        )
        
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            search_results = data.get("query", {}).get("search", [])
            
            if not search_results:
                return "No search results found on the web or Wikipedia."
                
            snippets = []
            for item in search_results[:max_results]:
                title = item.get("title", "No Title")
                # Remove HTML tags like <span class="searchmatch"> from snippet
                clean_snippet = re.sub(r'<[^>]*>', '', item.get("snippet", ""))
                page_url = f"https://en.wikipedia.org/wiki/{urllib.parse.quote(title)}"
                snippets.append(f"Title: {title} (Wikipedia)\nURL: {page_url}\nContent: {clean_snippet}")
                
            logger.info("Wikipedia search succeeded.")
            return "\n\n---\n\n".join(snippets)
            
    except Exception as wiki_err:
        logger.error(f"Wikipedia fallback search failed: {wiki_err}")
        return f"Web search failed. DuckDuckGo and Wikipedia were both unreachable."

app = FastAPI(title="Aspira Edge AI Study Tutor Backend")

# Enable CORS for React Frontend (runs on localhost:8080)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev simplicity. Can be narrowed to ["http://localhost:8080"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageModel(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: list[MessageModel] = []

@app.on_event("startup")
def startup_event():
    """Initializes the database schema on server startup."""
    try:
        init_db()
        logger.info("Database check passed on startup.")
    except Exception as e:
        logger.error(f"Database initialization failed on startup: {e}")

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "database": "connected" if os.getenv("DATABASE_URL") else "missing_config"}

@app.post("/api/chat")
async def chat_tutor(request: ChatRequest):
    user_query = request.message
    history = request.history
    if not user_query.strip():
        raise HTTPException(status_code=400, detail="Query message cannot be empty.")
    
    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API Key is not configured on the server.")

    try:
        # Step 1: Embed user query
        logger.info(f"Generating embedding for query: '{user_query}'")
        query_embedding_response = genai.embed_content(
            model="models/gemini-embedding-001",
            content=user_query,
            task_type="retrieval_query"
        )
        query_vector = query_embedding_response["embedding"]

        # Step 2: Retrieve matches
        logger.info("Searching PostgreSQL for similar book chunks...")
        similar_chunks = search_similar_chunks(query_vector, limit=4)
        
        # Determine if we are outside the RAG (best match similarity < 0.60 or no chunks)
        RAG_SIMILARITY_THRESHOLD = 0.60
        is_outside_rag = not similar_chunks or similar_chunks[0]["similarity"] < RAG_SIMILARITY_THRESHOLD
        
        web_context = ""
        references = []
        
        if is_outside_rag:
            best_score = similar_chunks[0]["similarity"] if similar_chunks else 0.0
            logger.info(f"RAG search best similarity ({best_score:.4f}) is below threshold ({RAG_SIMILARITY_THRESHOLD}). Triggering web search tool...")
            web_context = search_web(user_query, max_results=3)
            references.append({"source_file": "Web Search (DuckDuckGo)", "page_number": 1})
            
            # Include local chunks in citations if they are somewhat relevant (>0.40)
            if similar_chunks:
                for chunk in similar_chunks:
                    if chunk["similarity"] > 0.40:
                        references.append({"source_file": chunk["source_file"], "page_number": chunk["page_number"]})
        else:
            logger.info(f"Query is within RAG (best similarity {similar_chunks[0]['similarity']:.4f} >= {RAG_SIMILARITY_THRESHOLD}).")
            references = [
                {"source_file": chunk["source_file"], "page_number": chunk["page_number"]}
                for chunk in similar_chunks
            ]

        # Build context block
        context_blocks = []
        if not is_outside_rag:
            for idx, chunk in enumerate(similar_chunks):
                context_blocks.append(
                    f"Snippet #{idx+1} (Source: {chunk['source_file']}, Page {chunk['page_number']}):\n{chunk['text']}"
                )
        else:
            context_blocks.append(f"Web Search Results for '{user_query}':\n{web_context}")
            if similar_chunks:
                context_blocks.append("Potential local references (may be low relevance):")
                for idx, chunk in enumerate(similar_chunks[:2]):
                    context_blocks.append(
                        f"Local Snippet #{idx+1} (Source: {chunk['source_file']}, Page {chunk['page_number']}):\n{chunk['text']}"
                    )
        context_text = "\n\n---\n\n".join(context_blocks)

        # Step 3: Build dynamic system prompt
        system_prompt = (
            "You are a helpful, disciplined FMGE (Foreign Medical Graduate Examination) medical study tutor.\n"
            "Answer the student's question accurately and clearly. Proactively use the context snippets below (which contain textbook fragments and/or web search results) to answer the query.\n"
            "If you are using the Web Search Results to answer, explicitly mention at the beginning of your explanation that the information comes from a Web Search (e.g., 'Based on web search results...').\n"
            "Be educational, and use clean markdown format with bold text, bullet points, or lists for readability.\n"
            "Crucially, at the end of your response, always ask the student a brief, relevant follow-up or conceptual question to test their understanding and keep them engaged.\n\n"
            "Context Snippets:\n"
            "=======================\n"
            f"{context_text}\n"
            "=======================\n"
        )

        logger.info("Firing Gemini streaming API...")
        
        # Step 4: Stream response using Gemini & SSE
        def event_stream():
            # First, send the retrieved references metadata
            yield f"data: {json.dumps({'references': references})}\n\n"
            
            try:
                # Use gemini-2.5-flash for rapid tutoring responses
                # We pass system_prompt as system_instruction
                model = genai.GenerativeModel(
                    "models/gemini-2.5-flash",
                    system_instruction=system_prompt
                )
                
                # Format history for Gemini API (user role stays user, model role becomes model)
                contents = []
                for msg in history:
                    role = "user" if msg.role == "user" else "model"
                    contents.append({
                        "role": role,
                        "parts": [msg.content]
                    })
                
                # Append current user query
                contents.append({
                    "role": "user",
                    "parts": [f"Student Question: {user_query}"]
                })

                chat_response = model.generate_content(
                    contents=contents,
                    stream=True
                )
                
                for chunk in chat_response:
                    try:
                        text = chunk.text
                        if text:
                            # Send text payload to SSE listener
                            yield f"data: {json.dumps({'text': text})}\n\n"
                    except Exception as chunk_err:
                        logger.error(f"Error reading chunk text: {chunk_err}")
                        continue
                        
            except Exception as stream_err:
                logger.error(f"Error during streaming generation: {stream_err}")
                yield f"data: {json.dumps({'error': 'An error occurred during response generation.'})}\n\n"

        return StreamingResponse(event_stream(), media_type="text/event-stream")

    except Exception as e:
        logger.error(f"Error in chat tutor endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

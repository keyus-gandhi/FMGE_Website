import os
import glob
import pypdf
import google.generativeai as genai
from dotenv import load_dotenv
from database import init_db, insert_chunk, clear_all_chunks

# Find the project root directory and load .env
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(backend_dir)
dotenv_path = os.path.join(project_root, ".env")
load_dotenv(dotenv_path=dotenv_path)

# Verify Gemini API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("WARNING: GEMINI_API_KEY is not set in your .env file!")
else:
    genai.configure(api_key=api_key)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def chunk_text(text, chunk_size=250, overlap=50):
    """Splits a body of text into chunks of chunk_size words with overlap."""
    words = text.split()
    if len(words) <= chunk_size:
        return [" ".join(words)]
    
    chunks = []
    step = chunk_size - overlap
    for i in range(0, len(words), step):
        chunk_words = words[i:i + chunk_size]
        chunks.append(" ".join(chunk_words))
        # Stop once we include the end of the text
        if i + chunk_size >= len(words):
            break
            
    return chunks

def generate_embedding(text):
    """Requests a vector embedding for a block of text from Google Gemini API."""
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not configured.")
    
    response = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type="retrieval_document"
    )
    return response["embedding"]

def parse_pdf(file_path):
    """Reads a PDF page-by-page, returning a list of (page_num, text_content)."""
    pages_data = []
    print(f"Reading PDF: {os.path.basename(file_path)}...")
    try:
        reader = pypdf.PdfReader(file_path)
        for idx, page in enumerate(reader.pages):
            page_num = idx + 1
            text = page.extract_text() or ""
            # Strip extra whitespaces
            text = " ".join(text.split())
            if text.strip():
                pages_data.append((page_num, text))
    except Exception as e:
        print(f"Failed to parse PDF {file_path}: {e}")
    return pages_data

def parse_text_file(file_path):
    """Reads a text file and returns a list containing (1, text_content)."""
    print(f"Reading Text File: {os.path.basename(file_path)}...")
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            # Clean up whitespace
            content = " ".join(content.split())
            if content.strip():
                return [(1, content)]
    except Exception as e:
        print(f"Failed to parse text file {file_path}: {e}")
    return []

def main():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        print(f"Created data directory at: {DATA_DIR}")
        
    # Write a quick instructions file if empty
    instruction_file = os.path.join(DATA_DIR, "instruction.txt")
    if not os.listdir(DATA_DIR):
        with open(instruction_file, "w", encoding="utf-8") as f:
            f.write("Place your textbook PDF files in this 'data' folder.\n"
                    "The offline_setup.py script will scan this directory, chunk the text, generate embeddings via Gemini API, and store them in PostgreSQL.")
        print(f"Added instructions file at {instruction_file}.")

    # Scan for files
    pdf_files = glob.glob(os.path.join(DATA_DIR, "*.pdf"))
    text_files = glob.glob(os.path.join(DATA_DIR, "*.txt"))
    md_files = glob.glob(os.path.join(DATA_DIR, "*.md"))
    
    # Filter out instruction file
    text_files = [f for f in text_files if os.path.basename(f) != "instruction.txt"]
    all_files = pdf_files + text_files + md_files
    
    if not all_files:
        print(f"\nNo textbooks found in {DATA_DIR}!")
        print("Please place at least one .pdf, .txt, or .md textbook in the data directory and run this script again.")
        return

    print("\n--- Initializing Database ---")
    try:
        init_db()
    except Exception as db_err:
        print(f"Could not connect to PostgreSQL. Please check your DATABASE_URL in .env: {db_err}")
        return

    # Clear previous setup to avoid duplication
    clear_all_chunks()

    print(f"\nFound {len(all_files)} file(s) to process.")
    for file_path in all_files:
        filename = os.path.basename(file_path)
        ext = os.path.splitext(filename)[1].lower()
        
        pages_content = []
        if ext == ".pdf":
            pages_content = parse_pdf(file_path)
        elif ext in [".txt", ".md"]:
            pages_content = parse_text_file(file_path)
            
        if not pages_content:
            print(f"Skipping empty or failed file: {filename}")
            continue
            
        print(f"Processing {filename} ({len(pages_content)} pages/sections)...")
        total_chunks = 0
        for page_num, text in pages_content:
            # Chunk the page text
            chunks = chunk_text(text, chunk_size=250, overlap=50)
            for chunk in chunks:
                if not chunk.strip():
                    continue
                try:
                    # Generate embedding vector
                    vector = generate_embedding(chunk)
                    # Store in PostgreSQL
                    insert_chunk(chunk, page_num, filename, vector)
                    total_chunks += 1
                except Exception as api_err:
                    print(f"Error during vectorization of page {page_num}: {api_err}")
                    print("Ensure your GEMINI_API_KEY and internet connection are valid.")
                    return
        print(f"Successfully processed {filename}. Stored {total_chunks} chunks.")
        
    print("\n========================================")
    print("Vectorization complete!")
    print("The PostgreSQL database is now ready for query searches.")
    print("========================================")

if __name__ == "__main__":
    main()

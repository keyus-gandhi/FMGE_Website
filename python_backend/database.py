import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Find the project root directory and load .env
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(backend_dir)
dotenv_path = os.path.join(project_root, ".env")
load_dotenv(dotenv_path=dotenv_path)

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """Establishes connection to the PostgreSQL database."""
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL is not set in the environment variables (.env).")
    return psycopg2.connect(DATABASE_URL)

def init_db():
    """Initializes the database schema by creating the book_chunks table."""
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS book_chunks (
                    id SERIAL PRIMARY KEY,
                    text TEXT NOT NULL,
                    page_number INTEGER NOT NULL,
                    source_file VARCHAR(255) NOT NULL,
                    embedding TEXT NOT NULL
                );
            """)
            conn.commit()
            print("PostgreSQL Database initialized successfully.")
    except Exception as e:
        conn.rollback()
        print(f"Error initializing PostgreSQL database: {e}")
        raise e
    finally:
        conn.close()

def insert_chunk(text, page_number, source_file, embedding):
    """Inserts a textbook chunk and its vector embedding (list of floats) into PostgreSQL."""
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # Serialize list of floats to JSON string
            embedding_json = json.dumps(embedding)
            cur.execute("""
                INSERT INTO book_chunks (text, page_number, source_file, embedding)
                VALUES (%s, %s, %s, %s)
            """, (text, page_number, source_file, embedding_json))
            conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"Error inserting chunk: {e}")
        raise e
    finally:
        conn.close()

def cosine_similarity(v1, v2):
    """Computes the cosine similarity between two numeric vectors in pure Python."""
    dot_product = sum(a * b for a, b in zip(v1, v2))
    magnitude_v1 = sum(a * a for a in v1) ** 0.5
    magnitude_v2 = sum(b * b for b in v2) ** 0.5
    if not magnitude_v1 or not magnitude_v2:
        return 0.0
    return dot_product / (magnitude_v1 * magnitude_v2)

def search_similar_chunks(query_vector, limit=4):
    """
    Retrieves chunks from PostgreSQL and performs cosine similarity search.
    Returns the top 'limit' closest matches.
    """
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Fetch the candidate chunks and embeddings
            cur.execute("SELECT id, text, page_number, source_file, embedding FROM book_chunks;")
            rows = cur.fetchall()
            
            scored_chunks = []
            for row in rows:
                try:
                    # Deserialize embedding JSON string back to list of floats
                    chunk_vector = json.loads(row['embedding'])
                    score = cosine_similarity(query_vector, chunk_vector)
                    
                    scored_chunks.append({
                        "id": row["id"],
                        "text": row["text"],
                        "page_number": row["page_number"],
                        "source_file": row["source_file"],
                        "similarity": score
                    })
                except Exception as parse_err:
                    print(f"Error parsing embedding for row {row['id']}: {parse_err}")
                    continue
            
            # Sort by similarity descending
            scored_chunks.sort(key=lambda x: x["similarity"], reverse=True)
            return scored_chunks[:limit]
    except Exception as e:
        print(f"Error performing similarity search: {e}")
        raise e
    finally:
        conn.close()

def clear_all_chunks():
    """Truncates the book_chunks table to start fresh."""
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("TRUNCATE TABLE book_chunks RESTART IDENTITY;")
            conn.commit()
            print("Cleared all textbook records from database.")
    except Exception as e:
        conn.rollback()
        print(f"Error clearing book chunks: {e}")
        raise e
    finally:
        conn.close()

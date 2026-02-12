from notebooklm_mcp.auth import load_cached_tokens
from notebooklm_mcp.api_client import NotebookLMClient
import sys

def verify():
    print("Checking for cached tokens...")
    tokens = load_cached_tokens()
    if not tokens:
        print("No cached tokens found. Please run the authentication command first.")
        sys.exit(1)
    
    print("Tokens found. Attempting to list notebooks...")
    client = NotebookLMClient(cookies=tokens.cookies, csrf_token=tokens.csrf_token, session_id=tokens.session_id)
    
    try:
        notebooks = client.list_notebooks()
        print(f"SUCCESS! Found {len(notebooks)} notebooks.")
        for nb in notebooks:
            print(f"- {nb.title} (ID: {nb.id})")
        sys.exit(0)
    except Exception as e:
        print(f"Failed to list notebooks: {e}")
        sys.exit(1)

if __name__ == "__main__":
    verify()

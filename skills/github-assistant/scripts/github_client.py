import os
import sys
import json
import urllib.request
import urllib.error

# Global variables for pathing
TOKEN_FILE = r"C:\Users\allan_i8j3zcy\.gemini\config\plugins\github-assistant-plugin\.github_pat"

def get_token():
    """Retrieve the GitHub PAT from environment variable or local config file."""
    # Check env first
    token = os.environ.get("GITHUB_PAT")
    if token:
        return token.strip()
    
    # Check file
    if os.path.exists(TOKEN_FILE):
        try:
            with open(TOKEN_FILE, "r", encoding="utf-8") as f:
                return f.read().strip()
        except Exception:
            pass
    return None

def make_request(url, method="GET", data=None, token=None):
    """Make an authenticated HTTP request using standard library urllib."""
    if not token:
        token = get_token()
        if not token:
            print(json.dumps({"status": "error", "message": "GitHub Personal Access Token not found. Please supply it first."}))
            sys.exit(1)
            
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "Antigravity-Agent-Coding-Assistant",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    
    req_data = None
    if data is not None:
        req_data = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"
        
    req = urllib.request.Request(url, method=method, data=req_data, headers=headers)
    
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            res_headers = dict(response.info())
            
            # OAuth scopes are provided in the response headers by GitHub
            scopes = res_headers.get("X-OAuth-Scopes", res_headers.get("x-oauth-scopes", ""))
            scopes_list = [s.strip() for s in scopes.split(",")] if scopes else []
            
            return json.loads(res_body) if res_body else {}, scopes_list
            
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        try:
            err_json = json.loads(err_body)
            msg = err_json.get("message", "HTTP Error")
        except Exception:
            msg = err_body if err_body else str(e)
        print(json.dumps({"status": "error", "message": f"GitHub API Error: {e.code} - {msg}"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Connection Error: {str(e)}"}))
        sys.exit(1)

def cmd_check_token(token=None):
    """Verify that the GitHub PAT works and display token metadata."""
    res, scopes = make_request("https://api.github.com/user", token=token)
    print(json.dumps({
        "status": "success",
        "username": res.get("login"),
        "name": res.get("name"),
        "scopes": scopes
    }, indent=2))

def cmd_create_repo(name, private=False, description=""):
    """Create a new repository under the user's account."""
    payload = {
        "name": name,
        "private": private,
        "description": description,
        "auto_init": False
    }
    res, _ = make_request("https://api.github.com/user/repos", method="POST", data=payload)
    print(json.dumps({
        "status": "success",
        "repo_name": res.get("name"),
        "html_url": res.get("html_url"),
        "clone_url": res.get("clone_url")
    }, indent=2))

def cmd_list_repos():
    """List the repositories owned by the user."""
    res, _ = make_request("https://api.github.com/user/repos?per_page=100&type=owner")
    repos = []
    for r in res:
        repos.append({
            "name": r.get("name"),
            "html_url": r.get("html_url"),
            "private": r.get("private"),
            "description": r.get("description")
        })
    print(json.dumps({
        "status": "success",
        "repositories": repos
    }, indent=2))

def print_usage():
    print("GitHub API Client Helper Utility")
    print("Usage:")
    print("  python github_client.py check-token [<optional_token>]")
    print("  python github_client.py list-repos")
    print("  python github_client.py create-repo --name <name> [--private] [--desc <description>]")
    sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print_usage()
        
    cmd = sys.argv[1].lower()
    
    if cmd == "check-token":
        token = sys.argv[2] if len(sys.argv) > 2 else None
        cmd_check_token(token=token)
        
    elif cmd == "list-repos":
        cmd_list_repos()
        
    elif cmd == "create-repo":
        # Basic manual parser for arguments
        name = None
        private = False
        desc = ""
        
        args = sys.argv[2:]
        i = 0
        while i < len(args):
            arg = args[i]
            if arg == "--name" and i + 1 < len(args):
                name = args[i+1]
                i += 2
            elif arg == "--private":
                private = True
                i += 1
            elif arg == "--desc" and i + 1 < len(args):
                desc = args[i+1]
                i += 2
            else:
                i += 1
                
        if not name:
            print(json.dumps({"status": "error", "message": "Missing required argument --name"}))
            sys.exit(1)
            
        cmd_create_repo(name, private, desc)
        
    else:
        print_usage()

if __name__ == "__main__":
    main()

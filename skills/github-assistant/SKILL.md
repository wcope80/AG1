---
name: github-assistant
description: "Trigger this skill when the user wants to interact with their GitHub account, verify their token, list repositories, or create new remote repositories on GitHub. Use this skill whenever the user mentions pushing to GitHub, setting up a remote repo, or providing a Personal Access Token (PAT)."
---

# GitHub Assistant Skill

This skill allows the agent to interact with the GitHub REST API securely using the user's Personal Access Token (PAT). It uses a bundled Python helper script (`scripts/github_client.py`) to verify tokens, list repositories, and create new repositories.

## Storage of the Personal Access Token (PAT)
For security, the GitHub Personal Access Token (PAT) should **NEVER** be committed to Git or hardcoded in any workspace file.
Instead, store the token in the global plugin environment file:
`C:\Users\allan_i8j3zcy\.gemini\config\plugins\github-assistant-plugin\.github_pat`

The helper script will automatically look for the token at this path or in the `GITHUB_PAT` environment variable.

---

## Workflow Instructions

### 1. Verify Credentials
When the user supplies a PAT, save it to the token file and verify it:
```bash
# Save the token
echo "YOUR_PAT_HERE" > C:\Users\allan_i8j3zcy\.gemini\config\plugins\github-assistant-plugin\.github_pat

# Verify credentials
python C:\Users\allan_i8j3zcy\.gemini\config\plugins\github-assistant-plugin\skills\github-assistant\scripts\github_client.py check-token
```

### 2. Create a Remote Repository
To create a new repository on GitHub:
```bash
python C:\Users\allan_i8j3zcy\.gemini\config\plugins\github-assistant-plugin\skills\github-assistant\scripts\github_client.py create-repo --name "AG1" --private false --description "My premium developer workspace"
```

### 3. List User Repositories
To view all public and private repositories under the account:
```bash
python C:\Users\allan_i8j3zcy\.gemini\config\plugins\github-assistant-plugin\skills\github-assistant\scripts\github_client.py list-repos
```

---

## Bundled Helper Script Interface
The `github_client.py` script responds with standard JSON to allow clean parsing:
- Success check-token response: `{"status": "success", "username": "wcope80", "scopes": ["repo", "read:org"]}`
- Success create-repo response: `{"status": "success", "repo_name": "AG1", "html_url": "https://github.com/wcope80/AG1", "clone_url": "https://github.com/wcope80/AG1.git"}`

# AG1 // Developer Workspace Portal & AI Skills Hub 🚀

Welcome to **AG1**, a premium space-themed developer workspace portal and AI-agent skills hub customized for **wcope80**. 

This repository serves as both a beautiful, interactive personal developer cockpit and a repository of custom capability skills that can be utilized by agentic AI coding assistants.

---

## 🌌 Interactive Workspace Portal

The portal is a high-fidelity, responsive single-page application built using pure, vanilla technologies. It serves as your main workspace dashboard:

*   **Space Particle Background**: An interactive, GPU-friendly HTML5 canvas particle background that shifts dynamically in response to cursor position and hover states.
*   **Nebula Glassmorphism UI**: High-fidelity modern styling using a tailored HSL palette (electric indigos, neon magentas, and deep space neutrals) with vibrant backdrop filters and glow micro-interactions.
*   **Focus Session Timer**: A fully functional, visual circular Pomodoro timer utilizing dynamic SVG circular progress pathing for deep-work sessions.
*   **Persistent Quick Notes**: A lightweight, modern note-taking widget using `localStorage` persistence so notes survive browser refreshes.
*   **Environment & Git Hub**: A real-time status visualizer linked to this repository's structure and Git configurations.

### Running the Portal Locally
To open and interact with the portal immediately, simply open `index.html` in any modern web browser or run:
```bash
# Windows
start index.html
```

---

## 🛠️ Custom AI Skills Hub (`skills/`)

This repository is equipped with specialized **Skills**—reusable instructions, python tools, and reference playbooks designed for advanced agentic AI coding loops:

### 1. `skill-creator` (Meta-Skill)
*   **Directory**: `skills/skill-creator/`
*   **Purpose**: Allows agentic AIs to iteratively design, draft, refine, benchmark, and package new custom capabilities.
*   **Features**: Includes Python automated test evaluators (`run_loop.py`), formal graders, and a responsive HTML review viewer (`generate_review.py`) to let you review changes visually.

### 2. `github-assistant`
*   **Directory**: `skills/github-assistant/`
*   **Purpose**: Manages remote repository interactions programmatically using standard Python REST API requests and Personal Access Tokens (PATs).
*   **Features**: Verifies tokens, lists user repositories, creates remote repos, and integrates them with local git config without needing external system dependencies or CLI engines.

### 3. `web-search`
*   **Directory**: `skills/web-search/`
*   **Purpose**: Integrates Tavily and Exa search APIs via the `inference.sh` CLI for advanced external data extraction, RAG pipelines, and R&D.

---

## 📁 Repository Structure

```text
AG1/
├── index.html            # Premium glassmorphic portal entry point
├── style.css             # Harmonious HSL styling & micro-animations
├── app.js                # Core JS logic, particle math, and widget states
├── README.md             # Project documentation (You are here!)
└── skills/               # Reusable AI-agent capability skills
    ├── skill-creator/    # Meta skill builder, testers, and eval-viewers
    ├── github-assistant/ # Token verify & repo create REST integration
    └── web-search/       # Tavily/Exa search instruction set
```

---

## 🔒 Security Practices
Your GitHub Personal Access Token (PAT) is kept completely safe. It is stored inside a git-ignored system file (`.github_pat`) in your global config, ensuring that no credentials are ever committed, logged, or exposed in this public repository.

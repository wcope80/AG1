---
name: web-search
description: "Web search and content extraction with Tavily and Exa via inference.sh CLI. Apps: Tavily Search, Tavily Extract, Exa Search, Exa Answer, Exa Extract. Capabilities: AI-powered search, content extraction, direct answers, research. Use for: research, RAG pipelines, fact-checking, content aggregation, agents. Triggers: web search, tavily, exa, search api, content extraction, research, internet search, ai search, search assistant, web scraping, rag, perplexity alternative"
allowed-tools: Bash(belt *)
---

> **Install the belt CLI skill:** `npx skills add belt-sh/cli`

# Web Search & Extraction

Search the web and extract content via [inference.sh](https://inference.sh) CLI.

![Web Search & Extraction](https://cloud.inference.sh/app/files/u/4mg21r6ta37mpaz6ktzwtt8krr/01kgndqjxd780zm2j3rmada6y8.jpeg)

## Quick Start

> Requires inference.sh CLI (`belt`). [Install instructions](https://raw.githubusercontent.com/inference-sh/skills/refs/heads/main/cli-install.md)

```bash
belt login

# Search the web
belt app run tavily/search-assistant --input '{"query": "latest AI developments 2024"}'
```


## Available Apps

### Tavily

| App | App ID | Description |
|-----|--------|-------------|
| Search Assistant | `tavily/search-assistant` | AI-powered search with answers |
| Extract | `tavily/extract` | Extract content from URLs |

### Exa

| App | App ID | Description |
|-----|--------|-------------|
| Search | `exa/search` | Smart web search with AI |
| Answer | `exa/answer` | Direct factual answers |
| Extract | `exa/extract` | Extract and analyze web content |

## Examples

### Tav

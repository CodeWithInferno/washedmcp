# WashedMCP — Token-Optimized Semantic Code Search

An MCP (Model Context Protocol) server that provides **token-efficient semantic code search** with automatic context expansion for AI coding assistants.

## The Problem

When AI assistants search codebases, they get isolated results without context:
- Need multiple searches to understand call chains
- Waste tokens on redundant lookups
- Lose context between tool calls

## The Solution

**WashedMCP** returns comprehensive context in a single search:

```
Query: "user validation logic"

FOUND: validate() in src/auth.js:42 (82% match)

CODE:
  function validate(data) {
    if (!checkEmail(data.email)) return false;
    if (!checkPassword(data.password)) return false;
    return sanitize(data);
  }

CALLS: checkEmail, checkPassword, sanitize
CALLED BY: processUser, createUser
SAME FILE: [sanitize, normalizeInput, validateSchema]
```

One search → full context → immediate action.

## Features

- **Semantic Search** — Find code by meaning, not just keywords
- **Context Expansion** — Automatically include callers/callees
- **Code Graph** — Track function relationships (calls, called_by)
- **TOON Format** — Token-Optimized Object Notation (~30-40% fewer tokens than JSON)
- **Multi-Language** — Python, JavaScript, TypeScript, JSX, TSX

## Install

### One-liner (recommended)
```bash
curl -fsSL https://raw.githubusercontent.com/clarsbyte/washedmcp/main/install.sh | bash
```
Restart Claude Code. Done.

### Manual
```bash
pip install washedmcp
```

Add to `~/.claude.json`:
```json
{
  "mcpServers": {
    "washedmcp": {
      "command": "washedmcp"
    }
  }
}
```
Restart Claude Code.

## Usage

After install, you get 3 tools in Claude Code:

```
# Index your project first
index_codebase("/path/to/your/project")

# Search semantically
search_code("authentication logic")

# Check status
get_index_status()
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `index_codebase` | Index a codebase for semantic search |
| `search_code` | Search with context expansion (`depth` parameter) |
| `get_index_status` | Check if codebase is indexed |

## How It Works

```
┌─────────────────────────────────────────────────┐
│               CONTEXT EXPANSION                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Query: "validation failing"                     │
│              │                                   │
│              ▼                                   │
│  ┌────────────────────────────┐                 │
│  │  1. Semantic Search        │                 │
│  │     (embeddings + cosine)  │                 │
│  └────────────────────────────┘                 │
│              │                                   │
│              ▼                                   │
│  ┌────────────────────────────┐                 │
│  │  2. Context Expansion      │                 │
│  │     • CALLS: [...]         │                 │
│  │     • CALLED BY: [...]     │                 │
│  │     • SAME FILE: [...]     │                 │
│  └────────────────────────────┘                 │
│              │                                   │
│              ▼                                   │
│  ┌────────────────────────────┐                 │
│  │  3. TOON Output            │                 │
│  │     (token-efficient)      │                 │
│  └────────────────────────────┘                 │
│                                                  │
└─────────────────────────────────────────────────┘
```

## Tech Stack

- **Parsing**: tree-sitter (multi-language AST extraction)
- **Embeddings**: sentence-transformers/all-MiniLM-L6-v2
- **Vector DB**: ChromaDB (persistent, cosine similarity)
- **MCP**: fastmcp
- **Summarization**: Google Generative AI (optional)

## Project Structure

```
washedmcp/
├── washedmcp/            # Python package
│   ├── parser.py         # AST parsing + call extraction
│   ├── embedder.py       # Embedding generation
│   ├── database.py       # ChromaDB + relationships
│   ├── indexer.py        # Indexing orchestration
│   ├── searcher.py       # Search + context expansion
│   ├── toon_formatter.py # TOON output format
│   └── mcp_server.py     # MCP server entry point
├── install.sh            # One-line installer
├── pyproject.toml        # Package config
└── requirements.txt      # Dependencies
```

## Context Expansion Depth

Control how many hops of relationships to include:

- `depth=1` (default): Direct callers + callees
- `depth=2`: Include callers of callers (for debugging chains)

```python
# MCP tool call
search_code(query="validation", depth=2)
```

## License

MIT

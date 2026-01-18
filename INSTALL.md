# WashedMCP Installation Guide

## Prerequisites

- **Python 3.10+** 
- **Claude Code** installed

## Quick Install (Recommended)

Run this single command:

```bash
curl -fsSL https://raw.githubusercontent.com/clarsbyte/washedmcp/main/install.sh | bash
```

Then restart Claude Code. Done!

---

## Manual Install

### Step 1: Install the package

```bash
pip install washedmcp
```

### Step 2: Add to Claude Code config

Open `~/.claude.json` and add washedmcp to the `mcpServers` section:

```json
{
  "mcpServers": {
    "washedmcp": {
      "command": "washedmcp"
    }
  }
}
```

If the file doesn't exist, create it with just that content.

### Step 3: Restart Claude Code

Close and reopen Claude Code to load the new MCP server.

---

## Verify Installation

In Claude Code, you should now have 3 new tools:

| Tool | What it does |
|------|--------------|
| `index_codebase` | Index a project for semantic search |
| `search_code` | Search code by meaning |
| `get_index_status` | Check if project is indexed |

Try it:
```
index_codebase("/path/to/your/project")
```

Then:
```
search_code("authentication logic")
```

---

## Troubleshooting

### "washedmcp command not found"

Make sure pip installed to a location in your PATH:

```bash
# Check where it installed
pip show washedmcp

# If using pip with --user, add to PATH
export PATH="$HOME/.local/bin:$PATH"
```

### "Python 3.10+ required"

Check your Python version:

```bash
python3 --version
```

If below 3.10, upgrade Python first.

### MCP not loading in Claude Code

1. Make sure `~/.claude.json` is valid JSON
2. Check the mcpServers section exists
3. Restart Claude Code completely (not just reload)

### Index taking too long

For large codebases, indexing can take a few minutes. The first run downloads the embedding model (~90MB).

---

## Uninstall

```bash
pip uninstall washedmcp
```

Then remove the `washedmcp` entry from `~/.claude.json`.

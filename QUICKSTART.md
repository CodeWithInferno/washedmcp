# WashedMCP Quick Start

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/clarsbyte/washedmcp/main/setup-claude.sh | bash
```

Restart Claude Code.

---

## Usage

In Claude Code, just talk naturally:

```
Index this codebase
```

```
Search for "user authentication"
```

```
Find where errors are handled
```

---

## What you get

```
You: "search for validation logic"

WashedMCP returns:

  FOUND: validate() in src/auth.js:42 (85% match)

  CODE:
    function validate(data) {
      if (!checkEmail(data.email)) return false;
      return sanitize(data);
    }

  CALLS: checkEmail, sanitize
  CALLED BY: processUser, createUser
  SAME FILE: [sanitize, normalizeInput]
```

One search = full context = no follow-up searches needed.

---

## Tips

- First index is slow (~1 min) - embedding model downloads once
- Say "reindex this codebase" after big changes
- Use "search with depth 2" for caller-of-caller chains

---

## Troubleshooting

**Python 3.14 error?** `brew install python@3.12`

**Command not found?** `export PATH="$HOME/.local/bin:$PATH"`

---

Full docs: [README.md](README.md)

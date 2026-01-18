---
description: Install an MCP server with automatic API key prompting
---

# Install MCP Server

You are helping the user install an MCP server. The user wants to install: $ARGUMENTS

## Steps

1. **Search for the server**: Use `mcp__washedmcp__searchSmithery` to find servers matching "$ARGUMENTS"
   - If multiple results, show the top 3 and ask user which one they want
   - Prefer verified servers and those deployed on Smithery (remote)

2. **Check installation status**: Use `mcp__washedmcp__getMCPInstallationStatus` to check if it's already installed

3. **Detect required credentials**: Look at the search result's `connections` and use `mcp__washedmcp__detectCapabilities` to identify what environment variables/API keys are needed
   - Common patterns:
     - GitHub: `GITHUB_PERSONAL_ACCESS_TOKEN` (ghp_xxx) - https://github.com/settings/tokens
     - Slack: `SLACK_BOT_TOKEN` (xoxb-xxx) - https://api.slack.com/apps
     - OpenAI: `OPENAI_API_KEY` (sk-xxx) - https://platform.openai.com/api-keys
     - Linear: `LINEAR_API_KEY` (lin_api_xxx) - https://linear.app/settings/api
     - Notion: `NOTION_API_KEY` (secret_xxx) - https://www.notion.so/my-integrations

4. **Prompt for credentials**: If any environment variables are required, use AskUserQuestion to ask the user for ALL required credentials at once. Include:
   - The variable name (e.g., GITHUB_PERSONAL_ACCESS_TOKEN)
   - The expected format (e.g., "starts with ghp_")
   - Where to get it (provide helpful URLs)

5. **Validate credentials format**: Before installing, briefly validate that:
   - The token isn't empty or a placeholder
   - The token matches expected format patterns if known
   - If format looks wrong, warn the user but allow them to proceed

6. **Install the server**: Call `mcp__washedmcp__installFromSmithery` with:
   - serverName: the qualified server name (e.g., "@anthropics/mcp-github")
   - envVars: JSON string of the credentials provided by user
   - connectionType: "remote" for Smithery-deployed, "local" otherwise

7. **Handle validation warnings**: If the tool returns validation warnings:
   - Show the warning to the user
   - Explain what format was expected
   - Ask if they want to proceed anyway or fix the token

8. **Confirm installation**: Tell the user:
   - Configuration has been written to `.mcp.json`
   - They need to restart Claude Code to load the new server
   - List the tools that will be available after restart

## Token Format Reference

| Service | Variable Name | Format Example |
|---------|---------------|----------------|
| GitHub | GITHUB_PERSONAL_ACCESS_TOKEN | ghp_xxxx... |
| Slack | SLACK_BOT_TOKEN | xoxb-123-456-xxx |
| OpenAI | OPENAI_API_KEY | sk-xxxx... |
| Anthropic | ANTHROPIC_API_KEY | sk-ant-xxxx |
| Linear | LINEAR_API_KEY | lin_api_xxxx |
| Notion | NOTION_API_KEY | secret_xxxx or ntn_xxxx |
| Todoist | TODOIST_API_TOKEN | 40-char hex |

## Error Handling

- **Server not found**: Suggest alternative search terms or show available servers
- **Validation failed**: Show the format hint and ask user to check their token
- **Installation failed**: Explain the error and offer to retry
- **Already installed**: Show current config and ask if they want to reinstall

## Important

- Always detect and prompt for credentials BEFORE attempting installation
- Provide helpful links for where to obtain API keys
- Give format hints so users know what to expect
- If installation fails, explain why and offer to retry
- Remind users to restart Claude Code after installation

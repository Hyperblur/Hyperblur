# @hyperblur/mcp

An [MCP](https://modelcontextprotocol.io) server for [Hyperblur](https://hyperblur.dev), the catalog of copy-paste React visual effects. The catalog covers effects, components, micro interactions and page blocks. It lets MCP clients such as Claude Code, Cursor and Claude Desktop browse the catalog by category, search it, read an item's props and usage, fetch its source, and install it into a project through the shadcn registry.

## Requirements

- Node.js 20 or later
- For `install_effect`: a React project with a `package.json`, set up for shadcn (`components.json`)

## Setup

### Claude Code

```sh
claude mcp add hyperblur -- npx -y @hyperblur/mcp
```

### Cursor

Add to `.cursor/mcp.json` in your project, or `~/.cursor/mcp.json` for all projects:

```json
{
  "mcpServers": {
    "hyperblur": {
      "command": "npx",
      "args": ["-y", "@hyperblur/mcp"]
    }
  }
}
```

### Claude Desktop

Add to `claude_desktop_config.json` (Settings > Developer > Edit Config), then restart the app:

```json
{
  "mcpServers": {
    "hyperblur": {
      "command": "npx",
      "args": ["-y", "@hyperblur/mcp"]
    }
  }
}
```

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `HYPERBLUR_SITE_URL` | `https://hyperblur.vercel.app` | Site that serves the catalog (`/r/index.json`) and registry items (`/r/<slug>.json`). Point it at `http://localhost:3000` when working on the site locally. |

Pass it through the `env` field of your client config, or with `claude mcp add hyperblur -e HYPERBLUR_SITE_URL=http://localhost:3000 -- npx -y @hyperblur/mcp`.

The catalog index is cached in memory for five minutes.

## Tools

| Tool | Purpose |
| --- | --- |
| `list_categories` | Every category in the catalog with its item count and three example titles. |
| `search_effects` | Search by keyword and optional category. The category can be any category present in the catalog (see `list_categories`); an unknown one returns an error that lists the available categories. Returns slug, title, category, description and install command for each match. |
| `get_effect` | Full reference for one item: props table, usage example, import line, dependencies, install command and docs link. |
| `get_effect_source` | The component source and its target path, for writing the file by hand when shadcn is not available. |
| `install_effect` | Runs `npx shadcn@latest add <registry-url> --yes` in the given project directory (`--overwrite` optional) and reports the output and installed file. |

It also exposes the resource `hyperblur://catalog` (the full catalog index as JSON) and the prompt `add_effect`, which walks through looking up and installing an effect, component or block by slug.

## Development

```sh
npm install
npm run build
npm test
HYPERBLUR_SITE_URL=http://localhost:3000 npm start
```

## License

MIT

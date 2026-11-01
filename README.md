# Hyperblur

Visual effects for React, one command away. Copy-paste components that install with one shadcn command, or through a prompt you hand to your coding agent.

- `web/` — the site and catalog (Next.js). Effects live in `web/src/registry/hyperblur`, one file each, no dependencies besides React.
- `brand/` — logo, mark, favicon and avatars, with a short usage guide.

## Develop

```bash
cd web && npm install && npm run dev
```

`npm run registry` rebuilds the shadcn registry JSON in `web/public/r`. `npm run build` does it automatically before building the site.

## Agents

- `packages/mcp` — the `@hyperblur/mcp` server. Any MCP client can run it with `npx -y @hyperblur/mcp`; it searches the catalog, returns props and sources, and installs effects through the shadcn CLI.
- `plugins/hyperblur` — the Claude Code plugin that bundles the server and a skill. Install with `claude plugin install hyperblur --marketplace Hyperblur/Hyperblur`.

## License

MIT. Everything in this repository, including every effect, component and block in the catalog, is free to use in personal and commercial projects. Paid content for Hyperblur Pro will live outside this repository under its own terms.

## Launch kit

`launch/` holds everything needed to list Hyperblur on directories and marketplaces: a checklist with submission links and requirements (`launch/README.md`), paste-ready copy for each platform (`launch/listings.md`) and the images (`launch/assets/`). The MCP Registry manifest lives in `packages/mcp/server.json`.

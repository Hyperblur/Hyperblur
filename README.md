<p align="center">
  <a href="https://hyperblur.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="brand/hyperblur-logo-dark-bg.svg">
      <source media="(prefers-color-scheme: light)" srcset="brand/hyperblur-logo-light-bg.svg">
      <img alt="Hyperblur" src="brand/hyperblur-logo-dark-bg.svg" width="420">
    </picture>
  </a>
</p>

# Hyperblur

Visual effects for React, one command away. Copy-paste components that install with one shadcn command, or through a prompt you hand to your coding agent.

- `web/src/registry/` — the free catalog: every effect, component and block lives in `web/src/registry/hyperblur`, one file each, no dependencies besides React, with its metadata in `meta.ts` and its demo in `demos.tsx`.
- `brand/` — logo, mark, favicon and avatars, with a short usage guide.

## Develop

The website is not part of this repository. Add or edit an effect in `web/src/registry/hyperblur`, describe it in `web/src/registry/meta.ts`, and run `node web/scripts/check-css.mjs` to make sure CSS names stay unique. The registry JSON at https://hyperblur.dev/r is built from this folder.

## Agents

- `packages/mcp` — the `@hyperblur/mcp` server. Any MCP client can run it with `npx -y @hyperblur/mcp`; it searches the catalog, returns props and sources, and installs effects through the shadcn CLI.
- `plugins/hyperblur` — the Claude Code plugin that bundles the server and a skill. Install with `claude plugin install hyperblur --marketplace Hyperblur/Hyperblur`.

## License

MIT. Everything in this repository, including every effect, component and block in the catalog, is free to use in personal and commercial projects. Paid content for Hyperblur Pro will live outside this repository under its own terms.

## Launch kit

`launch/` holds everything needed to list Hyperblur on directories and marketplaces: a checklist with submission links and requirements (`launch/README.md`), paste-ready copy for each platform (`launch/listings.md`) and the images (`launch/assets/`). The MCP Registry manifest lives in `packages/mcp/server.json`.

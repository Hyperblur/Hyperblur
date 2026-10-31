---
name: hyperblur
description: Add a Hyperblur visual effect (glitch, blur, scanlines, speed lines, neon, reveals, hover effects) to a React project. Use when the user asks for a visual effect, an animated text, an overlay or a hover interaction, or mentions Hyperblur.
---

Hyperblur is a catalog of copy-paste React effects. Each effect is one client component with no dependencies besides React, installed through the shadcn CLI. The `hyperblur` MCP server exposes the catalog.

Workflow:

1. Call `search_effects` with a short query or a category (`text`, `motion`, `overlay`, `hover`). Pick the closest match; if several fit, show the user two or three options with one line each and let them choose.
2. Call `get_effect` with the slug to read the props, the usage example and the import line.
3. Install it:
   - If the project uses the shadcn CLI or has `components.json`, call `install_effect` with the absolute project directory.
   - Otherwise call `get_effect_source` and write the file at the target path yourself, keeping the content unchanged.
4. Wire it in where the user asked, using the props from `get_effect`. Overlays go inside a `position: relative` parent. Text effects take a `text` prop; wrappers take `children`.
5. Tell the user which effect was installed, the file path and the one or two props worth tuning.

Do not edit the installed component file; customize through props and CSS variables. If the server cannot reach the catalog, say so and point the user to https://hyperblur.dev.

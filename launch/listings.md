# Hyperblur listings: copy to paste

All copy is in English. Facts only: 64 items in 7 categories (text 13, overlay 11, hover 9, components 9, micro 9, blocks 7, motion 6), MIT license, effects have no dependency besides React, installed with the shadcn CLI, MCP server `@hyperblur/mcp` (stdio), Claude Code plugin `hyperblur`.

When hyperblur.dev is live, replace `hyperblur.vercel.app` everywhere.

## Shared facts

| Field | Value |
| --- | --- |
| Name | Hyperblur |
| Site | https://hyperblur.vercel.app |
| Docs | https://hyperblur.vercel.app/docs/introduction |
| Catalog | https://hyperblur.vercel.app/effects |
| Agents docs | https://hyperblur.vercel.app/docs/agents |
| Repository | https://github.com/Hyperblur/Hyperblur |
| npm (MCP server) | https://www.npmjs.com/package/@hyperblur/mcp |
| Registry index | https://hyperblur.vercel.app/r/registry.json |
| License | MIT |
| Maintainer | andersmonteiro (GitHub organization: Hyperblur) |
| Install one item | `npx shadcn@latest add https://hyperblur.vercel.app/r/glitch-text.json` |
| Run the MCP server | `npx -y @hyperblur/mcp` |
| Claude Code plugin | `claude plugin install hyperblur --marketplace Hyperblur/Hyperblur` |
| Claude Code MCP only | `claude mcp add hyperblur -- npx -y @hyperblur/mcp` |

Tagline (35 chars): `Copy-paste visual effects for React`

Short description (127 chars): `64 copy-paste React effects, components and page blocks. Install with one shadcn command or from your coding agent through MCP.`

Long description:

> Hyperblur is a catalog of copy-paste React visual effects, components, micro interactions and page blocks. Each item is a single file with no dependency besides React, installed into your project with one shadcn command, so the code is yours to edit. The catalog has 64 items across text effects, motion and reveals, overlays and backgrounds, hover and pointer effects, components, micro interactions and page blocks such as a hero, pricing section and FAQ.
>
> It is built to work with coding agents too. The `@hyperblur/mcp` server lets Claude Code, Cursor, Claude Desktop and other MCP clients search the catalog, read an item's props and usage, and install it into a project. Everything in the repository is MIT licensed.

Tags: react, shadcn, ui-components, animation, visual-effects, mcp, typescript, nextjs, copy-paste

Assets: `launch/assets/avatar-blue-1024.png` (logo/thumbnail), `og-image.png` (1200x630), `screenshot-home.jpg`, `screenshot-catalog.jpg`, `screenshot-effect-page.jpg`.

## MCP Registry (official)

Fields live in `packages/mcp/server.json`. Name `io.github.Hyperblur/mcp`, title Hyperblur, description (81 chars): `Search, inspect and install copy-paste React effects, components and page blocks.`

## Smithery

| Field | Value |
| --- | --- |
| Qualified name | hyperblur/mcp |
| Display name | Hyperblur |
| Description | Search, inspect and install Hyperblur's React effects, components and page blocks from any MCP client, through the shadcn CLI. |
| Homepage | https://hyperblur.vercel.app |
| Repository | https://github.com/Hyperblur/Hyperblur |
| Config option | `siteUrl` (optional): site that serves the catalog, default https://hyperblur.vercel.app |

## mcp.so

| Field | Value |
| --- | --- |
| Type | MCP Server |
| Name | Hyperblur |
| Repository URL | https://github.com/Hyperblur/Hyperblur |
| Short description | Search, inspect and install Hyperblur's React effects, components and page blocks from any MCP client, through the shadcn CLI. |
| Category | Developer Tools |
| Server config | `{"mcpServers":{"hyperblur":{"command":"npx","args":["-y","@hyperblur/mcp"]}}}` |

## PulseMCP

Submissions are closed. The page says servers published to the official MCP Registry are picked up automatically.

## Glama

| Field | Value |
| --- | --- |
| Repository | https://github.com/Hyperblur/Hyperblur |
| Name | Hyperblur |
| Description | MCP server for the Hyperblur catalog of copy-paste React effects, components and page blocks. Tools: list_categories, search_effects, get_effect, get_effect_source, install_effect. |
| Tags | react, shadcn, ui, animation, developer-tools |

## Cursor Directory

| Field | Value |
| --- | --- |
| Source | https://github.com/Hyperblur/Hyperblur |
| Name | Hyperblur |
| Description | Search, inspect and install copy-paste React effects, components and page blocks from Cursor, through the shadcn CLI. |
| Setup | Add to `.cursor/mcp.json`: `{"mcpServers":{"hyperblur":{"command":"npx","args":["-y","@hyperblur/mcp"]}}}` |

## awesome-mcp-servers (pull request)

Category: Developer Tools, in alphabetical order. Entry (check the legend in the README for the scope emoji; the server runs locally):

```
- [Hyperblur/Hyperblur](https://github.com/Hyperblur/Hyperblur) 📇 🏠 - Search the Hyperblur catalog of copy-paste React effects, components and page blocks, read props and sources, and install items through the shadcn CLI.
```

PR title: `Add Hyperblur`

PR body:

> Adds Hyperblur, an MCP server (stdio, npm package @hyperblur/mcp) that searches a catalog of copy-paste React effects, components and page blocks, returns props and source, and installs items into a project through the shadcn CLI. MIT licensed. Repository: https://github.com/Hyperblur/Hyperblur

## Claude Code plugin (Anthropic directory form and marketplace listing)

| Field | Value |
| --- | --- |
| Plugin name | hyperblur |
| Short description | Claude Code plugin: search and install Hyperblur React effects, components and page blocks without leaving the chat. |
| Long description | The Hyperblur plugin bundles the `@hyperblur/mcp` server and a skill that tells Claude how to find an effect, read its props and install it into the current project through the shadcn CLI. Items are single React files with no dependency besides React. |
| Category | Design |
| Keywords | react, effects, animation, shadcn, ui |
| Install | `claude plugin install hyperblur --marketplace Hyperblur/Hyperblur` |
| Repository | https://github.com/Hyperblur/Hyperblur |
| License | MIT |
| Data handling | Reads the public catalog from the Hyperblur site (`/r/index.json`) and runs the shadcn CLI in the project directory when asked. Collects no personal data. |

## shadcn directory (entry for `apps/v4/registry/directory.json`)

The `logo` is the Hyperblur mark as inline SVG with `fill='var(--foreground)'`, the same convention the other entries in that file use (the brand blue is dropped so it follows the theme).

```json
{
  "name": "@hyperblur",
  "homepage": "https://hyperblur.vercel.app",
  "url": "https://hyperblur.vercel.app/r/{name}.json",
  "description": "Copy-paste React visual effects, components and page blocks. One shadcn command to install, MCP server for coding agents.",
  "author": "Hyperblur",
  "logo": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='var(--foreground)'><path d='M18.0 9.0 H33.0 L28.0 23.0 H13.0 Z'/><path d='M13.5 9.0 H16.1 L11.1 23.0 H8.5 Z'/><path d='M10.0 9.0 H11.6 L6.6 23.0 H5.0 Z'/><path d='M7.2 9.0 H8.1 L3.1 23.0 H2.2 Z'/></svg>"
}
```

PR title: `registry: add @hyperblur`

PR body:

> Adds the Hyperblur registry: 64 copy-paste React components (effects, components and page blocks). Open source, MIT. Registry index: https://hyperblur.vercel.app/r/registry.json

## registry.directory

| Field | Value |
| --- | --- |
| name | Hyperblur |
| description | Copy-paste React visual effects, components and page blocks. One shadcn command to install, MCP server for coding agents. |
| url | https://hyperblur.vercel.app |
| registry_url | https://hyperblur.vercel.app/r/registry.json |
| github_url | https://github.com/Hyperblur/Hyperblur |

## Product Hunt

| Field | Value |
| --- | --- |
| Name | Hyperblur |
| Tagline (35/60) | Copy-paste visual effects for React |
| Description (under 500) | 64 copy-paste React effects, components and page blocks: glitch and blur text, scanlines, speed lines, hover effects, carousels, hero and pricing sections. Each is one file with no dependency besides React. Install with one shadcn command, or let Claude Code or Cursor do it through the MCP server. Free and MIT licensed. |
| Topics (max 3, check the names in the form) | Developer Tools, Design Tools, Open Source |
| Links | Site, GitHub, npm |
| Thumbnail | `launch/assets/avatar-blue-1024.png`, resized to 240x240 |
| Gallery | At least two images, recommended 1270x760; re-export the home and effect page screenshots at that size |

Maker comment:

> Hi, I'm Anderson, the maker of Hyperblur.
>
> I wanted visual effects I could drop into a React project without adding a package and without fighting a build setup. Hyperblur is a catalog of 64 of them: text effects like glitch and decode, overlays like scanlines and film grain, hover effects, motion and reveals, some components, micro interactions and a few page blocks. Each item is one file with no dependency besides React. You install it with a shadcn command and the code is yours.
>
> It also works with coding agents. There is an MCP server (`npx -y @hyperblur/mcp`) and a Claude Code plugin, so you can ask for an effect, and the agent searches the catalog, reads the props and installs the file. Every effect page also has a prompt you can paste into any agent.
>
> Everything in the repository is MIT licensed. I plan a paid Pro tier later, but nothing is for sale today.
>
> I would like feedback on which effects are missing, and on whether the props are the right ones to expose.

## Hacker News

Title (69 chars; the HN limit is 80): `Show HN: Hyperblur, copy-paste React effects you can install with MCP`

URL: https://github.com/Hyperblur/Hyperblur (or the site; neither needs an account to try)

First comment:

> Hi HN. Hyperblur is a catalog of copy-paste React visual effects, components and page blocks (64 items today). Each one is a single file with no dependency besides React. You install it with the shadcn CLI, for example `npx shadcn@latest add https://hyperblur.vercel.app/r/glitch-text.json`, and then the file is yours to edit.
>
> I also wrote an MCP server (`npx -y @hyperblur/mcp`) and a Claude Code plugin. The server has five tools: list categories, search, get props and usage, get source, and install. The idea is that you ask your coding agent for "a glitch heading" and it finds, reads and installs the right item instead of inventing one.
>
> Things I would like to hear about: effects that are missing, props that are awkward, and anything that breaks in your setup (I have tested with Next.js and React 19). Effects respect prefers-reduced-motion and avoid random values during render, to keep server rendering and hydration consistent.
>
> It is MIT licensed. I plan a paid Pro tier later; nothing is for sale now. The site is on a temporary vercel.app domain until hyperblur.dev is ready.

## Reddit

Read each subreddit's rules first, post in one subreddit per day, and answer comments. If a subreddit has a weekly projects or showcase thread, use that instead.

Title: `I made a free catalog of copy-paste React visual effects (MIT, one shadcn command to install)`

Body:

> I have been building Hyperblur, a catalog of copy-paste React effects, components and page blocks. 64 items so far: text effects (glitch, decode, split flap), overlays (scanlines, film grain, aurora), hover effects, reveals, a few components and some page blocks.
>
> How it works: each item is one file with no dependency besides React. You install it with a shadcn command, for example `npx shadcn@latest add https://hyperblur.vercel.app/r/glitch-text.json`, and then edit it as you like. Effects respect prefers-reduced-motion.
>
> There is also an MCP server and a Claude Code plugin if you want your coding agent to search and install items, but you do not need either to use the catalog.
>
> It is free and MIT licensed. I plan a paid tier later, but nothing is for sale now. Site: https://hyperblur.vercel.app. Source: https://github.com/Hyperblur/Hyperblur
>
> What I would like to know: which effects you would use that are not there, and whether the props feel right.

## dev.to article outline

Front matter:

```
---
title: "A catalog of copy-paste React effects, and an MCP server to install them"
published: false
description: "How Hyperblur ships React effects as single-file shadcn registry items, and how an MCP server lets coding agents search and install them."
tags: react, webdev, opensource, mcp
cover_image: https://hyperblur.vercel.app/opengraph-image
canonical_url: https://hyperblur.vercel.app/docs/introduction
---
```

Replace `cover_image` with an uploaded 1000x420 image if the Open Graph route does not fit. Remove `canonical_url` if the article is not first published on the site.

Outline:

1. The problem: effects usually come as packages with their own build and styling assumptions. One file you own is easier to change.
2. What Hyperblur is: 64 items in seven categories, one file each, no dependency besides React, MIT.
3. How an item is built: `"use client"`, CSS inside the file, prefixed class names, `prefers-reduced-motion`, deterministic pseudo-random values to keep hydration stable.
4. How it installs: a shadcn registry (`/r/<slug>.json`), with the install command shown on every page. Show the glitch text example.
5. The catalog as data: `/r/index.json` with props, usage and install command for every item.
6. The MCP server: five tools (`list_categories`, `search_effects`, `get_effect`, `get_effect_source`, `install_effect`), a resource and a prompt. Show the Claude Code, Cursor and Claude Desktop setup.
7. The Claude Code plugin: marketplace in the repository, one install command.
8. What I would do differently and what is next: more items, the domain, the possible Pro tier (nothing for sale yet).
9. Links: site, repository, npm, docs.

## X posts

Variant 1:

> Hyperblur is a catalog of 64 copy-paste React effects, components and page blocks. Each one is a single file with no dependencies besides React. Install one with a shadcn command, or let your coding agent do it through MCP. MIT. https://hyperblur.vercel.app

Variant 2:

> Want a glitch text, a magnetic hover or a pricing section without adding a package? Hyperblur gives you the source as one file you own.
>
> npx shadcn@latest add https://hyperblur.vercel.app/r/glitch-text.json
>
> Free, MIT. https://hyperblur.vercel.app

Variant 3:

> New: the Hyperblur MCP server. Ask Claude Code, Cursor or Claude Desktop for an effect and it searches the catalog, reads the props and installs the file in your project.
>
> npx -y @hyperblur/mcp
>
> https://github.com/Hyperblur/Hyperblur

## GitHub Release (v0.2.0)

Title: `Hyperblur 0.2.0`

> The MCP server `@hyperblur/mcp` 0.2.0 adds `list_categories`, reads categories from the catalog instead of a fixed list, and covers all 64 items: effects, components, micro interactions and page blocks.
>
> Run it with `npx -y @hyperblur/mcp`. Claude Code users can install the plugin with `claude plugin install hyperblur --marketplace Hyperblur/Hyperblur`.

## GitHub repository metadata

- About: `Copy-paste visual effects, components and page blocks for React. One shadcn command to install, MCP server and Claude Code plugin included.`
- Website: https://hyperblur.vercel.app
- Topics: react, shadcn, shadcn-ui, registry, mcp, mcp-server, model-context-protocol, claude-code, animation, ui-components, copy-paste, nextjs, typescript

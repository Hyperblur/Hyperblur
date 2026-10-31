#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Catalog, resolveSiteUrl } from "./catalog.ts";
import { createServer } from "./server.ts";

async function main(): Promise<void> {
  const catalog = new Catalog({ siteUrl: resolveSiteUrl() });
  const server = createServer({ catalog });
  const transport = new StdioServerTransport();
  await server.connect(transport);
  const shutdown = () => {
    server.close().finally(() => process.exit(0));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error: unknown) => {
  console.error(`hyperblur-mcp failed to start: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

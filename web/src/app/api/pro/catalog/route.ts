import { connection } from "next/server";
import { proCatalog } from "@/lib/pro/registry";

export async function GET() {
  await connection();
  return Response.json(proCatalog(), { headers: { "cache-control": "public, max-age=300" } });
}

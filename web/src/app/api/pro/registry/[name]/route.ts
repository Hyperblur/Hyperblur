import { authorize } from "@/lib/pro/auth";
import { proItem } from "@/lib/pro/registry";


export async function GET(req: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  const slug = name.replace(/\.json$/, "");
  const auth = authorize(req);
  if (!auth.ok) {
    return Response.json({ error: auth.message }, { status: auth.status });
  }
  const item = proItem(slug);
  if (!item) return Response.json({ error: "Item not found." }, { status: 404 });
  return new Response(item, {
    headers: { "content-type": "application/json", "cache-control": "private, no-store" },
  });
}

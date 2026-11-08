import { connection } from "next/server";
import { proCatalog } from "@/lib/pro/registry";

export async function ProItems() {
  await connection();
  const { items } = proCatalog();
  if (items.length === 0) {
    return (
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        The first Pro items are being finished. They will be listed here, with their descriptions, the day Pro opens.
      </p>
    );
  }
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.slug} className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <span className="rounded-full border border-line-2 px-2 py-0.5 text-[11px] text-muted">{item.category}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

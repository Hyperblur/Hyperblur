import type { ReactNode } from "react";
import { SpotlightCard, SpotlightGroup } from "@/registry/hyperblur/spotlight-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SectionHead } from "./icons";

function Card({
  span,
  tag,
  title,
  body,
  children,
}: {
  span: 2 | 3 | 4;
  tag: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <SpotlightCard
      data-span={span}
      color="#a3e635"
      size={380}
      radius={16}
      idle={0}
      className="hbl-dv-card flex flex-col p-6 sm:p-7"
    >
      <div className="relative min-h-[170px] flex-1">{children}</div>
      <div className="relative mt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6f6f69]">{tag}</p>
        <h3 className="mt-2 font-mono text-[18px] font-semibold tracking-[-0.04em] text-[#f4f4f0]">{title}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-[#a3a39b]">{body}</p>
      </div>
    </SpotlightCard>
  );
}

const branches = [
  { pr: "#2481", name: "feat/checkout-v2", url: "checkout-v2.acme.forge.run", state: "Ready", t: "8.9s" },
  { pr: "#2479", name: "fix/tax-rounding", url: "tax-rounding.acme.forge.run", state: "Ready", t: "6.2s" },
  { pr: "#2477", name: "chore/upgrade-react", url: "upgrade-react.acme.forge.run", state: "Building", t: "..." },
  { pr: "#2470", name: "feat/search-facets", url: "search-facets.acme.forge.run", state: "Ready", t: "11.4s" },
];

function Previews() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0c] font-mono text-[12px]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] text-[#6f6f69]">
        <span>acme/web · previews</span>
        <span className="text-[#a3e635]">4 live</span>
      </div>
      <ul>
        {branches.map((b) => (
          <li key={b.pr} className="relative flex items-center gap-3 overflow-hidden border-b border-white/[0.06] px-4 py-2.5 last:border-b-0">
            {b.state === "Building" ? <span className="hbl-dv-scan" aria-hidden="true" /> : null}
            <span className="w-11 shrink-0 text-[#6f6f69]">{b.pr}</span>
            <span className="min-w-0 flex-1 truncate text-[#f4f4f0]">
              {b.name}
              <span className="hidden text-[#6f6f69] sm:inline"> → {b.url}</span>
            </span>
            <span
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] ${
                b.state === "Ready" ? "bg-[#a3e635]/10 text-[#a3e635]" : "bg-white/[0.06] text-[#f4f4f0]"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${b.state === "Ready" ? "bg-[#a3e635]" : "hbl-dv-pulse bg-[#f4f4f0]"}`} />
              {b.state}
            </span>
            <span className="w-11 shrink-0 text-right text-[#6f6f69]">{b.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CacheRing() {
  const r = 52;
  const c = 2 * Math.PI * r;
  const filled = +(c * 0.978).toFixed(2);
  return (
    <div className="flex h-full items-center justify-center gap-6">
      <div className="relative h-[136px] w-[136px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="#a3e635"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${+c.toFixed(2)}`}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-mono text-[24px] font-semibold tracking-[-0.05em] text-[#f4f4f0]">97.8%</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6f6f69]">hit rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const releases = [
  { id: "7f3a2c", msg: "Checkout v2 behind flag", when: "2m ago", current: true },
  { id: "e19b04", msg: "Fix tax rounding for CA", when: "1h ago" },
  { id: "a52d91", msg: "Upgrade to React 19.2", when: "yesterday" },
];

function Rollbacks() {
  return (
    <div className="font-mono text-[12px]">
      <ol className="relative space-y-3 border-l border-white/10 pl-5">
        {releases.map((r) => (
          <li key={r.id} className="relative">
            <span
              className={`absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border ${
                r.current ? "hbl-dv-pulse border-[#a3e635] bg-[#a3e635]" : "border-white/30 bg-[#0b0b0c]"
              }`}
              aria-hidden="true"
            />
            <div className="flex items-baseline gap-2">
              <span className={r.current ? "text-[#a3e635]" : "text-[#a3a39b]"}>{r.id}</span>
              <span className="text-[10.5px] text-[#6f6f69]">{r.when}</span>
            </div>
            <p className="truncate text-[#f4f4f0]/80">{r.msg}</p>
          </li>
        ))}
      </ol>
      <div className="mt-4 rounded-lg border border-white/10 bg-[#0b0b0c] px-3 py-2 text-[11.5px]">
        <span className="text-[#a3e635]">❯</span> <span className="text-[#f4f4f0]">forge rollback e19b04</span>
        <span className="block text-[#6f6f69]">  restored in 0.6s</span>
      </div>
    </div>
  );
}

const nodes = [
  { id: "ui", x: 40, y: 34, changed: true },
  { id: "utils", x: 40, y: 104, changed: false },
  { id: "api", x: 150, y: 34, changed: false },
  { id: "web", x: 150, y: 104, changed: true },
  { id: "docs", x: 250, y: 70, changed: false },
];

const edges: [number, number][] = [
  [0, 3],
  [1, 2],
  [1, 3],
  [0, 4],
  [3, 4],
];

function Graph() {
  return (
    <svg viewBox="0 0 290 140" className="h-full max-h-[170px] w-full" aria-hidden="true">
      {edges.map(([a, b]) => {
        const hot = nodes[a].changed && nodes[b].changed;
        return (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={hot ? "#a3e635" : "rgba(255,255,255,0.14)"}
            strokeWidth={hot ? 1.6 : 1}
            strokeDasharray={hot ? "0" : "3 4"}
          />
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x - 30}
            y={n.y - 13}
            width="60"
            height="26"
            rx="7"
            fill={n.changed ? "rgba(163,230,53,0.12)" : "#0b0b0c"}
            stroke={n.changed ? "#a3e635" : "rgba(255,255,255,0.16)"}
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="11"
            fill={n.changed ? "#a3e635" : "#a3a39b"}
          >
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Secrets() {
  const rows = [
    ["DATABASE_URL", "postgres://••••••••@db.acme.internal"],
    ["STRIPE_SECRET", "sk_live_••••••••••••4f2a"],
    ["POSTHOG_KEY", "phc_••••••••••••••8kq1"],
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0c] p-4 font-mono text-[11.5px] leading-[1.9]">
      <p>
        <span className="text-[#a3e635]">❯</span> <span className="text-[#f4f4f0]">forge env pull --env=preview</span>
      </p>
      {rows.map(([k, v]) => (
        <p key={k} className="flex min-w-0 gap-2">
          <span className="shrink-0 text-[#a3a39b]">{k}</span>
          <span className="truncate text-[#6f6f69]">{v}</span>
        </p>
      ))}
      <p className="text-[#a3e635]">3 secrets synced, encrypted at rest</p>
    </div>
  );
}

const logs = [
  ["12:04:31.118", "web", "compiled /checkout in 412ms"],
  ["12:04:31.502", "api", "cache hit packages/billing 0ms"],
  ["12:04:32.077", "web", "prerendered 184 routes"],
  ["12:04:32.419", "edge", "iad1 healthy, p95 38ms"],
];

function Logs() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0c] p-4 font-mono text-[11.5px] leading-[1.9]">
      {logs.map(([t, src, msg]) => (
        <p key={t} className="flex min-w-0 gap-3">
          <span className="hidden shrink-0 text-[#6f6f69] sm:inline">{t}</span>
          <span className="w-9 shrink-0 text-[#a3e635]">{src}</span>
          <span className="truncate text-[#f4f4f0]/85">{msg}</span>
        </p>
      ))}
      <p className="flex gap-3 text-[#6f6f69]">
        <span className="hidden sm:inline">12:04:32.611</span>
        <span>streaming<span className="hbl-dv-caret ml-1.5 !h-[0.9em] !w-[0.45em]" aria-hidden="true" /></span>
      </p>
    </div>
  );
}

const regions = [
  { code: "iad1", city: "Washington", ms: 18 },
  { code: "fra1", city: "Frankfurt", ms: 24 },
  { code: "gru1", city: "São Paulo", ms: 31 },
  { code: "hnd1", city: "Tokyo", ms: 29 },
];

function Regions() {
  return (
    <ul className="space-y-3 font-mono text-[12px]">
      {regions.map((r) => (
        <li key={r.code} className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-3">
          <span className="text-[#f4f4f0]">{r.code}</span>
          <span className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <span className="absolute inset-y-0 left-0 rounded-full bg-[#a3e635]" style={{ width: `${100 - r.ms * 2}%` }} />
          </span>
          <span className="text-right text-[#6f6f69]">{r.ms}ms</span>
        </li>
      ))}
      <li className="pt-1 text-[11px] text-[#6f6f69]">p95 cold start, measured from the nearest PoP</li>
    </ul>
  );
}

export function Bento() {
  return (
    <section id="product" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <FadeInView>
          <SectionHead
            label="Product"
            title={
              <>
                Everything between <span className="text-[#a3e635]">git push</span> and production.
              </>
            }
            body="Forge replaces the CI script, the build cache, the preview bot and the deploy button with one binary that understands your TypeScript graph."
          />
        </FadeInView>
        <FadeInView className="mt-14" delay={0.1}>
          <SpotlightGroup className="hbl-dv-bento">
            <Card span={4} tag="Previews" title="A live URL for every pull request" body="Each push gets an isolated preview with production data shapes, posted to the PR before review starts.">
              <Previews />
            </Card>
            <Card span={2} tag="Remote cache" title="Never compile the same file twice" body="Artifacts are content-addressed and shared across laptops and CI. Saved 412 CPU hours for Acme last week.">
              <CacheRing />
            </Card>
            <Card span={2} tag="Rollbacks" title="Undo a release in 0.6 seconds" body="Every deploy is immutable. Rolling back flips a pointer, it never rebuilds.">
              <Rollbacks />
            </Card>
            <Card span={2} tag="Graph-aware" title="Builds only what changed" body="Forge reads tsconfig references and rebuilds the packages your diff actually touches.">
              <Graph />
            </Card>
            <Card span={2} tag="Secrets" title="Env vars that stay put" body="Scoped per environment, synced to every machine, never printed to logs.">
              <Secrets />
            </Card>
            <Card span={3} tag="Logs" title="Streaming output from every task" body="Build, runtime and edge logs in one timeline you can grep from the terminal or the dashboard.">
              <Logs />
            </Card>
            <Card span={3} tag="Edge" title="Three regions by default, twelve on demand" body="Static assets on every PoP, functions pinned close to your database.">
              <Regions />
            </Card>
          </SpotlightGroup>
        </FadeInView>
      </div>
    </section>
  );
}

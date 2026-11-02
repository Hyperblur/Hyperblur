const coral = "#ff6b3d";
const sun = "#ffd166";
const gray = "#8b8b96";

function MockHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] px-5 py-4">
      <p className="hbl-pr-display text-[17px] tracking-[-0.025em] text-[#f2f2f5]">{title}</p>
      <span className="text-[12px] text-[#8b8b96]">{meta}</span>
    </div>
  );
}

export function RoadmapMock() {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const rows = [
    { team: "Checkout", label: "One-page checkout", start: 2, span: 30, tone: coral, done: 0.8 },
    { team: "Checkout", label: "Saved payment methods", start: 22, span: 28, tone: sun, done: 0.35 },
    { team: "Growth", label: "Referral program v2", start: 12, span: 38, tone: coral, done: 0.5 },
    { team: "Growth", label: "Lifecycle emails", start: 44, span: 30, tone: gray, done: 0 },
    { team: "Platform", label: "Offline mode", start: 36, span: 46, tone: sun, done: 0.1 },
    { team: "Platform", label: "Design tokens 2.0", start: 64, span: 32, tone: gray, done: 0 },
  ];
  return (
    <div>
      <MockHeader title="2026 product roadmap" meta="6 initiatives · 3 teams" />
      <div className="p-5 pb-12">
        <div className="mb-3 ml-0 grid grid-cols-6 text-[11px] text-[#8b8b96] sm:ml-[132px]">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className="relative space-y-2.5">
          {rows.map((r, i) => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="hidden w-[120px] flex-none truncate text-[12px] text-[#a3a3ae] sm:block">{r.team}</span>
              <div className="relative h-9 min-w-0 flex-1 rounded-lg bg-white/[0.02]">
                <div
                  className="hbl-pr-bar-grow absolute inset-y-0 flex items-center gap-2 overflow-hidden rounded-lg px-3 text-[12px] text-[#f2f2f5]"
                  style={{
                    left: `${r.start}%`,
                    width: `${r.span}%`,
                    background: `${r.tone}22`,
                    boxShadow: `inset 0 0 0 1px ${r.tone}50`,
                    ["--hbl-pr-d" as string]: `${(i * 0.07).toFixed(2)}s`,
                  }}
                >
                  <span className="absolute inset-y-0 left-0" style={{ width: `${r.done * 100}%`, background: `${r.tone}38` }} aria-hidden="true" />
                  <span className="relative h-1.5 w-1.5 flex-none rounded-full" style={{ background: r.tone }} aria-hidden="true" />
                  <span className="relative truncate">{r.label}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 sm:left-[132px]" aria-hidden="true">
            <span className="hbl-pr-today absolute -top-1 -bottom-2 w-px bg-[#ff6b3d]" style={{ left: "27%" }} />
            <span className="absolute -bottom-8 -translate-x-1/2 rounded-full bg-[#ff6b3d] px-2 py-0.5 text-[10px] font-semibold text-[#1a0b05]" style={{ left: "27%" }}>
              Today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SprintMock() {
  const ideal = "M0 8 L320 132";
  const actual = "M0 8 C30 10 50 26 80 30 S120 40 150 62 S200 70 230 92 S280 104 320 118";
  const people = [
    { n: "Maya Chen", i: "MC", c: "#c2410c", load: 0.82 },
    { n: "Ravi Patel", i: "RP", c: "#7c5c1e", load: 0.64 },
    { n: "Lena Ortiz", i: "LO", c: "#3f3f8f", load: 0.91 },
    { n: "Sam Okoye", i: "SO", c: "#245b4a", load: 0.47 },
  ];
  return (
    <div>
      <MockHeader title="Sprint 14 · Checkout revamp" meta="Nov 3 to Nov 14" />
      <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="min-w-0 rounded-xl border border-white/[0.07] bg-[#15151a] p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <p className="text-[12px] text-[#a3a3ae]">Burndown</p>
            <p className="text-[12px] text-[#f2f2f5]">
              23 <span className="text-[#8b8b96]">of 41 points left</span>
            </p>
          </div>
          <svg viewBox="0 0 320 140" className="h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id="hbl-pr-burn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={coral} stopOpacity="0.35" />
                <stop offset="1" stopColor={coral} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[35, 70, 105].map((y) => (
              <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.05" />
            ))}
            <path d={ideal} stroke={gray} strokeOpacity="0.6" strokeDasharray="4 5" fill="none" />
            <path d={`${actual} L320 140 L0 140 Z`} fill="url(#hbl-pr-burn)" />
            <path d={actual} stroke={coral} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <circle cx="320" cy="118" r="4" fill={coral} />
            <circle cx="320" cy="118" r="9" fill={coral} fillOpacity="0.2" />
          </svg>
        </div>
        <div className="min-w-0 rounded-xl border border-white/[0.07] bg-[#15151a] p-4">
          <p className="mb-4 text-[12px] text-[#a3a3ae]">Capacity</p>
          <ul className="space-y-4">
            {people.map((p, i) => (
              <li key={p.n} className="flex items-center gap-3">
                <span className="hbl-pr-avatar" style={{ background: p.c }} aria-hidden="true">
                  {p.i}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex justify-between text-[12px]">
                    <span className="truncate text-[#f2f2f5]">{p.n}</span>
                    <span className="text-[#8b8b96]">{Math.round(p.load * 100)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="hbl-pr-bar-grow h-full rounded-full"
                      style={{
                        width: `${p.load * 100}%`,
                        background: p.load > 0.85 ? sun : coral,
                        ["--hbl-pr-d" as string]: `${(i * 0.08).toFixed(2)}s`,
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function DocsMock() {
  return (
    <div>
      <MockHeader title="PRD · One-page checkout" meta="Edited 4 minutes ago" />
      <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_200px]">
        <div className="min-w-0 text-[13px] leading-relaxed text-[#c9c9d1]">
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#8b8b96]">Problem</p>
          <p className="mt-1.5">
            31% of mobile shoppers leave on the payment step. Most of them have already typed an address twice.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-[#8b8b96]">Scope</p>
          <ul className="mt-2 space-y-2">
            {[
              { id: "TMP-482", t: "Apple Pay sheet", s: "In progress", c: coral },
              { id: "TMP-490", t: "Address autocomplete", s: "In progress", c: sun },
              { id: "TMP-497", t: "Order summary redesign", s: "In review", c: gray },
            ].map((x) => (
              <li key={x.id} className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-[#15151a] px-3 py-2">
                <span className="font-mono text-[11px] text-[#8b8b96]">{x.id}</span>
                <span className="min-w-0 flex-1 truncate text-[#f2f2f5]">{x.t}</span>
                <span className="hidden sm:inline-flex">
                  <span className="hbl-pr-chip">
                    <span className="hbl-pr-chip-dot" style={{ color: x.c }} />
                    {x.s}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            We ship behind a flag to 10% of traffic and expand once conversion beats control for seven days
            <span className="hbl-pr-caret" aria-hidden="true" />
          </p>
        </div>
        <div className="hidden space-y-3 md:block">
          <div className="rounded-xl border border-[#ff6b3d]/30 bg-[#ff6b3d]/[0.06] p-3 text-[12px] leading-snug text-[#e4e4ea]">
            <p className="mb-1 flex items-center gap-2 font-medium text-[#f2f2f5]">
              <span className="hbl-pr-avatar" style={{ background: "#3f3f8f", width: 20, height: 20, fontSize: 9 }} aria-hidden="true">
                LO
              </span>
              Lena Ortiz
            </p>
            Can we keep the coupon field collapsed by default? It pulled focus in the last test.
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-[#15151a] p-3 text-[12px] leading-snug text-[#a3a3ae]">
            <p className="mb-1 font-medium text-[#f2f2f5]">Linked metric</p>
            Mobile checkout conversion
            <p className="hbl-pr-display mt-1 text-[22px] text-[#ffd166]">+4.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AutomationsMock() {
  const steps = [
    { k: "When", t: "An issue moves to In review", c: coral },
    { k: "If", t: "Label is Bug and priority is High", c: sun },
    { k: "Then", t: "Assign the QA rotation and post to #mobile", c: "#7ee2b8" },
  ];
  return (
    <div>
      <MockHeader title="Rule · Fast-track urgent bugs" meta="Ran 1,284 times this month" />
      <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_220px]">
        <ol className="min-w-0">
          {steps.map((s, i) => (
            <li key={s.k}>
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#17171d] p-3.5">
                <span
                  className="grid h-8 w-12 flex-none place-items-center rounded-lg font-mono text-[11px] font-semibold"
                  style={{ background: `${s.c}1f`, color: s.c }}
                >
                  {s.k}
                </span>
                <span className="min-w-0 text-[13px] text-[#f2f2f5]">{s.t}</span>
              </div>
              {i < steps.length - 1 ? (
                <svg viewBox="0 0 20 28" className="ml-7 h-7 w-5" aria-hidden="true">
                  <path className="hbl-pr-flow" d="M10 0v28" stroke={coral} strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
                </svg>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="min-w-0 rounded-xl border border-white/[0.07] bg-[#15151a] p-4">
          <p className="mb-3 text-[12px] text-[#a3a3ae]">Recent runs</p>
          <ul className="space-y-2.5 font-mono text-[11px]">
            {[
              ["09:42", "TMP-512", "ok"],
              ["09:17", "TMP-509", "ok"],
              ["08:55", "TMP-503", "ok"],
              ["Yesterday", "TMP-498", "skipped"],
            ].map(([time, id, state]) => (
              <li key={id} className="flex items-center justify-between gap-2">
                <span className="text-[#8b8b96]">{time}</span>
                <span className="text-[#f2f2f5]">{id}</span>
                <span style={{ color: state === "ok" ? "#7ee2b8" : gray }}>{state}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

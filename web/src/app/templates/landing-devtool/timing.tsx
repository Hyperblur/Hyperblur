"use client";

import * as React from "react";

interface Run {
  name: string;
  note: string;
  total: string;
  seconds: number;
  forge?: boolean;
  parts: { label: string; s: number }[];
}

const runs: Run[] = [
  {
    name: "Typical CI pipeline",
    note: "Docker build, no shared cache",
    total: "6m 42s",
    seconds: 402,
    parts: [
      { label: "install", s: 96 },
      { label: "typecheck", s: 88 },
      { label: "build", s: 174 },
      { label: "upload", s: 44 },
    ],
  },
  {
    name: "CI with local cache",
    note: "Per-runner cache, cold on new runners",
    total: "3m 18s",
    seconds: 198,
    parts: [
      { label: "install", s: 41 },
      { label: "typecheck", s: 52 },
      { label: "build", s: 81 },
      { label: "upload", s: 24 },
    ],
  },
  {
    name: "Forge",
    note: "Shared remote cache, graph-aware",
    total: "0m 09s",
    seconds: 9.4,
    forge: true,
    parts: [
      { label: "install", s: 1.1 },
      { label: "typecheck", s: 2.1 },
      { label: "build", s: 4.9 },
      { label: "upload", s: 1.3 },
    ],
  },
];

const max = 402;
const tones = ["rgba(244,244,240,0.55)", "rgba(244,244,240,0.38)", "rgba(244,244,240,0.24)", "rgba(244,244,240,0.14)"];

export function Timing() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="hbl-dv-bars" data-in={inView}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-[#6f6f69]">
        {runs[0].parts.map((p, i) => (
          <span key={p.label} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-[2px]" style={{ background: tones[i] }} aria-hidden="true" />
            {p.label}
          </span>
        ))}
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-[2px] bg-[#a3e635]" aria-hidden="true" />
          forge
        </span>
      </div>
      <ul className="mt-8 space-y-7">
        {runs.map((r, ri) => {
          const width = Math.max((r.seconds / max) * 100, 2.6);
          let acc = 0;
          return (
            <li key={r.name}>
              <div className="flex items-baseline justify-between gap-4">
                <div className="min-w-0">
                  <p className={`font-mono text-[14px] font-medium tracking-[-0.02em] ${r.forge ? "text-[#a3e635]" : "text-[#f4f4f0]"}`}>{r.name}</p>
                  <p className="mt-0.5 truncate text-[13px] text-[#6f6f69]">{r.note}</p>
                </div>
                <p
                  className={`hbl-dv-time shrink-0 font-mono text-[20px] font-semibold tracking-[-0.04em] sm:text-[24px] ${r.forge ? "text-[#a3e635]" : "text-[#f4f4f0]"}`}
                  style={{ "--hbl-dv-delay": `${(ri * 0.25 + 0.6).toFixed(2)}s` } as React.CSSProperties}
                >
                  {r.total}
                </p>
              </div>
              <div
                className="mt-3 h-3 overflow-hidden rounded-[4px] bg-white/[0.04]"
                role="img"
                aria-label={`${r.name}: ${r.total}`}
              >
                <div className="flex h-full" style={{ width: `${width.toFixed(2)}%` }}>
                  {r.parts.map((p, i) => {
                    const delay = ri * 0.25 + (acc / r.seconds) * 0.6;
                    acc += p.s;
                    return (
                      <div
                        key={p.label}
                        className="hbl-dv-seg"
                        style={
                          {
                            width: `${((p.s / r.seconds) * 100).toFixed(2)}%`,
                            background: r.forge ? (i % 2 === 0 ? "#a3e635" : "#c2f171") : tones[i],
                            boxShadow: r.forge ? "0 0 18px rgba(163,230,53,0.6)" : undefined,
                            "--hbl-dv-delay": `${delay.toFixed(2)}s`,
                          } as React.CSSProperties
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

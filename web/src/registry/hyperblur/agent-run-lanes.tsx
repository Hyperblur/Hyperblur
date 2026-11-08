"use client";

import * as React from "react";

export interface RunLaneAgent {
  id: string;
  name: string;
  role?: string;
  color: string;
}

export interface RunLaneTask {
  id: string;
  agent: string;
  label: string;
  start: number;
  end: number;
  status?: "ok" | "error";
}

export interface RunLaneHandoff {
  from: string;
  to: string;
  label: string;
}

export interface AgentRunLanesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  agents?: RunLaneAgent[];
  tasks?: RunLaneTask[];
  handoffs?: RunLaneHandoff[];
  duration?: number;
  title?: string;
  time?: number;
  defaultTime?: number;
  onTimeChange?: (time: number) => void;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  accent?: string;
}

const sampleAgents: RunLaneAgent[] = [
  { id: "plan", name: "Planner", role: "orchestrator", color: "#9a7bff" },
  { id: "research", name: "Researcher", role: "web + docs", color: "#3cc6e0" },
  { id: "code", name: "Coder", role: "repo write", color: "#4c8dff" },
  { id: "review", name: "Reviewer", role: "tests + lint", color: "#34c78a" },
];

const sampleTasks: RunLaneTask[] = [
  { id: "t1", agent: "plan", label: "Break down brief", start: 0, end: 9 },
  { id: "t2", agent: "research", label: "Scan 6 pricing pages", start: 10, end: 34 },
  { id: "t3", agent: "code", label: "Scaffold route", start: 10, end: 26 },
  { id: "t4", agent: "plan", label: "Merge findings", start: 35, end: 41 },
  { id: "t5", agent: "code", label: "Build tier table", start: 42, end: 70 },
  { id: "t6", agent: "review", label: "Run 48 tests", start: 58, end: 66, status: "error" },
  { id: "t7", agent: "code", label: "Fix rounding", start: 71, end: 78 },
  { id: "t8", agent: "review", label: "Re-run + lint", start: 79, end: 88 },
];

const sampleHandoffs: RunLaneHandoff[] = [
  { from: "t1", to: "t2", label: "brief" },
  { from: "t1", to: "t3", label: "spec" },
  { from: "t2", to: "t4", label: "6 sources" },
  { from: "t4", to: "t5", label: "tier plan" },
  { from: "t6", to: "t7", label: "1 failing test" },
  { from: "t7", to: "t8", label: "patch" },
];

const clock = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

const css = `
.hb-wj5 {
  --hb-wj5-a: #2f7bff;
  --hb-wj5-lh: 26px;
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  padding: 10px 12px 10px;
  font-family: inherit;
  font-size: 11.5px;
  color: #ededed;
  background: linear-gradient(180deg, #131313, #0e0e0e);
  border: 1px solid #262626;
  border-radius: 14px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 50px -30px rgba(0,0,0,0.9);
}
.hb-wj5 *, .hb-wj5 *::before, .hb-wj5 *::after { box-sizing: border-box; font-family: inherit; }
.hb-wj5-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.hb-wj5-play { display: grid; place-items: center; flex: none; width: 24px; height: 24px; padding: 0; color: #0a0a0a; background: #ededed; border: 0; border-radius: 50%; cursor: pointer; transition: transform .15s ease, background-color .15s ease; }
.hb-wj5-play:hover { background: #fff; }
.hb-wj5-play:active { transform: scale(.92); }
.hb-wj5-play svg { width: 10px; height: 10px; }
.hb-wj5-title { flex: 1; min-width: 0; margin: 0; font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: -0.01em; }
.hb-wj5-clock { flex: none; font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-wj5-clock b { color: #ededed; font-weight: 500; }
.hb-wj5-grid { display: grid; grid-template-columns: 88px minmax(0, 1fr); column-gap: 8px; }
.hb-wj5-who { display: flex; align-items: center; gap: 6px; height: var(--hb-wj5-lh); min-width: 0; }
.hb-wj5-av { position: relative; display: grid; place-items: center; flex: none; width: 18px; height: 18px; font-size: 9px; font-weight: 700; color: #0a0a0a; background: var(--c); border-radius: 6px; }
.hb-wj5-av[data-live="true"]::after { content: ""; position: absolute; inset: -3px; border: 1.5px solid var(--c); border-radius: 8px; animation: hb-wj5-ping 1.4s ease-out infinite; }
.hb-wj5-nm { min-width: 0; line-height: 1.1; }
.hb-wj5-nm b { display: block; font-size: 11px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj5-nm span { display: block; font-size: 9.5px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj5-track { position: relative; touch-action: none; cursor: ew-resize; }
.hb-wj5-lane { position: relative; height: var(--hb-wj5-lh); border-top: 1px dashed #1f1f1f; }
.hb-wj5-lane:first-child { border-top-color: transparent; }
.hb-wj5-bar { position: absolute; top: 4px; bottom: 4px; display: flex; align-items: center; padding: 0 6px; overflow: hidden; font-size: 10px; font-weight: 500; color: #8f8f8f; white-space: nowrap; border: 1px dashed #333; border-radius: 6px; transition: color .2s ease, border-color .2s ease; }
.hb-wj5-bar span { position: relative; z-index: 1; overflow: hidden; text-overflow: ellipsis; }
.hb-wj5-fill { position: absolute; inset: 0; background: linear-gradient(180deg, color-mix(in srgb, var(--c) 40%, #151515), color-mix(in srgb, var(--c) 26%, #121212)); transform-origin: left center; }
.hb-wj5-bar[data-state="run"], .hb-wj5-bar[data-state="done"] { color: #fff; border-style: solid; border-color: color-mix(in srgb, var(--c) 45%, transparent); }
.hb-wj5-bar[data-state="run"] .hb-wj5-fill::after { content: ""; position: absolute; top: 0; bottom: 0; right: 0; width: 18px; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--c) 80%, #fff)); opacity: .55; }
.hb-wj5-bar[data-state="done"][data-error="true"] { border-color: rgba(255,90,79,.6); }
.hb-wj5-bar[data-state="done"][data-error="true"] .hb-wj5-fill { background: linear-gradient(180deg, rgba(255,90,79,.38), rgba(255,90,79,.22)); }
.hb-wj5-links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.hb-wj5-links path { fill: none; stroke: #5a5a5a; stroke-width: 1.2; stroke-dasharray: 1 1; stroke-dashoffset: 1; transition: stroke-dashoffset .5s cubic-bezier(.4,0,.2,1), stroke .3s ease; }
.hb-wj5-links path[data-on="true"] { stroke-dashoffset: 0; stroke: color-mix(in srgb, var(--hb-wj5-a) 70%, #fff); }
.hb-wj5-head { position: absolute; top: -4px; bottom: 0; width: 0; pointer-events: none; z-index: 3; }
.hb-wj5-head::before { content: ""; position: absolute; top: 0; bottom: 0; left: -0.5px; width: 1px; background: #fff; box-shadow: 0 0 8px rgba(255,255,255,.6); }
.hb-wj5-head::after { content: ""; position: absolute; top: -3px; left: -4px; width: 8px; height: 8px; background: #fff; clip-path: polygon(0 0, 100% 0, 50% 100%); }
.hb-wj5-axis { position: relative; height: 14px; margin-top: 2px; font-family: var(--font-mono), ui-monospace, monospace; font-size: 9px; color: #5a5a5a; }
.hb-wj5-axis span { position: absolute; top: 2px; transform: translateX(-50%); font-variant-numeric: tabular-nums; }
.hb-wj5-axis span:first-child { transform: none; }
.hb-wj5-axis span:last-child { transform: translateX(-100%); }
.hb-wj5-log { display: flex; align-items: center; gap: 6px; height: 20px; margin-top: 4px; padding: 0 8px; overflow: hidden; font-size: 10.5px; color: #a1a1a1; background: #151515; border: 1px solid #222; border-radius: 7px; }
.hb-wj5-log i { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--c, #555); font-style: normal; }
.hb-wj5-log span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; animation: hb-wj5-in .3s cubic-bezier(.2,.8,.2,1) both; }
.hb-wj5-log b { color: #ededed; font-weight: 600; }
.hb-wj5-track:focus-visible, .hb-wj5-play:focus-visible { outline: 2px solid var(--hb-wj5-a); outline-offset: 2px; border-radius: 4px; }
@keyframes hb-wj5-ping { from { opacity: .9; transform: scale(.9); } to { opacity: 0; transform: scale(1.35); } }
@keyframes hb-wj5-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
@container (max-width: 360px) {
  .hb-wj5-grid { grid-template-columns: 18px minmax(0, 1fr); }
  .hb-wj5-nm { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wj5-av[data-live="true"]::after, .hb-wj5-log span { animation: none; }
  .hb-wj5-links path, .hb-wj5-bar { transition: none; }
}
`;

export function AgentRunLanes({
  agents = sampleAgents,
  tasks = sampleTasks,
  handoffs = sampleHandoffs,
  duration,
  title = "Run 2291 · Ship the pricing page",
  time,
  defaultTime = 0,
  onTimeChange,
  autoPlay = true,
  loop = true,
  speed = 1,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: AgentRunLanesProps) {
  const total = duration ?? Math.max(1, ...tasks.map((t) => t.end)) + 2;
  const [inner, setInner] = React.useState(defaultTime);
  const [playing, setPlaying] = React.useState(autoPlay);
  const now = Math.min(total, Math.max(0, time ?? inner));
  const nowRef = React.useRef(now);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const scrub = React.useRef(false);
  const cb = React.useRef(onTimeChange);
  React.useEffect(() => {
    nowRef.current = now;
    cb.current = onTimeChange;
  });

  const setTime = React.useCallback(
    (t: number) => {
      const v = Math.min(total, Math.max(0, t));
      if (time === undefined) setInner(v);
      cb.current?.(v);
    },
    [time, total],
  );

  React.useEffect(() => {
    if (!playing) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => {
        setTime(total);
        setPlaying(false);
      });
      return () => cancelAnimationFrame(raf);
    }
    let last = performance.now();
    let hold = 0;
    const tick = (ts: number) => {
      const dt = Math.min(0.1, (ts - last) / 1000);
      last = ts;
      if (!scrub.current) {
        const cur = nowRef.current;
        if (cur >= total) {
          hold += dt;
          if (!loop) {
            setPlaying(false);
            return;
          }
          if (hold > 1.6) {
            hold = 0;
            setTime(0);
          }
        } else setTime(cur + dt * speed * 6);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, loop, speed, total, setTime]);

  const laneOf = (id: string) => agents.findIndex((a) => a.id === id);
  const pct = (s: number) => (s / total) * 100;
  const byId = new Map(tasks.map((t) => [t.id, t]));

  const fromX = (clientX: number) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    setTime(((clientX - r.left) / r.width) * total);
  };

  const events: { at: number; color: string; text: React.ReactNode; key: string }[] = [];
  tasks.forEach((t) => {
    const a = agents[laneOf(t.agent)];
    if (!a) return;
    events.push({ at: t.start, color: a.color, key: `s${t.id}`, text: <><b>{a.name}</b> started {t.label.toLowerCase()}</> });
    if (t.status === "error") events.push({ at: t.end, color: "#ff5a4f", key: `e${t.id}`, text: <><b>{a.name}</b> flagged a failure in {t.label.toLowerCase()}</> });
  });
  handoffs.forEach((h) => {
    const f = byId.get(h.from);
    const to = byId.get(h.to);
    if (!f || !to) return;
    const fa = agents[laneOf(f.agent)];
    const ta = agents[laneOf(to.agent)];
    if (fa && ta) events.push({ at: f.end + 0.01, color: fa.color, key: `h${h.from}${h.to}`, text: <><b>{fa.name}</b> → <b>{ta.name}</b>: {h.label}</> });
  });
  events.sort((a, b) => a.at - b.at);
  const lastEvent = [...events].reverse().find((e) => e.at <= now);
  const finished = now >= Math.max(...tasks.map((t) => t.end));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * total));
  const lanes = agents.length;

  return (
    <div className={["hb-wj5", className].filter(Boolean).join(" ")} style={{ "--hb-wj5-a": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-agent-run-lanes" precedence="default">{css}</style>
      <div className="hb-wj5-top">
        <button
          type="button"
          className="hb-wj5-play"
          aria-label={playing ? "Pause replay" : "Play replay"}
          onClick={() => {
            if (!playing && now >= total) setTime(0);
            setPlaying((p) => !p);
          }}
        >
          {playing ? <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1.5h2v7H2zM6 1.5h2v7H6z" fill="currentColor" /></svg> : <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.5 1.2v7.6L8.8 5Z" fill="currentColor" /></svg>}
        </button>
        <p className="hb-wj5-title">{title}</p>
        <span className="hb-wj5-clock"><b>{clock(now)}</b> / {clock(total)}</span>
      </div>
      <div className="hb-wj5-grid">
        <div>
          {agents.map((a) => {
            const live = tasks.some((t) => t.agent === a.id && now >= t.start && now < t.end);
            return (
              <div key={a.id} className="hb-wj5-who" style={{ "--c": a.color } as React.CSSProperties}>
                <span className="hb-wj5-av" data-live={live} aria-hidden="true">{a.name[0]}</span>
                <span className="hb-wj5-nm"><b>{a.name}</b>{a.role && <span>{a.role}</span>}</span>
              </div>
            );
          })}
        </div>
        <div>
          <div
            ref={trackRef}
            className="hb-wj5-track"
            role="slider"
            tabIndex={0}
            aria-label="Replay position"
            aria-valuemin={0}
            aria-valuemax={Math.round(total)}
            aria-valuenow={Math.round(now)}
            aria-valuetext={`${clock(now)} of ${clock(total)}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              scrub.current = true;
              fromX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (scrub.current) fromX(e.clientX);
            }}
            onPointerUp={() => { scrub.current = false; }}
            onPointerCancel={() => { scrub.current = false; }}
            onKeyDown={(e) => {
              const step = e.shiftKey ? 10 : 2;
              if (e.key === "ArrowRight") setTime(now + step);
              else if (e.key === "ArrowLeft") setTime(now - step);
              else if (e.key === "Home") setTime(0);
              else if (e.key === "End") setTime(total);
              else if (e.key === " ") setPlaying((p) => !p);
              else return;
              e.preventDefault();
            }}
          >
            {agents.map((a) => (
              <div key={a.id} className="hb-wj5-lane">
                {tasks
                  .filter((t) => t.agent === a.id)
                  .map((t) => {
                    const p = Math.min(1, Math.max(0, (now - t.start) / (t.end - t.start)));
                    const state = p <= 0 ? "wait" : p < 1 ? "run" : "done";
                    return (
                      <div key={t.id} className="hb-wj5-bar" data-state={state} data-error={t.status === "error"} title={`${a.name}: ${t.label} (${t.end - t.start}s)`} style={{ "--c": a.color, left: `${pct(t.start).toFixed(2)}%`, width: `${pct(t.end - t.start).toFixed(2)}%` } as React.CSSProperties}>
                        <i className="hb-wj5-fill" style={{ transform: `scaleX(${p.toFixed(3)})` }} />
                        <span>{t.label}</span>
                      </div>
                    );
                  })}
              </div>
            ))}
            <svg className="hb-wj5-links" viewBox={`0 0 100 ${lanes * 10}`} preserveAspectRatio="none" aria-hidden="true">
              {handoffs.map((h) => {
                const f = byId.get(h.from);
                const to = byId.get(h.to);
                if (!f || !to) return null;
                const x1 = pct(f.end);
                const x2 = pct(to.start);
                const y1 = laneOf(f.agent) * 10 + 5;
                const y2 = laneOf(to.agent) * 10 + 5;
                const mx = (x1 + x2) / 2;
                return <path key={`${h.from}-${h.to}`} pathLength={1} vectorEffect="non-scaling-stroke" data-on={now >= f.end} d={`M${x1.toFixed(2)} ${y1} C${mx.toFixed(2)} ${y1}, ${mx.toFixed(2)} ${y2}, ${x2.toFixed(2)} ${y2}`} />;
              })}
            </svg>
            <div className="hb-wj5-head" style={{ left: `${pct(now).toFixed(3)}%` }} />
          </div>
          <div className="hb-wj5-axis" aria-hidden="true">
            {ticks.map((t, i) => (
              <span key={i} style={{ left: `${pct(t).toFixed(2)}%` }}>{clock(t)}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="hb-wj5-log" role="status" style={{ "--c": finished ? "#34c78a" : lastEvent?.color } as React.CSSProperties}>
        <i />
        {finished ? <span key="done"><b>Run complete</b> · {tasks.length} tasks, {handoffs.length} handoffs, {tasks.filter((t) => t.status === "error").length} retries</span> : lastEvent ? <span key={lastEvent.key}>{lastEvent.text}</span> : <span key="idle">Waiting to start</span>}
      </div>
    </div>
  );
}

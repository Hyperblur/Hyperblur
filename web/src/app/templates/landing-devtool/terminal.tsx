"use client";

import * as React from "react";

interface Task {
  name: string;
  detail: string;
  time: string;
  ms: number;
  bar?: boolean;
}

const command = "forge deploy --prod";

const tasks: Task[] = [
  { name: "Resolving workspace", detail: "12 packages, 3 apps", time: "0.21s", ms: 420 },
  { name: "Restoring remote cache", detail: "1,284 / 1,312 hits", time: "0.84s", ms: 760 },
  { name: "Type-checking", detail: "tsc --build, 28 changed", time: "2.10s", ms: 900 },
  { name: "Building", detail: "28 tasks", time: "4.92s", ms: 1500, bar: true },
  { name: "Uploading", detail: "3.4 MB delta", time: "0.63s", ms: 520 },
  { name: "Smoke checks", detail: "14 / 14 passed", time: "0.71s", ms: 560 },
];

const summary = [
  { k: "Preview", v: "https://acme-web-7f3a2c.forge.run" },
  { k: "Production", v: "https://acme.dev  promoted" },
  { k: "Rollback", v: "forge rollback 7f3a2c" },
];

interface Frame {
  delay: number;
  typed: number;
  task: number;
  out: number;
}

function buildTimeline(): Frame[] {
  const frames: Frame[] = [{ delay: 0, typed: 0, task: -1, out: 0 }];
  for (let k = 1; k <= command.length; k++) {
    frames.push({ delay: k === 1 ? 650 : 34 + (k % 3) * 18, typed: k, task: -1, out: 0 });
  }
  frames.push({ delay: 420, typed: command.length, task: 0, out: 0 });
  tasks.forEach((t, i) => {
    frames.push({ delay: t.ms, typed: command.length, task: i + 1, out: 0 });
  });
  for (let o = 1; o <= summary.length + 1; o++) {
    frames.push({ delay: o === 1 ? 160 : 130, typed: command.length, task: tasks.length, out: o });
  }
  return frames;
}

const timeline = buildTimeline();
const last = timeline.length - 1;

function pad(s: string, n: number) {
  return s.length >= n ? s : s + " ".repeat(n - s.length);
}

export function Terminal() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [run, setRun] = React.useState(0);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let timer = 0;
    let started = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = (i: number) => {
      if (i > last) return;
      timer = window.setTimeout(() => {
        setIndex(i);
        play(i + 1);
      }, timeline[i].delay);
    };

    const start = () => {
      if (started) return;
      started = true;
      if (reduced) {
        timer = window.setTimeout(() => setIndex(last), 0);
        return;
      }
      play(1);
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return () => window.clearTimeout(timer);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [run]);

  const f = timeline[index];
  const finished = index === last;
  const typing = f.task < 0;

  function replay() {
    setIndex(0);
    setRun((r) => r + 1);
  }

  return (
    <div ref={rootRef} className="hbl-dv-term text-left">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden font-mono text-[11.5px]">
          <span className="truncate rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[#f4f4f0]">
            ~/acme/web
          </span>
          <span className="hidden truncate px-2.5 py-1 text-[#6f6f69] sm:inline">~/acme/api</span>
        </div>
        <button
          type="button"
          onClick={replay}
          disabled={!finished}
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-[#a3a39b] transition-colors hover:border-[#a3e635]/50 hover:text-[#a3e635] disabled:cursor-default disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:text-[#a3a39b]"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.1" />
            <path d="M2.5 2.5v3h3" />
          </svg>
          Replay
        </button>
      </div>

      <div className="hbl-dv-tsplit">
        <p className="sr-only">
          Terminal running forge deploy --prod: 1,284 of 1,312 tasks restored from the remote cache, build finished, deployed acme-web-7f3a2c to production in 9.41 seconds.
        </p>
        <div className="hbl-dv-term-body min-w-0 px-4 py-5 sm:px-6" aria-hidden="true">
          <div className="text-[#6f6f69]">
            <span className="text-[#a3e635]">acme/web</span> on <span className="text-[#f4f4f0]">main</span> via node 24.3
          </div>
          <div>
            <span className="text-[#a3e635]">❯ </span>
            <span className="text-[#f4f4f0]">{command.slice(0, f.typed)}</span>
            {typing ? <span className="hbl-dv-caret" aria-hidden="true" /> : null}
          </div>
          <div className="hbl-dv-tl text-[#6f6f69]" data-on={f.task >= 0}>
            {"  "}forge 3.2.0 · project <span className="text-[#f4f4f0]">acme/web</span> · region iad1 · cache warm
          </div>
          <div className="hbl-dv-tl" data-on={f.task >= 0}>
            {" "}
          </div>
          {tasks.map((t, i) => {
            const on = f.task >= i;
            const running = f.task === i;
            const done = f.task > i;
            return (
              <div key={t.name} className="hbl-dv-tl" data-on={on}>
                {"  "}
                {done ? <span className="text-[#a3e635]">✓</span> : running ? <span className="hbl-dv-spin" aria-hidden="true" /> : <span> </span>}
                {"  "}
                <span className="text-[#f4f4f0]">{pad(t.name, 24)}</span>
                {t.bar ? (
                  <>
                    <span
                      className="hbl-dv-prog"
                      data-run={running}
                      style={{ "--hbl-dv-d": `${t.ms}ms` } as React.CSSProperties}
                      aria-hidden="true"
                    >
                      {running || done ? <i /> : null}
                    </span>
                    <span className="text-[#6f6f69]">{"  "}{pad(t.detail, 11)}</span>
                  </>
                ) : (
                  <span className="text-[#6f6f69]">{pad(t.detail, 23)}</span>
                )}
                <span className={done ? "text-[#a3a39b]" : "text-[#6f6f69]"}>{done ? t.time : running ? "…" : ""}</span>
              </div>
            );
          })}
          <div className="hbl-dv-tl" data-on={f.out >= 1}>
            {" "}
          </div>
          <div className="hbl-dv-tl" data-on={f.out >= 1}>
            {"  "}
            <span className="rounded-sm bg-[#a3e635] px-1.5 font-semibold text-[#0b0b0c]">DEPLOYED</span>
            <span className="text-[#f4f4f0]"> acme-web-7f3a2c</span>
            <span className="text-[#6f6f69]"> in </span>
            <span className="text-[#a3e635]">9.41s</span>
          </div>
          {summary.map((s, i) => (
            <div key={s.k} className="hbl-dv-tl" data-on={f.out >= i + 2}>
              {"  "}
              <span className="text-[#6f6f69]">{pad(s.k, 12)}</span>
              <span className={i === 2 ? "text-[#a3a39b]" : "text-[#f4f4f0] underline decoration-white/20 underline-offset-4"}>{s.v}</span>
            </div>
          ))}
          <div className="hbl-dv-tl" data-on={finished}>
            <span className="text-[#a3e635]">❯ </span>
            <span className="hbl-dv-caret" aria-hidden="true" />
          </div>
        </div>

        <aside className="hidden border-l border-white/10 bg-white/[0.015] p-5 font-mono text-[11.5px] lg:block" aria-hidden="true">
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#6f6f69]">Pipeline</p>
          <ol className="mt-4 space-y-2.5">
            {tasks.map((t, i) => {
              const done = f.task > i;
              const running = f.task === i;
              return (
                <li key={t.name} className="flex items-center gap-2.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${done ? "bg-[#a3e635]" : running ? "hbl-dv-pulse bg-[#a3e635]" : "bg-white/15"}`}
                    aria-hidden="true"
                  />
                  <span className={done || running ? "text-[#f4f4f0]" : "text-[#6f6f69]"}>{t.name}</span>
                  <span className="ml-auto text-[#6f6f69]">{done ? t.time : ""}</span>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#6f6f69]">Cache</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-[26px] font-semibold tracking-[-0.05em] text-[#f4f4f0]">{f.task >= 2 ? "97.8" : "0.0"}<span className="text-[14px] text-[#6f6f69]">%</span></span>
              <span className="text-[#a3e635]">{f.task >= 2 ? "+1,284 hits" : "waiting"}</span>
            </div>
            <div className="mt-3 grid grid-cols-12 gap-[3px]" aria-hidden="true">
              {Array.from({ length: 36 }, (_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-[2px] transition-colors duration-300 motion-reduce:transition-none ${f.task >= 2 && i % 17 !== 5 ? "bg-[#a3e635]/80" : f.task >= 2 ? "bg-white/20" : "bg-white/[0.06]"}`}
                  style={{ transitionDelay: `${(i % 12) * 30}ms` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#6f6f69]">Status</p>
            <p className={`mt-2 ${finished ? "text-[#a3e635]" : "text-[#a3a39b]"}`}>{finished ? "Live on 3 regions" : f.task >= 0 ? "Deploying…" : "Idle"}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

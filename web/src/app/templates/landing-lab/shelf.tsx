"use client";

import * as React from "react";
import { DecodeText } from "@/registry/hyperblur/decode-text";
import { studies, kinds, type Kind } from "./data";
import { CardArt } from "./card-art";
import { ArrowLeft, ArrowRight, Pause, Play } from "./icons";

type Filter = "ALL" | Kind;

const filters: Filter[] = ["ALL", ...kinds];
const AUTOPLAY_MS = 4200;

function wrap(d: number, n: number) {
  return ((((d % n) + n + n / 2) % n) + n) % n - n / 2;
}

function mod(a: number, n: number) {
  return ((a % n) + n) % n;
}

export function Shelf() {
  const [filter, setFilter] = React.useState<Filter>("ALL");
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [drag, setDrag] = React.useState(false);

  const list = React.useMemo(() => (filter === "ALL" ? studies : studies.filter((s) => s.kind === filter)), [filter]);
  const n = list.length;
  const current = list[mod(active, n)] ?? list[0];

  const stageRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const azRef = React.useRef<HTMLSpanElement>(null);
  const playRef = React.useRef(true);
  const sim = React.useRef({
    rot: 0,
    target: 0,
    vel: 0,
    down: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    lastX: 0,
    lastT: 0,
    px: 180,
    hover: false,
    focus: false,
    visible: true,
    reduced: false,
    lastInput: 0,
    touch: false,
    shown: 0,
  });

  React.useEffect(() => {
    playRef.current = playing;
  }, [playing]);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      sim.current.visible = entries.some((e) => e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const s = sim.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reduced = mq.matches;
    const onMq = () => {
      s.reduced = mq.matches;
    };
    mq.addEventListener("change", onMq);
    s.lastInput = performance.now();
    const step = n >= 8 ? 360 / n : 36;
    let raf = 0;
    let last = performance.now();
    let force = true;

    const apply = () => {
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const d = wrap(i - s.rot, n);
        const abs = Math.abs(d);
        const edge = n / 2;
        const vis = n >= 8 ? 1 : Math.max(0, Math.min(1, (edge - abs) / 0.6));
        const fade = abs <= 2 ? 1 - abs * 0.17 : Math.max(0, 0.66 - (abs - 2) * 0.33);
        const opacity = vis * fade;
        const bright = 1 - Math.min(abs, 3) * 0.17;
        const blur = Math.min(abs, 3) * 0.45;
        const a = d * step;
        el.style.transform = `rotateY(${a.toFixed(3)}deg) translateZ(var(--hbl-lb-r)) rotateY(${(-a * 0.55).toFixed(3)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = abs < 0.04 ? "none" : `brightness(${bright.toFixed(3)}) saturate(${(1 - Math.min(abs, 1) * 0.5).toFixed(3)}) blur(${blur.toFixed(2)}px)`;
        el.style.pointerEvents = opacity < 0.06 ? "none" : "auto";
      }
      if (azRef.current) azRef.current.textContent = mod(s.rot * step, 360).toFixed(1).padStart(5, "0");
      const idx = mod(Math.round(s.rot), n);
      if (idx !== s.shown) {
        s.shown = idx;
        setActive(idx);
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!s.visible && !force) return;
      if (s.touch) {
        s.touch = false;
        s.lastInput = now;
      }
      const before = s.rot;
      if (s.reduced) {
        if (!s.dragging) {
          s.rot = s.target;
          s.vel = 0;
        }
      } else if (!s.dragging) {
        if (Math.abs(s.vel) > 0.6) {
          s.rot += s.vel * dt;
          s.vel *= Math.exp(-3.4 * dt);
          s.target = Math.round(s.rot);
        } else {
          s.vel = 0;
          s.rot += (s.target - s.rot) * (1 - Math.exp(-dt * 8.5));
          if (Math.abs(s.target - s.rot) < 0.0005) s.rot = s.target;
        }
        const idle = !s.hover && !s.focus && !s.down && s.vel === 0 && Math.abs(s.target - s.rot) < 0.02;
        if (playRef.current && idle && now - s.lastInput > AUTOPLAY_MS) {
          s.target += 1;
          s.lastInput = now;
        }
      }
      if (force || before !== s.rot || s.dragging) {
        force = false;
        apply();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onMq);
    };
  }, [n, list]);

  const goBy = (delta: number) => {
    const s = sim.current;
    s.vel = 0;
    s.target = Math.round(s.target) + delta;
    s.touch = true;
  };

  const goTo = (i: number) => {
    const s = sim.current;
    s.vel = 0;
    s.target = Math.round(s.target) + wrap(i - Math.round(s.target), n);
    s.touch = true;
  };

  const pickFilter = (f: Filter) => {
    if (f === filter) return;
    const s = sim.current;
    s.rot = s.reduced ? 0 : -1.6;
    s.target = 0;
    s.vel = 0;
    s.shown = 0;
    s.touch = true;
    cardRefs.current = [];
    setActive(0);
    setFilter(f);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest(".hbl-lb-arrow")) return;
    const s = sim.current;
    s.down = true;
    s.dragging = false;
    s.pointerId = e.pointerId;
    s.startX = e.clientX;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.vel = 0;
    s.px = e.currentTarget.clientWidth < 640 ? 120 : 190;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (!s.down || e.pointerId !== s.pointerId) return;
    if (!s.dragging) {
      if (Math.abs(e.clientX - s.startX) < 5) return;
      s.dragging = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDrag(true);
    }
    const now = performance.now();
    const dx = e.clientX - s.lastX;
    const dt = Math.max(1, now - s.lastT) / 1000;
    s.rot -= dx / s.px;
    const v = -dx / s.px / dt;
    s.vel = Math.max(-14, Math.min(14, s.vel * 0.55 + v * 0.45));
    s.lastX = e.clientX;
    s.lastT = now;
    s.lastInput = now;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (!s.down || e.pointerId !== s.pointerId) return;
    s.down = false;
    if (!s.dragging) return;
    s.dragging = false;
    setDrag(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (performance.now() - s.lastT > 90) s.vel = 0;
    s.target = Math.round(s.rot + (s.reduced ? 0 : s.vel * 0.12));
    if (s.reduced) s.vel = 0;
    s.lastInput = performance.now();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goBy(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBy(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(n - 1);
    } else if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  };

  const counts = React.useMemo(() => {
    const m: Record<string, number> = { ALL: studies.length };
    for (const s of studies) m[s.kind] = (m[s.kind] ?? 0) + 1;
    return m;
  }, []);

  return (
    <div id="shelf" className="scroll-mt-24">
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter the shelf">
        {filters.map((f) => (
          <button key={f} type="button" className="hbl-lb-chip" aria-pressed={filter === f} onClick={() => pickFilter(f)}>
            {f}
            <span className="hbl-lb-chip-n">{String(counts[f] ?? 0).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-6">
        <div
          ref={stageRef}
          className="hbl-lb-stage"
          data-drag={drag}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={`Study shelf, ${n} items. Use left and right arrow keys to rotate, space to pause.`}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={() => {
            sim.current.hover = true;
          }}
          onPointerLeave={() => {
            sim.current.hover = false;
          }}
          onFocus={() => {
            sim.current.focus = true;
          }}
          onBlur={() => {
            sim.current.focus = false;
          }}
        >
          <div className="hbl-lb-ring">
            <svg className="hbl-lb-orbit" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(217,222,232,.38)" strokeWidth="0.55" strokeDasharray="0.1 2.1" strokeLinecap="round" />
              <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255,77,77,.22)" strokeWidth="0.3" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(217,222,232,.12)" strokeWidth="0.3" strokeDasharray="0.1 3" strokeLinecap="round" />
              <circle cx="100" cy="198" r="1.2" fill="#ff4d4d" />
            </svg>
            {list.map((s, i) => (
              <button
                key={`${filter}-${s.code}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                tabIndex={-1}
                aria-label={`${s.title}, ${s.kind} study`}
                className="hbl-lb-card"
                data-front={mod(active, n) === i}
                style={{ opacity: 0 }}
                onClick={() => goTo(i)}
              >
                <span className="hbl-lb-card-art">
                  <CardArt kind={s.kind} seed={s.seed} code={s.code} />
                </span>
                <span className="hbl-lb-card-foot block">
                  <span className="hbl-lb-label block">{s.code} · {s.status}</span>
                  <span className="hbl-lb-card-title mt-1 block">{s.title}</span>
                </span>
              </button>
            ))}
          </div>
          <button type="button" className="hbl-lb-arrow hbl-lb-arrow-l" aria-label="Previous study" onClick={() => goBy(-1)}>
            <ArrowLeft />
          </button>
          <button type="button" className="hbl-lb-arrow hbl-lb-arrow-r" aria-label="Next study" onClick={() => goBy(1)}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="hbl-lb-panel mt-2 p-5 sm:p-6" aria-live="polite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end">
          <div className="min-w-0">
            <p className="hbl-lb-kicker">
              {current.code} / {current.kind} study
            </p>
            <h3 className="mt-3 font-grotesk text-[28px] font-medium leading-tight tracking-[-0.02em] text-[#eef1f6] sm:text-[34px]">
              <DecodeText key={current.code} text={current.title} duration={0.55} stagger={0.03} glyphs="ABCDEFGHJKLMNPRSTUVXYZ0123456789/#" />
            </h3>
            <p className="hbl-lb-copy mt-3 max-w-[520px] text-[15px]">{current.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#featured" className="hbl-lb-btn hbl-lb-btn-red">Open study</a>
              <a href="#process" className="hbl-lb-btn">View source</a>
            </div>
          </div>
          <dl className="hbl-lb-meta min-w-0">
            <div>
              <dt className="hbl-lb-label">Status</dt>
              <dd>
                <span className={`hbl-lb-dot mr-2 ${current.status === "Field test" ? "hbl-lb-dot-red" : ""}`} aria-hidden="true" />
                {current.status}
              </dd>
            </div>
            <div>
              <dt className="hbl-lb-label">Stack</dt>
              <dd>{current.stack}</dd>
            </div>
            <div>
              <dt className="hbl-lb-label">Size</dt>
              <dd>{current.size}</dd>
            </div>
            <div>
              <dt className="hbl-lb-label">Build</dt>
              <dd>{current.build}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="hbl-lb-status mt-2">
        <span className="hbl-lb-label"><span className="hbl-lb-key">◂</span><span className="hbl-lb-key">▸</span>Rotate</span>
        <span className="hbl-lb-label hidden sm:inline"><span className="hbl-lb-key">Drag</span>Spin</span>
        <span className="hbl-lb-label hidden sm:inline"><span className="hbl-lb-key">Space</span>Pause</span>
        <span className="flex-1" aria-hidden="true" />
        <span className="hbl-lb-label tabular-nums">
          Item <span className="text-[#d9dee8]">{String(mod(active, n) + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
        </span>
        <span className="hbl-lb-label tabular-nums">
          Az <span ref={azRef} className="text-[#d9dee8]">000.0</span>°
        </span>
        <button type="button" onClick={() => setPlaying((p) => !p)} className="hbl-lb-label inline-flex items-center gap-2 hover:text-[#d9dee8]" aria-pressed={playing}>
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? "Auto" : "Paused"}
        </button>
      </div>
    </div>
  );
}

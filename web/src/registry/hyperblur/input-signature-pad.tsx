"use client";

import * as React from "react";

export type InputSignaturePoint = { x: number; y: number; w?: number };

export interface InputSignaturePadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  signer?: string;
  height?: number;
  inks?: string[];
  minWidth?: number;
  maxWidth?: number;
  defaultStrokes?: InputSignaturePoint[][];
  onChange?: (dataUrl: string | null) => void;
  onConfirm?: (result: { dataUrl: string | null; typed: string | null; signedAt: string }) => void;
  confirmLabel?: string;
  accent?: string;
}

const css = `
.hb-xg12 {
  --hb-xg12-c: #2f7bff;
  --hb-xg12-h: 160px;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  color: #ededed;
}
.hb-xg12 *, .hb-xg12 *::before, .hb-xg12 *::after { box-sizing: border-box; }
.hb-xg12-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 0 0 7px; }
.hb-xg12-label { font-size: 12.5px; font-weight: 500; color: #a1a1a1; }
.hb-xg12-mode {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
  box-shadow: inset 0 -1px 0 #3a3a3a;
}
.hb-xg12-mode:hover { color: #ededed; }
.hb-xg12-mode:focus-visible { outline: 2px solid var(--hb-xg12-c); outline-offset: 2px; }
.hb-xg12-pad {
  position: relative;
  height: var(--hb-xg12-h);
  border: 1px solid #262626;
  border-radius: 14px;
  background:
    radial-gradient(120% 100% at 50% 0%, rgba(255, 255, 255, 0.03), transparent 60%),
    repeating-linear-gradient(0deg, transparent 0 23px, rgba(255, 255, 255, 0.018) 23px 24px),
    linear-gradient(180deg, #131313, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045), inset 0 -20px 40px -30px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.hb-xg12[data-active="true"] .hb-xg12-pad { border-color: #3a3a3a; }
.hb-xg12-canvas { position: absolute; inset: 0; width: 100%; height: 100%; touch-action: none; cursor: crosshair; outline: 0; }
.hb-xg12-canvas:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-xg12-c); border-radius: 13px; }
.hb-xg12-base {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 30%;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  pointer-events: none;
}
.hb-xg12-base span { font-size: 15px; line-height: 1; color: #4a4a4a; transform: translateY(5px); }
.hb-xg12-base i { flex: 1; height: 1px; background: repeating-linear-gradient(90deg, #333 0 6px, transparent 6px 10px); }
.hb-xg12-ph {
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  text-align: center;
  font-size: 12.5px;
  color: #5a5a5a;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-xg12[data-empty="false"] .hb-xg12-ph { opacity: 0; transform: translateY(-6px); }
.hb-xg12-typed {
  position: absolute;
  left: 34px;
  right: 18px;
  bottom: calc(30% + 2px);
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--hb-xg12-ink);
  font-family: var(--font-grotesk), var(--font-sans), sans-serif;
  font-size: clamp(22px, 9cqi, 34px);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  caret-color: var(--hb-xg12-c);
}
.hb-xg12-typed::placeholder { color: #3a3a3a; }
.hb-xg12-pad { container-type: inline-size; }
.hb-xg12-stamp {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 10px 5px 6px;
  border: 1px solid rgba(63, 191, 127, 0.35);
  border-radius: 999px;
  background: rgba(16, 40, 28, 0.85);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-size: 11.5px;
  color: #8fe3b4;
  animation: hb-xg12-stamp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg12-stamp svg { width: 16px; height: 16px; }
.hb-xg12-stamp path { stroke-dasharray: 16; stroke-dashoffset: 16; animation: hb-xg12-draw 0.45s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards; }
.hb-xg12[data-done="true"] .hb-xg12-canvas, .hb-xg12[data-done="true"] .hb-xg12-typed { pointer-events: none; }
.hb-xg12[data-done="true"] .hb-xg12-base i { background: rgba(63, 191, 127, 0.4); }
.hb-xg12-bar { display: flex; align-items: center; gap: 8px; margin-top: 9px; }
.hb-xg12-inks { display: flex; gap: 5px; padding: 3px; border: 1px solid #222; border-radius: 999px; background: #0f0f0f; }
.hb-xg12-ink {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--hb-xg12-sw);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 -3px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xg12-ink[aria-pressed="true"] { transform: scale(0.82); box-shadow: 0 0 0 2px #0f0f0f, 0 0 0 3.5px var(--hb-xg12-sw); }
.hb-xg12-ink:focus-visible { outline: 2px solid var(--hb-xg12-c); outline-offset: 3px; }
.hb-xg12-tool {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 1px solid #262626;
  border-radius: 9px;
  background: linear-gradient(180deg, #1a1a1a, #131313);
  color: #a1a1a1;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}
.hb-xg12-tool:hover:not(:disabled) { color: #ededed; border-color: #3a3a3a; }
.hb-xg12-tool:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-xg12-tool:focus-visible { outline: 2px solid var(--hb-xg12-c); outline-offset: 2px; }
.hb-xg12-tool svg { width: 14px; height: 14px; }
.hb-xg12-sp { flex: 1; }
.hb-xg12-go {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  margin: 0;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xg12-c) 80%, #fff), var(--hb-xg12-c));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 8px 18px -10px var(--hb-xg12-c);
  color: #fff;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.hb-xg12-go:active:not(:disabled) { transform: scale(0.96); }
.hb-xg12-go:disabled { opacity: 0.35; cursor: not-allowed; }
.hb-xg12-go:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.hb-xg12[data-done="true"] .hb-xg12-go { background: #1a1a1a; box-shadow: inset 0 0 0 1px #2e2e2e; color: #ededed; }
@keyframes hb-xg12-stamp { from { opacity: 0; transform: scale(1.4) rotate(-6deg); } }
@keyframes hb-xg12-draw { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xg12 *, .hb-xg12 path { transition: none !important; animation: none !important; }
  .hb-xg12-stamp path { stroke-dashoffset: 0; }
}
`;

type P = { x: number; y: number; w: number };
type Stroke = { ink: string; pts: P[] };

function withWidths(pts: InputSignaturePoint[], minW: number, maxW: number): P[] {
  let prev = (minW + maxW) / 2;
  return pts.map((p, i) => {
    if (p.w !== undefined) return { x: p.x, y: p.y, w: p.w };
    const q = pts[i - 1] ?? p;
    const d = Math.hypot(p.x - q.x, p.y - q.y) * 400;
    const target = Math.max(minW, maxW - d * 0.18);
    prev = prev + (target - prev) * 0.4;
    return { x: p.x, y: p.y, w: prev };
  });
}

export function InputSignaturePad({
  label = "Signature",
  signer = "Jordan Ellis",
  height = 160,
  inks = ["#ededed", "#7fb3ff", "#f5c542"],
  minWidth = 0.9,
  maxWidth = 3.4,
  defaultStrokes,
  onChange,
  onConfirm,
  confirmLabel = "Adopt and sign",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: InputSignaturePadProps) {
  const id = React.useId();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const strokes = React.useRef<Stroke[]>([]);
  const seeded = React.useRef(false);
  const live = React.useRef<{ last: number; w: number } | null>(null);
  const [ink, setInk] = React.useState(inks[0]);
  const [count, setCount] = React.useState(defaultStrokes?.length ?? 0);
  const [active, setActive] = React.useState(false);
  const [typedMode, setTypedMode] = React.useState(false);
  const [typed, setTyped] = React.useState("");
  const [signedAt, setSignedAt] = React.useState<string | null>(null);

  const paint = React.useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = c.clientWidth;
    const H = c.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const s of strokes.current) {
      ctx.strokeStyle = s.ink;
      ctx.fillStyle = s.ink;
      const pts = s.pts;
      if (pts.length === 1) {
        ctx.beginPath();
        ctx.arc(pts[0].x * W, pts[0].y * H, pts[0].w / 2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const p0 = i === 1 ? a : { x: (pts[i - 2].x + a.x) / 2, y: (pts[i - 2].y + a.y) / 2 };
        const p1 = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        ctx.beginPath();
        ctx.lineWidth = (a.w + b.w) / 2;
        ctx.moveTo(p0.x * W, p0.y * H);
        ctx.quadraticCurveTo(a.x * W, a.y * H, p1.x * W, p1.y * H);
        ctx.stroke();
      }
    }
  }, []);

  React.useEffect(() => {
    if (!seeded.current && defaultStrokes) {
      seeded.current = true;
      strokes.current = defaultStrokes.map((s) => ({ ink: inks[0], pts: withWidths(s, minWidth, maxWidth) }));
    }
    paint();
    const c = canvasRef.current;
    if (!c) return;
    const ro = new ResizeObserver(() => paint());
    ro.observe(c);
    return () => ro.disconnect();
  }, [paint, defaultStrokes, inks, minWidth, maxWidth, typedMode]);

  function emit() {
    const c = canvasRef.current;
    onChange?.(strokes.current.length && c ? c.toDataURL("image/png") : null);
  }

  function point(e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, t: e.timeStamp };
  }

  function onDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (e.button !== 0 || signedAt) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = point(e);
    const w = (minWidth + maxWidth) / 2;
    strokes.current.push({ ink, pts: [{ x: p.x, y: p.y, w }] });
    live.current = { last: p.t, w };
    setActive(true);
    setCount(strokes.current.length);
    paint();
  }

  function onMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const l = live.current;
    if (!l) return;
    const c = canvasRef.current!;
    const s = strokes.current[strokes.current.length - 1];
    const events = typeof e.nativeEvent.getCoalescedEvents === "function" ? e.nativeEvent.getCoalescedEvents() : [e.nativeEvent];
    for (const ev of events.length ? events : [e.nativeEvent]) {
      const p = point(ev);
      const prev = s.pts[s.pts.length - 1];
      const dist = Math.hypot((p.x - prev.x) * c.clientWidth, (p.y - prev.y) * c.clientHeight);
      if (dist < 1.2) continue;
      const dt = Math.max(1, p.t - l.last);
      const v = dist / dt;
      const target = Math.max(minWidth, Math.min(maxWidth, maxWidth - v * 1.6));
      l.w = l.w + (target - l.w) * 0.32;
      l.last = p.t;
      s.pts.push({ x: p.x, y: p.y, w: l.w });
    }
    paint();
  }

  function onUp() {
    if (!live.current) return;
    live.current = null;
    setActive(false);
    emit();
  }

  function undo() {
    strokes.current.pop();
    setCount(strokes.current.length);
    paint();
    emit();
  }

  function clear() {
    strokes.current = [];
    setCount(0);
    setTyped("");
    paint();
    emit();
  }

  function confirm() {
    if (signedAt) {
      setSignedAt(null);
      return;
    }
    const stamp = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format();
    setSignedAt(stamp);
    const c = canvasRef.current;
    onConfirm?.({
      dataUrl: !typedMode && strokes.current.length && c ? c.toDataURL("image/png") : null,
      typed: typedMode ? typed.trim() : null,
      signedAt: stamp,
    });
  }

  const empty = typedMode ? typed.trim() === "" : count === 0;
  const vars = { "--hb-xg12-c": accent, "--hb-xg12-h": `${height}px`, "--hb-xg12-ink": ink, ...style } as React.CSSProperties;

  return (
    <div
      className={`hb-xg12 ${className}`}
      style={vars}
      data-empty={empty}
      data-active={active}
      data-done={!!signedAt}
      role="group"
      aria-labelledby={`${id}-l`}
      {...rest}
    >
      <style href="hb-input-signature-pad" precedence="default">{css}</style>
      <div className="hb-xg12-top">
        <span className="hb-xg12-label" id={`${id}-l`}>
          {label}
        </span>
        <button type="button" className="hb-xg12-mode" onClick={() => setTypedMode((t) => !t)} disabled={!!signedAt}>
          {typedMode ? "Draw instead" : "Type instead"}
        </button>
      </div>
      <div className="hb-xg12-pad">
        <div className="hb-xg12-base" aria-hidden="true">
          <span>×</span>
          <i />
        </div>
        {typedMode ? (
          <input
            className="hb-xg12-typed"
            value={typed}
            placeholder={signer}
            aria-label="Type your full name"
            onChange={(e) => setTyped(e.target.value)}
            readOnly={!!signedAt}
          />
        ) : (
          <>
            <span className="hb-xg12-ph" aria-hidden="true">
              Sign with your mouse, finger or stylus
            </span>
            <canvas
              ref={canvasRef}
              className="hb-xg12-canvas"
              role="img"
              aria-label={count ? `Signature with ${count} stroke${count === 1 ? "" : "s"}` : "Empty signature area"}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            />
          </>
        )}
        {signedAt && (
          <span className="hb-xg12-stamp" role="status">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3.5 8.4l3 3 6-6.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Signed by {typedMode && typed.trim() ? typed.trim() : signer} · {signedAt}
          </span>
        )}
      </div>
      <div className="hb-xg12-bar">
        <div className="hb-xg12-inks" role="group" aria-label="Ink color">
          {inks.map((c) => (
            <button
              key={c}
              type="button"
              className="hb-xg12-ink"
              style={{ "--hb-xg12-sw": c } as React.CSSProperties}
              aria-pressed={ink === c}
              aria-label={`Ink ${c}`}
              disabled={!!signedAt}
              onClick={() => setInk(c)}
            />
          ))}
        </div>
        <button type="button" className="hb-xg12-tool" aria-label="Undo last stroke" onClick={undo} disabled={typedMode || count === 0 || !!signedAt}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4.5 3L2 5.5 4.5 8" />
            <path d="M2 5.5h6.2a3.3 3.3 0 0 1 0 6.6H6" />
          </svg>
        </button>
        <button type="button" className="hb-xg12-tool" aria-label="Clear signature" onClick={clear} disabled={empty || !!signedAt}>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 4h9M5.5 4V2.6h3V4M3.6 4l.6 7.6a1 1 0 0 0 1 .9h3.6a1 1 0 0 0 1-.9l.6-7.6" />
          </svg>
        </button>
        <span className="hb-xg12-sp" />
        <button type="button" className="hb-xg12-go" onClick={confirm} disabled={empty && !signedAt}>
          {signedAt ? "Edit signature" : confirmLabel}
        </button>
      </div>
    </div>
  );
}

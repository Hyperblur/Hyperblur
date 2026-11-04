"use client";

import * as React from "react";

export interface BgFaultyTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  fontSize?: number;
  scroll?: number;
  glitch?: number;
  radius?: number;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-qp7 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; }
.hb-qp7-c { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.hb-qp7-fx { position: absolute; inset: 0; background: repeating-linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.22) 3px); }
.hb-qp7-vg { position: absolute; inset: 0; background: radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.7) 100%); }
.hb-qp7-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
`;

const words = [
  "kernel", "mount", "socket", "cache", "route", "daemon", "fetch", "relay", "buffer", "shard",
  "worker", "index", "vault", "proxy", "ledger", "beacon", "cipher", "packet", "thread", "queue",
];
const cmds = ["sync", "deploy", "trace", "probe", "patch", "rollback", "scan", "attach", "flush", "tail"];
const flags = ["force", "depth=12", "region=eu-west", "dry-run", "verbose", "no-cache", "retries=5", "watch"];
const states = ["OK", "DONE", "PASS", "READY", "200", "ACK"];
const noise = "01#%&$@*+=<>/\\|{}[]ABCDEF0123456789:;";
const blocks = "█▓▒░";

function rnd(i: number) {
  let x = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

function pick<T>(list: T[], seed: number) {
  return list[Math.floor(rnd(seed) * list.length) % list.length];
}

function hex(n: number, len: number) {
  return (n >>> 0).toString(16).padStart(len, "0").slice(-len);
}

function makeLine(i: number) {
  const s = i * 41 + 7;
  const kind = Math.floor(rnd(s) * 9);
  if (kind === 0) {
    const stamp = (i * 0.137 + 12).toFixed(3).padStart(9, " ");
    return { text: `[${stamp}] ${pick(words, s + 1)}: ${pick(words, s + 2)} ${pick(words, s + 3)} attached`, tone: 0.55 };
  }
  if (kind === 1) {
    let bytes = "";
    let ascii = "";
    for (let b = 0; b < 8; b++) {
      const v = Math.floor(rnd(s + 10 + b) * 256);
      bytes += hex(v, 2) + " ";
      ascii += v > 32 && v < 127 ? String.fromCharCode(v) : ".";
    }
    return { text: `0x${hex(i * 16, 8)}  ${bytes} ${ascii}`, tone: 0.4 };
  }
  if (kind === 2) {
    return { text: `$ ${pick(cmds, s + 1)} ${pick(words, s + 2)} --${pick(flags, s + 3)}`, tone: 1 };
  }
  if (kind === 3) {
    return { text: `WARN ${pick(words, s + 1)} latency ${Math.floor(rnd(s + 2) * 900 + 40)}ms on node-${Math.floor(rnd(s + 3) * 64)}`, tone: 0.8 };
  }
  if (kind === 4) {
    const pct = Math.floor(rnd(s + 1) * 101);
    const fill = Math.round(pct / 10);
    return { text: `[${"#".repeat(fill)}${".".repeat(10 - fill)}] ${String(pct).padStart(3, " ")}% ${pick(words, s + 2)}.tar`, tone: 0.65 };
  }
  if (kind === 5) {
    return { text: `${pick(words, s + 1)}.${pick(cmds, s + 2)}(0x${hex(Math.floor(rnd(s + 3) * 65535), 4)}) -> ${pick(states, s + 4)}`, tone: 0.6 };
  }
  if (kind === 6) {
    return { text: "", tone: 0 };
  }
  if (kind === 7) {
    return { text: `  ${pick(words, s + 1)}/${pick(words, s + 2)}/${hex(Math.floor(rnd(s + 3) * 4294967295), 8)}  ${Math.floor(rnd(s + 4) * 9000 + 100)} kb`, tone: 0.45 };
  }
  return { text: `>> handshake ${hex(Math.floor(rnd(s + 1) * 4294967295), 8)} accepted by ${pick(words, s + 2)}`, tone: 0.75 };
}

export function BgFaultyTerminal({
  color = "#33ff88",
  accent = "#e8fff0",
  background = "#020604",
  fontSize = 13,
  scroll = 1.4,
  glitch = 1,
  radius = 90,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgFaultyTerminalProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !host || !canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const size = Math.max(8, fontSize);
    const font = `${size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    const lineH = Math.round(size * 1.5);
    const R = Math.max(20, radius);
    const cache = new Map<number, { text: string; tone: number }>();

    let w = 0;
    let h = 0;
    let dpr = 1;
    let charW = size * 0.6;
    let t = 0;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;
    let near = 0;
    let visible = true;
    let raf = 0;
    let prev = 0;

    function line(i: number) {
      let v = cache.get(i);
      if (!v) {
        if (cache.size > 600) cache.clear();
        v = makeLine(i);
        cache.set(i, v);
      }
      return v;
    }

    function idleX(tt: number) {
      return w * (0.5 + 0.36 * Math.sin(tt * 0.37 + 0.9));
    }
    function idleY(tt: number) {
      return h * (0.5 + 0.3 * Math.sin(tt * 0.59 + 2.4));
    }

    function track(dt: number) {
      const gx = inside ? tx : idleX(t);
      const gy = inside ? ty : idleY(t);
      if (!placed || dt === 0) {
        px = gx;
        py = gy;
        placed = true;
        near = inside ? 1 : 0.6;
        return;
      }
      const k = 1 - Math.exp(-dt * (inside ? 14 : 2.5));
      px += (gx - px) * k;
      py += (gy - py) * k;
      near += ((inside ? 1 : 0.6) - near) * Math.min(1, dt * 4);
    }

    function draw() {
      if (!w || !h) return;
      ctx!.globalCompositeOperation = "source-over";
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = background;
      ctx!.fillRect(0, 0, w, h);
      ctx!.font = font;
      ctx!.textBaseline = "middle";

      const bucket = Math.floor(t * 4);
      const gOn = rnd(bucket * 31 + 7) < 0.18 * glitch;
      const bandY = rnd(bucket * 31 + 8) * h;
      const bandH = lineH * (1 + Math.floor(rnd(bucket * 31 + 9) * 4));
      const shift = (rnd(bucket * 31 + 10) - 0.5) * size * 7;
      const flickBucket = Math.floor(t * 12);
      const flick = rnd(flickBucket * 13 + 5) < 0.04 * glitch ? 0.55 : 0.93 + 0.07 * Math.sin(t * 50);
      const scrambleTick = Math.floor(t * 16);

      const offset = t * scroll * lineH;
      const first = Math.floor(offset / lineH);
      const frac = offset - first * lineH;
      const rows = Math.ceil(h / lineH) + 2;
      const x0 = Math.max(8, size * 0.9);

      for (let r = 0; r < rows; r++) {
        const idx = first + r;
        const ln = line(idx);
        const y = r * lineH - frac + lineH * 0.5;
        if (!ln.text) continue;
        let text = ln.text;
        const inBand = gOn && y > bandY - lineH * 0.5 && y < bandY + bandH;
        if (inBand) {
          const chars = text.split("");
          for (let c = 0; c < chars.length; c++) {
            if (rnd(idx * 131 + c * 7 + bucket) < 0.18) chars[c] = blocks[Math.floor(rnd(idx + c + bucket * 3) * 4)];
          }
          text = chars.join("");
        }
        const base = (0.32 + 0.6 * ln.tone) * flick;
        const dy = y - py;
        let c0 = -1;
        let c1 = -2;
        if (Math.abs(dy) < R) {
          const half = Math.sqrt(R * R - dy * dy);
          c0 = Math.max(0, Math.floor((px - half - x0) / charW));
          c1 = Math.min(text.length - 1, Math.ceil((px + half - x0) / charW));
        }
        let plain = text;
        if (c1 >= c0) plain = text.slice(0, c0) + " ".repeat(c1 - c0 + 1) + text.slice(c1 + 1);

        if (inBand) {
          ctx!.globalCompositeOperation = "lighter";
          ctx!.globalAlpha = 0.5 * base;
          ctx!.fillStyle = "#ff2a55";
          ctx!.fillText(plain, x0 - 2, y);
          ctx!.fillStyle = "#2ad4ff";
          ctx!.fillText(plain, x0 + 2, y);
          ctx!.globalCompositeOperation = "source-over";
        }
        ctx!.globalAlpha = base;
        ctx!.fillStyle = color;
        ctx!.fillText(plain, x0, y);

        if (c1 >= c0) {
          const maxC = Math.min(c1, Math.ceil((px + R - x0) / charW));
          for (let c = c0; c <= maxC; c++) {
            const cx = x0 + c * charW + charW * 0.5;
            const d = Math.hypot(cx - px, dy);
            const k = Math.max(0, 1 - d / R) * near;
            let ch = c < text.length ? text[c] : " ";
            const roll = rnd(idx * 977 + c * 31 + scrambleTick);
            if (ch !== " " ? roll < k * 0.85 : roll < k * 0.25) {
              ch = noise[Math.floor(rnd(idx * 59 + c * 13 + scrambleTick * 7) * noise.length) % noise.length];
            }
            if (ch === " ") continue;
            ctx!.globalAlpha = Math.min(1, base + (1 - base) * k * 1.4);
            ctx!.fillStyle = k > 0.45 ? accent : color;
            ctx!.fillText(ch, x0 + c * charW, y);
          }
        }
      }

      if (gOn) {
        const sy = Math.max(0, Math.round(bandY * dpr));
        const sh = Math.max(1, Math.min(canvas!.height - sy, Math.round(bandH * dpr)));
        if (sh > 1) {
          ctx!.globalAlpha = 1;
          ctx!.drawImage(canvas!, 0, sy, canvas!.width, sh, shift, sy / dpr, w, sh / dpr);
        }
      }

      const glow = ctx!.createRadialGradient(px, py, 0, px, py, R * 1.4);
      glow.addColorStop(0, color);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.globalCompositeOperation = "lighter";
      ctx!.globalAlpha = 0.09 * near;
      ctx!.fillStyle = glow;
      ctx!.fillRect(px - R * 1.4, py - R * 1.4, R * 2.8, R * 2.8);
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";
    }

    function still() {
      t = 3.3;
      inside = false;
      placed = false;
      track(0);
      draw();
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const nw = wrap.clientWidth;
      const nh = wrap.clientHeight;
      if (!nw || !nh) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = nw;
      h = nh;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = font;
      charW = ctx.measureText("M").width || size * 0.6;
      if (motion.matches) still();
      else {
        track(0);
        draw();
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      track(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function sync() {
      const run = visible && !document.hidden && !motion.matches;
      if (run && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (motion.matches) still();
    }

    function move(e: PointerEvent) {
      if (!host || motion.matches) return;
      const rect = host.getBoundingClientRect();
      const sx = rect.width ? host.clientWidth / rect.width : 1;
      const sy = rect.height ? host.clientHeight / rect.height : 1;
      tx = (e.clientX - rect.left) * sx;
      ty = (e.clientY - rect.top) * sy;
      inside = true;
    }

    function leave(e: PointerEvent) {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      inside = false;
    }

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(wrap);
    io.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerdown", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerup", leave);
    host.addEventListener("pointercancel", leave);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerup", leave);
      host.removeEventListener("pointercancel", leave);
    };
  }, [color, accent, background, fontSize, scroll, glitch, radius, speed]);

  return (
    <div ref={wrapRef} className={`hb-qp7 ${className}`} style={style} {...rest}>
      <style href="hb-bg-faulty-terminal" precedence="default">{css}</style>
      <canvas ref={canvasRef} className="hb-qp7-c" aria-hidden="true" />
      <div className="hb-qp7-fx" aria-hidden="true" />
      <div className="hb-qp7-vg" aria-hidden="true" />
      {children ? <div className="hb-qp7-in">{children}</div> : null}
    </div>
  );
}

import type { ReactNode } from "react";

export function Ico({ children, size = 20, stroke = 1.8 }: { children: ReactNode; size?: number; stroke?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#14532d" />
      <path d="M20 31c0-8 0-12 0-17" stroke="#bef264" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 22c-5.5 0-9-3.4-9-9 5.6 0 9 3.4 9 9z" fill="#bef264" />
      <path d="M20 18c5 0 8.4-3 8.4-8.2-5.2 0-8.4 3-8.4 8.2z" fill="#e07a5f" />
      <circle cx="20" cy="31" r="1.6" fill="#bef264" />
    </svg>
  );
}

export const icons = {
  drop: <path d="M12 3.5c3.6 4.3 6 7.6 6 10.6a6 6 0 0 1-12 0c0-3 2.4-6.3 6-10.6z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8.5 5.5-14 15-14 0 9.5-5.5 15-14 15" />
      <path d="M5 19c3-4 6-6.5 10-8.5" />
    </>
  ),
  flame: <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.4-5.4 3.6-8.3.5 1.8 1.6 2.9 2.7 3.3.2-2.6 1.4-5.2 3.7-6.8-.3 2.6.6 4.4 2 6.1 1.3 1.6 1.9 3.3 1.9 5.4 0 3.8-3.1 6.5-7.4 6.5z" />,
  camera: (
    <>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.6l1.4-2h5l1.4 2h1.6A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" />
      <path d="M10 21h4" />
    </>
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
      <path d="M9.5 20.5V14h5v6.5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3 19.5c0-3.3 2.7-5.8 6-5.8s6 2.5 6 5.8" />
      <path d="M15.6 14.2c2.9 0 5.4 2.1 5.4 5.3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20.5c0-4 3.4-6.7 7.5-6.7s7.5 2.7 7.5 6.7" />
    </>
  ),
  chat: <path d="M5 18.5V7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6a2.5 2.5 0 0 1-2.5 2.5H9z" />,
  share: (
    <>
      <path d="M12 15V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  dots: (
    <>
      <circle cx="5.5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="18.5" cy="12" r="1" />
    </>
  ),
  plane: <path d="M3 13.5 21 5l-4.5 15-4.2-5.8L7 17.5l1-4.6z" />,
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  bug: (
    <>
      <rect x="7.5" y="8" width="9" height="12" rx="4.5" />
      <path d="M12 8V5.5M9.5 5.5 8 4M14.5 5.5 16 4M4 12h3.5M16.5 12H20M4.5 17.5 7.8 16M19.5 17.5 16.2 16" />
    </>
  ),
  swap: (
    <>
      <path d="M7 7h12l-3.5-3.5" />
      <path d="M17 17H5l3.5 3.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
};

export function StoreBadge({ kind }: { kind: "a" | "b" }) {
  const top = kind === "a" ? "Download on the" : "Get it on";
  const bottom = kind === "a" ? "App Shop" : "Play Shop";
  return (
    <a href="#download" className="hbl-mb-badge" aria-label={`${top} ${bottom}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        {kind === "a" ? (
          <>
            <rect x="6.5" y="2.5" width="13" height="21" rx="3.5" fill="none" stroke="#bef264" strokeWidth="1.8" />
            <path d="M13 17.5c0-3.6 0-5.4 0-7.6" stroke="#f7f5ef" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M13 13.6c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4z" fill="#f7f5ef" />
            <path d="M13 12c2.2 0 3.6-1.3 3.6-3.6-2.2 0-3.6 1.3-3.6 3.6z" fill="#bef264" />
          </>
        ) : (
          <>
            <path d="M7.5 4.2c0-1.2 1.3-1.9 2.3-1.3l12 7.6c1 .6 1 2 0 2.6l-12 7.6c-1 .6-2.3-.1-2.3-1.3z" fill="#bef264" />
            <path d="M7.5 4.2 15 13l-7.5 8.8" fill="none" stroke="#14532d" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M15 13 21.8 9.9" stroke="#14532d" strokeWidth="1.4" />
          </>
        )}
      </svg>
      <span className="hbl-mb-badge-t">
        <small>{top}</small>
        <b>{bottom}</b>
      </span>
    </a>
  );
}

type Variant = "monstera" | "snake" | "pothos" | "zz" | "fiddle" | "calathea";

interface Leaf {
  x: number;
  y: number;
  len: number;
  wid: number;
  rot: number;
  fill: string;
  holes?: boolean;
  inner?: string;
  edge?: string;
}

const f = (n: number) => n.toFixed(1);

function leafPath(len: number, wid: number) {
  const w = wid / 2;
  return `M0 0C${f(w)} ${f(-len * 0.22)} ${f(w)} ${f(-len * 0.74)} 0 ${f(-len)}C${f(-w)} ${f(-len * 0.74)} ${f(-w)} ${f(-len * 0.22)} 0 0Z`;
}

function LeafShape({ leaf, bg }: { leaf: Leaf; bg: string }) {
  const { x, y, len, wid, rot, fill, holes, inner, edge } = leaf;
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(rot)})`}>
      <path d={leafPath(len, wid)} fill={fill} stroke={edge} strokeWidth={edge ? 1.3 : undefined} />
      {inner && <path d={leafPath(len * 0.82, wid * 0.42)} fill={inner} transform={`translate(0 ${f(-len * 0.08)})`} />}
      <path d={`M0 0L0 ${f(-len * 0.9)}`} stroke="rgba(255,255,255,.32)" strokeWidth="1" strokeLinecap="round" />
      {holes && (
        <>
          <ellipse cx={f(wid * 0.24)} cy={f(-len * 0.42)} rx="2.2" ry="3.4" fill={bg} />
          <ellipse cx={f(-wid * 0.25)} cy={f(-len * 0.5)} rx="2" ry="3.2" fill={bg} />
          <ellipse cx={f(wid * 0.2)} cy={f(-len * 0.68)} rx="1.6" ry="2.6" fill={bg} />
        </>
      )}
    </g>
  );
}

function stemLeaves(x0: number, y0: number, x1: number, y1: number, fill: string) {
  const ang = (Math.atan2(x1 - x0, y0 - y1) * 180) / Math.PI;
  const out: Leaf[] = [];
  [0.34, 0.5, 0.66, 0.82].forEach((t, i) => {
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t;
    out.push({ x, y, len: 13 - i, wid: 8, rot: ang - 58, fill });
    out.push({ x, y, len: 13 - i, wid: 8, rot: ang + 58, fill });
  });
  out.push({ x: x1, y: y1, len: 11, wid: 7, rot: ang, fill });
  return out;
}

const greens = { a: "#2f7d4a", b: "#3f9a5a", c: "#1f6b3a", d: "#79b85a" };

function plantFor(variant: Variant): { stems: string[]; leaves: Leaf[]; vines?: { d: string; leaves: Leaf[] } } {
  switch (variant) {
    case "monstera":
      return {
        stems: ["M60 100Q50 84 40 66", "M60 100Q70 80 80 60", "M60 100Q60 74 58 50"],
        leaves: [
          { x: 40, y: 66, len: 40, wid: 38, rot: -42, fill: greens.a, holes: true },
          { x: 80, y: 60, len: 44, wid: 40, rot: 36, fill: greens.b, holes: true },
          { x: 58, y: 50, len: 46, wid: 42, rot: -4, fill: greens.c, holes: true },
        ],
      };
    case "snake":
      return {
        stems: [],
        leaves: [
          { x: 50, y: 102, len: 74, wid: 15, rot: -9, fill: greens.c, edge: "#bef264" },
          { x: 57, y: 102, len: 90, wid: 17, rot: -2, fill: greens.a, edge: "#bef264" },
          { x: 64, y: 102, len: 82, wid: 16, rot: 5, fill: greens.c, edge: "#bef264" },
          { x: 70, y: 102, len: 66, wid: 14, rot: 13, fill: greens.a, edge: "#bef264" },
          { x: 46, y: 102, len: 52, wid: 13, rot: -20, fill: greens.a, edge: "#bef264" },
        ],
      };
    case "pothos":
      return {
        stems: ["M60 100Q56 86 48 76", "M60 100Q66 84 74 72", "M60 100Q61 84 60 66"],
        leaves: [
          { x: 48, y: 76, len: 22, wid: 22, rot: -36, fill: greens.d },
          { x: 74, y: 72, len: 24, wid: 23, rot: 32, fill: greens.b },
          { x: 60, y: 66, len: 24, wid: 24, rot: 0, fill: greens.a },
          { x: 54, y: 88, len: 18, wid: 18, rot: -70, fill: greens.b },
          { x: 68, y: 88, len: 18, wid: 18, rot: 68, fill: greens.d },
        ],
        vines: {
          d: "M38 100C26 108 24 122 18 134M84 100C96 110 98 122 104 132",
          leaves: [
            { x: 30, y: 106, len: 14, wid: 14, rot: -128, fill: greens.d },
            { x: 23, y: 120, len: 13, wid: 13, rot: -160, fill: greens.b },
            { x: 92, y: 106, len: 14, wid: 14, rot: 128, fill: greens.b },
            { x: 99, y: 121, len: 13, wid: 13, rot: 160, fill: greens.d },
          ],
        },
      };
    case "zz":
      return {
        stems: ["M60 100L44 42", "M60 100L61 30", "M60 100L79 44"],
        leaves: [
          ...stemLeaves(60, 100, 44, 42, greens.c),
          ...stemLeaves(60, 100, 61, 30, greens.a),
          ...stemLeaves(60, 100, 79, 44, greens.c),
        ],
      };
    case "fiddle":
      return {
        stems: ["M60 100L60 28"],
        leaves: [
          { x: 60, y: 86, len: 28, wid: 22, rot: -58, fill: greens.c },
          { x: 60, y: 76, len: 30, wid: 24, rot: 54, fill: greens.a },
          { x: 60, y: 64, len: 30, wid: 25, rot: -46, fill: greens.b },
          { x: 60, y: 52, len: 29, wid: 24, rot: 44, fill: greens.c },
          { x: 60, y: 40, len: 26, wid: 22, rot: -30, fill: greens.a },
          { x: 60, y: 30, len: 24, wid: 20, rot: 8, fill: greens.b },
        ],
      };
    case "calathea":
      return {
        stems: ["M60 100L40 72", "M60 100L50 64", "M60 100L60 58", "M60 100L70 64", "M60 100L80 72"],
        leaves: [
          { x: 40, y: 72, len: 40, wid: 22, rot: -48, fill: "#7fb174", inner: "#2d6a3e" },
          { x: 80, y: 72, len: 40, wid: 22, rot: 48, fill: "#7fb174", inner: "#2d6a3e" },
          { x: 50, y: 64, len: 44, wid: 24, rot: -20, fill: "#8cc07c", inner: "#2d6a3e" },
          { x: 70, y: 64, len: 44, wid: 24, rot: 20, fill: "#8cc07c", inner: "#2d6a3e" },
          { x: 60, y: 58, len: 46, wid: 25, rot: 0, fill: "#7fb174", inner: "#2d6a3e" },
        ],
      };
  }
}

export function PlantArt({
  variant,
  pot = "#e07a5f",
  rim = "#c8664c",
  bg = "#f7f5ef",
  className,
}: {
  variant: Variant;
  pot?: string;
  rim?: string;
  bg?: string;
  className?: string;
}) {
  const p = plantFor(variant);
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <ellipse cx="60" cy="135" rx="30" ry="3.5" fill="rgba(20,83,45,.14)" />
      {p.stems.map((d) => (
        <path key={d} d={d} fill="none" stroke="#2d6a3e" strokeWidth="2" strokeLinecap="round" />
      ))}
      {p.leaves.map((leaf, i) => (
        <LeafShape key={i} leaf={leaf} bg={bg} />
      ))}
      <rect x="38" y="104" width="44" height="30" rx="8" fill={pot} />
      <rect x="38" y="104" width="10" height="30" rx="5" fill="rgba(255,255,255,.14)" />
      <rect x="34" y="96" width="52" height="12" rx="4.5" fill={rim} />
      <rect x="36" y="97.5" width="48" height="2" rx="1" fill="rgba(255,255,255,.22)" />
      {p.vines && (
        <>
          <path d={p.vines.d} fill="none" stroke="#2d6a3e" strokeWidth="1.6" strokeLinecap="round" />
          {p.vines.leaves.map((leaf, i) => (
            <LeafShape key={`v${i}`} leaf={leaf} bg={bg} />
          ))}
        </>
      )}
    </svg>
  );
}

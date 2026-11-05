import type { ReactNode } from "react";
import type { Kind } from "./data";

type Ctx = { c: string; sh: string; ln: string };

const speck = [
  [104, 150, 1.4],
  [131, 171, 1.1],
  [96, 182, 1.2],
  [142, 140, 0.9],
  [118, 194, 1],
  [88, 160, 0.8],
];

function Shade({ d, sh }: { d: string; sh: string }) {
  return <path d={d} fill={`url(#${sh})`} />;
}

const vaseBody =
  "M109 78h22v14c0 10 34 24 34 64 0 32-22 48-45 48s-45-16-45-48c0-40 34-54 34-64Z";

const shapes: Record<Kind, (k: Ctx) => ReactNode> = {
  vase: ({ c, sh }) => (
    <g>
      <g fill="none" stroke="#9a8761" strokeWidth="1.6" strokeLinecap="round">
        <path d="M118 82C114 60 104 42 92 26" />
        <path d="M122 82c2-24 10-44 22-62" />
        <path d="M120 82c0-18-2-34-4-50" />
      </g>
      <g fill="#b9a67c">
        <ellipse cx="91" cy="25" rx="3.2" ry="7" transform="rotate(-34 91 25)" />
        <ellipse cx="145" cy="19" rx="3.2" ry="7" transform="rotate(32 145 19)" />
        <ellipse cx="116" cy="30" rx="3" ry="6.5" transform="rotate(-6 116 30)" />
        <ellipse cx="100" cy="42" rx="2.2" ry="5" transform="rotate(-50 100 42)" />
        <ellipse cx="136" cy="38" rx="2.2" ry="5" transform="rotate(44 136 38)" />
      </g>
      <path className="hbl-st-fill" d={vaseBody} fill={c} />
      <Shade d={vaseBody} sh={sh} />
      {speck.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#1c1c1a" opacity=".16" />
      ))}
      <ellipse cx="120" cy="78" rx="11" ry="3" fill="#1c1c1a" opacity=".28" />
      <path d="M86 196c10 6 22 8 34 8s24-2 34-8" fill="none" stroke="#1c1c1a" strokeOpacity=".12" strokeWidth="3" />
    </g>
  ),
  candle: ({ c, sh }) => (
    <g>
      <circle className="hbl-st-flame" cx="120" cy="86" r="24" fill="#f3b75c" opacity=".18" />
      <rect className="hbl-st-fill" x="78" y="110" width="84" height="94" rx="14" fill={c} />
      <Shade d="M78 124a14 14 0 0 1 14-14h56a14 14 0 0 1 14 14v66a14 14 0 0 1-14 14H92a14 14 0 0 1-14-14Z" sh={sh} />
      <ellipse cx="120" cy="114" rx="37" ry="7" fill="#f7f0e3" />
      <ellipse cx="120" cy="115" rx="29" ry="4.6" fill="#ecdfc6" />
      <path d="M120 114v-13" stroke="#2a2622" strokeWidth="2" strokeLinecap="round" />
      <g className="hbl-st-flame">
        <path d="M120 70c6 9 10 16 10 22a10 10 0 0 1-20 0c0-6 4-13 10-22Z" fill="#f2b04f" />
        <path d="M120 82c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11Z" fill="#fde9b6" />
      </g>
      <rect x="95" y="146" width="50" height="32" rx="3" fill="#faf7f2" opacity=".94" />
      <rect x="103" y="155" width="34" height="3" rx="1.5" fill="#1c1c1a" opacity=".55" />
      <rect x="108" y="163" width="24" height="2" rx="1" fill="#1c1c1a" opacity=".3" />
      <rect x="111" y="169" width="18" height="2" rx="1" fill="#1c1c1a" opacity=".3" />
    </g>
  ),
  mug: ({ c, sh }) => (
    <g>
      <path d="M184 142c17 0 17 30 0 30" fill="none" stroke={c} strokeWidth="8" className="hbl-st-stroke" />
      <path className="hbl-st-fill" d="M134 134h52v46c0 12-8 20-20 20h-12c-12 0-20-8-20-20Z" fill={c} />
      <Shade d="M134 134h52v46c0 12-8 20-20 20h-12c-12 0-20-8-20-20Z" sh={sh} />
      <ellipse cx="160" cy="134" rx="26" ry="5" fill="#1c1c1a" opacity=".3" />
      <path d="M124 128c19 0 19 36 0 36" fill="none" stroke={c} strokeWidth="9" className="hbl-st-stroke" />
      <path className="hbl-st-fill" d="M52 116h72v60c0 15-10 26-25 26H77c-15 0-25-11-25-26Z" fill={c} />
      <Shade d="M52 116h72v60c0 15-10 26-25 26H77c-15 0-25-11-25-26Z" sh={sh} />
      <ellipse cx="88" cy="116" rx="36" ry="6.5" fill="#1c1c1a" opacity=".3" />
      <path d="M52 160c12-5 24 4 36-1s24 3 36-2" fill="none" stroke="#faf7f2" strokeOpacity=".35" strokeWidth="2" />
      {speck.slice(0, 4).map(([x, y, r], i) => (
        <circle key={i} cx={x - 18} cy={y - 10} r={r} fill="#1c1c1a" opacity=".18" />
      ))}
    </g>
  ),
  throw: ({ c, sh, ln }) => (
    <g>
      <rect className="hbl-st-fill" x="44" y="150" width="152" height="50" rx="12" fill={c} />
      <rect x="44" y="150" width="152" height="50" rx="12" fill={`url(#${ln})`} />
      <rect x="44" y="150" width="152" height="50" rx="12" fill={`url(#${sh})`} />
      <rect className="hbl-st-fill" x="52" y="110" width="136" height="46" rx="12" fill={c} />
      <rect x="52" y="110" width="136" height="46" rx="12" fill="#1c1c1a" opacity=".06" />
      <rect x="52" y="110" width="136" height="46" rx="12" fill={`url(#${ln})`} />
      <rect x="52" y="110" width="136" height="46" rx="12" fill={`url(#${sh})`} />
      <rect className="hbl-st-fill" x="62" y="72" width="116" height="44" rx="12" fill={c} />
      <rect x="62" y="72" width="116" height="44" rx="12" fill={`url(#${ln})`} />
      <rect x="62" y="72" width="116" height="44" rx="12" fill={`url(#${sh})`} />
      <g stroke="#1c1c1a" strokeOpacity=".14" strokeWidth="2" strokeLinecap="round">
        <path d="M70 94h100M62 133h118M54 176h134" />
      </g>
      <g stroke={c} strokeWidth="2.2" strokeLinecap="round" className="hbl-st-stroke">
        {[156, 162, 168, 174, 180, 186, 192].map((y) => (
          <path key={y} d={`M197 ${y}h7`} />
        ))}
      </g>
    </g>
  ),
  stool: ({ c, sh }) => (
    <g>
      <path className="hbl-st-fill" d="M116 116h10v82h-10Z" fill={c} />
      <path d="M116 116h10v82h-10Z" fill="#1c1c1a" opacity=".28" />
      <path className="hbl-st-fill" d="M74 110h12l-10 94H64Z" fill={c} />
      <path d="M74 110h12l-10 94H64Z" fill={`url(#${sh})`} />
      <path className="hbl-st-fill" d="M154 110h12l10 94h-12Z" fill={c} />
      <path d="M154 110h12l10 94h-12Z" fill="#1c1c1a" opacity=".14" />
      <path className="hbl-st-fill" d="M58 96v12a62 16 0 0 0 124 0V96Z" fill={c} />
      <path d="M58 96v12a62 16 0 0 0 124 0V96Z" fill="#1c1c1a" opacity=".2" />
      <ellipse className="hbl-st-fill" cx="120" cy="96" rx="62" ry="16" fill={c} />
      <ellipse cx="120" cy="96" rx="62" ry="16" fill={`url(#${sh})`} />
      <g fill="none" stroke="#1c1c1a" strokeOpacity=".1" strokeWidth="1.4">
        <ellipse cx="118" cy="96" rx="40" ry="9" />
        <ellipse cx="116" cy="96" rx="22" ry="5" />
      </g>
    </g>
  ),
  bowl: ({ c, sh }) => (
    <g>
      <ellipse cx="120" cy="122" rx="76" ry="14" fill={c} className="hbl-st-fill" />
      <ellipse cx="120" cy="122" rx="76" ry="14" fill="#1c1c1a" opacity=".22" />
      <circle cx="98" cy="114" r="16" fill="#e2b04a" />
      <circle cx="94" cy="109" r="4" fill="#fff" opacity=".35" />
      <circle cx="128" cy="110" r="17" fill="#c9773f" />
      <circle cx="123" cy="104" r="4" fill="#fff" opacity=".3" />
      <circle cx="152" cy="116" r="13" fill="#8fa37f" />
      <path d="M128 93c2-5 6-7 10-7" stroke="#4e5f45" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path className="hbl-st-fill" d="M44 122h152c0 44-34 74-76 74s-76-30-76-74Z" fill={c} />
      <Shade d="M44 122h152c0 44-34 74-76 74s-76-30-76-74Z" sh={sh} />
      <path d="M44 122c12 10 42 15 76 15s64-5 76-15" fill="none" stroke="#faf7f2" strokeOpacity=".4" strokeWidth="2" />
      <rect className="hbl-st-fill" x="96" y="192" width="48" height="9" rx="3" fill={c} />
      <rect x="96" y="192" width="48" height="9" rx="3" fill="#1c1c1a" opacity=".25" />
    </g>
  ),
  napkins: ({ c, sh, ln }) => (
    <g>
      {[-14, -4, 8].map((r, i) => (
        <g key={r} transform={`rotate(${r} 120 150)`}>
          <rect className="hbl-st-fill" x="66" y="96" width="108" height="108" rx="6" fill={c} />
          <rect x="66" y="96" width="108" height="108" rx="6" fill={`url(#${ln})`} />
          {i < 2 && <rect x="66" y="96" width="108" height="108" rx="6" fill="#1c1c1a" opacity={i === 0 ? 0.14 : 0.07} />}
          <rect x="66" y="96" width="108" height="108" rx="6" fill={`url(#${sh})`} />
          <rect x="74" y="104" width="92" height="92" rx="3" fill="none" stroke="#faf7f2" strokeOpacity=".55" strokeDasharray="3 3" />
        </g>
      ))}
      <path d="M120 96v108" stroke="#1c1c1a" strokeOpacity=".08" strokeWidth="2" transform="rotate(8 120 150)" />
    </g>
  ),
  lamp: ({ c, sh }) => (
    <g>
      <ellipse className="hbl-st-flame" cx="120" cy="126" rx="70" ry="22" fill="#f4c66b" opacity=".2" />
      <path className="hbl-st-fill" d="M115 120h10v72h-10Z" fill={c} />
      <path d="M115 120h10v72h-10Z" fill="#1c1c1a" opacity=".22" />
      <ellipse className="hbl-st-fill" cx="120" cy="196" rx="34" ry="8" fill={c} />
      <ellipse cx="120" cy="196" rx="34" ry="8" fill="#1c1c1a" opacity=".18" />
      <ellipse cx="120" cy="121" rx="49" ry="8" fill="#f8dc9e" />
      <path className="hbl-st-fill" d="M70 120c0-40 22-64 50-64s50 24 50 64Z" fill={c} />
      <Shade d="M70 120c0-40 22-64 50-64s50 24 50 64Z" sh={sh} />
      <path d="M84 98c4-18 16-30 30-32" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
};

export function ProductArt({
  kind,
  color,
  uid,
  className = "",
  label,
  x,
  y,
  width,
  height,
}: {
  kind: Kind;
  color: string;
  uid: string;
  className?: string;
  label?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  const sh = `hbl-st-${uid}-sh`;
  const sf = `hbl-st-${uid}-sf`;
  const ln = `hbl-st-${uid}-ln`;
  return (
    <svg
      viewBox="0 0 240 240"
      className={`hbl-st-art ${className}`}
      x={x}
      y={y}
      width={width}
      height={height}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={sh} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".34" />
          <stop offset=".42" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity=".22" />
        </linearGradient>
        <filter id={sf} x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <pattern id={ln} width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M0 2.5h5M2.5 0v5" stroke="#ffffff" strokeOpacity=".1" strokeWidth="1" />
        </pattern>
      </defs>
      <ellipse cx="120" cy="206" rx="72" ry="8" fill="#1c1c1a" opacity=".2" filter={`url(#${sf})`} />
      {shapes[kind]({ c: color, sh, ln })}
    </svg>
  );
}

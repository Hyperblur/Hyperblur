import type { Kind } from "./data";

function hash(n: number) {
  let h = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

const f = (n: number) => n.toFixed(2);

function Xr({ seed }: { seed: number }) {
  const tilt = 14 + hash(seed) * 24;
  const lat = [-60, -30, 0, 30, 60];
  const lon = [0, 30, 60, 90, 120, 150];
  return (
    <g transform={`translate(100 96) rotate(${f(tilt - 20)})`} fill="none">
      <circle r="58" stroke="rgba(217,222,232,.5)" strokeWidth="0.8" />
      {lat.map((a) => {
        const r = (a * Math.PI) / 180;
        return <ellipse key={a} cy={f(Math.sin(r) * 58)} rx={f(Math.cos(r) * 58)} ry={f(Math.cos(r) * 58 * 0.28)} stroke="rgba(217,222,232,.3)" strokeWidth="0.7" />;
      })}
      {lon.map((a) => (
        <ellipse key={a} rx={f(Math.abs(Math.cos((a * Math.PI) / 180)) * 58)} ry="58" stroke="rgba(217,222,232,.22)" strokeWidth="0.7" />
      ))}
      <circle cx={f(Math.cos(seed) * 34)} cy={f(Math.sin(seed) * 28)} r="3.2" fill="#ff4d4d" />
      <circle cx={f(Math.cos(seed) * 34)} cy={f(Math.sin(seed) * 28)} r="9" stroke="#ff4d4d" strokeWidth="0.7" opacity=".6" />
    </g>
  );
}

function MapArt({ seed }: { seed: number }) {
  const cx = 80 + hash(seed) * 40;
  const cy = 80 + hash(seed + 1) * 40;
  const levels = 9;
  const paths: string[] = [];
  for (let l = 1; l <= levels; l++) {
    const base = l * 13;
    let d = "";
    for (let s = 0; s <= 48; s++) {
      const a = (s / 48) * Math.PI * 2;
      const w = Math.sin(a * 3 + seed) * 6 + Math.sin(a * 5 + seed * 2 + l * 0.4) * 3.5;
      const r = base + w * (l / levels + 0.3);
      d += `${s === 0 ? "M" : "L"}${f(cx + Math.cos(a) * r)} ${f(cy + Math.sin(a) * r * 0.82)}`;
    }
    paths.push(d + "Z");
  }
  return (
    <g fill="none">
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={i === 3 ? "#ff4d4d" : "rgba(217,222,232,.28)"} strokeWidth={i === 3 ? 1 : 0.7} />
      ))}
      <path d={`M${f(cx - 70)} ${f(cy + 50)} L${f(cx - 20)} ${f(cy + 10)} L${f(cx + 10)} ${f(cy + 18)} L${f(cx + 60)} ${f(cy - 40)}`} stroke="#5eead4" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={f(cx + 60)} cy={f(cy - 40)} r="3" fill="#5eead4" />
    </g>
  );
}

function Tool({ seed }: { seed: number }) {
  const nodes = [0, 1, 2, 3, 4].map((i) => ({
    x: 22 + (i % 3) * 58 + hash(seed * 7 + i) * 10,
    y: 34 + Math.floor(i / 3) * 78 + hash(seed * 11 + i) * 26,
  }));
  const links = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [1, 4],
  ];
  return (
    <g fill="none">
      {links.map(([a, b], i) => {
        const A = nodes[a];
        const B = nodes[b];
        const mx = (A.x + 36 + B.x) / 2;
        return (
          <path
            key={i}
            d={`M${f(A.x + 36)} ${f(A.y + 11)} C${f(mx)} ${f(A.y + 11)} ${f(mx)} ${f(B.y + 11)} ${f(B.x)} ${f(B.y + 11)}`}
            stroke={i === 4 ? "#ff4d4d" : "rgba(217,222,232,.35)"}
            strokeWidth="0.9"
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={f(n.x)} y={f(n.y)} width="36" height="22" fill="#0d1118" stroke="rgba(217,222,232,.4)" strokeWidth="0.8" />
          <rect x={f(n.x + 4)} y={f(n.y + 5)} width={f(14 + hash(seed + i) * 14)} height="2" fill="rgba(217,222,232,.5)" />
          <rect x={f(n.x + 4)} y={f(n.y + 12)} width="10" height="2" fill="rgba(217,222,232,.25)" />
          <circle cx={f(n.x + 36)} cy={f(n.y + 11)} r="1.8" fill="#d9dee8" />
        </g>
      ))}
    </g>
  );
}

function Graphics({ seed }: { seed: number }) {
  const k = 3 + Math.floor(hash(seed) * 4);
  let d = "";
  for (let s = 0; s <= 360; s++) {
    const a = (s / 360) * Math.PI * 2;
    const r = 60 * Math.cos(k * a) * 0.8 + 6;
    d += `${s === 0 ? "M" : "L"}${f(100 + Math.cos(a) * r)} ${f(96 + Math.sin(a) * r)}`;
  }
  return (
    <g fill="none">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx="100" cy="96" r={18 + i * 12} stroke="rgba(217,222,232,.12)" strokeWidth="0.7" />
      ))}
      <path d={d} stroke="rgba(217,222,232,.55)" strokeWidth="0.8" />
      <path d={d} stroke="#ff4d4d" strokeWidth="0.9" transform={`rotate(${f(180 / k)} 100 96)`} opacity=".8" />
    </g>
  );
}

export function CardArt({ kind, seed, code }: { kind: Kind; seed: number; code: string }) {
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id={`hbl-lb-g-${code}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#hbl-lb-g-${code})`} />
      {kind === "XR" ? <Xr seed={seed} /> : kind === "MAP" ? <MapArt seed={seed} /> : kind === "TOOL" ? <Tool seed={seed} /> : <Graphics seed={seed} />}
      <text x="8" y="14" fill="rgba(217,222,232,.45)" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1">
        {code}
      </text>
      <text x="192" y="192" textAnchor="end" fill="rgba(255,77,77,.8)" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="1">
        {kind}
      </text>
    </svg>
  );
}

import type { CSSProperties } from "react";

export function Embers({ count = 22, className = "" }: { count?: number; className?: string }) {
  const items = Array.from({ length: count }, (_, i) => {
    const left = ((i * 37 + 11) % 100).toFixed(1);
    const delay = ((i * 0.73) % 6).toFixed(2);
    const dur = (5 + ((i * 1.31) % 4)).toFixed(2);
    const size = 2 + (i % 3);
    const drift = (((i * 17) % 40) - 20).toFixed(0);
    return { left, delay, dur, size, drift, hot: i % 4 === 0 };
  });
  return (
    <div className={`hbl-rs-embers ${className}`} aria-hidden="true">
      {items.map((e, i) => (
        <span
          key={i}
          className={e.hot ? "hbl-rs-ember hbl-rs-ember-hot" : "hbl-rs-ember"}
          style={
            {
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDelay: `-${e.delay}s`,
              animationDuration: `${e.dur}s`,
              "--hbl-rs-dx": `${e.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Flame({ uid = "a" }: { uid?: string }) {
  return (
    <svg className="hbl-rs-flame" viewBox="0 0 200 240" aria-hidden="true">
      <defs>
        <radialGradient id={`hbl-rs-fg1-${uid}`} cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#ffd27a" />
          <stop offset="45%" stopColor="#e7a93b" />
          <stop offset="100%" stopColor="#c8553d" />
        </radialGradient>
        <radialGradient id={`hbl-rs-fg2-${uid}`} cx="50%" cy="85%" r="60%">
          <stop offset="0%" stopColor="#fff3d6" />
          <stop offset="60%" stopColor="#ffd27a" />
          <stop offset="100%" stopColor="#e7a93b" />
        </radialGradient>
      </defs>
      <g className="hbl-rs-flame-a">
        <path
          d="M100 14c10 38 58 62 58 128a58 58 0 0 1-116 0c0-30 14-50 30-66 4 22 14 36 28 40C94 92 92 54 100 14z"
          fill="#c8553d"
          opacity="0.9"
        />
      </g>
      <g className="hbl-rs-flame-b">
        <path
          d="M102 60c8 28 42 46 42 92a44 44 0 0 1-88 0c0-22 10-36 22-48 3 16 10 26 20 29-2-28-2-50 4-73z"
          fill={`url(#hbl-rs-fg1-${uid})`}
        />
      </g>
      <g className="hbl-rs-flame-c">
        <path
          d="M100 112c5 18 26 28 26 56a26 26 0 0 1-52 0c0-13 6-21 13-28 2 9 6 15 12 17-1-17-1-30 1-45z"
          fill={`url(#hbl-rs-fg2-${uid})`}
        />
      </g>
    </svg>
  );
}

export function Plate({ uid = "a" }: { uid?: string }) {
  const rim = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    return { x: (120 + Math.cos(a) * 102).toFixed(2), y: (120 + Math.sin(a) * 102).toFixed(2) };
  });
  return (
    <svg className="hbl-rs-plate" viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <radialGradient id={`hbl-rs-pl-${uid}`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#fffaf1" />
          <stop offset="100%" stopColor="#e9dcc6" />
        </radialGradient>
        <radialGradient id={`hbl-rs-sauce-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d96a4c" />
          <stop offset="100%" stopColor="#b8452f" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="124" r="114" fill="#000" opacity="0.28" />
      <circle cx="120" cy="120" r="114" fill={`url(#hbl-rs-pl-${uid})`} />
      <circle cx="120" cy="120" r="88" fill="#f6efe3" stroke="#e2d3bb" strokeWidth="1.5" />
      {rim.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i % 2 === 0 ? 2.2 : 1.2} fill="#6b7a3a" opacity={i % 2 === 0 ? 0.55 : 0.35} />
      ))}
      <path d="M62 132c18-30 70-44 110-20 10 6 6 20-6 22-30 6-64 18-92 14-12-2-16-8-12-16z" fill={`url(#hbl-rs-sauce-${uid})`} opacity="0.92" />
      <ellipse cx="118" cy="114" rx="40" ry="20" fill="#7a3b22" transform="rotate(-14 118 114)" />
      <path d="M86 116c10-6 22-10 34-12M92 124c12-6 26-10 38-12M100 132c10-4 20-7 30-8" stroke="#2a1a12" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      <circle cx="150" cy="140" r="9" fill="#e7a93b" />
      <circle cx="150" cy="140" r="5.5" fill="#f7cf6c" />
      <path d="M150 131v18M141 140h18M144 134l12 12M156 134l-12 12" stroke="#e7a93b" strokeWidth="0.8" />
      <g fill="#6b7a3a">
        <ellipse cx="80" cy="98" rx="7" ry="3" transform="rotate(-30 80 98)" />
        <ellipse cx="90" cy="92" rx="6" ry="2.6" transform="rotate(10 90 92)" />
        <ellipse cx="160" cy="104" rx="7" ry="3" transform="rotate(40 160 104)" />
        <ellipse cx="132" cy="150" rx="6" ry="2.5" transform="rotate(-10 132 150)" />
      </g>
      <g fill="#fff8ea" opacity="0.9">
        <circle cx="104" cy="148" r="2" />
        <circle cx="112" cy="152" r="1.6" />
        <circle cx="96" cy="142" r="1.4" />
        <circle cx="138" cy="96" r="1.8" />
      </g>
    </svg>
  );
}

export function Olive() {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true">
      <path d="M18 14c10-8 26-4 30 6" stroke="#4f5a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="38" cy="16" rx="10" ry="4" fill="#6b7a3a" transform="rotate(20 38 16)" />
      <ellipse cx="26" cy="36" rx="14" ry="18" fill="#4f5a2a" transform="rotate(-20 26 36)" />
      <ellipse cx="21" cy="30" rx="4" ry="6" fill="#8a9a52" opacity="0.6" transform="rotate(-20 21 30)" />
    </svg>
  );
}

export function Lemon() {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true">
      <circle cx="30" cy="30" r="26" fill="#e7a93b" />
      <circle cx="30" cy="30" r="22" fill="#fbe7a6" />
      <g stroke="#e7a93b" strokeWidth="2">
        <path d="M30 9v42M9 30h42M15 15l30 30M45 15L15 45" />
      </g>
      <circle cx="30" cy="30" r="3" fill="#fbe7a6" />
    </svg>
  );
}

export function Rosemary() {
  const leaves = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <path d="M12 70C30 50 48 30 70 10" stroke="#4f5a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {leaves.map((i) => {
        const t = 0.12 + i * 0.1;
        const x = 12 + 58 * t;
        const y = 70 - 60 * t;
        return (
          <g key={i}>
            <ellipse cx={(x - 5).toFixed(1)} cy={(y - 4).toFixed(1)} rx="7" ry="2" fill="#6b7a3a" transform={`rotate(-70 ${(x - 5).toFixed(1)} ${(y - 4).toFixed(1)})`} />
            <ellipse cx={(x + 5).toFixed(1)} cy={(y + 3).toFixed(1)} rx="7" ry="2" fill="#7d8c45" transform={`rotate(-10 ${(x + 5).toFixed(1)} ${(y + 3).toFixed(1)})`} />
          </g>
        );
      })}
    </svg>
  );
}

export function Chili() {
  return (
    <svg viewBox="0 0 70 70" aria-hidden="true">
      <path d="M14 18c6 2 8 6 8 10 2 16 14 28 36 30-24 8-44-6-46-28 0-4-2-8 2-12z" fill="#c8553d" />
      <path d="M20 28c2 10 8 18 18 22" stroke="#e5826a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M12 18c0-6 4-10 10-10" stroke="#6b7a3a" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Garlic() {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true">
      <path d="M30 6c2 6 6 8 12 14 8 8 8 24-4 30-6 3-10 3-16 0-12-6-12-22-4-30 6-6 10-8 12-14z" fill="#fbf5ea" stroke="#d9c9ae" strokeWidth="1.5" />
      <path d="M30 18c-6 8-8 20-4 32M30 18c6 8 8 20 4 32" stroke="#d9c9ae" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

export function Leaf() {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true">
      <path d="M8 52C10 26 26 10 54 6c-2 28-20 44-46 46z" fill="#6b7a3a" />
      <path d="M8 52L42 18" stroke="#c9d39c" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function HeroArt() {
  return (
    <div className="hbl-rs-stage" aria-hidden="true">
      <div className="hbl-rs-oven">
        <div className="hbl-rs-oven-glow" />
        <div className="hbl-rs-oven-bricks" />
        <Flame />
        <Embers count={18} />
      </div>
      <div className="hbl-rs-plate-wrap">
        <Plate />
      </div>
      <span className="hbl-rs-ing hbl-rs-ing-1"><Olive /></span>
      <span className="hbl-rs-ing hbl-rs-ing-2"><Lemon /></span>
      <span className="hbl-rs-ing hbl-rs-ing-3"><Rosemary /></span>
      <span className="hbl-rs-ing hbl-rs-ing-4"><Chili /></span>
      <span className="hbl-rs-ing hbl-rs-ing-5"><Garlic /></span>
      <span className="hbl-rs-ing hbl-rs-ing-6"><Leaf /></span>
    </div>
  );
}

const grotesk = { fontFamily: "var(--font-space-grotesk)" };
const serif = { fontFamily: "var(--font-instrument-serif)" };
const mono = { fontFamily: "var(--font-geist-mono)" };

export function HaldenArt() {
  const bags = [
    { x: 150, fill: "#ece8df", ink: "#2b1a10", label: "No. 01 Ethiopia" },
    { x: 330, fill: "#ff4f2e", ink: "#2b1a10", label: "No. 02 Huila" },
    { x: 510, fill: "#d9a35b", ink: "#2b1a10", label: "No. 03 Decaf" },
  ];
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="hbl-ag-halden-bg" cx="30%" cy="20%" r="90%">
          <stop offset="0" stopColor="#5a3420" />
          <stop offset="1" stopColor="#1e120b" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#hbl-ag-halden-bg)" />
      <ellipse cx="400" cy="520" rx="360" ry="40" fill="#000" opacity="0.35" />
      {bags.map((bag, i) => (
        <g key={bag.label} transform={`translate(${bag.x} ${150 + (i === 1 ? -26 : 0)})`}>
          <rect width="150" height="340" rx="10" fill={bag.fill} />
          <rect width="150" height="34" rx="6" fill="#000" opacity="0.14" />
          <circle cx="75" cy="130" r="46" fill="none" stroke={bag.ink} strokeWidth="2" />
          <text x="75" y="152" textAnchor="middle" fill={bag.ink} style={{ ...serif, fontStyle: "italic", fontSize: 64 }}>H</text>
          <text x="75" y="236" textAnchor="middle" fill={bag.ink} style={{ ...grotesk, fontWeight: 700, fontSize: 19, letterSpacing: "0.18em" }}>HALDEN</text>
          <text x="75" y="262" textAnchor="middle" fill={bag.ink} opacity="0.7" style={{ ...mono, fontSize: 10.5 }}>{bag.label}</text>
          <rect x="20" y="300" width="110" height="1.5" fill={bag.ink} opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

export function NorthlineArt() {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="600" fill="#0d1726" />
      <g stroke="rgba(236,232,223,0.06)">
        {Array.from({ length: 17 }, (_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="600" />
        ))}
      </g>
      <g fill="none" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-20 160 H300 L420 280 H820" stroke="#ff4f2e" />
        <path d="M-20 420 H220 L340 300 H520 L640 180 H820" stroke="#ece8df" />
        <path d="M400 -20 V200 L520 320 V620" stroke="#4fb3a9" />
      </g>
      <g fill="#0d1726" stroke="#ece8df" strokeWidth="5">
        <circle cx="300" cy="160" r="14" />
        <circle cx="420" cy="280" r="18" />
        <circle cx="520" cy="300" r="14" />
        <circle cx="220" cy="420" r="14" />
        <circle cx="640" cy="180" r="14" />
      </g>
      <text x="48" y="96" fill="#ece8df" style={{ ...grotesk, fontWeight: 700, fontSize: 40, letterSpacing: "0.3em" }}>NORTHLINE</text>
      <text x="48" y="540" fill="#ece8df" opacity="0.6" style={{ ...mono, fontSize: 15 }}>Platform 4 · Bergen Central → Voss · 08:42</text>
    </svg>
  );
}

export function MiraArt() {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="hbl-ag-mira-a" cx="25%" cy="30%" r="60%">
          <stop offset="0" stopColor="#ffb4a2" />
          <stop offset="1" stopColor="#ffb4a2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hbl-ag-mira-b" cx="80%" cy="80%" r="60%">
          <stop offset="0" stopColor="#c9b6ff" />
          <stop offset="1" stopColor="#c9b6ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="#f3ece4" />
      <rect width="800" height="600" fill="url(#hbl-ag-mira-a)" />
      <rect width="800" height="600" fill="url(#hbl-ag-mira-b)" />
      <g transform="translate(300 60)">
        <rect width="220" height="460" rx="36" fill="#1a1a1a" />
        <rect x="10" y="10" width="200" height="440" rx="28" fill="#fbf8f4" />
        <text x="30" y="70" fill="#1a1a1a" style={{ ...grotesk, fontWeight: 700, fontSize: 26, letterSpacing: "-0.05em" }}>mira</text>
        <text x="30" y="118" fill="#1a1a1a" style={{ ...serif, fontStyle: "italic", fontSize: 30 }}>Good morning,</text>
        <text x="30" y="148" fill="#1a1a1a" style={{ ...serif, fontStyle: "italic", fontSize: 30 }}>Ana.</text>
        <rect x="30" y="176" width="160" height="96" rx="18" fill="#ffb4a2" />
        <text x="46" y="210" fill="#1a1a1a" style={{ ...mono, fontSize: 10 }}>SLEEP</text>
        <text x="46" y="252" fill="#1a1a1a" style={{ ...grotesk, fontWeight: 700, fontSize: 34, letterSpacing: "-0.04em" }}>7h 42m</text>
        <rect x="30" y="286" width="76" height="76" rx="18" fill="#c9b6ff" />
        <rect x="114" y="286" width="76" height="76" rx="18" fill="#e8e1d8" />
        <rect x="30" y="378" width="160" height="40" rx="20" fill="#1a1a1a" />
        <text x="110" y="403" textAnchor="middle" fill="#fbf8f4" style={{ ...grotesk, fontWeight: 600, fontSize: 13 }}>Book a check-in</text>
      </g>
      <circle cx="170" cy="420" r="56" fill="#1a1a1a" />
      <circle cx="660" cy="170" r="30" fill="#ff4f2e" />
    </svg>
  );
}

export function LowTideArt() {
  const bars = Array.from({ length: 44 }, (_, i) => {
    const h = 30 + ((i * 53 + 17) % 41) * 5 + ((i * 7) % 3) * 22;
    return { x: 60 + i * 16, h };
  });
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="600" fill="#111111" />
      <g fill="#ff4f2e">
        {bars.map((bar) => (
          <rect key={bar.x} x={bar.x} y={300 - bar.h / 2} width="8" height={bar.h} rx="4" />
        ))}
      </g>
      <text x="60" y="110" fill="#ece8df" style={{ ...mono, fontSize: 18, letterSpacing: "0.06em" }}>LOW TIDE RADIO</text>
      <text x="60" y="540" fill="#ece8df" style={{ ...grotesk, fontWeight: 700, fontSize: 88, letterSpacing: "-0.05em" }}>104.6</text>
      <text x="740" y="540" textAnchor="end" fill="#ece8df" opacity="0.6" style={{ ...serif, fontStyle: "italic", fontSize: 36 }}>after dark</text>
    </svg>
  );
}

export function KettleBefore() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="450" fill="#e9edf2" />
      <ellipse cx="400" cy="196" rx="150" ry="44" fill="none" stroke="#2c4a7a" strokeWidth="5" transform="rotate(-8 400 196)" />
      <text x="400" y="210" textAnchor="middle" fill="#2c4a7a" style={{ fontFamily: "Georgia, serif", fontSize: 40 }}>Kettle &amp; Crane</text>
      <text x="400" y="286" textAnchor="middle" fill="#2c4a7a" opacity="0.7" style={{ fontFamily: "Georgia, serif", fontSize: 18, letterSpacing: "0.3em" }}>HOMEWARES LTD.</text>
    </svg>
  );
}

export function KettleAfter() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="450" fill="#ff4f2e" />
      <text x="56" y="300" fill="#0e0e0e" style={{ ...grotesk, fontWeight: 700, fontSize: 270, letterSpacing: "-0.08em" }}>K&amp;C</text>
      <text x="60" y="380" fill="#0e0e0e" style={{ ...grotesk, fontWeight: 700, fontSize: 22, letterSpacing: "0.32em" }}>KETTLE &amp; CRANE</text>
      <text x="744" y="380" textAnchor="end" fill="#0e0e0e" style={{ ...serif, fontStyle: "italic", fontSize: 34 }}>since 1962</text>
      <circle cx="700" cy="110" r="44" fill="#ece8df" />
    </svg>
  );
}

export function BiennaleArt() {
  const clay = ["#c96a3d", "#1f3b2c", "#e3b27a", "#0e0e0e"];
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="600" fill="#ece8df" />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 6 }, (_, col) => {
          const i = row * 6 + col;
          const x = 40 + col * 124;
          const y = 40 + row * 124;
          const fill = clay[(i * 3 + row) % clay.length];
          const kind = (i * 5 + 2) % 4;
          if (kind === 0) return <circle key={i} cx={x + 52} cy={y + 52} r="50" fill={fill} />;
          if (kind === 1) return <path key={i} d={`M${x} ${y + 104} V${y + 52} A52 52 0 0 1 ${x + 104} ${y + 52} V${y + 104} Z`} fill={fill} />;
          if (kind === 2) return <rect key={i} x={x} y={y} width="104" height="104" rx="10" fill={fill} />;
          return <path key={i} d={`M${x} ${y} H${x + 104} V${y + 52} A52 52 0 0 1 ${x} ${y + 52} Z`} fill={fill} />;
        }),
      )}
      <rect x="40" y="536" width="720" height="1.5" fill="#0e0e0e" />
      <text x="40" y="578" fill="#0e0e0e" style={{ ...grotesk, fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em" }}>Oslo Ceramics Biennale</text>
      <text x="760" y="578" textAnchor="end" fill="#0e0e0e" style={{ ...mono, fontSize: 14 }}>12.09 – 30.11.2026</text>
    </svg>
  );
}

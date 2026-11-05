const ticks = Array.from({ length: 60 }, (_, i) => i);
const bars = [38, 62, 48, 80, 56, 92, 70, 44, 86, 64, 52, 74, 40, 68];

export function HeroArt() {
  return (
    <div className="hbl-ft-art" aria-hidden="true">
      <svg viewBox="0 0 560 560" className="hbl-ft-art-svg">
        <defs>
          <radialGradient id="hbl-ft-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c8ff3d" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#c8ff3d" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#c8ff3d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hbl-ft-plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2d24" />
            <stop offset="100%" stopColor="#111310" />
          </linearGradient>
          <linearGradient id="hbl-ft-bar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b8f82" />
            <stop offset="50%" stopColor="#f1f0e8" />
            <stop offset="100%" stopColor="#8b8f82" />
          </linearGradient>
        </defs>
        <circle cx="280" cy="280" r="270" fill="url(#hbl-ft-glow)" />
        <g className="hbl-ft-spin hbl-ft-spin-slow">
          <circle cx="280" cy="280" r="250" fill="none" stroke="rgba(241,240,232,.12)" strokeWidth="1" />
          {ticks.map((i) => {
            const a = (i / 60) * Math.PI * 2;
            const long = i % 5 === 0;
            const r1 = long ? 236 : 242;
            return (
              <line
                key={i}
                x1={(280 + Math.cos(a) * r1).toFixed(2)}
                y1={(280 + Math.sin(a) * r1).toFixed(2)}
                x2={(280 + Math.cos(a) * 250).toFixed(2)}
                y2={(280 + Math.sin(a) * 250).toFixed(2)}
                stroke={long ? "#c8ff3d" : "rgba(241,240,232,.28)"}
                strokeWidth={long ? 2 : 1}
              />
            );
          })}
        </g>
        <g className="hbl-ft-spin hbl-ft-spin-rev">
          <circle cx="280" cy="280" r="200" fill="none" stroke="#c8ff3d" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="2 14" strokeLinecap="round" />
        </g>
        <circle cx="280" cy="280" r="160" fill="none" stroke="rgba(241,240,232,.1)" strokeWidth="18" />
        <circle className="hbl-ft-arc" cx="280" cy="280" r="160" fill="none" stroke="#c8ff3d" strokeWidth="18" strokeLinecap="round" pathLength="100" strokeDasharray="72 100" transform="rotate(-90 280 280)" />
        <circle className="hbl-ft-arc hbl-ft-arc-2" cx="280" cy="280" r="128" fill="none" stroke="#ff5a1f" strokeWidth="6" strokeLinecap="round" pathLength="100" strokeDasharray="44 100" transform="rotate(-90 280 280)" />
        <g className="hbl-ft-lift">
          <rect x="70" y="274" width="420" height="12" rx="6" fill="url(#hbl-ft-bar)" />
          <rect x="128" y="196" width="34" height="168" rx="6" fill="url(#hbl-ft-plate)" stroke="#c8ff3d" strokeWidth="2" />
          <rect x="166" y="218" width="22" height="124" rx="5" fill="url(#hbl-ft-plate)" stroke="rgba(241,240,232,.35)" strokeWidth="1.5" />
          <rect x="398" y="196" width="34" height="168" rx="6" fill="url(#hbl-ft-plate)" stroke="#c8ff3d" strokeWidth="2" />
          <rect x="372" y="218" width="22" height="124" rx="5" fill="url(#hbl-ft-plate)" stroke="rgba(241,240,232,.35)" strokeWidth="1.5" />
          <rect x="112" y="266" width="14" height="28" rx="3" fill="#f1f0e8" />
          <rect x="434" y="266" width="14" height="28" rx="3" fill="#f1f0e8" />
          <text x="145" y="285" textAnchor="middle" fill="#c8ff3d" fontSize="13" fontFamily="var(--font-mono)" transform="rotate(-90 145 280)">25 KG</text>
          <text x="415" y="285" textAnchor="middle" fill="#c8ff3d" fontSize="13" fontFamily="var(--font-mono)" transform="rotate(90 415 280)">25 KG</text>
        </g>
      </svg>
      <div className="hbl-ft-eq">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%`, animationDelay: `${(i * 0.11).toFixed(2)}s` }} />
        ))}
      </div>
      <div className="hbl-ft-art-tag hbl-ft-art-tag-a">
        <span className="hbl-ft-mono-label">Back squat</span>
        <span className="font-mono text-lg">140 kg × 5</span>
      </div>
      <div className="hbl-ft-art-tag hbl-ft-art-tag-b">
        <span className="hbl-ft-mono-label">Heart rate</span>
        <span className="font-mono text-lg">
          162 <span className="hbl-ft-ember">bpm</span>
        </span>
      </div>
    </div>
  );
}

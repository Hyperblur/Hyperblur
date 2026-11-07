import type { Stylist } from "./data";

export function Portrait({ s }: { s: Stylist }) {
  const id = `hbl-sl-p-${s.id}`;
  return (
    <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice" className="hbl-sl-portrait" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={s.bg} />
          <stop offset="1" stopColor="#fbf6f2" />
        </linearGradient>
        <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.hair} />
          <stop offset="1" stopColor={s.hair} stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <rect width="200" height="240" fill={`url(#${id}-bg)`} />
      <circle cx="152" cy="54" r="46" fill="#d9577a" opacity="0.12" />
      <circle cx="40" cy="190" r="56" fill="#b88a4a" opacity="0.12" />
      {s.shape === "long" && (
        <path d="M64 100C60 60 80 58 100 60c22-2 40 4 36 40l10 96c-26 10-66 10-92 0Z" fill={`url(#${id}-hair)`} />
      )}
      {s.shape === "bob" && (
        <path d="M60 100C58 62 82 56 100 58c22-2 44 6 40 42l4 44H56Z" fill={`url(#${id}-hair)`} />
      )}
      <path d="M30 240c4-50 36-72 70-72s66 22 70 72Z" fill="#3b1f2b" />
      <path d="M78 176c8 10 36 10 44 0" fill="none" stroke="#b88a4a" strokeWidth="2" />
      <rect x="88" y="128" width="24" height="44" rx="10" fill={s.skin} />
      <ellipse cx="100" cy="104" rx="30" ry="36" fill={s.skin} />
      {(s.shape === "long" || s.shape === "bob") && (
        <path d="M68 106C64 70 84 60 104 62c22 2 34 18 28 44-8-18-24-24-40-20-12 4-20 12-24 20Z" fill={s.hair} />
      )}
      {s.shape === "crop" && (
        <path d="M68 100C64 64 86 56 106 58c22 2 34 20 26 42-6-14-20-22-36-20-14 2-22 10-28 20Z" fill={s.hair} />
      )}
      {s.shape === "fade" && (
        <>
          <path d="M70 108c-4-22 2-40 30-44 24-2 36 12 32 44-4-12-6-20-6-20H76s-2 8-6 20Z" fill={s.hair} opacity="0.35" />
          <path d="M74 90c0-24 16-30 30-30 18 0 28 10 24 30-12-8-42-8-54 0Z" fill={s.hair} />
        </>
      )}
      {s.shape === "curls" && (
        <g fill={s.hair}>
          <circle cx="72" cy="86" r="14" />
          <circle cx="84" cy="68" r="15" />
          <circle cx="102" cy="60" r="16" />
          <circle cx="120" cy="66" r="15" />
          <circle cx="132" cy="84" r="14" />
          <circle cx="66" cy="104" r="11" />
          <circle cx="136" cy="104" r="11" />
          <circle cx="94" cy="76" r="10" />
          <circle cx="112" cy="78" r="10" />
        </g>
      )}
      {s.shape === "bun" && (
        <>
          <circle cx="100" cy="54" r="16" fill={s.hair} />
          <path d="M68 100C64 66 86 58 104 60c22 2 34 18 28 40-8-16-22-22-38-20-12 2-20 10-26 20Z" fill={s.hair} />
        </>
      )}
    </svg>
  );
}

export function HeroArt() {
  return (
    <svg viewBox="0 0 560 620" className="hbl-sl-hero-svg" aria-hidden="true">
      <defs>
        <linearGradient id="hbl-sl-rib-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b1f2b" />
          <stop offset="0.55" stopColor="#d9577a" />
          <stop offset="1" stopColor="#f4c3b8" />
        </linearGradient>
        <linearGradient id="hbl-sl-rib-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b88a4a" />
          <stop offset="1" stopColor="#f2d7a8" />
        </linearGradient>
        <linearGradient id="hbl-sl-rib-c" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#d9577a" stopOpacity="0.2" />
          <stop offset="1" stopColor="#d9577a" />
        </linearGradient>
        <linearGradient id="hbl-sl-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf6f2" />
          <stop offset="1" stopColor="#f0d3cb" />
        </linearGradient>
        <path id="hbl-sl-ring" d="M470 110a56 56 0 1 1-112 0a56 56 0 1 1 112 0" />
      </defs>
      <path d="M120 600V250a160 160 0 0 1 320 0v350Z" fill="url(#hbl-sl-arch)" stroke="#e2c4bb" />
      <path d="M150 600V258a130 130 0 0 1 260 0v342" fill="none" stroke="#b88a4a" strokeOpacity="0.4" strokeDasharray="2 7" />
      <g className="hbl-sl-ribbons">
        <path
          className="hbl-sl-rib hbl-sl-rib-1"
          d="M-20 180C80 120 180 260 260 230s120-170 220-120 120 150 120 150"
          stroke="url(#hbl-sl-rib-a)"
          strokeWidth="34"
        />
        <path
          className="hbl-sl-rib hbl-sl-rib-2"
          d="M-10 330c90-60 170 70 270 30s140-150 240-90 90 120 90 120"
          stroke="url(#hbl-sl-rib-b)"
          strokeWidth="20"
        />
        <path
          className="hbl-sl-rib hbl-sl-rib-3"
          d="M0 470c120-30 160 80 270 40s150-140 300-60"
          stroke="url(#hbl-sl-rib-c)"
          strokeWidth="44"
        />
        <path
          className="hbl-sl-strand"
          d="M-20 210C80 150 180 290 260 260s120-170 220-120 120 150 120 150"
          stroke="#3b1f2b"
          strokeWidth="1.4"
        />
        <path
          className="hbl-sl-strand hbl-sl-strand-2"
          d="M-10 360c90-60 170 70 270 30s140-150 240-90 90 120 90 120"
          stroke="#b88a4a"
          strokeWidth="1.4"
        />
      </g>
      <g className="hbl-sl-scissors" transform="translate(80 470) rotate(-28)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#1f1d1e" strokeWidth="2.4" />
        <circle cx="0" cy="62" r="22" fill="none" stroke="#1f1d1e" strokeWidth="2.4" />
        <path d="M18 12 150 52M18 50 150 18" stroke="#1f1d1e" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="62" cy="31" r="4" fill="#b88a4a" />
      </g>
      <g className="hbl-sl-comb" transform="translate(372 470) rotate(14)">
        <rect x="0" y="0" width="150" height="20" rx="10" fill="none" stroke="#1f1d1e" strokeWidth="2.4" />
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M${12 + i * 8} 20v${i % 2 === 0 ? 30 : 22}`} stroke="#1f1d1e" strokeWidth="2" strokeLinecap="round" />
        ))}
      </g>
      <g className="hbl-sl-badge">
        <circle cx="414" cy="110" r="70" fill="#3b1f2b" />
        <text className="hbl-sl-ring-text" fill="#f4e4df">
          <textPath href="#hbl-sl-ring">MAISON RUE · COURT STREET · EST. 2014 ·</textPath>
        </text>
        <path d="M398 118c6-16 12-24 18-24s5 10 10 10 6-8 8-12" fill="none" stroke="#f4e4df" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="434" cy="92" r="3" fill="#d9577a" />
      </g>
      <g fill="#b88a4a">
        <path className="hbl-sl-twinkle" d="M96 96l4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" />
        <path className="hbl-sl-twinkle hbl-sl-twinkle-2" d="M500 330l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" />
      </g>
    </svg>
  );
}

export function HairBack({ after }: { after: boolean }) {
  const g = after ? "hbl-sl-ba-a" : "hbl-sl-ba-b";
  return (
    <svg viewBox="0 0 640 440" preserveAspectRatio="xMidYMid slice" className="hbl-sl-ba-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`${g}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={after ? "#f4e4df" : "#e3dcd8"} />
          <stop offset="1" stopColor={after ? "#ebc6bc" : "#cfc6c2"} />
        </linearGradient>
        <linearGradient id={`${g}-hair`} x1="0" y1="0" x2="0" y2="1">
          {after ? (
            <>
              <stop offset="0" stopColor="#4a2a1c" />
              <stop offset="0.35" stopColor="#7a4a2a" />
              <stop offset="0.7" stopColor="#c99a5b" />
              <stop offset="1" stopColor="#f0d29a" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#5b4434" />
              <stop offset="1" stopColor="#6e5646" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect width="640" height="440" fill={`url(#${g}-bg)`} />
      {after && <circle cx="520" cy="80" r="120" fill="#fbf6f2" opacity="0.5" />}
      <path d="M200 440c10-60 60-90 120-90s110 30 120 90Z" fill={after ? "#3b1f2b" : "#6e6466"} />
      {after ? (
        <path
          d="M236 160c0-70 40-104 84-104s84 34 84 104c0 40 30 70 20 130-6 40 18 70 10 110H226c-8-40 16-70 10-110-10-60 0-90 0-130Z"
          fill={`url(#${g}-hair)`}
        />
      ) : (
        <path d="M240 160c0-70 36-104 80-104s80 34 80 104l14 280H226Z" fill={`url(#${g}-hair)`} />
      )}
      {after ? (
        <g fill="none" strokeLinecap="round">
          <path d="M270 120c-10 60 20 100 0 160s10 100 0 140" stroke="#f2d7a8" strokeWidth="5" opacity="0.8" />
          <path d="M320 70c0 80 24 120 4 190s14 110 6 160" stroke="#f6e2bb" strokeWidth="4" opacity="0.7" />
          <path d="M370 120c12 60-16 100 4 160s-8 100 2 140" stroke="#f2d7a8" strokeWidth="5" opacity="0.8" />
          <path d="M296 90c-6 70 14 110-4 170s8 110 0 160" stroke="#3b1f2b" strokeWidth="2" opacity="0.25" />
          <path d="M346 90c6 70-12 110 4 170s-6 110 2 160" stroke="#3b1f2b" strokeWidth="2" opacity="0.25" />
          <path d="M282 96c20-24 56-26 80 0" stroke="#fff" strokeWidth="6" opacity="0.45" />
        </g>
      ) : (
        <g fill="none" stroke="#8a7464" strokeLinecap="round" opacity="0.7">
          <path d="M276 110v330M300 80v360M326 74v366M352 84v356M376 110v330" strokeWidth="1.5" />
          <path d="M230 300l-14 10M232 360l-16 6M410 300l14 10M412 360l16 8M236 230l-12 4M406 232l12 4" strokeWidth="1.6" />
        </g>
      )}
    </svg>
  );
}

export type LookKind = "waves" | "bob" | "platinum" | "vivid" | "coils" | "fade" | "gloss" | "bangs";

export function LookArt({ kind }: { kind: LookKind }) {
  const id = `hbl-sl-lk-${kind}`;
  const palettes: Record<LookKind, [string, string, string]> = {
    waves: ["#5a3324", "#c99a5b", "#f2d7a8"],
    bob: ["#6b2a17", "#b8542d", "#e59a5f"],
    platinum: ["#8d8a93", "#d8d4dc", "#ffffff"],
    vivid: ["#3b1f2b", "#d9577a", "#f6b3c4"],
    coils: ["#1f1d1e", "#3a2a22", "#6e4a36"],
    fade: ["#1f1d1e", "#4a3f3a", "#c9b8ae"],
    gloss: ["#2b1a14", "#5a3324", "#a7714b"],
    bangs: ["#3b1f2b", "#7a4a2a", "#b88a4a"],
  };
  const [a, b, c] = palettes[kind];
  return (
    <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" className="hbl-sl-look-svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="0.6" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill={`url(#${id})`} />
      {kind === "waves" &&
        Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M-20 ${20 + i * 34}c40-30 80 30 120 0s80-30 120 0 80 30 120 0`}
            fill="none"
            stroke={c}
            strokeOpacity={0.25 + (i % 3) * 0.15}
            strokeWidth={6 + (i % 3) * 4}
          />
        ))}
      {kind === "bob" && (
        <g>
          <path d="M60 300V130C60 70 100 40 150 40s90 30 90 90v170" fill="none" stroke={c} strokeOpacity="0.5" strokeWidth="4" />
          <path d="M70 230h160" stroke={c} strokeWidth="10" strokeLinecap="round" opacity="0.8" />
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M${90 + i * 20} 70v${150 - Math.abs(3 - i) * 8}`} stroke={a} strokeOpacity="0.35" strokeWidth="3" />
          ))}
        </g>
      )}
      {kind === "platinum" &&
        Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M${-40 + i * 26} 0l70 300`} stroke={i % 2 ? "#ffffff" : a} strokeOpacity={i % 2 ? 0.6 : 0.25} strokeWidth={i % 3 === 0 ? 8 : 3} />
        ))}
      {kind === "vivid" &&
        Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx="150" cy="150" r={30 + i * 26} fill="none" stroke={i % 2 ? c : a} strokeOpacity="0.45" strokeWidth={10 - i} />
        ))}
      {kind === "coils" && (
        <g fill="none" stroke={c} strokeWidth="5" strokeOpacity="0.75">
          {Array.from({ length: 25 }, (_, i) => {
            const x = 30 + (i % 5) * 60 + (Math.floor(i / 5) % 2) * 30;
            const y = 30 + Math.floor(i / 5) * 60;
            return <circle key={i} cx={x} cy={y} r={16 + (i % 3) * 4} />;
          })}
        </g>
      )}
      {kind === "fade" && (
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x="0" y={i * 30} width="300" height="30" fill={c} opacity={(i * 0.07).toFixed(2)} />
          ))}
          <path d="M40 90c30-30 190-30 220 0" fill="none" stroke={c} strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {kind === "gloss" && (
        <g>
          <path d="M-20 260C80 160 120 40 320 20" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="40" strokeLinecap="round" />
          <path d="M-20 300C100 200 160 100 320 90" fill="none" stroke="#fff" strokeOpacity="0.15" strokeWidth="18" strokeLinecap="round" />
        </g>
      )}
      {kind === "bangs" &&
        Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d={`M${150 - i * 4} 30C${100 - i * 14} 80 ${70 - i * 10} 160 ${40 - i * 4} 300M${150 + i * 4} 30C${200 + i * 14} 80 ${230 + i * 10} 160 ${260 + i * 4} 300`}
            fill="none"
            stroke={c}
            strokeOpacity={0.3 + (i % 2) * 0.25}
            strokeWidth="4"
          />
        ))}
    </svg>
  );
}

export type BottleKind = "tall" | "jar" | "spray" | "dropper" | "tube";

export function Bottle({ kind, color, label }: { kind: BottleKind; color: string; label: string }) {
  return (
    <svg viewBox="0 0 160 200" className="hbl-sl-bottle-svg" aria-hidden="true">
      <ellipse cx="80" cy="188" rx="52" ry="7" fill="#1f1d1e" opacity="0.12" />
      {kind === "tall" && (
        <>
          <rect x="66" y="16" width="28" height="22" rx="4" fill="#1f1d1e" />
          <rect x="48" y="36" width="64" height="150" rx="18" fill={color} />
        </>
      )}
      {kind === "jar" && (
        <>
          <rect x="34" y="92" width="92" height="22" rx="8" fill="#1f1d1e" />
          <rect x="30" y="110" width="100" height="76" rx="18" fill={color} />
        </>
      )}
      {kind === "spray" && (
        <>
          <path d="M70 20h26l8 10H70Z" fill="#1f1d1e" />
          <rect x="68" y="30" width="24" height="18" rx="3" fill="#1f1d1e" />
          <rect x="52" y="48" width="56" height="138" rx="26" fill={color} />
        </>
      )}
      {kind === "dropper" && (
        <>
          <rect x="72" y="22" width="16" height="30" rx="8" fill="#1f1d1e" />
          <rect x="66" y="50" width="28" height="18" rx="4" fill="#b88a4a" />
          <rect x="50" y="66" width="60" height="120" rx="14" fill={color} />
        </>
      )}
      {kind === "tube" && (
        <>
          <path d="M50 26h60l-8 120H58Z" fill={color} />
          <path d="M50 26h60" stroke="#1f1d1e" strokeWidth="6" strokeLinecap="round" />
          <rect x="62" y="144" width="36" height="42" rx="6" fill="#1f1d1e" />
        </>
      )}
      <rect x="58" y={kind === "jar" ? 132 : 110} width="44" height="30" rx="4" fill="#fbf6f2" opacity="0.92" />
      <text x="80" y={kind === "jar" ? 151 : 129} textAnchor="middle" className="hbl-sl-bottle-label">
        {label}
      </text>
      <path d={kind === "jar" ? "M42 118v56" : "M60 56v100"} stroke="#fff" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function StreetMap() {
  return (
    <svg viewBox="0 0 520 380" className="hbl-sl-map-svg" role="img" aria-label="Map showing Maison Rue on Court Street between Union and President Street, two blocks from Carroll Park">
      <rect width="520" height="380" fill="#f4ece6" />
      <path d="M0 300c80-20 140 10 220-10s170-60 300-40v130H0Z" fill="#dfe7ea" />
      <rect x="300" y="40" width="150" height="110" rx="10" fill="#dfe6d4" />
      <g fill="#7a9a6a" opacity="0.5">
        <circle cx="330" cy="70" r="8" />
        <circle cx="360" cy="100" r="10" />
        <circle cx="410" cy="70" r="9" />
        <circle cx="420" cy="120" r="7" />
        <circle cx="340" cy="125" r="6" />
      </g>
      <g stroke="#ffffff" strokeLinecap="round">
        <path d="M0 80h520M0 190h520M0 260h520" strokeWidth="18" />
        <path d="M90 0v380M250 0v380M470 0v380" strokeWidth="18" />
        <path d="M0 20l520 90" strokeWidth="8" opacity="0.8" />
      </g>
      <path d="M170 0v380" stroke="#ffffff" strokeWidth="26" />
      <path d="M170 0v380" stroke="#e8cfc6" strokeWidth="2" strokeDasharray="10 10" />
      <g className="hbl-sl-map-text">
        <text x="182" y="40" transform="rotate(90 182 40)">COURT ST</text>
        <text x="20" y="76">UNION ST</text>
        <text x="20" y="186">PRESIDENT ST</text>
        <text x="20" y="256">CARROLL ST</text>
        <text x="320" y="166">CARROLL PARK</text>
        <text x="60" y="350">GOWANUS</text>
      </g>
      <g transform="translate(260 300)">
        <rect x="0" y="0" width="64" height="26" rx="13" fill="#1f1d1e" />
        <text x="32" y="17" textAnchor="middle" className="hbl-sl-map-sub">F G</text>
      </g>
      <g transform="translate(170 135)">
        <circle r="26" className="hbl-sl-pulse" fill="#d9577a" />
        <path d="M0 4c-10-12-16-20-16-28a16 16 0 0 1 32 0c0 8-6 16-16 28Z" fill="#3b1f2b" transform="translate(0 -4)" />
        <circle cx="0" cy="-28" r="6" fill="#f4e4df" />
      </g>
      <g transform="translate(196 104)">
        <rect width="118" height="34" rx="10" fill="#fbf6f2" stroke="#e2c4bb" />
        <text x="12" y="22" className="hbl-sl-map-pin">Maison Rue</text>
      </g>
    </svg>
  );
}

import type { ReactNode } from "react";
import type { Art } from "./data";

const seeds = [
  [70, -30, -20],
  [92, -38, 10],
  [116, -36, -8],
  [138, -26, 24],
  [82, -18, 30],
  [106, -24, -30],
  [128, -14, 12],
  [58, -16, -40],
];

function pattyPath(y: number, h: number) {
  const top = `M33 ${y + 5} Q100 ${y - 5} 167 ${y + 5} L169 ${y + h - 6}`;
  const pts: string[] = [];
  for (let i = 0; i <= 17; i++) {
    const x = 169 - i * 8;
    const dy = i % 2 === 0 ? h : h - 4 + (i % 3);
    pts.push(`L${x} ${y + dy}`);
  }
  return `${top} ${pts.join(" ")} L31 ${y + h - 6} Z`;
}

function cheesePath(y: number) {
  return `M28 ${y} L172 ${y} L172 ${y + 5} L160 ${y + 5} Q156 ${y + 18} 152 ${y + 5} L124 ${y + 5} Q119 ${y + 22} 114 ${y + 5} L84 ${y + 5} Q80 ${y + 14} 76 ${y + 5} L46 ${y + 5} Q42 ${y + 16} 38 ${y + 5} L28 ${y + 5} Z`;
}

function Burger({ patties, cheese = "#ffb627", extra, patty = "#5a2c16", live = false }: Extract<Art, { kind: "burger" }> & { live?: boolean }) {
  const ph = 20;
  const parts: ReactNode[] = [];
  let y = 150;
  parts.push(
    <path key="bb" d={`M32 ${y} L168 ${y} Q171 ${y + 20} 150 ${y + 23} L50 ${y + 23} Q29 ${y + 20} 32 ${y} Z`} fill="#e39a37" />,
    <path key="bbs" d={`M36 ${y + 2} L164 ${y + 2} Q164 ${y + 8} 156 ${y + 9} L44 ${y + 9} Q36 ${y + 8} 36 ${y + 2} Z`} fill="#f3c27a" opacity="0.55" />,
  );
  y -= 6;
  parts.push(<path key="sauce" d={`M34 ${y} Q100 ${y - 4} 166 ${y} L166 ${y + 6} Q150 ${y + 14} 140 ${y + 6} Q100 ${y + 10} 60 ${y + 6} Q48 ${y + 13} 34 ${y + 6} Z`} fill="#f2a65a" />);
  for (let i = 0; i < patties; i++) {
    y -= ph;
    parts.push(<path key={`p${i}`} d={pattyPath(y, ph + 4)} fill={patty} />);
    parts.push(<path key={`pc${i}`} d={`M40 ${y + 6} Q100 ${y - 1} 160 ${y + 6}`} stroke="#8a4a24" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />);
    parts.push(<path key={`pd${i}`} d={`M52 ${y + 14} h12 M84 ${y + 15} h8 M118 ${y + 13} h14 M146 ${y + 15} h6`} stroke="#3b1c0e" strokeWidth="2.4" strokeLinecap="round" />);
    if (live) {
      parts.push(
        <g key={`sz${i}`} className="hbl-bg-sizzle" fill="#ffc23d">
          <circle cx="26" cy={y + 12} r="1.6" />
          <circle cx="174" cy={y + 8} r="1.4" />
          <circle cx="22" cy={y + 4} r="1.1" />
          <circle cx="178" cy={y + 16} r="1.2" />
        </g>,
      );
    }
    if (cheese) {
      parts.push(<path key={`c${i}`} d={cheesePath(y - 1)} fill={cheese} />);
      parts.push(<path key={`ch${i}`} d={`M32 ${y} L168 ${y}`} stroke="#fff3c4" strokeWidth="1.4" opacity="0.6" />);
    }
    y -= 2;
  }
  if (extra === "jalapeno") {
    y -= 6;
    parts.push(
      <g key="jal">
        {[50, 78, 106, 134, 158].map((x, i) => (
          <g key={x} transform={`translate(${x} ${y + 4 + (i % 2) * 2})`}>
            <ellipse rx="11" ry="4.5" fill="#3f8f3a" />
            <ellipse rx="6" ry="2.2" fill="#a6d672" />
            <circle cx="-2" r="1" fill="#f3f7d6" />
            <circle cx="2.5" cy="0.5" r="1" fill="#f3f7d6" />
          </g>
        ))}
        <path d={`M34 ${y + 9} Q100 ${y + 2} 166 ${y + 9}`} stroke="#ff3b2f" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
      </g>,
    );
  }
  if (extra === "bacon") {
    y -= 8;
    parts.push(
      <g key="bacon" strokeLinecap="round" fill="none">
        <path d={`M30 ${y + 6} q12 -8 24 0 t24 0 t24 0 t24 0 t24 0 t24 0`} stroke="#8e2c1d" strokeWidth="7" />
        <path d={`M30 ${y + 6} q12 -8 24 0 t24 0 t24 0 t24 0 t24 0 t24 0`} stroke="#e8836a" strokeWidth="2" />
      </g>,
    );
  }
  if (extra === "lettuce") {
    y -= 8;
    parts.push(
      <g key="let" transform="translate(0 7)">
        <path d={`M26 ${y + 10} q10 -12 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 L174 ${y + 10} L26 ${y + 10} Z`} fill="#5fb34a" />
        <path d={`M30 ${y + 8} q10 -9 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0`} stroke="#9ed46f" strokeWidth="2" fill="none" />
        <rect x="44" y={y + 8} width="112" height="7" rx="3.5" fill="#e2483a" />
      </g>,
    );
  }
  if (extra === "onion") {
    y -= 4;
    parts.push(
      <g key="on" fill="none" stroke="#f7efe2" strokeWidth="2.4">
        <ellipse cx="62" cy={y + 4} rx="13" ry="3.5" />
        <ellipse cx="104" cy={y + 3} rx="15" ry="3.5" />
        <ellipse cx="142" cy={y + 4} rx="12" ry="3.2" />
      </g>,
    );
  }
  y -= 2;
  parts.push(
    <g key="pick">
      <ellipse cx="58" cy={y + 3} rx="10" ry="3.5" fill="#6e9b2f" />
      <ellipse cx="132" cy={y + 3} rx="10" ry="3.5" fill="#6e9b2f" />
      <path d={`M52 ${y + 3} h12 M126 ${y + 3} h12`} stroke="#b9d77a" strokeWidth="1.2" />
    </g>,
  );
  parts.push(
    <path key="tb" d={`M27 ${y + 2} C27 ${y - 58} 173 ${y - 58} 173 ${y + 2} Q173 ${y + 10} 161 ${y + 10} L39 ${y + 10} Q27 ${y + 10} 27 ${y + 2} Z`} fill="#e8972f" />,
    <path key="tbs" d={`M27 ${y + 2} Q27 ${y + 10} 39 ${y + 10} L161 ${y + 10} Q173 ${y + 10} 173 ${y + 2} Q100 ${y + 8} 27 ${y + 2} Z`} fill="#b86a1d" />,
    <ellipse key="tbh" cx="76" cy={y - 26} rx="30" ry="11" fill="#f9c776" opacity="0.5" transform={`rotate(-14 76 ${y - 26})`} />,
  );
  parts.push(
    <g key="seeds" fill="#fff4dc">
      {seeds.map(([x, dy, r], i) => (
        <ellipse key={i} cx={x} cy={y + dy} rx="3.4" ry="1.6" transform={`rotate(${r} ${x} ${y + dy})`} />
      ))}
    </g>,
  );
  const dy = ((14 - (y - 45)) / 2).toFixed(1);
  return (
    <g transform={`translate(0 ${dy})`}>
      <ellipse cx="100" cy="182" rx="80" ry="8" fill="#000" opacity="0.45" />
      {parts}
      {live && (
        <g className="hbl-bg-steam" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
          <path d={`M76 ${y - 46} q-8 -10 0 -20 t0 -20`} />
          <path d={`M100 ${y - 52} q-8 -10 0 -20 t0 -20`} />
          <path d={`M124 ${y - 46} q-8 -10 0 -20 t0 -20`} />
        </g>
      )}
    </g>
  );
}

function Chicken({ spicy = false }: { spicy?: boolean }) {
  const crust = spicy ? "#c8441f" : "#d9902f";
  const crust2 = spicy ? "#e35d2a" : "#f0b04a";
  return (
    <g>
      <ellipse cx="100" cy="182" rx="80" ry="8" fill="#000" opacity="0.45" />
      <path d="M34 150 L166 150 Q169 170 150 173 L50 173 Q31 170 34 150 Z" fill="#e39a37" />
      <path d="M24 132 q8 -14 20 -8 q6 -14 20 -8 q8 -12 22 -6 q10 -12 24 -4 q10 -10 22 -2 q12 -8 22 2 q14 0 16 14 q6 12 -4 20 q-4 12 -18 8 q-10 10 -24 4 q-12 8 -26 2 q-12 8 -26 0 q-14 6 -24 -4 q-14 2 -16 -10 q-10 -6 -6 -18 z" fill={crust} />
      <g fill={crust2} opacity="0.9">
        <circle cx="52" cy="132" r="5" />
        <circle cx="78" cy="126" r="6" />
        <circle cx="108" cy="130" r="5" />
        <circle cx="136" cy="126" r="6" />
        <circle cx="158" cy="138" r="4" />
        <circle cx="66" cy="146" r="4" />
        <circle cx="122" cy="146" r="4.5" />
      </g>
      {spicy && (
        <g fill="#7a1a0c">
          <circle cx="60" cy="138" r="1.4" />
          <circle cx="92" cy="134" r="1.4" />
          <circle cx="118" cy="138" r="1.2" />
          <circle cx="146" cy="132" r="1.4" />
          <circle cx="102" cy="146" r="1.2" />
        </g>
      )}
      <path d="M30 116 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 L170 122 L30 122 Z" fill={spicy ? "#eef3df" : "#79bf55"} />
      <g stroke={spicy ? "#a8c97a" : "#b5e08a"} strokeWidth="1.6" strokeLinecap="round">
        <path d="M44 117 l10 3 M70 116 l12 3 M100 116 l8 3 M126 117 l12 2 M150 116 l8 3" />
      </g>
      <ellipse cx="66" cy="112" rx="10" ry="3.5" fill="#6e9b2f" />
      <ellipse cx="128" cy="112" rx="10" ry="3.5" fill="#6e9b2f" />
      <path d="M27 112 C27 52 173 52 173 112 Q173 120 161 120 L39 120 Q27 120 27 112 Z" fill="#e8972f" />
      <path d="M27 112 Q27 120 39 120 L161 120 Q173 120 173 112 Q100 118 27 112 Z" fill="#b86a1d" />
      <ellipse cx="76" cy="84" rx="30" ry="11" fill="#f9c776" opacity="0.5" transform="rotate(-14 76 84)" />
    </g>
  );
}

function Tenders() {
  return (
    <g>
      <ellipse cx="100" cy="180" rx="82" ry="8" fill="#000" opacity="0.45" />
      <path d="M22 118 L178 118 L166 170 Q164 176 156 176 L44 176 Q36 176 34 170 Z" fill="#f4ead6" />
      <path d="M22 118 L178 118 L176 128 L24 128 Z" fill="#e3d5b8" />
      <g stroke="#ff3b2f" strokeWidth="3">
        <path d="M40 140 h120 M44 156 h112" opacity="0.5" />
      </g>
      {[[46, 0, -18], [76, -8, -6], [108, -6, 8], [136, 2, 20]].map(([x, dy, r], i) => (
        <g key={i} transform={`rotate(${r} ${x + 12} ${110 + dy})`}>
          <rect x={x} y={70 + dy} width="26" height="60" rx="13" fill="#d98f2f" />
          <circle cx={x + 8} cy={84 + dy} r="4" fill="#f0b04a" />
          <circle cx={x + 17} cy={100 + dy} r="4.5" fill="#f0b04a" />
          <circle cx={x + 9} cy={116 + dy} r="3.5" fill="#f0b04a" />
        </g>
      ))}
      <g transform="translate(150 132)">
        <ellipse cx="0" cy="22" rx="20" ry="6" fill="#000" opacity="0.3" />
        <path d="M-18 0 L18 0 L15 20 Q14 24 10 24 L-10 24 Q-14 24 -15 20 Z" fill="#fafafa" />
        <ellipse cx="0" cy="0" rx="18" ry="5" fill="#ff8a3d" />
      </g>
    </g>
  );
}

function Fries({ topping }: { topping?: "cheese" | "chili" }) {
  const sticks = [
    [58, 58, -12], [72, 44, -6], [86, 36, -2], [100, 32, 2], [114, 38, 6], [128, 46, 10], [142, 58, 14],
    [66, 70, -8], [94, 60, 0], [120, 64, 6],
  ];
  return (
    <g>
      <ellipse cx="100" cy="182" rx="62" ry="7" fill="#000" opacity="0.45" />
      {sticks.map(([x, y, r], i) => (
        <rect key={i} x={x - 6} y={y} width="12" height="80" rx="3" fill={i % 3 === 0 ? "#f5b02e" : "#ffc23d"} transform={`rotate(${r} ${x} ${y + 60})`} />
      ))}
      <path d="M46 106 L154 106 L142 176 Q141 180 136 180 L64 180 Q59 180 58 176 Z" fill="#ff3b2f" />
      <path d="M46 106 L154 106 L152 116 L48 116 Z" fill="#d42a20" />
      <g transform="translate(0 -4)">
      {topping === "cheese" && (
        <path d="M54 104 q10 -16 22 -8 q8 -14 24 -8 q14 -12 26 0 q14 -4 20 12 L148 116 Q140 128 134 116 Q124 132 116 116 Q104 128 94 116 Q82 134 74 116 Q62 126 54 112 Z" fill="#ffb627" />
      )}
      {topping === "chili" && (
        <g>
          <path d="M52 106 q12 -16 26 -8 q10 -14 24 -6 q14 -12 28 0 q12 -2 18 12 L148 116 Q100 126 52 116 Z" fill="#8e2c1d" />
          <path d="M60 108 q20 -6 40 0 t40 0" stroke="#ffb627" strokeWidth="5" fill="none" strokeLinecap="round" />
          <g fill="#c2185b">
            <rect x="72" y="100" width="7" height="3" rx="1.5" />
            <rect x="110" y="98" width="7" height="3" rx="1.5" />
          </g>
          <g fill="#6fbf4a">
            <circle cx="90" cy="102" r="2" />
            <circle cx="128" cy="104" r="2" />
            <circle cx="98" cy="110" r="1.6" />
          </g>
        </g>
      )}
      </g>
      <circle cx="100" cy="146" r="16" fill="#ffc23d" />
      <path d="M90 146 a10 8 0 0 1 20 0 z" fill="#0b0b0b" />
      <rect x="89" y="148" width="22" height="4" rx="2" fill="#0b0b0b" />
    </g>
  );
}

function Rings() {
  return (
    <g>
      <ellipse cx="100" cy="182" rx="74" ry="8" fill="#000" opacity="0.45" />
      <path d="M30 160 L170 160 Q168 176 152 178 L48 178 Q32 176 30 160 Z" fill="#f4ead6" />
      {[[68, 140, 0], [128, 138, 10], [98, 112, -8], [100, 80, 6]].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="34" ry="18" fill="none" stroke="#c9822b" strokeWidth="14" />
          <ellipse cx={x} cy={y} rx="34" ry="18" fill="none" stroke="#efb050" strokeWidth="6" strokeDasharray="6 7" />
        </g>
      ))}
      <g transform="translate(160 146)">
        <path d="M-16 0 L16 0 L13 18 Q12 22 8 22 L-8 22 Q-12 22 -13 18 Z" fill="#fafafa" />
        <ellipse cx="0" cy="0" rx="16" ry="4.5" fill="#c4502a" />
      </g>
    </g>
  );
}

function Shake({ color, top }: { color: string; top: string }) {
  return (
    <g>
      <ellipse cx="100" cy="184" rx="44" ry="6" fill="#000" opacity="0.45" />
      <rect x="118" y="10" width="9" height="70" rx="4.5" fill="#ff3b2f" transform="rotate(14 122 45)" />
      <rect x="118" y="10" width="3" height="70" fill="#ffffff" opacity="0.5" transform="rotate(14 122 45)" />
      <circle cx="78" cy="58" r="16" fill={top} />
      <circle cx="102" cy="50" r="20" fill={top} />
      <circle cx="124" cy="62" r="14" fill={top} />
      <circle cx="90" cy="70" r="16" fill={top} />
      <circle cx="114" cy="72" r="15" fill={top} />
      <circle cx="98" cy="30" r="8" fill="#d81e2b" />
      <path d="M98 22 q4 -10 12 -12" stroke="#4a7a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M58 82 L142 82 L130 176 Q129 182 122 182 L78 182 Q71 182 70 176 Z" fill="#f5f2ec" opacity="0.92" />
      <path d="M62 90 L138 90 L128 172 Q127 176 122 176 L78 176 Q73 176 72 172 Z" fill={color} />
      <path d="M68 96 L76 96 L82 170 L76 170 Z" fill="#ffffff" opacity="0.35" />
      <rect x="56" y="78" width="88" height="10" rx="5" fill="#ffffff" />
      <path d="M86 90 q2 12 -2 18 q-4 -6 -2 -18 z M118 90 q2 16 -2 24 q-4 -8 -2 -24 z" fill={top} opacity="0.9" />
    </g>
  );
}

function Drink({ color, label }: { color: string; label: string }) {
  return (
    <g>
      <ellipse cx="100" cy="184" rx="42" ry="6" fill="#000" opacity="0.45" />
      <rect x="104" y="12" width="8" height="52" rx="4" fill="#ffc23d" transform="rotate(10 108 40)" />
      <path d="M58 52 L142 52 L144 64 L56 64 Z" fill="#f4f1ea" />
      <rect x="52" y="44" width="96" height="12" rx="6" fill="#ffffff" />
      <path d="M60 64 L140 64 L130 176 Q129 182 122 182 L78 182 Q71 182 70 176 Z" fill={color} />
      <path d="M66 70 L74 70 L80 170 L74 170 Z" fill="#ffffff" opacity="0.28" />
      <rect x="64" y="104" width="72" height="34" rx="6" fill="#0b0b0b" />
      <text x="100" y="126" textAnchor="middle" fontFamily="var(--font-grotesk)" fontWeight="700" fontSize="13" letterSpacing="2" fill="#ffffff">
        {label}
      </text>
      <g fill="#ffffff" opacity="0.55">
        <circle cx="84" cy="152" r="2.5" />
        <circle cx="112" cy="160" r="2" />
        <circle cx="98" cy="88" r="2" />
        <circle cx="118" cy="82" r="1.6" />
      </g>
    </g>
  );
}

function Shape({ art, live }: { art: Art; live?: boolean }) {
  switch (art.kind) {
    case "burger":
      return <Burger {...art} live={live} />;
    case "chicken":
      return <Chicken spicy={art.spicy} />;
    case "tenders":
      return <Tenders />;
    case "fries":
      return <Fries topping={art.topping} />;
    case "rings":
      return <Rings />;
    case "shake":
      return <Shake color={art.color} top={art.top} />;
    case "drink":
      return <Drink color={art.color} label={art.label} />;
    case "combo": {
      const [a, b, c] = art.items;
      return (
        <g>
          <rect x="6" y="150" width="188" height="30" rx="10" fill="#1e1e1e" />
          <rect x="6" y="150" width="188" height="4" rx="2" fill="#2c2c2c" />
          {a && (
            <g transform="translate(-2 66) scale(0.5)">
              <Shape art={a} />
            </g>
          )}
          {c && (
            <g transform="translate(104 66) scale(0.5)">
              <Shape art={c} />
            </g>
          )}
          {b && (
            <g transform="translate(34 40) scale(0.66)">
              <Shape art={b} live={live} />
            </g>
          )}
        </g>
      );
    }
  }
}

export function FoodArt({ art, live = false, className = "", label }: { art: Art; live?: boolean; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Shape art={art} live={live} />
    </svg>
  );
}

import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Embers } from "./art";
import { Ico, icons } from "./icons";

function HearthScene() {
  const bricks = Array.from({ length: 30 }, (_, i) => ({ x: (i % 6) * 70 - ((Math.floor(i / 6) % 2) * 35), y: Math.floor(i / 6) * 34 }));
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="500" fill="#2a1d16" />
      <g opacity="0.35">
        {bricks.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width="66" height="30" rx="3" fill="#5a3324" />
        ))}
      </g>
      <path d="M70 500V300a130 130 0 0 1 260 0v200z" fill="#140e0b" />
      <ellipse cx="200" cy="440" rx="120" ry="70" fill="#c8553d" opacity="0.5" className="hbl-rs-scene-glow" />
      <ellipse cx="200" cy="452" rx="70" ry="34" fill="#e7a93b" opacity="0.8" className="hbl-rs-scene-glow" />
      <g fill="#3b2418">
        <rect x="130" y="440" width="140" height="16" rx="8" transform="rotate(-8 200 448)" />
        <rect x="140" y="446" width="130" height="14" rx="7" transform="rotate(10 200 452)" />
      </g>
      <rect x="0" y="470" width="400" height="30" fill="#1d1a17" />
    </svg>
  );
}

function CounterScene() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="500" fill="#e9dcc6" />
      <rect y="0" width="400" height="230" fill="#d9c6a7" />
      <g stroke="#b79d77" strokeWidth="1.5">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M${i * 64} 0v230`} />
        ))}
      </g>
      <g fill="#6b7a3a">
        <circle cx="80" cy="120" r="10" />
        <circle cx="96" cy="112" r="8" />
        <rect x="74" y="128" width="28" height="30" rx="4" fill="#c8553d" />
      </g>
      <g fill="#1d1a17" opacity="0.85">
        <circle cx="200" cy="60" r="14" />
        <path d="M200 74v40" stroke="#1d1a17" strokeWidth="2" />
        <circle cx="300" cy="60" r="14" />
        <path d="M300 74v40" stroke="#1d1a17" strokeWidth="2" />
      </g>
      <ellipse cx="200" cy="118" rx="30" ry="6" fill="#ffd27a" opacity="0.6" />
      <ellipse cx="300" cy="118" rx="30" ry="6" fill="#ffd27a" opacity="0.6" />
      <rect x="0" y="230" width="400" height="34" fill="#7a4a2c" />
      <rect x="0" y="230" width="400" height="6" fill="#9a6a44" />
      <g fill="#1d1a17">
        {[60, 160, 260, 360].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="330" rx="30" ry="9" />
            <rect x={x - 3} y="336" width="6" height="140" />
            <rect x={x - 22} y="430" width="44" height="4" rx="2" />
          </g>
        ))}
      </g>
      <g>
        <circle cx="110" cy="214" r="12" fill="#fffaf1" />
        <circle cx="110" cy="214" r="6" fill="#c8553d" />
        <path d="M240 226v-26h10v26" fill="#6b2a2a" opacity="0.8" />
        <path d="M300 226l8-22h12l8 22z" fill="#fffaf1" opacity="0.7" />
      </g>
    </svg>
  );
}

function TableScene() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="500" fill="#3a2a22" />
      <circle cx="200" cy="120" r="180" fill="#e7a93b" opacity="0.12" />
      <path d="M40 300h320l30 90H10z" fill="#8a5a38" />
      <path d="M10 390h380v12H10z" fill="#6a4228" />
      <rect x="40" y="402" width="10" height="98" fill="#4a2e1c" />
      <rect x="350" y="402" width="10" height="98" fill="#4a2e1c" />
      {[110, 200, 290].map((x, i) => (
        <g key={x}>
          <rect x={x - 4} y="240" width="8" height="58" rx="2" fill="#f6efe3" />
          <path d={`M${x} 240c-6-10-2-18 0-26 2 8 6 16 0 26z`} fill="#ffd27a" className="hbl-rs-candle" style={{ animationDelay: `-${(i * 0.4).toFixed(1)}s` }} />
          <circle cx={x} cy="226" r="26" fill="#ffd27a" opacity="0.14" />
        </g>
      ))}
      {[80, 160, 240, 320].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="340" rx="24" ry="8" fill="#fffaf1" opacity="0.9" />
          <ellipse cx={x} cy="339" rx="12" ry="4" fill="#c8553d" opacity="0.7" />
        </g>
      ))}
      <path d="M150 356l8-30h8l-4 30z" fill="#7a2a2a" opacity="0.6" />
      <path d="M244 356l8-30h8l-4 30z" fill="#e7a93b" opacity="0.5" />
    </svg>
  );
}

function WineScene() {
  const bottles = Array.from({ length: 48 }, (_, i) => ({ col: i % 8, row: Math.floor(i / 8), tone: (i * 7) % 5 }));
  const tones = ["#4a1f1f", "#6b2a2a", "#9a7a3a", "#3a4a2a", "#c8a86a"];
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="500" fill="#1d1a17" />
      {Array.from({ length: 7 }, (_, r) => (
        <rect key={r} x="20" y={40 + r * 70} width="360" height="4" fill="#5a3a26" />
      ))}
      {bottles.map((b, i) => {
        const x = 34 + b.col * 44;
        const y = 44 + b.row * 70;
        return (
          <g key={i}>
            <rect x={x} y={y + 14} width="22" height="50" rx="7" fill={tones[b.tone]} />
            <rect x={x + 7} y={y} width="8" height="18" rx="2" fill={tones[b.tone]} />
            <rect x={x + 3} y={y + 32} width="16" height="14" rx="2" fill="#f6efe3" opacity="0.75" />
          </g>
        );
      })}
      <rect width="400" height="500" fill="url(#hbl-rs-wine-v)" />
      <defs>
        <linearGradient id="hbl-rs-wine-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d1a17" stopOpacity="0" />
          <stop offset="100%" stopColor="#1d1a17" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TerraceScene() {
  const bulbs = Array.from({ length: 11 }, (_, i) => {
    const x = 10 + i * 38;
    const y = 70 + Math.round(Math.sin((i / 10) * Math.PI) * 40);
    return { x, y };
  });
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hbl-rs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b3350" />
          <stop offset="70%" stopColor="#c8553d" />
          <stop offset="100%" stopColor="#e7a93b" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#hbl-rs-sky)" />
      <path d={`M0 60 ${bulbs.map((b) => `L${b.x} ${b.y}`).join(" ")} L400 60`} stroke="#1d1a17" strokeWidth="1.5" fill="none" />
      {bulbs.map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y + 8} r="14" fill="#ffd27a" opacity="0.2" />
          <circle cx={b.x} cy={b.y + 8} r="5" fill="#ffe7a8" className="hbl-rs-bulb" style={{ animationDelay: `-${((i * 0.37) % 3).toFixed(2)}s` }} />
        </g>
      ))}
      <path d="M300 500V300" stroke="#2a2016" strokeWidth="12" />
      <path d="M300 330c-20-30-60-40-90-30M300 310c20-30 60-36 84-24" stroke="#2a2016" strokeWidth="5" fill="none" />
      <g fill="#4f5a2a">
        <ellipse cx="300" cy="250" rx="90" ry="60" />
        <ellipse cx="230" cy="290" rx="50" ry="30" />
        <ellipse cx="370" cy="280" rx="50" ry="34" />
      </g>
      <g fill="#6b7a3a" opacity="0.8">
        <ellipse cx="270" cy="230" rx="30" ry="16" />
        <ellipse cx="330" cy="262" rx="26" ry="14" />
      </g>
      <rect x="0" y="430" width="400" height="70" fill="#1d1a17" />
      <g fill="#1d1a17">
        <rect x="40" y="380" width="120" height="8" rx="4" />
        <rect x="56" y="388" width="6" height="50" />
        <rect x="138" y="388" width="6" height="50" />
      </g>
      <circle cx="100" cy="372" r="6" fill="#ffd27a" />
    </svg>
  );
}

const scenes = [
  { id: "hearth", title: "The hearth", text: "An eight-foot oak fire at the heart of the room.", seats: "Kitchen view", Scene: HearthScene, embers: true },
  { id: "counter", title: "Chef's counter", text: "Ten stools, front row to the fire. Walk-ins welcome.", seats: "10 seats", Scene: CounterScene, embers: false },
  { id: "table", title: "The long table", text: "Twenty feet of reclaimed walnut under the skylight.", seats: "Up to 16", Scene: TableScene, embers: false },
  { id: "wine", title: "The wine wall", text: "212 bottles, ask for a taste before you commit.", seats: "Wine bar", Scene: WineScene, embers: false },
  { id: "terrace", title: "The terrace", text: "Heated, covered and lit with string lights all year.", seats: "18 seats", Scene: TerraceScene, embers: false },
];

export function Room() {
  return (
    <section id="room" className="hbl-rs-section hbl-rs-room">
      <div className="hbl-rs-wrap">
        <div className="hbl-rs-head hbl-rs-head-split">
          <div>
            <p className="hbl-rs-kicker">The room</p>
            <h2 className="hbl-rs-h2">
              Sixty seats, <em>one fire.</em>
            </h2>
          </div>
          <p className="hbl-rs-sub">
            Exposed brick, a walnut counter and a terrace under the olive tree. Hover or tap a corner of the room to step
            inside.
          </p>
        </div>
        <FadeInView distance={24}>
          <ul className="hbl-rs-gallery">
            {scenes.map(({ id, title, text, seats, Scene, embers }) => (
              <li key={id} className="hbl-rs-scene" tabIndex={0} aria-label={`${title}. ${text}`}>
                <div className="hbl-rs-scene-art">
                  <Scene />
                  {embers && <Embers count={12} className="hbl-rs-scene-embers" />}
                </div>
                <div className="hbl-rs-scene-cap">
                  <span className="hbl-rs-mono hbl-rs-scene-seats">{seats}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeInView>
      </div>
    </section>
  );
}

const events = [
  {
    when: "First Sunday · 6:00 PM",
    title: "Fire Suppers",
    text: "Four courses at the long table, cooked whole over the hearth and served family style. One seating, sixteen guests.",
    price: "$95 per guest",
    icon: icons.flame,
  },
  {
    when: "Every Wednesday · 5 to 7 PM",
    title: "Natural wine hour",
    text: "Three pours chosen by our sommelier Ana Ruiz, with a small plate from the fire. No booking, just the bar.",
    price: "$28 flight",
    icon: icons.wine,
  },
  {
    when: "Nov 20 · 7:00 PM",
    title: "Harvest dinner with Fiddle Creek Farm",
    text: "A six-course menu built around one farm's last pick of the season, with the growers at the table.",
    price: "$140 with pairing",
    icon: icons.leaf,
  },
];

export function Events() {
  return (
    <section id="events" className="hbl-rs-section hbl-rs-events">
      <div className="hbl-rs-wrap">
        <div className="hbl-rs-head">
          <p className="hbl-rs-kicker">Events &amp; private dining</p>
          <h2 className="hbl-rs-h2">
            Gather around <em>the fire.</em>
          </h2>
        </div>
        <div className="hbl-rs-events-grid">
          <div className="hbl-rs-events-list">
            {events.map((e, i) => (
              <FadeInView key={e.title} delay={i * 0.08} distance={16} className="hbl-rs-min0">
                <article className="hbl-rs-event">
                  <span className="hbl-rs-event-ic">
                    <Ico size={20}>{e.icon}</Ico>
                  </span>
                  <div className="hbl-rs-min0">
                    <p className="hbl-rs-mono hbl-rs-event-when">{e.when}</p>
                    <h3>{e.title}</h3>
                    <p className="hbl-rs-event-text">{e.text}</p>
                  </div>
                  <span className="hbl-rs-event-price hbl-rs-mono">{e.price}</span>
                </article>
              </FadeInView>
            ))}
          </div>
          <FadeInView delay={0.15} distance={20} className="hbl-rs-min0">
            <article className="hbl-rs-private">
              <div className="hbl-rs-private-art" aria-hidden="true">
                <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                  <rect width="400" height="200" fill="#6b7a3a" />
                  <circle cx="320" cy="40" r="120" fill="#e7a93b" opacity="0.18" />
                  <rect x="60" y="110" width="280" height="14" rx="7" fill="#3a2a18" />
                  {[90, 140, 190, 240, 290].map((x) => (
                    <g key={x}>
                      <ellipse cx={x + 10} cy="106" rx="14" ry="4" fill="#fffaf1" />
                      <rect x={x + 8} y="80" width="4" height="22" rx="2" fill="#f6efe3" />
                      <path d={`M${x + 10} 80c-4-6-1-11 0-15 1 4 4 9 0 15z`} fill="#ffd27a" className="hbl-rs-candle" />
                    </g>
                  ))}
                  <g fill="#4f5a2a">
                    <ellipse cx="40" cy="40" rx="60" ry="30" />
                    <ellipse cx="380" cy="180" rx="60" ry="26" />
                  </g>
                </svg>
              </div>
              <div className="hbl-rs-private-body">
                <p className="hbl-rs-mono hbl-rs-event-when">Private dining</p>
                <h3>The Olive Room</h3>
                <p>
                  A candlelit room off the kitchen for 8 to 18 guests, with its own sound system and a window onto the
                  hearth. Full buyouts of the restaurant for up to 80 standing.
                </p>
                <ul className="hbl-rs-private-list">
                  <li><Ico size={15} stroke={2}>{icons.check}</Ico>Set menus from $110 per guest</li>
                  <li><Ico size={15} stroke={2}>{icons.check}</Ico>Wine pairing curated with you</li>
                  <li><Ico size={15} stroke={2}>{icons.check}</Ico>Dedicated host and printed menus</li>
                </ul>
                <div className="hbl-rs-private-ctas">
                  <a href="mailto:events@emberandolive.com" className="hbl-rs-btn hbl-rs-btn-cream">
                    Plan an event
                    <Ico size={16} stroke={2}>{icons.arrow}</Ico>
                  </a>
                  <span className="hbl-rs-mono hbl-rs-private-note">Replies within one business day</span>
                </div>
              </div>
            </article>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

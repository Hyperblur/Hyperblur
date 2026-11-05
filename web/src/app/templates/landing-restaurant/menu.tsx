import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { MenuBoard } from "./menu-board";
import { Lemon, Plate, Rosemary } from "./art";
import { Ico, icons } from "./icons";

const seasonal = [
  {
    name: "Persimmon & burrata",
    price: "19",
    text: "Fuyu persimmon, hazelnut dukkah, aged balsamic.",
    hue: "#e7a93b",
    shape: "circles",
  },
  {
    name: "Coal-roasted beets",
    price: "16",
    text: "Smoked yogurt, horseradish, dill, rye crumb.",
    hue: "#9a3a4a",
    shape: "rings",
  },
  {
    name: "Wild mushroom flatbread",
    price: "22",
    text: "Chanterelle, taleggio, thyme honey, from the hearth.",
    hue: "#6b7a3a",
    shape: "leaves",
  },
];

function SeasonArt({ hue, shape }: { hue: string; shape: string }) {
  return (
    <svg viewBox="0 0 200 140" className="hbl-rs-season-art" aria-hidden="true">
      <rect width="200" height="140" fill="#efe4d2" />
      <circle cx="100" cy="76" r="56" fill="#fffaf1" stroke="#e2d3bb" />
      <circle cx="100" cy="76" r="42" fill="#f6efe3" />
      {shape === "circles" && (
        <g>
          <circle cx="86" cy="70" r="14" fill="#fbf5ea" stroke="#e8dcc6" />
          <circle cx="112" cy="82" r="11" fill={hue} />
          <circle cx="100" cy="62" r="8" fill={hue} opacity="0.75" />
          <circle cx="118" cy="64" r="3" fill="#6b7a3a" />
          <circle cx="82" cy="90" r="3" fill="#6b7a3a" />
        </g>
      )}
      {shape === "rings" && (
        <g fill="none" stroke={hue} strokeWidth="7" strokeLinecap="round">
          <path d="M78 80a14 14 0 1 1 20 0" />
          <path d="M104 70a12 12 0 1 1 16 14" opacity="0.8" />
          <path d="M90 96c8 2 18 2 26-4" stroke="#fbf5ea" strokeWidth="6" />
        </g>
      )}
      {shape === "leaves" && (
        <g>
          <ellipse cx="100" cy="76" rx="34" ry="30" fill="#e5c890" />
          <ellipse cx="88" cy="70" rx="8" ry="5" fill="#8a6a3a" />
          <ellipse cx="110" cy="80" rx="9" ry="5" fill="#a07c42" />
          <ellipse cx="98" cy="88" rx="7" ry="4" fill="#8a6a3a" />
          <path d="M80 82l10-6M112 64l8 6M104 96l8-4" stroke={hue} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

export function Menu() {
  return (
    <section id="menu" className="hbl-rs-section hbl-rs-menu">
      <div className="hbl-rs-wrap">
        <div className="hbl-rs-head">
          <p className="hbl-rs-kicker">Tonight&apos;s menu</p>
          <h2 className="hbl-rs-h2">
            Written on Tuesday, <em>gone by Sunday.</em>
          </h2>
          <p className="hbl-rs-sub">Everything is made to share. Plates arrive when they leave the fire, not all at once.</p>
        </div>

        <div className="hbl-rs-menu-grid">
          <FadeInView className="hbl-rs-min0" distance={20}>
            <MenuBoard />
          </FadeInView>

          <FadeInView className="hbl-rs-min0" distance={20} delay={0.1}>
            <TiltCard maxTilt={8} glare scale={1.02} className="hbl-rs-sig-tilt">
              <article className="hbl-rs-sig">
                <div className="hbl-rs-sig-art">
                  <div className="hbl-rs-sig-glow" aria-hidden="true" />
                  <div className="hbl-rs-sig-plate">
                    <Plate uid="sig" />
                  </div>
                  <span className="hbl-rs-sig-ing hbl-rs-sig-ing-1" aria-hidden="true"><Lemon /></span>
                  <span className="hbl-rs-sig-ing hbl-rs-sig-ing-2" aria-hidden="true"><Rosemary /></span>
                  <span className="hbl-rs-sig-badge hbl-rs-mono">Chef&apos;s signature</span>
                </div>
                <div className="hbl-rs-sig-body">
                  <div className="hbl-rs-sig-top">
                    <h3>Lamb shoulder, seven hours</h3>
                    <span className="hbl-rs-mono hbl-rs-sig-price">$46</span>
                  </div>
                  <p>
                    Buried in oak embers at noon, pulled at seven. Pomegranate molasses, charred flatbread, a pile of
                    soft herbs. It feeds two, and it sells out most Saturdays by 8:30.
                  </p>
                  <ul className="hbl-rs-sig-meta">
                    <li>
                      <Ico size={15}>{icons.clock}</Ico>
                      7 hours in the hearth
                    </li>
                    <li>
                      <Ico size={15}>{icons.wine}</Ico>
                      Pair with Frappato, $15
                    </li>
                  </ul>
                </div>
              </article>
            </TiltCard>
          </FadeInView>
        </div>

        <div className="hbl-rs-season">
          <div className="hbl-rs-season-head">
            <h3 className="hbl-rs-h3">This week from the market</h3>
            <span className="hbl-rs-mono hbl-rs-muted">Week 45 · Nov 3 to Nov 8</span>
          </div>
          <div className="hbl-rs-season-grid">
            {seasonal.map((s, i) => (
              <FadeInView key={s.name} delay={i * 0.08} distance={18} className="hbl-rs-min0">
                <TiltCard maxTilt={10} glare scale={1.03} className="hbl-rs-season-tilt">
                  <article className="hbl-rs-season-card">
                    <SeasonArt hue={s.hue} shape={s.shape} />
                    <div className="hbl-rs-season-body">
                      <div className="hbl-rs-season-top">
                        <h4>{s.name}</h4>
                        <span className="hbl-rs-mono">${s.price}</span>
                      </div>
                      <p>{s.text}</p>
                    </div>
                  </article>
                </TiltCard>
              </FadeInView>
            ))}
          </div>
        </div>

        <div className="hbl-rs-midcta">
          <p>
            <span className="hbl-rs-serif-i">Friday is filling up.</span> Eleven tables left after 7 PM.
          </p>
          <a href="#reserve" className="hbl-rs-btn hbl-rs-btn-primary">
            Reserve a table
            <Ico size={16} stroke={2}>{icons.arrow}</Ico>
          </a>
        </div>
      </div>
    </section>
  );
}

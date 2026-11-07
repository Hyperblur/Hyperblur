import { Marquee } from "@/registry/hyperblur/marquee";
import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SplitText } from "@/registry/hyperblur/split-text";
import { ScrollVelocityText } from "@/registry/hyperblur/scroll-velocity-text";
import { Ico, icons } from "./icons";
import { Leaf, Olive } from "./art";

const press = [
  { name: "The Fog City Review", note: "Best new restaurant, 2026" },
  { name: "Bay Plate Guide", note: "Two flames, Hayes Valley" },
  { name: "West Coast Dining Awards", note: "Wine list of the year" },
  { name: "Hearth & Vine Quarterly", note: "“The best octopus north of Naples”" },
  { name: "Golden Gate Gazette", note: "Top 50 tables, three years running" },
  { name: "Table Notes", note: "Editor’s pick for date night" },
];

export function Press() {
  return (
    <section className="hbl-rs-press" aria-label="Press and awards">
      <Marquee speed={38} gap={56} pauseOnHover fade>
        {press.map((p) => (
          <span key={p.name} className="hbl-rs-press-item">
            <span className="hbl-rs-press-name">{p.name}</span>
            <span className="hbl-rs-press-note">{p.note}</span>
          </span>
        ))}
      </Marquee>
      <div className="hbl-rs-wrap">
        <dl className="hbl-rs-stats">
          <div>
            <dt>Average from 1,284 reviews</dt>
            <dd>
              <CountUp to={4.8} decimals={1} duration={1.6} />
              <span className="hbl-rs-stats-unit">/5</span>
            </dd>
          </div>
          <div>
            <dt>Years on Hayes Street</dt>
            <dd>
              <CountUp to={9} duration={1.4} />
            </dd>
          </div>
          <div>
            <dt>Low-intervention wines</dt>
            <dd>
              <CountUp to={212} duration={1.8} />
            </dd>
          </div>
          <div>
            <dt>Regional awards in 2026</dt>
            <dd>
              <CountUp to={3} duration={1.2} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

const facts = [
  { icon: icons.flame, title: "Oak and almond wood", text: "A 900°F hearth we light at 11 every morning." },
  { icon: icons.leaf, title: "Farms within 120 miles", text: "Eleven growers, from Bolinas to the Capay Valley." },
  { icon: icons.wine, title: "212 natural wines", text: "Small growers from Sicily, Jura, Crete and Sonoma." },
];

export function Story() {
  return (
    <section id="story" className="hbl-rs-section hbl-rs-story">
      <div className="hbl-rs-wrap hbl-rs-story-grid">
        <FadeInView direction="right" distance={24} className="hbl-rs-min0">
          <figure className="hbl-rs-chef" aria-label="Illustration of Chef Leila Haddad at the hearth">
            <div className="hbl-rs-chef-arch">
              <svg viewBox="0 0 320 400" className="hbl-rs-chef-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="hbl-rs-chef-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e7a93b" />
                    <stop offset="55%" stopColor="#c8553d" />
                    <stop offset="100%" stopColor="#7a2f20" />
                  </linearGradient>
                </defs>
                <rect width="320" height="400" fill="url(#hbl-rs-chef-bg)" />
                <circle cx="160" cy="300" r="150" fill="#ffd27a" opacity="0.22" />
                <g fill="#1d1a17">
                  <path d="M60 400c4-70 44-112 100-112s96 42 100 112z" />
                  <circle cx="160" cy="196" r="54" />
                  <path d="M112 150c-8-34 18-62 48-62s56 28 48 62c-10-10-26-14-48-14s-38 4-48 14z" fill="#f6efe3" />
                  <rect x="112" y="142" width="96" height="16" rx="8" fill="#f6efe3" />
                </g>
                <path d="M118 300c14 18 70 18 84 0" stroke="#f6efe3" strokeWidth="2" fill="none" opacity="0.6" />
                <path d="M160 288v112" stroke="#f6efe3" strokeWidth="1.5" opacity="0.35" />
                <g stroke="#f6efe3" strokeWidth="1.6" fill="none" opacity="0.5" strokeLinecap="round">
                  <path d="M30 360c20-30 40-46 70-56" />
                  <path d="M290 360c-20-30-40-46-70-56" />
                </g>
              </svg>
              <span className="hbl-rs-chef-leaf hbl-rs-chef-leaf-1"><Leaf /></span>
              <span className="hbl-rs-chef-leaf hbl-rs-chef-leaf-2"><Olive /></span>
            </div>
            <figcaption>
              <span className="hbl-rs-chef-name">Leila Haddad</span>
              <span className="hbl-rs-mono">Chef and co-owner · since 2017</span>
            </figcaption>
          </figure>
        </FadeInView>

        <div className="hbl-rs-min0">
          <p className="hbl-rs-kicker">Our story</p>
          <h2 className="hbl-rs-h2">
            <SplitText text="Cooked over oak, finished by hand." by="words" stagger={0.06} />
          </h2>
          <FadeInView delay={0.1}>
            <p className="hbl-rs-p">
              Leila grew up in her grandmother&apos;s kitchen in Byblos, learned fire at a fish shack outside Marseille and
              spent six years running the grill at a Basque asador before opening Ember &amp; Olive with her partner Sam
              Whitfield in 2017.
            </p>
            <p className="hbl-rs-p">
              The idea has not changed: one hearth, one long counter, food that tastes of smoke and lemon and good olive
              oil, and a room where nobody looks at the clock. The menu moves with the market every Tuesday.
            </p>
          </FadeInView>
          <blockquote className="hbl-rs-quote">
            <p>&ldquo;Fire is honest. You can&apos;t hide a tired tomato from it.&rdquo;</p>
            <cite className="hbl-rs-sign">Leila</cite>
          </blockquote>
          <ul className="hbl-rs-facts">
            {facts.map((f, i) => (
              <li key={f.title}>
                <FadeInView delay={0.08 * i} distance={12} className="hbl-rs-fact">
                  <span className="hbl-rs-fact-ic">
                    <Ico size={18}>{f.icon}</Ico>
                  </span>
                  <span>
                    <b>{f.title}</b>
                    <small>{f.text}</small>
                  </span>
                </FadeInView>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function DishBand() {
  return (
    <div className="hbl-rs-band" aria-hidden="true">
      <ScrollVelocityText
        className="hbl-rs-band-row"
        text="Charred octopus · Lamb shoulder, seven hours · Smoked labneh · Whole dorade · Fire-blistered peppers · Burnt honey tart ·"
        baseSpeed={36}
        gap={28}
      />
      <ScrollVelocityText
        className="hbl-rs-band-row hbl-rs-band-row-2"
        text="Natural wine · Sourdough from the hearth · Saffron rice · Olive oil cake · Grilled halloumi · Ember-roasted carrots ·"
        baseSpeed={30}
        gap={28}
        direction={-1}
      />
    </div>
  );
}

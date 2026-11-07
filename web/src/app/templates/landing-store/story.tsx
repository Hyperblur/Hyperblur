import type { CSSProperties } from "react";
import { CountUp } from "@/registry/hyperblur/count-up";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ArrowIcon } from "./icons";

const materials = [
  {
    name: "Stoneware",
    where: "Bennington, Vermont",
    text: "Thrown on the wheel by Mara Ellison and two apprentices, fired to 2,300°F so it rings like a bell and lasts for decades.",
  },
  {
    name: "Belgian flax",
    where: "Kortrijk, Belgium",
    text: "Grown without irrigation, woven at a mill that has worked flax since 1928, then stonewashed until it feels lived in.",
  },
  {
    name: "Coconut-soy wax",
    where: "Hudson, New York",
    text: "Poured by hand in 40-candle batches with cotton wicks and phthalate-free oils. No paraffin, ever.",
  },
];

function MaterialArt() {
  return (
    <svg viewBox="0 0 520 560" className="hbl-st-mat-art" aria-hidden="true">
      <defs>
        <pattern id="hbl-st-weave" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#d6c6a8" />
          <path d="M0 2.5h10M0 7.5h10" stroke="#c4b292" strokeWidth="2" />
          <path d="M2.5 0v10M7.5 0v10" stroke="#e4d7bf" strokeWidth="1.4" />
        </pattern>
        <radialGradient id="hbl-st-wax" cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#e8dcc7" />
        </radialGradient>
        <linearGradient id="hbl-st-stone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c97b59" />
          <stop offset="1" stopColor="#9b5639" />
        </linearGradient>
        <filter id="hbl-st-mshadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#1c1c1a" floodOpacity=".18" />
        </filter>
      </defs>
      <rect x="0" y="0" width="520" height="560" rx="28" fill="#23352b" />
      <circle cx="420" cy="90" r="160" fill="#2e4538" />
      <circle cx="80" cy="520" r="140" fill="#2a3f33" />
      <g className="hbl-st-float" style={{ "--d": "-1s", "--a": "-10px" } as CSSProperties}>
        <g filter="url(#hbl-st-mshadow)" transform="rotate(-8 190 210)">
          <rect x="70" y="90" width="240" height="240" rx="22" fill="url(#hbl-st-weave)" />
          <path d="M70 300h240" stroke="#faf7f2" strokeOpacity=".5" strokeDasharray="4 4" />
          <g stroke="#d6c6a8" strokeWidth="2.2" strokeLinecap="round">
            {[110, 130, 150, 170, 190, 210, 230, 250, 270].map((x) => (
              <path key={x} d={`M${x} 330v12`} />
            ))}
          </g>
        </g>
      </g>
      <g className="hbl-st-float" style={{ "--d": "-2.5s", "--a": "-12px" } as CSSProperties}>
        <g filter="url(#hbl-st-mshadow)" transform="rotate(7 350 300)">
          <rect x="250" y="190" width="200" height="200" rx="100" fill="url(#hbl-st-stone)" />
          <circle cx="350" cy="290" r="62" fill="none" stroke="#faf7f2" strokeOpacity=".22" strokeWidth="2" />
          <circle cx="350" cy="290" r="36" fill="none" stroke="#faf7f2" strokeOpacity=".16" strokeWidth="2" />
          <g fill="#5e3020" opacity=".35">
            <circle cx="300" cy="250" r="2.4" />
            <circle cx="390" cy="240" r="1.8" />
            <circle cx="410" cy="320" r="2" />
            <circle cx="320" cy="350" r="1.6" />
            <circle cx="360" cy="220" r="1.4" />
          </g>
        </g>
      </g>
      <g className="hbl-st-float" style={{ "--d": "-3.8s", "--a": "-8px" } as CSSProperties}>
        <g filter="url(#hbl-st-mshadow)">
          <rect x="120" y="360" width="190" height="130" rx="20" fill="url(#hbl-st-wax)" />
          <ellipse cx="215" cy="408" rx="58" ry="10" fill="#efe3cc" />
          <path d="M215 408v-16" stroke="#2a2622" strokeWidth="2.4" strokeLinecap="round" />
          <path className="hbl-st-flame" d="M215 362c6 9 10 15 10 21a10 10 0 0 1-20 0c0-6 4-12 10-21Z" fill="#f2b04f" />
          <rect x="160" y="440" width="110" height="4" rx="2" fill="#23352b" opacity=".35" />
          <rect x="182" y="452" width="66" height="3" rx="1.5" fill="#23352b" opacity=".22" />
        </g>
      </g>
      <g fontFamily="var(--font-grotesk)" fontSize="13" letterSpacing="1.5" fill="#f3eee6">
        <text x="44" y="64">FLAX · KORTRIJK</text>
        <text x="330" y="440">STONEWARE · VERMONT</text>
        <text x="44" y="526" opacity=".8">WAX · HUDSON VALLEY</text>
      </g>
    </svg>
  );
}

export function Story() {
  return (
    <section id="story" className="hbl-st-section">
      <div className="hbl-st-wrap hbl-st-split">
        <FadeInView direction="right" className="min-w-0">
          <MaterialArt />
        </FadeInView>
        <div className="min-w-0">
          <FadeInView>
            <p className="hbl-st-kicker">Our story</p>
            <h2 className="hbl-st-h2 font-serif">Made slowly, by people we know by name.</h2>
            <p className="hbl-st-sub">
              Haven started in 2019 as a market stall on Bedford Avenue with forty mugs and one linen throw. Today we work
              with fourteen small studios on three continents, and we still visit every one of them before a piece goes
              on the shelf.
            </p>
          </FadeInView>
          <ul className="hbl-st-mats">
            {materials.map((m, i) => (
              <li key={m.name}>
                <FadeInView delay={0.1 + i * 0.1} className="hbl-st-mat">
                  <span className="hbl-st-mat-n font-grotesk">0{i + 1}</span>
                  <div className="min-w-0">
                    <p className="hbl-st-mat-name">
                      {m.name} <span>{m.where}</span>
                    </p>
                    <p className="hbl-st-mat-text">{m.text}</p>
                  </div>
                </FadeInView>
              </li>
            ))}
          </ul>
          <dl className="hbl-st-stats">
            <div>
              <dt>Partner studios</dt>
              <dd className="font-serif">
                <CountUp to={14} duration={1.4} />
              </dd>
            </div>
            <div>
              <dt>Homes furnished</dt>
              <dd className="font-serif">
                <CountUp to={62} suffix="k" duration={1.8} />
              </dd>
            </div>
            <div>
              <dt>Plastic-free packaging</dt>
              <dd className="font-serif">
                <CountUp to={100} suffix="%" duration={2} />
              </dd>
            </div>
          </dl>
          <a href="#bestsellers" className="hbl-st-btn hbl-st-btn-primary">
            Shop the collection
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

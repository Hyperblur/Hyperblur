"use client";

import * as React from "react";
import { RotatingText } from "@/registry/hyperblur/rotating-text";
import { CountUp } from "@/registry/hyperblur/count-up";
import { FoodArt } from "./art";
import { findItem, money } from "./data";
import { useOrder } from "./order";
import { Ico, icons } from "./icons";

const sizes = [
  { id: "smash-single", label: "Single", patties: 1 },
  { id: "smash-double", label: "Double", patties: 2 },
  { id: "triple-threat", label: "Triple", patties: 3 },
];

function QuickOrder() {
  const { add, qtyOf } = useOrder();
  const [pick, setPick] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);
  const size = sizes[pick];
  const item = findItem(size.id);
  const inBag = qtyOf(size.id);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function onAdd() {
    add(size.id);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="hbl-bg-quick">
      <div className="hbl-bg-quick-head">
        <span className="hbl-bg-live">
          <span className="hbl-bg-live-dot" aria-hidden="true" />
          Grill is hot
        </span>
        <span className="hbl-bg-quick-wait">
          <Ico size={14}>{icons.clock}</Ico>3 orders ahead · ~9 min
        </span>
      </div>
      <p className="hbl-bg-quick-name">{item?.name}</p>
      <p className="hbl-bg-quick-desc">{item?.desc}</p>
      <div className="hbl-bg-quick-seg" role="radiogroup" aria-label="Patties">
        {sizes.map((s, i) => (
          <button key={s.id} type="button" role="radio" aria-checked={pick === i} data-on={pick === i} onClick={() => setPick(i)}>
            <span className="hbl-bg-quick-dots" aria-hidden="true">
              {Array.from({ length: s.patties }, (_, k) => (
                <i key={k} />
              ))}
            </span>
            {s.label}
          </button>
        ))}
      </div>
      <div className="hbl-bg-quick-foot">
        <p className="hbl-bg-quick-price" key={size.id}>
          {money(item?.price ?? 0)}
        </p>
        <button type="button" className="hbl-bg-btn hbl-bg-btn-red" onClick={onAdd} data-done={added}>
          {added ? <Ico size={16} stroke={2.4}>{icons.check}</Ico> : <Ico size={16} stroke={2.4}>{icons.plus}</Ico>}
          {added ? "Added" : "Add to order"}
        </button>
      </div>
      <p className="hbl-bg-quick-bag" aria-live="polite">
        {inBag > 0 ? `${inBag} in your bag` : "Free fountain refills when you eat in"}
      </p>
    </div>
  );
}

export function BurgerHero() {
  return (
    <section id="top" className="hbl-bg-hero">
      <div className="hbl-bg-hero-glow" aria-hidden="true" />
      <div className="hbl-bg-hero-grid-bg" aria-hidden="true" />
      <div className="hbl-bg-wrap hbl-bg-hero-grid">
        <div className="hbl-bg-min0 hbl-bg-hero-copy">
          <p className="hbl-bg-pill">
            <Ico size={14}>{icons.flame}</Ico>
            Open till 2 AM tonight in Bushwick
          </p>
          <h1 className="hbl-bg-h1">
            <span className="hbl-bg-h1-line">Smashed hot.</span>
            <span className="hbl-bg-h1-line">
              Served <RotatingText words={["loud.", "fast.", "messy.", "late."]} interval={2000} ariaPrefix="Served " className="hbl-bg-h1-rot" />
            </span>
          </h1>
          <p className="hbl-bg-lead">
            Fresh chuck and brisket smashed thin on a 450°F flat-top until the edges turn to lace. Order ahead and skip the line at three New York
            shops, or get it delivered in under 30 minutes.
          </p>
          <div className="hbl-bg-hero-ctas">
            <a href="#menu" className="hbl-bg-btn hbl-bg-btn-red hbl-bg-btn-lg">
              Start an order
              <Ico size={16}>{icons.arrow}</Ico>
            </a>
            <a href="#combos" className="hbl-bg-btn hbl-bg-btn-ghost hbl-bg-btn-lg">
              See combos from $15.95
            </a>
          </div>
          <dl className="hbl-bg-hero-stats">
            <div>
              <dt>Burgers smashed</dt>
              <dd>
                <CountUp to={1.2} decimals={1} suffix="M" duration={1.8} />
              </dd>
            </div>
            <div>
              <dt>Average rating</dt>
              <dd>
                <CountUp to={4.8} decimals={1} duration={1.6} />
                <span className="hbl-bg-star" aria-hidden="true">
                  <Ico size={16} stroke={0}>
                    <path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="currentColor" />
                  </Ico>
                </span>
              </dd>
            </div>
            <div>
              <dt>Minutes to pickup</dt>
              <dd>
                <CountUp to={9} duration={1.4} />
              </dd>
            </div>
          </dl>
        </div>
        <div className="hbl-bg-min0 hbl-bg-hero-visual">
          <div className="hbl-bg-stage">
            <svg viewBox="0 0 200 200" className="hbl-bg-badge" aria-hidden="true">
              <defs>
                <path id="hbl-bg-badge-path" d="M100 100 m-76 0 a76 76 0 1 1 152 0 a76 76 0 1 1 -152 0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="#ffc23d" />
              <text fontFamily="var(--font-grotesk)" fontSize="15" fontWeight="700" letterSpacing="3.2" fill="#0b0b0b">
                <textPath href="#hbl-bg-badge-path">SMASHED TO ORDER · NEVER FROZEN · SINCE 2016 ·</textPath>
              </text>
              <circle cx="100" cy="100" r="48" fill="#0b0b0b" />
              <text x="100" y="96" textAnchor="middle" fontFamily="var(--font-grotesk)" fontSize="24" fontWeight="700" fill="#ffc23d">
                $11.50
              </text>
              <text x="100" y="116" textAnchor="middle" fontFamily="var(--font-grotesk)" fontSize="11" fontWeight="700" letterSpacing="2" fill="#ffffff">
                DOUBLE
              </text>
            </svg>
            <div className="hbl-bg-plate" aria-hidden="true" />
            <FoodArt
              art={{ kind: "burger", patties: 2, cheese: "#ffb627", extra: "onion" }}
              live
              className="hbl-bg-hero-burger"
              label="A double smash burger with melted American cheese, pickles and onions on a sesame potato bun"
            />
            <div className="hbl-bg-fries-peek" aria-hidden="true">
              <FoodArt art={{ kind: "fries" }} />
            </div>
          </div>
          <QuickOrder />
        </div>
      </div>
    </section>
  );
}

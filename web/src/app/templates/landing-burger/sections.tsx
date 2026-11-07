import { Marquee } from "@/registry/hyperblur/marquee";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SpotlightCard, SpotlightGroup } from "@/registry/hyperblur/spotlight-card";
import { ReviewCard } from "@/registry/hyperblur/review-card";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { CountUp } from "@/registry/hyperblur/count-up";
import { FoodArt } from "./art";
import { combos, money, reviews } from "./data";
import { AddButton } from "./order";
import { TagPill } from "./menu";
import { Ico, icons } from "./icons";

const specials = [
  ["Smash Double", "$11.50"],
  ["Red Devil", "New"],
  ["Nashville Hot", "$11.75"],
  ["Smash Fries", "$6.50"],
  ["Black & White Shake", "$6.75"],
  ["Late night", "Fri & Sat till 2 AM"],
  ["Crew Box", "Feeds 4 for $39"],
];

export function Ticker() {
  return (
    <div className="hbl-bg-ticker" aria-label="Today's specials">
      <Marquee speed={1.1} gap={0} pauseOnHover fade={false}>
        {specials.map(([name, value]) => (
          <span key={name} className="hbl-bg-ticker-item">
            <span className="hbl-bg-ticker-name">{name}</span>
            <span className="hbl-bg-ticker-val">{value}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M12 2l2.4 6.6L21 9l-5.2 4.4L17.6 20 12 16.4 6.4 20l1.8-6.6L3 9l6.6-.4z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

const trust = [
  { value: 0, text: "2016", label: "Smashing since", suffix: "" },
  { value: 3, text: "", label: "Shops in NYC", suffix: "" },
  { value: 1840, text: "", label: "Five-star reviews", suffix: "+" },
  { value: 24, text: "", label: "Avg. delivery minutes", suffix: "" },
];

export function Trust() {
  return (
    <section className="hbl-bg-trust" aria-label="Smash & Co. in numbers">
      <div className="hbl-bg-wrap hbl-bg-trust-row">
        {trust.map((t) => (
          <div key={t.label} className="hbl-bg-trust-item">
            <p className="hbl-bg-trust-n">
              {t.text || <CountUp to={t.value} suffix={t.suffix} />}
            </p>
            <p className="hbl-bg-trust-l">{t.label}</p>
          </div>
        ))}
        <div className="hbl-bg-trust-item hbl-bg-trust-press">
          <p className="hbl-bg-trust-l">As seen in</p>
          <p className="hbl-bg-press">Grill Report · Brooklyn Bites · Late Night NYC</p>
        </div>
      </div>
    </section>
  );
}

export function Combos() {
  return (
    <section id="combos" className="hbl-bg-section hbl-bg-combos">
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-head hbl-bg-head-center">
          <p className="hbl-bg-kicker">Combos</p>
          <h2 className="hbl-bg-h2">More food. Less math.</h2>
          <p className="hbl-bg-sub">Every combo is cheaper than ordering the same things one by one. We did the adding up so you don&apos;t have to.</p>
        </div>
        <SpotlightGroup className="hbl-bg-combo-grid">
          {combos.map((c, i) => (
            <FadeInView key={c.id} delay={i * 0.08} distance={24} className="hbl-bg-min0">
              <SpotlightCard color={i === 1 ? "#ff3b2f" : "#ffc23d"} radius={22} className="hbl-bg-combo" data-featured={i === 0}>
                <div className="hbl-bg-combo-inner">
                  <div className="hbl-bg-combo-top">
                    <span className="hbl-bg-save">Save {money(c.separate - c.price)}</span>
                    <span className="hbl-bg-serves">{c.serves}</span>
                  </div>
                  <div className="hbl-bg-combo-art">
                    <FoodArt art={c.art} />
                  </div>
                  <div className="hbl-bg-tags">
                    {c.tags.map((t) => (
                      <TagPill key={t} tag={t} />
                    ))}
                  </div>
                  <h3 className="hbl-bg-combo-name">{c.name}</h3>
                  <p className="hbl-bg-combo-desc">{c.desc}</p>
                  <ul className="hbl-bg-combo-list">
                    {c.includes.map((inc) => (
                      <li key={inc}>
                        <Ico size={14} stroke={2.4}>{icons.check}</Ico>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="hbl-bg-combo-foot">
                    <p className="hbl-bg-combo-price">
                      <span className="hbl-bg-price hbl-bg-price-lg">{money(c.price)}</span>
                      <s className="hbl-bg-strike">{money(c.separate)}</s>
                    </p>
                    <AddButton id={c.id} name={c.name} label="Add combo" />
                  </div>
                </div>
              </SpotlightCard>
            </FadeInView>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    title: "Order your way",
    text: "On this page, at the counter, or by phone. Pick a pickup slot or send it to your door.",
    time: "1 min",
    icon: icons.phoneApp,
  },
  {
    n: "02",
    title: "We smash it",
    text: "Fresh 3 oz balls hit a 450°F flat-top, get pressed flat and flipped once the crust goes lacy.",
    time: "3 min",
    icon: icons.flame,
  },
  {
    n: "03",
    title: "Pickup or delivery",
    text: "Grab your bag from the shelf by the door, or our own couriers ride it over in insulated bags.",
    time: "8 to 25 min",
    icon: icons.scooter,
  },
];

export function HowItWorks() {
  return (
    <section className="hbl-bg-section hbl-bg-how" aria-labelledby="hbl-bg-how-title">
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-head hbl-bg-head-split">
          <div className="hbl-bg-min0">
            <p className="hbl-bg-kicker">How it works</p>
            <h2 id="hbl-bg-how-title" className="hbl-bg-h2">
              Order. Cook. Eat.
            </h2>
          </div>
          <p className="hbl-bg-sub">From tap to tray in about nine minutes on a normal day. On Friday nights, order ahead and walk past the line.</p>
        </div>
        <ol className="hbl-bg-steps">
          {steps.map((s, i) => (
            <li key={s.n} className="hbl-bg-min0">
              <FadeInView delay={i * 0.12} distance={24} className="hbl-bg-step">
                <div className="hbl-bg-step-top">
                  <span className="hbl-bg-step-icon">
                    <Ico size={22}>{s.icon}</Ico>
                  </span>
                  <span className="hbl-bg-step-n" aria-hidden="true">
                    {s.n}
                  </span>
                </div>
                <h3 className="hbl-bg-h3">{s.title}</h3>
                <p className="hbl-bg-muted">{s.text}</p>
                <div className="hbl-bg-step-bar" aria-hidden="true">
                  <span style={{ animationDelay: `${(i * 0.9).toFixed(1)}s` }} />
                </div>
                <p className="hbl-bg-step-time">
                  <Ico size={14}>{icons.clock}</Ico>
                  {s.time}
                </p>
              </FadeInView>
            </li>
          ))}
        </ol>
        <div className="hbl-bg-how-cta">
          <p className="hbl-bg-min0">
            Friday night line out the door? <span>Order ahead and walk straight to the pickup shelf.</span>
          </p>
          <a href="#menu" className="hbl-bg-btn hbl-bg-btn-red">
            Order ahead
            <Ico size={16}>{icons.arrow}</Ico>
          </a>
        </div>
      </div>
    </section>
  );
}

const people = [
  { name: "Danielle Okafor", color: "#ff3b2f" },
  { name: "Marcus Bell", color: "#ffc23d" },
  { name: "Priya Raman", color: "#f28da0" },
  { name: "Tom Alvarez", color: "#5fb34a" },
  { name: "Kenji Sato", color: "#7fb3ff" },
];

const dist = [
  [5, 86],
  [4, 10],
  [3, 3],
  [2, 1],
  [1, 0],
];

const press = [
  "“The crust on these patties should be studied.” Grill Report",
  "“Brooklyn’s best late-night burger, no contest.” Brooklyn Bites",
  "“Red Devil is the spiciest thing we ate all summer.” Late Night NYC",
  "“Nine minutes, door to bag. We timed it.” The Lunch Line",
];

export function Reviews() {
  return (
    <section id="reviews" className="hbl-bg-section hbl-bg-reviews">
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-reviews-grid">
          <FadeInView className="hbl-bg-min0" distance={20}>
            <div className="hbl-bg-score">
              <p className="hbl-bg-kicker">Reviews</p>
              <h2 className="hbl-bg-h2">Loud, greasy, five stars.</h2>
              <div className="hbl-bg-score-row">
                <p className="hbl-bg-score-n">
                  <CountUp to={4.8} decimals={1} duration={1.6} />
                </p>
                <div>
                  <StarRating value={4.5} precision={0.5} readOnly size={22} color="#ffc23d" aria-label="Rated 4.8 out of 5" />
                  <p className="hbl-bg-muted hbl-bg-small">from 2,140 reviews across 3 shops</p>
                </div>
              </div>
              <ul className="hbl-bg-dist" aria-label="Rating distribution">
                {dist.map(([stars, pct]) => (
                  <li key={stars}>
                    <span>{stars}</span>
                    <span className="hbl-bg-dist-bar">
                      <span style={{ width: `${pct}%` }} />
                    </span>
                    <span>{pct}%</span>
                  </li>
                ))}
              </ul>
              <div className="hbl-bg-score-people">
                <AvatarStack people={people} size={34} ring="#0b0b0b" />
                <p className="hbl-bg-small hbl-bg-muted">Regulars who ordered this month</p>
              </div>
            </div>
          </FadeInView>
          <div className="hbl-bg-review-list">
            {reviews.map((r, i) => (
              <FadeInView key={r.name} delay={i * 0.08} distance={20} className="hbl-bg-min0">
                <ReviewCard rating={r.rating} name={r.name} date={r.date} title={r.title} text={r.text} verified helpful={r.helpful} lines={4} className="hbl-bg-review" />
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
      <div className="hbl-bg-press-band">
        <Marquee speed={0.7} direction="right" gap={56}>
          {press.map((p) => (
            <span key={p} className="hbl-bg-press-item">
              {p}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

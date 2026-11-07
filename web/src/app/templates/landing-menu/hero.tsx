import { SplitText } from "@/registry/hyperblur/split-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { CountUp } from "@/registry/hyperblur/count-up";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { Marquee } from "@/registry/hyperblur/marquee";
import { DishArt, HeroTable } from "./art";
import { Ico, LogoMark, icons } from "./icons";
import { phone } from "./data";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Specials", href: "#specials" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

const quick = [
  { id: "lunch", label: "Lunch", note: "11:30 to 3" },
  { id: "dinner", label: "Dinner", note: "5:30 to 10" },
  { id: "drinks", label: "Drinks", note: "All day" },
  { id: "kids", label: "Kids", note: "Under 12" },
];

const market = [
  "Delicata squash, Oak Row Farm",
  "Line-caught halibut, Newport",
  "Chanterelles, Coast Range foragers",
  "Little Loaf sourdough, baked at 4 AM",
  "Heirloom tomatoes, Sauvie Island",
  "Field Theory coffee, roasted Tuesday",
  "Hazelnuts, Willamette Valley",
];

export function Nav() {
  return (
    <header className="hbl-mn-nav">
      <a href="#top" className="hbl-mn-brand" aria-label="Verde home">
        <LogoMark />
        <span>Verde</span>
      </a>
      <nav aria-label="Verde" className="hbl-mn-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="hbl-mn-nav-end">
        <a href={phone.href} className="hbl-mn-phone">
          <Ico size={15}>{icons.phone}</Ico>
          <span>{phone.label}</span>
        </a>
        <a href="#reserve" className="hbl-mn-btn hbl-mn-btn-primary hbl-mn-btn-sm">
          Reserve
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="hbl-mn-hero">
      <div className="hbl-mn-hero-wash" aria-hidden="true" />
      <div className="hbl-mn-wrap hbl-mn-hero-grid">
        <div className="hbl-mn-min0">
          <FadeInView distance={10}>
            <p className="hbl-mn-eyebrow">
              <span className="hbl-mn-dot" aria-hidden="true" />
              Open now · Lunch until 3:00 PM
            </p>
          </FadeInView>
          <h1 className="hbl-mn-h1">
            <SplitText className="hbl-mn-h1-line" text="Cooked from the garden," by="words" stagger={0.07} trigger="mount" />
            <SplitText
              className="hbl-mn-h1-line hbl-mn-h1-accent"
              text="served all day."
              by="words"
              stagger={0.07}
              trigger="mount"
              duration={0.7}
            />
          </h1>
          <FadeInView delay={0.18} distance={12}>
            <p className="hbl-mn-lede">
              The full Verde menu, updated every morning. Seasonal plates from eleven Oregon farms, natural wine and a
              kids menu, in Portland&apos;s West End since 2014.
            </p>
          </FadeInView>
          <FadeInView delay={0.26} distance={12}>
            <div className="hbl-mn-hero-ctas">
              <Magnetic strength={0.22}>
                <a href="#menu" className="hbl-mn-btn hbl-mn-btn-primary hbl-mn-btn-lg">
                  Browse the menu
                  <Ico size={17} stroke={2}>{icons.down}</Ico>
                </a>
              </Magnetic>
              <a href="#reserve" className="hbl-mn-btn hbl-mn-btn-ghost hbl-mn-btn-lg">
                Reserve a table
              </a>
            </div>
          </FadeInView>
          <FadeInView delay={0.34} distance={10}>
            <ul className="hbl-mn-quick" aria-label="Jump to a menu">
              {quick.map((q) => (
                <li key={q.id}>
                  <a href={`#${q.id}`} className="hbl-mn-quick-a">
                    <b>{q.label}</b>
                    <span>{q.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeInView>
        </div>

        <div className="hbl-mn-hero-side">
          <HeroTable />
          <div className="hbl-mn-now">
            <div className="hbl-mn-now-head">
              <span className="hbl-mn-now-kicker">Now serving</span>
              <span className="hbl-mn-now-live">
                <span className="hbl-mn-dot" aria-hidden="true" />
                Lunch
              </span>
            </div>
            <div className="hbl-mn-now-item">
              <DishArt kind="veg" tint="#dfe8d3" uid="now" />
              <div className="hbl-mn-min0">
                <p className="hbl-mn-now-name">Charred broccolini</p>
                <p className="hbl-mn-now-sub">Chef&apos;s pick today · $14</p>
              </div>
            </div>
            <div className="hbl-mn-now-bar" aria-hidden="true">
              <span />
            </div>
            <p className="hbl-mn-now-foot">Kitchen at 72% · about 14 min per plate</p>
          </div>
        </div>
      </div>

      <div className="hbl-mn-wrap">
        <FadeInView delay={0.2} distance={12}>
          <dl className="hbl-mn-trust">
            <div>
              <dt>Guest rating</dt>
              <dd>
                <StarRating value={4.7} precision={0.5} readOnly size={16} color="#d9482b" aria-label="Rated 4.7 out of 5" />
                <b>4.7</b>
                <span>2,318 reviews</span>
              </dd>
            </div>
            <div>
              <dt>Farms we buy from</dt>
              <dd>
                <b className="hbl-mn-trust-n">
                  <CountUp to={11} duration={1.4} />
                </b>
                <span>within 90 miles</span>
              </dd>
            </div>
            <div>
              <dt>Plates on today&apos;s menu</dt>
              <dd>
                <b className="hbl-mn-trust-n">
                  <CountUp to={24} duration={1.6} />
                </b>
                <span>lunch and dinner</span>
              </dd>
            </div>
            <div>
              <dt>Cooking in the West End</dt>
              <dd>
                <b className="hbl-mn-trust-n">
                  <CountUp to={12} duration={1.4} suffix=" yrs" />
                </b>
                <span>since 2014</span>
              </dd>
            </div>
          </dl>
        </FadeInView>
      </div>
    </section>
  );
}

export function MarketBand() {
  return (
    <div className="hbl-mn-market" role="region" aria-label="This week from the market">
      <span className="hbl-mn-market-label">This week</span>
      <Marquee speed={38} gap={0} pauseOnHover fade className="hbl-mn-market-track">
        {market.map((m) => (
          <span key={m} className="hbl-mn-market-item">
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 10C2 5 5 2 10 2c0 5-3 8-8 8z" fill="currentColor" />
            </svg>
            {m}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

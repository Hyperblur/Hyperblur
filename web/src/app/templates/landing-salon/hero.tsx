import { BlurText } from "@/registry/hyperblur/blur-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { Marquee } from "@/registry/hyperblur/marquee";
import { CountUp } from "@/registry/hyperblur/count-up";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { HeroArt } from "./art";
import { BookingCard } from "./booking";
import { phone } from "./data";
import { Ico, LogoMark, icons } from "./icons";

const links = [
  { label: "Services", href: "#services" },
  { label: "Stylists", href: "#stylists" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Visit", href: "#visit" },
];

const guests = [
  { name: "Priya Raman", color: "#d9577a" },
  { name: "Owen Brooks", color: "#3b1f2b" },
  { name: "Sofia Lind", color: "#b88a4a" },
  { name: "Dev Patel", color: "#7d6e70" },
];

export function Nav() {
  return (
    <header className="hbl-sl-nav">
      <a href="#top" className="hbl-sl-brand" aria-label="Maison Rue home">
        <LogoMark />
        <span>Maison Rue</span>
      </a>
      <nav aria-label="Maison Rue" className="hbl-sl-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="hbl-sl-nav-right">
        <a href="tel:+17185550142" className="hbl-sl-phone">
          <Ico size={15}>{icons.phone}</Ico>
          {phone}
        </a>
        <a href="#book" className="hbl-sl-btn hbl-sl-btn-primary hbl-sl-btn-sm">
          Book a chair
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="hbl-sl-hero">
      <div className="hbl-sl-blob hbl-sl-blob-1" aria-hidden="true" />
      <div className="hbl-sl-blob hbl-sl-blob-2" aria-hidden="true" />
      <div className="hbl-sl-blob hbl-sl-blob-3" aria-hidden="true" />
      <div className="hbl-sl-wrap hbl-sl-hero-grid">
        <div className="hbl-sl-hero-copy">
          <FadeInView distance={12}>
            <p className="hbl-sl-kicker">
              <span className="hbl-sl-kicker-dot" aria-hidden="true" />
              Hair salon &amp; barbershop · Carroll Gardens, Brooklyn
            </p>
          </FadeInView>
          <h1 className="hbl-sl-h1">
            <span className="hbl-sl-sr">Cut, colour and a little drama.</span>
            <span aria-hidden="true">
              <BlurText text="Cut, colour" by="words" trigger="mount" blur={14} stagger={0.12} duration={0.9} className="hbl-sl-h1-line" />
              <BlurText
                text="and a little drama."
                by="words"
                trigger="mount"
                blur={14}
                stagger={0.12}
                duration={0.9}
                className="hbl-sl-h1-line hbl-sl-h1-em"
              />
            </span>
          </h1>
          <FadeInView delay={0.35} distance={14}>
            <p className="hbl-sl-lede">
              Eight chairs, four colour specialists and a grooming bar that pours espresso until close. Walk in looking
              like Tuesday, walk out looking like the cover.
            </p>
          </FadeInView>
          <FadeInView delay={0.45} distance={14}>
            <div className="hbl-sl-hero-ctas">
              <Magnetic strength={0.35} radius={120}>
                <a href="#book" className="hbl-sl-btn hbl-sl-btn-primary hbl-sl-btn-lg">
                  Book a chair
                  <Ico size={17} stroke={2}>{icons.arrow}</Ico>
                </a>
              </Magnetic>
              <a href="#services" className="hbl-sl-btn hbl-sl-btn-ghost hbl-sl-btn-lg">
                See the menu
              </a>
            </div>
          </FadeInView>
          <FadeInView delay={0.55} distance={14}>
            <div className="hbl-sl-hero-proof">
              <AvatarStack people={guests} size={34} ring="#f4e4df" extra={2388} />
              <div>
                <div className="hbl-sl-proof-stars">
                  <StarRating value={5} readOnly size={15} color="#b88a4a" />
                  <strong>4.9</strong>
                </div>
                <p>2,400+ reviews from regulars</p>
              </div>
            </div>
          </FadeInView>
        </div>
        <div className="hbl-sl-hero-visual">
          <div className="hbl-sl-hero-art">
            <HeroArt />
          </div>
          <FadeInView delay={0.25} distance={24} className="hbl-sl-hero-book">
            <BookingCard />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

const trust = [
  { to: 4.9, decimals: 1, suffix: "", label: "Average rating, 2,400+ reviews" },
  { to: 12, decimals: 0, suffix: " yrs", label: "On Court Street since 2014" },
  { to: 38000, decimals: 0, suffix: "+", label: "Chairs booked and counting" },
  { to: 8, decimals: 0, suffix: "", label: "Chairs, plus a two-seat grooming bar" },
];

export function TrustStrip() {
  return (
    <section className="hbl-sl-trust" aria-label="Maison Rue in numbers">
      <div className="hbl-sl-wrap hbl-sl-trust-grid">
        {trust.map((t) => (
          <div key={t.label} className="hbl-sl-trust-item">
            <span className="hbl-sl-trust-num">
              <CountUp to={t.to} decimals={t.decimals} suffix={t.suffix} duration={1.8} />
            </span>
            <span className="hbl-sl-trust-label">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="hbl-sl-wrap">
        <p className="hbl-sl-press">
          <span>As seen in</span>
          <em>Brooklyn Style Weekly</em>
          <em>The Salon Review</em>
          <em>Borough Mag</em>
          <em>Best Barber, Court St. Awards 2025</em>
        </p>
      </div>
    </section>
  );
}

const marqueeWords = [
  "Signature cuts",
  "Hand-painted balayage",
  "Skin fades",
  "Gloss & tone",
  "Silk press",
  "Beard sculpting",
  "Vivid colour",
  "Hot towel shaves",
  "Bond repair",
  "Curl hydration",
];

export function ServiceMarquee() {
  return (
    <section className="hbl-sl-marquee" aria-label="Services we offer">
      <Marquee speed={0.7} gap={0} fade={false}>
        {marqueeWords.map((w) => (
          <span key={w} className="hbl-sl-mq-item">
            {w}
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="hbl-sl-mq-star">
              <path d="M12 2 14 10l8 2-8 2-2 8-2-8-8-2 8-2Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

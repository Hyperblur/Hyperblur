import { RotatingText } from "@/registry/hyperblur/rotating-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { HeroArt } from "./art";
import { ReservationCard } from "./reservation";
import { Ico, LogoMark, icons } from "./icons";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "The room", href: "#room" },
  { label: "Events", href: "#events" },
  { label: "Visit", href: "#visit" },
];

const guests = [
  { name: "Marisol Ortega", color: "#c8553d" },
  { name: "Daniel Okafor", color: "#6b7a3a" },
  { name: "Hana Sato", color: "#e7a93b" },
  { name: "Theo Laurent", color: "#1d1a17" },
  { name: "Priya Raman", color: "#9a4a33" },
];

export function Nav() {
  return (
    <header className="hbl-rs-nav">
      <a href="#top" className="hbl-rs-brand" aria-label="Ember & Olive home">
        <LogoMark />
        <span>
          Ember <em>&amp;</em> Olive
        </span>
      </a>
      <nav aria-label="Ember & Olive" className="hbl-rs-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="hbl-rs-nav-end">
        <a href="tel:+14155550142" className="hbl-rs-phone">
          <Ico size={15}>{icons.phone}</Ico>
          <span className="hbl-rs-mono">(415) 555-0142</span>
        </a>
        <a href="#reserve" className="hbl-rs-btn hbl-rs-btn-primary hbl-rs-btn-sm">
          Reserve a table
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="hbl-rs-hero">
      <div className="hbl-rs-hero-wash" aria-hidden="true" />
      <div className="hbl-rs-hero-grid">
        <div className="hbl-rs-hero-copy">
          <FadeInView distance={12}>
            <p className="hbl-rs-eyebrow">
              <span className="hbl-rs-dot" aria-hidden="true" />
              Wood-fire kitchen · Hayes Valley, San Francisco
            </p>
          </FadeInView>
          <h1 className="hbl-rs-h1">
            <span className="hbl-rs-h1-line">Fire, olive oil</span>
            <span className="hbl-rs-h1-line">
              &amp;{" "}
              <em className="hbl-rs-rot">
                <RotatingText
                  words={["a long table.", "natural wine.", "slow evenings.", "good company."]}
                  interval={2600}
                  stagger={0.03}
                />
              </em>
            </span>
          </h1>
          <FadeInView delay={0.12} distance={14}>
            <p className="hbl-rs-lede">
              Sixty seats around an open oak hearth. Chef Leila Haddad cooks the coast of the Mediterranean over live fire,
              with vegetables from farms within 120 miles and a cellar of 212 low-intervention wines.
            </p>
          </FadeInView>
          <FadeInView delay={0.22} distance={14}>
            <div className="hbl-rs-hero-ctas">
              <Magnetic strength={0.25}>
                <a href="#reserve" className="hbl-rs-btn hbl-rs-btn-primary hbl-rs-btn-lg">
                  Reserve a table
                  <Ico size={17} stroke={2}>{icons.arrow}</Ico>
                </a>
              </Magnetic>
              <a href="#menu" className="hbl-rs-btn hbl-rs-btn-ghost hbl-rs-btn-lg">
                See tonight&apos;s menu
              </a>
            </div>
          </FadeInView>
          <FadeInView delay={0.32} distance={10}>
            <div className="hbl-rs-proof">
              <AvatarStack people={guests} size={32} ring="#f6efe3" max={5} />
              <div className="hbl-rs-proof-t">
                <span className="hbl-rs-proof-stars">
                  <StarRating value={4.8} precision={0.5} readOnly size={15} color="#e7a93b" aria-label="Rated 4.8 out of 5" />
                  <b>4.8</b>
                </span>
                <small>From 1,284 guest reviews</small>
              </div>
              <div className="hbl-rs-proof-hours">
                <Ico size={15}>{icons.clock}</Ico>
                <span>
                  <b>Open tonight</b>
                  <small className="hbl-rs-mono">5:00 PM to 10:00 PM</small>
                </span>
              </div>
            </div>
          </FadeInView>
        </div>
        <div className="hbl-rs-hero-side">
          <HeroArt />
          <div className="hbl-rs-res-slot">
            <ReservationCard />
          </div>
        </div>
      </div>
    </section>
  );
}

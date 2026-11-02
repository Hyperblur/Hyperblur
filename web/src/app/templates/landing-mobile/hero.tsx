import { RotatingText } from "@/registry/hyperblur/rotating-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { Drift } from "./drift";
import { Ico, LogoMark, StoreBadge, icons } from "./icons";
import { CommunityScreen, IdentifyScreen, Phone, TodayScreen } from "./phone";

const links = [
  { label: "Features", href: "#features" },
  { label: "Plants", href: "#plants" },
  { label: "Community", href: "#community" },
  { label: "Pricing", href: "#pricing" },
];

export const people = [
  { name: "Ines Alves", color: "#e07a5f" },
  { name: "Tomas Reyes", color: "#14532d" },
  { name: "Mei Chen", color: "#65a30d" },
  { name: "Kofi Mensah", color: "#b45309" },
  { name: "Lena Vogel", color: "#0f766e" },
];

export function Nav() {
  return (
    <header className="hbl-mb-nav">
      <a href="#top" className="hbl-mb-brand" aria-label="Fernly home">
        <LogoMark />
        <span>Fernly</span>
      </a>
      <nav aria-label="Fernly" className="hbl-mb-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#download" className="hbl-mb-pill">
        Get the app
        <Ico size={15} stroke={2}>{icons.arrow}</Ico>
      </a>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="hbl-mb-hero">
      <div className="hbl-mb-blob hbl-mb-blob-1" aria-hidden="true" />
      <div className="hbl-mb-blob hbl-mb-blob-2" aria-hidden="true" />
      <div className="hbl-mb-blob hbl-mb-blob-3" aria-hidden="true" />
      <div className="hbl-mb-hero-copy">
        <FadeInView distance={14}>
          <a href="#features" className="hbl-mb-announce">
            <span className="hbl-mb-announce-tag">New</span>
            Vacation mode: a friend waters, Fernly reminds them
            <Ico size={14} stroke={2}>{icons.arrow}</Ico>
          </a>
        </FadeInView>
        <h1 className="hbl-mb-h1">
          <span className="hbl-mb-h1-line">Little nudges,</span>
          <span className="hbl-mb-h1-line">
            <span className="hbl-mb-rot">
              <RotatingText words={["thriving", "happier", "greener", "blooming"]} interval={2400} stagger={0.035} />
            </span>{" "}
            plants.
          </span>
        </h1>
        <FadeInView delay={0.15} distance={16}>
          <p className="hbl-mb-lede">
            Fernly tells you when to water, names that mystery leaf in two seconds, and cheers every day you show up.
            Gentle with beginners, beloved by people with 60 pots on one windowsill.
          </p>
        </FadeInView>
        <FadeInView delay={0.25} distance={16}>
          <div className="hbl-mb-badges">
            <StoreBadge kind="a" />
            <StoreBadge kind="b" />
          </div>
        </FadeInView>
        <FadeInView delay={0.35} distance={12}>
          <div className="hbl-mb-proofline">
            <AvatarStack people={people} size={30} ring="#f7f5ef" max={5} />
            <span className="hbl-mb-proof-t">
              <span className="hbl-mb-proof-stars">
                <StarRating value={4.9} precision={0.5} readOnly size={15} color="#e07a5f" aria-label="Rated 4.9 out of 5" />
                <b>4.9</b>
              </span>
              <small>Loved by 2.4M plant parents</small>
            </span>
          </div>
        </FadeInView>
      </div>

      <div className="hbl-mb-stage">
        <div className="hbl-mb-slot hbl-mb-slot-l">
          <Drift depth={0.08}>
            <div className="hbl-mb-float" style={{ animationDelay: "-2.4s" }}>
              <div className="hbl-mb-tilt-l">
                <Phone label="Plant identification screen" dark>
                  <IdentifyScreen />
                </Phone>
              </div>
            </div>
          </Drift>
        </div>
        <div className="hbl-mb-slot hbl-mb-slot-r">
          <Drift depth={0.08}>
            <div className="hbl-mb-float" style={{ animationDelay: "-4.6s" }}>
              <div className="hbl-mb-tilt-r">
                <Phone label="Community feed screen">
                  <CommunityScreen />
                </Phone>
              </div>
            </div>
          </Drift>
        </div>
        <div className="hbl-mb-slot hbl-mb-slot-c">
          <Drift depth={0.03}>
            <div className="hbl-mb-float">
              <Phone label="Today screen with care tasks">
                <TodayScreen />
              </Phone>
            </div>
          </Drift>
        </div>
        <Drift depth={0.14} className="hbl-mb-chip-wrap hbl-mb-chip-a">
          <div className="hbl-mb-chip">
            <span className="hbl-mb-chip-ic" style={{ background: "#bef264" }}>
              <Ico size={16}>{icons.drop}</Ico>
            </span>
            <span>
              <b>Monstera watered</b>
              <small>Next drink on Friday</small>
            </span>
          </div>
        </Drift>
        <Drift depth={0.18} className="hbl-mb-chip-wrap hbl-mb-chip-b">
          <div className="hbl-mb-chip">
            <span className="hbl-mb-chip-ic" style={{ background: "#e07a5f", color: "#fff" }}>
              <Ico size={16}>{icons.flame}</Ico>
            </span>
            <span>
              <b>42 day streak</b>
              <small>Top 3% this month</small>
            </span>
          </div>
        </Drift>
      </div>
    </section>
  );
}

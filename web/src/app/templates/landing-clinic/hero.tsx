import { SplitText } from "@/registry/hyperblur/split-text";
import { BlurText } from "@/registry/hyperblur/blur-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { CountUp } from "@/registry/hyperblur/count-up";
import { Marquee } from "@/registry/hyperblur/marquee";
import { BookingCard } from "./booking";
import { Ico, LogoMark, icons } from "./icons";

const links = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Plans", href: "#plans" },
  { label: "Visit us", href: "#visit" },
];

const patients = [
  { name: "Nadia Haddad", color: "#1fb5a6" },
  { name: "Owen Park", color: "#0f3b3a" },
  { name: "Rosa Ibarra", color: "#ff7a6b" },
  { name: "Jonah Weiss", color: "#3c8f86" },
  { name: "Keiko Sato", color: "#c2604f" },
];

export function Nav() {
  return (
    <header className="hbl-cl-nav hbl-cl-wrap">
      <a href="#top" className="hbl-cl-brand" aria-label="Halcyon Dental home">
        <LogoMark />
        <span>
          Halcyon <em>Dental</em>
        </span>
      </a>
      <nav aria-label="Halcyon Dental" className="hbl-cl-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="hbl-cl-nav-end">
        <a href="tel:+14155550142" className="hbl-cl-nav-phone">
          <Ico size={16}>{icons.phone}</Ico>
          (415) 555-0142
        </a>
        <a href="#book" className="hbl-cl-btn hbl-cl-btn-coral hbl-cl-btn-sm">
          Book a visit
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="hbl-cl-hero">
      <div className="hbl-cl-wrap hbl-cl-hero-grid">
        <div className="hbl-cl-hero-copy">
          <FadeInView distance={12}>
            <p className="hbl-cl-eyebrow">
              <span className="hbl-cl-eyebrow-dot" aria-hidden="true" />
              Family &amp; cosmetic dentistry in Bellmont Heights
            </p>
          </FadeInView>
          <h1 className="hbl-cl-h1">
            <SplitText text="Unhurried dentistry" by="chars" stagger={0.025} trigger="mount" className="hbl-cl-h1-line" />
            <BlurText text="for every smile at home." trigger="mount" stagger={0.09} className="hbl-cl-h1-soft" />
          </h1>
          <FadeInView delay={0.35} distance={14}>
            <p className="hbl-cl-lede">
              Gentle check-ups, whitening, clear aligners and implants under one calm roof on Larkspur Avenue. Longer
              appointments, honest prices on screen before we start, and same-day help when something hurts.
            </p>
          </FadeInView>
          <FadeInView delay={0.5} distance={14}>
            <div className="hbl-cl-hero-ctas">
              <a href="#book" className="hbl-cl-btn hbl-cl-btn-coral">
                Book a visit
                <Ico size={16} stroke={2.2}>{icons.arrow}</Ico>
              </a>
              <a href="tel:+14155550142" className="hbl-cl-btn hbl-cl-btn-ghost">
                <Ico size={16}>{icons.phone}</Ico>
                Call (415) 555-0142
              </a>
            </div>
          </FadeInView>
          <FadeInView delay={0.65} distance={10}>
            <div className="hbl-cl-hero-proof">
              <AvatarStack people={patients} size={36} ring="#fbfdfc" extra={1235} />
              <div>
                <div className="hbl-cl-hero-stars">
                  <StarRating value={4.9} precision={0.5} readOnly size={16} color="#ff7a6b" />
                  <b>4.9</b>
                </div>
                <p>from 1,240 Google reviews</p>
              </div>
            </div>
          </FadeInView>
        </div>

        <div id="book" className="hbl-cl-hero-art">
          <div className="hbl-cl-blob hbl-cl-blob-a" aria-hidden="true" />
          <div className="hbl-cl-blob hbl-cl-blob-b" aria-hidden="true" />
          <div className="hbl-cl-blob hbl-cl-blob-c" aria-hidden="true" />
          <svg className="hbl-cl-hero-lines" viewBox="0 0 520 560" aria-hidden="true">
            <path d="M40 470C120 380 90 300 180 250s210-10 260-110" />
            <path d="M20 520C130 430 120 350 210 300s200-20 280-120" />
            <circle cx="440" cy="140" r="5" />
            <circle cx="180" cy="250" r="3.5" />
          </svg>
          <div className="hbl-cl-chip hbl-cl-chip-next">
            <span className="hbl-cl-chip-pulse" aria-hidden="true" />
            <span>
              <b>Next available today</b>
              <small>2:40 pm with Dr. Okafor</small>
            </span>
          </div>
          <div className="hbl-cl-chip hbl-cl-chip-calm" aria-hidden="true">
            <span className="hbl-cl-chip-ico">
              <Ico size={16}>{icons.heart}</Ico>
            </span>
            <span>
              <b>Anxious? Say so.</b>
              <small>Noise-cancelling headphones, weighted blanket</small>
            </span>
          </div>
          <FadeInView delay={0.2} distance={24} className="hbl-cl-book-slot">
            <BookingCard />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

const insurers = [
  "Bluewater Health",
  "Cascade Dental Plan",
  "Northwell Mutual",
  "Harborline",
  "Evergreen PPO",
  "Summit Benefits",
  "Juniper Life",
  "Keystone Care",
];

function InsurerMark({ i }: { i: number }) {
  const shapes = [
    <circle key="a" cx="10" cy="10" r="7" />,
    <rect key="b" x="3" y="3" width="14" height="14" rx="4" />,
    <path key="c" d="M10 3l7 7-7 7-7-7 7-7Z" />,
    <path key="d" d="M3 14c3-7 11-7 14 0" />,
  ];
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {shapes[i % shapes.length]}
    </svg>
  );
}

export function Trust() {
  return (
    <section className="hbl-cl-trust" aria-label="Why families trust Halcyon">
      <div className="hbl-cl-wrap">
        <div className="hbl-cl-stats">
          <div className="hbl-cl-stat">
            <b>
              <CountUp to={4.9} decimals={1} duration={1.4} />
              <span className="hbl-cl-stat-star" aria-hidden="true">
                <Ico size={22} stroke={0}>
                  <path fill="currentColor" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />
                </Ico>
              </span>
            </b>
            <span>Average across 1,240 reviews</span>
          </div>
          <div className="hbl-cl-stat">
            <b>
              <CountUp to={12000} suffix="+" duration={1.8} />
            </b>
            <span>Smiles cared for since 2008</span>
          </div>
          <div className="hbl-cl-stat">
            <b>
              <CountUp to={18} duration={1.2} />
              <small> yrs</small>
            </b>
            <span>On Larkspur Avenue</span>
          </div>
          <div className="hbl-cl-stat">
            <b>
              <CountUp to={92} suffix="%" duration={1.5} />
            </b>
            <span>Of emergencies seen the same day</span>
          </div>
        </div>
        <div className="hbl-cl-insure">
          <p className="hbl-cl-insure-label">In network with</p>
          <Marquee speed={0.6} gap={56} pauseOnHover fade className="hbl-cl-insure-row">
            {insurers.map((name, i) => (
              <span key={name} className="hbl-cl-insurer" data-v={i % 3}>
                <InsurerMark i={i} />
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

import { Accordion } from "@/registry/hyperblur/accordion";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SplitText } from "@/registry/hyperblur/split-text";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { ConfettiButton } from "@/registry/hyperblur/confetti-button";
import { SectionHead } from "./features";
import { Ico, LogoMark, PlantArt, StoreBadge, icons } from "./icons";

const plans = [
  {
    name: "Seedling",
    price: "$0",
    cadence: "free forever",
    blurb: "For your first few pots and a curious mind.",
    cta: "Download free",
    features: ["Up to 5 plants", "Daily nudges", "3 plant IDs a month", "Community access"],
  },
  {
    name: "Fernly Plus",
    price: "$3.99",
    cadence: "per month, or $29.99 a year",
    blurb: "For the windowsill that keeps quietly expanding.",
    cta: "Start 14 day trial",
    featured: true,
    features: ["Unlimited plants and IDs", "Light meter and watering math", "Pest doctor", "Vacation mode with sitter links", "Care journal export"],
  },
  {
    name: "Household",
    price: "$5.99",
    cadence: "per month for up to 6 people",
    blurb: "For flatmates, families and shared balconies.",
    cta: "Share with the house",
    features: ["Everything in Plus", "Shared watering rota", "Who-watered-what history", "Kid friendly mode"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="hbl-mb-section">
      <div className="hbl-mb-wrap">
        <SectionHead
          eyebrow="Pricing"
          title={
            <>
              Free to start. <em>Cheaper than a new plant.</em>
            </>
          }
          lede="Every plan includes daily nudges and the community. Upgrade when your collection outgrows five pots, cancel in two taps."
        />
        <div className="hbl-mb-plans">
          {plans.map((p, i) => (
            <FadeInView key={p.name} delay={i * 0.1} distance={24} className="min-w-0">
              <article className={`hbl-mb-plan${p.featured ? " hbl-mb-plan-on" : ""}`}>
                {p.featured && <span className="hbl-mb-plan-flag">Most loved</span>}
                <h3>{p.name}</h3>
                <p className="hbl-mb-plan-blurb">{p.blurb}</p>
                <p className="hbl-mb-plan-price">
                  <b>{p.price}</b>
                  <span>{p.cadence}</span>
                </p>
                <a href="#download" className="hbl-mb-plan-cta">
                  {p.cta}
                </a>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="hbl-mb-plan-tick">
                        <Ico size={12} stroke={2.6}>{icons.check}</Ico>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    id: "free",
    title: "Is Fernly really free?",
    content:
      "Yes. Seedling is free forever with up to five plants, daily nudges and the community. There are no ads in any plan, and we never sell your data.",
  },
  {
    id: "offline",
    title: "Does plant ID work without signal?",
    content:
      "The 600 most common houseplants are recognised on your phone, even in airplane mode. Rarer species need a quick connection and come back in about two seconds.",
  },
  {
    id: "dead",
    title: "I have killed every plant I have ever owned. Will this help?",
    content:
      "Most plants die from too much water, not too little. Fernly's watering math is built around that. Our beginners keep 91% of their plants alive after six months.",
  },
  {
    id: "devices",
    title: "Which phones does Fernly run on?",
    content:
      "Any phone or tablet released in the last six years. Your jungle syncs across devices, so the whole household sees the same rota.",
  },
  {
    id: "cancel",
    title: "How do I cancel Plus?",
    content:
      "From your phone's subscription settings, in two taps. Your plants, photos and journal stay with you on the free plan.",
  },
];

export function Faq() {
  return (
    <section className="hbl-mb-section hbl-mb-faq-sec">
      <div className="hbl-mb-wrap hbl-mb-faq">
        <div className="min-w-0">
          <SectionHead
            align="left"
            eyebrow="Questions"
            title={
              <>
                Good questions, <em>honest answers.</em>
              </>
            }
            lede="Still curious? Our plant team answers every message within a day, usually with a pun."
          />
          <FadeInView delay={0.15} distance={14}>
            <a href="#download" className="hbl-mb-ghost">
              Ask the plant team
              <Ico size={15} stroke={2}>{icons.arrow}</Ico>
            </a>
          </FadeInView>
        </div>
        <FadeInView delay={0.1} distance={20} className="min-w-0">
          <Accordion items={faqs} defaultOpen={["free"]} className="hbl-mb-acc" />
        </FadeInView>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="download" className="hbl-mb-section hbl-mb-cta-sec">
      <div className="hbl-mb-wrap">
        <div className="hbl-mb-cta">
          <div className="hbl-mb-cta-glow" aria-hidden="true" />
          <PlantArt variant="monstera" className="hbl-mb-cta-plant hbl-mb-cta-plant-l" bg="#14532d" pot="#e07a5f" />
          <PlantArt variant="snake" className="hbl-mb-cta-plant hbl-mb-cta-plant-r" bg="#14532d" pot="#bef264" rim="#a3d94c" />
          <div className="hbl-mb-cta-copy">
            <span className="hbl-mb-eyebrow-pill hbl-mb-eyebrow-dark">Free on every phone</span>
            <h2 className="hbl-mb-cta-title">
              <SplitText text="Your windowsill is waiting." by="words" stagger={0.09} distance={26} />
            </h2>
            <p>Two minutes a morning. A jungle by spring. Join 2.4 million people who stopped guessing.</p>
            <div className="hbl-mb-cta-actions">
              <Magnetic strength={0.3} radius={140}>
                <ConfettiButton
                  size="lg"
                  successLabel="See you on day one"
                  colors={["#bef264", "#e07a5f", "#f7f5ef", "#84cc16"]}
                  className="hbl-mb-confetti"
                >
                  Start my first streak
                </ConfettiButton>
              </Magnetic>
            </div>
            <div className="hbl-mb-badges hbl-mb-badges-center">
              <StoreBadge kind="a" />
              <StoreBadge kind="b" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const footer = [
  { title: "Product", links: ["Features", "Plant library", "Pricing", "Changelog"] },
  { title: "Community", links: ["Local groups", "Cutting swaps", "Challenges", "Guidelines"] },
  { title: "Company", links: ["About", "Careers", "Press kit", "Contact"] },
];

export function Footer() {
  return (
    <footer className="hbl-mb-footer">
      <div className="hbl-mb-wrap">
        <div className="hbl-mb-footer-grid">
          <div className="hbl-mb-footer-brand min-w-0">
            <a href="#top" className="hbl-mb-brand" aria-label="Fernly home">
              <LogoMark />
              <span>Fernly</span>
            </a>
            <p>Little nudges for thriving plants. Made with soil under our nails in Lisbon and Leeds.</p>
          </div>
          {footer.map((col) => (
            <nav key={col.title} aria-label={col.title} className="min-w-0">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#top">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="hbl-mb-footer-base">
          <span>© 2026 Fernly Labs. All plants reserved.</span>
          <span className="hbl-mb-footer-legal">
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <a href="#top">Cookies</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

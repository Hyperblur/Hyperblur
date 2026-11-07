import { Accordion } from "@/registry/hyperblur/accordion";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { ShinyText } from "@/registry/hyperblur/shiny-text";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { FoodArt } from "./art";
import { faqs, locations } from "./data";
import { Ico, LogoMark, icons } from "./icons";

export function Faq() {
  return (
    <section id="faq" className="hbl-bg-section hbl-bg-faq">
      <div className="hbl-bg-wrap hbl-bg-faq-grid">
        <div className="hbl-bg-min0">
          <p className="hbl-bg-kicker">FAQ</p>
          <h2 className="hbl-bg-h2">Before you order.</h2>
          <p className="hbl-bg-sub">
            Something else? Call the Bushwick shop at <a href="tel:+17185550187">(718) 555-0187</a> or text the same number. A human answers.
          </p>
        </div>
        <FadeInView className="hbl-bg-min0" distance={16}>
          <Accordion items={faqs.map((f) => ({ id: f.id, title: f.q, content: f.a }))} defaultOpen={["ahead"]} className="hbl-bg-acc" />
        </FadeInView>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="hbl-bg-close" aria-labelledby="hbl-bg-close-title">
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-close-card">
          <div className="hbl-bg-close-rays" aria-hidden="true" />
          <div className="hbl-bg-min0 hbl-bg-close-copy">
            <p className="hbl-bg-close-kicker">
              <ShinyText text="Griddle is hot right now" color="#0b0b0b" shine="#ffffff" speed={2.6} />
            </p>
            <h2 id="hbl-bg-close-title" className="hbl-bg-close-h">
              Hungry yet?
            </h2>
            <p className="hbl-bg-close-sub">Order in under a minute. Pickup in about nine. Delivery free on orders over $35.</p>
            <div className="hbl-bg-close-ctas">
              <Magnetic strength={0.3}>
                <a href="#menu" className="hbl-bg-btn hbl-bg-btn-dark hbl-bg-btn-lg">
                  Order now
                  <Ico size={16}>{icons.arrow}</Ico>
                </a>
              </Magnetic>
              <a href="tel:+17185550187" className="hbl-bg-btn hbl-bg-btn-outline-dark hbl-bg-btn-lg">
                <Ico size={16}>{icons.phone}</Ico>
                Call to order
              </a>
            </div>
          </div>
          <div className="hbl-bg-close-art" aria-hidden="true">
            <FoodArt art={{ kind: "burger", patties: 3, cheese: "#ffb627", extra: "bacon" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

const cols = [
  {
    title: "Order",
    links: [
      ["Full menu", "#menu"],
      ["Combos", "#combos"],
      ["Catering", "#faq"],
      ["Gift cards", "#menu"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Our beef", "#faq"],
      ["Reviews", "#reviews"],
      ["Jobs, we're hiring", "#locations"],
      ["Press kit", "#reviews"],
    ],
  },
];

export function BurgerFooter() {
  return (
    <footer className="hbl-bg-footer">
      <div className="hbl-bg-wrap">
        <div className="hbl-bg-footer-grid">
          <div className="hbl-bg-min0">
            <a href="#top" className="hbl-bg-brand" aria-label="Smash & Co., back to top">
              <LogoMark />
              <span className="hbl-bg-brand-name">
                Smash<span>&amp;</span>Co.
              </span>
            </a>
            <p className="hbl-bg-muted hbl-bg-footer-blurb">Smash burgers, crispy chicken and custard shakes. Three shops in New York, open late.</p>
            <div className="hbl-bg-socials">
              <a href="https://instagram.com" aria-label="Smash & Co. on Instagram" className="hbl-bg-iconbtn">
                <Ico size={18}>{icons.instagram}</Ico>
              </a>
              <a href="https://tiktok.com" aria-label="Smash & Co. on TikTok" className="hbl-bg-iconbtn">
                <Ico size={18}>{icons.tiktok}</Ico>
              </a>
              <a href="https://x.com" aria-label="Smash & Co. on X" className="hbl-bg-iconbtn">
                <Ico size={18}>{icons.x}</Ico>
              </a>
            </div>
          </div>
          {locations.map((l) => (
            <div key={l.id} className="hbl-bg-min0">
              <p className="hbl-bg-footer-title">{l.name}</p>
              <address className="hbl-bg-footer-addr">
                {l.address}
                <br />
                {l.city}
                <br />
                <a href={`tel:${l.tel}`}>{l.phone}</a>
              </address>
              <p className="hbl-bg-small hbl-bg-muted">Fri {l.hours[4][1]}</p>
            </div>
          ))}
          {cols.map((c) => (
            <div key={c.title} className="hbl-bg-min0">
              <p className="hbl-bg-footer-title">{c.title}</p>
              <ul className="hbl-bg-footer-links">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="hbl-bg-footer-base">
          <p>© 2026 Smash &amp; Co. Burger Shops LLC</p>
          <p>Prices before tax. Menu and hours may change on holidays.</p>
        </div>
      </div>
    </footer>
  );
}

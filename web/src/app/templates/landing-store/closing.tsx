import { Accordion } from "@/registry/hyperblur/accordion";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { faqs } from "./data";
import { ArrowIcon, InstagramIcon, LogoMark, PinterestIcon, TikTokIcon } from "./icons";

export function Faq() {
  return (
    <section id="faq" className="hbl-st-section">
      <div className="hbl-st-wrap hbl-st-faq">
        <FadeInView className="min-w-0">
          <p className="hbl-st-kicker">Questions</p>
          <h2 className="hbl-st-h2 font-serif">Good to know before you order.</h2>
          <p className="hbl-st-sub">
            Still curious? Write to <a href="mailto:hello@havengoods.co" className="hbl-st-inline">hello@havengoods.co</a> and a
            real person in Brooklyn replies within a day.
          </p>
        </FadeInView>
        <FadeInView delay={0.1} className="min-w-0">
          <Accordion items={faqs} defaultOpen={["shipping"]} className="hbl-st-acc" />
        </FadeInView>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="hbl-st-close" aria-labelledby="hbl-st-close-title">
      <div className="hbl-st-wrap">
        <FadeInView>
          <div className="hbl-st-close-card">
            <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="hbl-st-close-bg" aria-hidden="true">
              <circle cx="1040" cy="60" r="220" fill="#2e4538" />
              <circle cx="120" cy="380" r="180" fill="#2a3f33" />
              <circle cx="980" cy="330" r="60" fill="#b86b4b" opacity=".9" className="hbl-st-float" />
            </svg>
            <p className="hbl-st-kicker hbl-st-kicker-light">Free shipping over $75 · 60-day returns</p>
            <h2 id="hbl-st-close-title" className="hbl-st-close-title font-serif">
              Bring home something you will keep for years.
            </h2>
            <div className="hbl-st-hero-ctas hbl-st-close-ctas">
              <Magnetic strength={0.3} radius={120}>
                <a href="#bestsellers" className="hbl-st-btn hbl-st-btn-light hbl-st-btn-lg">
                  Shop the collection
                  <ArrowIcon />
                </a>
              </Magnetic>
              <a href="#visit" className="hbl-st-btn hbl-st-btn-outline-light hbl-st-btn-lg">
                Visit the flagship
              </a>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Ceramics", href: "#categories" },
      { label: "Linen", href: "#categories" },
      { label: "Candles", href: "#categories" },
      { label: "Small furniture", href: "#categories" },
      { label: "New arrivals", href: "#arrivals" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "#faq" },
      { label: "Returns", href: "#faq" },
      { label: "Care guides", href: "#faq" },
      { label: "Track an order", href: "#faq" },
      { label: "Contact", href: "mailto:hello@havengoods.co" },
    ],
  },
  {
    title: "Haven",
    links: [
      { label: "Our story", href: "#story" },
      { label: "Our makers", href: "#story" },
      { label: "Lookbook", href: "#lookbook" },
      { label: "Trade program", href: "#visit" },
      { label: "Gift cards", href: "#bestsellers" },
    ],
  },
];

export function StoreFooter() {
  return (
    <footer className="hbl-st-footer">
      <div className="hbl-st-wrap">
        <div className="hbl-st-footer-grid">
          <div className="hbl-st-footer-brand min-w-0">
            <a href="#top" className="hbl-st-brand" aria-label="Haven Goods, back to top">
              <LogoMark />
              <span className="font-serif">Haven Goods</span>
            </a>
            <p>Calm, tactile goods for the home, made in small batches since 2019.</p>
            <address>
              214 Wythe Avenue, Brooklyn, NY 11249
              <br />
              Tue to Sun, hours vary · (718) 555-0142
            </address>
            <div className="hbl-st-socials">
              <a href="#top" aria-label="Haven Goods on Instagram">
                <InstagramIcon />
              </a>
              <a href="#top" aria-label="Haven Goods on Pinterest">
                <PinterestIcon />
              </a>
              <a href="#top" aria-label="Haven Goods on TikTok">
                <TikTokIcon />
              </a>
            </div>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title} className="min-w-0">
              <p className="hbl-st-footer-title">{c.title}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hbl-st-footer-link">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="hbl-st-footer-base">
          <p>© 2026 Haven Goods Co. All prices in USD.</p>
          <ul className="hbl-st-pay" aria-label="Accepted payments">
            {["Visa", "Mastercard", "Amex", "Apple Pay", "Shop Pay"].map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

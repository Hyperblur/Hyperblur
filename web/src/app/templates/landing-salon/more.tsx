import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { Accordion } from "@/registry/hyperblur/accordion";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { Heading } from "./sections";
import { Shelf } from "./shelf";
import { StreetMap } from "./art";
import { address, phone } from "./data";
import { Ico, LogoMark, icons } from "./icons";

const plans = [
  {
    name: "The Regular",
    price: 95,
    cadence: "per month",
    blurb: "For the person who books every five weeks anyway.",
    perks: ["One signature cut or blowout a month", "Free bang refresh between visits", "10% off retail", "Priority Saturday slots"],
    featured: false,
  },
  {
    name: "Colour Club",
    price: 165,
    cadence: "per month",
    blurb: "Keeps balayage and blonde looking freshly painted.",
    perks: [
      "Gloss & tone every month",
      "Root touch-up or face-frame every 8 weeks",
      "Bond repair ritual on every visit",
      "15% off retail and a free birthday blowout",
    ],
    featured: true,
  },
  {
    name: "Grooming Bar",
    price: 55,
    cadence: "per month",
    blurb: "Two chairs, sharp lines, espresso on the house.",
    perks: ["Two classic cuts or fades a month", "Beard sculpt with every visit", "Hot towel shave at half price", "Walk in before noon, skip the list"],
    featured: false,
  },
];

export function Memberships() {
  return (
    <section id="memberships" className="hbl-sl-section">
      <div className="hbl-sl-wrap">
        <Heading
          eyebrow="Memberships"
          title="Your chair,"
          em="on repeat."
          lede="Monthly memberships for regulars. Pause any month, cancel with one text, unused visits roll over once."
          center
        />
        <div className="hbl-sl-plans">
          {plans.map((p, i) => (
            <FadeInView key={p.name} delay={i * 0.08} distance={22} className="hbl-sl-plan-cell">
              <article className={p.featured ? "hbl-sl-plan hbl-sl-plan-featured" : "hbl-sl-plan"}>
                {p.featured && <span className="hbl-sl-plan-flag">Most booked</span>}
                <h3>{p.name}</h3>
                <p className="hbl-sl-plan-blurb">{p.blurb}</p>
                <p className="hbl-sl-plan-price">
                  <span>${p.price}</span>
                  <small>{p.cadence}</small>
                </p>
                <ul>
                  {p.perks.map((perk) => (
                    <li key={perk}>
                      <Ico size={15} stroke={2.2}>{icons.check}</Ico>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a href="#book" className={p.featured ? "hbl-sl-btn hbl-sl-btn-light hbl-sl-btn-block" : "hbl-sl-btn hbl-sl-btn-ghost hbl-sl-btn-block"}>
                  Start with a booking
                </a>
              </article>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: "Hannah K.",
    service: "Full balayage with Noor",
    text: "Three years of box dye, gone in two visits. Noor explained every step, and the colour still looks expensive at week ten.",
    rating: 5,
    color: "#d9577a",
  },
  {
    name: "Marco D.",
    service: "Skin fade with Theo",
    text: "Best fade in Brooklyn and I have tried most of them. In and out in fifty minutes, with an espresso I did not ask for but needed.",
    rating: 5,
    color: "#3b1f2b",
  },
  {
    name: "Aisha T.",
    service: "Silk press with Ama",
    text: "Ama actually knows curls. My silk press lasted two weeks through rain, and she showed me how to wrap it at night.",
    rating: 5,
    color: "#b88a4a",
  },
  {
    name: "Ben R.",
    service: "Restyle with Lucia",
    text: "Asked for a change and got the best haircut of my life. The booking took thirty seconds and they texted when my chair was ready.",
    rating: 5,
    color: "#7d6e70",
  },
  {
    name: "Grace L.",
    service: "Vivid colour with Jun",
    text: "Rose pink that faded into a lovely peach instead of a sad orange. Jun mixed me a take-home gloss to keep it going.",
    rating: 5,
    color: "#d9577a",
  },
  {
    name: "Samir N.",
    service: "Colour Club member",
    text: "Membership paid for itself in month two. Saturday slots are hard to get anywhere else, here I just pick one.",
    rating: 4,
    color: "#3b1f2b",
  },
];

const bars = [
  { stars: 5, pct: 91 },
  { stars: 4, pct: 7 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export function Reviews() {
  return (
    <section id="reviews" className="hbl-sl-section hbl-sl-section-blush">
      <div className="hbl-sl-wrap hbl-sl-reviews">
        <div className="hbl-sl-reviews-side">
          <Heading eyebrow="Reviews" title="Regulars," em="in their words." />
          <FadeInView delay={0.1} distance={16} className="hbl-sl-score">
            <div className="hbl-sl-score-top">
              <span className="hbl-sl-score-num">4.9</span>
              <div>
                <StarRating value={5} readOnly size={18} color="#b88a4a" />
                <p>2,418 verified reviews</p>
              </div>
            </div>
            <ul className="hbl-sl-bars">
              {bars.map((b) => (
                <li key={b.stars}>
                  <span>{b.stars} star</span>
                  <span className="hbl-sl-bar" aria-hidden="true">
                    <span style={{ width: `${b.pct}%` }} />
                  </span>
                  <span>{b.pct}%</span>
                </li>
              ))}
            </ul>
          </FadeInView>
        </div>
        <div className="hbl-sl-review-grid">
          {reviews.map((r, i) => (
            <FadeInView key={r.name} delay={(i % 2) * 0.08} distance={18} className="hbl-sl-review-cell">
              <figure className="hbl-sl-review">
                <StarRating value={r.rating} readOnly size={15} color="#b88a4a" />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className="hbl-sl-review-avatar" style={{ background: r.color }} aria-hidden="true">
                    {r.name.charAt(0)}
                  </span>
                  <span>
                    <strong>{r.name}</strong>
                    <span>{r.service}</span>
                  </span>
                </figcaption>
              </figure>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products() {
  return (
    <section id="shop" className="hbl-sl-section">
      <div className="hbl-sl-wrap">
        <div className="hbl-sl-split-head">
          <Heading
            eyebrow="The shelf"
            title="Take the salon"
            em="home with you."
            lede="Our own small-batch line, mixed in Red Hook. The same products your stylist uses on you."
          />
        </div>
        <FadeInView distance={20}>
          <Shelf />
        </FadeInView>
      </div>
    </section>
  );
}

const hours = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "10:00 am – 8:00 pm" },
  { day: "Wednesday", time: "10:00 am – 8:00 pm" },
  { day: "Thursday", time: "10:00 am – 9:00 pm" },
  { day: "Friday", time: "9:00 am – 9:00 pm" },
  { day: "Saturday", time: "9:00 am – 7:00 pm" },
  { day: "Sunday", time: "11:00 am – 5:00 pm" },
];

const today = "Thursday";

export function Visit() {
  return (
    <section id="visit" className="hbl-sl-section hbl-sl-section-blush">
      <div className="hbl-sl-wrap">
        <Heading eyebrow="Visit" title="Two blocks from" em="Carroll Park." />
        <div className="hbl-sl-visit">
          <FadeInView distance={20} className="hbl-sl-map">
            <StreetMap />
            <div className="hbl-sl-map-card">
              <p className="hbl-sl-map-addr">
                <Ico size={16}>{icons.pin}</Ico>
                {address}
              </p>
              <p className="hbl-sl-map-hint">F and G trains to Carroll St, 4 min walk. Street parking on Union.</p>
              <a
                className="hbl-sl-btn hbl-sl-btn-primary hbl-sl-btn-sm"
                href="https://maps.google.com/?q=214+Court+Street+Brooklyn+NY+11201"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
                <Ico size={15} stroke={2}>{icons.arrow}</Ico>
              </a>
            </div>
          </FadeInView>
          <FadeInView delay={0.1} distance={20} className="hbl-sl-hours">
            <div className="hbl-sl-hours-head">
              <h3>Opening hours</h3>
              <span className="hbl-sl-open">
                <span className="hbl-sl-live-dot" aria-hidden="true" />
                Open today until 9 pm
              </span>
            </div>
            <table className="hbl-sl-hours-table">
              <caption className="hbl-sl-sr">Opening hours by day</caption>
              <tbody>
                {hours.map((h) => (
                  <tr key={h.day} data-today={h.day === today} aria-current={h.day === today ? "date" : undefined}>
                    <th scope="row">
                      {h.day}
                      {h.day === today && <span className="hbl-sl-today">Today</span>}
                    </th>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="hbl-sl-hours-contact">
              <a href="tel:+17185550142">
                <Ico size={15}>{icons.phone}</Ico>
                {phone}
              </a>
              <a href="mailto:hello@maisonrue.com">
                <Ico size={15}>{icons.mail}</Ico>
                hello@maisonrue.com
              </a>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    id: "first",
    title: "I have never been before. Who should I book?",
    content:
      "Book a 15-minute free consult with any stylist, or pick by specialty: Noor and Jun for colour, Ama for curls and silk press, Lucia for precision cuts, Theo and Marcus at the grooming bar.",
  },
  {
    id: "cancel",
    title: "What is your cancellation policy?",
    content:
      "Change or cancel free up to 24 hours before. Inside 24 hours we charge 50% of the service, and no-shows are charged in full. Members get one free late change per month.",
  },
  {
    id: "walkins",
    title: "Do you take walk-ins?",
    content:
      "The grooming bar takes walk-ins before noon, Tuesday to Saturday. Salon chairs are by booking, but we post same-day openings on the booking card above.",
  },
  {
    id: "patch",
    title: "Do I need a patch test before colour?",
    content:
      "Yes, for first-time colour clients. Pop in any time 48 hours before your appointment, it takes two minutes and there is no charge.",
  },
  {
    id: "kids",
    title: "Do you cut kids' hair?",
    content: "Yes, under 12s are $38 for a cut with any stylist, and $28 at the grooming bar. Weekday mornings are calmest.",
  },
  {
    id: "pay",
    title: "How do I pay, and should I tip?",
    content:
      "We take cards, Apple Pay and cash at checkout. Tipping is never expected; our team is paid a full salary with benefits.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="hbl-sl-section">
      <div className="hbl-sl-wrap hbl-sl-faq">
        <Heading
          eyebrow="Questions"
          title="Good to know"
          em="before you sit."
          lede="Anything else? Text us at (718) 555-0142, a real person answers within the hour."
        />
        <FadeInView delay={0.1} distance={18} className="hbl-sl-faq-list">
          <Accordion items={faqs} type="single" defaultOpen={["first"]} />
        </FadeInView>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="hbl-sl-final-wrap">
      <div className="hbl-sl-wrap">
        <FadeInView distance={24} className="hbl-sl-final">
          <svg viewBox="0 0 1200 420" preserveAspectRatio="none" className="hbl-sl-final-art" aria-hidden="true">
            <path className="hbl-sl-final-rib" d="M-40 320C200 200 360 400 600 280s380-240 640-120" stroke="#d9577a" strokeWidth="50" fill="none" strokeOpacity="0.55" />
            <path className="hbl-sl-final-rib hbl-sl-final-rib-2" d="M-40 380C220 280 420 420 640 330s360-200 600-100" stroke="#b88a4a" strokeWidth="18" fill="none" strokeOpacity="0.6" />
          </svg>
          <p className="hbl-sl-eyebrow hbl-sl-eyebrow-light">Same-day chairs open at 4:15 and 6:00</p>
          <h2 className="hbl-sl-final-h">
            Your next good hair day <em>starts with a chair.</em>
          </h2>
          <p className="hbl-sl-final-sub">Book in thirty seconds. Free changes up to 24 hours before, and the espresso is on us.</p>
          <div className="hbl-sl-final-ctas">
            <Magnetic strength={0.4} radius={140}>
              <a href="#book" className="hbl-sl-btn hbl-sl-btn-rose hbl-sl-btn-lg">
                Book a chair
                <Ico size={17} stroke={2}>{icons.arrow}</Ico>
              </a>
            </Magnetic>
            <a href="tel:+17185550142" className="hbl-sl-btn hbl-sl-btn-outline-light hbl-sl-btn-lg">
              <Ico size={16}>{icons.phone}</Ico>
              Call {phone}
            </a>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

const footerCols = [
  {
    title: "Salon",
    links: [
      { label: "Services & prices", href: "#services" },
      { label: "Stylists", href: "#stylists" },
      { label: "Lookbook", href: "#lookbook" },
      { label: "Memberships", href: "#memberships" },
    ],
  },
  {
    title: "Guests",
    links: [
      { label: "Book a chair", href: "#book" },
      { label: "Reviews", href: "#reviews" },
      { label: "The shelf", href: "#shop" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="hbl-sl-footer">
      <div className="hbl-sl-wrap">
        <div className="hbl-sl-foot-grid">
          <div className="hbl-sl-foot-brand">
            <a href="#top" className="hbl-sl-brand hbl-sl-brand-light" aria-label="Maison Rue home">
              <LogoMark />
              <span>Maison Rue</span>
            </a>
            <p>Hair salon and barbershop on Court Street, Brooklyn. Eight chairs, one grooming bar, open six days a week.</p>
            <div className="hbl-sl-socials">
              <a href="https://instagram.com/maisonrue" aria-label="Maison Rue on Instagram">
                <Ico size={18}>{icons.instagram}</Ico>
              </a>
              <a href="https://tiktok.com/@maisonrue" aria-label="Maison Rue on TikTok">
                <Ico size={18}>{icons.tiktok}</Ico>
              </a>
              <a href="mailto:hello@maisonrue.com" aria-label="Email Maison Rue">
                <Ico size={18}>{icons.mail}</Ico>
              </a>
            </div>
          </div>
          {footerCols.map((c) => (
            <nav key={c.title} aria-label={c.title} className="hbl-sl-foot-col">
              <h3>{c.title}</h3>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="hbl-sl-foot-col">
            <h3>Find us</h3>
            <address>
              214 Court Street
              <br />
              Brooklyn, NY 11201
            </address>
            <p>
              Tue–Wed 10–8 · Thu–Fri until 9
              <br />
              Sat 9–7 · Sun 11–5 · Mon closed
            </p>
            <a href="tel:+17185550142">{phone}</a>
          </div>
        </div>
        <div className="hbl-sl-foot-bottom">
          <span>© 2026 Maison Rue Salon LLC</span>
          <span>Licensed by the New York State Division of Licensing Services</span>
        </div>
      </div>
      <div className="hbl-sl-mobile-bar">
        <a href="tel:+17185550142" className="hbl-sl-btn hbl-sl-btn-outline-light">
          <Ico size={16}>{icons.phone}</Ico>
          Call
        </a>
        <a href="#book" className="hbl-sl-btn hbl-sl-btn-rose">
          Book a chair
        </a>
      </div>
    </footer>
  );
}

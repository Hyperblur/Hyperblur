import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { ShinyText } from "@/registry/hyperblur/shiny-text";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { CountUp } from "@/registry/hyperblur/count-up";
import { Accordion } from "@/registry/hyperblur/accordion";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { MenuExplorer } from "./menu";
import { ReserveCard } from "./reserve";
import { DishArt } from "./art";
import { Ico, LogoMark, icons } from "./icons";
import { address, hours, phone, type ArtKind } from "./data";

function InfoCard() {
  const today = hours.find((h) => h.today);
  return (
    <div className="hbl-mn-info">
      <div className="hbl-mn-info-row">
        <span className="hbl-mn-info-ico">
          <Ico size={16}>{icons.clock}</Ico>
        </span>
        <div className="hbl-mn-min0">
          <p className="hbl-mn-info-t">
            Open today <span className="hbl-mn-info-open">Open now</span>
          </p>
          <p className="hbl-mn-info-s">{today?.time}</p>
        </div>
      </div>
      <div className="hbl-mn-info-row">
        <span className="hbl-mn-info-ico">
          <Ico size={16}>{icons.pin}</Ico>
        </span>
        <div className="hbl-mn-min0">
          <p className="hbl-mn-info-t">{address.line1}</p>
          <p className="hbl-mn-info-s">{address.line2}</p>
        </div>
      </div>
      <div className="hbl-mn-info-links">
        <a href="#visit">Hours &amp; map</a>
        <a href={phone.href}>{phone.label}</a>
      </div>
    </div>
  );
}

export function MenuSection() {
  return (
    <section id="menu" className="hbl-mn-section hbl-mn-menu" aria-labelledby="hbl-mn-menu-h">
      <div className="hbl-mn-wrap">
        <div className="hbl-mn-head hbl-mn-head-split">
          <div className="hbl-mn-min0">
            <p className="hbl-mn-kicker">The menu · Thursday, November 5</p>
            <h2 id="hbl-mn-menu-h" className="hbl-mn-h2">
              Everything we&apos;re cooking today.
            </h2>
          </div>
          <p className="hbl-mn-sub">
            Filter by diet, open allergen info on any dish, and tap a section to jump. Prices include the service charge.
          </p>
        </div>
        <div className="hbl-mn-menu-grid">
          <div className="hbl-mn-min0">
            <MenuExplorer />
          </div>
          <aside className="hbl-mn-aside" aria-label="Reservations and hours">
            <ReserveCard />
            <InfoCard />
          </aside>
        </div>
      </div>
    </section>
  );
}

const specials: { name: string; desc: string; price: number; art: ArtKind; tint: string; tone?: string; meta: string; link: string }[] = [
  {
    name: "Chanterelle toast",
    desc: "Coast Range chanterelles, brown butter, thyme, a soft egg on Little Loaf rye.",
    price: 18,
    art: "toast",
    tint: "#f1dcc0",
    meta: "Lunch · until Sunday",
    link: "#lunch",
  },
  {
    name: "Whole grilled halibut collar",
    desc: "Charred lemon, chili butter, cucumber and herb salad. Feeds two.",
    price: 34,
    art: "fish",
    tint: "#dde9ee",
    meta: "Dinner · 12 a night",
    link: "#dinner",
  },
  {
    name: "Pear & hazelnut tart",
    desc: "Bosc pears, Willamette hazelnuts, honey ice cream, a little sea salt.",
    price: 12,
    art: "tart",
    tint: "#f4e3c6",
    meta: "All day · new this week",
    link: "#dinner",
  },
];

export function Specials() {
  return (
    <section id="specials" className="hbl-mn-section hbl-mn-specials" aria-labelledby="hbl-mn-spec-h">
      <div className="hbl-mn-wrap">
        <div className="hbl-mn-head hbl-mn-head-center">
          <p className="hbl-mn-kicker">
            <ShinyText text="Only this week" color="#1f4d3a" shine="#7fbf8f" speed={3.4} />
          </p>
          <h2 id="hbl-mn-spec-h" className="hbl-mn-h2">
            Off the menu, on the board.
          </h2>
          <p className="hbl-mn-sub">Three dishes from what came in on Monday. When they are gone, they are gone.</p>
        </div>
        <div className="hbl-mn-spec-grid">
          {specials.map((s, i) => (
            <FadeInView key={s.name} delay={i * 0.08} distance={18} className="hbl-mn-min0">
              <TiltCard maxTilt={7} glare scale={1.02} className="hbl-mn-spec-tilt">
                <article className="hbl-mn-spec">
                  <div className="hbl-mn-spec-art" style={{ background: s.tint }}>
                    <span className="hbl-mn-spec-num">0{i + 1}</span>
                    <DishArt kind={s.art} tint="transparent" uid={`spec-${i}`} tone={s.tone} />
                  </div>
                  <div className="hbl-mn-spec-body">
                    <p className="hbl-mn-spec-meta">{s.meta}</p>
                    <div className="hbl-mn-spec-top">
                      <h3>{s.name}</h3>
                      <span className="hbl-mn-price">${s.price}</span>
                    </div>
                    <p className="hbl-mn-spec-desc">{s.desc}</p>
                    <a href={s.link} className="hbl-mn-spec-link">
                      Find it on the menu
                      <Ico size={15} stroke={2}>{icons.arrow}</Ico>
                    </a>
                  </div>
                </article>
              </TiltCard>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

const guests = [
  { name: "Renee Calloway", color: "#d9482b" },
  { name: "Marcus Bell", color: "#2f6b52" },
  { name: "Yuki Tanaka", color: "#e2a93b" },
  { name: "Omar Haddad", color: "#6f9a52" },
  { name: "Lena Park", color: "#8e2f45" },
];

const reviews = [
  {
    name: "Renee Calloway",
    date: "Oct 30",
    dish: "Verde grain bowl",
    text: "I have a sesame allergy and the allergen button on every dish is a lifesaver. Ordered at the table in two minutes, and the grain bowl is my new Tuesday.",
  },
  {
    name: "Marcus Bell",
    date: "Oct 24",
    dish: "Hanger steak",
    text: "Booked dinner for six from the page, picked the patio, got a text right away. The steak with salsa verde was perfect and the spritz is dangerous.",
  },
  {
    name: "Yuki Tanaka",
    date: "Oct 17",
    dish: "Mini cheeseburger",
    text: "Finally a place where the kids menu is real food. Our two shared the cheeseburger and the noodles, and we got through a whole bottle of txakoli.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="hbl-mn-section hbl-mn-reviews" aria-labelledby="hbl-mn-rev-h">
      <div className="hbl-mn-wrap hbl-mn-rev-grid">
        <div className="hbl-mn-min0 hbl-mn-rev-side">
          <p className="hbl-mn-kicker hbl-mn-kicker-light">Guest reviews</p>
          <h2 id="hbl-mn-rev-h" className="hbl-mn-h2 hbl-mn-h2-light">
            Regulars order before they sit down.
          </h2>
          <div className="hbl-mn-rev-score">
            <span className="hbl-mn-rev-big">
              <CountUp to={4.7} decimals={1} duration={1.4} />
            </span>
            <div>
              <StarRating value={4.7} precision={0.5} readOnly size={18} color="#f2c14e" aria-label="Rated 4.7 out of 5" />
              <p>2,318 reviews across Google and Resy</p>
            </div>
          </div>
          <div className="hbl-mn-rev-people">
            <AvatarStack people={guests} size={34} ring="#1f4d3a" max={5} extra={186} />
            <span>186 regulars this month</span>
          </div>
        </div>
        <div className="hbl-mn-rev-list">
          {reviews.map((r, i) => (
            <FadeInView key={r.name} delay={i * 0.08} distance={16} className="hbl-mn-min0">
              <figure className="hbl-mn-rev">
                <StarRating value={5} readOnly size={14} color="#f2c14e" aria-label="5 out of 5" />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className="hbl-mn-rev-av" style={{ background: guests[i].color }} aria-hidden="true">
                    {r.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </span>
                  <span className="hbl-mn-min0">
                    <b>{r.name}</b>
                    <small>
                      {r.date} · ordered the {r.dish.toLowerCase()}
                    </small>
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

const blocks: [number, number, number, number][] = [
  [16, 16, 108, 70], [152, 16, 118, 70], [298, 16, 118, 70], [444, 16, 140, 70],
  [16, 114, 108, 86], [152, 114, 118, 86], [444, 114, 140, 86],
  [16, 228, 108, 86], [298, 228, 118, 86], [444, 228, 140, 86],
  [16, 342, 108, 62], [152, 342, 118, 62], [298, 342, 118, 62], [444, 342, 140, 62],
];

function StreetMap() {
  return (
    <svg
      viewBox="0 0 600 420"
      className="hbl-mn-map-svg"
      role="img"
      aria-label="Map of Portland's West End showing Verde at 1428 SW Alder Street, at the corner of SW 14th Avenue"
    >
      <rect width="600" height="420" fill="#e9e2d2" />
      {blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill="#f6f1e7" stroke="#ddd3c0" />
      ))}
      <rect x="298" y="114" width="118" height="86" rx="8" fill="#cfe0c4" stroke="#b6cca8" />
      <g fill="#7fa86a" opacity="0.85">
        <circle cx="322" cy="140" r="9" />
        <circle cx="346" cy="162" r="11" />
        <circle cx="390" cy="138" r="8" />
        <circle cx="396" cy="174" r="10" />
      </g>
      <rect x="152" y="228" width="118" height="86" rx="8" fill="#f1e6d6" stroke="#ddd3c0" />
      <g stroke="#d4c8b2" strokeWidth="1" strokeDasharray="6 8">
        <path d="M0 100h600M0 214h600M0 328h600M138 0v420M284 0v420M430 0v420" />
      </g>
      <path d="M0 214h600" stroke="#d9482b" strokeOpacity="0.28" strokeWidth="5" />
      <g fontFamily="var(--font-sans)" fontSize="11" fontWeight="600" fill="#6b7a70" letterSpacing="1.2">
        <text x="24" y="104">SW MORRISON ST</text>
        <text x="24" y="210">SW ALDER ST</text>
        <text x="24" y="324">SW WASHINGTON ST</text>
        <text x="134" y="404" transform="rotate(-90 134 404)">SW 13TH AVE</text>
        <text x="280" y="404" transform="rotate(-90 280 404)">SW 14TH AVE</text>
        <text x="426" y="404" transform="rotate(-90 426 404)">SW 15TH AVE</text>
        <text x="306" y="192" fill="#2f5a40">ALDER COMMONS</text>
      </g>
      <path
        d="M60 214H220c20 0 40 0 64 0"
        stroke="#1f4d3a"
        strokeWidth="3"
        strokeDasharray="2 8"
        strokeLinecap="round"
        fill="none"
        className="hbl-mn-map-route"
      />
      <g>
        <rect x="44" y="198" width="32" height="32" rx="9" fill="#1f4d3a" />
        <text x="60" y="219" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="#f6f1e7">
          S
        </text>
        <text x="34" y="248" fontFamily="var(--font-sans)" fontSize="10" fontWeight="600" fill="#1b2a22">
          STREETCAR
        </text>
      </g>
      <g>
        <rect x="190" y="252" width="26" height="26" rx="6" fill="#1b2a22" />
        <text x="203" y="270" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="13" fontWeight="700" fill="#f6f1e7">
          P
        </text>
        <text x="168" y="296" fontFamily="var(--font-sans)" fontSize="10" fontWeight="600" fill="#1b2a22">
          ALDER GARAGE
        </text>
      </g>
      <g transform="translate(284 214)">
        <circle r="34" fill="#d9482b" opacity="0.18" className="hbl-mn-map-pulse" />
        <circle r="16" fill="#d9482b" opacity="0.2" />
        <path d="M0 0c-14-16-20-24-20-34a20 20 0 0 1 40 0c0 10-6 18-20 34z" fill="#d9482b" stroke="#fffdf8" strokeWidth="3" />
        <circle cy="-34" r="7" fill="#fffdf8" />
      </g>
      <g transform="translate(304 236)">
        <rect width="132" height="44" rx="10" fill="#1f4d3a" />
        <text x="14" y="20" fontFamily="var(--font-grotesk)" fontSize="15" fontWeight="700" fill="#f6f1e7">
          Verde
        </text>
        <text x="14" y="35" fontFamily="var(--font-sans)" fontSize="9.5" fontWeight="600" fill="#bcd3c4" letterSpacing="0.8">
          1428 SW ALDER ST
        </text>
      </g>
    </svg>
  );
}

export function Visit() {
  return (
    <section id="visit" className="hbl-mn-section hbl-mn-visit" aria-labelledby="hbl-mn-visit-h">
      <div className="hbl-mn-wrap">
        <div className="hbl-mn-head hbl-mn-head-split">
          <div className="hbl-mn-min0">
            <p className="hbl-mn-kicker">Visit</p>
            <h2 id="hbl-mn-visit-h" className="hbl-mn-h2">
              Corner of Alder and 14th.
            </h2>
          </div>
          <p className="hbl-mn-sub">Across from Alder Commons, one block from the Portland Streetcar stop at SW 13th.</p>
        </div>
        <div className="hbl-mn-visit-grid">
          <FadeInView className="hbl-mn-min0" distance={18}>
            <div className="hbl-mn-map">
              <StreetMap />
              <div className="hbl-mn-map-bar">
                <div className="hbl-mn-min0">
                  <p className="hbl-mn-map-addr">
                    {address.line1}, {address.line2}
                  </p>
                  <p className="hbl-mn-map-sub">Step-free entrance on SW 14th Ave</p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1428+SW+Alder+Street+Portland+OR"
                  className="hbl-mn-btn hbl-mn-btn-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Ico size={16}>{icons.pin}</Ico>
                  Get directions
                </a>
              </div>
            </div>
          </FadeInView>
          <FadeInView className="hbl-mn-min0" distance={18} delay={0.08}>
            <div className="hbl-mn-hours">
              <div className="hbl-mn-hours-head">
                <h3 className="hbl-mn-h3">Opening hours</h3>
                <span className="hbl-mn-open">
                  <span className="hbl-mn-dot" aria-hidden="true" />
                  Open today
                </span>
              </div>
              <table className="hbl-mn-hours-table">
                <caption className="hbl-mn-sr">Opening hours by day</caption>
                <tbody>
                  {hours.map((h) => (
                    <tr key={h.day} className={h.today ? "hbl-mn-today" : undefined} aria-current={h.today ? "date" : undefined}>
                      <th scope="row">
                        {h.day}
                        {h.today && <span className="hbl-mn-today-tag">Today</span>}
                      </th>
                      <td>
                        {h.time}
                        {h.note && <small>{h.note}</small>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="hbl-mn-visit-notes">
                <li>
                  <Ico size={16}>{icons.train}</Ico>
                  <span>Portland Streetcar NS line, SW 13th &amp; Alder stop, 2 minutes on foot.</span>
                </li>
                <li>
                  <Ico size={16}>{icons.bike}</Ico>
                  <span>Bike corral by the patio. Alder garage on SW 13th, $3 per hour after 5 PM.</span>
                </li>
                <li>
                  <Ico size={16}>{icons.phone}</Ico>
                  <a href={phone.href}>{phone.label}</a>
                </li>
              </ul>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    id: "allergies",
    title: "How do you handle allergies?",
    content:
      "Every dish lists its allergens under Allergen info, based on the recipe we cook that day. Tell your server when you sit down and the kitchen will confirm. We cook with nuts, sesame and gluten in a shared kitchen, so we cannot promise a dish free of traces for severe allergies.",
  },
  {
    id: "vegan",
    title: "Is there enough for vegans?",
    content:
      "About a third of the menu is vegan as written, and most other plates can be adapted. Use the Vegan filter on the menu to see them all, including desserts and cocktails.",
  },
  {
    id: "walkins",
    title: "Do you take walk-ins?",
    content:
      "Yes. We hold the chef's bar and half of the patio for walk-ins at every service. Weekday lunch rarely has a wait; on Friday and Saturday nights, add your name at the host stand and we will text you.",
  },
  {
    id: "groups",
    title: "Can we book for a large group?",
    content:
      "Parties of up to 10 can book online. For 11 to 24 guests, the long table on the patio has a set menu from $58 per person. Call us or write to events@verdepdx.com.",
  },
  {
    id: "kids",
    title: "Are kids welcome at dinner?",
    content:
      "Always. There are high chairs, a kids menu all day, and crayons for the paper menus. Early tables between 5:30 and 6:30 are the calmest.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="hbl-mn-section hbl-mn-faq" aria-labelledby="hbl-mn-faq-h">
      <div className="hbl-mn-wrap hbl-mn-faq-grid">
        <div className="hbl-mn-min0">
          <p className="hbl-mn-kicker">Good to know</p>
          <h2 id="hbl-mn-faq-h" className="hbl-mn-h2">
            Before you come in.
          </h2>
          <p className="hbl-mn-sub">
            Anything else? Call from 10 AM at <a href={phone.href}>{phone.label}</a> or write to{" "}
            <a href="mailto:hello@verdepdx.com">hello@verdepdx.com</a>.
          </p>
        </div>
        <FadeInView className="hbl-mn-min0" distance={14}>
          <Accordion items={faqs} defaultOpen={["allergies"]} className="hbl-mn-acc" />
        </FadeInView>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="hbl-mn-final" aria-labelledby="hbl-mn-final-h">
      <div className="hbl-mn-final-art" aria-hidden="true">
        <DishArt kind="bowl" tint="transparent" uid="final-a" />
        <DishArt kind="salad" tint="transparent" uid="final-b" />
        <DishArt kind="pasta" tint="transparent" uid="final-c" />
      </div>
      <div className="hbl-mn-wrap hbl-mn-final-inner">
        <FadeInView distance={16}>
          <p className="hbl-mn-kicker hbl-mn-kicker-light">Tables open 21 days ahead</p>
          <h2 id="hbl-mn-final-h" className="hbl-mn-final-h">
            Hungry yet? Your table is a tap away.
          </h2>
          <p className="hbl-mn-final-p">Lunch from 11:30, dinner from 5:30. Friday nights go first, the bar is always walk-in.</p>
          <div className="hbl-mn-final-ctas">
            <Magnetic strength={0.22}>
              <a href="#reserve" className="hbl-mn-btn hbl-mn-btn-tomato hbl-mn-btn-lg">
                Reserve a table
                <Ico size={17} stroke={2}>{icons.arrow}</Ico>
              </a>
            </Magnetic>
            <a href="#menu" className="hbl-mn-btn hbl-mn-btn-outline-light hbl-mn-btn-lg">
              Back to the menu
            </a>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

const socials = [
  { label: "Instagram", href: "https://instagram.com/verdepdx", icon: icons.instagram },
  { label: "Facebook", href: "https://facebook.com/verdepdx", icon: icons.facebook },
  { label: "Email", href: "mailto:hello@verdepdx.com", icon: icons.mail },
];

export function Footer() {
  return (
    <footer className="hbl-mn-footer">
      <div className="hbl-mn-wrap">
        <div className="hbl-mn-footer-grid">
          <div className="hbl-mn-min0">
            <a href="#top" className="hbl-mn-brand hbl-mn-brand-light" aria-label="Verde home">
              <LogoMark />
              <span>Verde</span>
            </a>
            <p className="hbl-mn-footer-tag">Seasonal plates, natural wine and a real kids menu in Portland&apos;s West End.</p>
            <ul className="hbl-mn-socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <Ico size={18}>{s.icon}</Ico>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hbl-mn-min0">
            <h3 className="hbl-mn-footer-h">Visit</h3>
            <address>
              {address.line1}
              <br />
              {address.line2}
            </address>
            <p>
              <a href={phone.href}>{phone.label}</a>
              <br />
              <a href="mailto:hello@verdepdx.com">hello@verdepdx.com</a>
            </p>
          </div>
          <div className="hbl-mn-min0">
            <h3 className="hbl-mn-footer-h">Hours</h3>
            <dl className="hbl-mn-footer-hours">
              <div>
                <dt>Mon</dt>
                <dd>11:30 – 3</dd>
              </div>
              <div>
                <dt>Tue – Thu</dt>
                <dd>11:30 – 10</dd>
              </div>
              <div>
                <dt>Fri</dt>
                <dd>11:30 – 11</dd>
              </div>
              <div>
                <dt>Sat</dt>
                <dd>10 – 11</dd>
              </div>
              <div>
                <dt>Sun</dt>
                <dd>10 – 9</dd>
              </div>
            </dl>
          </div>
          <div className="hbl-mn-min0">
            <h3 className="hbl-mn-footer-h">Menus</h3>
            <ul className="hbl-mn-footer-links">
              <li>
                <a href="#lunch">Lunch</a>
              </li>
              <li>
                <a href="#dinner">Dinner</a>
              </li>
              <li>
                <a href="#drinks">Drinks</a>
              </li>
              <li>
                <a href="#kids">Kids</a>
              </li>
              <li>
                <a href="mailto:events@verdepdx.com">Private events</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="hbl-mn-footer-bottom">
          <span>© 2026 Verde Kitchen LLC</span>
          <a href="#reserve" className="hbl-mn-footer-cta">
            Reserve a table
            <Ico size={15} stroke={2}>{icons.arrow}</Ico>
          </a>
        </div>
      </div>
    </footer>
  );
}

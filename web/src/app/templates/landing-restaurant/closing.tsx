import { Accordion } from "@/registry/hyperblur/accordion";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { Embers, Flame } from "./art";
import { Ico, LogoMark, icons } from "./icons";

const faqs = [
  {
    id: "allergies",
    title: "Can you cook around allergies and dietary needs?",
    content:
      "Yes. Add allergies to your reservation and tell your server when you sit down. Most of the menu is naturally gluten free, every tasting menu has a vegetarian version, and we can handle nut, shellfish and dairy allergies. Our fryer and hearth are shared, so we cannot promise a kitchen free of traces for severe celiac or anaphylactic allergies.",
  },
  {
    id: "parking",
    title: "Where do I park?",
    content:
      "The Octavia garage on Fell Street is a two-minute walk and costs $4 per hour after 6 PM. Street parking on Hayes is metered until 6 PM. Muni lines 21, 47 and 49 stop at the corner, and there are bike racks right by our door.",
  },
  {
    id: "dress",
    title: "Is there a dress code?",
    content:
      "No dress code. Come as you are, jeans are perfect. The terrace gets cool after sunset even with the heaters on, so bring a layer if you book outside.",
  },
  {
    id: "walkins",
    title: "Do you take walk-ins?",
    content:
      "We keep the ten seats at the chef's counter and the whole bar for walk-ins every night. Arrive before 6 PM for the best chance, or join the waitlist at the host stand and we will text you.",
  },
  {
    id: "kids",
    title: "Are children welcome?",
    content:
      "Always, especially for early tables. We have high chairs, a short kids' menu of grilled chicken, buttered pasta and flatbread, and crayons for the paper tablecloths.",
  },
  {
    id: "cancel",
    title: "What is the cancellation policy?",
    content:
      "Free cancellation until 24 hours before your booking. For parties of six or more, and for the Chef's Counter menu, we ask for a card to hold the table and charge $40 per guest for late cancellations or no-shows.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="hbl-rs-section hbl-rs-faq">
      <div className="hbl-rs-wrap hbl-rs-faq-grid">
        <div className="hbl-rs-min0">
          <p className="hbl-rs-kicker">Good to know</p>
          <h2 className="hbl-rs-h2">
            Questions, <em>answered.</em>
          </h2>
          <p className="hbl-rs-sub">
            Anything else? Call us from 2 PM at <a href="tel:+14155550142">(415) 555-0142</a> or write to{" "}
            <a href="mailto:hello@emberandolive.com">hello@emberandolive.com</a>.
          </p>
        </div>
        <FadeInView className="hbl-rs-min0" distance={16}>
          <Accordion items={faqs} defaultOpen={["allergies"]} className="hbl-rs-acc" />
        </FadeInView>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="hbl-rs-final" aria-labelledby="hbl-rs-final-h">
      <div className="hbl-rs-final-fire" aria-hidden="true">
        <Flame uid="final" />
      </div>
      <Embers count={26} className="hbl-rs-final-embers" />
      <div className="hbl-rs-wrap hbl-rs-final-inner">
        <FadeInView distance={18}>
          <p className="hbl-rs-kicker hbl-rs-kicker-light">The fire is lit at five</p>
          <h2 id="hbl-rs-final-h" className="hbl-rs-final-h">
            Pull up a chair <em>by the fire.</em>
          </h2>
          <p className="hbl-rs-final-p">
            Tables open 30 days ahead. Fridays and Saturdays go first, the counter is always first come, first served.
          </p>
          <div className="hbl-rs-final-ctas">
            <Magnetic strength={0.25}>
              <a href="#reserve" className="hbl-rs-btn hbl-rs-btn-primary hbl-rs-btn-lg">
                Reserve a table
                <Ico size={17} stroke={2}>{icons.arrow}</Ico>
              </a>
            </Magnetic>
            <a href="tel:+14155550142" className="hbl-rs-btn hbl-rs-btn-outline-light hbl-rs-btn-lg">
              <Ico size={16}>{icons.phone}</Ico>
              (415) 555-0142
            </a>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

const socials = [
  { label: "Instagram", href: "https://instagram.com/emberandolive", icon: icons.instagram },
  { label: "Facebook", href: "https://facebook.com/emberandolive", icon: icons.facebook },
  { label: "TikTok", href: "https://tiktok.com/@emberandolive", icon: icons.tiktok },
];

export function Footer() {
  return (
    <footer className="hbl-rs-footer">
      <div className="hbl-rs-wrap">
        <div className="hbl-rs-footer-grid">
          <div className="hbl-rs-min0">
            <a href="#top" className="hbl-rs-brand hbl-rs-brand-light" aria-label="Ember & Olive home">
              <LogoMark />
              <span>
                Ember <em>&amp;</em> Olive
              </span>
            </a>
            <p className="hbl-rs-footer-tag">Wood-fire Mediterranean cooking and natural wine in Hayes Valley since 2017.</p>
            <ul className="hbl-rs-socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    <Ico size={18}>{s.icon}</Ico>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hbl-rs-min0">
            <h3 className="hbl-rs-footer-h">Visit</h3>
            <address>
              418 Hayes Street
              <br />
              San Francisco, CA 94102
            </address>
            <p>
              <a href="tel:+14155550142">(415) 555-0142</a>
              <br />
              <a href="mailto:hello@emberandolive.com">hello@emberandolive.com</a>
            </p>
          </div>
          <div className="hbl-rs-min0">
            <h3 className="hbl-rs-footer-h">Hours</h3>
            <dl className="hbl-rs-footer-hours">
              <div><dt>Tue – Thu</dt><dd>5 – 10 PM</dd></div>
              <div><dt>Fri – Sat</dt><dd>5 – 11 PM</dd></div>
              <div><dt>Sun</dt><dd>11 – 3, 5 – 9 PM</dd></div>
              <div><dt>Mon</dt><dd>Closed</dd></div>
            </dl>
          </div>
          <div className="hbl-rs-min0">
            <h3 className="hbl-rs-footer-h">Explore</h3>
            <ul className="hbl-rs-footer-links">
              <li><a href="#menu">Menu</a></li>
              <li><a href="#tasting">Tasting menus</a></li>
              <li><a href="#events">Private dining</a></li>
              <li><a href="mailto:jobs@emberandolive.com">Careers</a></li>
              <li><a href="mailto:hello@emberandolive.com?subject=Gift%20card">Gift cards</a></li>
            </ul>
          </div>
        </div>
        <div className="hbl-rs-footer-bottom">
          <span>© 2026 Ember &amp; Olive Hospitality LLC</span>
          <a href="#reserve" className="hbl-rs-footer-cta">
            Reserve a table
            <Ico size={15} stroke={2}>{icons.arrow}</Ico>
          </a>
        </div>
      </div>
    </footer>
  );
}

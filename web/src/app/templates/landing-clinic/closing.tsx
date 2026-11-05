import { Carousel } from "@/registry/hyperblur/carousel";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { Accordion } from "@/registry/hyperblur/accordion";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SectionHead } from "./services";
import { PlanCards } from "./plans";
import { Ico, LogoMark, icons } from "./icons";

const reviews = [
  {
    name: "Hannah Lowe",
    meta: "Patient since 2019 · Whitening",
    text: "I had not been to a dentist in six years because of nerves. Dr. Okafor talked me through every single step and stopped whenever I raised a hand. I actually look forward to my cleanings now.",
    color: "#1fb5a6",
  },
  {
    name: "Marcus Bell",
    meta: "Emergency visit · Cracked molar",
    text: "Called at 8:15 on a Saturday with a cracked molar. Seen at 9:40, crown prepped by 11. They texted me the price before touching anything. Unreal.",
    color: "#ff7a6b",
  },
  {
    name: "Sofia & Leo Grant",
    meta: "Family plan · 2 kids",
    text: "Our five year old asks when he can go back to see the tooth detective. Dr. Raman is magic with kids, and the back-to-back slots save us an afternoon.",
    color: "#0f3b3a",
  },
  {
    name: "Daniel Okoro",
    meta: "Clear aligners · 9 months",
    text: "The 3D scan showed me the end result on day one. Nine months later my smile matches it almost exactly. Check-ins took fifteen minutes each.",
    color: "#3c8f86",
  },
  {
    name: "Priscilla Tan",
    meta: "Implant · Upper left",
    text: "Clear quote, zero upsell, and the implant looks exactly like my own tooth. The membership paid for itself within the first year.",
    color: "#c2604f",
  },
];

const bars = [
  { stars: 5, pct: 91 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function Reviews() {
  return (
    <section id="reviews" className="hbl-cl-section hbl-cl-reviews">
      <div className="hbl-cl-wrap hbl-cl-reviews-grid">
        <div className="hbl-cl-reviews-side">
          <SectionHead kicker="Reviews" title="Neighbours say it" soft="better than we can." />
          <FadeInView distance={14} delay={0.1} className="hbl-cl-score">
            <div className="hbl-cl-score-top">
              <b>4.9</b>
              <div>
                <StarRating value={5} readOnly size={18} color="#ff7a6b" />
                <p>1,240 Google reviews</p>
              </div>
            </div>
            <ul className="hbl-cl-bars" aria-label="Rating breakdown">
              {bars.map((b) => (
                <li key={b.stars}>
                  <span>{b.stars} star</span>
                  <i aria-hidden="true">
                    <em style={{ width: `${b.pct}%` }} />
                  </i>
                  <span>{b.pct}%</span>
                </li>
              ))}
            </ul>
          </FadeInView>
        </div>
        <FadeInView distance={24} delay={0.1} className="hbl-cl-revs-wrap">
          <Carousel className="hbl-cl-revs" gap={20} autoplay={6500} aria-label="Patient reviews">
            {reviews.map((r) => (
              <figure key={r.name} className="hbl-cl-rev">
                <svg className="hbl-cl-rev-quote" width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M10 7.5C7 8.2 5 10.6 5 14v3.5h5V13H7.6c.3-1.6 1.3-2.7 2.9-3.2L10 7.5Zm9 0c-3 .7-5 3.1-5 6.5v3.5h5V13h-2.4c.3-1.6 1.3-2.7 2.9-3.2L19 7.5Z"
                  />
                </svg>
                <StarRating value={5} readOnly size={14} color="#ff7a6b" />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className="hbl-cl-rev-av" style={{ background: r.color }} aria-hidden="true">
                    {initials(r.name)}
                  </span>
                  <span>
                    <b>{r.name}</b>
                    <small>{r.meta}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </FadeInView>
      </div>
    </section>
  );
}

export function Plans() {
  return (
    <section id="plans" className="hbl-cl-section hbl-cl-plans">
      <div className="hbl-cl-wrap">
        <SectionHead
          kicker="No insurance? No problem."
          title="The Halcyon membership,"
          soft="simple and fair."
          text="One flat monthly price covers your preventive care and takes a real discount off everything else. No deductibles, no waiting periods, no claim forms."
          center
        />
        <FadeInView distance={20} delay={0.1}>
          <PlanCards />
        </FadeInView>
      </div>
    </section>
  );
}

const hours = [
  { day: "Monday", time: "8:00 am – 7:00 pm" },
  { day: "Tuesday", time: "8:00 am – 7:00 pm" },
  { day: "Wednesday", time: "8:00 am – 7:00 pm" },
  { day: "Thursday", time: "8:00 am – 7:00 pm", today: true },
  { day: "Friday", time: "8:00 am – 5:00 pm" },
  { day: "Saturday", time: "9:00 am – 3:00 pm" },
  { day: "Sunday", time: "Closed, emergency line open" },
];

function MapArt() {
  return (
    <svg viewBox="0 0 560 380" className="hbl-cl-map-svg" role="img" aria-label="Map showing Halcyon Dental at 214 Larkspur Avenue, beside Wren Park">
      <rect width="560" height="380" fill="#eef7f4" />
      <path d="M0 300c80-20 130 10 200-10s110-70 190-60 120 40 170 20v130H0Z" fill="#cdeee8" />
      <path d="M0 312c80-20 130 10 200-10s110-70 190-60 120 40 170 20" fill="none" stroke="#a7e0d6" strokeWidth="3" />
      <rect x="300" y="40" width="150" height="110" rx="18" fill="#d6efdc" />
      <g fill="#b8e2c3">
        <circle cx="330" cy="72" r="12" />
        <circle cx="360" cy="110" r="15" />
        <circle cx="410" cy="70" r="13" />
        <circle cx="425" cy="120" r="10" />
        <circle cx="388" cy="84" r="8" />
      </g>
      <g fill="#ffffff" stroke="#dbe9e5" strokeWidth="1">
        <rect x="30" y="30" width="110" height="80" rx="10" />
        <rect x="160" y="30" width="110" height="80" rx="10" />
        <rect x="30" y="140" width="110" height="90" rx="10" />
        <rect x="160" y="140" width="110" height="90" rx="10" />
        <rect x="300" y="180" width="70" height="60" rx="10" />
        <rect x="390" y="180" width="140" height="60" rx="10" />
        <rect x="480" y="40" width="60" height="110" rx="10" />
      </g>
      <g stroke="#ffffff" strokeLinecap="round" fill="none">
        <path d="M0 125h560" strokeWidth="18" />
        <path d="M285 0v290" strokeWidth="18" />
        <path d="M150 0v260" strokeWidth="10" />
        <path d="M0 252h560" strokeWidth="10" />
        <path d="M465 0v260" strokeWidth="10" />
      </g>
      <g stroke="#d9e8e4" strokeWidth="1.5" strokeDasharray="6 8" fill="none">
        <path d="M0 125h560" />
        <path d="M285 0v290" />
      </g>
      <path d="M90 340C150 300 220 200 285 160" fill="none" stroke="#1fb5a6" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" className="hbl-cl-map-route" />
      <g fontFamily="var(--font-sans)" fontSize="11" fill="#5d7a78" fontWeight="600" letterSpacing="0.6">
        <text x="20" y="120">LARKSPUR AVE</text>
        <text x="292" y="22" transform="rotate(90 292 22)">WREN ST</text>
        <text x="338" y="166">WREN PARK</text>
        <text x="40" y="270">ALDER LANE</text>
        <text x="380" y="330">BELLMONT CREEK</text>
      </g>
      <g transform="translate(90 340)">
        <circle r="9" fill="#ffffff" stroke="#0f3b3a" strokeWidth="3" />
        <text x="14" y="4" fontSize="11" fontWeight="600" fill="#0f3b3a" fontFamily="var(--font-sans)">
          Bellmont station, 6 min walk
        </text>
      </g>
      <g transform="translate(285 125)">
        <circle r="34" fill="#1fb5a6" opacity="0.18" className="hbl-cl-map-pulse" />
        <circle r="18" fill="#1fb5a6" opacity="0.25" />
        <path d="M0 6c-10-12-16-19-16-27a16 16 0 0 1 32 0c0 8-6 15-16 27Z" fill="#0f3b3a" transform="translate(0 -6)" />
        <circle cy="-27" r="6" fill="#ff7a6b" />
      </g>
      <g transform="translate(312 92)">
        <rect width="150" height="40" rx="12" fill="#0f3b3a" />
        <text x="14" y="17" fontSize="12" fontWeight="700" fill="#ffffff" fontFamily="var(--font-sans)">
          Halcyon Dental
        </text>
        <text x="14" y="31" fontSize="10" fill="#bfe9e1" fontFamily="var(--font-sans)">
          214 Larkspur Ave · Suite 2
        </text>
      </g>
      <g transform="translate(520 340)" fill="#5d7a78">
        <circle r="16" fill="#ffffff" stroke="#dbe9e5" />
        <path d="M0-10l5 14-5-3-5 3Z" fill="#0f3b3a" />
      </g>
    </svg>
  );
}

export function Location() {
  return (
    <section id="visit" className="hbl-cl-section hbl-cl-location">
      <div className="hbl-cl-wrap">
        <SectionHead
          kicker="Visit us"
          title="On Larkspur Avenue,"
          soft="across from Wren Park."
          text="Ground floor, step-free, with free patient parking behind the building on Wren Street."
        />
        <div className="hbl-cl-loc-grid">
          <FadeInView distance={20} className="hbl-cl-map">
            <MapArt />
            <div className="hbl-cl-map-bar">
              <div>
                <b>214 Larkspur Avenue, Suite 2</b>
                <span>Bellmont Heights, CA 94117</span>
              </div>
              <a
                href="https://maps.google.com/?q=214+Larkspur+Avenue+Bellmont+Heights"
                className="hbl-cl-btn hbl-cl-btn-ink hbl-cl-btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Ico size={16}>{icons.pin}</Ico>
                Get directions
              </a>
            </div>
          </FadeInView>
          <div className="hbl-cl-loc-side">
            <FadeInView distance={20} delay={0.08} className="hbl-cl-hours">
              <div className="hbl-cl-hours-head">
                <h3>Opening hours</h3>
                <span className="hbl-cl-open">
                  <i aria-hidden="true" />
                  Open now
                </span>
              </div>
              <table>
                <caption className="hbl-cl-sr">Opening hours, Monday to Sunday</caption>
                <tbody>
                  {hours.map((h) => (
                    <tr key={h.day} data-today={h.today ? "true" : undefined} aria-current={h.today ? "date" : undefined}>
                      <th scope="row">
                        {h.day}
                        {h.today && <span className="hbl-cl-today">Today</span>}
                      </th>
                      <td>{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FadeInView>
            <FadeInView distance={20} delay={0.16} className="hbl-cl-emerg">
              <span className="hbl-cl-emerg-ico" aria-hidden="true">
                <Ico size={22} stroke={2}>{icons.bolt}</Ico>
              </span>
              <div>
                <h3>Dental emergency?</h3>
                <p>Knocked-out tooth, swelling or severe pain. Our on-call dentist answers 7 days a week, 7 am to 10 pm.</p>
                <a href="tel:+14155550199" className="hbl-cl-emerg-phone">
                  <Ico size={18}>{icons.phone}</Ico>
                  (415) 555-0199
                </a>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    id: "insurance",
    title: "Do you take my insurance?",
    content:
      "We are in network with Bluewater Health, Cascade Dental Plan, Northwell Mutual, Harborline, Evergreen PPO and most other PPO plans. Send us a photo of your card when you book and we will confirm your coverage before your visit.",
  },
  {
    id: "nervous",
    title: "I am really nervous about the dentist. Can you help?",
    content:
      "Very often. Tell us when you book and we will add 15 extra minutes, agree on a stop signal, and offer headphones, a weighted blanket or numbing gel. Nitrous oxide is available for longer treatments.",
  },
  {
    id: "kids",
    title: "What age should my child first visit?",
    content:
      "Around their first birthday or first tooth, whichever comes first. The first visit is short and playful: a ride in the chair, a count of their teeth and a sticker. Kids' visits start at $95.",
  },
  {
    id: "cost",
    title: "How much will my treatment cost?",
    content:
      "You will see a written, itemised price for every option before we start, with your insurance or membership discount already applied. Treatments over $500 can be split into 6 or 12 interest-free payments.",
  },
  {
    id: "emergency",
    title: "Can I be seen the same day for an emergency?",
    content:
      "Yes. We keep slots open every weekday and Saturday for urgent cases. Call (415) 555-0199 before noon and 92% of patients are seen the same day.",
  },
  {
    id: "cancel",
    title: "What if I need to cancel or reschedule?",
    content:
      "Change or cancel from the link in your confirmation text, free of charge, up to 24 hours before. Inside 24 hours we ask for a $40 fee, waived for illness or emergencies.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="hbl-cl-section hbl-cl-faq">
      <div className="hbl-cl-wrap hbl-cl-faq-grid">
        <div>
          <SectionHead kicker="FAQ" title="Questions," soft="answered kindly." />
          <FadeInView distance={14} delay={0.1}>
            <p className="hbl-cl-faq-note">
              Something else on your mind? Call the front desk on{" "}
              <a href="tel:+14155550142">(415) 555-0142</a>, Ruth or Malik will pick up.
            </p>
          </FadeInView>
        </div>
        <FadeInView distance={20} delay={0.1}>
          <Accordion className="hbl-cl-acc" items={faqs} defaultOpen={["insurance"]} />
        </FadeInView>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="hbl-cl-section hbl-cl-final-wrap">
      <div className="hbl-cl-wrap">
        <FadeInView distance={24} className="hbl-cl-final">
          <div className="hbl-cl-final-blob hbl-cl-final-blob-a" aria-hidden="true" />
          <div className="hbl-cl-final-blob hbl-cl-final-blob-b" aria-hidden="true" />
          <div className="hbl-cl-final-inner">
            <p className="hbl-cl-kicker hbl-cl-kicker-light">Appointments this week</p>
            <h2 className="hbl-cl-final-title">
              Your calmest dental visit <em>starts here.</em>
            </h2>
            <p className="hbl-cl-final-text">
              14 openings left this week, including today at 2:40 pm. Book online in a minute, or call and talk to a
              real person.
            </p>
            <div className="hbl-cl-hero-ctas hbl-cl-final-ctas">
              <a href="#book" className="hbl-cl-btn hbl-cl-btn-coral">
                Book a visit
                <Ico size={16} stroke={2.2}>{icons.arrow}</Ico>
              </a>
              <a href="tel:+14155550142" className="hbl-cl-btn hbl-cl-btn-glass">
                <Ico size={16}>{icons.phone}</Ico>
                (415) 555-0142
              </a>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

const footerCols = [
  {
    title: "Care",
    links: ["Check-ups & cleaning", "Whitening", "Clear aligners", "Implants", "Kids' dentistry", "Emergency care"],
  },
  { title: "Clinic", links: ["Our dentists", "Smile gallery", "Membership plans", "Insurance", "Careers"] },
  { title: "Patients", links: ["Book a visit", "New patient forms", "Payment plans", "Reviews", "FAQ"] },
];

export function Footer() {
  return (
    <footer className="hbl-cl-footer">
      <div className="hbl-cl-wrap">
        <div className="hbl-cl-foot-grid">
          <div className="hbl-cl-foot-brand">
            <a href="#top" className="hbl-cl-brand" aria-label="Halcyon Dental home">
              <LogoMark />
              <span>
                Halcyon <em>Dental</em>
              </span>
            </a>
            <address>
              214 Larkspur Avenue, Suite 2
              <br />
              Bellmont Heights, CA 94117
            </address>
            <p>
              Mon to Thu 8 am – 7 pm · Fri 8 am – 5 pm
              <br />
              Sat 9 am – 3 pm · Sun closed
            </p>
            <div className="hbl-cl-socials">
              <a href="#top" aria-label="Halcyon Dental on Instagram">
                <Ico size={18}>{icons.instagram}</Ico>
              </a>
              <a href="#top" aria-label="Halcyon Dental on Facebook">
                <Ico size={18}>{icons.facebook}</Ico>
              </a>
              <a href="#reviews" aria-label="Halcyon Dental reviews">
                <Ico size={18}>{icons.star}</Ico>
              </a>
            </div>
          </div>
          {footerCols.map((c) => (
            <nav key={c.title} aria-label={c.title} className="hbl-cl-foot-col">
              <h3>{c.title}</h3>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href={l === "Book a visit" ? "#book" : "#top"}>{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="hbl-cl-foot-call">
            <h3>Call us</h3>
            <a href="tel:+14155550142">(415) 555-0142</a>
            <span>Emergencies</span>
            <a href="tel:+14155550199">(415) 555-0199</a>
          </div>
        </div>
        <div className="hbl-cl-foot-bottom">
          <span>© 2026 Halcyon Dental Group, PC. Dr. Amara Okafor, DDS, license 58214.</span>
          <span>
            <a href="#top">Privacy</a>
            <a href="#top">Accessibility</a>
            <a href="#top">Patient rights</a>
          </span>
        </div>
      </div>
      <div className="hbl-cl-mbar">
        <span>
          <b>Next opening today, 2:40 pm</b>
          <small>Dr. Okafor · Check-up &amp; clean</small>
        </span>
        <a href="#book" className="hbl-cl-btn hbl-cl-btn-coral hbl-cl-btn-sm">
          Book a visit
        </a>
      </div>
    </footer>
  );
}

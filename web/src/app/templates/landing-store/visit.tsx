import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { hours, today } from "./data";
import { ArrowIcon, GiftIcon, PhoneIcon, PinIcon, ReturnIcon, ShieldIcon, TruckIcon } from "./icons";
import { PickupCard } from "./pickup";

const service = [
  { icon: <TruckIcon />, title: "Free shipping over $75", text: "2 to 4 business days, same-day dispatch before 1pm." },
  { icon: <ReturnIcon />, title: "60-day returns", text: "Prepaid label by email, refunds in 5 business days." },
  { icon: <ShieldIcon />, title: "Arrives whole, or free", text: "Every order insured; breakages replaced the same day." },
  { icon: <GiftIcon />, title: "Linen gift wrap", text: "Tied with cotton twine and a handwritten card, $6." },
];

function StreetMap() {
  return (
    <svg viewBox="0 0 480 300" className="hbl-st-map-svg" role="img" aria-label="Map of the flagship at 214 Wythe Avenue, near North 3rd Street in Williamsburg, Brooklyn">
      <rect width="480" height="300" fill="#ebe3d5" />
      <path d="M0 0h70c-10 60 18 120-6 180S60 270 80 300H0Z" fill="#c9d4cf" />
      <path d="M70 0c-10 60 18 120-6 180s-4 90 16 120" fill="none" stroke="#b5c3bd" strokeWidth="3" />
      <text x="16" y="150" fontSize="11" fill="#5f7470" fontFamily="var(--font-grotesk)" letterSpacing="2" transform="rotate(-82 26 150)">
        EAST RIVER
      </text>
      <g fill="#f7f2e9">
        <rect x="104" y="18" width="88" height="62" rx="6" />
        <rect x="214" y="18" width="110" height="62" rx="6" />
        <rect x="346" y="18" width="120" height="62" rx="6" />
        <rect x="104" y="104" width="88" height="80" rx="6" />
        <rect x="346" y="104" width="120" height="80" rx="6" />
        <rect x="104" y="208" width="88" height="80" rx="6" />
        <rect x="214" y="208" width="110" height="80" rx="6" />
        <rect x="346" y="208" width="120" height="80" rx="6" />
      </g>
      <rect x="214" y="104" width="110" height="80" rx="6" fill="#cdd8c4" />
      <g fill="#a9b8a0">
        <circle cx="240" cy="130" r="9" />
        <circle cx="262" cy="156" r="11" />
        <circle cx="296" cy="128" r="10" />
        <circle cx="300" cy="162" r="8" />
      </g>
      <g stroke="#ffffff" strokeWidth="14" strokeLinecap="round">
        <path d="M92 92h388M92 196h388" />
        <path d="M203 0v300M335 0v300" />
      </g>
      <path d="M203 0v300" stroke="#e7c9b6" strokeWidth="5" strokeLinecap="round" />
      <g fontSize="10" fill="#76726a" fontFamily="var(--font-grotesk)" letterSpacing="1">
        <text x="210" y="290" transform="rotate(-90 210 290)">WYTHE AVE</text>
        <text x="390" y="89">N 3RD ST</text>
        <text x="390" y="193">N 1ST ST</text>
        <text x="342" y="290" transform="rotate(-90 342 290)">BERRY ST</text>
        <text x="236" y="120" fill="#5f7470">PARK</text>
      </g>
      <path d="M150 300V250h53v-58h79" fill="none" stroke="#23352b" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="150" cy="296" r="6" fill="#23352b" />
      <g className="hbl-st-pin">
        <circle cx="282" cy="192" r="22" fill="#b86b4b" opacity=".18" className="hbl-st-pin-pulse" />
        <path d="M282 196s-16-14-16-27a16 16 0 0 1 32 0c0 13-16 27-16 27Z" fill="#b86b4b" />
        <circle cx="282" cy="169" r="6" fill="#faf7f2" />
      </g>
      <rect x="296" y="140" width="104" height="26" rx="13" fill="#1c1c1a" />
      <text x="348" y="157" fontSize="11" textAnchor="middle" fill="#faf7f2" fontFamily="var(--font-grotesk)">
        Haven Goods
      </text>
    </svg>
  );
}

export function Visit() {
  return (
    <section id="visit" className="hbl-st-section hbl-st-section-bone">
      <div className="hbl-st-wrap">
        <ul className="hbl-st-service" aria-label="Shipping and returns">
          {service.map((s, i) => (
            <li key={s.title} className="min-w-0">
              <FadeInView delay={i * 0.06} className="hbl-st-service-item">
                <span className="hbl-st-service-icon">{s.icon}</span>
                <div className="min-w-0">
                  <p className="hbl-st-service-title">{s.title}</p>
                  <p className="hbl-st-service-text">{s.text}</p>
                </div>
              </FadeInView>
            </li>
          ))}
        </ul>

        <div className="hbl-st-visit">
          <FadeInView className="hbl-st-visit-map min-w-0">
            <div className="hbl-st-map">
              <StreetMap />
            </div>
            <div className="hbl-st-visit-info">
              <div className="min-w-0">
                <p className="hbl-st-kicker">The flagship</p>
                <h2 className="hbl-st-h3 font-serif">Come touch the linen.</h2>
                <p className="hbl-st-addr">
                  <PinIcon />
                  <span>214 Wythe Avenue, Williamsburg, Brooklyn, NY 11249</span>
                </p>
                <p className="hbl-st-addr">
                  <PhoneIcon />
                  <a href="tel:+17185550142">(718) 555-0142</a>
                </p>
              </div>
              <a
                className="hbl-st-btn hbl-st-btn-ghost"
                href="https://www.google.com/maps/dir/?api=1&destination=214+Wythe+Ave+Brooklyn+NY"
                target="_blank"
                rel="noreferrer"
              >
                Get directions
                <ArrowIcon />
              </a>
            </div>
          </FadeInView>
          <FadeInView delay={0.08} className="hbl-st-hours min-w-0">
            <p className="hbl-st-hours-title">
              Opening hours
              <span className="hbl-st-open">
                <span aria-hidden="true" />
                Open today until 8pm
              </span>
            </p>
            <table>
              <caption className="hbl-st-sr">Flagship opening hours</caption>
              <tbody>
                {hours.map((h) => (
                  <tr key={h.day} data-today={h.day === today} aria-current={h.day === today ? "date" : undefined}>
                    <th scope="row">
                      {h.day}
                      {h.day === today && <span className="hbl-st-today">Today</span>}
                    </th>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="hbl-st-hours-note">Holiday hours: open 9am to 9pm from Dec 1 to Dec 23.</p>
          </FadeInView>
          <FadeInView delay={0.16} className="min-w-0">
            <PickupCard />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

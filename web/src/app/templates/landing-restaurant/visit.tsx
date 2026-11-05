import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Ico, icons } from "./icons";

const hours = [
  { day: "Monday", time: "Closed", today: false },
  { day: "Tuesday", time: "5:00 PM – 10:00 PM", today: false },
  { day: "Wednesday", time: "5:00 PM – 10:00 PM", today: false },
  { day: "Thursday", time: "5:00 PM – 10:00 PM", today: true },
  { day: "Friday", time: "5:00 PM – 11:00 PM", today: false },
  { day: "Saturday", time: "5:00 PM – 11:00 PM", today: false },
  { day: "Sunday", time: "11:00 AM – 3:00 PM, 5:00 – 9:00 PM", today: false },
];

const blocks = [
  [20, 20, 74, 54], [126, 20, 158, 54], [324, 20, 130, 54], [494, 20, 86, 54],
  [20, 106, 74, 78], [126, 106, 158, 78], [494, 106, 86, 78],
  [20, 216, 74, 78], [126, 216, 158, 78], [324, 216, 130, 78], [494, 216, 86, 78],
  [20, 326, 74, 74], [126, 326, 158, 74], [324, 326, 130, 74], [494, 326, 86, 74],
];

function StreetMap() {
  return (
    <svg viewBox="0 0 600 420" className="hbl-rs-map-svg" role="img" aria-label="Map of Hayes Valley showing Ember & Olive at 418 Hayes Street, between Octavia Boulevard and Laguna Street">
      <rect width="600" height="420" fill="#ece2cf" />
      {blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill="#f6efe3" stroke="#e0d2b9" />
      ))}
      <rect x="324" y="106" width="130" height="78" rx="8" fill="#cfd6a8" stroke="#b9c28a" />
      <g fill="#8a9a52" opacity="0.8">
        <circle cx="352" cy="132" r="9" />
        <circle cx="374" cy="150" r="11" />
        <circle cx="420" cy="128" r="8" />
        <circle cx="430" cy="160" r="10" />
      </g>
      <rect x="296" y="0" width="28" height="420" fill="#e2d6c0" />
      <rect x="306" y="0" width="8" height="420" fill="#c2cc94" />
      <g stroke="#d3c4a8" strokeWidth="1" strokeDasharray="6 8">
        <path d="M0 200h600M110 0v420M474 0v420M0 90h600M0 310h600" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="11" fill="#7b6e62" letterSpacing="1">
        <text x="40" y="196">HAYES ST</text>
        <text x="40" y="86">GROVE ST</text>
        <text x="40" y="306">FELL ST</text>
        <text x="118" y="410" transform="rotate(-90 118 410)">GOUGH ST</text>
        <text x="482" y="410" transform="rotate(-90 482 410)">LAGUNA ST</text>
        <text x="330" y="414" transform="rotate(-90 330 414)">OCTAVIA BLVD</text>
        <text x="352" y="178" fill="#4f5a2a">PATRICIA&apos;S GREEN</text>
      </g>
      <path d="M60 248C120 248 180 210 250 204S360 200 392 200" stroke="#c8553d" strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" fill="none" className="hbl-rs-map-route" />
      <g>
        <circle cx="60" cy="248" r="13" fill="#1d1a17" />
        <text x="60" y="252" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="#f6efe3">M</text>
        <text x="42" y="276" fontFamily="var(--font-mono)" fontSize="10" fill="#2a2420">VAN NESS</text>
      </g>
      <g>
        <rect x="236" y="334" width="26" height="26" rx="6" fill="#2a2420" />
        <text x="249" y="352" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="#f6efe3">P</text>
        <text x="200" y="378" fontFamily="var(--font-mono)" fontSize="10" fill="#2a2420">OCTAVIA GARAGE</text>
      </g>
      <g transform="translate(392 200)">
        <circle r="34" fill="#c8553d" opacity="0.18" className="hbl-rs-map-pulse" />
        <circle r="18" fill="#c8553d" opacity="0.22" />
        <path d="M0 0c-14-16-20-24-20-34a20 20 0 0 1 40 0c0 10-6 18-20 34z" fill="#c8553d" stroke="#fffaf1" strokeWidth="3" />
        <circle cy="-34" r="7" fill="#fffaf1" />
      </g>
      <g transform="translate(418 236)">
        <rect width="150" height="44" rx="10" fill="#1d1a17" />
        <text x="14" y="19" fontFamily="var(--font-serif)" fontSize="16" fill="#f6efe3">Ember &amp; Olive</text>
        <text x="14" y="34" fontFamily="var(--font-mono)" fontSize="9.5" fill="#d9cbb6">418 HAYES ST</text>
      </g>
    </svg>
  );
}

export function Visit() {
  return (
    <section id="visit" className="hbl-rs-section hbl-rs-visit">
      <div className="hbl-rs-wrap">
        <div className="hbl-rs-head hbl-rs-head-split">
          <div>
            <p className="hbl-rs-kicker">Visit</p>
            <h2 className="hbl-rs-h2">
              Find us on <em>Hayes Street.</em>
            </h2>
          </div>
          <p className="hbl-rs-sub">Two blocks from the Van Ness Muni station, across from Patricia&apos;s Green.</p>
        </div>
        <div className="hbl-rs-visit-grid">
          <FadeInView className="hbl-rs-min0" distance={20}>
            <div className="hbl-rs-map">
              <StreetMap />
              <div className="hbl-rs-map-bar">
                <div className="hbl-rs-min0">
                  <p className="hbl-rs-map-addr">418 Hayes Street, San Francisco, CA 94102</p>
                  <p className="hbl-rs-mono hbl-rs-muted">Between Octavia Blvd and Laguna St</p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=418+Hayes+Street+San+Francisco+CA"
                  className="hbl-rs-btn hbl-rs-btn-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Ico size={16}>{icons.pin}</Ico>
                  Get directions
                </a>
              </div>
            </div>
          </FadeInView>
          <FadeInView className="hbl-rs-min0" distance={20} delay={0.1}>
            <div className="hbl-rs-hours">
              <div className="hbl-rs-hours-head">
                <h3 className="hbl-rs-h3">Opening hours</h3>
                <span className="hbl-rs-open">
                  <span className="hbl-rs-dot" aria-hidden="true" />
                  Open today
                </span>
              </div>
              <table className="hbl-rs-hours-table">
                <caption className="hbl-rs-sr">Opening hours by day</caption>
                <tbody>
                  {hours.map((h) => (
                    <tr key={h.day} className={h.today ? "hbl-rs-today" : undefined} aria-current={h.today ? "date" : undefined}>
                      <th scope="row">
                        {h.day}
                        {h.today && <span className="hbl-rs-today-tag hbl-rs-mono">Today</span>}
                      </th>
                      <td className={h.time === "Closed" ? "hbl-rs-closed hbl-rs-mono" : "hbl-rs-mono"}>{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="hbl-rs-visit-notes">
                <li>
                  <Ico size={16}>{icons.train}</Ico>
                  <span>Muni lines 21, 47, 49 and the Van Ness station, 4 minutes on foot.</span>
                </li>
                <li>
                  <Ico size={16}>{icons.car}</Ico>
                  <span>Octavia garage on Fell St, $4 per hour after 6 PM. Bike racks by the door.</span>
                </li>
                <li>
                  <Ico size={16}>{icons.phone}</Ico>
                  <a href="tel:+14155550142">(415) 555-0142</a>
                </li>
              </ul>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

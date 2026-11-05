import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ArrowIcon, ClockIcon, PinIcon } from "./icons";

const facilities = [
  { k: "12", v: "Squat racks with platforms" },
  { k: "30 m", v: "Turf sled lane" },
  { k: "14", v: "Bikes and rowers" },
  { k: "6", v: "Heavy bags and a ring" },
  { k: "2", v: "Cold plunges and a sauna" },
  { k: "40", v: "Bike racks out front" },
];

const hours = [
  { d: "Monday", staffed: "5:00 AM to 9:00 PM" },
  { d: "Tuesday", staffed: "5:00 AM to 9:00 PM" },
  { d: "Wednesday", staffed: "5:00 AM to 9:00 PM" },
  { d: "Thursday", staffed: "5:00 AM to 9:00 PM" },
  { d: "Friday", staffed: "5:00 AM to 8:00 PM" },
  { d: "Saturday", staffed: "7:30 AM to 2:00 PM" },
  { d: "Sunday", staffed: "8:30 AM to 6:00 PM" },
];

const today = "Thursday";

function MapArt() {
  return (
    <svg viewBox="0 0 560 380" className="block h-full w-full" role="img" aria-label="Map of Ironbloom at 1418 SE Water Ave, between SE Main and SE Madison, one block from the Eastbank Esplanade">
      <rect width="560" height="380" fill="#10120e" />
      <path d="M-20 40 C 40 90, 30 170, 70 230 S 60 360, 30 420 L -20 420 Z" fill="#1a2a2a" />
      <path d="M-20 40 C 40 90, 30 170, 70 230 S 60 360, 30 420" fill="none" stroke="#2c4141" strokeWidth="2" />
      <text x="20" y="200" fill="#4f6b6b" fontSize="11" fontFamily="var(--font-mono)" transform="rotate(-78 20 200)" letterSpacing="3">WILLAMETTE RIVER</text>
      <path d="M78 0 C 110 90, 100 170, 128 240 S 118 340, 100 400" fill="none" stroke="#2a3a24" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
      <g fill="#161813" stroke="#22251d" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}-${c}`} x={160 + c * 100} y={14 + r * 74} width="84" height="58" rx="4" />
          )),
        )}
      </g>
      <rect x="360" y="162" width="84" height="58" rx="4" fill="#20251a" stroke="#c8ff3d" strokeOpacity="0.4" />
      <g stroke="#2c3026" strokeWidth="14" strokeLinecap="square">
        <path d="M152 0 V380" />
        <path d="M252 0 V380" />
        <path d="M352 0 V380" />
        <path d="M452 0 V380" />
        <path d="M140 80 H560" />
        <path d="M140 154 H560" />
        <path d="M140 228 H560" />
        <path d="M140 302 H560" />
      </g>
      <path d="M150 -10 L310 390" stroke="#33382b" strokeWidth="10" />
      <g fill="#6f7466" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.5">
        <text x="158" y="372" transform="rotate(-90 158 372)">SE WATER AVE</text>
        <text x="258" y="372" transform="rotate(-90 258 372)">SE 2ND AVE</text>
        <text x="458" y="372" transform="rotate(-90 458 372)">SE 3RD AVE</text>
        <text x="470" y="150">SE MAIN ST</text>
        <text x="470" y="224">SE MADISON ST</text>
        <text x="470" y="298">SE HAWTHORNE</text>
      </g>
      <path d="M128 240 C 200 230, 300 200, 402 191" fill="none" stroke="#c8ff3d" strokeWidth="2.5" strokeDasharray="6 7" className="hbl-ft-route" />
      <circle cx="128" cy="240" r="5" fill="#0b0c0a" stroke="#c8ff3d" strokeWidth="2" />
      <text x="96" y="262" fill="#8b8f82" fontSize="10" fontFamily="var(--font-mono)">ESPLANADE</text>
      <g transform="translate(402 191)">
        <circle r="26" fill="#c8ff3d" opacity="0.14" className="hbl-ft-ping" />
        <circle r="12" fill="#c8ff3d" opacity="0.25" />
        <path d="M0 -6 C -9 -24, -20 -30, -20 -42 A 20 20 0 0 1 20 -42 C 20 -30, 9 -24, 0 -6 Z" fill="#c8ff3d" />
        <circle cy="-42" r="7" fill="#0b0c0a" />
        <circle r="3.5" fill="#c8ff3d" />
      </g>
      <g transform="translate(360 108)">
        <rect width="120" height="30" rx="15" fill="#0b0c0a" stroke="rgba(241,240,232,.18)" />
        <text x="60" y="19.5" textAnchor="middle" fill="#f1f0e8" fontSize="12" fontWeight="700" fontFamily="var(--font-grotesk)" letterSpacing="1">IRONBLOOM</text>
      </g>
      <g transform="translate(520 34)" fill="#8b8f82" fontSize="10" fontFamily="var(--font-mono)">
        <circle r="14" fill="none" stroke="rgba(241,240,232,.2)" />
        <path d="M0 -9 L4 3 L0 0 L-4 3 Z" fill="#f1f0e8" />
        <text y="28" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}

export function FitnessVisit() {
  return (
    <section id="hbl-ft-visit" aria-labelledby="hbl-ft-visit-title" className="border-t py-24 hbl-ft-rule md:py-32">
      <div className="hbl-ft-wrap">
        <FadeInView className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="hbl-ft-kicker">Visit</p>
            <h2 id="hbl-ft-visit-title" className="hbl-ft-h2 mt-5">
              8,000 sq ft of <span className="hbl-ft-lime">iron</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed hbl-ft-muted">
            A converted print works on the Central Eastside, two minutes from the Esplanade and the Hawthorne Bridge bike lane.
          </p>
        </FadeInView>

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <FadeInView className="min-w-0">
            <div className="hbl-ft-map">
              <MapArt />
              <div className="hbl-ft-map-card">
                <p className="flex items-start gap-2 text-[14px]">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#c8ff3d]" />
                  <span>
                    1418 SE Water Ave
                    <br />
                    <span className="hbl-ft-muted">Portland, OR 97214</span>
                  </span>
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1418+SE+Water+Ave+Portland+OR"
                  className="hbl-ft-btn hbl-ft-btn-sm mt-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border hbl-ft-rule hbl-ft-statgrid sm:grid-cols-3">
              {facilities.map((f) => (
                <li key={f.v} className="hbl-ft-fac min-w-0">
                  <span className="block font-mono text-2xl text-[#f1f0e8]">{f.k}</span>
                  <span className="mt-1 block text-[13px] leading-snug hbl-ft-muted">{f.v}</span>
                </li>
              ))}
            </ul>
          </FadeInView>

          <FadeInView delay={0.08} className="hbl-ft-panelcard min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-grotesk text-2xl font-bold uppercase tracking-[-0.03em]">
                <ClockIcon className="h-5 w-5 text-[#c8ff3d]" />
                Hours
              </h3>
              <span className="hbl-ft-open">
                <span className="hbl-ft-chip-dot" aria-hidden="true" />
                Open 24/7
              </span>
            </div>
            <p className="mt-3 text-[14px] hbl-ft-muted">
              Members train <b className="text-[#f1f0e8]">24/7</b> with their key fob. Front desk and coaches are on site during staffed hours.
            </p>
            <table className="mt-6 w-full text-[14px]">
              <caption className="sr-only">Staffed hours</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col" className="hbl-ft-mono-label pb-3 font-normal">Day</th>
                  <th scope="col" className="hbl-ft-mono-label pb-3 text-right font-normal">Staffed</th>
                </tr>
              </thead>
              <tbody>
                {hours.map((h) => {
                  const isToday = h.d === today;
                  return (
                    <tr key={h.d} className="hbl-ft-hour" data-today={isToday ? "" : undefined} aria-current={isToday ? "date" : undefined}>
                      <th scope="row" className="py-2.5 text-left font-normal">
                        {h.d}
                        {isToday ? <span className="hbl-ft-today ml-2">Today</span> : null}
                      </th>
                      <td className="py-2.5 text-right font-mono text-[13px]">{h.staffed}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-6 space-y-2 border-t pt-5 text-[13px] hbl-ft-muted hbl-ft-rule">
              <p>Free parking for members in the lot on SE Main after 5 PM and all weekend.</p>
              <p>
                Questions?{" "}
                <a href="tel:+15035550148" className="hbl-ft-link font-mono text-[#f1f0e8]">
                  (503) 555-0148
                </a>
              </p>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

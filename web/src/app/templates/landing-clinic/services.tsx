import { SpotlightCard, SpotlightGroup } from "@/registry/hyperblur/spotlight-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ImageCompare } from "@/registry/hyperblur/image-compare";
import { Ico, icons } from "./icons";

const services = [
  {
    icon: icons.tooth,
    title: "Check-ups & cleaning",
    text: "A full exam, low-dose digital X-rays and a 45 minute hygienist clean that never feels rushed.",
    price: "from $145",
    time: "45 min",
  },
  {
    icon: icons.sparkle,
    title: "Whitening",
    text: "In-chair whitening in one 90 minute session, or custom trays to brighten gently at home.",
    price: "from $390",
    time: "90 min",
  },
  {
    icon: icons.aligner,
    title: "Clear aligners",
    text: "A free 3D scan shows your finished smile before you commit. Most plans finish in 6 to 14 months.",
    price: "from $3,200",
    time: "Free scan",
  },
  {
    icon: icons.implant,
    title: "Implants",
    text: "Planned in 3D, placed in-house by Dr. Okafor, with a natural crown matched to your shade.",
    price: "from $2,950",
    time: "2 visits",
  },
  {
    icon: icons.kids,
    title: "Kids' dentistry",
    text: "Ceiling cartoons, a sticker wall and a gentle first visit from age one. Parents stay in the room.",
    price: "from $95",
    time: "30 min",
  },
  {
    icon: icons.bolt,
    title: "Emergency care",
    text: "Chipped, knocked out or throbbing? Call before noon and we will see you the same day.",
    price: "$180 exam",
    time: "Same day",
  },
];

export function SectionHead({
  kicker,
  title,
  soft,
  text,
  center,
}: {
  kicker: string;
  title: string;
  soft?: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <FadeInView distance={16} className={center ? "hbl-cl-head hbl-cl-head-center" : "hbl-cl-head"}>
      <p className="hbl-cl-kicker">{kicker}</p>
      <h2 className="hbl-cl-h2">
        {title} {soft && <em>{soft}</em>}
      </h2>
      {text && <p className="hbl-cl-sub">{text}</p>}
    </FadeInView>
  );
}

export function Services() {
  return (
    <section id="services" className="hbl-cl-section">
      <div className="hbl-cl-wrap">
        <div className="hbl-cl-head-row">
          <SectionHead
            kicker="Services"
            title="Everything your smile needs,"
            soft="in one calm place."
            text="From a toddler's first visit to a full set of implants, the same small team looks after you."
          />
          <FadeInView distance={16} delay={0.1}>
            <a href="#book" className="hbl-cl-btn hbl-cl-btn-ink">
              Book a visit
              <Ico size={16} stroke={2.2}>{icons.arrow}</Ico>
            </a>
          </FadeInView>
        </div>
        <SpotlightGroup className="hbl-cl-svc-grid">
          {services.map((s, i) => (
            <FadeInView key={s.title} delay={(i % 3) * 0.08} distance={20} className="hbl-cl-svc-cell">
              <SpotlightCard className="hbl-cl-svc" color="#1fb5a6" size={340} radius={24} idle={0}>
                <span className="hbl-cl-svc-ico">
                  <Ico size={24}>{s.icon}</Ico>
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="hbl-cl-svc-foot">
                  <span>{s.price}</span>
                  <span className="hbl-cl-svc-time">
                    <Ico size={14}>{icons.clock}</Ico>
                    {s.time}
                  </span>
                </div>
              </SpotlightCard>
            </FadeInView>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}

const upperX = [53, 85, 119, 157, 201, 245, 283, 317];
const upperW = [30, 32, 36, 42, 42, 36, 32, 30];

function Smile({ after }: { after?: boolean }) {
  const tooth = after ? "#fdfdf8" : "#e9d9a6";
  const shade = after ? "#e3ece9" : "#c9b37a";
  const gum = after ? "#e98d8a" : "#d77f78";
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={after ? "hbl-cl-sk-a" : "hbl-cl-sk-b"} cx="50%" cy="40%" r="75%">
          <stop offset="0" stopColor={after ? "#f6d9c4" : "#efd3bf"} />
          <stop offset="1" stopColor={after ? "#d9a587" : "#cf9f86"} />
        </radialGradient>
        <linearGradient id={after ? "hbl-cl-tt-a" : "hbl-cl-tt-b"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tooth} />
          <stop offset="1" stopColor={shade} />
        </linearGradient>
        <clipPath id={after ? "hbl-cl-mouth-a" : "hbl-cl-mouth-b"}>
          <path d="M70 130c40-14 90-18 130-18s90 4 130 18c-14 52-66 86-130 86S84 182 70 130Z" />
        </clipPath>
      </defs>
      <rect width="400" height="300" fill={`url(#${after ? "hbl-cl-sk-a" : "hbl-cl-sk-b"})`} />
      <path
        d="M40 128c30-34 90-50 160-36 70-14 130 2 160 36-24 76-88 118-160 118S64 204 40 128Z"
        fill={after ? "#c9635d" : "#b9625b"}
      />
      <path d="M70 130c40-14 90-18 130-18s90 4 130 18c-14 52-66 86-130 86S84 182 70 130Z" fill="#4a1f22" />
      <g clipPath={`url(#${after ? "hbl-cl-mouth-a" : "hbl-cl-mouth-b"})`}>
        <path d="M60 110h280v34c-50-10-230-10-280 0Z" fill={gum} />
        {upperX.map((x, i) => {
          const off = after ? 0 : [0, 2, -3, 4, 0, -2, 5, 1][i];
          const rot = after ? 0 : [0, -3, 4, -6, 2, 5, -4, 0][i];
          const w = upperW[i] - (after ? 1 : 2);
          const h = after ? 52 : 46 + (i % 3) * 3;
          const y = 116 + Math.round(Math.abs(i - 3.5) * 3) + off;
          return (
            <g key={x} transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
              <rect x={x} y={y} width={w} height={h} rx={after ? 9 : 7} fill={`url(#${after ? "hbl-cl-tt-a" : "hbl-cl-tt-b"})`} />
              {after && <rect x={x + 5} y={y + 6} width={4} height={h - 22} rx={2} fill="#ffffff" opacity="0.85" />}
            </g>
          );
        })}
        <path d="M60 222c50-18 230-18 280 0v20H60Z" fill={gum} />
        {[96, 140, 180, 220, 260, 300].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={after ? 186 : 188 + (i % 2) * 4}
            width={after ? 38 : 36}
            height={34}
            rx={8}
            fill={after ? "#f1f4ef" : "#d8c48e"}
          />
        ))}
      </g>
      <path
        d="M70 130c40-14 90-18 130-18s90 4 130 18"
        fill="none"
        stroke={after ? "#b1514d" : "#a5544e"}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {after && (
        <g fill="#ffffff">
          <path d="M318 96l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" opacity="0.9" />
          <path d="M92 210l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}

const results = [
  { label: "Shades brighter", value: "7" },
  { label: "Visits", value: "3" },
  { label: "Weeks", value: "5" },
];

export function Results() {
  return (
    <section id="results" className="hbl-cl-section hbl-cl-results">
      <div className="hbl-cl-wrap hbl-cl-results-grid">
        <div className="hbl-cl-results-copy">
          <SectionHead
            kicker="Smile gallery"
            title="Small changes,"
            soft="a whole new smile."
            text="Drag the handle to compare. Maya, 34, came in for one chipped front tooth and left with whitening, two bonded edges and a 3 month aligner touch-up."
          />
          <FadeInView distance={14} delay={0.1}>
            <dl className="hbl-cl-results-stats">
              {results.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="hbl-cl-ticks">
              <li>
                <Ico size={18} stroke={2.2}>{icons.check}</Ico>
                Every plan priced line by line before we begin
              </li>
              <li>
                <Ico size={18} stroke={2.2}>{icons.check}</Ico>
                Shade matched by Dr. Okafor in natural daylight
              </li>
              <li>
                <Ico size={18} stroke={2.2}>{icons.check}</Ico>
                12 month bonding guarantee
              </li>
            </ul>
          </FadeInView>
        </div>
        <FadeInView distance={24} delay={0.1} className="hbl-cl-compare-wrap">
          <ImageCompare
            className="hbl-cl-compare"
            before={<Smile />}
            after={<Smile after />}
            initial={46}
            labels={{ before: "Before", after: "After 5 weeks" }}
          />
          <p className="hbl-cl-compare-note">Illustration based on a real Halcyon treatment plan.</p>
        </FadeInView>
      </div>
    </section>
  );
}

import { Stepper } from "@/registry/hyperblur/stepper";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { SectionHead } from "./services";
import { Ico, icons } from "./icons";

const steps = [
  {
    id: "arrive",
    title: "Arrive",
    icon: icons.cup,
    time: "10 min",
    heading: "Settle in, no clipboard",
    text: "Your forms are done on your phone the night before. Grab a chamomile tea, pick a playlist for the ceiling screen and tell us anything that makes you nervous.",
    points: ["Free parking on Wren Street", "Step-free entrance", "Weighted blanket on request"],
  },
  {
    id: "scan",
    title: "Scan",
    icon: icons.scan,
    time: "15 min",
    heading: "A 3D scan instead of goopy molds",
    text: "Low-dose digital X-rays and a 90 second intraoral scan build a model of your mouth you can spin around on the chairside screen.",
    points: ["80% less radiation than film", "No impression trays", "Scan saved for future aligners"],
  },
  {
    id: "talk",
    title: "Talk",
    icon: icons.chat,
    time: "15 min",
    heading: "Your plan, priced line by line",
    text: "Your dentist walks you through what is urgent, what can wait and what is purely cosmetic. Every option has a price before anything starts, and your insurance is checked live.",
    points: ["Nothing done without a yes", "Written plan emailed to you", "Interest-free payment plans"],
  },
  {
    id: "clean",
    title: "Clean",
    icon: icons.sparkle,
    time: "45 min",
    heading: "A thorough, gentle clean",
    text: "Your hygienist takes the full 45 minutes: ultrasonic scaling, a polish with the flavour you choose and a fluoride varnish. You leave with your next visit already in your calendar.",
    points: ["Numbing gel on request", "Mint, berry or unflavoured", "Reminder texts, never calls"],
  },
];

export function FirstVisit() {
  return (
    <section className="hbl-cl-section hbl-cl-visit">
      <div className="hbl-cl-wrap hbl-cl-visit-grid">
        <div className="hbl-cl-visit-copy">
          <SectionHead
            kicker="Your first visit"
            title="Ninety minutes,"
            soft="zero surprises."
            text="New patients get a longer first appointment so nobody has to hurry. Here is exactly what happens, step by step."
          />
          <FadeInView distance={14} delay={0.1}>
            <div className="hbl-cl-visit-price">
              <div>
                <span>New patient exam, X-rays and clean</span>
                <b>$195</b>
              </div>
              <div>
                <span>With any Halcyon membership</span>
                <b className="hbl-cl-teal">Included</b>
              </div>
            </div>
          </FadeInView>
        </div>
        <FadeInView distance={24} delay={0.1} className="hbl-cl-stepper-card">
          <Stepper
            className="hbl-cl-stepper"
            labels={{ back: "Previous", next: "Next step", finish: "All set" }}
            steps={steps.map((s, i) => ({
              id: s.id,
              title: s.title,
              content: (
                <div className="hbl-cl-step">
                  <div className="hbl-cl-step-top">
                    <span className="hbl-cl-step-ico">
                      <Ico size={22}>{s.icon}</Ico>
                    </span>
                    <span className="hbl-cl-step-meta">
                      Step {i + 1} of {steps.length} · {s.time}
                    </span>
                  </div>
                  <h3>{s.heading}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>
                        <Ico size={16} stroke={2.2}>{icons.check}</Ico>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </FadeInView>
      </div>
    </section>
  );
}

const team = [
  {
    name: "Dr. Amara Okafor",
    role: "Founder · Cosmetic & implants",
    bio: "DDS from UCSF, 18 years in practice. Calm hands, terrible puns.",
    langs: "English, Igbo",
    next: "Today 2:40 pm",
    skin: "#8a5a3c",
    hair: "#1d1412",
    shirt: "#1fb5a6",
    bg: ["#d9f3ee", "#a7e4da"],
    style: 0,
  },
  {
    name: "Dr. Lucas Brandt",
    role: "Orthodontics · Clear aligners",
    bio: "Has fitted 2,100 aligner plans. Will show you your future smile in 3D.",
    langs: "English, German",
    next: "Fri 9:20 am",
    skin: "#e8bfa0",
    hair: "#7a5435",
    shirt: "#0f3b3a",
    bg: ["#ffe4df", "#ffc2b8"],
    style: 1,
  },
  {
    name: "Dr. Priya Raman",
    role: "Pediatric dentistry",
    bio: "Kids know her as the tooth detective. Parents know her as patient.",
    langs: "English, Tamil, Spanish",
    next: "Sat 9:40 am",
    skin: "#b07a55",
    hair: "#2a1b17",
    shirt: "#ff7a6b",
    bg: ["#e5f0ff", "#c4dafa"],
    style: 2,
  },
  {
    name: "Dr. Theo Marchetti",
    role: "Root canals · Emergencies",
    bio: "The one you call at 8 am with a swollen jaw. Usually fixes it by lunch.",
    langs: "English, Italian",
    next: "Today 4:00 pm",
    skin: "#d9a682",
    hair: "#3b3330",
    shirt: "#3c8f86",
    bg: ["#f2efe4", "#e2dbc3"],
    style: 3,
  },
];

function Portrait({ p, id }: { p: (typeof team)[number]; id: string }) {
  const hair = [
    <path key="0" d="M58 74c-4-30 16-48 42-48s46 18 42 48c-2-12-10-20-18-22-8 8-30 10-50 4-8 4-14 10-16 18Z" />,
    <path key="1" d="M62 70c0-26 16-40 38-40s38 12 38 34c-6-8-14-12-22-12-10 0-24-6-30-12-6 10-14 18-24 30Z" />,
    <path key="2" d="M56 78c-6-34 14-54 44-54s50 20 44 54c4 20 6 46-2 66l-12-2c4-20 4-40-2-58-10 4-40 4-56-8-6 18-6 44-2 66l-12 2c-8-20-6-46-2-66Z" />,
    <path key="3" d="M62 66c2-22 18-34 38-34 22 0 38 14 38 34-4-6-10-8-14-8l-24-4-24 4c-6 2-10 4-14 8Z" />,
  ];
  return (
    <svg viewBox="0 0 200 200" className="hbl-cl-portrait" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.bg[0]} />
          <stop offset="1" stopColor={p.bg[1]} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
      <circle cx="160" cy="40" r="46" fill="#ffffff" opacity="0.35" />
      <path d="M30 200c6-40 34-62 70-62s64 22 70 62Z" fill={p.shirt} />
      <path d="M84 142h32l-4 18c-4 6-20 6-24 0Z" fill={p.skin} />
      <path d="M74 150l26 26 26-26" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinejoin="round" opacity="0.85" />
      <ellipse cx="100" cy="88" rx="38" ry="44" fill={p.skin} />
      <g fill={p.hair}>{hair[p.style]}</g>
      <path d="M86 108c8 6 20 6 28 0" fill="none" stroke="#5a2f2a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="86" cy="88" r="3" fill="#2a1b17" />
      <circle cx="114" cy="88" r="3" fill="#2a1b17" />
      {p.style === 1 && (
        <g fill="none" stroke="#1d1412" strokeWidth="2.5">
          <circle cx="86" cy="88" r="9" />
          <circle cx="114" cy="88" r="9" />
          <path d="M95 88h10" />
        </g>
      )}
    </svg>
  );
}

export function Team() {
  return (
    <section id="team" className="hbl-cl-section">
      <div className="hbl-cl-wrap">
        <SectionHead
          kicker="Meet the dentists"
          title="Four dentists who"
          soft="know you by name."
          text="Small on purpose. You see the same dentist and the same hygienist every time, so nothing gets lost between visits."
          center
        />
        <div className="hbl-cl-team-grid">
          {team.map((p, i) => (
            <FadeInView key={p.name} delay={i * 0.08} distance={20} className="hbl-cl-team-cell">
              <TiltCard maxTilt={7} scale={1.02} glare className="hbl-cl-team-card">
                <Portrait p={p} id={`hbl-cl-pt-${i}`} />
                <div className="hbl-cl-team-body">
                  <h3>{p.name}</h3>
                  <p className="hbl-cl-team-role">{p.role}</p>
                  <p className="hbl-cl-team-bio">{p.bio}</p>
                  <div className="hbl-cl-team-foot">
                    <span>
                      <Ico size={14}>{icons.globe}</Ico>
                      {p.langs}
                    </span>
                    <span className="hbl-cl-team-next">
                      <Ico size={14}>{icons.calendar}</Ico>
                      {p.next}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

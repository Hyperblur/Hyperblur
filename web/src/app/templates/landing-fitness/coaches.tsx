import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const coaches = [
  {
    name: "Dana Whitfield",
    role: "Head of strength",
    note: "Former D1 thrower. Coached 41 members to their first bodyweight deadlift.",
    certs: "NSCA-CSCS · USAW L2",
    stat: "190 kg deadlift",
    tone: "#c8ff3d",
    pose: 0,
  },
  {
    name: "Marcus Bell",
    role: "Conditioning lead",
    note: "Writes every Engine HIIT session around heart-rate zones, never around burpees for their own sake.",
    certs: "ACE · CF-L2",
    stat: "2:58 500 m row",
    tone: "#ff5a1f",
    pose: 1,
  },
  {
    name: "Ines Moreau",
    role: "Mobility and juniors",
    note: "Physical therapist by training. Runs Mobility Reset and the Junior Athletes program.",
    certs: "DPT · FRC Mobility Specialist",
    stat: "11 yrs in clinic",
    tone: "#f1f0e8",
    pose: 2,
  },
  {
    name: "Ray Castillo",
    role: "Boxing coach",
    note: "Golden Gloves finalist in 2016. Teaches the jab before anything else, every single time.",
    certs: "USA Boxing L2",
    stat: "62 amateur bouts",
    tone: "#c8ff3d",
    pose: 3,
  },
];

function Portrait({ tone, pose, initials }: { tone: string; pose: number; initials: string }) {
  const tilt = [-6, 4, -2, 7][pose];
  return (
    <svg viewBox="0 0 300 340" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`hbl-ft-pg-${pose}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d2019" />
          <stop offset="100%" stopColor="#0d0e0b" />
        </linearGradient>
        <linearGradient id={`hbl-ft-pb-${pose}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tone} stopOpacity="0.95" />
          <stop offset="100%" stopColor={tone} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="300" height="340" fill={`url(#hbl-ft-pg-${pose})`} />
      <text x="150" y="196" textAnchor="middle" fontFamily="var(--font-grotesk)" fontWeight="700" fontSize="170" fill="none" stroke="rgba(241,240,232,.08)" strokeWidth="1.5">
        {initials}
      </text>
      <circle cx="150" cy="150" r="118" fill="none" stroke={tone} strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="150" cy="150" r="90" fill="none" stroke={tone} strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 7" />
      <g transform={`rotate(${tilt} 150 230)`}>
        <path d="M58 340c4-70 40-112 92-112s88 42 92 112z" fill={`url(#hbl-ft-pb-${pose})`} />
        <path d="M128 228h44l-6 26h-32z" fill="#0b0c0a" opacity="0.35" />
        <rect x="135" y="186" width="30" height="46" rx="12" fill={tone} opacity="0.7" />
        <ellipse cx="150" cy="150" rx="40" ry="46" fill={tone} />
        <path d="M110 140c2-30 20-44 40-44s38 14 40 44c-12-10-26-14-40-14s-28 4-40 14z" fill="#0b0c0a" opacity="0.55" />
      </g>
      <rect x="0" y="280" width="300" height="60" fill={`url(#hbl-ft-pg-${pose})`} opacity="0.5" />
    </svg>
  );
}

export function FitnessCoaches() {
  return (
    <section id="hbl-ft-coaches" aria-labelledby="hbl-ft-coaches-title" className="border-t py-24 hbl-ft-rule md:py-32">
      <div className="hbl-ft-wrap">
        <FadeInView className="max-w-3xl">
          <p className="hbl-ft-kicker">Coaches</p>
          <h2 id="hbl-ft-coaches-title" className="hbl-ft-h2 mt-5">
            People who <span className="hbl-ft-lime">know your</span> numbers
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed hbl-ft-muted">
            Every coach is certified, full time and on the floor at least 25 hours a week. No rotating subs, no strangers counting your reps.
          </p>
        </FadeInView>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coaches.map((c, i) => {
            const initials = c.name
              .split(" ")
              .map((w) => w[0])
              .join("");
            return (
              <li key={c.name} className="min-w-0">
                <FadeInView delay={i * 0.08} className="h-full">
                  <TiltCard maxTilt={7} scale={1.015} className="hbl-ft-coach">
                    <div className="hbl-ft-coach-art">
                      <Portrait tone={c.tone} pose={c.pose} initials={initials} />
                      <span className="hbl-ft-coach-stat">{c.stat}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-grotesk text-xl font-bold uppercase tracking-[-0.03em]">{c.name}</h3>
                      <p className="mt-0.5 font-mono text-[12px] uppercase tracking-[0.08em] hbl-ft-lime">{c.role}</p>
                      <p className="mt-3 text-[14px] leading-relaxed hbl-ft-muted">{c.note}</p>
                      <p className="mt-4 border-t pt-3 font-mono text-[11px] hbl-ft-muted hbl-ft-rule">{c.certs}</p>
                    </div>
                  </TiltCard>
                </FadeInView>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

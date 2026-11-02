import type { ReactNode } from "react";
import { Carousel } from "@/registry/hyperblur/carousel";
import { FlipCard } from "@/registry/hyperblur/flip-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { CountUp } from "@/registry/hyperblur/count-up";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { LikeBurst } from "@/registry/hyperblur/like-burst";
import { SectionHead } from "./features";
import { people } from "./hero";
import { Ico, PlantArt, icons } from "./icons";

type PlantVariant = "monstera" | "snake" | "pothos" | "zz" | "fiddle" | "calathea";

const plants: {
  variant: PlantVariant;
  name: string;
  latin: string;
  level: string;
  bg: string;
  pot: string;
  rim: string;
  water: string;
  light: string;
  pets: string;
  tip: string;
}[] = [
  {
    variant: "pothos",
    name: "Golden pothos",
    latin: "Epipremnum aureum",
    level: "Unkillable",
    bg: "#e8f5c8",
    pot: "#e07a5f",
    rim: "#c8664c",
    water: "Every 7 to 10 days",
    light: "Low to bright, indirect",
    pets: "Keep away from cats",
    tip: "Trailing too long? Snip below a node and root it in water. Free plant.",
  },
  {
    variant: "snake",
    name: "Snake plant",
    latin: "Dracaena trifasciata",
    level: "Beginner",
    bg: "#f6e3d8",
    pot: "#f7f5ef",
    rim: "#e6dfcf",
    water: "Every 2 to 3 weeks",
    light: "Any corner will do",
    pets: "Keep away from dogs",
    tip: "The most common way to kill it is love. Let the soil dry out completely.",
  },
  {
    variant: "monstera",
    name: "Monstera",
    latin: "Monstera deliciosa",
    level: "Easy",
    bg: "#dcefd0",
    pot: "#14532d",
    rim: "#0f3f22",
    water: "Every 7 to 9 days",
    light: "Bright, indirect",
    pets: "Keep away from pets",
    tip: "Give it a moss pole and it will reward you with bigger, holier leaves.",
  },
  {
    variant: "zz",
    name: "ZZ plant",
    latin: "Zamioculcas zamiifolia",
    level: "Unkillable",
    bg: "#f3ecd6",
    pot: "#e07a5f",
    rim: "#c8664c",
    water: "Every 3 weeks",
    light: "Shade tolerant",
    pets: "Keep away from pets",
    tip: "Thick rhizomes store water, so it shrugs off a forgotten month.",
  },
  {
    variant: "calathea",
    name: "Calathea",
    latin: "Goeppertia orbifolia",
    level: "Intermediate",
    bg: "#e3efe6",
    pot: "#f7f5ef",
    rim: "#e6dfcf",
    water: "Keep soil lightly moist",
    light: "Medium, indirect",
    pets: "Pet safe",
    tip: "Crispy edges mean dry air. Group it with friends or run a small humidifier.",
  },
  {
    variant: "fiddle",
    name: "Fiddle leaf fig",
    latin: "Ficus lyrata",
    level: "Drama queen",
    bg: "#fbe7c6",
    pot: "#14532d",
    rim: "#0f3f22",
    water: "Every 8 to 10 days",
    light: "Bright, a little sun",
    pets: "Keep away from pets",
    tip: "Hates being moved. Pick a spot, give it a quarter turn each week, then leave it be.",
  },
];

function CareRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li>
      <Ico size={15}>{icon}</Ico>
      <span>{children}</span>
    </li>
  );
}

export function Plants() {
  return (
    <section id="plants" className="hbl-mb-section hbl-mb-plants">
      <div className="hbl-mb-wrap">
        <div className="hbl-mb-plants-head">
          <SectionHead
            align="left"
            eyebrow="Starter shelf"
            title={
              <>
                Start with the <em>forgiving</em> ones.
              </>
            }
            lede="Hover or tap a card to flip it. Every plant in Fernly comes with a care sheet written by our in-house horticulturists."
          />
        </div>
        <FadeInView distance={24} delay={0.1}>
          <Carousel gap={20} autoplay={4200} className="hbl-mb-carousel" aria-label="Starter plants">
            {plants.map((p) => (
              <FlipCard
                key={p.name}
                className="hbl-mb-flip"
                aria-label={`${p.name}, ${p.level}. Flip for care tips.`}
                front={
                  <span className="hbl-mb-pc" style={{ background: p.bg }}>
                    <span className="hbl-mb-pc-level">{p.level}</span>
                    <PlantArt variant={p.variant} pot={p.pot} rim={p.rim} bg={p.bg} className="hbl-mb-pc-art" />
                    <span className="hbl-mb-pc-name">{p.name}</span>
                    <span className="hbl-mb-pc-latin">{p.latin}</span>
                  </span>
                }
                back={
                  <span className="hbl-mb-pc hbl-mb-pc-back">
                    <span className="hbl-mb-pc-name">{p.name}</span>
                    <ul className="hbl-mb-pc-care">
                      <CareRow icon={icons.drop}>{p.water}</CareRow>
                      <CareRow icon={icons.sun}>{p.light}</CareRow>
                      <CareRow icon={icons.shield}>{p.pets}</CareRow>
                    </ul>
                    <span className="hbl-mb-pc-tip">{p.tip}</span>
                    <span className="hbl-mb-pc-add">
                      <Ico size={14} stroke={2.2}>{icons.plus}</Ico>
                      Add to my jungle
                    </span>
                  </span>
                }
              />
            ))}
          </Carousel>
        </FadeInView>
      </div>
    </section>
  );
}

const challenges = [
  { title: "Propagate a pothos", month: "November challenge", joined: 4812, tone: "#bef264" },
  { title: "Swap a cutting nearby", month: "Weekend swap", joined: 1290, tone: "#e07a5f" },
  { title: "Thirty days, zero yellow leaves", month: "Streak club", joined: 9054, tone: "#f7f5ef" },
];

const members = [
  ...people,
  { name: "Ana Souza", color: "#a16207" },
  { name: "Jonah Park", color: "#166534" },
  { name: "Sara Lindqvist", color: "#c2410c" },
];

export function Community() {
  return (
    <section id="community" className="hbl-mb-community">
      <div className="hbl-mb-community-glow" aria-hidden="true" />
      <div className="hbl-mb-wrap hbl-mb-community-grid">
        <div className="min-w-0">
          <SectionHead
            align="left"
            tone="dark"
            eyebrow="Community"
            title={
              <>
                The friendliest corner of <em>the internet.</em>
              </>
            }
            lede="Show off a new leaf, ask why the Calathea is curling, trade cuttings with someone three streets away. No ads, no dunking, just plant people."
          />
          <FadeInView delay={0.1} distance={16}>
            <div className="hbl-mb-members">
              <AvatarStack people={members} size={44} max={8} ring="#14532d" />
              <span>
                <b>310,000 members</b>
                <small>in 2,140 local groups</small>
              </span>
            </div>
          </FadeInView>
          <div className="hbl-mb-comm-stats">
            <FadeInView delay={0.15} distance={14} className="min-w-0">
              <div>
                <b>
                  <CountUp to={86400} duration={2} />
                </b>
                <span>photos shared this week</span>
              </div>
            </FadeInView>
            <FadeInView delay={0.22} distance={14} className="min-w-0">
              <div>
                <b>
                  <CountUp to={12300} duration={2} />
                </b>
                <span>cuttings swapped</span>
              </div>
            </FadeInView>
            <FadeInView delay={0.29} distance={14} className="min-w-0">
              <div>
                <b>
                  <CountUp to={4} suffix=" min" duration={1.4} />
                </b>
                <span>median time to an answer</span>
              </div>
            </FadeInView>
          </div>
        </div>
        <div className="hbl-mb-challenges min-w-0">
          {challenges.map((c, i) => (
            <FadeInView key={c.title} delay={0.1 + i * 0.1} direction="left" distance={28}>
              <article className="hbl-mb-challenge">
                <span className="hbl-mb-challenge-dot" style={{ background: c.tone }} aria-hidden="true">
                  <Ico size={18}>{i === 0 ? icons.leaf : i === 1 ? icons.swap : icons.flame}</Ico>
                </span>
                <span className="hbl-mb-challenge-t">
                  <small>{c.month}</small>
                  <b>{c.title}</b>
                  <span>{c.joined.toLocaleString("en-US")} joined</span>
                </span>
                <a href="#download" className="hbl-mb-join">
                  Join
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
    name: "Hannah Brooks",
    when: "October 2026",
    title: "My fiddle leaf finally forgives me",
    text: "Three years of dropped leaves, gone. The watering math told me I was drowning it every Sunday. Now it has eleven new leaves and I have a smug face.",
    rating: 5,
    helpful: 214,
    tone: "#e07a5f",
  },
  {
    name: "Daniel Okafor",
    when: "September 2026",
    title: "The streak got me",
    text: "I came for plant ID, stayed for the streak. 112 days. My partner says I talk to the Monstera more than to them.",
    rating: 5,
    helpful: 98,
    tone: "#14532d",
  },
  {
    name: "Lucia Ferraro",
    when: "October 2026",
    title: "Gentle, not naggy",
    text: "One nudge a morning, always with a reason. It is the only notification I actually look forward to.",
    rating: 5,
    helpful: 61,
    tone: "#65a30d",
  },
  {
    name: "Sam Whitaker",
    when: "August 2026",
    title: "Vacation mode is genius",
    text: "Left 23 plants with my neighbour for two weeks. She got a checklist with photos, I got peace of mind, everyone survived.",
    rating: 5,
    helpful: 177,
    tone: "#b45309",
  },
  {
    name: "Aiko Tanaka",
    when: "October 2026",
    title: "ID is scary accurate",
    text: "It named a Hoya kerrii from a blurry photo taken at a garden centre. Then told me it would take two years to bloom. Honest app.",
    rating: 4,
    helpful: 42,
    tone: "#0f766e",
  },
  {
    name: "Marcus Bell",
    when: "July 2026",
    title: "Worth the Plus upgrade",
    text: "The pest doctor caught thrips on my Alocasia before they spread to the whole shelf. Paid for itself in one afternoon.",
    rating: 5,
    helpful: 89,
    tone: "#c2410c",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

export function Reviews() {
  return (
    <section className="hbl-mb-section" aria-labelledby="hbl-mb-reviews-title">
      <div className="hbl-mb-wrap">
        <FadeInView distance={18}>
          <div className="hbl-mb-head hbl-mb-head-center hbl-mb-head-light">
            <span className="hbl-mb-eyebrow-pill">Reviews</span>
            <h2 id="hbl-mb-reviews-title" className="hbl-mb-h2">
              212,000 ratings, <em>mostly happy tears.</em>
            </h2>
            <div className="hbl-mb-review-score">
              <StarRating value={4.9} precision={0.5} readOnly size={22} color="#e07a5f" aria-label="Rated 4.9 out of 5" />
              <span>4.9 out of 5</span>
            </div>
          </div>
        </FadeInView>
        <div className="hbl-mb-reviews">
          {reviews.map((r, i) => (
            <FadeInView key={r.name} delay={(i % 3) * 0.1} distance={22} className="hbl-mb-review-cell">
              <article className="hbl-mb-review">
                <div className="hbl-mb-review-top">
                  <StarRating value={r.rating} readOnly size={15} color="#e07a5f" />
                  <small>{r.when}</small>
                </div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                <div className="hbl-mb-review-foot">
                  <span className="hbl-mb-review-who">
                    <span className="hbl-mb-ava" style={{ background: r.tone }}>
                      {initials(r.name)}
                    </span>
                    {r.name}
                  </span>
                  <LikeBurst count={r.helpful} size={17} color="#e07a5f" label={`Mark review by ${r.name} as helpful`} />
                </div>
              </article>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

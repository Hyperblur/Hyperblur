import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "@/registry/hyperblur/count-up";
import { Marquee } from "@/registry/hyperblur/marquee";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { Drift } from "./drift";
import { Ico, PlantArt, icons } from "./icons";
import { NudgeScreen, Phone, ProfileScreen } from "./phone";

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <FadeInView distance={18}>
      <div className={`hbl-mb-head hbl-mb-head-${align} hbl-mb-head-${tone}`}>
        <span className="hbl-mb-eyebrow-pill">{eyebrow}</span>
        <h2 className="hbl-mb-h2">{title}</h2>
        {lede && <p className="hbl-mb-head-lede">{lede}</p>}
      </div>
    </FadeInView>
  );
}

const press = [
  { quote: "The first plant app that feels like a friend instead of a chore chart.", source: "The Windowsill Review" },
  { quote: "Identified my grandmother's mystery succulent in under two seconds.", source: "Pocket Botanist" },
  { quote: "Delightfully calm. The streaks are the right amount of smug.", source: "Greenroom Magazine" },
  { quote: "Editor's pick for the best new habit app of the season.", source: "Daily Sprout" },
  { quote: "Fernly made me a person who owns forty plants. Send help.", source: "Homebody Weekly" },
  { quote: "The watering math alone saved half my shelf from root rot.", source: "Leaf & Lens" },
];

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="18" height="34" viewBox="0 0 18 34" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M14 32C6 27 3 18 6 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {[8, 13, 18, 23, 28].map((y, i) => (
        <ellipse key={y} cx={4.5 + i * 0.3} cy={y - 2} rx="2" ry="4" fill="currentColor" transform={`rotate(-35 ${4.5 + i * 0.3} ${y - 2})`} />
      ))}
    </svg>
  );
}

const stats = [
  { to: 2.4, decimals: 1, suffix: "M", label: "downloads in 31 countries" },
  { to: 4.9, decimals: 1, suffix: "", label: "average from 212,000 ratings", stars: true },
  { to: 18000, decimals: 0, suffix: "", label: "species Fernly can name" },
  { to: 1.7, decimals: 1, suffix: "M", label: "plants saved from overwatering" },
];

export function Proof() {
  return (
    <section className="hbl-mb-proof" aria-label="Fernly in numbers">
      <div className="hbl-mb-wrap">
        <div className="hbl-mb-stats">
          {stats.map((s, i) => (
            <FadeInView key={s.label} delay={i * 0.08} distance={16} className="min-w-0">
              <div className="hbl-mb-stat">
                <span className="hbl-mb-stat-n">
                  <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} duration={1.8} />
                </span>
                {s.stars && <StarRating value={5} readOnly size={14} color="#e07a5f" aria-hidden="true" />}
                <span className="hbl-mb-stat-l">{s.label}</span>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
      <Marquee speed={0.55} gap={18} className="hbl-mb-press">
        {press.map((p) => (
          <figure key={p.source} className="hbl-mb-press-card">
            <span className="hbl-mb-press-laurel">
              <Laurel />
              <span>Editors&apos; choice</span>
              <Laurel flip />
            </span>
            <blockquote>{p.quote}</blockquote>
            <figcaption>{p.source}</figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}

function hash(i: number) {
  return ((i * 2654435761) >>> 0) % 997;
}

export function Bento() {
  return (
    <section id="features" className="hbl-mb-section">
      <div className="hbl-mb-wrap">
        <SectionHead
          eyebrow="Features"
          title={
            <>
              Everything your jungle needs, <em>in one pot.</em>
            </>
          }
          lede="Fernly turns plant care into a two minute morning ritual. Small tasks, clear reasons, and a little celebration when you keep going."
        />
        <div className="hbl-mb-bento">
          <FadeInView className="hbl-mb-b-streak min-w-0" distance={20}>
            <div className="hbl-mb-card hbl-mb-card-lime">
              <div className="hbl-mb-card-copy">
                <span className="hbl-mb-card-ic">
                  <Ico size={18}>{icons.flame}</Ico>
                </span>
                <h3>Streaks that grow like a garden</h3>
                <p>Every day you check in, a leaf sprouts. Miss one? Your Sunday freeze keeps the streak alive.</p>
              </div>
              <div className="hbl-mb-garden" aria-hidden="true">
                {Array.from({ length: 42 }, (_, i) => {
                  const lvl = i === 41 ? 4 : 1 + (hash(i + 3) % 3);
                  return (
                    <span key={i} data-l={lvl} style={{ "--hbl-mb-d": `${(i * 0.035).toFixed(3)}s` } as CSSProperties}>
                      <svg viewBox="0 0 20 20">
                        <path d="M10 18V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M10 11C5.6 11 3 8.4 3 4c4.4 0 7 2.6 7 7z" fill="currentColor" />
                        <path d="M10 9c3.6 0 6-2.2 6-6-3.6 0-6 2.2-6 6z" fill="currentColor" opacity=".7" />
                      </svg>
                    </span>
                  );
                })}
              </div>
              <div className="hbl-mb-garden-foot">
                <b>42 days</b>
                <span>Best run 58 · 6 freezes left</span>
              </div>
            </div>
          </FadeInView>

          <FadeInView className="hbl-mb-b-id min-w-0" delay={0.08} distance={20}>
            <div className="hbl-mb-card hbl-mb-card-ink">
              <div className="hbl-mb-card-copy">
                <span className="hbl-mb-card-ic">
                  <Ico size={18}>{icons.camera}</Ico>
                </span>
                <h3>Name any plant in two seconds</h3>
                <p>Point, snap, done. 18,000 species, plus pests, spots and yellowing leaves.</p>
              </div>
              <div className="hbl-mb-mini-scan" aria-hidden="true">
                <PlantArt variant="calathea" className="hbl-mb-mini-plant" bg="#1d4a2c" pot="#e07a5f" />
                <span className="hbl-mb-scanline" />
                <span className="hbl-mb-mini-result">
                  <b>Calathea orbifolia</b>
                  <small>94% match · 1.8 s</small>
                </span>
              </div>
            </div>
          </FadeInView>

          <FadeInView className="hbl-mb-b-light min-w-0" delay={0.12} distance={20}>
            <div className="hbl-mb-card">
              <div className="hbl-mb-card-copy">
                <span className="hbl-mb-card-ic">
                  <Ico size={18}>{icons.sun}</Ico>
                </span>
                <h3>A light meter in your pocket</h3>
                <p>Hold your phone where the plant lives. Fernly reads the lux and suggests a better spot.</p>
              </div>
              <div className="hbl-mb-gauge" aria-hidden="true">
                <svg viewBox="0 0 200 110">
                  <defs>
                    <linearGradient id="hbl-mb-gauge-g" x1="0" x2="1">
                      <stop offset="0" stopColor="#14532d" />
                      <stop offset=".55" stopColor="#bef264" />
                      <stop offset="1" stopColor="#e07a5f" />
                    </linearGradient>
                  </defs>
                  <path d="M20 100a80 80 0 0 1 160 0" fill="none" stroke="rgba(20,83,45,.1)" strokeWidth="14" strokeLinecap="round" />
                  <path d="M20 100a80 80 0 0 1 160 0" fill="none" stroke="url(#hbl-mb-gauge-g)" strokeWidth="14" strokeLinecap="round" />
                  <g className="hbl-mb-needle">
                    <path d="M100 100L100 34" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" />
                    <circle cx="100" cy="100" r="8" fill="#14532d" />
                    <circle cx="100" cy="100" r="3" fill="#bef264" />
                  </g>
                </svg>
                <span className="hbl-mb-gauge-v">
                  <b>2,840 lux</b>
                  <small>Bright indirect, perfect for Mabel</small>
                </span>
              </div>
            </div>
          </FadeInView>

          <FadeInView className="hbl-mb-b-water min-w-0" delay={0.16} distance={20}>
            <div className="hbl-mb-card hbl-mb-card-terra">
              <div className="hbl-mb-card-copy">
                <span className="hbl-mb-card-ic">
                  <Ico size={18}>{icons.drop}</Ico>
                </span>
                <h3>Watering math, done for you</h3>
                <p>Pot size, soil mix, season and your local weather, folded into one number.</p>
              </div>
              <div className="hbl-mb-water" aria-hidden="true">
                <div className="hbl-mb-glass">
                  <span className="hbl-mb-glass-fill" />
                  <span className="hbl-mb-glass-ticks" />
                </div>
                <div className="hbl-mb-water-t">
                  <b>240 ml</b>
                  <span>18 cm pot · terracotta</span>
                  <span>Rain tomorrow, so skip Thursday</span>
                </div>
              </div>
            </div>
          </FadeInView>

          <FadeInView className="hbl-mb-b-vac min-w-0" delay={0.1} distance={20}>
            <div className="hbl-mb-card hbl-mb-card-wide">
              <div className="hbl-mb-card-copy">
                <span className="hbl-mb-card-ic">
                  <Ico size={18}>{icons.plane}</Ico>
                </span>
                <h3>Vacation mode, finally</h3>
                <p>
                  Share a plant-sitter link. Your friend gets a simple checklist with photos of each pot, and you get a
                  thumbs up when it&apos;s done.
                </p>
              </div>
              <div className="hbl-mb-vac" aria-hidden="true">
                <div className="hbl-mb-vac-trip">
                  <span>Lisbon</span>
                  <i />
                  <Ico size={16}>{icons.plane}</Ico>
                  <i />
                  <span>Kyoto</span>
                  <small>12 days · 9 plants</small>
                </div>
                <ul className="hbl-mb-vac-list">
                  <li data-done="true">
                    <span className="hbl-mb-check hbl-mb-check-on">
                      <Ico size={12} stroke={2.6}>{icons.check}</Ico>
                    </span>
                    Tomas watered the Monstera
                    <small>Mon</small>
                  </li>
                  <li data-done="true">
                    <span className="hbl-mb-check hbl-mb-check-on">
                      <Ico size={12} stroke={2.6}>{icons.check}</Ico>
                    </span>
                    Calathea misted, photo attached
                    <small>Tue</small>
                  </li>
                  <li>
                    <span className="hbl-mb-check">
                      <Ico size={12} stroke={2.6}>{icons.check}</Ico>
                    </span>
                    Rotate the fiddle leaf a quarter turn
                    <small>Thu</small>
                  </li>
                </ul>
                <div className="hbl-mb-vac-sitter">
                  <AvatarStack
                    people={[
                      { name: "Tomas Reyes", color: "#14532d" },
                      { name: "Ines Alves", color: "#e07a5f" },
                    ]}
                    size={30}
                    ring="#fffdf8"
                  />
                  <span>Tomas is on duty</span>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

function Bullet({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <li className="hbl-mb-bullet">
      <span className="hbl-mb-bullet-ic">
        <Ico size={17}>{icon}</Ico>
      </span>
      <span>
        <b>{title}</b>
        <span>{text}</span>
      </span>
    </li>
  );
}

export function Splits() {
  return (
    <section className="hbl-mb-section hbl-mb-splits" aria-label="How Fernly works">
      <div className="hbl-mb-wrap">
        <div className="hbl-mb-split">
          <div className="hbl-mb-split-copy min-w-0">
            <SectionHead
              align="left"
              eyebrow="Plant profiles"
              title={
                <>
                  Every plant gets a name, a mood and <em>a plan.</em>
                </>
              }
              lede="Snap a photo and Fernly builds a care plan around your actual home: the way your window faces, how dry your heating runs, how big the pot really is."
            />
            <FadeInView delay={0.1} distance={16}>
              <ul className="hbl-mb-bullets">
                <Bullet icon={icons.sun} title="Plans that follow the seasons" text="Water less in January, feed more in May. Fernly adjusts without you asking." />
                <Bullet icon={icons.bug} title="Pest doctor" text="Spots, webs, sticky leaves. Get a diagnosis and a three step fix." />
                <Bullet icon={icons.leaf} title="A care journal you will reread" text="Photos, new leaves and repots on one timeline, ready to share." />
              </ul>
            </FadeInView>
          </div>
          <div className="hbl-mb-split-art min-w-0">
            <div className="hbl-mb-disc hbl-mb-disc-lime" aria-hidden="true" />
            <FadeInView distance={40} duration={0.9}>
              <Drift depth={0.07}>
                <div className="hbl-mb-float" style={{ animationDelay: "-1.2s" }}>
                  <Phone label="Plant profile screen for a fiddle leaf fig named Mabel">
                    <ProfileScreen />
                  </Phone>
                </div>
              </Drift>
            </FadeInView>
            <Drift depth={0.16} className="hbl-mb-split-chip">
              <div className="hbl-mb-chip">
                <span className="hbl-mb-chip-ic" style={{ background: "#bef264" }}>
                  <Ico size={16}>{icons.leaf}</Ico>
                </span>
                <span>
                  <b>New leaf spotted</b>
                  <small>Mabel · leaf number 14</small>
                </span>
              </div>
            </Drift>
          </div>
        </div>

        <div className="hbl-mb-split hbl-mb-split-rev">
          <div className="hbl-mb-split-copy min-w-0">
            <SectionHead
              align="left"
              eyebrow="Daily nudges"
              title={
                <>
                  Nudges that know your windowsill, <em>not just the calendar.</em>
                </>
              }
              lede="No more watering on a fixed schedule. Fernly checks the forecast, the season and your last check-in, then sends one friendly reminder at the time you pick."
            />
            <FadeInView delay={0.1} distance={16}>
              <ul className="hbl-mb-bullets">
                <Bullet icon={icons.bell} title="One nudge a day, max" text="Everything bundled into a single morning note. Snooze it with a swipe." />
                <Bullet icon={icons.drop} title="Weather aware" text="A heatwave in Seville or rain in Leeds changes the plan automatically." />
                <Bullet icon={icons.shield} title="Quiet hours" text="Nothing before 7 or after 9, unless you ask for it." />
              </ul>
            </FadeInView>
          </div>
          <div className="hbl-mb-split-art min-w-0">
            <div className="hbl-mb-disc hbl-mb-disc-terra" aria-hidden="true" />
            <FadeInView distance={40} duration={0.9}>
              <Drift depth={0.07}>
                <div className="hbl-mb-float" style={{ animationDelay: "-3.4s" }}>
                  <Phone label="Lock screen with three Fernly reminders" dark>
                    <NudgeScreen />
                  </Phone>
                </div>
              </Drift>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}

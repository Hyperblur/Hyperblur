import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { ImageCompare } from "@/registry/hyperblur/image-compare";
import { CountUp } from "@/registry/hyperblur/count-up";
import { HairBack, LookArt, Portrait, type LookKind } from "./art";
import { serviceGroups, stylists } from "./data";
import { Ico, icons } from "./icons";

export function Heading({
  eyebrow,
  title,
  em,
  lede,
  center = false,
}: {
  eyebrow: string;
  title: string;
  em?: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <FadeInView distance={16} className={center ? "hbl-sl-head hbl-sl-head-center" : "hbl-sl-head"}>
      <p className="hbl-sl-eyebrow">{eyebrow}</p>
      <h2 className="hbl-sl-h2">
        {title} {em && <em>{em}</em>}
      </h2>
      {lede && <p className="hbl-sl-sub">{lede}</p>}
    </FadeInView>
  );
}

export function Services() {
  const left = serviceGroups.filter((g) => g.id === "cut" || g.id === "beard" || g.id === "treatments");
  const right = serviceGroups.filter((g) => g.id === "colour" || g.id === "balayage");
  return (
    <section id="services" className="hbl-sl-section">
      <div className="hbl-sl-wrap">
        <div className="hbl-sl-split-head">
          <Heading
            eyebrow="The menu"
            title="Priced by service,"
            em="never by surprise."
            lede="Prices shown are for our stylists. Senior stylists add $10, master stylists add $25. Long or extra-thick hair may take longer on colour."
          />
          <FadeInView delay={0.1} distance={16}>
            <a href="#book" className="hbl-sl-btn hbl-sl-btn-ghost">
              Book from the menu
              <Ico size={16} stroke={2}>{icons.arrow}</Ico>
            </a>
          </FadeInView>
        </div>
        <div className="hbl-sl-menu">
          {[left, right].map((col, ci) => (
            <div key={ci} className="hbl-sl-menu-col">
              {col.map((g, gi) => (
                <FadeInView key={g.id} delay={gi * 0.08} distance={18} className="hbl-sl-menu-group">
                  <div className="hbl-sl-menu-gh">
                    <h3>{g.title}</h3>
                    <p>{g.note}</p>
                  </div>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.name} className="hbl-sl-menu-row">
                        <div className="hbl-sl-menu-main">
                          <span className="hbl-sl-menu-name">{it.name}</span>
                          <span className="hbl-sl-menu-dots" aria-hidden="true" />
                          <span className="hbl-sl-menu-price">
                            {it.from && <small>from </small>}${it.price}
                          </span>
                        </div>
                        <div className="hbl-sl-menu-sub">
                          <span>{it.detail}</span>
                          <span className="hbl-sl-menu-dur">
                            <Ico size={13}>{icons.clock}</Ico>
                            {it.duration}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </FadeInView>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stylists() {
  return (
    <section id="stylists" className="hbl-sl-section hbl-sl-section-blush">
      <div className="hbl-sl-wrap">
        <Heading
          eyebrow="The chairs"
          title="Meet the people"
          em="behind the mirror."
          lede="Every stylist trains with us for a year before taking a book of their own. Pick someone by specialty, or by whoever is free soonest."
          center
        />
        <div className="hbl-sl-team">
          {stylists.map((s, i) => (
            <FadeInView key={s.id} delay={(i % 3) * 0.08} distance={22} className="hbl-sl-team-cell">
              <TiltCard maxTilt={6} scale={1.015} className="hbl-sl-team-tilt">
                <article className="hbl-sl-team-card">
                  <div className="hbl-sl-team-art">
                    <Portrait s={s} />
                    <span className="hbl-sl-team-level">{s.level}</span>
                  </div>
                  <div className="hbl-sl-team-body">
                    <h3>{s.name}</h3>
                    <p className="hbl-sl-team-role">{s.role}</p>
                    <ul className="hbl-sl-tags" aria-label={`${s.name} specialties`}>
                      {s.specialties.map((sp) => (
                        <li key={sp}>{sp}</li>
                      ))}
                    </ul>
                    <div className="hbl-sl-team-next">
                      <span>
                        <span className="hbl-sl-live-dot" aria-hidden="true" />
                        Next free
                      </span>
                      <strong>{s.next}</strong>
                    </div>
                    <a href="#book" className="hbl-sl-team-link">
                      Book with {s.name.split(" ")[0]}
                      <Ico size={14} stroke={2}>{icons.arrow}</Ico>
                    </a>
                  </div>
                </article>
              </TiltCard>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Transformation() {
  return (
    <section className="hbl-sl-section">
      <div className="hbl-sl-wrap hbl-sl-ba-grid">
        <div className="hbl-sl-ba-copy">
          <Heading
            eyebrow="Transformation of the month"
            title="From box dye"
            em="to honey balayage."
            lede="Hannah came in with three years of home colour. Noor lifted it in two sessions with a bond builder, painted the ends and finished with a warm gloss. Drag the handle to see it."
          />
          <FadeInView delay={0.1} distance={16}>
            <dl className="hbl-sl-ba-stats">
              <div>
                <dt>In the chair</dt>
                <dd>
                  <CountUp to={4.5} decimals={1} suffix=" h" />
                </dd>
              </div>
              <div>
                <dt>Tones painted</dt>
                <dd>
                  <CountUp to={3} />
                </dd>
              </div>
              <div>
                <dt>Breakage</dt>
                <dd>
                  <CountUp to={0} suffix="%" />
                </dd>
              </div>
            </dl>
            <p className="hbl-sl-ba-credit">Colour by Noor Haddad · Full balayage, from $295</p>
          </FadeInView>
        </div>
        <FadeInView delay={0.1} distance={22} className="hbl-sl-ba-frame">
          <ImageCompare
            className="hbl-sl-compare"
            before={<HairBack after={false} />}
            after={<HairBack after />}
            initial={46}
            labels={{ before: "Before", after: "After" }}
          />
        </FadeInView>
      </div>
    </section>
  );
}

const looks: { kind: LookKind; name: string; by: string; span: string }[] = [
  { kind: "waves", name: "Honey balayage", by: "Noor · 4 h", span: "hbl-sl-look-tall" },
  { kind: "bob", name: "Copper blunt bob", by: "Lucia · 75 min", span: "" },
  { kind: "platinum", name: "Platinum crop", by: "Jun · 3 h", span: "" },
  { kind: "vivid", name: "Rose quartz vivid", by: "Jun · 3 h", span: "hbl-sl-look-wide" },
  { kind: "coils", name: "Defined coils", by: "Ama · 90 min", span: "" },
  { kind: "fade", name: "Mid skin fade", by: "Theo · 50 min", span: "hbl-sl-look-tall" },
  { kind: "gloss", name: "Glass blowout", by: "Lucia · 45 min", span: "" },
  { kind: "bangs", name: "Curtain bangs", by: "Lucia · 15 min", span: "" },
];

export function Lookbook() {
  return (
    <section id="lookbook" className="hbl-sl-section hbl-sl-section-dark">
      <div className="hbl-sl-wrap">
        <div className="hbl-sl-split-head">
          <Heading
            eyebrow="Lookbook · Autumn 2026"
            title="This season,"
            em="from our chairs."
            lede="Every look below left the salon this month. Hover a swatch to see who made it and how long it took."
          />
          <FadeInView delay={0.1} distance={16}>
            <a href="#book" className="hbl-sl-btn hbl-sl-btn-light">
              Book this look
              <Ico size={16} stroke={2}>{icons.arrow}</Ico>
            </a>
          </FadeInView>
        </div>
        <div className="hbl-sl-looks">
          {looks.map((l, i) => (
            <FadeInView key={l.kind} delay={(i % 4) * 0.06} distance={18} className={`hbl-sl-look ${l.span}`}>
              <a href="#book" className="hbl-sl-look-inner" aria-label={`${l.name} by ${l.by}. Book this look`}>
                <LookArt kind={l.kind} />
                <span className="hbl-sl-look-cap">
                  <span className="hbl-sl-look-name">{l.name}</span>
                  <span className="hbl-sl-look-by">{l.by}</span>
                </span>
              </a>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

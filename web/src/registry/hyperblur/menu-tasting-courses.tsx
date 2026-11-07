"use client";

import * as React from "react";

export interface MenuTastingCourse {
  name: string;
  description: string;
  pairing: string;
  note?: string;
  tags?: ("gf" | "vegetarian" | "new")[];
}

export interface MenuTastingCoursesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  restaurant?: string;
  title?: string;
  subtitle?: string;
  chef?: string;
  courses?: MenuTastingCourse[];
  price?: number;
  pairingPrice?: number;
  pairingLabel?: string;
  defaultPairing?: boolean;
  defaultGuests?: number;
  maxGuests?: number;
  accent?: string;
  onSubmit?: (request: { guests: number; pairing: boolean; perPerson: number; total: number }) => void;
}

const defaultCourses: MenuTastingCourse[] = [
  { name: "Oyster, cucumber, dill", description: "Kumamoto oyster under a cold cucumber granita, dill oil and finger lime.", pairing: "Pierre Péters, Blanc de Blancs, Champagne NV", note: "Oysters arrive each morning from Hama Hama, Washington.", tags: ["gf"] },
  { name: "Beetroot, smoked cream, rye", description: "Salt-baked beets, whipped smoked crème fraîche, crisp rye and blackcurrant.", pairing: "Dönnhoff Riesling Kabinett, Nahe 2021", note: "Beets from Two Wolves Farm, roasted in salt for four hours.", tags: ["vegetarian"] },
  { name: "Scallop, brown butter, celeriac", description: "Seared Hokkaido scallop, celeriac purée, hazelnut brown butter.", pairing: "Domaine Laroche, Chablis Premier Cru 2020", note: "Our most requested course since we opened in 2019." },
  { name: "Agnolotti, chestnut, sage", description: "Hand-pinched pasta filled with roasted chestnut, sage butter, aged parmesan.", pairing: "Benanti, Etna Bianco 2021", note: "Rolled by hand an hour before service.", tags: ["vegetarian"] },
  { name: "Halibut, mussel beurre blanc", description: "Line-caught halibut, mussel and vermouth sauce, charred leek, trout roe.", pairing: "Domaine Vacheron, Sancerre 2022", tags: ["gf", "new"] },
  { name: "Dry-aged duck, plum, endive", description: "Fourteen-day aged duck breast, smoked plum, bitter endive, jus gras.", pairing: "Felton Road Pinot Noir, Central Otago 2019", note: "Aged in-house on the bone, finished over binchotan." },
  { name: "Pear, buckwheat, brown butter", description: "Poached Bosc pear, toasted buckwheat crumble, brown butter ice cream.", pairing: "Royal Tokaji, Aszú 5 Puttonyos 2016", tags: ["vegetarian"] },
];

const tagLabel = { gf: "Gluten-free", vegetarian: "Vegetarian", new: "New this season" };

function TagIcon({ tag }: { tag: "gf" | "vegetarian" | "new" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
      {tag === "gf" ? <path {...p} d="M12 21V8m0 0c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zm0 6c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zM4 4l16 16" /> : null}
      {tag === "vegetarian" ? <path {...p} d="M12 21v-8m0 0c0-4 3-7 7-7 0 4-3 7-7 7zm0 2c0-3-2-5-5-5 0 3 2 5 5 5z" /> : null}
      {tag === "new" ? <path {...p} d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /> : null}
    </svg>
  );
}

function Glass() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h10l-1 6a4 4 0 0 1-8 0zM12 13v7M8 21h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.6 7h8.8l-.3 2a4 4 0 0 1-8.2 0z" fill="currentColor" opacity=".45" />
    </svg>
  );
}

const css = `
.hb-mb3 {
  --hb-mb3-accent: #c9a45c;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  color: #ece6dc;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  background:
    radial-gradient(50% 40% at 15% 0%, color-mix(in srgb, var(--hb-mb3-accent) 16%, transparent), transparent 70%),
    radial-gradient(40% 50% at 100% 100%, rgba(120, 60, 30, .18), transparent 70%),
    #0c0a08;
  -webkit-font-smoothing: antialiased;
}
.hb-mb3 *, .hb-mb3 *::before, .hb-mb3 *::after { box-sizing: border-box; }
.hb-mb3 em, .hb-mb3 i, .hb-mb3 cite { font-style: normal; }
.hb-mb3-wrap { max-width: 1120px; margin: 0 auto; padding: 72px 24px 96px; display: grid; grid-template-columns: minmax(0, 380px) minmax(0, 1fr); gap: 64px; align-items: start; }
.hb-mb3-side { position: sticky; top: 24px; min-width: 0; }
.hb-mb3-rest { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 22px; color: var(--hb-mb3-accent); font-family: var(--font-grotesk, inherit); font-size: 13px; font-weight: 600; letter-spacing: .32em; text-transform: uppercase; }
.hb-mb3-rest::before { content: ""; width: 28px; height: 1px; background: currentColor; }
.hb-mb3-title { margin: 0; font-family: var(--font-grotesk, var(--font-sans, ui-sans-serif, system-ui, sans-serif)); font-weight: 400; font-size: clamp(36px, 4.8cqw, 54px); line-height: 1.04; letter-spacing: -.03em; color: #f5efe4; }
.hb-mb3-title em { color: var(--hb-mb3-accent); }
.hb-mb3-sub { margin: 16px 0 0; color: #a39a8c; font-size: 15.5px; line-height: 1.65; }
.hb-mb3-chef { display: flex; align-items: center; gap: 12px; margin-top: 22px; color: #bfb5a6; font-size: 13.5px; }
.hb-mb3-mono { display: grid; place-items: center; flex: none; width: 38px; height: 38px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--hb-mb3-accent) 55%, transparent); color: var(--hb-mb3-accent); font-family: var(--font-grotesk, inherit); font-size: 13px; font-weight: 600; letter-spacing: .06em; }
.hb-mb3-card { margin-top: 28px; padding: 22px; border-radius: 22px; background: linear-gradient(180deg, rgba(255, 255, 255, .045), rgba(255, 255, 255, .015)); border: 1px solid rgba(236, 230, 220, .1); box-shadow: 0 1px 0 rgba(255, 255, 255, .06) inset, 0 40px 60px -40px rgba(0, 0, 0, .8); }
.hb-mb3-pp { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid rgba(236, 230, 220, .08); }
.hb-mb3-pp span { color: #a39a8c; font-size: 13px; }
.hb-mb3-pp b { font-family: var(--font-grotesk, inherit); font-size: 34px; font-weight: 500; letter-spacing: -.02em; font-variant-numeric: tabular-nums; color: #f5efe4; }
.hb-mb3-pp small { color: #a39a8c; font-size: 13px; font-weight: 400; margin-left: 4px; letter-spacing: 0; }
.hb-mb3-opt { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(236, 230, 220, .08); }
.hb-mb3-opt-l b { display: block; font-size: 14.5px; font-weight: 600; color: #f0e9de; }
.hb-mb3-opt-l span { display: block; margin-top: 2px; color: #8f877a; font-size: 12.5px; }
.hb-mb3-switch { position: relative; flex: none; width: 50px; height: 28px; padding: 0; border-radius: 999px; border: 1px solid rgba(236, 230, 220, .16); background: #1b1814; cursor: pointer; transition: background .3s, border-color .3s; }
.hb-mb3-switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #8f877a; transition: transform .35s cubic-bezier(.3, 1.4, .5, 1), background .3s; }
.hb-mb3-switch[aria-checked="true"] { background: color-mix(in srgb, var(--hb-mb3-accent) 30%, #1b1814); border-color: var(--hb-mb3-accent); }
.hb-mb3-switch[aria-checked="true"]::after { transform: translateX(22px); background: var(--hb-mb3-accent); }
.hb-mb3-stepper { display: inline-flex; align-items: center; gap: 4px; padding: 3px; border-radius: 999px; border: 1px solid rgba(236, 230, 220, .14); }
.hb-mb3-stepper button { display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 50%; background: transparent; color: #ece6dc; font: inherit; font-size: 16px; cursor: pointer; transition: background .2s; }
.hb-mb3-stepper button:hover:not(:disabled) { background: rgba(236, 230, 220, .08); }
.hb-mb3-stepper button:disabled { opacity: .3; cursor: not-allowed; }
.hb-mb3-stepper output { min-width: 22px; text-align: center; font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-mb3-total { display: flex; align-items: baseline; justify-content: space-between; margin: 16px 0; color: #a39a8c; font-size: 13px; }
.hb-mb3-total b { color: #f5efe4; font-size: 18px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-mb3-cta { width: 100%; height: 48px; border: 0; border-radius: 14px; background: var(--hb-mb3-accent); color: #17130d; font: inherit; font-size: 14.5px; font-weight: 600; letter-spacing: .02em; cursor: pointer; transition: filter .2s, transform .15s; }
.hb-mb3-cta:hover { filter: brightness(1.08); }
.hb-mb3-cta:active { transform: scale(.98); }
.hb-mb3-done { display: grid; gap: 6px; padding: 12px 14px; border-radius: 14px; border: 1px solid color-mix(in srgb, var(--hb-mb3-accent) 45%, transparent); background: color-mix(in srgb, var(--hb-mb3-accent) 10%, transparent); animation: hb-mb3-in .5s cubic-bezier(.2, .8, .2, 1) both; }
.hb-mb3-done b { color: var(--hb-mb3-accent); font-size: 14px; }
.hb-mb3-done span { color: #bfb5a6; font-size: 13px; line-height: 1.5; }
.hb-mb3-done button { justify-self: start; margin-top: 4px; padding: 0; border: 0; background: none; color: #ece6dc; font: inherit; font-size: 12.5px; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.hb-mb3-fine { margin: 12px 0 0; color: #7a7266; font-size: 12px; line-height: 1.5; }
.hb-mb3-list { position: relative; margin: 0; padding: 4px 0 0; list-style: none; min-width: 0; }
.hb-mb3-list::before { content: ""; position: absolute; left: 21px; top: 26px; bottom: 30px; width: 1px; background: rgba(236, 230, 220, .1); }
.hb-mb3-list::after { content: ""; position: absolute; left: 21px; top: 26px; bottom: 30px; width: 1px; background: linear-gradient(180deg, var(--hb-mb3-accent), color-mix(in srgb, var(--hb-mb3-accent) 20%, transparent)); transform-origin: top; animation: hb-mb3-draw 1.8s cubic-bezier(.6, 0, .2, 1) both; }
@keyframes hb-mb3-draw { from { transform: scaleY(0); } }
.hb-mb3-course { position: relative; display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 22px; padding: 0 0 26px; outline: none; animation: hb-mb3-in .7s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(180ms + var(--hb-mb3-i) * 120ms); }
@keyframes hb-mb3-in { from { opacity: 0; transform: translateY(14px); filter: blur(4px); } }
.hb-mb3-num { position: relative; z-index: 1; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: #0c0a08; border: 1px solid rgba(236, 230, 220, .18); color: #bfb5a6; font-family: var(--font-grotesk, inherit); font-size: 14px; font-weight: 500; font-variant-numeric: tabular-nums; transition: background .3s, color .3s, border-color .3s, box-shadow .3s; }
.hb-mb3-body { min-width: 0; padding: 4px 18px 16px; margin: -4px -18px 0; border-radius: 16px; border: 1px solid transparent; transition: background .3s, border-color .3s; }
.hb-mb3-course:hover .hb-mb3-num, .hb-mb3-course:focus-visible .hb-mb3-num { background: var(--hb-mb3-accent); border-color: var(--hb-mb3-accent); color: #17130d; box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-mb3-accent) 16%, transparent); }
.hb-mb3-course:hover .hb-mb3-body, .hb-mb3-course:focus-visible .hb-mb3-body { background: rgba(255, 255, 255, .03); border-color: rgba(236, 230, 220, .08); }
.hb-mb3-kicker { margin: 8px 0 4px; color: #7a7266; font-size: 11px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; }
.hb-mb3-dish { margin: 0; font-family: var(--font-grotesk, inherit); font-size: 21px; font-weight: 500; letter-spacing: -.01em; line-height: 1.25; color: #f5efe4; }
.hb-mb3-desc { margin: 6px 0 0; color: #a39a8c; font-size: 14px; line-height: 1.6; }
.hb-mb3-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.hb-mb3-tag { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(236, 230, 220, .14); color: #bfb5a6; font-size: 10.5px; font-weight: 500; }
.hb-mb3-pair { display: flex; align-items: center; gap: 8px; margin-top: 12px; padding-top: 10px; border-top: 1px dashed rgba(236, 230, 220, .1); color: #6f685d; font-size: 13px; transition: color .4s; }
.hb-mb3-pair svg { flex: none; }
.hb-mb3[data-pairing="true"] .hb-mb3-pair { color: var(--hb-mb3-accent); }
.hb-mb3-pair span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-mb3-note { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.2, .8, .2, 1), opacity .35s; opacity: 0; }
.hb-mb3-note > p { overflow: hidden; margin: 0; color: #8f877a; font-size: 12.5px; line-height: 1.5; }
.hb-mb3-course:hover .hb-mb3-note, .hb-mb3-course:focus-visible .hb-mb3-note { grid-template-rows: 1fr; opacity: 1; }
.hb-mb3-course:hover .hb-mb3-note > p, .hb-mb3-course:focus-visible .hb-mb3-note > p { padding-top: 8px; }
.hb-mb3-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-mb3 button:focus-visible { outline: 2px solid var(--hb-mb3-accent); outline-offset: 2px; }
.hb-mb3-course:focus-visible .hb-mb3-body { outline: 1px solid color-mix(in srgb, var(--hb-mb3-accent) 60%, transparent); }
@container (max-width: 820px) {
  .hb-mb3-wrap { grid-template-columns: minmax(0, 1fr); gap: 44px; padding: 56px 20px 72px; }
  .hb-mb3-side { position: static; }
}
@container (max-width: 420px) {
  .hb-mb3-course { grid-template-columns: 34px minmax(0, 1fr); gap: 14px; }
  .hb-mb3-num { width: 34px; height: 34px; font-size: 12.5px; }
  .hb-mb3-list::before, .hb-mb3-list::after { left: 16px; }
  .hb-mb3-dish { font-size: 18px; }
  .hb-mb3-pair span { white-space: normal; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-mb3 *, .hb-mb3 *::before, .hb-mb3 *::after { animation: none !important; transition: none !important; }
}
`;

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export function MenuTastingCourses({
  restaurant = "Halden",
  title = "Seven courses for late autumn.",
  subtitle = "A single menu that follows the season, served at the counter facing the hearth. Allow about two and a half hours.",
  chef = "Chef Ines Marlow · Tuesday to Saturday, seatings at 6:00 and 8:30",
  courses = defaultCourses,
  price = 185,
  pairingPrice = 95,
  pairingLabel = "Wine pairing",
  defaultPairing = false,
  defaultGuests = 2,
  maxGuests = 8,
  accent = "#c9a45c",
  onSubmit,
  className,
  style,
  ...rest
}: MenuTastingCoursesProps) {
  const uid = React.useId();
  const [pairing, setPairing] = React.useState(defaultPairing);
  const [guests, setGuests] = React.useState(Math.min(Math.max(1, defaultGuests), maxGuests));
  const [sent, setSent] = React.useState(false);
  const perPerson = price + (pairing ? pairingPrice : 0);
  const total = perPerson * guests;
  const words = title.split(" ");
  const last = words.pop();
  const initials = chef.replace(/^Chef\s+/, "").split(/[\s·]+/).slice(0, 2).map((w) => w.charAt(0)).join("");

  const submit = () => {
    onSubmit?.({ guests, pairing, perPerson, total });
    setSent(true);
  };

  return (
    <section
      className={["hb-mb3", className].filter(Boolean).join(" ")}
      data-pairing={pairing}
      style={{ "--hb-mb3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-menu-tasting-courses" precedence="default">{css}</style>
      <div className="hb-mb3-wrap">
        <div className="hb-mb3-side">
          <p className="hb-mb3-rest">{restaurant}</p>
          <h2 className="hb-mb3-title">{words.join(" ")} <em>{last}</em></h2>
          <p className="hb-mb3-sub">{subtitle}</p>
          <p className="hb-mb3-chef"><span className="hb-mb3-mono" aria-hidden="true">{initials}</span>{chef}</p>
          <div className="hb-mb3-card">
            <div className="hb-mb3-pp">
              <span>Per person</span>
              <b aria-live="polite">{money(perPerson)}<small>/ guest</small></b>
            </div>
            <div className="hb-mb3-opt">
              <div className="hb-mb3-opt-l" id={`${uid}-pairing`}>
                <b>{pairingLabel}</b>
                <span>Seven glasses chosen by our sommelier, +{money(pairingPrice)}</span>
              </div>
              <button type="button" role="switch" aria-checked={pairing} aria-labelledby={`${uid}-pairing`} className="hb-mb3-switch" onClick={() => { setPairing((p) => !p); setSent(false); }} />
            </div>
            <div className="hb-mb3-opt">
              <div className="hb-mb3-opt-l">
                <b>Guests</b>
                <span>Up to {maxGuests} at the counter</span>
              </div>
              <div className="hb-mb3-stepper">
                <button type="button" aria-label="Fewer guests" disabled={guests <= 1} onClick={() => { setGuests((g) => Math.max(1, g - 1)); setSent(false); }}>−</button>
                <output aria-live="polite">{guests}</output>
                <button type="button" aria-label="More guests" disabled={guests >= maxGuests} onClick={() => { setGuests((g) => Math.min(maxGuests, g + 1)); setSent(false); }}>+</button>
              </div>
            </div>
            <div className="hb-mb3-total"><span>Total before tax and service</span><b>{money(total)}</b></div>
            {sent ? (
              <div className="hb-mb3-done" role="status">
                <b>Request received</b>
                <span>{guests} {guests === 1 ? "guest" : "guests"}, {pairing ? "with" : "without"} {pairingLabel.toLowerCase()}. We will confirm your seating by email within a day.</span>
                <button type="button" onClick={() => setSent(false)}>Change request</button>
              </div>
            ) : (
              <button type="button" className="hb-mb3-cta" onClick={submit}>Request this menu</button>
            )}
            <p className="hb-mb3-fine">Tell us about allergies when booking. A vegetarian menu is available with two days notice.</p>
          </div>
        </div>
        <ol className="hb-mb3-list" aria-label="Courses">
          {courses.map((c, i) => (
            <li key={c.name} className="hb-mb3-course" tabIndex={0} style={{ "--hb-mb3-i": i } as React.CSSProperties}>
              <span className="hb-mb3-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="hb-mb3-body">
                <p className="hb-mb3-kicker">Course {i + 1} of {courses.length}</p>
                <h3 className="hb-mb3-dish">{c.name}</h3>
                <p className="hb-mb3-desc">{c.description}</p>
                {c.tags?.length ? (
                  <div className="hb-mb3-tags">
                    {c.tags.map((t) => <span key={t} className="hb-mb3-tag"><TagIcon tag={t} />{tagLabel[t]}</span>)}
                  </div>
                ) : null}
                {c.note ? <div className="hb-mb3-note"><p>{c.note}</p></div> : null}
                <div className="hb-mb3-pair">
                  <Glass />
                  <span><span className="hb-mb3-sr">Pairing: </span>{c.pairing}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

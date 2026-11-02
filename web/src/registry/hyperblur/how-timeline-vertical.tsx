"use client";

import * as React from "react";

export interface HowTimelineVerticalItem {
  label: string;
  title: string;
  description: string;
  duration?: string;
  deliverables?: string[];
  owner?: string;
}

export interface HowTimelineVerticalAction {
  label: string;
  href: string;
}

export interface HowTimelineVerticalProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: HowTimelineVerticalItem[];
  cta?: HowTimelineVerticalAction | null;
  note?: string;
  accent?: string;
  onItemActive?: (index: number) => void;
}

const css = `
@keyframes hb-kh3-pulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.6); opacity: 0; }
}
.hb-kh3 {
  --hb-kh3-accent: #e5533d;
  --hb-kh3-ink: #1b1915;
  --hb-kh3-muted: #6f6a61;
  --hb-kh3-line: rgba(27, 25, 21, 0.12);
  --hb-kh3-serif: var(--font-serif, ui-serif), "Iowan Old Style", Georgia, "Times New Roman", serif;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-kh3-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kh3 *, .hb-kh3 *::before, .hb-kh3 *::after { box-sizing: border-box; }
.hb-kh3::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(40% 30% at 50% 0%, color-mix(in srgb, var(--hb-kh3-accent) 10%, transparent), transparent 70%),
    radial-gradient(rgba(27, 25, 21, 0.06) 1px, transparent 1px) 0 0 / 22px 22px;
  mask-image: linear-gradient(180deg, #000, transparent 60%);
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 60%);
}
.hb-kh3-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px 84px;
}
.hb-kh3-head {
  max-width: 660px;
  margin: 0 auto;
  text-align: center;
}
.hb-kh3-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--hb-kh3-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.hb-kh3-eyebrow::before, .hb-kh3-eyebrow::after {
  content: "";
  width: 22px;
  height: 1px;
  background: currentColor;
  opacity: 0.5;
}
.hb-kh3-title {
  margin: 16px 0 0;
  font-family: var(--hb-kh3-serif);
  font-size: clamp(36px, 5.6cqw, 58px);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.hb-kh3-title em { color: var(--hb-kh3-accent); font-style: italic; }
.hb-kh3-sub {
  max-width: 500px;
  margin: 16px auto 0;
  color: var(--hb-kh3-muted);
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh3-list {
  margin: 52px 0 0;
  padding: 0;
  list-style: none;
}
.hb-kh3-item {
  position: relative;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  column-gap: 14px;
  padding-bottom: 20px;
}
.hb-kh3-item:last-child { padding-bottom: 0; }
.hb-kh3-rail {
  position: relative;
  grid-column: 1;
  grid-row: 1;
}
.hb-kh3-seg {
  position: absolute;
  top: 34px;
  bottom: -34px;
  left: 50%;
  width: 2px;
  margin-left: -1px;
  background: var(--hb-kh3-line);
  overflow: hidden;
}
.hb-kh3-item:last-child .hb-kh3-seg { display: none; }
.hb-kh3-seg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--hb-kh3-accent);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
}
.hb-kh3-item[data-state="done"] .hb-kh3-seg::after { transform: none; }
.hb-kh3-dot {
  position: absolute;
  top: 26px;
  left: 50%;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border: 2px solid rgba(27, 25, 21, 0.25);
  border-radius: 50%;
  background: #f7f5ef;
  transition: border-color 0.35s ease, background-color 0.35s ease;
}
.hb-kh3-dot::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: var(--hb-kh3-accent);
  opacity: 0;
}
.hb-kh3-item[data-state="done"] .hb-kh3-dot { border-color: var(--hb-kh3-accent); background: var(--hb-kh3-accent); }
.hb-kh3-item[data-state="active"] .hb-kh3-dot { border-color: var(--hb-kh3-accent); background: #ffffff; box-shadow: inset 0 0 0 3px #ffffff, inset 0 0 0 8px var(--hb-kh3-accent); }
.hb-kh3-item[data-state="active"] .hb-kh3-dot::before { animation: hb-kh3-pulse 1.8s ease-out infinite; }
.hb-kh3-aside { display: none; }
.hb-kh3-card {
  grid-column: 2;
  grid-row: 1;
  position: relative;
  padding: 22px 22px 22px;
  border: 1px solid rgba(27, 25, 21, 0.08);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 1px 2px rgba(27, 25, 21, 0.04), 0 18px 40px -28px rgba(27, 25, 21, 0.28);
  opacity: 0.62;
  transform: translate3d(0, 6px, 0);
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s ease, border-color 0.45s ease;
}
.hb-kh3-item[data-state="done"] .hb-kh3-card { opacity: 0.88; transform: none; }
.hb-kh3-item[data-state="active"] .hb-kh3-card {
  opacity: 1;
  transform: none;
  border-color: color-mix(in srgb, var(--hb-kh3-accent) 30%, rgba(27, 25, 21, 0.08));
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 1px 2px rgba(27, 25, 21, 0.05), 0 26px 50px -26px color-mix(in srgb, var(--hb-kh3-accent) 40%, rgba(27, 25, 21, 0.3));
}
.hb-kh3-card:hover { opacity: 1; }
.hb-kh3-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px 12px;
}
.hb-kh3-label {
  color: var(--hb-kh3-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.hb-kh3-dur {
  color: var(--hb-kh3-muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
}
.hb-kh3-name {
  margin: 10px 0 0;
  font-family: var(--hb-kh3-serif);
  font-size: clamp(26px, 3cqw, 32px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.01em;
}
.hb-kh3-desc {
  margin: 10px 0 0;
  color: #4d4943;
  font-size: 15px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh3-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.hb-kh3-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border: 1px solid rgba(27, 25, 21, 0.1);
  border-radius: 999px;
  background: #faf9f5;
  color: #3b3833;
  font-size: 12.5px;
}
.hb-kh3-chip svg { width: 13px; height: 13px; fill: none; stroke: var(--hb-kh3-accent); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh3-owner {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed rgba(27, 25, 21, 0.12);
  color: var(--hb-kh3-muted);
  font-size: 13px;
}
.hb-kh3-av {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
}
.hb-kh3-owner strong { color: var(--hb-kh3-ink); font-weight: 600; }
.hb-kh3-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 20px;
  margin-top: 52px;
  color: var(--hb-kh3-muted);
  font-size: 14px;
}
.hb-kh3-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  background: var(--hb-kh3-ink);
  color: #f7f5ef;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 10px 24px -12px rgba(27, 25, 21, 0.6);
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.hb-kh3-cta:hover { transform: translateY(-1px); background: #000000; }
.hb-kh3-cta:focus-visible { outline: 2px solid var(--hb-kh3-accent); outline-offset: 3px; }
.hb-kh3-cta i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--hb-kh3-accent);
}
.hb-kh3-foot b { color: var(--hb-kh3-ink); font-weight: 600; }
@container (min-width: 760px) {
  .hb-kh3-in { padding: 92px 40px 108px; }
  .hb-kh3-list { margin-top: 64px; }
  .hb-kh3-item {
    grid-template-columns: minmax(0, 1fr) 72px minmax(0, 1fr);
    column-gap: 0;
    padding-bottom: 8px;
  }
  .hb-kh3-rail { grid-column: 2; }
  .hb-kh3-card { grid-column: 3; }
  .hb-kh3-item[data-side="left"] .hb-kh3-card { grid-column: 1; }
  .hb-kh3-aside {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 14px 8px 0 0;
    color: rgba(27, 25, 21, 0.2);
    transition: color 0.45s ease;
  }
  .hb-kh3-item[data-side="left"] .hb-kh3-aside { grid-column: 3; align-items: flex-start; padding: 14px 0 0 8px; }
  .hb-kh3-item[data-state="active"] .hb-kh3-aside, .hb-kh3-item[data-state="done"] .hb-kh3-aside { color: rgba(27, 25, 21, 0.55); }
  .hb-kh3-num {
    font-family: var(--hb-kh3-serif);
    font-size: 64px;
    font-style: italic;
    line-height: 1;
  }
  .hb-kh3-item[data-state="active"] .hb-kh3-num { color: var(--hb-kh3-accent); }
  .hb-kh3-asidetxt {
    margin-top: 6px;
    font-size: 13px;
    letter-spacing: 0.02em;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh3 *, .hb-kh3 *::before, .hb-kh3 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultItems: HowTimelineVerticalItem[] = [
  {
    label: "Week 1",
    title: "Discovery call",
    description: "A ninety-minute session with your founders and leads to map goals, constraints and what success looks like in numbers.",
    duration: "Nov 3 to Nov 7",
    deliverables: ["Project brief", "Success metrics"],
    owner: "Priya Raman, Strategy lead",
  },
  {
    label: "Week 2",
    title: "Research sprint",
    description: "Twelve customer interviews and a pass through your analytics. We come back with the three problems worth solving first.",
    duration: "Nov 10 to Nov 14",
    deliverables: ["Interview notes", "Opportunity map"],
    owner: "Tomás Varga, Research",
  },
  {
    label: "Weeks 3 and 4",
    title: "Prototype and test",
    description: "Clickable prototypes go in front of real customers every Thursday. What fails gets cut, what works gets sharper.",
    duration: "Nov 17 to Nov 28",
    deliverables: ["Interactive prototype", "Test reports"],
    owner: "Ines Okafor, Product design",
  },
  {
    label: "Week 5",
    title: "Launch and handoff",
    description: "Production-ready files, a component library and a recorded walkthrough, so your team owns every decision we made.",
    duration: "Dec 1 to Dec 5",
    deliverables: ["Design system", "Handoff video"],
    owner: "Priya Raman, Strategy lead",
  },
];

const avatarColors = ["#e5533d", "#3d6be5", "#2f9e6e", "#b0752a", "#8a4fd8"];

function hashName(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function initials(name: string) {
  return name
    .split(",")[0]
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function HowTimelineVertical({
  eyebrow = "The process",
  title = "Five weeks from first call to launch",
  subtitle = "A fixed schedule with a named lead at every stage. You always know what happens this week and what lands next.",
  items = defaultItems,
  cta = { label: "Book a discovery call", href: "#" },
  note = "Fixed price from $24,000",
  accent = "#e5533d",
  onItemActive,
  className,
  style,
  ...rest
}: HowTimelineVerticalProps) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLLIElement | null)[]>([]);
  const cb = React.useRef(onItemActive);
  const last = React.useRef(0);

  React.useEffect(() => {
    cb.current = onItemActive;
  }, [onItemActive]);

  React.useEffect(() => {
    if (last.current === active) return;
    last.current = active;
    cb.current?.(active);
  }, [active]);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(i)) setActive(i);
        }
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 },
    );
    refs.current.forEach((n) => {
      if (n) io.observe(n);
    });
    return () => io.disconnect();
  }, [items.length]);

  return (
    <section
      className={["hb-kh3", className].filter(Boolean).join(" ")}
      style={{ ["--hb-kh3-accent" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-how-timeline-vertical" precedence="default">{css}</style>
      <div className="hb-kh3-in">
        <header className="hb-kh3-head">
          {eyebrow ? <div className="hb-kh3-eyebrow">{eyebrow}</div> : null}
          <h2 className="hb-kh3-title">{title}</h2>
          {subtitle ? <p className="hb-kh3-sub">{subtitle}</p> : null}
        </header>
        <ol className="hb-kh3-list">
          {items.map((item, i) => {
            const state = i < active ? "done" : i === active ? "active" : "upcoming";
            return (
              <li
                key={item.title + i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="hb-kh3-item"
                data-index={i}
                data-state={state}
                data-side={i % 2 === 0 ? "right" : "left"}
                aria-current={state === "active" ? "step" : undefined}
              >
                <div className="hb-kh3-rail" aria-hidden="true">
                  <span className="hb-kh3-seg" />
                  <span className="hb-kh3-dot" />
                </div>
                <div className="hb-kh3-aside" aria-hidden="true">
                  <span className="hb-kh3-num">{String(i + 1).padStart(2, "0")}</span>
                  {item.duration ? <span className="hb-kh3-asidetxt">{item.duration}</span> : null}
                </div>
                <article className="hb-kh3-card" tabIndex={-1} onFocus={() => setActive(i)} onMouseEnter={() => setActive(i)}>
                  <div className="hb-kh3-top">
                    <span className="hb-kh3-label">{item.label}</span>
                    {item.duration ? <span className="hb-kh3-dur">{item.duration}</span> : null}
                  </div>
                  <h3 className="hb-kh3-name">{item.title}</h3>
                  <p className="hb-kh3-desc">{item.description}</p>
                  {item.deliverables && item.deliverables.length ? (
                    <ul className="hb-kh3-chips" aria-label="Deliverables">
                      {item.deliverables.map((d) => (
                        <li key={d} className="hb-kh3-chip">
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M4 2.5h5.5L12.5 5.5V13a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5zM9 2.5v3.5h3.5" />
                          </svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {item.owner ? (
                    <div className="hb-kh3-owner">
                      <span className="hb-kh3-av" style={{ background: avatarColors[hashName(item.owner) % avatarColors.length] }}>
                        {initials(item.owner)}
                      </span>
                      <span>
                        Led by <strong>{item.owner.split(",")[0]}</strong>
                        {item.owner.includes(",") ? `, ${item.owner.split(",").slice(1).join(",").trim()}` : ""}
                      </span>
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
        {cta || note ? (
          <div className="hb-kh3-foot">
            {cta ? (
              <a className="hb-kh3-cta" href={cta.href}>
                <i aria-hidden="true" />
                {cta.label}
              </a>
            ) : null}
            {note ? <span>{note}</span> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

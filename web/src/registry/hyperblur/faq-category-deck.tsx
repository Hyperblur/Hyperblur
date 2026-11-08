"use client";

import * as React from "react";

export interface FaqCategoryDeckCategory {
  id: string;
  label: string;
  description: string;
  icon?: "rocket" | "card" | "shield" | "plug" | "people" | "box";
  items: { question: string; answer: string }[];
}

export interface FaqCategoryDeckProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  categories?: FaqCategoryDeckCategory[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  contact?: { label: string; href: string };
  appearance?: "light" | "dark";
  accent?: string;
}

const css = `
.hb-wc12 {
  --hb-wc12-accent: #0f766e;
  --hb-wc12-bg: #ffffff;
  --hb-wc12-panel: #f6f6f3;
  --hb-wc12-card: #ffffff;
  --hb-wc12-ink: #121417;
  --hb-wc12-muted: #636870;
  --hb-wc12-line: rgba(18, 20, 23, .1);
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background: var(--hb-wc12-bg);
  color: var(--hb-wc12-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wc12[data-appearance="dark"] {
  --hb-wc12-bg: #0a0a0a;
  --hb-wc12-panel: #111111;
  --hb-wc12-card: #171717;
  --hb-wc12-ink: #ededed;
  --hb-wc12-muted: #8f8f8f;
  --hb-wc12-line: rgba(255, 255, 255, .09);
}
.hb-wc12 *, .hb-wc12 *::before, .hb-wc12 *::after { box-sizing: border-box; }
.hb-wc12-inner { max-width: 1160px; margin: 0 auto; padding: 72px 20px; }
.hb-wc12-head { display: grid; gap: 12px; margin-bottom: 36px; }
.hb-wc12-eyebrow { margin: 0; color: var(--hb-wc12-accent); font-size: 13px; font-weight: 650; }
.hb-wc12-title { margin: 0; max-width: 18ch; font-family: var(--font-grotesk), var(--font-sans), sans-serif; font-size: clamp(30px, 4.8cqi, 48px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-wc12-sub { margin: 0; max-width: 520px; color: var(--hb-wc12-muted); font-size: 15.5px; line-height: 1.6; }
.hb-wc12-body { display: grid; gap: 18px; }
.hb-wc12-tabs { display: flex; gap: 8px; margin: 0 -20px; padding: 2px 20px 6px; overflow-x: auto; scrollbar-width: none; scroll-snap-type: x mandatory; }
.hb-wc12-tabs::-webkit-scrollbar { display: none; }
.hb-wc12-tab { position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 4px 12px; flex: none; width: 230px; padding: 14px; border: 1px solid var(--hb-wc12-line); border-radius: 16px; background: var(--hb-wc12-card); color: var(--hb-wc12-ink); font: inherit; text-align: left; cursor: pointer; scroll-snap-align: start; overflow: hidden; transition: border-color .25s ease, box-shadow .3s ease, transform .3s cubic-bezier(.3, 1.4, .5, 1); }
.hb-wc12-tab::before { content: ""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; border-radius: 0 3px 3px 0; background: var(--hb-wc12-accent); transform: scaleY(0); transition: transform .35s cubic-bezier(.3, 1.4, .5, 1); }
.hb-wc12-tab:hover { border-color: color-mix(in srgb, var(--hb-wc12-accent) 30%, var(--hb-wc12-line)); }
.hb-wc12-tab[aria-selected="true"] { border-color: color-mix(in srgb, var(--hb-wc12-accent) 55%, transparent); box-shadow: 0 1px 2px rgba(16, 24, 40, .06), 0 14px 30px -18px color-mix(in srgb, var(--hb-wc12-accent) 70%, transparent); }
.hb-wc12-tab[aria-selected="true"]::before { transform: scaleY(1); }
.hb-wc12-tab:focus-visible, .hb-wc12-q:focus-visible, .hb-wc12-cta:focus-visible { outline: 2px solid var(--hb-wc12-accent); outline-offset: 2px; }
.hb-wc12-ic { grid-row: span 2; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: var(--hb-wc12-panel); color: var(--hb-wc12-muted); transition: background .3s ease, color .3s ease, transform .4s cubic-bezier(.3, 1.6, .5, 1); }
.hb-wc12-ic svg { width: 19px; height: 19px; }
.hb-wc12-tab[aria-selected="true"] .hb-wc12-ic { background: var(--hb-wc12-accent); color: #fff; transform: rotate(-8deg); }
.hb-wc12-tl { font-size: 15px; font-weight: 620; letter-spacing: -.01em; }
.hb-wc12-td { grid-column: 2 / 4; color: var(--hb-wc12-muted); font-size: 12.5px; line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wc12-tc { display: grid; place-items: center; min-width: 24px; height: 22px; padding: 0 7px; border-radius: 999px; background: var(--hb-wc12-panel); color: var(--hb-wc12-muted); font-size: 11.5px; font-weight: 650; font-variant-numeric: tabular-nums; }
.hb-wc12-tab[aria-selected="true"] .hb-wc12-tc { background: color-mix(in srgb, var(--hb-wc12-accent) 14%, transparent); color: var(--hb-wc12-accent); }
.hb-wc12-panel { position: relative; padding: 22px 18px; border-radius: 22px; background: var(--hb-wc12-panel); overflow: hidden; }
.hb-wc12-sheet { animation: hb-wc12-wipe .6s cubic-bezier(.7, 0, .2, 1) both; }
.hb-wc12-ph { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 16px; margin-bottom: 14px; }
.hb-wc12-ph h3 { margin: 0; font-size: 20px; font-weight: 620; letter-spacing: -.02em; }
.hb-wc12-ph span { color: var(--hb-wc12-muted); font-size: 13px; }
.hb-wc12-list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-wc12-item { border: 1px solid var(--hb-wc12-line); border-radius: 14px; background: var(--hb-wc12-card); box-shadow: 0 1px 2px rgba(16, 24, 40, .04); animation: hb-wc12-rise .5s cubic-bezier(.2, .9, .3, 1) both; animation-delay: calc(.18s + var(--hb-wc12-i) * 60ms); transition: box-shadow .3s ease; }
.hb-wc12-item[data-open="true"] { box-shadow: 0 1px 2px rgba(16, 24, 40, .05), 0 12px 28px -18px rgba(16, 24, 40, .3); }
.hb-wc12-q { display: flex; align-items: center; gap: 14px; width: 100%; padding: 15px 16px; border: 0; border-radius: 14px; background: none; color: var(--hb-wc12-ink); font: inherit; font-size: 15px; font-weight: 580; text-align: left; cursor: pointer; }
.hb-wc12-n { flex: none; color: var(--hb-wc12-muted); font-family: var(--font-mono), monospace; font-size: 12px; font-weight: 500; transition: color .25s ease; }
.hb-wc12-item[data-open="true"] .hb-wc12-n { color: var(--hb-wc12-accent); }
.hb-wc12-qt { flex: 1; min-width: 0; }
.hb-wc12-chev { flex: none; width: 16px; height: 16px; color: var(--hb-wc12-muted); transition: transform .45s cubic-bezier(.3, 1.4, .5, 1), color .25s ease; }
.hb-wc12-item[data-open="true"] .hb-wc12-chev { transform: rotate(180deg); color: var(--hb-wc12-accent); }
.hb-wc12-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s cubic-bezier(.2, .8, .2, 1); }
.hb-wc12-item[data-open="true"] .hb-wc12-wrap { grid-template-rows: 1fr; }
.hb-wc12-wrap > div { min-height: 0; overflow: hidden; }
.hb-wc12-a { margin: 0; padding: 0 18px 18px 44px; color: var(--hb-wc12-muted); font-size: 14.5px; line-height: 1.65; }
.hb-wc12-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px; padding: 14px 16px; border: 1px dashed var(--hb-wc12-line); border-radius: 14px; color: var(--hb-wc12-muted); font-size: 14px; }
.hb-wc12-cta { display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px; border-radius: 10px; background: var(--hb-wc12-ink); color: var(--hb-wc12-bg); font-size: 13.5px; font-weight: 600; text-decoration: none; transition: transform .2s ease; }
.hb-wc12-cta:hover { transform: translateY(-1px); }
.hb-wc12-cta svg { width: 13px; height: 13px; }
@keyframes hb-wc12-wipe { from { clip-path: inset(0 0 100% 0 round 18px); opacity: .4; } to { clip-path: inset(0 0 0 0 round 0); opacity: 1; } }
@keyframes hb-wc12-rise { from { opacity: 0; transform: translateY(10px); } }
@container (min-width: 820px) {
  .hb-wc12-inner { padding: 104px 40px; }
  .hb-wc12-head { grid-template-columns: minmax(0, 1fr) minmax(0, 420px); align-items: end; gap: 40px; }
  .hb-wc12-body { grid-template-columns: minmax(0, 300px) minmax(0, 1fr); gap: 24px; align-items: start; }
  .hb-wc12-tabs { flex-direction: column; margin: 0; padding: 0; overflow: visible; }
  .hb-wc12-tab { width: 100%; }
  .hb-wc12-tab:not([aria-selected="true"]):hover { transform: translateX(4px); }
  .hb-wc12-panel { padding: 28px; min-height: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wc12 *, .hb-wc12 *::before, .hb-wc12 *::after { animation: none !important; transition: none !important; }
}
`;

const iconPaths: Record<NonNullable<FaqCategoryDeckCategory["icon"]>, string> = {
  rocket: "M10 2c3 1.5 5 4.5 5 8l-2.5 2.5h-5L5 10c0-3.5 2-6.5 5-8zM10 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM7.5 12.5L6 17l2.5-1.5M12.5 12.5L14 17l-2.5-1.5",
  card: "M2.5 5h15v10h-15zM2.5 8h15M5.5 12h3",
  shield: "M10 2l6 2.5v5c0 3.8-2.6 6.5-6 7.5-3.4-1-6-3.7-6-7.5v-5zM7.3 9.8l1.9 1.9 3.6-3.7",
  plug: "M7.5 2.5v4M12.5 2.5v4M5 6.5h10v3a5 5 0 01-10 0zM10 14.5v3",
  people: "M7.5 9a3 3 0 100-6 3 3 0 000 6zM2 17c0-3 2.5-5 5.5-5s5.5 2 5.5 5M13.5 3.3a3 3 0 010 5.4M15.5 12.4c1.6.7 2.5 2.4 2.5 4.6",
  box: "M10 2l7 3.5v9L10 18l-7-3.5v-9zM3 5.5L10 9l7-3.5M10 9v9",
};

const defaultCategories: FaqCategoryDeckCategory[] = [
  {
    id: "start",
    label: "Getting started",
    description: "Setup, imports and your first week",
    icon: "rocket",
    items: [
      { question: "How do I set up my first storefront?", answer: "Pick a theme, add three products and connect a payment method. The setup checklist on your dashboard walks through each step and usually takes about twenty minutes." },
      { question: "Can I move my products from another platform?", answer: "Upload a CSV or connect your old store and we import products, variants, images and inventory counts. Customer accounts can be imported too, with their consent." },
      { question: "Do I need my own domain?", answer: "No. Every shop starts on a free subdomain. When you are ready, connect a domain you own or buy one in Settings, Domains for 14 dollars a year." },
    ],
  },
  {
    id: "billing",
    label: "Billing and plans",
    description: "Invoices, fees and upgrades",
    icon: "card",
    items: [
      { question: "What are the transaction fees?", answer: "Basic charges 2.4 percent plus 30 cents per online sale. Growth lowers that to 1.9 percent, and Scale to 1.5 percent with no monthly minimum." },
      { question: "Can I pause my plan for a season?", answer: "Yes. Pausing keeps your store and data for 9 dollars a month while checkout is turned off. Resume any time and your theme and products are exactly as you left them." },
      { question: "Where do I download invoices?", answer: "All invoices live under Settings, Billing and can be emailed to your accountant automatically each month." },
      { question: "Do you offer refunds on annual plans?", answer: "Annual plans can be refunded in full within 30 days of purchase, and pro rata after that if you downgrade." },
    ],
  },
  {
    id: "shipping",
    label: "Orders and shipping",
    description: "Labels, carriers and returns",
    icon: "box",
    items: [
      { question: "Which carriers can I print labels for?", answer: "Discounted labels are available for five national carriers, and you can add your own carrier account for any other provider." },
      { question: "How do returns work for my customers?", answer: "Customers start a return from their order page. You approve it, a prepaid label is emailed, and the refund is issued once the parcel is scanned." },
    ],
  },
  {
    id: "security",
    label: "Security",
    description: "Payments, fraud and access",
    icon: "shield",
    items: [
      { question: "Is checkout PCI compliant?", answer: "Yes. Card details never touch your store. Checkout is certified PCI DSS Level 1 and every payment uses 3-D Secure where the bank supports it." },
      { question: "How do I protect my shop from fraud?", answer: "Every order is scored for risk. High-risk orders are held for review, and you can set rules to cancel or flag orders automatically." },
      { question: "Can staff have limited access?", answer: "Create staff accounts with granular permissions, so a packer can see orders without seeing revenue or payouts." },
    ],
  },
];

export function FaqCategoryDeck({
  eyebrow = "Support",
  title = "Find the answer by topic.",
  subtitle = "Pick a topic on the left. Each one keeps the questions our merchants ask most, updated every month by the support team.",
  categories = defaultCategories,
  value,
  defaultValue,
  onValueChange,
  contact = { label: "Open a ticket", href: "#" },
  appearance = "light",
  accent = "#0f766e",
  className = "",
  style,
  ...rest
}: FaqCategoryDeckProps) {
  const [inner, setInner] = React.useState(defaultValue ?? categories[0]?.id ?? "");
  const current = value ?? inner;
  const cat = categories.find((c) => c.id === current) ?? categories[0];
  const [open, setOpen] = React.useState<Record<string, number | null>>({});
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const id = React.useId();

  const pick = (cid: string) => {
    if (value === undefined) setInner(cid);
    onValueChange?.(cid);
  };

  const key = (e: React.KeyboardEvent, i: number) => {
    const n = categories.length;
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    pick(categories[next].id);
    tabs.current[next]?.focus();
  };

  if (!cat) return null;
  const openIndex = open[cat.id] === undefined ? 0 : open[cat.id];
  const vars = { "--hb-wc12-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wc12 ${className}`} style={vars} data-appearance={appearance} {...rest}>
      <style href="hb-faq-category-deck" precedence="default">{css}</style>
      <div className="hb-wc12-inner">
        <div className="hb-wc12-head">
          <div>
            {eyebrow ? <p className="hb-wc12-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-wc12-title">{title}</h2>
          </div>
          {subtitle ? <p className="hb-wc12-sub">{subtitle}</p> : null}
        </div>
        <div className="hb-wc12-body">
          <div className="hb-wc12-tabs" role="tablist" aria-label="FAQ topics" aria-orientation="vertical">
            {categories.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-t${c.id}`}
                className="hb-wc12-tab"
                aria-selected={c.id === cat.id}
                aria-controls={`${id}-p`}
                tabIndex={c.id === cat.id ? 0 : -1}
                onClick={() => pick(c.id)}
                onKeyDown={(e) => key(e, i)}
              >
                <span className="hb-wc12-ic" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <path d={iconPaths[c.icon ?? "box"]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="hb-wc12-tl">{c.label}</span>
                <span className="hb-wc12-tc">{c.items.length}</span>
                <span className="hb-wc12-td">{c.description}</span>
              </button>
            ))}
          </div>
          <div className="hb-wc12-panel" role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${cat.id}`}>
            <div key={cat.id} className="hb-wc12-sheet">
              <div className="hb-wc12-ph">
                <h3>{cat.label}</h3>
                <span>
                  {cat.items.length} {cat.items.length === 1 ? "question" : "questions"}
                </span>
              </div>
              <ul className="hb-wc12-list">
                {cat.items.map((it, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <li key={it.question} className="hb-wc12-item" data-open={isOpen ? "true" : "false"} style={{ "--hb-wc12-i": i } as React.CSSProperties}>
                      <button
                        type="button"
                        className="hb-wc12-q"
                        aria-expanded={isOpen}
                        aria-controls={`${id}-a${cat.id}${i}`}
                        onClick={() => setOpen((o) => ({ ...o, [cat.id]: isOpen ? null : i }))}
                      >
                        <span className="hb-wc12-n">{String(i + 1).padStart(2, "0")}</span>
                        <span className="hb-wc12-qt">{it.question}</span>
                        <svg className="hb-wc12-chev" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div className="hb-wc12-wrap" id={`${id}-a${cat.id}${i}`}>
                        <div>
                          <p className="hb-wc12-a">{it.answer}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {contact ? (
                <div className="hb-wc12-foot">
                  <span>Did not find it in {cat.label.toLowerCase()}?</span>
                  <a className="hb-wc12-cta" href={contact.href}>
                    {contact.label}
                    <svg viewBox="0 0 14 14" aria-hidden="true">
                      <path d="M2.5 7h8.5M7.5 3.5L11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

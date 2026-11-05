"use client";

import * as React from "react";

export interface ShopMosaicCategory {
  name: string;
  count: number;
  href: string;
  tagline?: string;
  image?: string;
  palette?: [string, string, string];
  object?: "bottle" | "chair" | "lamp" | "shoe" | "bag" | "plant";
}

export interface ShopCategoryMosaicProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  categories?: ShopMosaicCategory[];
  cta?: { label: string; href: string };
  accent?: string;
  onCategoryClick?: (category: ShopMosaicCategory, index: number) => void;
}

const defaultCategories: ShopMosaicCategory[] = [
  { name: "Living room", count: 214, href: "#", tagline: "Sofas, side tables and soft light", palette: ["#c2410c", "#7c2d12", "#1c0f08"], object: "chair" },
  { name: "Lighting", count: 96, href: "#", tagline: "New from Studio Halde", palette: ["#eab308", "#713f12", "#120d04"], object: "lamp" },
  { name: "Ceramics", count: 138, href: "#", palette: ["#5eead4", "#115e59", "#041311"], object: "bottle" },
  { name: "Footwear", count: 72, href: "#", palette: ["#a78bfa", "#4c1d95", "#0d0716"], object: "shoe" },
  { name: "Bags", count: 58, href: "#", palette: ["#fb7185", "#881337", "#14050a"], object: "bag" },
  { name: "Plants & pots", count: 121, href: "#", tagline: "Delivered potted and ready", palette: ["#4ade80", "#14532d", "#04110a"], object: "plant" },
];

const css = `
.hb-yja {
  --hb-yja-accent: #fb923c;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yja *, .hb-yja *::before, .hb-yja *::after { box-sizing: border-box; }
.hb-yja-inner { max-width: 1120px; margin: 0 auto; padding: 72px 20px; }
@container (min-width: 800px) { .hb-yja-inner { padding: 96px 32px; } }
.hb-yja-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px 40px; margin-bottom: 32px; }
.hb-yja-eyebrow { margin: 0 0 12px; color: var(--hb-yja-accent); font-size: 13px; font-weight: 600; }
.hb-yja-title { margin: 0; font-size: clamp(30px, 4.6cqw, 46px); line-height: 1.05; letter-spacing: -.035em; font-weight: 650; }
.hb-yja-sub { margin: 12px 0 0; max-width: 460px; color: #8f8f8f; font-size: 16px; line-height: 1.6; }
.hb-yja-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background .2s ease, border-color .2s ease;
}
.hb-yja-cta:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .2); }
.hb-yja-cta:focus-visible { outline: 2px solid var(--hb-yja-accent); outline-offset: 3px; }
.hb-yja-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: 170px;
}
.hb-yja-tile:nth-child(1) { grid-column: span 2; grid-row: span 2; }
.hb-yja-tile:nth-child(6) { grid-column: span 2; }
@container (min-width: 760px) {
  .hb-yja-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 190px; gap: 14px; }
  .hb-yja-tile:nth-child(1) { grid-column: span 2; grid-row: span 2; }
  .hb-yja-tile:nth-child(2) { grid-column: span 2; }
  .hb-yja-tile:nth-child(5) { grid-column: span 2; }
  .hb-yja-tile:nth-child(6) { grid-column: span 2; }
}
.hb-yja-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  padding: 18px;
  border-radius: 20px;
  color: #fff;
  text-decoration: none;
  isolation: isolate;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08);
  clip-path: inset(0 0 100% 0 round 20px);
  transition: box-shadow .3s ease;
}
.hb-yja-seen .hb-yja-tile { animation: hb-yja-wipe .9s cubic-bezier(.7, 0, .2, 1) forwards; animation-delay: calc(var(--hb-yja-i) * 90ms); }
.hb-yja-tile:hover { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .22); }
.hb-yja-tile:focus-visible { outline: 2px solid var(--hb-yja-accent); outline-offset: 3px; }
.hb-yja-img {
  position: absolute;
  inset: 0;
  z-index: -2;
  transform: scale(1.001);
  transition: transform 1.1s cubic-bezier(.2, .8, .2, 1);
}
.hb-yja-tile:hover .hb-yja-img, .hb-yja-tile:focus-visible .hb-yja-img { transform: scale(1.09); }
.hb-yja-img svg { position: absolute; right: 6%; bottom: 0; height: 88%; width: auto; max-width: 70%; }
.hb-yja-tile::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, .65));
}
.hb-yja-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, .35);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, .14);
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.hb-yja-name { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 19px; font-weight: 640; letter-spacing: -.02em; }
.hb-yja-tile:nth-child(1) .hb-yja-name { font-size: clamp(22px, 3.2cqw, 32px); }
.hb-yja-line { display: block; margin: 4px 0 0; color: rgba(255, 255, 255, .72); font-size: 13.5px; max-height: 0; opacity: 0; overflow: hidden; transition: max-height .4s ease, opacity .4s ease; }
.hb-yja-tile:nth-child(1) .hb-yja-line, .hb-yja-tile:hover .hb-yja-line, .hb-yja-tile:focus-visible .hb-yja-line { max-height: 40px; opacity: 1; }
.hb-yja-arrow {
  flex: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  color: #0a0a0a;
  transform: translate(-6px, 6px) scale(.7);
  opacity: 0;
  transition: transform .35s cubic-bezier(.2, .8, .2, 1), opacity .3s ease;
}
.hb-yja-tile:hover .hb-yja-arrow, .hb-yja-tile:focus-visible .hb-yja-arrow { transform: none; opacity: 1; }
@keyframes hb-yja-wipe { to { clip-path: inset(0 0 0 0 round 20px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yja *, .hb-yja *::before, .hb-yja *::after { animation: none !important; transition: none !important; }
  .hb-yja-tile { clip-path: none; }
}
`;

function lighten(hex: string, amount: number) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * amount));
  return `rgb(${ch[0]}, ${ch[1]}, ${ch[2]})`;
}

function ObjectArt({ kind, light }: { kind: NonNullable<ShopMosaicCategory["object"]>; light: string }) {
  const shade = "rgba(0,0,0,.28)";
  if (kind === "chair") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <ellipse cx="100" cy="190" rx="80" ry="8" fill={shade} />
        <rect x="34" y="70" width="132" height="70" rx="26" fill={light} opacity=".9" />
        <rect x="22" y="104" width="156" height="50" rx="20" fill={light} />
        <rect x="40" y="150" width="10" height="38" rx="4" fill={light} opacity=".7" />
        <rect x="150" y="150" width="10" height="38" rx="4" fill={light} opacity=".7" />
        <rect x="34" y="70" width="132" height="14" rx="7" fill="#fff" opacity=".18" />
      </svg>
    );
  }
  if (kind === "lamp") {
    return (
      <svg viewBox="0 0 120 200" aria-hidden="true">
        <ellipse cx="60" cy="40" rx="50" ry="60" fill={light} opacity=".22" />
        <path d="M28 70 40 20h40l12 50Z" fill={light} />
        <rect x="57" y="70" width="6" height="110" fill={light} opacity=".8" />
        <ellipse cx="60" cy="186" rx="30" ry="7" fill={light} opacity=".85" />
      </svg>
    );
  }
  if (kind === "bottle") {
    return (
      <svg viewBox="0 0 160 200" aria-hidden="true">
        <ellipse cx="80" cy="194" rx="70" ry="6" fill={shade} />
        <path d="M44 40h20v24c18 8 26 30 26 60v66H18v-66c0-30 8-52 26-60Z" fill={light} />
        <path d="M108 100c0-20 22-20 22 0v90h-22Z" fill={light} opacity=".6" />
        <rect x="18" y="120" width="72" height="8" fill="#fff" opacity=".2" />
      </svg>
    );
  }
  if (kind === "shoe") {
    return (
      <svg viewBox="0 0 220 140" aria-hidden="true">
        <ellipse cx="110" cy="134" rx="100" ry="6" fill={shade} />
        <path d="M14 96c0-22 10-40 24-50l30 22c22 14 60 18 100 22 26 3 40 14 40 28v10H14Z" fill={light} />
        <rect x="14" y="118" width="194" height="10" rx="5" fill="#fff" opacity=".85" />
        <path d="M60 60l10 8M74 70l10 7M88 78l10 6" stroke="#fff" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "bag") {
    return (
      <svg viewBox="0 0 160 200" aria-hidden="true">
        <ellipse cx="80" cy="194" rx="70" ry="6" fill={shade} />
        <path d="M52 70c0-40 56-40 56 0" stroke={light} strokeWidth="9" fill="none" />
        <rect x="22" y="66" width="116" height="124" rx="18" fill={light} />
        <rect x="64" y="104" width="32" height="12" rx="6" fill="#fff" opacity=".4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 200" aria-hidden="true">
      <path d="M80 120C60 90 30 86 20 50c30 4 50 24 60 70Z" fill={light} opacity=".75" />
      <path d="M80 120c10-50 40-70 66-72-6 34-34 50-66 72Z" fill={light} />
      <path d="M80 124c-4-40 2-80 14-104 8 30 4 70-14 104Z" fill={light} opacity=".9" />
      <path d="M44 124h72l-10 70H54Z" fill="#fff" opacity=".88" />
    </svg>
  );
}

export function ShopCategoryMosaic({
  eyebrow = "Shop by category",
  title = "Made for slow mornings at home",
  subtitle = "Six collections from independent makers in Copenhagen, Kyoto and Oaxaca. Free returns for 60 days.",
  categories = defaultCategories,
  cta = { label: "View all 700 products", href: "#" },
  accent = "#fb923c",
  onCategoryClick,
  className,
  style,
  ...rest
}: ShopCategoryMosaicProps) {
  const [seen, setSeen] = React.useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={["hb-yja", seen ? "hb-yja-seen" : "", className].filter(Boolean).join(" ")}
      style={{ "--hb-yja-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-category-mosaic" precedence="default">{css}</style>
      <div className="hb-yja-inner">
        <div className="hb-yja-head">
          <div>
            {eyebrow ? <p className="hb-yja-eyebrow">{eyebrow}</p> : null}
            <h2 className="hb-yja-title">{title}</h2>
            {subtitle ? <p className="hb-yja-sub">{subtitle}</p> : null}
          </div>
          {cta ? (
            <a className="hb-yja-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </div>
        <div className="hb-yja-grid" ref={gridRef}>
          {categories.map((c, i) => {
            const [p1, p2, p3] = c.palette ?? [accent, "#3f3f46", "#0a0a0a"];
            const bg = c.image
              ? `center / cover no-repeat url("${c.image}")`
              : `radial-gradient(70% 80% at 75% 35%, ${p1}, transparent 70%), radial-gradient(60% 60% at 10% 100%, ${p2}, transparent 70%), linear-gradient(160deg, ${p2}, ${p3})`;
            return (
              <a key={c.name} className="hb-yja-tile" href={c.href} onClick={() => onCategoryClick?.(c, i)} style={{ "--hb-yja-i": i } as React.CSSProperties}>
                <span className="hb-yja-img" style={{ background: bg }} aria-hidden="true">
                  {c.image ? null : <ObjectArt kind={c.object ?? "bag"} light={lighten(p1, 0.45)} />}
                </span>
                <span className="hb-yja-tag">{c.count} items</span>
                <span className="hb-yja-name">
                  {c.name}
                  <span className="hb-yja-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
                {c.tagline ? <span className="hb-yja-line">{c.tagline}</span> : null}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

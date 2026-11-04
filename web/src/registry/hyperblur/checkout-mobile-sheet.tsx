"use client";

import * as React from "react";

export interface CheckoutMobileProduct {
  name: string;
  subtitle: string;
  price: number;
  colors: { name: string; value: string }[];
}

export interface CheckoutMobileValues {
  product: string;
  color: string;
  total: number;
}

export interface CheckoutMobileSheetProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  points?: { value: string; label: string }[];
  merchant?: string;
  product?: CheckoutMobileProduct;
  shipping?: number;
  cardLabel?: string;
  address?: string;
  defaultOpen?: boolean;
  currency?: string;
  onConfirm?: (values: CheckoutMobileValues) => void;
  accent?: string;
}

const defaultProduct: CheckoutMobileProduct = {
  name: "Aria Over-Ear",
  subtitle: "Wireless, 40 h battery",
  price: 249,
  colors: [
    { name: "Ember", value: "#ff6b4a" },
    { name: "Graphite", value: "#3f3f46" },
    { name: "Bone", value: "#e7e1d6" },
  ],
};

const defaultPoints = [
  { value: "1 tap", label: "to open the sheet" },
  { value: "4.2 s", label: "median time to pay" },
  { value: "+31%", label: "mobile conversion" },
];

const css = `
.hb-qg4 {
  --hb-qg4-accent: #ff6b4a;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  isolation: isolate;
  overflow: hidden;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-qg4 *, .hb-qg4 *::before, .hb-qg4 *::after { box-sizing: border-box; }
.hb-qg4::before { content: ""; position: absolute; right: -10%; top: 10%; width: 70%; height: 90%; z-index: -1; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-qg4-accent) 20%, transparent), transparent); }
.hb-qg4-inner { max-width: 1120px; margin: 0 auto; padding: clamp(40px, 6cqw, 96px) clamp(16px, 4cqw, 32px); display: grid; gap: 40px; align-items: center; }
@container (min-width: 760px) { .hb-qg4-inner { grid-template-columns: 1fr auto; gap: 56px; } }
.hb-qg4-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--hb-qg4-accent); margin: 0 0 16px; }
.hb-qg4-eyebrow::before { content: ""; width: 18px; height: 1px; background: currentColor; }
.hb-qg4-title { margin: 0; font-size: clamp(32px, 5.4cqw, 56px); line-height: 1.02; letter-spacing: -0.04em; font-weight: 600; max-width: 520px; }
.hb-qg4-sub { margin: 18px 0 0; font-size: 16px; line-height: 1.6; color: #8f8f8f; max-width: 460px; }
.hb-qg4-points { list-style: none; margin: 32px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; max-width: 480px; }
.hb-qg4-points li { border-top: 1px solid rgba(255,255,255,.1); padding-top: 12px; }
.hb-qg4-points b { display: block; font-size: 22px; letter-spacing: -0.03em; font-weight: 600; }
.hb-qg4-points span { font-size: 12px; color: #8f8f8f; }
.hb-qg4-phone { justify-self: center; position: relative; width: 272px; height: 552px; border-radius: 46px; padding: 10px; background: linear-gradient(160deg, #2a2a2e, #111113 40%, #1d1d20); box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), 0 50px 100px -40px rgba(0,0,0,.95), 0 0 0 1px #000; }
.hb-qg4-screen { position: relative; width: 100%; height: 100%; border-radius: 37px; overflow: hidden; background: #0f0f10; }
.hb-qg4-island { position: absolute; top: 9px; left: 50%; width: 84px; height: 24px; margin-left: -42px; border-radius: 14px; background: #000; z-index: 5; }
.hb-qg4-status { display: flex; justify-content: space-between; align-items: center; padding: 13px 22px 0; font-size: 11px; font-weight: 600; height: 40px; }
.hb-qg4-status i { display: inline-block; width: 22px; height: 10px; border-radius: 3px; border: 1px solid rgba(255,255,255,.6); position: relative; }
.hb-qg4-status i::after { content: ""; position: absolute; inset: 1.5px 5px 1.5px 1.5px; background: #ededed; border-radius: 1px; }
.hb-qg4-nav { display: flex; justify-content: space-between; padding: 6px 16px; }
.hb-qg4-nav span { width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,.07); display: grid; place-items: center; }
.hb-qg4-nav svg { width: 14px; height: 14px; }
.hb-qg4-art { margin: 4px 16px 0; height: 196px; border-radius: 22px; position: relative; overflow: hidden; display: grid; place-items: center; background: radial-gradient(70% 70% at 50% 40%, color-mix(in srgb, var(--hb-qg4-swatch) 55%, #1a1a1a), #141414 75%); transition: background .4s; }
.hb-qg4-art svg { width: 150px; height: 150px; filter: drop-shadow(0 20px 24px rgba(0,0,0,.55)); animation: hb-qg4-float 5s ease-in-out infinite; }
@keyframes hb-qg4-float { 50% { transform: translateY(-6px) rotate(-2deg); } }
.hb-qg4-info { padding: 14px 18px 0; }
.hb-qg4-info small { font-size: 11px; color: #8f8f8f; }
.hb-qg4-info h3 { margin: 2px 0 0; font-size: 18px; letter-spacing: -0.02em; display: flex; justify-content: space-between; }
.hb-qg4-swatches { display: flex; gap: 8px; margin-top: 12px; }
.hb-qg4-sw { width: 24px; height: 24px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); transition: box-shadow .2s; }
.hb-qg4-sw[aria-checked="true"] { box-shadow: 0 0 0 2px #0f0f10, 0 0 0 3.5px #ededed; }
.hb-qg4-buy { position: absolute; left: 16px; right: 16px; bottom: 20px; height: 46px; border-radius: 14px; border: 0; background: #ededed; color: #0a0a0a; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
.hb-qg4-buy svg { width: 15px; height: 15px; }
.hb-qg4-sw:focus-visible, .hb-qg4-buy:focus-visible, .hb-qg4-x:focus-visible, .hb-qg4-thumb:focus-visible { outline: 2px solid var(--hb-qg4-accent); outline-offset: 2px; }
.hb-qg4-dim { position: absolute; inset: 0; background: rgba(0,0,0,.55); opacity: 0; pointer-events: none; transition: opacity .35s; z-index: 2; }
.hb-qg4[data-open="true"] .hb-qg4-dim { opacity: 1; pointer-events: auto; }
.hb-qg4-sheet { position: absolute; left: 6px; right: 6px; bottom: 6px; z-index: 3; border-radius: 30px; background: #1c1c1e; border: 1px solid rgba(255,255,255,.08); padding: 8px 16px 16px; transform: translateY(110%); transition: transform .55s cubic-bezier(.2,.9,.2,1); box-shadow: 0 -20px 40px -10px rgba(0,0,0,.6); }
.hb-qg4[data-open="true"] .hb-qg4-sheet { transform: none; }
.hb-qg4-grab { width: 36px; height: 5px; border-radius: 3px; background: rgba(255,255,255,.2); margin: 0 auto 10px; }
.hb-qg4-sh { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.hb-qg4-sh b { display: inline-flex; align-items: center; gap: 6px; font-size: 16px; }
.hb-qg4-sh b svg { width: 16px; height: 16px; }
.hb-qg4-x { width: 26px; height: 26px; border-radius: 50%; border: 0; background: rgba(255,255,255,.08); color: #a1a1a1; cursor: pointer; display: grid; place-items: center; padding: 0; }
.hb-qg4-rows { border-radius: 14px; background: #2a2a2d; overflow: hidden; }
.hb-qg4-row { display: grid; grid-template-columns: 54px 1fr auto; gap: 8px; align-items: center; padding: 9px 12px; font-size: 12px; }
.hb-qg4-row + .hb-qg4-row { border-top: 1px solid rgba(255,255,255,.06); }
.hb-qg4-row > span:first-child { color: #8f8f8f; font-size: 11px; }
.hb-qg4-row b { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-qg4-row svg { width: 10px; height: 10px; color: #6b6b6b; }
.hb-qg4-card { display: inline-flex; align-items: center; gap: 6px; }
.hb-qg4-card i { width: 22px; height: 14px; border-radius: 3px; background: linear-gradient(135deg, var(--hb-qg4-accent), #7c2d12); flex: none; }
.hb-qg4-pay { display: flex; justify-content: space-between; align-items: baseline; margin: 12px 4px; }
.hb-qg4-pay span { font-size: 12px; color: #8f8f8f; }
.hb-qg4-pay b { font-size: 20px; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-qg4-slide { position: relative; height: 52px; border-radius: 26px; background: #2a2a2d; overflow: hidden; touch-action: none; user-select: none; }
.hb-qg4-fill { position: absolute; inset: 0 auto 0 0; background: color-mix(in srgb, var(--hb-qg4-accent) 35%, #2a2a2d); border-radius: 26px; }
.hb-qg4-hint { position: absolute; inset: 0; display: grid; place-items: center; font-size: 13px; font-weight: 500; color: transparent; background: linear-gradient(90deg, #6b6b6b 30%, #f4f4f5 50%, #6b6b6b 70%) 0 0 / 200% 100%; -webkit-background-clip: text; background-clip: text; animation: hb-qg4-hint 2.4s linear infinite; padding-left: 40px; }
@keyframes hb-qg4-hint { from { background-position: 100% 0; } to { background-position: -100% 0; } }
.hb-qg4-thumb { position: absolute; left: 4px; top: 4px; width: 44px; height: 44px; border-radius: 50%; border: 0; background: var(--hb-qg4-accent); color: #fff; cursor: grab; display: grid; place-items: center; box-shadow: 0 6px 16px -6px var(--hb-qg4-accent); padding: 0; }
.hb-qg4-thumb:active { cursor: grabbing; }
.hb-qg4-slide[data-drag="false"] .hb-qg4-thumb, .hb-qg4-slide[data-drag="false"] .hb-qg4-fill { transition: left .35s cubic-bezier(.2,.9,.2,1), width .35s cubic-bezier(.2,.9,.2,1); }
.hb-qg4-thumb svg { width: 18px; height: 18px; }
.hb-qg4-spin { width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: hb-qg4-rot .8s linear infinite; }
@keyframes hb-qg4-rot { to { transform: rotate(360deg); } }
.hb-qg4-done { display: grid; justify-items: center; gap: 6px; padding: 14px 0 6px; text-align: center; }
.hb-qg4-ok { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: var(--hb-qg4-accent); color: #fff; animation: hb-qg4-pop .45s cubic-bezier(.3,1.5,.5,1); }
@keyframes hb-qg4-pop { from { transform: scale(.5); opacity: 0; } }
.hb-qg4-done b { font-size: 15px; margin-top: 6px; }
.hb-qg4-done span { font-size: 12px; color: #8f8f8f; }
.hb-qg4-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-qg4 *, .hb-qg4 *::before, .hb-qg4 *::after { animation: none !important; transition: none !important; }
  .hb-qg4-hint { color: #a1a1a1; background: none; }
}
`;

function Headphones() {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <path d="M30 92V78a50 50 0 01100 0v14" stroke="#e5e5e5" strokeWidth="9" strokeLinecap="round" />
      <path d="M30 92V78a50 50 0 01100 0v14" stroke="rgba(0,0,0,.25)" strokeWidth="3" strokeLinecap="round" transform="translate(0 3)" />
      <rect x="18" y="84" width="34" height="52" rx="15" fill="var(--hb-qg4-swatch)" />
      <rect x="108" y="84" width="34" height="52" rx="15" fill="var(--hb-qg4-swatch)" />
      <rect x="26" y="92" width="18" height="36" rx="9" fill="rgba(0,0,0,.28)" />
      <rect x="116" y="92" width="18" height="36" rx="9" fill="rgba(0,0,0,.28)" />
      <path d="M24 96c2-6 6-9 12-9" stroke="rgba(255,255,255,.45)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M114 96c2-6 6-9 12-9" stroke="rgba(255,255,255,.45)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function WalletGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="13" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11.5" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

export function CheckoutMobileSheet({
  eyebrow = "Mobile checkout",
  title = "Checkout in one gesture",
  subtitle = "A wallet-style sheet that rises over the product page, fills itself from saved details and confirms with a single slide. No forms, no new page.",
  points = defaultPoints,
  merchant = "Aria Audio",
  product = defaultProduct,
  shipping = 0,
  cardLabel = "Harbor Card 4242",
  address = "88 Larkin St, San Francisco",
  defaultOpen = true,
  currency = "USD",
  onConfirm,
  accent = "#ff6b4a",
  className = "",
  style,
  ...rest
}: CheckoutMobileSheetProps) {
  const money = React.useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency }), [currency]);
  const [open, setOpen] = React.useState(defaultOpen);
  const [color, setColor] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [drag, setDrag] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "processing" | "done">("idle");
  const trackRef = React.useRef<HTMLDivElement>(null);
  const startX = React.useRef(0);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const total = product.price + shipping;
  const swatch = product.colors[color] ?? product.colors[0];

  const confirm = () => {
    if (status !== "idle") return;
    setProgress(1);
    setStatus("processing");
    timer.current = setTimeout(() => {
      setStatus("done");
      onConfirm?.({ product: product.name, color: swatch?.name ?? "", total });
    }, 900);
  };

  const span = () => {
    const el = trackRef.current;
    return el ? Math.max(1, el.clientWidth - 52) : 1;
  };

  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (status !== "idle") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    setDrag(true);
  };
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    setProgress(Math.max(0, Math.min(1, (e.clientX - startX.current) / span())));
  };
  const onUp = () => {
    if (!drag) return;
    setDrag(false);
    if (progress > 0.9) confirm();
    else setProgress(0);
  };
  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (status !== "idle") return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = Math.min(1, progress + 0.25);
      if (next >= 1) confirm();
      else setProgress(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setProgress(Math.max(0, progress - 0.25));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      confirm();
    }
  };

  const close = () => {
    setOpen(false);
    if (status === "done") {
      setStatus("idle");
      setProgress(0);
    }
  };

  const vars = { "--hb-qg4-accent": accent, "--hb-qg4-swatch": swatch?.value ?? accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-qg4 ${className}`} style={vars} data-open={open ? "true" : "false"} {...rest}>
      <style href="hb-checkout-mobile-sheet" precedence="default">{css}</style>
      <div className="hb-qg4-inner">
        <div>
          {eyebrow ? <p className="hb-qg4-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-qg4-title">{title}</h2>
          {subtitle ? <p className="hb-qg4-sub">{subtitle}</p> : null}
          <ul className="hb-qg4-points">
            {points.map((p) => (
              <li key={p.label}><b>{p.value}</b><span>{p.label}</span></li>
            ))}
          </ul>
        </div>
        <div className="hb-qg4-phone">
          <div className="hb-qg4-screen">
            <span className="hb-qg4-island" aria-hidden="true" />
            <div className="hb-qg4-status" aria-hidden="true"><span>9:41</span><i /></div>
            <div className="hb-qg4-nav" aria-hidden="true">
              <span><svg viewBox="0 0 14 14" fill="none"><path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <span><svg viewBox="0 0 14 14" fill="none"><path d="M7 12s-4.5-2.7-4.5-6A2.5 2.5 0 017 4.4 2.5 2.5 0 0111.5 6c0 3.3-4.5 6-4.5 6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg></span>
            </div>
            <div className="hb-qg4-art"><Headphones /></div>
            <div className="hb-qg4-info">
              <small>{merchant}</small>
              <h3><span>{product.name}</span><span>{money.format(product.price)}</span></h3>
              <small>{product.subtitle}</small>
              <div className="hb-qg4-swatches" role="radiogroup" aria-label="Color">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    role="radio"
                    aria-checked={i === color}
                    aria-label={c.name}
                    className="hb-qg4-sw"
                    style={{ background: c.value }}
                    onClick={() => setColor(i)}
                    tabIndex={open ? -1 : 0}
                  />
                ))}
              </div>
            </div>
            <button type="button" className="hb-qg4-buy" onClick={() => setOpen(true)} tabIndex={open ? -1 : 0} aria-haspopup="dialog">
              Buy with <WalletGlyph /> Pay
            </button>
            <div className="hb-qg4-dim" onClick={close} aria-hidden="true" />
            <div className="hb-qg4-sheet" role="dialog" aria-label={`Pay ${merchant}`} aria-hidden={open ? undefined : true} onKeyDown={(e) => { if (e.key === "Escape") close(); }}>
              <div className="hb-qg4-grab" aria-hidden="true" />
              <div className="hb-qg4-sh">
                <b><WalletGlyph />Pay</b>
                <button type="button" className="hb-qg4-x" aria-label="Close" onClick={close} tabIndex={open ? 0 : -1}>
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </button>
              </div>
              {status === "done" ? (
                <div className="hb-qg4-done" role="status">
                  <span className="hb-qg4-ok">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <b>Paid {money.format(total)}</b>
                  <span>{product.name} in {swatch?.name}, arriving Thursday</span>
                </div>
              ) : (
                <>
                  <div className="hb-qg4-rows">
                    <div className="hb-qg4-row"><span>Card</span><b className="hb-qg4-card"><i />{cardLabel}</b><ChevronSmall /></div>
                    <div className="hb-qg4-row"><span>Ship to</span><b>{address}</b><ChevronSmall /></div>
                    <div className="hb-qg4-row"><span>Delivery</span><b>{shipping === 0 ? "Free, 2 to 3 days" : `${money.format(shipping)}, 2 days`}</b><ChevronSmall /></div>
                  </div>
                  <div className="hb-qg4-pay"><span>Pay {merchant}</span><b>{money.format(total)}</b></div>
                  <div ref={trackRef} className="hb-qg4-slide" data-drag={drag ? "true" : "false"}>
                    <span className="hb-qg4-fill" style={{ width: `calc(52px + (100% - 52px) * ${(progress).toFixed(3)})` }} />
                    <span className="hb-qg4-hint" aria-hidden="true">{status === "processing" ? "Confirming" : "Slide to pay"}</span>
                    <button
                      type="button"
                      className="hb-qg4-thumb"
                      style={{ left: `calc(4px + (100% - 52px) * ${(progress).toFixed(3)})` }}
                      aria-label={`Slide or press Enter to pay ${money.format(total)}`}
                      onPointerDown={onDown}
                      onPointerMove={onMove}
                      onPointerUp={onUp}
                      onPointerCancel={onUp}
                      onKeyDown={onKey}
                      tabIndex={open ? 0 : -1}
                    >
                      {status === "processing" ? (
                        <span className="hb-qg4-spin" aria-hidden="true" />
                      ) : (
                        <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </button>
                  </div>
                </>
              )}
              <span className="hb-qg4-sr" aria-live="polite">{status === "processing" ? "Confirming payment" : ""}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronSmall() {
  return <svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M3.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

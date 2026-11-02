"use client";

import * as React from "react";

export interface CheckoutItem {
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  tone?: string;
}

export interface DeliveryOption {
  id: string;
  label: string;
  eta: string;
  price: number;
}

export interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postal: string;
  country: string;
}

export interface CheckoutResult {
  shipping: ShippingInfo;
  delivery: DeliveryOption;
  payment: "card" | "bank" | "later";
  total: number;
}

export interface ShopCheckoutStepsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  items?: CheckoutItem[];
  deliveryOptions?: DeliveryOption[];
  defaultDelivery?: string;
  defaultShipping?: Partial<ShippingInfo>;
  countries?: string[];
  currency?: string;
  taxRate?: number;
  orderNumber?: string;
  onStepChange?: (step: number) => void;
  onComplete?: (result: CheckoutResult) => void;
  accent?: string;
}

const steps = [
  { label: "Shipping", hint: "Address and delivery" },
  { label: "Payment", hint: "How you pay" },
  { label: "Review", hint: "Confirm the order" },
];

const payments: { id: CheckoutResult["payment"]; label: string; hint: string }[] = [
  { id: "card", label: "Card", hint: "Debit or credit" },
  { id: "bank", label: "Bank transfer", hint: "Ships after payment clears" },
  { id: "later", label: "Pay in 4", hint: "Interest free, every 2 weeks" },
];

const emptyShipping: ShippingInfo = { email: "", firstName: "", lastName: "", address: "", city: "", postal: "", country: "United States" };

function money(value: number, currency: string) {
  const [whole, cents] = value.toFixed(2).split(".");
  return `${currency}${whole.replace(/\B(?=(\d{3})+$)/g, ",")}.${cents}`;
}

const css = `
.hb-ki8 {
  --hb-ki8-accent: #7c5cff;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-ki8 *, .hb-ki8 *::before, .hb-ki8 *::after { box-sizing: border-box; }
.hb-ki8-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(36px, 5.5cqi, 96px) clamp(16px, 4cqi, 40px) clamp(56px, 8cqi, 104px);
}
.hb-ki8-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 24px; }
.hb-ki8-title { margin: 0; font-size: clamp(24px, 3cqi, 30px); font-weight: 650; letter-spacing: -.03em; }
.hb-ki8-secure { display: inline-flex; align-items: center; gap: 6px; color: #8f8f8f; font-size: 13px; }
.hb-ki8-secure svg { width: 14px; height: 14px; color: #4ade80; }
.hb-ki8-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0 0 24px;
  padding: 0;
  list-style: none;
}
.hb-ki8-step { position: relative; min-width: 0; }
.hb-ki8-step + .hb-ki8-step::before {
  content: "";
  position: absolute;
  top: 17px;
  left: calc(-50% + 26px);
  right: calc(50% + 26px);
  height: 2px;
  border-radius: 2px;
  background: rgba(255,255,255,.08);
}
.hb-ki8-step + .hb-ki8-step::after {
  content: "";
  position: absolute;
  top: 17px;
  left: calc(-50% + 26px);
  right: calc(50% + 26px);
  height: 2px;
  border-radius: 2px;
  background: var(--hb-ki8-accent);
  transform-origin: left;
  transform: scaleX(0);
  transition: transform .6s cubic-bezier(.65,0,.25,1);
}
.hb-ki8-step[data-state="done"] + .hb-ki8-step::after { transform: scaleX(1); }
.hb-ki8-sbtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: center;
  cursor: default;
}
.hb-ki8-sbtn:not(:disabled) { cursor: pointer; }
.hb-ki8-sbtn:focus-visible { outline: none; }
.hb-ki8-sbtn:focus-visible .hb-ki8-dot { outline: 2px solid var(--hb-ki8-accent); outline-offset: 3px; }
.hb-ki8-dot {
  position: relative;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #111;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.12);
  color: #8f8f8f;
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  transition: background-color .3s ease, box-shadow .3s ease, color .3s ease;
}
.hb-ki8-step[data-state="current"] .hb-ki8-dot {
  background: color-mix(in srgb, var(--hb-ki8-accent) 16%, #111);
  box-shadow: inset 0 0 0 1.5px var(--hb-ki8-accent), 0 0 0 5px color-mix(in srgb, var(--hb-ki8-accent) 14%, transparent);
  color: #fff;
}
.hb-ki8-step[data-state="done"] .hb-ki8-dot { background: var(--hb-ki8-accent); box-shadow: none; color: #fff; }
.hb-ki8-dot svg { width: 16px; height: 16px; }
.hb-ki8-dot path { stroke-dasharray: 18; stroke-dashoffset: 18; animation: hb-ki8-draw .4s .15s ease forwards; }
.hb-ki8-slabel { font-size: 13.5px; font-weight: 600; }
.hb-ki8-step[data-state="upcoming"] .hb-ki8-slabel { color: #8f8f8f; }
.hb-ki8-shint { display: none; margin-top: -4px; color: #6b6b6b; font-size: 12px; }
.hb-ki8-grid { display: grid; gap: 20px; }
.hb-ki8-card {
  min-width: 0;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 22px;
  background: linear-gradient(180deg, #121212, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
  padding: clamp(18px, 2.6cqi, 28px);
}
.hb-ki8-pane { animation: hb-ki8-in .45s cubic-bezier(.2,.7,.2,1) both; }
.hb-ki8-h { margin: 0 0 16px; font-size: 15px; font-weight: 600; }
.hb-ki8-h + .hb-ki8-fields { margin-top: 0; }
.hb-ki8-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.hb-ki8-field { display: grid; gap: 6px; min-width: 0; grid-column: span 2; }
.hb-ki8-half { grid-column: span 1; }
.hb-ki8-field span { color: #a1a1a1; font-size: 12.5px; font-weight: 500; }
.hb-ki8-input {
  width: 100%;
  height: 42px;
  padding: 0 13px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 11px;
  background: #0a0a0a;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
  appearance: none;
}
.hb-ki8-input::placeholder { color: #555; }
.hb-ki8-input:focus { border-color: color-mix(in srgb, var(--hb-ki8-accent) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ki8-accent) 20%, transparent); }
select.hb-ki8-input {
  padding-right: 36px;
  background-image: linear-gradient(45deg, transparent 50%, #8f8f8f 50%), linear-gradient(135deg, #8f8f8f 50%, transparent 50%);
  background-position: calc(100% - 18px) 18px, calc(100% - 13px) 18px;
  background-size: 5px 5px;
  background-repeat: no-repeat;
}
.hb-ki8-sep { height: 1px; margin: 22px 0; background: rgba(255,255,255,.07); border: 0; }
.hb-ki8-radios { display: grid; gap: 10px; }
.hb-ki8-radio {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 14px;
  background: #0b0b0b;
  cursor: pointer;
  transition: border-color .2s ease, background-color .2s ease, box-shadow .2s ease;
}
.hb-ki8-radio:hover { border-color: rgba(255,255,255,.2); }
.hb-ki8-radio[data-checked="true"] {
  border-color: var(--hb-ki8-accent);
  background: color-mix(in srgb, var(--hb-ki8-accent) 8%, #0b0b0b);
  box-shadow: 0 0 0 1px var(--hb-ki8-accent);
}
.hb-ki8-radio input { position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none; }
.hb-ki8-radio:has(input:focus-visible) { outline: 2px solid var(--hb-ki8-accent); outline-offset: 2px; }
.hb-ki8-ring {
  display: grid;
  place-items: center;
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1.5px rgba(255,255,255,.25);
  transition: box-shadow .2s ease;
}
.hb-ki8-ring::after {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  transform: scale(0);
  transition: transform .25s cubic-bezier(.2,.9,.3,1.4);
}
.hb-ki8-radio[data-checked="true"] .hb-ki8-ring { box-shadow: inset 0 0 0 9px var(--hb-ki8-accent); }
.hb-ki8-radio[data-checked="true"] .hb-ki8-ring::after { transform: scale(1); }
.hb-ki8-rtext { display: grid; gap: 2px; flex: 1; min-width: 0; }
.hb-ki8-rtext b { font-size: 14px; font-weight: 600; }
.hb-ki8-rtext small { color: #8f8f8f; font-size: 12.5px; }
.hb-ki8-rprice { font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-ki8-free { color: #4ade80; }
.hb-ki8-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 24px; }
.hb-ki8-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 44px;
  margin: 0;
  padding: 0 4px;
  border: 0;
  background: none;
  color: #a1a1a1;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
}
.hb-ki8-back:hover { color: #ededed; }
.hb-ki8-back:focus-visible { outline: 2px solid var(--hb-ki8-accent); outline-offset: 2px; }
.hb-ki8-back svg { width: 14px; height: 14px; }
.hb-ki8-next {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  margin: 0 0 0 auto;
  padding: 0 22px;
  border: 0;
  border-radius: 14px;
  background: var(--hb-ki8-accent);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 12px 30px -14px var(--hb-ki8-accent);
  color: #fff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: filter .2s ease, transform .15s ease;
}
.hb-ki8-next svg { width: 15px; height: 15px; transition: transform .25s ease; }
.hb-ki8-next:hover { filter: brightness(1.1); }
.hb-ki8-next:hover svg { transform: translateX(3px); }
.hb-ki8-next:active { transform: scale(.985); }
.hb-ki8-next:disabled { opacity: .6; cursor: progress; }
.hb-ki8-next:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }
.hb-ki8-check { display: flex; align-items: center; gap: 10px; margin-top: 16px; color: #c9c9c9; font-size: 13.5px; cursor: pointer; }
.hb-ki8-check input { width: 16px; height: 16px; margin: 0; accent-color: var(--hb-ki8-accent); }
.hb-ki8-review { margin: 0; padding: 0; list-style: none; }
.hb-ki8-review li { display: flex; align-items: flex-start; gap: 16px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
.hb-ki8-review li:first-child { padding-top: 0; }
.hb-ki8-rk { width: 92px; flex: none; color: #8f8f8f; font-size: 13px; }
.hb-ki8-rv { flex: 1; min-width: 0; margin: 0; color: #ededed; font-size: 14px; line-height: 1.5; }
.hb-ki8-edit {
  margin: 0;
  padding: 2px 6px;
  border: 0;
  border-radius: 6px;
  background: none;
  color: color-mix(in srgb, var(--hb-ki8-accent) 70%, #fff);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}
.hb-ki8-edit:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-ki8-edit:focus-visible { outline: 2px solid var(--hb-ki8-accent); outline-offset: 1px; }
.hb-ki8-spin { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 50%; animation: hb-ki8-rot .7s linear infinite; }
.hb-ki8-done { display: grid; justify-items: center; gap: 12px; padding: 28px 8px; text-align: center; }
.hb-ki8-badge {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-ki8-accent) 16%, transparent);
  box-shadow: inset 0 0 0 1.5px var(--hb-ki8-accent), 0 0 40px -6px var(--hb-ki8-accent);
  color: #fff;
  animation: hb-ki8-pop .5s cubic-bezier(.2,.9,.3,1.3) both;
}
.hb-ki8-badge svg { width: 28px; height: 28px; }
.hb-ki8-badge path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-ki8-draw .5s .3s ease forwards; }
.hb-ki8-done h3 { margin: 4px 0 0; font-size: 22px; font-weight: 650; letter-spacing: -.02em; }
.hb-ki8-done p { margin: 0; max-width: 380px; color: #8f8f8f; font-size: 14px; line-height: 1.6; }
.hb-ki8-summary { align-self: start; }
.hb-ki8-items { display: grid; gap: 14px; margin: 0 0 18px; padding: 0; list-style: none; }
.hb-ki8-items li { display: flex; align-items: center; gap: 12px; }
.hb-ki8-thumb {
  position: relative;
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.18);
}
.hb-ki8-qty {
  position: absolute;
  top: -6px;
  right: -6px;
  display: grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 11px;
  font-weight: 700;
}
.hb-ki8-iname { flex: 1; min-width: 0; }
.hb-ki8-iname b { display: block; font-size: 13.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ki8-iname small { color: #8f8f8f; font-size: 12px; }
.hb-ki8-iprice { font-size: 13.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-ki8-totals { display: grid; gap: 10px; margin: 0; padding: 16px 0 0; border-top: 1px solid rgba(255,255,255,.07); }
.hb-ki8-totals div { display: flex; justify-content: space-between; color: #a1a1a1; font-size: 13.5px; }
.hb-ki8-totals dt, .hb-ki8-totals dd { margin: 0; }
.hb-ki8-totals dd { color: #ededed; font-variant-numeric: tabular-nums; }
.hb-ki8-total { display: flex; align-items: baseline; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.07); }
.hb-ki8-total span { color: #a1a1a1; font-size: 14px; }
.hb-ki8-total b { font-size: 24px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.hb-ki8-total b span { color: #6b6b6b; font-size: 12px; font-weight: 500; margin-right: 6px; }
.hb-ki8-perk { display: flex; align-items: center; gap: 8px; margin: 16px 0 0; padding: 12px 14px; border-radius: 12px; background: #0b0b0b; color: #a1a1a1; font-size: 12.5px; }
.hb-ki8-perk svg { width: 16px; height: 16px; flex: none; color: var(--hb-ki8-accent); }
.hb-ki8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 600px) {
  .hb-ki8-shint { display: block; }
  .hb-ki8-radios-row { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hb-ki8-radios-row .hb-ki8-radio { flex-direction: column; align-items: flex-start; }
  .hb-ki8-radios-row .hb-ki8-ring { position: absolute; top: 14px; right: 14px; }
  .hb-ki8-radios-row .hb-ki8-rtext { width: 100%; padding-right: 24px; }
}
@container (max-width: 480px) {
  .hb-ki8-half { grid-column: span 2; }
}
@container (min-width: 880px) {
  .hb-ki8-grid { grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 20px; align-items: start; }
}
@keyframes hb-ki8-in {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-ki8-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-ki8-rot { to { transform: rotate(360deg); } }
@keyframes hb-ki8-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ki8-pane, .hb-ki8-spin, .hb-ki8-badge { animation: none; }
  .hb-ki8-dot path, .hb-ki8-badge path { animation: none; stroke-dashoffset: 0; }
  .hb-ki8-step + .hb-ki8-step::after, .hb-ki8-dot, .hb-ki8-input, .hb-ki8-radio, .hb-ki8-ring, .hb-ki8-ring::after, .hb-ki8-next, .hb-ki8-next svg { transition: none; }
}
`;

const arrow = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const backArrow = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 8H3M7 4L3 8l4 4" />
  </svg>
);

export function ShopCheckoutSteps({
  title = "Checkout",
  items = [
    { name: "Aero Pour-Over Kettle", variant: "Matte black, 1L", price: 89, quantity: 1, tone: "#3a3f4b" },
    { name: "Single Origin Sampler", variant: "4 x 250g, whole bean", price: 54, quantity: 1, tone: "#7a4b2a" },
    { name: "Stoneware Cup", variant: "Sand", price: 18, quantity: 2, tone: "#c8b69a" },
  ],
  deliveryOptions = [
    { id: "standard", label: "Standard", eta: "5 to 7 business days", price: 0 },
    { id: "express", label: "Express", eta: "2 to 3 business days", price: 12 },
    { id: "overnight", label: "Overnight", eta: "Next business day", price: 28 },
  ],
  defaultDelivery,
  defaultShipping,
  countries = ["United States", "Canada", "United Kingdom", "Germany", "Australia"],
  currency = "$",
  taxRate = 0.0725,
  orderNumber = "NW-20418",
  onStepChange,
  onComplete,
  accent = "#7c5cff",
  className,
  style,
  ...rest
}: ShopCheckoutStepsProps) {
  const [step, setStep] = React.useState(0);
  const [ship, setShip] = React.useState<ShippingInfo>({ ...emptyShipping, ...defaultShipping });
  const [delivery, setDelivery] = React.useState(defaultDelivery ?? deliveryOptions[1]?.id ?? deliveryOptions[0]?.id ?? "");
  const [payment, setPayment] = React.useState<CheckoutResult["payment"]>("card");
  const [card, setCard] = React.useState({ name: "", number: "", expiry: "", cvc: "" });
  const [billingSame, setBillingSame] = React.useState(true);
  const [status, setStatus] = React.useState<"idle" | "placing" | "placed">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = React.useId();

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const option = deliveryOptions.find((o) => o.id === delivery) ?? deliveryOptions[0];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = option?.price ?? 0;
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = subtotal + shippingCost + tax;

  const go = (next: number) => {
    setStep(next);
    onStepChange?.(next);
  };

  const field = (key: keyof ShippingInfo) => ({
    id: `${uid}-${key}`,
    value: ship[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setShip((s) => ({ ...s, [key]: event.target.value })),
  });

  const place = () => {
    if (status !== "idle" || !option) return;
    setStatus("placing");
    timer.current = setTimeout(() => {
      setStatus("placed");
      onComplete?.({ shipping: ship, delivery: option, payment, total });
    }, 1100);
  };

  const formatCard = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
  };

  const last4 = card.number.replace(/\D/g, "").slice(-4);
  const paymentText =
    payment === "card" ? (last4 ? `Card ending in ${last4}` : "Card") : payment === "bank" ? "Bank transfer" : "Pay in 4 installments";

  return (
    <section
      className={className ? `hb-ki8 ${className}` : "hb-ki8"}
      style={{ "--hb-ki8-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-shop-checkout-steps" precedence="default">{css}</style>
      <div className="hb-ki8-inner">
        <div className="hb-ki8-top">
          <h2 className="hb-ki8-title">{title}</h2>
          <span className="hb-ki8-secure">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            Encrypted, secure checkout
          </span>
        </div>
        <ol className="hb-ki8-steps" aria-label="Checkout progress">
          {steps.map((s, i) => {
            const state = status === "placed" || i < step ? "done" : i === step ? "current" : "upcoming";
            return (
              <li key={s.label} className="hb-ki8-step" data-state={state}>
                <button
                  type="button"
                  className="hb-ki8-sbtn"
                  disabled={state !== "done" || status !== "idle"}
                  aria-current={state === "current" ? "step" : undefined}
                  onClick={() => go(i)}
                >
                  <span className="hb-ki8-dot">
                    {state === "done" ? (
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3.5 8.5l3 3 6-7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className="hb-ki8-slabel">{s.label}</span>
                  <span className="hb-ki8-shint">{s.hint}</span>
                  <span className="hb-ki8-sr">{state === "done" ? ", completed" : state === "current" ? ", current step" : ""}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="hb-ki8-grid">
          <div className="hb-ki8-card">
            {status === "placed" ? (
              <div className="hb-ki8-done hb-ki8-pane" role="status">
                <span className="hb-ki8-badge">
                  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 14.5l4.5 4.5L21 9.5" />
                  </svg>
                </span>
                <h3>Order {orderNumber} confirmed</h3>
                <p>
                  Thanks{ship.firstName ? `, ${ship.firstName}` : ""}. A receipt is on its way{ship.email ? ` to ${ship.email}` : ""}, and we will email tracking as soon as it ships with {option?.label.toLowerCase()} delivery.
                </p>
              </div>
            ) : step === 0 ? (
              <form
                className="hb-ki8-pane"
                key="ship"
                onSubmit={(event) => {
                  event.preventDefault();
                  go(1);
                }}
              >
                <h3 className="hb-ki8-h">Contact and address</h3>
                <div className="hb-ki8-fields">
                  <label className="hb-ki8-field" htmlFor={`${uid}-email`}>
                    <span>Email</span>
                    <input className="hb-ki8-input" type="email" required autoComplete="email" placeholder="you@example.com" {...field("email")} />
                  </label>
                  <label className="hb-ki8-field hb-ki8-half" htmlFor={`${uid}-firstName`}>
                    <span>First name</span>
                    <input className="hb-ki8-input" required autoComplete="given-name" placeholder="Jordan" {...field("firstName")} />
                  </label>
                  <label className="hb-ki8-field hb-ki8-half" htmlFor={`${uid}-lastName`}>
                    <span>Last name</span>
                    <input className="hb-ki8-input" required autoComplete="family-name" placeholder="Reyes" {...field("lastName")} />
                  </label>
                  <label className="hb-ki8-field" htmlFor={`${uid}-address`}>
                    <span>Street address</span>
                    <input className="hb-ki8-input" required autoComplete="street-address" placeholder="2150 Market Street, Apt 4" {...field("address")} />
                  </label>
                  <label className="hb-ki8-field hb-ki8-half" htmlFor={`${uid}-city`}>
                    <span>City</span>
                    <input className="hb-ki8-input" required autoComplete="address-level2" placeholder="San Francisco" {...field("city")} />
                  </label>
                  <label className="hb-ki8-field hb-ki8-half" htmlFor={`${uid}-postal`}>
                    <span>Postal code</span>
                    <input className="hb-ki8-input" required autoComplete="postal-code" placeholder="94114" {...field("postal")} />
                  </label>
                  <label className="hb-ki8-field" htmlFor={`${uid}-country`}>
                    <span>Country</span>
                    <select className="hb-ki8-input" autoComplete="country-name" {...field("country")}>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <hr className="hb-ki8-sep" />
                <h3 className="hb-ki8-h" id={`${uid}-dlabel`}>Delivery method</h3>
                <div className="hb-ki8-radios hb-ki8-radios-row" role="radiogroup" aria-labelledby={`${uid}-dlabel`}>
                  {deliveryOptions.map((o) => (
                    <label key={o.id} className="hb-ki8-radio" data-checked={o.id === delivery}>
                      <input type="radio" name={`${uid}-delivery`} value={o.id} checked={o.id === delivery} onChange={() => setDelivery(o.id)} />
                      <span className="hb-ki8-ring" aria-hidden="true" />
                      <span className="hb-ki8-rtext">
                        <b>{o.label}</b>
                        <small>{o.eta}</small>
                      </span>
                      <span className={o.price === 0 ? "hb-ki8-rprice hb-ki8-free" : "hb-ki8-rprice"}>{o.price === 0 ? "Free" : money(o.price, currency)}</span>
                    </label>
                  ))}
                </div>
                <div className="hb-ki8-actions">
                  <button type="submit" className="hb-ki8-next">
                    Continue to payment
                    {arrow}
                  </button>
                </div>
              </form>
            ) : step === 1 ? (
              <form
                className="hb-ki8-pane"
                key="pay"
                onSubmit={(event) => {
                  event.preventDefault();
                  go(2);
                }}
              >
                <h3 className="hb-ki8-h" id={`${uid}-plabel`}>Payment method</h3>
                <div className="hb-ki8-radios hb-ki8-radios-row" role="radiogroup" aria-labelledby={`${uid}-plabel`}>
                  {payments.map((p) => (
                    <label key={p.id} className="hb-ki8-radio" data-checked={p.id === payment}>
                      <input type="radio" name={`${uid}-payment`} value={p.id} checked={p.id === payment} onChange={() => setPayment(p.id)} />
                      <span className="hb-ki8-ring" aria-hidden="true" />
                      <span className="hb-ki8-rtext">
                        <b>{p.label}</b>
                        <small>{p.hint}</small>
                      </span>
                    </label>
                  ))}
                </div>
                {payment === "card" && (
                  <>
                    <hr className="hb-ki8-sep" />
                    <div className="hb-ki8-fields">
                      <label className="hb-ki8-field" htmlFor={`${uid}-cname`}>
                        <span>Name on card</span>
                        <input id={`${uid}-cname`} className="hb-ki8-input" required autoComplete="cc-name" placeholder="Jordan Reyes" value={card.name} onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))} />
                      </label>
                      <label className="hb-ki8-field" htmlFor={`${uid}-cnum`}>
                        <span>Card number</span>
                        <input id={`${uid}-cnum`} className="hb-ki8-input" required inputMode="numeric" autoComplete="cc-number" placeholder="1234 1234 1234 1234" value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: formatCard(e.target.value) }))} />
                      </label>
                      <label className="hb-ki8-field hb-ki8-half" htmlFor={`${uid}-cexp`}>
                        <span>Expiry</span>
                        <input id={`${uid}-cexp`} className="hb-ki8-input" required inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))} />
                      </label>
                      <label className="hb-ki8-field hb-ki8-half" htmlFor={`${uid}-ccvc`}>
                        <span>Security code</span>
                        <input id={`${uid}-ccvc`} className="hb-ki8-input" required inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={card.cvc} onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))} />
                      </label>
                    </div>
                    <label className="hb-ki8-check">
                      <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} />
                      Billing address is the same as shipping
                    </label>
                  </>
                )}
                <div className="hb-ki8-actions">
                  <button type="button" className="hb-ki8-back" onClick={() => go(0)}>
                    {backArrow}
                    Back to shipping
                  </button>
                  <button type="submit" className="hb-ki8-next">
                    Review order
                    {arrow}
                  </button>
                </div>
              </form>
            ) : (
              <div className="hb-ki8-pane" key="review">
                <h3 className="hb-ki8-h">Review and place order</h3>
                <ul className="hb-ki8-review">
                  <li>
                    <span className="hb-ki8-rk">Ship to</span>
                    <span className="hb-ki8-rv">
                      {[ship.firstName, ship.lastName].filter(Boolean).join(" ") || "Name not set"}
                      <br />
                      {[ship.address, ship.city, ship.postal].filter(Boolean).join(", ") || "Address not set"}
                      <br />
                      {ship.country}
                    </span>
                    <button type="button" className="hb-ki8-edit" onClick={() => go(0)} aria-label="Edit shipping address">Edit</button>
                  </li>
                  <li>
                    <span className="hb-ki8-rk">Delivery</span>
                    <span className="hb-ki8-rv">
                      {option?.label}, {option?.eta.toLowerCase()} · {option && option.price === 0 ? "Free" : money(shippingCost, currency)}
                    </span>
                    <button type="button" className="hb-ki8-edit" onClick={() => go(0)} aria-label="Edit delivery method">Edit</button>
                  </li>
                  <li>
                    <span className="hb-ki8-rk">Payment</span>
                    <span className="hb-ki8-rv">{paymentText}</span>
                    <button type="button" className="hb-ki8-edit" onClick={() => go(1)} aria-label="Edit payment">Edit</button>
                  </li>
                </ul>
                <div className="hb-ki8-actions">
                  <button type="button" className="hb-ki8-back" onClick={() => go(1)}>
                    {backArrow}
                    Back to payment
                  </button>
                  <button type="button" className="hb-ki8-next" onClick={place} disabled={status !== "idle"}>
                    {status === "placing" ? <span className="hb-ki8-spin" aria-hidden="true" /> : null}
                    {status === "placing" ? "Placing order" : `Place order · ${money(total, currency)}`}
                  </button>
                </div>
              </div>
            )}
          </div>
          <aside className="hb-ki8-card hb-ki8-summary" aria-label="Order summary">
            <h3 className="hb-ki8-h">Order summary</h3>
            <ul className="hb-ki8-items">
              {items.map((item) => {
                const tone = item.tone ?? "#3a3a3a";
                return (
                  <li key={item.name}>
                    <span
                      className="hb-ki8-thumb"
                      style={{ background: `radial-gradient(circle at 30% 25%, color-mix(in srgb, ${tone} 55%, #fff) 0%, transparent 55%), linear-gradient(150deg, ${tone}, color-mix(in srgb, ${tone} 40%, #000))` }}
                      aria-hidden="true"
                    >
                      <span className="hb-ki8-qty">{item.quantity}</span>
                    </span>
                    <span className="hb-ki8-iname">
                      <b>{item.name}</b>
                      {item.variant && <small>{item.variant}</small>}
                    </span>
                    <span className="hb-ki8-iprice">{money(item.price * item.quantity, currency)}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="hb-ki8-totals">
              <div>
                <dt>Subtotal</dt>
                <dd>{money(subtotal, currency)}</dd>
              </div>
              <div>
                <dt>Shipping · {option?.label}</dt>
                <dd>{shippingCost === 0 ? "Free" : money(shippingCost, currency)}</dd>
              </div>
              <div>
                <dt>Tax</dt>
                <dd>{money(tax, currency)}</dd>
              </div>
            </dl>
            <div className="hb-ki8-total">
              <span>Total</span>
              <b>
                <span>USD</span>
                {money(total, currency)}
              </b>
            </div>
            <p className="hb-ki8-perk">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 1.5l5 2v4c0 3.2-2.2 5.8-5 7-2.8-1.2-5-3.8-5-7v-4l5-2z" />
                <path d="M5.8 8l1.6 1.6L10.4 6.4" />
              </svg>
              Free returns for 60 days. Pay only when it ships.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";

export type OrderMode = "delivery" | "pickup";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options?: string;
  note?: string;
  color?: string;
}

export interface DeliveryArea {
  id: string;
  label: string;
  fee: number;
  eta?: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  hint?: string;
  icon?: "cash" | "card" | "instant" | "wallet";
}

export interface PickupStore {
  name: string;
  address: string;
  readyTime?: string;
}

export interface CouponResult {
  code: string;
  discount: number;
  label?: string;
}

export interface CartOrder {
  items: CartLine[];
  mode: OrderMode;
  area: DeliveryArea | null;
  customer: { name: string; phone: string };
  address: { street: string; details: string } | null;
  payment: PaymentMethod | null;
  coupon: CouponResult | null;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export interface OrderCartDrawerLabels {
  title: string;
  close: string;
  empty: string;
  emptyHint: string;
  addNote: string;
  editNote: string;
  notePlaceholder: string;
  remove: string;
  decrease: string;
  increase: string;
  delivery: string;
  pickup: string;
  area: string;
  areaPlaceholder: string;
  details: string;
  name: string;
  phone: string;
  street: string;
  streetDetails: string;
  pickupAt: string;
  readyIn: string;
  payment: string;
  coupon: string;
  couponPlaceholder: string;
  apply: string;
  removeCoupon: string;
  couponInvalid: string;
  couponApplied: string;
  subtotal: string;
  deliveryFee: string;
  deliveryPending: string;
  deliveryFree: string;
  discount: string;
  total: string;
  submit: string;
  sending: string;
  required: string;
  sentTitle: string;
  sentText: string;
  newOrder: string;
}

export interface OrderCartDrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  inline?: boolean;
  items?: CartLine[];
  defaultItems?: CartLine[];
  onItemsChange?: (items: CartLine[]) => void;
  mode?: OrderMode;
  defaultMode?: OrderMode;
  onModeChange?: (mode: OrderMode) => void;
  areas?: DeliveryArea[];
  defaultAreaId?: string;
  store?: PickupStore;
  paymentMethods?: PaymentMethod[];
  defaultPaymentId?: string;
  onApplyCoupon?: (code: string, subtotal: number) => CouponResult | null | Promise<CouponResult | null>;
  onSubmit?: (order: CartOrder) => void | Promise<void>;
  onNewOrder?: () => void;
  currency?: string;
  locale?: string;
  theme?: "dark" | "light";
  accent?: string;
  labels?: Partial<OrderCartDrawerLabels>;
}

const defaultLabels: OrderCartDrawerLabels = {
  title: "Your order",
  close: "Close",
  empty: "Your order is empty",
  emptyHint: "Add something from the menu to get started.",
  addNote: "Add note",
  editNote: "Edit note",
  notePlaceholder: "Note for the kitchen",
  remove: "Remove",
  decrease: "Decrease quantity",
  increase: "Increase quantity",
  delivery: "Delivery",
  pickup: "Pickup",
  area: "Delivery area",
  areaPlaceholder: "Choose your area",
  details: "Your details",
  name: "Name",
  phone: "Phone",
  street: "Street and number",
  streetDetails: "Apt, floor, landmark (optional)",
  pickupAt: "Pick up at",
  readyIn: "Ready in",
  payment: "Payment",
  coupon: "Coupon",
  couponPlaceholder: "Enter code",
  apply: "Apply",
  removeCoupon: "Remove",
  couponInvalid: "This code is not valid",
  couponApplied: "{code} applied",
  subtotal: "Subtotal",
  deliveryFee: "Delivery",
  deliveryPending: "Choose an area",
  deliveryFree: "Free",
  discount: "Discount",
  total: "Total",
  submit: "Send order",
  sending: "Sending",
  required: "Required",
  sentTitle: "Order sent",
  sentText: "We will confirm your order on chat in a few minutes.",
  newOrder: "Start a new order",
};

const defaultItems: CartLine[] = [
  { id: "smash-double", name: "Smash Double", price: 11.5, quantity: 2, options: "Medium · Extra cheese", color: "#e0752d" },
  { id: "truffle-fries", name: "Truffle Fries", price: 6, quantity: 1, options: "Large", note: "Extra crispy, please", color: "#d9a632" },
  { id: "vanilla-shake", name: "Vanilla Bean Shake", price: 6.5, quantity: 1, color: "#c98fb4" },
];

const defaultAreas: DeliveryArea[] = [
  { id: "downtown", label: "Downtown", fee: 2.99, eta: "25-35 min" },
  { id: "riverside", label: "Riverside", fee: 3.99, eta: "30-40 min" },
  { id: "hillcrest", label: "Hillcrest", fee: 4.99, eta: "35-45 min" },
  { id: "northgate", label: "Northgate", fee: 5.99, eta: "40-50 min" },
];

const defaultStore: PickupStore = { name: "Corner Kitchen", address: "214 Grand Street, Brooklyn, NY", readyTime: "15-20 min" };

const defaultPayments: PaymentMethod[] = [
  { id: "cash", label: "Pay on delivery", hint: "Cash or card at the door", icon: "cash" },
  { id: "card", label: "Card", hint: "We send a secure card link on chat", icon: "card" },
  { id: "instant", label: "Instant transfer", hint: "Transfer key sent on chat", icon: "instant" },
];

const css = `
.hb-ob2 {
  --hb-ob2-bg: #0f0f0f;
  --hb-ob2-surface: #171717;
  --hb-ob2-raised: #1d1d1d;
  --hb-ob2-line: #262626;
  --hb-ob2-text: #ededed;
  --hb-ob2-muted: #a1a1a1;
  --hb-ob2-faint: #6f6f6f;
  --hb-ob2-danger: #ff6b6b;
  --hb-ob2-ok: #4ade80;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--hb-ob2-line);
  background: var(--hb-ob2-bg);
  color: var(--hb-ob2-text);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
  container-type: inline-size;
}
.hb-ob2 *, .hb-ob2 *::before, .hb-ob2 *::after { box-sizing: border-box; }
.hb-ob2[data-theme="light"] {
  --hb-ob2-bg: #fbfaf7;
  --hb-ob2-surface: #ffffff;
  --hb-ob2-raised: #f3f1ec;
  --hb-ob2-line: #e6e3dc;
  --hb-ob2-text: #151515;
  --hb-ob2-muted: #63605a;
  --hb-ob2-faint: #9a968e;
  --hb-ob2-danger: #d63c3c;
  --hb-ob2-ok: #16a34a;
}
.hb-ob2[data-inline="true"] { height: 100%; max-height: inherit; border-radius: 18px; }
.hb-ob2[data-inline="false"] {
  position: relative;
  max-height: 92dvh;
  border-radius: 22px 22px 0 0;
  border-bottom: 0;
  box-shadow: 0 -24px 60px -20px rgba(0, 0, 0, 0.55);
  animation: hb-ob2-sheet 0.42s cubic-bezier(0.2, 0.9, 0.25, 1) both;
}
.hb-ob2:focus { outline: none; }
.hb-ob2-layer {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100dvh;
}
.hb-ob2-scrim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.56);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  animation: hb-ob2-fade 0.3s ease both;
}
@media (min-width: 640px) {
  .hb-ob2-layer { justify-content: flex-end; align-items: stretch; }
  .hb-ob2[data-inline="false"] {
    width: 420px;
    max-height: none;
    height: 100dvh;
    border-radius: 22px 0 0 22px;
    border-bottom: 1px solid var(--hb-ob2-line);
    border-right: 0;
    animation-name: hb-ob2-side;
  }
}
.hb-ob2-grab { display: flex; justify-content: center; padding-top: 8px; }
.hb-ob2-grab span { width: 36px; height: 4px; border-radius: 99px; background: var(--hb-ob2-line); }
@media (min-width: 640px) { .hb-ob2-grab { display: none; } }
.hb-ob2[data-inline="true"] .hb-ob2-grab { display: none; }
.hb-ob2-head {
  display: flex;
  flex: none;
  align-items: center;
  gap: 10px;
  padding: 12px 12px 10px 16px;
  border-bottom: 1px solid var(--hb-ob2-line);
}
.hb-ob2-title { margin: 0; font-size: 15px; font-weight: 650; letter-spacing: -0.01em; }
.hb-ob2-chip {
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ob2-accent) 16%, transparent);
  color: color-mix(in srgb, var(--hb-ob2-accent) 75%, var(--hb-ob2-text));
  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.hb-ob2-x {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-left: auto;
  padding: 0;
  border: 1px solid var(--hb-ob2-line);
  border-radius: 10px;
  background: var(--hb-ob2-surface);
  color: var(--hb-ob2-muted);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
}
.hb-ob2-x:hover { color: var(--hb-ob2-text); border-color: var(--hb-ob2-faint); }
.hb-ob2 svg { flex: none; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-ob2-x svg { width: 15px; height: 15px; }
.hb-ob2-body {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  flex-direction: column;
  gap: 18px;
  padding: 14px 16px 18px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--hb-ob2-line) transparent;
}
.hb-ob2-lines { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-ob2-line {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  gap: 4px 12px;
  padding: 10px 0;
  border-bottom: 1px dashed var(--hb-ob2-line);
  animation: hb-ob2-in 0.35s ease both;
}
.hb-ob2-line:first-child { padding-top: 0; }
.hb-ob2-art {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 12px;
  background: radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--hb-ob2-tone) 70%, #fff) 0%, var(--hb-ob2-tone) 55%, color-mix(in srgb, var(--hb-ob2-tone) 60%, #000) 100%);
  color: rgba(255, 255, 255, 0.92);
  font-size: 14px;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}
.hb-ob2-info { min-width: 0; }
.hb-ob2-name { display: block; overflow: hidden; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; }
.hb-ob2-opt { display: block; overflow: hidden; color: var(--hb-ob2-muted); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-ob2-price { font-weight: 600; font-variant-numeric: tabular-nums; text-align: right; white-space: nowrap; }
.hb-ob2-row2 { display: flex; grid-column: 2 / 4; align-items: center; justify-content: space-between; gap: 8px; }
.hb-ob2-links { display: flex; align-items: center; gap: 10px; min-width: 0; }
.hb-ob2-link {
  padding: 0;
  border: 0;
  background: none;
  color: var(--hb-ob2-muted);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: color 0.15s ease, text-decoration-color 0.15s ease;
}
.hb-ob2-link:hover { color: var(--hb-ob2-text); text-decoration-color: currentColor; }
.hb-ob2-link[data-danger="true"]:hover { color: var(--hb-ob2-danger); }
.hb-ob2-notetext { overflow: hidden; color: var(--hb-ob2-faint); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-ob2-step {
  display: inline-flex;
  flex: none;
  align-items: center;
  height: 28px;
  border: 1px solid var(--hb-ob2-line);
  border-radius: 999px;
  background: var(--hb-ob2-surface);
}
.hb-ob2-step button {
  display: grid;
  place-items: center;
  width: 28px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: none;
  color: var(--hb-ob2-text);
  cursor: pointer;
}
.hb-ob2-step button:hover:not(:disabled) { color: var(--hb-ob2-accent); }
.hb-ob2-step button:disabled { color: var(--hb-ob2-faint); cursor: default; }
.hb-ob2-step svg { width: 13px; height: 13px; stroke-width: 2.2; }
.hb-ob2-qty { min-width: 18px; font-weight: 650; font-variant-numeric: tabular-nums; text-align: center; }
.hb-ob2-note { grid-column: 2 / 4; }
.hb-ob2-sec { display: flex; flex-direction: column; gap: 10px; }
.hb-ob2-label { margin: 0; color: var(--hb-ob2-muted); font-size: 11.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
.hb-ob2-seg {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 3px;
  border: 1px solid var(--hb-ob2-line);
  border-radius: 12px;
  background: var(--hb-ob2-surface);
}
.hb-ob2-seg::before {
  content: "";
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc(50% - 3px);
  border-radius: 9px;
  background: var(--hb-ob2-raised);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px var(--hb-ob2-line);
  transition: transform 0.3s cubic-bezier(0.3, 0.9, 0.3, 1);
}
.hb-ob2-seg[data-value="pickup"]::before { transform: translateX(100%); }
.hb-ob2-seg button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 34px;
  border: 0;
  border-radius: 9px;
  background: none;
  color: var(--hb-ob2-muted);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}
.hb-ob2-seg button[aria-checked="true"] { color: var(--hb-ob2-text); }
.hb-ob2-seg svg { width: 15px; height: 15px; }
.hb-ob2-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
@container (min-width: 480px) { .hb-ob2-grid { grid-template-columns: 1fr 1fr; } .hb-ob2-wide { grid-column: 1 / -1; } }
.hb-ob2-field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.hb-ob2-field > span { color: var(--hb-ob2-muted); font-size: 12px; font-weight: 500; }
.hb-ob2-input {
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border: 1px solid var(--hb-ob2-line);
  border-radius: 10px;
  background: var(--hb-ob2-surface);
  color: var(--hb-ob2-text);
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  appearance: none;
  -webkit-appearance: none;
}
.hb-ob2-input::placeholder { color: var(--hb-ob2-faint); }
.hb-ob2-input:focus { border-color: var(--hb-ob2-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-ob2-accent) 22%, transparent); }
.hb-ob2-input[aria-invalid="true"] { border-color: var(--hb-ob2-danger); }
.hb-ob2-sel {
  padding-right: 34px;
  background-image: linear-gradient(45deg, transparent 50%, var(--hb-ob2-muted) 50%), linear-gradient(135deg, var(--hb-ob2-muted) 50%, transparent 50%);
  background-position: calc(100% - 17px) 16px, calc(100% - 12px) 16px;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  cursor: pointer;
}
.hb-ob2-sel option { background: var(--hb-ob2-surface); color: var(--hb-ob2-text); }
.hb-ob2-err, .hb-ob2-field > .hb-ob2-err { color: var(--hb-ob2-danger); font-size: 11.5px; }
.hb-ob2-store {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 2px 12px;
  padding: 12px;
  border: 1px solid var(--hb-ob2-line);
  border-radius: 12px;
  background: var(--hb-ob2-surface);
  animation: hb-ob2-in 0.3s ease both;
}
.hb-ob2-pin {
  display: grid;
  grid-row: span 3;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--hb-ob2-accent) 16%, transparent);
  color: var(--hb-ob2-accent);
}
.hb-ob2-pin svg { width: 17px; height: 17px; }
.hb-ob2-store b { font-weight: 600; }
.hb-ob2-store span { color: var(--hb-ob2-muted); font-size: 12px; }
.hb-ob2-ready { display: inline-flex; align-items: center; gap: 6px; }
.hb-ob2-ready::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--hb-ob2-ok); }
.hb-ob2-deliv { display: flex; flex-direction: column; gap: 10px; animation: hb-ob2-in 0.3s ease both; }
.hb-ob2-pays { display: flex; flex-direction: column; gap: 8px; }
.hb-ob2-pay {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--hb-ob2-line);
  border-radius: 12px;
  background: var(--hb-ob2-surface);
  color: var(--hb-ob2-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
.hb-ob2-pay:hover { border-color: var(--hb-ob2-faint); }
.hb-ob2-pay[aria-checked="true"] {
  border-color: var(--hb-ob2-accent);
  background: color-mix(in srgb, var(--hb-ob2-accent) 7%, var(--hb-ob2-surface));
}
.hb-ob2-payicon { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; background: var(--hb-ob2-raised); color: var(--hb-ob2-muted); }
.hb-ob2-pay[aria-checked="true"] .hb-ob2-payicon { color: var(--hb-ob2-accent); }
.hb-ob2-payicon svg { width: 17px; height: 17px; }
.hb-ob2-paytext { display: flex; min-width: 0; flex-direction: column; }
.hb-ob2-paytext b { font-weight: 600; }
.hb-ob2-paytext span { overflow: hidden; color: var(--hb-ob2-muted); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hb-ob2-radio { position: relative; width: 18px; height: 18px; border: 1.5px solid var(--hb-ob2-faint); border-radius: 50%; transition: border-color 0.15s ease; }
.hb-ob2-radio::after { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--hb-ob2-accent); transform: scale(0); transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1); }
.hb-ob2-pay[aria-checked="true"] .hb-ob2-radio { border-color: var(--hb-ob2-accent); }
.hb-ob2-pay[aria-checked="true"] .hb-ob2-radio::after { transform: scale(1); }
.hb-ob2-coupon { display: flex; gap: 8px; }
.hb-ob2-coupon .hb-ob2-input { flex: 1; min-width: 0; text-transform: uppercase; letter-spacing: 0.04em; }
.hb-ob2-coupon .hb-ob2-input::placeholder { text-transform: none; letter-spacing: 0; }
.hb-ob2-btn2 {
  flex: none;
  height: 38px;
  padding: 0 14px;
  border: 1px solid var(--hb-ob2-line);
  border-radius: 10px;
  background: var(--hb-ob2-raised);
  color: var(--hb-ob2-text);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.hb-ob2-btn2:hover:not(:disabled) { border-color: var(--hb-ob2-faint); }
.hb-ob2-btn2:disabled { opacity: 0.5; cursor: default; }
.hb-ob2-applied {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px 9px 12px;
  border: 1px dashed color-mix(in srgb, var(--hb-ob2-ok) 55%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--hb-ob2-ok) 8%, transparent);
  animation: hb-ob2-in 0.3s ease both;
}
.hb-ob2-applied svg { width: 16px; height: 16px; color: var(--hb-ob2-ok); }
.hb-ob2-applied b { font-weight: 600; }
.hb-ob2-applied span { color: var(--hb-ob2-muted); font-size: 12px; }
.hb-ob2-applied .hb-ob2-link { margin-left: auto; }
.hb-ob2-sum { display: flex; flex-direction: column; gap: 7px; padding-top: 4px; }
.hb-ob2-sumrow { display: flex; justify-content: space-between; gap: 12px; color: var(--hb-ob2-muted); font-variant-numeric: tabular-nums; }
.hb-ob2-sumrow b { color: var(--hb-ob2-text); font-weight: 500; }
.hb-ob2-sumrow[data-kind="discount"] b { color: var(--hb-ob2-ok); }
.hb-ob2-sumrow[data-kind="pending"] b { color: var(--hb-ob2-faint); font-weight: 400; }
.hb-ob2-sumrow[data-kind="total"] { padding-top: 9px; border-top: 1px solid var(--hb-ob2-line); color: var(--hb-ob2-text); font-size: 15px; font-weight: 650; }
.hb-ob2-sumrow[data-kind="total"] b { font-weight: 700; }
.hb-ob2-foot {
  flex: none;
  padding: 10px 12px calc(12px + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--hb-ob2-line);
  background: var(--hb-ob2-bg);
}
.hb-ob2[data-inline="true"] .hb-ob2-foot { padding-bottom: 12px; }
.hb-ob2-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 0;
  border-radius: 13px;
  background: var(--hb-ob2-accent);
  color: #fff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: 0 10px 24px -12px var(--hb-ob2-accent);
  transition: filter 0.15s ease, transform 0.12s ease;
}
.hb-ob2-cta:hover:not(:disabled) { filter: brightness(1.08); }
.hb-ob2-cta:active:not(:disabled) { transform: scale(0.985); }
.hb-ob2-cta:disabled { cursor: default; opacity: 0.55; }
.hb-ob2-cta b { font-variant-numeric: tabular-nums; }
.hb-ob2-cta[data-busy="true"] span::after { content: ""; display: inline-block; width: 1.2em; text-align: left; animation: hb-ob2-dots 1.2s steps(4) infinite; }
.hb-ob2 button:focus-visible, .hb-ob2-link:focus-visible { outline: 2px solid var(--hb-ob2-accent); outline-offset: 2px; }
.hb-ob2-empty, .hb-ob2-done {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px 8px;
  text-align: center;
}
.hb-ob2-empty b, .hb-ob2-done b { font-size: 15px; font-weight: 650; }
.hb-ob2-empty span, .hb-ob2-done span { max-width: 280px; color: var(--hb-ob2-muted); }
.hb-ob2-emptyicon { display: grid; place-items: center; width: 52px; height: 52px; margin-bottom: 6px; border-radius: 16px; background: var(--hb-ob2-surface); color: var(--hb-ob2-faint); box-shadow: inset 0 0 0 1px var(--hb-ob2-line); }
.hb-ob2-emptyicon svg { width: 24px; height: 24px; }
.hb-ob2-check { display: grid; place-items: center; width: 56px; height: 56px; margin-bottom: 8px; border-radius: 50%; background: color-mix(in srgb, var(--hb-ob2-ok) 16%, transparent); color: var(--hb-ob2-ok); animation: hb-ob2-pop 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) both; }
.hb-ob2-check svg { width: 26px; height: 26px; stroke-width: 2.4; stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-ob2-draw 0.5s 0.2s ease forwards; }
.hb-ob2-receipt { display: flex; gap: 8px; margin-top: 8px; padding: 6px 12px; border: 1px solid var(--hb-ob2-line); border-radius: 999px; background: var(--hb-ob2-surface); font-variant-numeric: tabular-nums; }
.hb-ob2-done .hb-ob2-btn2 { margin-top: 12px; }
.hb-ob2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-ob2-sheet { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes hb-ob2-side { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes hb-ob2-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-ob2-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes hb-ob2-pop { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes hb-ob2-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-ob2-dots { 0% { content: ""; } 25% { content: "."; } 50% { content: ".."; } 75% { content: "..."; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ob2, .hb-ob2 *, .hb-ob2-scrim { animation: none !important; transition: none !important; }
  .hb-ob2-check svg { stroke-dashoffset: 0; }
}
`;

function useControlled<T>(value: T | undefined, initial: T, onChange?: (next: T) => void) {
  const [inner, setInner] = React.useState<T>(initial);
  const controlled = value !== undefined;
  const current = controlled ? (value as T) : inner;
  const set = React.useCallback(
    (next: T) => {
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );
  return [current, set] as const;
}

function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? values[k] : m));
}

function hashHue(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 31) + text.charCodeAt(i)) >>> 0;
  return h % 360;
}

const focusable = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function PayIcon({ kind }: { kind: PaymentMethod["icon"] }) {
  if (kind === "cash")
    return (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="12" rx="2.5" />
        <circle cx="12" cy="12" r="2.6" />
        <path d="M6.5 9.5v.01M17.5 14.5v.01" />
      </svg>
    );
  if (kind === "card")
    return (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M3 10h18M7 15h3" />
      </svg>
    );
  if (kind === "instant")
    return (
      <svg viewBox="0 0 24 24">
        <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v4" />
      <rect x="4" y="7.5" width="16" height="11.5" rx="2.5" />
      <path d="M16 13.2h.01" />
    </svg>
  );
}

export function OrderCartDrawer({
  open,
  defaultOpen = false,
  onOpenChange,
  inline = false,
  items,
  defaultItems: initialItems = defaultItems,
  onItemsChange,
  mode,
  defaultMode = "delivery",
  onModeChange,
  areas = defaultAreas,
  defaultAreaId,
  store = defaultStore,
  paymentMethods = defaultPayments,
  defaultPaymentId,
  onApplyCoupon,
  onSubmit,
  onNewOrder,
  currency = "USD",
  locale = "en-US",
  theme = "dark",
  accent = "#2f7bff",
  labels,
  className,
  style,
  ...rest
}: OrderCartDrawerProps) {
  const l = { ...defaultLabels, ...labels };
  const uid = React.useId();
  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);
  const [isOpen, setOpen] = useControlled(open, defaultOpen, onOpenChange);
  const [lines, setLines] = useControlled(items, initialItems, onItemsChange);
  const [orderMode, setOrderMode] = useControlled(mode, defaultMode, onModeChange);
  const [areaId, setAreaId] = React.useState(defaultAreaId ?? "");
  const [paymentId, setPaymentId] = React.useState(defaultPaymentId ?? paymentMethods[0]?.id ?? "");
  const [customer, setCustomer] = React.useState({ name: "", phone: "" });
  const [address, setAddress] = React.useState({ street: "", details: "" });
  const [notesOpen, setNotesOpen] = React.useState<Record<string, boolean>>({});
  const [couponInput, setCouponInput] = React.useState("");
  const [coupon, setCoupon] = React.useState<CouponResult | null>(null);
  const [couponState, setCouponState] = React.useState<"idle" | "checking" | "invalid">("idle");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");
  const [showErrors, setShowErrors] = React.useState(false);
  const [sentTotal, setSentTotal] = React.useState(0);
  const layerRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  const visible = inline || isOpen;
  const close = React.useCallback(() => setOpen(false), [setOpen]);

  React.useEffect(() => {
    if (inline || !isOpen) return;
    const layer = layerRef.current;
    const panel = panelRef.current;
    if (!layer || !panel) return;
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const body = document.body;
    const prev = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    const inerted: HTMLElement[] = [];
    let node: HTMLElement | null = layer;
    while (node && node !== body && node.parentElement) {
      for (const sibling of Array.from(node.parentElement.children)) {
        if (sibling !== node && sibling instanceof HTMLElement && !sibling.inert && sibling.tagName !== "STYLE" && sibling.tagName !== "SCRIPT") {
          sibling.inert = true;
          inerted.push(sibling);
        }
      }
      node = node.parentElement;
    }
    const frame = requestAnimationFrame(() => {
      const first = panel.querySelector<HTMLElement>(focusable);
      (first ?? panel).focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      html.style.overflow = prev.html;
      body.style.overflow = prev.body;
      for (const el of inerted) el.inert = false;
      if (opener && typeof opener.focus === "function") opener.focus({ preventScroll: true });
    };
  }, [inline, isOpen]);

  const onLayerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable)).filter((n) => n.offsetParent !== null);
    if (!nodes.length) {
      event.preventDefault();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const count = lines.reduce((s, line) => s + line.quantity, 0);
  const subtotal = lines.reduce((s, line) => s + line.price * line.quantity, 0);
  const area = orderMode === "delivery" ? areas.find((a) => a.id === areaId) ?? null : null;
  const deliveryFee = area ? area.fee : 0;
  const discount = coupon ? Math.min(Math.max(0, coupon.discount), subtotal) : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);
  const payment = paymentMethods.find((p) => p.id === paymentId) ?? null;

  const errors = {
    name: !customer.name.trim(),
    phone: customer.phone.replace(/\D/g, "").length < 7,
    area: orderMode === "delivery" && !area,
    street: orderMode === "delivery" && !address.street.trim(),
    payment: !payment,
  };
  const invalid = Object.values(errors).some(Boolean);

  const updateLine = (id: string, patch: Partial<CartLine>) => setLines(lines.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  const removeLine = (id: string) => setLines(lines.filter((line) => line.id !== id));

  const applyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (!onApplyCoupon) {
      setCouponState("invalid");
      return;
    }
    setCouponState("checking");
    try {
      const result = await onApplyCoupon(code, subtotal);
      if (result && result.discount > 0) {
        setCoupon(result);
        setCouponInput("");
        setCouponState("idle");
      } else setCouponState("invalid");
    } catch {
      setCouponState("invalid");
    }
  };

  const submit = async () => {
    if (status !== "idle" || !lines.length) return;
    if (invalid) {
      setShowErrors(true);
      const order = ["name", "phone", "area", "street", "payment"] as const;
      const key = order.find((k) => errors[k]);
      if (key) {
        const el = panelRef.current?.querySelector<HTMLElement>(`[data-field="${key}"]`);
        el?.scrollIntoView({ block: "center", behavior: "smooth" });
        el?.focus({ preventScroll: true });
      }
      return;
    }
    const order: CartOrder = {
      items: lines,
      mode: orderMode,
      area,
      customer: { name: customer.name.trim(), phone: customer.phone.trim() },
      address: orderMode === "delivery" ? { street: address.street.trim(), details: address.details.trim() } : null,
      payment,
      coupon,
      subtotal,
      deliveryFee,
      discount,
      total,
    };
    setStatus("sending");
    try {
      await onSubmit?.(order);
      setSentTotal(total);
      setStatus("sent");
      bodyRef.current?.scrollTo({ top: 0 });
    } catch {
      setStatus("idle");
    }
  };

  const startNew = () => {
    setStatus("idle");
    setShowErrors(false);
    setCoupon(null);
    setCouponInput("");
    setCouponState("idle");
    if (items === undefined) setLines([]);
    onNewOrder?.();
  };

  if (!visible) return null;

  const err = (key: keyof typeof errors) => showErrors && errors[key];
  const titleId = `${uid}-title`;

  const panel = (
    <div
      ref={panelRef}
      className={["hb-ob2", inline ? className : undefined].filter(Boolean).join(" ")}
      data-inline={inline ? "true" : "false"}
      data-theme={theme}
      role={inline ? "region" : "dialog"}
      aria-modal={inline ? undefined : true}
      aria-labelledby={titleId}
      tabIndex={-1}
      style={inline ? ({ "--hb-ob2-accent": accent, ...style } as React.CSSProperties) : ({ "--hb-ob2-accent": accent } as React.CSSProperties)}
      {...(inline ? rest : {})}
    >
      <style href="hb-order-cart-drawer" precedence="default">{css}</style>
      <div className="hb-ob2-grab" aria-hidden="true">
        <span />
      </div>
      <div className="hb-ob2-head">
        <h2 id={titleId} className="hb-ob2-title">
          {l.title}
        </h2>
        {count > 0 && status !== "sent" ? <span className="hb-ob2-chip">{count}</span> : null}
        {inline ? null : (
          <button type="button" className="hb-ob2-x" onClick={close} aria-label={l.close}>
            <svg viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>

      <div ref={bodyRef} className="hb-ob2-body">
        {status === "sent" ? (
          <div className="hb-ob2-done" role="status">
            <span className="hb-ob2-check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12.5 10 17.5 19 7" />
              </svg>
            </span>
            <b>{l.sentTitle}</b>
            <span>{l.sentText}</span>
            <span className="hb-ob2-receipt">
              {l.total} <b>{money.format(sentTotal)}</b>
            </span>
            <button type="button" className="hb-ob2-btn2" onClick={startNew}>
              {l.newOrder}
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="hb-ob2-empty">
            <span className="hb-ob2-emptyicon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" />
                <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
              </svg>
            </span>
            <b>{l.empty}</b>
            <span>{l.emptyHint}</span>
          </div>
        ) : (
          <>
            <ul className="hb-ob2-lines">
              {lines.map((line) => {
                const tone = line.color ?? `hsl(${hashHue(line.id)} 55% 48%)`;
                const noteOpen = notesOpen[line.id] ?? false;
                const noteId = `${uid}-note-${line.id}`;
                return (
                  <li key={line.id} className="hb-ob2-line">
                    <span className="hb-ob2-art" style={{ "--hb-ob2-tone": tone } as React.CSSProperties} aria-hidden="true">
                      {line.name.trim().charAt(0).toUpperCase()}
                    </span>
                    <span className="hb-ob2-info">
                      <span className="hb-ob2-name">{line.name}</span>
                      {line.options ? <span className="hb-ob2-opt">{line.options}</span> : null}
                    </span>
                    <span className="hb-ob2-price">{money.format(line.price * line.quantity)}</span>
                    <span className="hb-ob2-row2">
                      <span className="hb-ob2-links">
                        <button
                          type="button"
                          className="hb-ob2-link"
                          aria-expanded={noteOpen}
                          aria-controls={noteOpen ? noteId : undefined}
                          onClick={() => setNotesOpen({ ...notesOpen, [line.id]: !noteOpen })}
                        >
                          {line.note ? l.editNote : l.addNote}
                        </button>
                        <button type="button" className="hb-ob2-link" data-danger="true" onClick={() => removeLine(line.id)} aria-label={`${l.remove} ${line.name}`}>
                          {l.remove}
                        </button>
                        {line.note && !noteOpen ? <span className="hb-ob2-notetext">{line.note}</span> : null}
                      </span>
                      <span className="hb-ob2-step">
                        <button
                          type="button"
                          aria-label={`${l.decrease}, ${line.name}`}
                          disabled={line.quantity <= 1}
                          onClick={() => updateLine(line.id, { quantity: Math.max(1, line.quantity - 1) })}
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M6 12h12" />
                          </svg>
                        </button>
                        <span className="hb-ob2-qty" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button type="button" aria-label={`${l.increase}, ${line.name}`} onClick={() => updateLine(line.id, { quantity: line.quantity + 1 })}>
                          <svg viewBox="0 0 24 24">
                            <path d="M12 6v12M6 12h12" />
                          </svg>
                        </button>
                      </span>
                    </span>
                    {noteOpen ? (
                      <span className="hb-ob2-note">
                        <input
                          id={noteId}
                          className="hb-ob2-input"
                          value={line.note ?? ""}
                          placeholder={l.notePlaceholder}
                          aria-label={`${l.notePlaceholder}, ${line.name}`}
                          maxLength={140}
                          onChange={(e) => updateLine(line.id, { note: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setNotesOpen({ ...notesOpen, [line.id]: false });
                          }}
                        />
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <div className="hb-ob2-sec">
              <div className="hb-ob2-seg" role="radiogroup" aria-label={`${l.delivery} / ${l.pickup}`} data-value={orderMode}>
                {(["delivery", "pickup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={orderMode === m}
                    tabIndex={orderMode === m ? 0 : -1}
                    onClick={() => setOrderMode(m)}
                    onKeyDown={(e) => {
                      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                        const next = orderMode === "delivery" ? "pickup" : "delivery";
                        setOrderMode(next);
                        const sib = (e.currentTarget.parentElement?.querySelector(`button:nth-of-type(${next === "delivery" ? 1 : 2})`) ?? null) as HTMLElement | null;
                        sib?.focus();
                      }
                    }}
                  >
                    {m === "delivery" ? (
                      <svg viewBox="0 0 24 24">
                        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
                        <circle cx="7" cy="17.5" r="1.8" />
                        <circle cx="17" cy="17.5" r="1.8" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5v10h16v-10M9.5 19.5v-5h5v5" />
                      </svg>
                    )}
                    {m === "delivery" ? l.delivery : l.pickup}
                  </button>
                ))}
              </div>

              {orderMode === "delivery" ? (
                <div className="hb-ob2-deliv" key="delivery">
                  <label className="hb-ob2-field">
                    <span>{l.area}</span>
                    <select
                      className="hb-ob2-input hb-ob2-sel"
                      data-field="area"
                      value={areaId}
                      aria-invalid={err("area") || undefined}
                      onChange={(e) => setAreaId(e.target.value)}
                    >
                      <option value="">{l.areaPlaceholder}</option>
                      {areas.map((a) => (
                        <option key={a.id} value={a.id}>
                          {`${a.label} · ${a.fee > 0 ? money.format(a.fee) : l.deliveryFree}${a.eta ? ` · ${a.eta}` : ""}`}
                        </option>
                      ))}
                    </select>
                    {err("area") ? <span className="hb-ob2-err">{l.required}</span> : null}
                  </label>
                </div>
              ) : (
                <div className="hb-ob2-store" key="pickup">
                  <span className="hb-ob2-pin" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z" />
                      <circle cx="12" cy="10" r="2.3" />
                    </svg>
                  </span>
                  <span>{l.pickupAt}</span>
                  <b>{store.name}</b>
                  <span>{store.address}</span>
                  {store.readyTime ? (
                    <span className="hb-ob2-ready" style={{ gridColumn: "2" }}>
                      {l.readyIn} {store.readyTime}
                    </span>
                  ) : null}
                </div>
              )}
            </div>

            <div className="hb-ob2-sec">
              <p className="hb-ob2-label">{l.details}</p>
              <div className="hb-ob2-grid">
                <label className="hb-ob2-field">
                  <span>{l.name}</span>
                  <input
                    className="hb-ob2-input"
                    data-field="name"
                    autoComplete="name"
                    value={customer.name}
                    aria-invalid={err("name") || undefined}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                  {err("name") ? <span className="hb-ob2-err">{l.required}</span> : null}
                </label>
                <label className="hb-ob2-field">
                  <span>{l.phone}</span>
                  <input
                    className="hb-ob2-input"
                    data-field="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={customer.phone}
                    aria-invalid={err("phone") || undefined}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                  {err("phone") ? <span className="hb-ob2-err">{l.required}</span> : null}
                </label>
                {orderMode === "delivery" ? (
                  <>
                    <label className="hb-ob2-field hb-ob2-wide">
                      <span>{l.street}</span>
                      <input
                        className="hb-ob2-input"
                        data-field="street"
                        autoComplete="street-address"
                        value={address.street}
                        aria-invalid={err("street") || undefined}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      />
                      {err("street") ? <span className="hb-ob2-err">{l.required}</span> : null}
                    </label>
                    <label className="hb-ob2-field hb-ob2-wide">
                      <span>{l.streetDetails}</span>
                      <input className="hb-ob2-input" value={address.details} onChange={(e) => setAddress({ ...address, details: e.target.value })} />
                    </label>
                  </>
                ) : null}
              </div>
            </div>

            {paymentMethods.length ? (
              <div className="hb-ob2-sec">
                <p className="hb-ob2-label" id={`${uid}-pay`}>
                  {l.payment}
                </p>
                <div className="hb-ob2-pays" role="radiogroup" aria-labelledby={`${uid}-pay`}>
                  {paymentMethods.map((p, i) => {
                    const checked = p.id === paymentId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        className="hb-ob2-pay"
                        data-field={i === 0 ? "payment" : undefined}
                        aria-checked={checked}
                        tabIndex={checked || (!payment && i === 0) ? 0 : -1}
                        onClick={() => setPaymentId(p.id)}
                        onKeyDown={(e) => {
                          const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                          if (!step) return;
                          e.preventDefault();
                          const next = paymentMethods[(i + step + paymentMethods.length) % paymentMethods.length];
                          setPaymentId(next.id);
                          const buttons = e.currentTarget.parentElement?.querySelectorAll<HTMLElement>("button");
                          buttons?.[(i + step + paymentMethods.length) % paymentMethods.length]?.focus();
                        }}
                      >
                        <span className="hb-ob2-payicon" aria-hidden="true">
                          <PayIcon kind={p.icon} />
                        </span>
                        <span className="hb-ob2-paytext">
                          <b>{p.label}</b>
                          {p.hint ? <span>{p.hint}</span> : null}
                        </span>
                        <span className="hb-ob2-radio" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="hb-ob2-sec">
              <p className="hb-ob2-label">{l.coupon}</p>
              {coupon ? (
                <div className="hb-ob2-applied">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 9V6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5V9a3 3 0 0 0 0 6v2.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5V15a3 3 0 0 0 0-6Z" />
                    <path d="m9 12.5 2 2 4-4.5" />
                  </svg>
                  <span>
                    <b>{fill(l.couponApplied, { code: coupon.code })}</b>
                    {coupon.label ? ` · ${coupon.label}` : ""}
                  </span>
                  <button type="button" className="hb-ob2-link" data-danger="true" onClick={() => setCoupon(null)}>
                    {l.removeCoupon}
                  </button>
                </div>
              ) : (
                <>
                  <form
                    className="hb-ob2-coupon"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void applyCoupon();
                    }}
                  >
                    <input
                      className="hb-ob2-input"
                      value={couponInput}
                      placeholder={l.couponPlaceholder}
                      aria-label={l.coupon}
                      aria-invalid={couponState === "invalid" || undefined}
                      autoCapitalize="characters"
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        if (couponState === "invalid") setCouponState("idle");
                      }}
                    />
                    <button type="submit" className="hb-ob2-btn2" disabled={!couponInput.trim() || couponState === "checking"}>
                      {l.apply}
                    </button>
                  </form>
                  {couponState === "invalid" ? (
                    <span className="hb-ob2-err" role="alert">
                      {l.couponInvalid}
                    </span>
                  ) : null}
                </>
              )}
            </div>

            <div className="hb-ob2-sum">
              <div className="hb-ob2-sumrow">
                <span>{l.subtotal}</span>
                <b>{money.format(subtotal)}</b>
              </div>
              {orderMode === "delivery" ? (
                <div className="hb-ob2-sumrow" data-kind={area ? undefined : "pending"}>
                  <span>{l.deliveryFee}</span>
                  <b>{area ? (area.fee > 0 ? money.format(area.fee) : l.deliveryFree) : l.deliveryPending}</b>
                </div>
              ) : null}
              {discount > 0 ? (
                <div className="hb-ob2-sumrow" data-kind="discount">
                  <span>{l.discount}</span>
                  <b>{`-${money.format(discount)}`}</b>
                </div>
              ) : null}
              <div className="hb-ob2-sumrow" data-kind="total">
                <span>{l.total}</span>
                <b>{money.format(total)}</b>
              </div>
            </div>
          </>
        )}
      </div>

      {status !== "sent" && lines.length > 0 ? (
        <div className="hb-ob2-foot">
          <button type="button" className="hb-ob2-cta" data-busy={status === "sending" ? "true" : "false"} disabled={status === "sending"} onClick={() => void submit()}>
            <span>{status === "sending" ? l.sending : l.submit}</span>
            <b>{money.format(total)}</b>
          </button>
        </div>
      ) : null}
    </div>
  );

  if (inline) return panel;

  return (
    <div
      ref={layerRef}
      className={["hb-ob2-layer", className].filter(Boolean).join(" ")}
      style={style}
      onKeyDown={onLayerKeyDown}
      {...rest}
    >
      <div className="hb-ob2-scrim" aria-hidden="true" onClick={close} />
      {panel}
    </div>
  );
}

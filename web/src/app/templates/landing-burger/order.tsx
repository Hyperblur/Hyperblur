"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { FoodArt } from "./art";
import { findItem, locations, money } from "./data";
import { Ico, icons } from "./icons";

type Line = { id: string; qty: number };
type Mode = "pickup" | "delivery";

type OrderState = {
  lines: Line[];
  count: number;
  subtotal: number;
  open: boolean;
  bump: number;
  last: string;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  qtyOf: (id: string) => number;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const OrderContext = React.createContext<OrderState | null>(null);

export function useOrder() {
  const ctx = React.useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<Line[]>([]);
  const [open, setOpen] = React.useState(false);
  const [bump, setBump] = React.useState(0);
  const [last, setLast] = React.useState("");

  const add = React.useCallback((id: string, qty = 1) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id);
      if (found) return ls.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
      return [...ls, { id, qty }];
    });
    setBump((b) => b + 1);
    setLast(findItem(id)?.name ?? "");
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setLines((ls) => {
      if (qty <= 0) return ls.filter((l) => l.id !== id);
      if (ls.some((l) => l.id === id)) return ls.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 20) } : l));
      return [...ls, { id, qty }];
    });
    setBump((b) => b + 1);
  }, []);

  const clear = React.useCallback(() => setLines([]), []);

  const value = React.useMemo<OrderState>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + (findItem(l.id)?.price ?? 0) * l.qty, 0);
    return {
      lines,
      count,
      subtotal,
      open,
      bump,
      last,
      add,
      setQty,
      clear,
      setOpen,
      qtyOf: (id: string) => lines.find((l) => l.id === id)?.qty ?? 0,
    };
  }, [lines, open, bump, last, add, setQty, clear]);

  return (
    <OrderContext.Provider value={value}>
      {children}
      {open && <CartDrawer />}
    </OrderContext.Provider>
  );
}

export function Stepper({ id, name, size = "md" }: { id: string; name: string; size?: "sm" | "md" }) {
  const { qtyOf, setQty } = useOrder();
  const qty = qtyOf(id);
  return (
    <div className={`hbl-bg-stepper hbl-bg-stepper-${size}`} role="group" aria-label={`Quantity of ${name}`}>
      <button type="button" onClick={() => setQty(id, qty - 1)} aria-label={`Remove one ${name}`}>
        <Ico size={14} stroke={2.4}>{icons.minus}</Ico>
      </button>
      <span key={qty} className="hbl-bg-stepper-n" aria-live="polite">
        {qty}
      </span>
      <button type="button" onClick={() => setQty(id, qty + 1)} aria-label={`Add one more ${name}`} disabled={qty >= 20}>
        <Ico size={14} stroke={2.4}>{icons.plus}</Ico>
      </button>
    </div>
  );
}

export function AddButton({ id, name, label = "Add", wide = false }: { id: string; name: string; label?: string; wide?: boolean }) {
  const { add, qtyOf } = useOrder();
  const qty = qtyOf(id);
  if (qty > 0) return <Stepper id={id} name={name} />;
  return (
    <button type="button" className={`hbl-bg-add ${wide ? "hbl-bg-add-wide" : ""}`} onClick={() => add(id)} aria-label={`${label} ${name} to order`}>
      <Ico size={15} stroke={2.4}>{icons.plus}</Ico>
      <span>{label}</span>
    </button>
  );
}

export function CartButton() {
  const { count, subtotal, bump, setOpen } = useOrder();
  return (
    <button type="button" className="hbl-bg-cartbtn" onClick={() => setOpen(true)} aria-label={`Open your order, ${count} ${count === 1 ? "item" : "items"}, ${money(subtotal)}`}>
      <Ico size={18}>{icons.bag}</Ico>
      <span className="hbl-bg-cartbtn-total">{money(subtotal)}</span>
      <span key={bump} className="hbl-bg-cartbtn-n" data-on={count > 0}>
        {count}
      </span>
    </button>
  );
}

export function OrderBar() {
  const { count, subtotal, bump, last, setOpen } = useOrder();
  return (
    <>
      <p className="hbl-bg-sr" aria-live="polite">
        {last ? `${last} added. ${count} ${count === 1 ? "item" : "items"}, ${money(subtotal)}.` : ""}
      </p>
      {count > 0 && (
        <div className="hbl-bg-orderbar-wrap">
          <div className="hbl-bg-orderbar">
            <span key={bump} className="hbl-bg-orderbar-n">
              {count}
            </span>
            <div className="hbl-bg-min0">
              <p className="hbl-bg-orderbar-title">Your order</p>
              <p className="hbl-bg-orderbar-last">{last ? `Last added: ${last}` : `${count} items ready to check out`}</p>
            </div>
            <button type="button" className="hbl-bg-btn hbl-bg-btn-red" onClick={() => setOpen(true)}>
              View order · {money(subtotal)}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const slots = ["ASAP · 12 min", "12:30 PM", "12:45 PM", "1:00 PM", "1:15 PM"];

function CartDrawer() {
  const { lines, subtotal, setOpen, clear } = useOrder();
  const [mode, setMode] = React.useState<Mode>("pickup");
  const [slot, setSlot] = React.useState(slots[0]);
  const [shop, setShop] = React.useState<string>(locations[0].id);
  const [tip, setTip] = React.useState(0.15);
  const [placed, setPlaced] = React.useState<null | { code: string; total: number; mode: Mode; slot: string; shop: string }>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const fee = mode === "delivery" ? (subtotal >= 35 ? 0 : 2.99) : 0;
  const tax = subtotal * 0.08875;
  const tipAmt = mode === "delivery" ? subtotal * tip : 0;
  const total = subtotal + fee + tax + tipAmt;
  const shopName = locations.find((l) => l.id === shop)?.name ?? "";

  React.useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
      opener?.focus();
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const nodes = panelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], input, select");
    if (nodes.length === 0) return;
    const first = nodes[0];
    const lastNode = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      lastNode.focus();
    } else if (!e.shiftKey && document.activeElement === lastNode) {
      e.preventDefault();
      first.focus();
    }
  }

  function place() {
    const n = lines.reduce((s, l, i) => s + l.qty * (i + 3) * 37, 0) + Math.round(subtotal * 100);
    setPlaced({ code: `SC-${(1000 + (n % 9000)).toString()}`, total, mode, slot, shop: shopName });
    clear();
  }

  return createPortal(
    <div className="hbl-bg-layer" onKeyDown={onKeyDown}>
      <div className="hbl-bg-scrim" onClick={() => setOpen(false)} aria-hidden="true" />
      <div ref={panelRef} className="hbl-bg-drawer font-sans" role="dialog" aria-modal="true" aria-labelledby="hbl-bg-drawer-title">
        <div className="hbl-bg-drawer-head">
          <div>
            <p className="hbl-bg-kicker">Smash &amp; Co.</p>
            <h2 id="hbl-bg-drawer-title" className="hbl-bg-drawer-title">
              {placed ? "Order placed" : "Your order"}
            </h2>
          </div>
          <button ref={closeRef} type="button" className="hbl-bg-iconbtn" onClick={() => setOpen(false)} aria-label="Close order">
            <Ico size={18}>{icons.close}</Ico>
          </button>
        </div>

        {placed ? (
          <div className="hbl-bg-done">
            <div className="hbl-bg-done-badge" aria-hidden="true">
              <Ico size={30} stroke={2.6}>{icons.check}</Ico>
            </div>
            <p className="hbl-bg-done-code">Order {placed.code}</p>
            <p className="hbl-bg-done-text">
              {placed.mode === "pickup"
                ? `We are firing up the griddle. Pick up at ${placed.shop}, ${placed.slot.replace("ASAP · ", "in about ")}. Your bag will be on the shelf by the door.`
                : `Your courier leaves ${placed.shop} as soon as the bag is sealed. Estimated arrival in 25 to 30 minutes.`}
            </p>
            <ol className="hbl-bg-track" aria-label="Order progress">
              <li data-state="done">Received</li>
              <li data-state="now">On the griddle</li>
              <li>{placed.mode === "pickup" ? "On the shelf" : "On the way"}</li>
            </ol>
            <p className="hbl-bg-done-total">Charged {money(placed.total)} at pickup counter or on delivery</p>
            <button type="button" className="hbl-bg-btn hbl-bg-btn-ghost" onClick={() => setPlaced(null)}>
              Start a new order
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="hbl-bg-empty">
            <FoodArt art={{ kind: "burger", patties: 1, cheese: "#ffb627" }} className="hbl-bg-empty-art" />
            <p className="hbl-bg-empty-title">Your bag is empty</p>
            <p className="hbl-bg-muted">Start with a Smash Double. Most people do.</p>
            <a href="#menu" className="hbl-bg-btn hbl-bg-btn-red" onClick={() => setOpen(false)}>
              Browse the menu
            </a>
          </div>
        ) : (
          <>
            <div className="hbl-bg-drawer-body">
              <div className="hbl-bg-seg" role="radiogroup" aria-label="Pickup or delivery">
                {(["pickup", "delivery"] as Mode[]).map((m) => (
                  <button key={m} type="button" role="radio" aria-checked={mode === m} data-on={mode === m} onClick={() => setMode(m)}>
                    <Ico size={16}>{m === "pickup" ? icons.store : icons.scooter}</Ico>
                    {m === "pickup" ? "Pickup" : "Delivery"}
                  </button>
                ))}
              </div>

              <ul className="hbl-bg-lines">
                {lines.map((l) => {
                  const item = findItem(l.id);
                  if (!item) return null;
                  return (
                    <li key={l.id} className="hbl-bg-line">
                      <div className="hbl-bg-line-art">
                        <FoodArt art={item.art} />
                      </div>
                      <div className="hbl-bg-min0">
                        <p className="hbl-bg-line-name">{item.name}</p>
                        <p className="hbl-bg-line-price">{money(item.price * l.qty)}</p>
                      </div>
                      <Stepper id={item.id} name={item.name} size="sm" />
                    </li>
                  );
                })}
              </ul>

              <div className="hbl-bg-field">
                <label htmlFor="hbl-bg-shop" className="hbl-bg-label">
                  {mode === "pickup" ? "Pick up from" : "Deliver from"}
                </label>
                <select id="hbl-bg-shop" className="hbl-bg-select" value={shop} onChange={(e) => setShop(e.target.value)}>
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}, {l.address}
                    </option>
                  ))}
                </select>
              </div>

              {mode === "pickup" ? (
                <fieldset className="hbl-bg-fieldset">
                  <legend className="hbl-bg-label">Pickup time</legend>
                  <div className="hbl-bg-chips">
                    {slots.map((s) => (
                      <button key={s} type="button" className="hbl-bg-chip" aria-pressed={slot === s} onClick={() => setSlot(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : (
                <fieldset className="hbl-bg-fieldset">
                  <legend className="hbl-bg-label">Tip your courier</legend>
                  <div className="hbl-bg-chips">
                    {[0, 0.1, 0.15, 0.2].map((t) => (
                      <button key={t} type="button" className="hbl-bg-chip" aria-pressed={tip === t} onClick={() => setTip(t)}>
                        {t === 0 ? "No tip" : `${Math.round(t * 100)}%`}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>

            <div className="hbl-bg-drawer-foot">
              <dl className="hbl-bg-sums">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                {mode === "delivery" && (
                  <>
                    <div>
                      <dt>Delivery</dt>
                      <dd>{fee === 0 ? "Free over $35" : money(fee)}</dd>
                    </div>
                    <div>
                      <dt>Tip</dt>
                      <dd>{money(tipAmt)}</dd>
                    </div>
                  </>
                )}
                <div>
                  <dt>Tax</dt>
                  <dd>{money(tax)}</dd>
                </div>
                <div className="hbl-bg-sums-total">
                  <dt>Total</dt>
                  <dd>{money(total)}</dd>
                </div>
              </dl>
              <button type="button" className="hbl-bg-btn hbl-bg-btn-red hbl-bg-btn-block" onClick={place}>
                Place {mode} order
                <Ico size={16}>{icons.arrow}</Ico>
              </button>
              <p className="hbl-bg-fine">Pay at the counter or on delivery. Cancel any time before it hits the griddle.</p>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

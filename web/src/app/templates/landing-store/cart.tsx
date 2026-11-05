"use client";

import * as React from "react";
import { CheckIcon, PlusIcon } from "./icons";

type Cart = { count: number; last: string; add: (name: string, qty?: number) => void };

const CartContext = React.createContext<Cart>({ count: 0, last: "", add: () => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0);
  const [last, setLast] = React.useState("");
  const add = React.useCallback((name: string, qty = 1) => {
    setCount((c) => c + qty);
    setLast(name);
  }, []);
  const value = React.useMemo(() => ({ count, last, add }), [count, last, add]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return React.useContext(CartContext);
}

export function AddToBag({
  name,
  qty = 1,
  className = "",
  label = "Add to bag",
  compact = false,
}: {
  name: string;
  qty?: number;
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  const { add } = useCart();
  const [done, setDone] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function onClick() {
    add(name, qty);
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`hbl-st-add ${compact ? "hbl-st-add-sm" : ""} ${className}`}
      data-done={done}
      aria-label={`${done ? "Added" : label}: ${name}`}
    >
      {done ? <CheckIcon size={15} /> : <PlusIcon size={15} />}
      {!compact && <span>{done ? "Added" : label}</span>}
    </button>
  );
}

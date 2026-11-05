"use client";

import * as React from "react";
import { Bottle, type BottleKind } from "./art";
import { Ico, icons } from "./icons";

const products: { name: string; use: string; price: number; kind: BottleKind; color: string; label: string }[] = [
  { name: "No. 1 Daily Wash", use: "Sulphate-free, rosemary and fig", price: 32, kind: "tall", color: "#d9577a", label: "No.1" },
  { name: "Silk Bond Mask", use: "Weekly repair after colour", price: 44, kind: "jar", color: "#3b1f2b", label: "BOND" },
  { name: "Gloss Mist", use: "Heat shield and mirror shine", price: 28, kind: "spray", color: "#e9b9ac", label: "MIST" },
  { name: "Beard Oil No. 8", use: "Cedar, vetiver and argan", price: 26, kind: "dropper", color: "#b88a4a", label: "No.8" },
  { name: "Curl Set Cream", use: "Soft hold, zero crunch", price: 30, kind: "tube", color: "#7d6e70", label: "CURL" },
];

export function Shelf() {
  const [held, setHeld] = React.useState<string[]>([]);
  const total = products.filter((p) => held.includes(p.name)).reduce((sum, p) => sum + p.price, 0);

  function toggle(name: string) {
    setHeld((h) => (h.includes(name) ? h.filter((n) => n !== name) : [...h, name]));
  }

  return (
    <>
      <div className="hbl-sl-shelf">
        {products.map((p) => {
          const on = held.includes(p.name);
          return (
            <article key={p.name} className="hbl-sl-product">
              <div className="hbl-sl-product-art">
                <Bottle kind={p.kind} color={p.color} label={p.label} />
              </div>
              <h3>{p.name}</h3>
              <p>{p.use}</p>
              <div className="hbl-sl-product-foot">
                <span className="hbl-sl-product-price">${p.price}</span>
                <button
                  type="button"
                  className="hbl-sl-product-btn"
                  aria-pressed={on}
                  aria-label={on ? `Remove ${p.name} from your visit` : `Set aside ${p.name} for your visit`}
                  onClick={() => toggle(p.name)}
                >
                  <Ico size={14} stroke={2.2}>{on ? icons.check : icons.plus}</Ico>
                  {on ? "Set aside" : "Hold"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="hbl-sl-shelf-note" aria-live="polite">
        {held.length === 0
          ? "Hold a product and it will be waiting at your chair. Pay at checkout, no card needed now."
          : `${held.length} ${held.length === 1 ? "product" : "products"} set aside for your visit · $${total}`}
      </p>
    </>
  );
}

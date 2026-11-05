"use client";

import * as React from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ProductArt } from "./art";
import { AddToBag } from "./cart";
import { bestSellers, money, type Product } from "./data";
import { CloseIcon, EyeIcon, MinusIcon, PlusIcon } from "./icons";

const filters = ["All", "Ceramics", "Linen", "Candles", "Furniture"] as const;

function Stars({ value }: { value: number }) {
  return (
    <span className="hbl-st-mini-stars" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="12" height="12">
        <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" fill="currentColor" />
      </svg>
      {value.toFixed(1)}
    </span>
  );
}

function Swatches({
  product,
  active,
  onPick,
  size = "sm",
}: {
  product: Product;
  active: number;
  onPick: (i: number) => void;
  size?: "sm" | "lg";
}) {
  return (
    <div className={`hbl-st-swatches hbl-st-swatches-${size}`} role="group" aria-label={`${product.name} colour`}>
      {product.swatches.map((s, i) => (
        <button
          key={s.name}
          type="button"
          className="hbl-st-swatch"
          style={{ background: s.hex }}
          aria-pressed={i === active}
          aria-label={s.name}
          title={s.name}
          onClick={() => onPick(i)}
        />
      ))}
    </div>
  );
}

function Card({ product, onQuick }: { product: Product; onQuick: (p: Product, colour: number) => void }) {
  const [colour, setColour] = React.useState(0);
  const swatch = product.swatches[colour];
  return (
    <article id={`p-${product.id}`} className="hbl-st-card">
      <div className="hbl-st-card-media">
        {product.badge && <span className="hbl-st-badge">{product.badge}</span>}
        <ProductArt kind={product.kind} color={swatch.hex} uid={`bs-${product.id}`} className="hbl-st-card-art" />
        <button type="button" className="hbl-st-quick" onClick={() => onQuick(product, colour)}>
          <EyeIcon />
          Quick view
          <span className="hbl-st-sr">: {product.name}</span>
        </button>
      </div>
      <div className="hbl-st-card-body">
        <div className="hbl-st-card-top">
          <h3 className="hbl-st-card-name">{product.name}</h3>
          <span className="hbl-st-price">{money(product.price)}</span>
        </div>
        <p className="hbl-st-card-meta">
          <span>{swatch.name}</span>
          <span aria-hidden="true">·</span>
          <Stars value={product.rating} />
          <span className="hbl-st-sr">Rated {product.rating} out of 5,</span>
          <span>({product.reviews})</span>
        </p>
        <div className="hbl-st-card-foot">
          <Swatches product={product} active={colour} onPick={setColour} />
          <AddToBag name={`${product.name}, ${swatch.name}`} compact />
        </div>
      </div>
    </article>
  );
}

function QuickView({
  product,
  colour,
  onColour,
  dialogRef,
}: {
  product: Product | null;
  colour: number;
  onColour: (i: number) => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  const [qty, setQty] = React.useState(1);
  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className="hbl-st-dialog"
      aria-labelledby="hbl-st-qv-title"
      onClose={() => setQty(1)}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {product && (
        <div className="hbl-st-qv">
          <div className="hbl-st-qv-media">
            <ProductArt
              kind={product.kind}
              color={product.swatches[colour].hex}
              uid={`qv-${product.id}`}
              label={`${product.name} in ${product.swatches[colour].name}`}
            />
          </div>
          <div className="hbl-st-qv-body">
            <button type="button" className="hbl-st-qv-close" onClick={close} aria-label="Close quick view">
              <CloseIcon />
            </button>
            <p className="hbl-st-kicker">{product.category}</p>
            <h3 id="hbl-st-qv-title" className="hbl-st-qv-title font-serif">
              {product.name}
            </h3>
            <p className="hbl-st-qv-price">
              {money(product.price)}
              <span>
                <Stars value={product.rating} /> {product.reviews} reviews
              </span>
            </p>
            <p className="hbl-st-qv-text">{product.blurb}</p>
            <p className="hbl-st-qv-detail">{product.detail}</p>
            <p className="hbl-st-qv-label">
              Colour: <strong>{product.swatches[colour].name}</strong>
            </p>
            <Swatches product={product} active={colour} onPick={onColour} size="lg" />
            <div className="hbl-st-qv-buy">
              <div className="hbl-st-qty" role="group" aria-label="Quantity">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <MinusIcon />
                </button>
                <output aria-live="polite">{qty}</output>
                <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">
                  <PlusIcon />
                </button>
              </div>
              <AddToBag
                name={`${qty > 1 ? `${qty} x ` : ""}${product.name}, ${product.swatches[colour].name}`}
                qty={qty}
                label={`Add to bag · ${money(product.price * qty)}`}
                className="hbl-st-add-wide"
              />
            </div>
            <ul className="hbl-st-qv-notes">
              <li>Ships in 1 to 2 business days from Brooklyn</li>
              <li>Free shipping over $75, free returns for 60 days</li>
            </ul>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function BestSellers() {
  const [filter, setFilter] = React.useState<(typeof filters)[number]>("All");
  const [quick, setQuick] = React.useState<Product | null>(null);
  const [quickColour, setQuickColour] = React.useState(0);
  const dialogRef = React.useRef<HTMLDialogElement | null>(null);
  const shown = filter === "All" ? bestSellers : bestSellers.filter((p) => p.category === filter);

  function openQuick(p: Product, colour: number) {
    setQuick(p);
    setQuickColour(colour);
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
  }

  return (
    <section id="bestsellers" className="hbl-st-section hbl-st-section-bone">
      <div className="hbl-st-wrap">
        <div className="hbl-st-head-row">
          <FadeInView className="hbl-st-head">
            <p className="hbl-st-kicker">Best sellers</p>
            <h2 className="hbl-st-h2 font-serif">The pieces people buy twice.</h2>
          </FadeInView>
          <div className="hbl-st-filters" role="group" aria-label="Filter best sellers">
            {filters.map((f) => (
              <button key={f} type="button" className="hbl-st-filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="hbl-st-grid">
          {shown.map((p) => (
            <div key={p.id} className="hbl-st-grid-cell">
              <Card product={p} onQuick={openQuick} />
            </div>
          ))}
        </div>
      </div>
      <QuickView product={quick} colour={quickColour} onColour={setQuickColour} dialogRef={dialogRef} />
    </section>
  );
}

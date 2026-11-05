"use client";

import * as React from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ProductArt } from "./art";
import { AddToBag } from "./cart";
import { bestSellers, hotspots, money } from "./data";
import { CloseIcon } from "./icons";

const spots = hotspots.map((h) => ({ ...h, product: bestSellers.find((p) => p.id === h.id)! }));

function Scene() {
  return (
    <svg viewBox="0 0 1000 600" className="hbl-st-scene-svg" aria-hidden="true">
      <defs>
        <linearGradient id="hbl-st-wall" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#efe6d8" />
          <stop offset="1" stopColor="#e4d8c6" />
        </linearGradient>
        <linearGradient id="hbl-st-light" x1="1" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fffaf0" stopOpacity=".85" />
          <stop offset="1" stopColor="#fffaf0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hbl-st-oak" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c99d70" />
          <stop offset="1" stopColor="#ad8259" />
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#hbl-st-wall)" />
      <path d="M560 380V170a110 110 0 0 1 220 0v210Z" fill="#f8f3ea" />
      <path d="M670 60v320M560 250h220" stroke="#e1d5c1" strokeWidth="6" />
      <path d="M560 380V170a110 110 0 0 1 220 0v210Z" fill="none" stroke="#d9cbb5" strokeWidth="8" />
      <path d="M560 380 300 600h420l60-220Z" fill="url(#hbl-st-light)" opacity=".55" />
      <path d="M840 120c30 40 40 100 20 160" fill="none" stroke="#7d9270" strokeWidth="3" />
      <ellipse cx="856" cy="150" rx="10" ry="22" fill="#8fa37f" transform="rotate(30 856 150)" />
      <ellipse cx="866" cy="210" rx="10" ry="22" fill="#7d9270" transform="rotate(-20 866 210)" />
      <ellipse cx="846" cy="250" rx="9" ry="20" fill="#a9b8a0" transform="rotate(40 846 250)" />
      <rect y="500" width="1000" height="100" fill="#ddcfba" />
      <rect y="496" width="1000" height="6" fill="#f3ece0" />
      <rect x="236" y="404" width="568" height="74" rx="4" fill="url(#hbl-st-oak)" />
      <path d="M378 410v62M520 410v62M662 410v62" stroke="#9c734d" strokeWidth="2" />
      <circle cx="366" cy="440" r="3" fill="#7d5c40" />
      <circle cx="532" cy="440" r="3" fill="#7d5c40" />
      <circle cx="674" cy="440" r="3" fill="#7d5c40" />
      <rect x="220" y="390" width="600" height="16" rx="4" fill="#b98a5e" />
      <path d="M262 478l-8 46M778 478l8 46" stroke="#7d5c40" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="520" cy="532" rx="300" ry="10" fill="#1c1c1a" opacity=".08" />
      <rect x="352" y="358" width="70" height="12" rx="2" fill="#23352b" />
      <rect x="358" y="370" width="62" height="10" rx="2" fill="#b86b4b" />
      <rect x="350" y="380" width="74" height="10" rx="2" fill="#efe7d9" />
      <ProductArt kind="vase" color="#b86b4b" uid="lb-vase" x={200} y={218} width={200} height={200} />
      <ProductArt kind="bowl" color="#efe7d9" uid="lb-bowl" x={395} y={261} width={150} height={150} />
      <ProductArt kind="candle" color="#3a5244" uid="lb-candle" x={530} y={287} width={120} height={120} />
      <ProductArt kind="lamp" color="#efe7d9" uid="lb-lamp" x={640} y={218} width={200} height={200} />
      <ProductArt kind="stool" color="#c79a6b" uid="lb-stool" x={35} y={414} width={170} height={170} />
      <ProductArt kind="napkins" color="#a9b8a0" uid="lb-nap" x={75} y={404} width={90} height={90} />
    </svg>
  );
}

export function Lookbook() {
  const [active, setActive] = React.useState<string | null>("fig-candle");
  const current = spots.find((s) => s.id === active) ?? null;

  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="lookbook" className="hbl-st-section hbl-st-section-bone">
      <div className="hbl-st-wrap">
        <div className="hbl-st-head-row">
          <FadeInView className="hbl-st-head">
            <p className="hbl-st-kicker">Lookbook · The Sunday sideboard</p>
            <h2 className="hbl-st-h2 font-serif">Shop the room, one piece at a time.</h2>
          </FadeInView>
          <p className="hbl-st-sub hbl-st-head-aside">Tap a dot to see what is on the shelf. Everything here ships in two to four days.</p>
        </div>
        <FadeInView distance={32}>
          <div className="hbl-st-scene">
            <Scene />
            {spots.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="hbl-st-spot"
                style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${i * 0.4}s` }}
                aria-pressed={active === s.id}
                aria-controls="hbl-st-look-card"
                aria-label={`Show ${s.product.name}`}
                onClick={() => setActive((a) => (a === s.id ? null : s.id))}
              >
                <span aria-hidden="true" />
              </button>
            ))}
            {current && (
              <div
                id="hbl-st-look-card"
                key={current.id}
                className="hbl-st-pop"
                data-side={current.x > 55 ? "left" : "right"}
                style={{ "--x": `${current.x}%`, "--y": `${current.y}%` } as React.CSSProperties}
                role="group"
                aria-label={current.product.name}
              >
                <div className="hbl-st-pop-art">
                  <ProductArt kind={current.product.kind} color={current.product.swatches[0].hex} uid={`lbp-${current.id}`} />
                </div>
                <div className="hbl-st-pop-body">
                  <p className="hbl-st-card-name">{current.product.name}</p>
                  <p className="hbl-st-card-meta">{current.product.blurb}</p>
                  <div className="hbl-st-pop-buy">
                    <span className="hbl-st-price">{money(current.product.price)}</span>
                    <AddToBag name={current.product.name} label="Add" />
                  </div>
                </div>
                <button type="button" className="hbl-st-pop-x" onClick={() => setActive(null)} aria-label="Close product card">
                  <CloseIcon size={14} />
                </button>
              </div>
            )}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

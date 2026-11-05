"use client";

import * as React from "react";
import { TiltCard } from "@/registry/hyperblur/tilt-card";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ProductArt } from "./art";
import { AddToBag } from "./cart";
import { arrivals, money } from "./data";
import { ChevronIcon } from "./icons";

const tints = ["#e4e8e3", "#efe5d6", "#eedfd5", "#ebe4d6", "#e2e7dd", "#e8ddd0", "#f0e2d8"];

export function NewArrivals() {
  const track = React.useRef<HTMLDivElement>(null);
  const [edge, setEdge] = React.useState({ start: true, end: false });

  function onScroll() {
    const el = track.current;
    if (!el) return;
    const start = el.scrollLeft < 8;
    const end = el.scrollLeft + el.clientWidth > el.scrollWidth - 8;
    setEdge((e) => (e.start === start && e.end === end ? e : { start, end }));
  }

  function go(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section id="arrivals" className="hbl-st-section">
      <div className="hbl-st-wrap">
        <div className="hbl-st-head-row">
          <FadeInView className="hbl-st-head">
            <p className="hbl-st-kicker">Just landed</p>
            <h2 className="hbl-st-h2 font-serif">New arrivals, fresh from the kiln.</h2>
          </FadeInView>
          <div className="hbl-st-arrows">
            <button type="button" className="hbl-st-arrow" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous arrivals">
              <ChevronIcon dir="left" />
            </button>
            <button type="button" className="hbl-st-arrow" onClick={() => go(1)} disabled={edge.end} aria-label="Next arrivals">
              <ChevronIcon dir="right" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={track}
        className="hbl-st-track"
        onScroll={onScroll}
        role="region"
        aria-label="New arrivals"
        tabIndex={0}
      >
        {arrivals.map((p, i) => (
          <div key={p.id} id={`p-${p.id}`} className="hbl-st-slide" data-slide>
            <TiltCard maxTilt={6} scale={1.01} className="hbl-st-tilt">
              <div className="hbl-st-slide-media" style={{ background: tints[i % tints.length] }}>
                <span className="hbl-st-badge hbl-st-badge-new">New</span>
                <ProductArt kind={p.kind} color={p.swatches[0].hex} uid={`na-${p.id}`} />
              </div>
            </TiltCard>
            <div className="hbl-st-slide-body">
              <div className="min-w-0">
                <h3 className="hbl-st-card-name">{p.name}</h3>
                <p className="hbl-st-card-meta">{p.blurb}</p>
              </div>
              <div className="hbl-st-slide-buy">
                <span className="hbl-st-price">{money(p.price)}</span>
                <AddToBag name={p.name} compact />
              </div>
            </div>
          </div>
        ))}
        <div className="hbl-st-slide-end" aria-hidden="true" />
      </div>
    </section>
  );
}

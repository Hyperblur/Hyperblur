import type { CSSProperties } from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Marquee } from "@/registry/hyperblur/marquee";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { ProductArt } from "./art";
import { categories } from "./data";
import { ArrowIcon, LeafIcon } from "./icons";

const benefits = [
  "Free shipping over $75",
  "60-day returns",
  "Thrown and woven in small batches",
  "Plastic-free packaging",
  "Carbon-neutral delivery",
  "2-year furniture guarantee",
  "Gift wrap in linen, $6",
];

const press = ["Home & Hearth", "The Slow Edit", "Dwellings Weekly", "Field Journal", "Low House"];

export function BenefitsBand() {
  return (
    <div className="hbl-st-band">
      <Marquee speed={0.6} gap={48}>
        {benefits.map((b) => (
          <span key={b} className="hbl-st-band-item">
            <LeafIcon />
            {b}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Ratings and press" className="hbl-st-trust">
      <div className="hbl-st-wrap hbl-st-trust-row">
        <div className="hbl-st-trust-rating">
          <StarRating value={4.8} readOnly precision={0.5} size={18} color="#b86b4b" />
          <p>
            <strong>4.8 out of 5</strong> from 2,550 verified reviews
          </p>
        </div>
        <ul className="hbl-st-press" aria-label="As featured in">
          {press.map((p) => (
            <li key={p} className="font-serif">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section id="categories" className="hbl-st-section">
      <div className="hbl-st-wrap">
        <FadeInView className="hbl-st-head">
          <p className="hbl-st-kicker">Shop by room and ritual</p>
          <h2 className="hbl-st-h2 font-serif">Four collections, one calm palette.</h2>
          <p className="hbl-st-sub">Everything is designed to sit together, so a mug bought in May still matches the bowl you add in December.</p>
        </FadeInView>
        <div className="hbl-st-cats">
          {categories.map((c, i) => (
            <FadeInView key={c.id} delay={i * 0.08} className="min-w-0">
              <a href="#bestsellers" className="hbl-st-cat" style={{ "--tint": c.tint } as CSSProperties}>
                <span className="hbl-st-cat-art">
                  <ProductArt kind={c.kind} color={c.color} uid={`cat-${i}`} />
                </span>
                <span className="hbl-st-cat-label">
                  <span className="font-serif">{c.label}</span>
                  <span className="hbl-st-cat-count">{c.count} pieces</span>
                </span>
                <span className="hbl-st-cat-reveal">
                  <span>{c.note}</span>
                  <span className="hbl-st-cat-go">
                    Shop {c.label.toLowerCase()}
                    <ArrowIcon size={14} />
                  </span>
                </span>
              </a>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

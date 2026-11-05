import { SplitText } from "@/registry/hyperblur/split-text";
import { Magnetic } from "@/registry/hyperblur/magnetic";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { AddToBag } from "./cart";
import { ArrowIcon } from "./icons";
import type { CSSProperties } from "react";

const v = (d: string, a: string) => ({ "--d": d, "--a": a }) as CSSProperties;

const popular = [
  { label: "Bud vases", href: "#p-dune-vase" },
  { label: "Linen throws", href: "#p-hollis-throw" },
  { label: "Fig & Cedar", href: "#p-fig-candle" },
  { label: "Oak stools", href: "#p-pebble-stool" },
];

function Composition() {
  return (
    <svg viewBox="0 0 600 560" className="hbl-st-comp" aria-hidden="true">
      <defs>
        <linearGradient id="hbl-st-arch" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a9b8a0" stopOpacity=".75" />
          <stop offset="1" stopColor="#a9b8a0" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id="hbl-st-vase" x1="0" x2="1">
          <stop offset="0" stopColor="#cf8463" />
          <stop offset=".45" stopColor="#b86b4b" />
          <stop offset="1" stopColor="#8d4d33" />
        </linearGradient>
        <linearGradient id="hbl-st-cup" x1="0" x2="1">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#ddd3c2" />
        </linearGradient>
        <linearGradient id="hbl-st-jar" x1="0" x2="1">
          <stop offset="0" stopColor="#4a6555" />
          <stop offset="1" stopColor="#1d2c24" />
        </linearGradient>
        <linearGradient id="hbl-st-plinth" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fbf8f3" />
          <stop offset="1" stopColor="#e7ddcd" />
        </linearGradient>
        <radialGradient id="hbl-st-sun" cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#d48a68" />
          <stop offset="1" stopColor="#b86b4b" />
        </radialGradient>
        <filter id="hbl-st-soft" x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <path d="M110 548V262a190 190 0 0 1 380 0v286Z" fill="url(#hbl-st-arch)" />
      <path d="M150 548V270a150 150 0 0 1 300 0v278" fill="none" stroke="#faf7f2" strokeOpacity=".55" strokeWidth="1.5" />
      <g className="hbl-st-float" style={v("-2s", "-10px")}>
        <circle cx="438" cy="150" r="52" fill="url(#hbl-st-sun)" />
      </g>

      <ellipse cx="300" cy="548" rx="250" ry="14" fill="#1c1c1a" opacity=".12" filter="url(#hbl-st-soft)" />
      <rect x="70" y="432" width="460" height="116" rx="20" fill="url(#hbl-st-plinth)" />
      <rect x="70" y="432" width="460" height="2" fill="#ffffff" opacity=".8" />
      <rect x="350" y="336" width="160" height="104" rx="16" fill="#ece3d4" />
      <rect x="350" y="336" width="160" height="104" rx="16" fill="url(#hbl-st-plinth)" opacity=".6" />

      <path d="M86 470c40-10 70 6 110 0s70-12 106 4v74H86Z" fill="#d6c6a8" opacity=".9" />
      <path d="M86 470c40-10 70 6 110 0s70-12 106 4" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
      <g stroke="#1c1c1a" strokeOpacity=".08" strokeWidth="1">
        <path d="M100 500h190M100 516h190M100 532h190" />
      </g>

      <ellipse className="hbl-st-shadow" cx="210" cy="440" rx="74" ry="9" fill="#1c1c1a" opacity=".22" filter="url(#hbl-st-soft)" />
      <g className="hbl-st-float" style={v("0s", "-12px")}>
        <g fill="none" stroke="#4f6a58" strokeWidth="2.4" strokeLinecap="round">
          <path d="M206 214c-6-40-22-74-48-104" />
          <path d="M212 214c4-50 22-90 52-120" />
        </g>
        <g fill="#5f7d68">
          <ellipse cx="180" cy="150" rx="7" ry="15" transform="rotate(-48 180 150)" />
          <ellipse cx="164" cy="122" rx="6" ry="13" transform="rotate(-30 164 122)" />
          <ellipse cx="196" cy="180" rx="6" ry="13" transform="rotate(-62 196 180)" />
          <ellipse cx="236" cy="136" rx="7" ry="15" transform="rotate(40 236 136)" />
          <ellipse cx="256" cy="106" rx="6" ry="13" transform="rotate(30 256 106)" />
          <ellipse cx="222" cy="172" rx="6" ry="13" transform="rotate(56 222 172)" />
        </g>
        <g fill="#a9b8a0">
          <ellipse cx="170" cy="138" rx="5" ry="11" transform="rotate(26 170 138)" />
          <ellipse cx="246" cy="122" rx="5" ry="11" transform="rotate(-28 246 122)" />
        </g>
        <path
          d="M190 206h40v22c0 14 50 40 50 108 0 62-34 98-70 98s-70-36-70-98c0-68 50-94 50-108Z"
          fill="url(#hbl-st-vase)"
        />
        <ellipse cx="210" cy="206" rx="20" ry="5" fill="#5e3020" opacity=".6" />
        <path d="M160 330c10-40 30-62 48-74" fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth="6" strokeLinecap="round" />
        <g fill="#5e3020" opacity=".25">
          <circle cx="196" cy="300" r="2" />
          <circle cx="232" cy="350" r="1.6" />
          <circle cx="182" cy="380" r="1.8" />
          <circle cx="244" cy="300" r="1.4" />
          <circle cx="214" cy="404" r="1.6" />
        </g>
      </g>

      <ellipse className="hbl-st-shadow" cx="430" cy="340" rx="50" ry="7" fill="#1c1c1a" opacity=".22" filter="url(#hbl-st-soft)" />
      <g className="hbl-st-float" style={v("-1.4s", "-9px")}>
        <circle className="hbl-st-flame" cx="430" cy="212" r="38" fill="#f3b75c" opacity=".2" />
        <rect x="384" y="240" width="92" height="96" rx="16" fill="url(#hbl-st-jar)" />
        <ellipse cx="430" cy="244" rx="40" ry="8" fill="#f6efe2" />
        <ellipse cx="430" cy="245" rx="31" ry="5" fill="#eadcc2" />
        <path d="M430 244v-14" stroke="#2a2622" strokeWidth="2.4" strokeLinecap="round" />
        <g className="hbl-st-flame">
          <path d="M430 196c7 11 12 19 12 26a12 12 0 0 1-24 0c0-7 5-15 12-26Z" fill="#f2b04f" />
          <path d="M430 210c4 6 6 10 6 13a6 6 0 0 1-12 0c0-3 2-7 6-13Z" fill="#fde9b6" />
        </g>
        <rect x="402" y="276" width="56" height="34" rx="4" fill="#f3eee6" />
        <rect x="412" y="286" width="36" height="3" rx="1.5" fill="#23352b" opacity=".7" />
        <rect x="418" y="294" width="24" height="2" rx="1" fill="#23352b" opacity=".4" />
        <rect x="421" y="300" width="18" height="2" rx="1" fill="#23352b" opacity=".4" />
      </g>

      <ellipse className="hbl-st-shadow" cx="370" cy="442" rx="56" ry="7" fill="#1c1c1a" opacity=".22" filter="url(#hbl-st-soft)" />
      <g className="hbl-st-float" style={v("-3.1s", "-8px")}>
        <path d="M410 396c18 0 18 30 0 30" fill="none" stroke="#e7ddcd" strokeWidth="8" />
        <path d="M326 382h86v34c0 14-10 22-24 22h-38c-14 0-24-8-24-22Z" fill="url(#hbl-st-cup)" />
        <ellipse cx="369" cy="382" rx="43" ry="7" fill="#c8bba5" />
        <ellipse cx="369" cy="383" rx="37" ry="5" fill="#7a4a2e" opacity=".85" />
        <path d="M352 370c-4-8 4-12 0-20M370 368c-4-8 4-12 0-20M388 370c-4-8 4-12 0-20" fill="none" stroke="#faf7f2" strokeWidth="2" strokeLinecap="round" opacity=".8" className="hbl-st-steam" />
      </g>

      <g className="hbl-st-float" style={v("-4s", "-14px")}>
        <circle cx="478" cy="410" r="20" fill="#a9b8a0" />
        <circle cx="471" cy="403" r="6" fill="#fff" opacity=".35" />
      </g>
      <g className="hbl-st-float" style={v("-2.6s", "-6px")}>
        <rect x="104" y="400" width="44" height="30" rx="8" fill="#23352b" />
        <rect x="112" y="392" width="44" height="12" rx="6" fill="#b86b4b" />
      </g>
    </svg>
  );
}

export function StoreHero() {
  return (
    <section id="top" className="hbl-st-hero">
      <div className="hbl-st-wrap hbl-st-hero-grid">
        <div className="hbl-st-hero-copy">
          <p className="hbl-st-eyebrow">
            <span className="hbl-st-dot" aria-hidden="true" />
            Autumn collection, 46 new pieces
          </p>
          <h1 className="hbl-st-h1 font-serif">
            <SplitText text="Quiet pieces for a slower home." by="words" stagger={0.08} duration={0.9} distance={28} trigger="mount" />
          </h1>
          <FadeInView delay={0.45} distance={16}>
            <p className="hbl-st-lede">
              Stoneware, stonewashed linen, hand-poured candles and small oak furniture, made in small batches by
              fourteen studios we know by name. Free shipping over $75 and 60 days to change your mind.
            </p>
          </FadeInView>
          <FadeInView delay={0.6} distance={16}>
            <div className="hbl-st-hero-ctas">
              <Magnetic strength={0.3} radius={110}>
                <a href="#bestsellers" className="hbl-st-btn hbl-st-btn-primary hbl-st-btn-lg">
                  Shop the collection
                  <ArrowIcon />
                </a>
              </Magnetic>
              <a href="#lookbook" className="hbl-st-btn hbl-st-btn-ghost hbl-st-btn-lg">
                See the lookbook
              </a>
            </div>
            <div className="hbl-st-popular">
              <span>Popular</span>
              {popular.map((p) => (
                <a key={p.href} href={p.href} className="hbl-st-chip">
                  {p.label}
                </a>
              ))}
            </div>
          </FadeInView>
        </div>
        <div className="hbl-st-hero-art">
          <Composition />
          <div className="hbl-st-hero-card">
            <span className="hbl-st-hero-card-swatch" aria-hidden="true" />
            <div className="min-w-0">
              <p className="hbl-st-hero-card-name">Dune Bud Vase</p>
              <p className="hbl-st-hero-card-meta">Clay glaze · $38 · 4.9 from 412 reviews</p>
            </div>
            <AddToBag name="Dune Bud Vase" compact />
          </div>
          <div className="hbl-st-hero-badge" aria-hidden="true">
            <span className="font-serif">Free</span>
            <span>shipping over $75</span>
          </div>
        </div>
      </div>
    </section>
  );
}

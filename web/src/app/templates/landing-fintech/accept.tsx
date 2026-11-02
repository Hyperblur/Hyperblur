import { SpotlightCard, SpotlightGroup } from "@/registry/hyperblur/spotlight-card";
import { OrbitIcons, type OrbitItem } from "@/registry/hyperblur/orbit-icons";
import { PayButton } from "@/registry/hyperblur/pay-button";
import { Sparkline } from "@/registry/hyperblur/sparkline";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Em, LogoMark, SectionHeading } from "./ui";

function Currency({ symbol, size = 15 }: { symbol: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <text x="12" y="12" dy="0.36em" textAnchor="middle" fontSize={size} fontWeight="600" fill="currentColor" fontFamily="inherit">
        {symbol}
      </text>
    </svg>
  );
}

const orbit: OrbitItem[][] = [
  [
    { icon: <Currency symbol="$" />, label: "US dollar" },
    { icon: <Currency symbol="€" />, label: "Euro" },
  ],
  [
    { icon: <Currency symbol="£" />, label: "British pound" },
    { icon: <Currency symbol="¥" />, label: "Japanese yen" },
    { icon: <Currency symbol="₹" />, label: "Indian rupee" },
  ],
  [
    { icon: <Currency symbol="R$" size={12} />, label: "Brazilian real" },
    { icon: <Currency symbol="₦" />, label: "Nigerian naira" },
    { icon: <Currency symbol="₩" />, label: "Korean won" },
    { icon: <Currency symbol="A$" size={12} />, label: "Australian dollar" },
  ],
];

const methods = [
  { name: "Pix", region: "Brazil", share: "41%" },
  { name: "UPI", region: "India", share: "63%" },
  { name: "SEPA Instant", region: "Eurozone", share: "28%" },
  { name: "iDEAL", region: "Netherlands", share: "71%" },
  { name: "BLIK", region: "Poland", share: "54%" },
];

const risk = [
  { id: "pi_8Hq2", amount: "$1,240.00", score: 4, tone: "#34d399", verdict: "Approved" },
  { id: "pi_3Lm9", amount: "€86.50", score: 12, tone: "#34d399", verdict: "Approved" },
  { id: "pi_0Tx7", amount: "$4,980.00", score: 87, tone: "#f87171", verdict: "Blocked" },
];

export function Accept() {
  return (
    <section id="accept" aria-labelledby="hbl-fn-accept-title" className="hbl-fn-section">
      <div className="hbl-fn-wrap">
        <FadeInView>
          <SectionHeading
            id="hbl-fn-accept-title"
            eyebrow="Accept"
            title={
              <>
                Every currency, <Em>one</Em> integration.
              </>
            }
            lead="Show local prices, take local methods and settle into the balance you choose. Meridian routes each charge to the acquirer most likely to approve it."
          />
        </FadeInView>

        <SpotlightGroup className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-6">
          <FadeInView className="min-w-0 md:col-span-2 lg:col-span-4">
            <SpotlightCard color="#34d399" size={420} radius={22} idle={0.25} className="grid h-full items-center gap-6 p-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,300px)] md:p-9">
              <div className="relative min-w-0">
                <span className="hbl-fn-chip hbl-fn-chip-em">135 currencies</span>
                <h3 className="hbl-fn-h3 mt-4" style={{ fontSize: 24 }}>Price in theirs, settle in yours</h3>
                <p className="hbl-fn-body mt-3 max-w-[360px]">
                  Present 135 currencies at checkout with rates refreshed every 30 seconds. Funds land in any of 18 settlement
                  currencies, so a seller in Lagos sees naira and you book dollars.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <dt className="text-[#8193ab]">Rate refresh</dt>
                    <dd className="hbl-fn-num mt-1 text-[20px] font-semibold tracking-[-0.03em]">30s</dd>
                  </div>
                  <div>
                    <dt className="text-[#8193ab]">Settlement currencies</dt>
                    <dd className="hbl-fn-num mt-1 text-[20px] font-semibold tracking-[-0.03em]">18</dd>
                  </div>
                </dl>
              </div>
              <div className="relative mx-auto w-full max-w-[300px]">
                <OrbitIcons items={orbit} accent="#34d399" duration={26}>
                  <span className="grid h-full w-full place-items-center rounded-[30%] bg-[#0b1630] shadow-[0_0_40px_-6px_rgba(52,211,153,0.7),inset_0_0_0_1px_rgba(52,211,153,0.35)]" role="img" aria-label="Meridian">
                    <LogoMark id="hbl-fn-orbit-logo" size={40} />
                  </span>
                </OrbitIcons>
              </div>
            </SpotlightCard>
          </FadeInView>

          <FadeInView className="min-w-0 lg:col-span-2" delay={0.08}>
            <SpotlightCard color="#60a5fa" size={360} radius={22} idle={0.25} className="flex h-full flex-col p-7">
              <span className="hbl-fn-chip hbl-fn-chip-blue">Checkout</span>
              <h3 className="hbl-fn-h3 mt-4">One tap, any card</h3>
              <p className="hbl-fn-body mt-2">Wallets, cards and local rails in a single embedded sheet.</p>
              <div className="mt-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.6)] p-4">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#c8d4e6]">Hand-dyed linen throw</span>
                  <span className="hbl-fn-num text-[#eaf2ff]">$68.00</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[13px]">
                  <span className="text-[#8193ab]">Shipping to Austin, TX</span>
                  <span className="hbl-fn-num text-[#8193ab]">$14.40</span>
                </div>
                <div className="my-3 h-px bg-[rgba(148,163,184,0.16)]" />
                <div className="flex items-center justify-between text-[14px] font-semibold">
                  <span>Total</span>
                  <span className="hbl-fn-num">$82.40</span>
                </div>
                <PayButton amount="$82.40" brand="visa" color="#2563eb" className="mt-4 w-full" />
              </div>
            </SpotlightCard>
          </FadeInView>

          <FadeInView className="min-w-0 lg:col-span-2" delay={0.04}>
            <SpotlightCard color="#34d399" size={340} radius={22} idle={0.25} className="flex h-full flex-col p-7">
              <h3 className="hbl-fn-h3">Local methods, built in</h3>
              <p className="hbl-fn-body mt-2">Share of checkout volume each method wins in its home market.</p>
              <ul className="mt-5 space-y-2">
                {methods.map((m) => (
                  <li key={m.name} className="hbl-fn-method">
                    <span className="min-w-0 truncate">
                      <span className="font-medium text-[#eaf2ff]">{m.name}</span>
                      <span className="text-[#7d8ea8]"> · {m.region}</span>
                    </span>
                    <span className="hbl-fn-num text-[#6ee7b7]">{m.share}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </FadeInView>

          <FadeInView className="min-w-0 lg:col-span-2" delay={0.1}>
            <SpotlightCard color="#60a5fa" size={340} radius={22} idle={0.25} className="flex h-full flex-col p-7">
              <h3 className="hbl-fn-h3">Adaptive acceptance</h3>
              <p className="hbl-fn-body mt-2">Smart retries and network tokens recover charges other processors decline.</p>
              <div className="mt-auto pt-8">
                <p className="hbl-fn-num text-[46px] font-semibold leading-none tracking-[-0.05em]">
                  96.8<span className="text-[24px] text-[#8193ab]">%</span>
                </p>
                <p className="mt-2 text-[13px] text-[#6ee7b7]">+4.2 pts authorization rate</p>
                <Sparkline data={[91.2, 91.8, 92.1, 92.0, 93.4, 93.9, 94.6, 94.4, 95.5, 96.1, 96.8]} color="#60a5fa" height={56} className="mt-4" />
              </div>
            </SpotlightCard>
          </FadeInView>

          <FadeInView className="min-w-0 md:col-span-2 lg:col-span-2" delay={0.16}>
            <SpotlightCard color="#34d399" size={340} radius={22} idle={0.25} className="flex h-full flex-col p-7">
              <h3 className="hbl-fn-h3">Fraud scored in 40ms</h3>
              <p className="hbl-fn-body mt-2">Every charge is scored against 2.1B signals before it reaches the network.</p>
              <ul className="mt-6 space-y-3">
                {risk.map((r) => (
                  <li key={r.id} className="rounded-xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.5)] p-3">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="hbl-fn-mono text-[#8193ab]">{r.id}</span>
                      <span className="hbl-fn-num text-[#eaf2ff]">{r.amount}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgba(148,163,184,0.14)]">
                        <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: r.tone }} />
                      </div>
                      <span className="text-[12px] font-medium" style={{ color: r.tone }}>
                        {r.verdict}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </FadeInView>
        </SpotlightGroup>
      </div>
    </section>
  );
}

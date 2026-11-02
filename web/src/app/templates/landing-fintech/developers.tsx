import type { ReactNode } from "react";
import { AnimatedBeam, type BeamNode } from "@/registry/hyperblur/animated-beam";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Em, Icon, LogoMark, SectionHeading } from "./ui";

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const rails: BeamNode[] = [
  { label: "Cards", icon: <Glyph><path d="M3 6h18v12H3zM3 10h18M7 15h3" /></Glyph> },
  { label: "Pix", icon: <Glyph><path d="M12 3l9 9-9 9-9-9zM8 12h8" /></Glyph> },
  { label: "UPI", icon: <Glyph><path d="M7 4l-3 16M13 4l-3 16M17 4l3 8-3 8" /></Glyph> },
  { label: "SEPA Instant", icon: <Glyph><path d="M17 6a7 7 0 1 0 0 12M4 10h9M4 14h9" /></Glyph> },
  { label: "ACH", icon: <Glyph><path d="M4 20h16M5 10h14M12 4l8 6H4zM7 10v8M12 10v8M17 10v8" /></Glyph> },
];

const hub: BeamNode = { label: "Meridian", icon: <LogoMark id="hbl-fn-beam-logo" /> };
const output: BeamNode = { label: "Your ledger", icon: <Glyph><path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4" /></Glyph> };

const points = [
  { title: "Typed SDKs", body: "Node, Python, Go, Ruby and Java, all built from one OpenAPI spec." },
  { title: "Idempotent by default", body: "Retry any request safely; every write takes an idempotency key." },
  { title: "Webhooks that replay", body: "Signed events with 30 days of history and one-click redelivery." },
];

function Line({ n, children }: { n: number; children?: ReactNode }) {
  return (
    <div className="flex">
      <span className="w-8 flex-none select-none pr-4 text-right text-[#475569]" aria-hidden="true">
        {n}
      </span>
      <span>{children}</span>
    </div>
  );
}

function CodeWindow() {
  return (
    <div className="hbl-fn-console">
      <div className="hbl-fn-console-bar justify-between">
        <div className="flex items-center gap-1" aria-hidden="true">
          <span className="hbl-fn-code-tab" data-active="true">payout.ts</span>
          <span className="hbl-fn-code-tab">payout.py</span>
        </div>
        <span className="hbl-fn-chip hbl-fn-chip-em">Live mode</span>
      </div>
      <div className="hbl-fn-scroll px-2 py-5 sm:px-4">
        <pre className="hbl-fn-code" aria-label="Example: create an instant payout with the Meridian Node SDK">
          <code>
            <Line n={1}>
              <span className="k">import</span> {"{ "}Meridian{" }"} <span className="k">from</span> <span className="s">&quot;@meridian/node&quot;</span>;
            </Line>
            <Line n={2} />
            <Line n={3}>
              <span className="k">const</span> meridian = <span className="k">new</span> <span className="f">Meridian</span>(process.env.MERIDIAN_KEY);
            </Line>
            <Line n={4} />
            <Line n={5}>
              <span className="k">const</span> payout = <span className="k">await</span> meridian.payouts.<span className="f">create</span>({"{"}
            </Line>
            <Line n={6}>
              {"  "}amount: <span className="n">4821000</span>,
            </Line>
            <Line n={7}>
              {"  "}currency: <span className="s">&quot;EUR&quot;</span>,
            </Line>
            <Line n={8}>
              {"  "}destination: <span className="s">&quot;acct_atelier_rocha&quot;</span>,
            </Line>
            <Line n={9}>
              {"  "}speed: <span className="s">&quot;instant&quot;</span>,
            </Line>
            <Line n={10}>
              {"  "}fx: {"{ "}source: <span className="s">&quot;USD&quot;</span>, lock: <span className="s">&quot;mid_market&quot;</span>
              {" }"},
            </Line>
            <Line n={11}>
              {"}"}, {"{ "}idempotencyKey: <span className="s">&quot;order-48213&quot;</span>
              {" }"});
            </Line>
          </code>
        </pre>
      </div>
      <div className="border-t border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.6)] px-5 py-4">
        <p className="hbl-fn-code">
          <span className="p">$</span> node payout.ts
        </p>
        <p className="hbl-fn-code mt-1">
          <span className="s">settled</span> po_9KfQ21 · €48,210.00 · <span className="n">812ms</span>
          <span className="hbl-fn-caret" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

export function Developers() {
  return (
    <section id="developers" aria-labelledby="hbl-fn-dev-title" className="hbl-fn-section hbl-fn-hair">
      <div className="hbl-fn-wrap">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInView className="min-w-0">
            <SectionHeading
              id="hbl-fn-dev-title"
              align="left"
              eyebrow="Developers"
              title={
                <>
                  Ship a payout in <Em>eleven</Em> lines.
                </>
              }
              lead="One API covers acceptance, payouts, FX and the ledger. Test mode mirrors production down to bank holidays, so what passes locally passes live."
            />
            <ul className="mt-9 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {points.map((p) => (
                <li key={p.title} className="min-w-0">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[rgba(52,211,153,0.12)] text-[#6ee7b7] shadow-[inset_0_0_0_1px_rgba(52,211,153,0.3)]">
                    <Icon className="h-4 w-4">
                      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
                    </Icon>
                  </span>
                  <p className="mt-3 text-[15px] font-medium text-[#eaf2ff]">{p.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#94a3b8]">{p.body}</p>
                </li>
              ))}
            </ul>
            <div className="hbl-fn-card mt-10 p-6 sm:p-8">
              <p className="text-[13px] uppercase tracking-[0.08em] text-[#8193ab]">Every rail, one ledger</p>
              <AnimatedBeam sources={rails} hub={hub} output={output} color="#34d399" duration={2.8} className="mt-6" />
            </div>
          </FadeInView>
          <FadeInView direction="left" delay={0.12} className="min-w-0 lg:sticky lg:top-24">
            <CodeWindow />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

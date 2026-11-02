"use client";

import { TabsUnderline } from "@/registry/hyperblur/tabs-underline";
import { DonutChart } from "@/registry/hyperblur/donut-chart";
import { Sparkline } from "@/registry/hyperblur/sparkline";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { Check, Em, Icon, SectionHeading } from "./ui";

const fx = [
  { pair: "USD → EUR", rate: "0.9214", receive: "€229,543.78", bank: "€223,439.50", keep: "€6,104.28", trend: [0.9181, 0.9193, 0.9188, 0.9202, 0.9197, 0.9209, 0.9205, 0.9214] },
  { pair: "USD → GBP", rate: "0.7862", receive: "£195,862.08", bank: "£190,653.50", keep: "£5,208.58", trend: [0.7891, 0.7884, 0.7876, 0.7880, 0.7869, 0.7866, 0.7871, 0.7862] },
  { pair: "USD → BRL", rate: "5.0420", receive: "R$ 1,256,088.25", bank: "R$ 1,222,685.00", keep: "R$ 33,403.25", trend: [4.9812, 4.9950, 5.0104, 5.0021, 5.0233, 5.0310, 5.0288, 5.0420] },
  { pair: "USD → INR", rate: "83.2100", receive: "₹2,07,29,691", bank: "₹2,01,78,425", keep: "₹5,51,266", trend: [83.02, 83.11, 83.07, 83.15, 83.19, 83.12, 83.18, 83.21] },
  { pair: "USD → JPY", rate: "151.3800", receive: "¥37,712,543", bank: "¥36,709,650", keep: "¥1,002,893", trend: [149.82, 150.21, 150.64, 150.33, 150.97, 151.12, 151.04, 151.38] },
];

const balances = [
  { label: "USD", value: 3210400, color: "#3b82f6" },
  { label: "EUR", value: 1641200, color: "#34d399" },
  { label: "GBP", value: 820700, color: "#a78bfa" },
  { label: "BRL", value: 609300, color: "#fbbf24" },
  { label: "Other 14", value: 530700, color: "#64748b" },
];

const rules = [
  { title: "Sweep BRL above R$ 2,000,000 into USD", when: "Daily at 17:00 São Paulo" },
  { title: "Keep 30 days of EUR payouts on hand", when: "Rebalanced every 6 hours" },
  { title: "Move idle USD into a 4.62% yield account", when: "Same-day liquidity" },
];

const ledger = [
  { ref: "po_9KfQ21", desc: "Payout · Atelier Rocha", amount: "−€48,210.00", status: "Matched", bank: "SEPA Inst. E2E 7781" },
  { ref: "ch_2WxP88", desc: "Charge · Order 48213", amount: "+$82.40", status: "Matched", bank: "Visa batch 1102" },
  { ref: "fx_7HtM03", desc: "Conversion USD → BRL", amount: "−$250,000.00", status: "Matched", bank: "Ledger leg 2 of 2" },
  { ref: "rf_1QaZ55", desc: "Refund · Order 47990", amount: "−$29.00", status: "Matched", bank: "Visa batch 1102" },
  { ref: "dp_5RtY40", desc: "Bank deposit · Itaú", amount: "+R$ 412,900.00", status: "Review", bank: "Amount differs by R$ 0.40" },
];

function FxPanel() {
  return (
    <div className="pt-4">
      <p className="text-[14px] text-[#94a3b8]">
        Converting <span className="hbl-fn-num font-medium text-[#eaf2ff]">$250,000</span> today. Meridian charges a flat 0.35% over
        mid-market; the bank column assumes a typical 3% spread.
      </p>
      <div className="hbl-fn-scroll mt-5 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.5)]">
        <table className="hbl-fn-table hbl-fn-num">
          <thead>
            <tr>
              <th scope="col">Pair</th>
              <th scope="col">Mid-market</th>
              <th scope="col" className="hidden md:table-cell">7 days</th>
              <th scope="col">With Meridian</th>
              <th scope="col">Typical bank</th>
              <th scope="col">You keep</th>
            </tr>
          </thead>
          <tbody>
            {fx.map((r) => (
              <tr key={r.pair}>
                <td className="font-medium text-[#eaf2ff]">{r.pair}</td>
                <td>{r.rate}</td>
                <td className="hidden w-[120px] md:table-cell">
                  <Sparkline data={r.trend} color="#60a5fa" height={26} strokeWidth={1.6} fill={false} />
                </td>
                <td className="text-[#eaf2ff]">{r.receive}</td>
                <td className="text-[#7d8ea8] line-through decoration-[rgba(148,163,184,0.5)]">{r.bank}</td>
                <td className="font-medium text-[#6ee7b7]">{r.keep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BalancesPanel() {
  return (
    <div className="grid gap-8 pt-4 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:items-center">
      <div className="mx-auto w-full max-w-[280px]">
        <DonutChart data={balances} size={220} thickness={24} centerLabel="$6.81M" showLegend />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] uppercase tracking-[0.08em] text-[#8193ab]">Treasury rules</p>
        <ul className="mt-4 space-y-3">
          {rules.map((r) => (
            <li key={r.title} className="flex items-start gap-3 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.5)] p-4">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-[rgba(59,130,246,0.14)] text-[#93c5fd] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]">
                <Icon className="h-4 w-4">
                  <path d="M4 7h11l-3-3M20 17H9l3 3" />
                </Icon>
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-medium text-[#eaf2ff]">{r.title}</span>
                <span className="mt-0.5 block text-[13px] text-[#8193ab]">{r.when}</span>
              </span>
              <span className="ml-auto hidden sm:inline-flex">
                <span className="hbl-fn-chip hbl-fn-chip-em">Active</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LedgerPanel() {
  return (
    <div className="grid gap-6 pt-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <ul className="min-w-0 divide-y divide-[rgba(148,163,184,0.16)] rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.5)]">
        {ledger.map((l) => (
          <li key={l.ref} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3.5 text-[14px]">
            <span className="hbl-fn-mono w-[92px] text-[12.5px] text-[#7d8ea8]">{l.ref}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[#eaf2ff]">{l.desc}</span>
              <span className="block truncate text-[12px] text-[#7d8ea8]">{l.bank}</span>
            </span>
            <span className="hbl-fn-num text-[#c8d4e6]">{l.amount}</span>
            <span className={`hbl-fn-chip ${l.status === "Matched" ? "hbl-fn-chip-em" : ""}`} style={l.status === "Matched" ? undefined : { color: "#fcd34d", borderColor: "rgba(252,211,77,0.35)", background: "rgba(252,211,77,0.08)" }}>
              {l.status}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[rgba(148,163,184,0.16)] bg-[rgba(6,11,26,0.5)] p-5">
        <div>
          <p className="text-[13px] text-[#8193ab]">Matched automatically this month</p>
          <p className="hbl-fn-num mt-2 text-[44px] font-semibold leading-none tracking-[-0.05em]">99.97%</p>
          <p className="mt-2 text-[13px] text-[#c8d4e6]">1,284,611 of 1,284,993 entries</p>
        </div>
        <ul className="space-y-2 text-[13px] text-[#c8d4e6]">
          <li className="flex gap-2">
            <Check />
            Double-entry ledger, every leg traceable
          </li>
          <li className="flex gap-2">
            <Check />
            Exports to NetSuite, Xero and QuickBooks
          </li>
        </ul>
      </div>
    </div>
  );
}

const tabs = [
  { id: "fx", label: "FX rates", content: <FxPanel /> },
  { id: "balances", label: "Balances", content: <BalancesPanel /> },
  { id: "ledger", label: "Reconciliation", content: <LedgerPanel /> },
];

export function Treasury() {
  return (
    <section id="treasury" aria-labelledby="hbl-fn-treasury-title" className="hbl-fn-section hbl-fn-hair">
      <div className="hbl-fn-wrap">
        <FadeInView>
          <SectionHeading
            id="hbl-fn-treasury-title"
            eyebrow="Treasury"
            title={
              <>
                A treasury desk that <Em>never</Em> sleeps.
              </>
            }
            lead="Hold 18 currencies, convert at the real rate and let rules move money while your finance team is offline. Every cent lands in one reconciled ledger."
          />
        </FadeInView>
        <FadeInView delay={0.1} distance={28}>
          <div className="hbl-fn-card mt-14 p-4 sm:p-6 md:mt-16 md:p-8">
            <TabsUnderline tabs={tabs} color="#34d399" />
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

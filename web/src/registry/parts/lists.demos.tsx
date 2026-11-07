import type { CSSProperties, ReactNode } from "react";
import { PeopleList } from "@/registry/hyperblur/people-list";
import { FileList } from "@/registry/hyperblur/file-list";
import { Leaderboard } from "@/registry/hyperblur/leaderboard";
import { TransactionList } from "@/registry/hyperblur/transaction-list";
import { InboxList } from "@/registry/hyperblur/inbox-list";
import { ProductGrid } from "@/registry/hyperblur/product-grid";
import { SortableList } from "@/registry/hyperblur/sortable-list";

const card =
  "box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111] text-left text-[#ededed]";

const team = [
  { id: "d1", name: "Maya Johnson", email: "maya@northwind.io", role: "Owner", status: "online" as const },
  { id: "d2", name: "Daniel Okafor", email: "daniel@northwind.io", role: "Admin", status: "away" as const },
  { id: "d3", name: "Priya Raman", email: "priya@northwind.io", role: "Member", status: "online" as const },
];

const files = [
  { id: "a1", name: "Brand assets", kind: "folder" as const, size: "24 items", modified: "Oct 30" },
  { id: "a2", name: "Q3 report.pdf", kind: "pdf" as const, size: "2.4 MB", modified: "Oct 28" },
  { id: "a3", name: "Forecast.xlsx", kind: "sheet" as const, size: "612 KB", modified: "Oct 26" },
];

const leaders = [
  { id: "w1", name: "Sofia Marchetti", score: 12840, change: 0 },
  { id: "w2", name: "Kenji Watanabe", score: 11975, change: 2 },
  { id: "w3", name: "Amara Nwosu", score: 11320, change: -1 },
  { id: "w4", name: "Oliver Brandt", score: 10410, change: 1 },
  { id: "w5", name: "You", score: 9215, change: 4, you: true },
];

const payments = [
  { id: "x1", day: "Today", merchant: "Blue Bottle Coffee", category: "Dining", time: "8:42 AM", amount: -6.5, reference: "TXN-84F2-19C7", account: "Visa 4821" },
  { id: "x2", day: "Today", merchant: "Stripe Payout", category: "Income", time: "7:15 AM", amount: 3240, reference: "PO-5521-A0E3", account: "Checking 0917" },
  { id: "x3", day: "Today", merchant: "Spotify", category: "Subscriptions", time: "6:03 AM", amount: -11.99, status: "pending" as const, reference: "TXN-71B0-44D8", account: "Visa 4821" },
  { id: "x4", day: "Yesterday", merchant: "Whole Foods", category: "Groceries", time: "6:20 PM", amount: -84.37, reference: "TXN-62A9-0B15", account: "Visa 4821" },
];

const mail = [
  { id: "e1", sender: "Priya Raman", subject: "Roadmap review moved", preview: "The Q4 review now starts at 2pm so Daniel can join.", time: "9:41 AM", unread: true, starred: true },
  { id: "e2", sender: "Stripe", subject: "Your payout is on the way", preview: "Funds should arrive within two business days.", time: "8:15 AM", unread: true },
  { id: "e3", sender: "Daniel Okafor", subject: "Re: Pricing page copy", preview: "Looks great. Can we say two months free?", time: "Yesterday" },
];

const shop = [
  { id: "g1", name: "Arc Floor Lamp", category: "Lighting", price: 189, rating: 4.8, colors: ["#f5b84a", "#b8561f"] as [string, string], shape: "arch" as const },
  { id: "g2", name: "Tidal Chair", category: "Seating", price: 420, rating: 4.9, colors: ["#4a7fc0", "#142a45"] as [string, string], shape: "arch" as const },
  { id: "g3", name: "Terra Vase", category: "Decor", price: 58, rating: 4.7, colors: ["#e07a5f", "#5a2418"] as [string, string], shape: "orb" as const },
  { id: "g4", name: "Halo Pendant", category: "Lighting", price: 124, rating: 4.6, colors: ["#ffd9a0", "#8a5a2b"] as [string, string], shape: "ring" as const },
];

const tasks = [
  { id: "k1", title: "Design review", meta: "High", tone: "red" as const },
  { id: "k2", title: "Ship onboarding flow", meta: "Medium", tone: "amber" as const },
  { id: "k3", title: "Write release notes", meta: "Low", tone: "green" as const },
  { id: "k4", title: "Fix billing webhook", meta: "High", tone: "red" as const },
];

export const listsDemos: Record<string, ReactNode> = {
  "people-list": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} p-2`}>
        <PeopleList
          people={team}
          placeholder="Search the design team"
          className="[&_.hb-ppl-row]:py-[3px]!"
        />
      </div>
    </div>
  ),
  "file-list": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} font-grotesk p-2.5`}>
        <FileList files={files} title="Documents" defaultSelected={["a2"]} />
      </div>
    </div>
  ),
  leaderboard: (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} p-3`}>
        <div className="mb-1 flex items-baseline justify-between">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.08em]">Weekly XP</span>
          <span className="font-mono text-[11px] text-[#8f8f8f]">resets in 2d</span>
        </div>
        <Leaderboard
          entries={leaders}
          topN={1}
          unit="xp"
          className="[&_.hb-ldb-body]:px-3! [&_.hb-ldb-body]:py-[2px]! [&_.hb-ldb-main]:gap-1! [&_.hb-ldb-avatar]:size-6! [&_.hb-ldb-gap]:py-px! [&_[data-you=true]_.hb-ldb-body]:py-3!"
        />
      </div>
    </div>
  ),
  "transaction-list": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} font-mono p-1.5`}>
        <TransactionList
          transactions={payments}
          maxHeight={152}
          className="[&_.hb-trx-row]:p-3! [&_.hb-trx-day]:px-3!"
        />
      </div>
    </div>
  ),
  "inbox-list": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} font-grotesk p-1.5`}>
        <InboxList
          messages={mail.slice(0, 2)}
          className="[&_.hb-inb-inner]:p-3! [&_.hb-inb-head]:px-3!"
        />
      </div>
    </div>
  ),
  "product-grid": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <ProductGrid
          products={shop.slice(0, 2)}
          density="compact"
          className="[&_.hb-pgr-bar]:hidden [&_.hb-pgr-grid]:grid-cols-1! [&_.hb-pgr-card]:p-3! [&_.hb-pgr-heart]:right-3!"
        />
      </div>
    </div>
  ),
  "sortable-list": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} p-3`}>
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="font-sans text-lg leading-5">Today&rsquo;s focus</span>
          <span className="font-grotesk text-[11px] text-[#8f8f8f]">Drag to reorder</span>
        </div>
        <SortableList
          items={tasks.slice(0, 3)}
          label="Today's focus"
          className="[&_.hb-srt-row]:h-10! [&_.hb-srt-row]:pl-3! [&_.hb-srt-grip]:h-4!"
          style={{ "--hb-srt-gap": "4px" } as CSSProperties}
        />
      </div>
    </div>
  ),
};

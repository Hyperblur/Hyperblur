"use client";

import { DataTable, pill, type DataTableColumn } from "@/registry/hyperblur/data-table";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const columns: DataTableColumn[] = [
  { key: "customer", header: "Customer" },
  { key: "status", header: "Status", render: (row) => pill(String(row.status)) },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (row) => (
      <span style={{ fontFamily: "var(--font-mono)" }}>{money.format(Number(row.amount))}</span>
    ),
  },
];

const rows = [
  { id: "#4821", customer: "Ava Thompson", status: "Paid", amount: 249 },
  { id: "#4820", customer: "Noah Garcia", status: "Pending", amount: 89.5 },
  { id: "#4819", customer: "Mia Chen", status: "Paid", amount: 1240 },
  { id: "#4818", customer: "Liam Walker", status: "Refunded", amount: 59 },
  { id: "#4817", customer: "Zoe Martin", status: "Paid", amount: 410.25 },
  { id: "#4816", customer: "Eli Brooks", status: "Pending", amount: 129 },
  { id: "#4815", customer: "Ivy Nguyen", status: "Paid", amount: 38 },
];

export function DataTableDemo() {
  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <DataTable columns={columns} rows={rows} maxHeight={176} caption="Recent orders" />
    </div>
  );
}

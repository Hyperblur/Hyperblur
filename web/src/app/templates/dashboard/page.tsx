import type { Metadata } from "next";
import Link from "next/link";
import { DashboardShowcase } from "@/components/site/dashboard-showcase";

export const metadata: Metadata = {
  title: "Dashboard templates",
  description: "Six complete dashboard screens: analytics, sales, projects, finance, admin and orders.",
};

export default function DashboardTemplatePage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="text-xs text-muted">Template · Dashboards · six screens, one file each</p>
          <Link href="/effects#dashboards" className="hb-btn hb-btn-ghost hb-btn-sm">
            View dashboards
          </Link>
        </div>
      </div>
      <DashboardShowcase />
    </>
  );
}

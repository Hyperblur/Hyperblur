import { Wordmark } from "./ui";

const columns = [
  { title: "Product", links: ["Agents", "Approvals", "Guardrails", "Integrations", "Changelog"] },
  { title: "Workflows", links: ["Support triage", "Invoice matching", "Employee onboarding", "Vendor updates"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Security"] },
  { title: "Resources", links: ["Docs", "API reference", "Status", "Contact"] },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div className="min-w-0">
            <Wordmark id="footer" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[#7d8299]">
              Agents for support, finance and people operations, with a human on every decision that matters.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title} className="min-w-0">
                <p className="text-[13px] font-medium text-[#eceef6]">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="hbl-ai-flink">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-6 text-[12.5px] text-[#6b7088] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Cadence Labs, Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#top" className="hbl-ai-flink">
              Privacy
            </a>
            <a href="#top" className="hbl-ai-flink">
              Terms
            </a>
            <a href="#top" className="hbl-ai-flink">
              DPA
            </a>
            <span className="inline-flex items-center gap-2">
              <span className="hbl-ai-ok" aria-hidden="true" />
              All systems normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

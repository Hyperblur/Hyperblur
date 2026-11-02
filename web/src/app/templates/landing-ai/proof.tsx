import { Marquee } from "@/registry/hyperblur/marquee";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";

const customers = [
  { name: "Northbeam", style: "font-grotesk font-semibold tracking-tight", mark: "circle" },
  { name: "Ledgerly", style: "font-serif text-[22px] italic", mark: "none" },
  { name: "Halcyon Health", style: "font-sans font-medium tracking-tight", mark: "ring" },
  { name: "PARCELWISE", style: "font-mono text-[14px] tracking-[0.2em]", mark: "none" },
  { name: "Brightside", style: "font-grotesk font-bold tracking-[-0.04em]", mark: "bars" },
  { name: "Oakmont Bank", style: "font-serif text-[21px]", mark: "none" },
  { name: "Tessellate", style: "font-sans font-semibold tracking-[-0.03em]", mark: "grid" },
  { name: "fieldnote", style: "font-grotesk font-medium lowercase tracking-tight", mark: "dot" },
  { name: "Quorum", style: "font-sans font-bold uppercase tracking-[0.12em] text-[14px]", mark: "ring" },
  { name: "Veridian", style: "font-serif text-[22px] italic", mark: "circle" },
];

function Mark({ kind }: { kind: string }) {
  if (kind === "none") return null;
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      {kind === "circle" ? <circle cx="10" cy="10" r="8" /> : null}
      {kind === "ring" ? <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2.6" /> : null}
      {kind === "dot" ? <circle cx="10" cy="10" r="4" /> : null}
      {kind === "bars" ? (
        <>
          <rect x="2" y="9" width="4" height="9" rx="1" />
          <rect x="8" y="5" width="4" height="13" rx="1" />
          <rect x="14" y="2" width="4" height="16" rx="1" />
        </>
      ) : null}
      {kind === "grid" ? (
        <>
          <rect x="2" y="2" width="7" height="7" rx="1.5" />
          <rect x="11" y="2" width="7" height="7" rx="1.5" opacity=".55" />
          <rect x="2" y="11" width="7" height="7" rx="1.5" opacity=".55" />
          <rect x="11" y="11" width="7" height="7" rx="1.5" />
        </>
      ) : null}
    </svg>
  );
}

export function Proof() {
  return (
    <section aria-label="Customers" className="relative border-y border-white/[0.06] bg-[#090a11]/80 py-14">
      <FadeInView>
        <p className="px-5 text-center text-sm text-[#7d8299]">
          Back-office teams at <span className="text-[#eceef6]">900+ companies</span> hand Cadence over 2 million tasks a
          quarter
        </p>
      </FadeInView>
      <div className="mx-auto mt-9 max-w-[1200px]">
        <Marquee speed={0.55} gap={64}>
          {customers.map((c) => (
            <span key={c.name} className={`hbl-ai-logo ${c.style}`}>
              <Mark kind={c.mark} />
              {c.name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

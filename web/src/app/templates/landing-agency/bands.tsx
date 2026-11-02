import { ScrollVelocityText } from "@/registry/hyperblur/scroll-velocity-text";

export function VelocityBand({
  text,
  direction = 1,
  outline = false,
  accent = false,
}: {
  text: string;
  direction?: 1 | -1;
  outline?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`border-b hbl-ag-rule py-6 sm:py-8 ${accent ? "bg-[#ff4f2e] text-[#0e0e0e]" : ""}`}
      aria-hidden="true"
    >
      <ScrollVelocityText
        text={text}
        direction={direction}
        baseSpeed={36}
        velocityFactor={0.9}
        gap={0}
        className={`hbl-ag-band ${outline ? "hbl-ag-outline" : ""}`}
      />
    </div>
  );
}

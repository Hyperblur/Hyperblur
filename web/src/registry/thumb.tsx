import type { CSSProperties, ReactNode } from "react";

export function thumb(node: ReactNode, { scale = 0.34, width = 960, y = 0 }: { scale?: number; width?: number; y?: number } = {}) {
  const transform = `translateX(calc(50cqw - ${(width * scale) / 2}px)) scale(${scale}) translateY(${-y}px)`;
  return (
    <div className="hb-thumb @container absolute inset-0 overflow-hidden">
      <div className="origin-top-left [transform:var(--hb-thumb)]" style={{ width, "--hb-thumb": transform } as CSSProperties}>
        {node}
      </div>
    </div>
  );
}

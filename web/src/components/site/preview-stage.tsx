"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

const DESIGN_WIDTH = 360;

interface Metrics {
  scale: number;
  width: number;
  height: number;
}

export function PreviewStage({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const scale = Math.min(1, w / DESIGN_WIDTH);
      setMetrics({ scale, width: w / scale, height: h / scale });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden">
      <div
        style={
          metrics
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: metrics.width,
                height: metrics.height,
                transform: `scale(${metrics.scale})`,
                transformOrigin: "0 0",
              }
            : { width: "100%", height: "100%", visibility: "hidden" }
        }
      >
        {children}
      </div>
    </div>
  );
}

import { ImageResponse } from "next/og";
import { categories, effects } from "@/registry/meta";

export const alt = "Hyperblur: visual effects for React, one command away.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  const labels = categories.map((c) => c.label).join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ededed",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="96" height="96" viewBox="0 0 32 32">
            <path d="M18.0 9.0 H33.0 L28.0 23.0 H13.0 Z" fill="#2F7BFF" />
            <path d="M13.5 9.0 H16.1 L11.1 23.0 H8.5 Z" fill="#2F7BFF" />
            <path d="M10.0 9.0 H11.6 L6.6 23.0 H5.0 Z" fill="#2F7BFF" />
            <path d="M7.2 9.0 H8.1 L3.1 23.0 H2.2 Z" fill="#2F7BFF" />
          </svg>
          <div
            style={{
              marginLeft: 28,
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            Hyperblur
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          Visual effects for React, one command away.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #2e2e2e",
            paddingTop: 28,
            fontSize: 26,
            color: "#8f8f8f",
          }}
        >
          <div style={{ display: "flex", color: "#7fb3ff", marginRight: 20 }}>
            {`${effects.length} effects`}
          </div>
          <div style={{ display: "flex" }}>{labels}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

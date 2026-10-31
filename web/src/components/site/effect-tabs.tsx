"use client";

import * as React from "react";
import type { ReactNode } from "react";
import { CodeBlock } from "./code-block";

interface EffectTabsProps {
  preview: ReactNode;
  source: string;
  sourceTitle: string;
  prompt: string;
}

const tabs = ["Preview", "Code", "Prompt"] as const;
type Tab = (typeof tabs)[number];

export function EffectTabs({ preview, source, sourceTitle, prompt }: EffectTabsProps) {
  const [tab, setTab] = React.useState<Tab>("Preview");
  const [key, setKey] = React.useState(0);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-line bg-surface p-1" role="tablist">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                tab === t ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "Preview" ? (
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="hb-btn hb-btn-ghost hb-btn-sm"
            aria-label="Replay the preview"
          >
            Replay
          </button>
        ) : null}
      </div>

      <div className="mt-4">
        {tab === "Preview" ? (
          <div
            key={key}
            className="hb-dots relative flex min-h-80 items-center justify-center overflow-hidden rounded-xl border border-line bg-bg"
          >
            {preview}
          </div>
        ) : null}
        {tab === "Code" ? <CodeBlock code={source} title={sourceTitle} maxHeight="40rem" /> : null}
        {tab === "Prompt" ? <CodeBlock code={prompt} title="paste into your coding agent" /> : null}
      </div>
    </div>
  );
}

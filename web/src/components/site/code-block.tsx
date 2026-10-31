import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  title?: string;
  maxHeight?: string;
}

export function CodeBlock({ code, title, maxHeight = "32rem" }: CodeBlockProps) {
  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-xs text-muted">{title}</span>
        <CopyButton value={code} label="Copy" size="sm" />
      </div>
      <pre className="overflow-auto p-4 font-mono text-[13px] leading-relaxed text-ink/90" style={{ maxHeight }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

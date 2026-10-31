import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
}

export function CodeBlock({ code, title, collapsible = false }: CodeBlockProps) {
  const body = (
    <pre className="max-h-[32rem] overflow-auto p-4 font-mono text-[13px] leading-relaxed text-ink/90">
      <code>{code}</code>
    </pre>
  );

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-lg border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-xs text-muted">{title}</span>
        <CopyButton value={code} label="Copy" className="px-3 py-1 text-xs" />
      </div>
      {collapsible ? (
        <details>
          <summary className="cursor-pointer px-4 py-2 text-xs text-muted hover:text-ink">
            Show source
          </summary>
          {body}
        </details>
      ) : (
        body
      )}
    </div>
  );
}

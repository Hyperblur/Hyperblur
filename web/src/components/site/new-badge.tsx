export function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`hb-new ${className}`}>
      <span className="hb-new-dot" aria-hidden="true" />
      New
    </span>
  );
}

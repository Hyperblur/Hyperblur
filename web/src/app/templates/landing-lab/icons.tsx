type P = { className?: string };

export function Mark({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M3 4h4.2L12 15.6 16.8 4H21l-9 17z" stroke="#d9dee8" strokeWidth="1.3" strokeLinejoin="miter" />
      <path d="M9.6 4h4.8L12 9.8z" fill="#ff4d4d" />
    </svg>
  );
}

export function ArrowLeft({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M10 3 5 8l5 5" />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="m6 3 5 5-5 5" />
    </svg>
  );
}

export function Play({ className = "h-3.5 w-3.5" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5z" />
    </svg>
  );
}

export function Pause({ className = "h-3.5 w-3.5" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />
    </svg>
  );
}

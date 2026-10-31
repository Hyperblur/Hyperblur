import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-8xl font-bold tracking-tight text-ink sm:text-9xl">404</p>
      <p className="mt-4 max-w-md text-muted">
        This page drifted out of focus. It may have moved, or it never existed.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link href="/" className="hb-btn hb-btn-primary">
          Home
        </Link>
        <Link href="/effects" className="hb-btn hb-btn-ghost">
          Browse effects
        </Link>
      </div>
    </div>
  );
}

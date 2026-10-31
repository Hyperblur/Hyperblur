import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Hyperblur home" className="flex items-center">
          <Image
            src="/brand/hyperblur-logo.svg"
            alt="Hyperblur"
            width={240}
            height={44}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/#effects" className="hover:text-ink">
            Effects
          </Link>
          <Link href="/#agents" className="hover:text-ink">
            For agents
          </Link>
          <a
            href="https://github.com/Hyperblur/Hyperblur"
            className="hover:text-ink"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

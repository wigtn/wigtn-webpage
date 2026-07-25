import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ResearchWordmark() {
  return (
    <Link href="/research/" aria-label="WIGTN Research home" className="inline-flex items-center gap-3">
      <Image
        src="/images/WIGTN_LOGO_WHITE.png"
        alt="WIGTN"
        width={141}
        height={32}
        className="h-6 w-auto"
        priority
      />
      <span className="h-4 w-px bg-white/20" />
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#B7B4C2]">
        Research
      </span>
    </Link>
  );
}

export function ResearchSiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#15151E]/95 text-white backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 px-5 md:px-8">
        <ResearchWordmark />
        <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.12em] text-[#A8A6B8] sm:gap-6">
          <Link href="/research/#projects" className="hidden transition-colors hover:text-white sm:inline">
            Projects
          </Link>
          <Link href="/research/#standards" className="hidden transition-colors hover:text-white sm:inline">
            Standards
          </Link>
          <Link href="/tech-reports/" className="hidden transition-colors hover:text-white md:inline">
            WIGTN index
          </Link>
          <a
            href="https://github.com/wigtn"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-white transition-opacity hover:opacity-65"
          >
            GitHub <ArrowUpRight size={11} />
          </a>
        </div>
      </nav>
    </header>
  );
}

export function ResearchSiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#15151E] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1fr_auto] md:items-end md:px-8">
        <div>
          <ResearchWordmark />
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#A8A6B8]">
            Methods, measurements and failure modes from systems built by WIGTN.
            Every numeric claim should lead back to a protocol, artifact or publication.
          </p>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#777584] md:text-right">
          <p>Static research archive</p>
          <p className="mt-2">© 2026 WIGTN</p>
        </div>
      </div>
    </footer>
  );
}

export function ResearchShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#1E1E28] selection:bg-[#9B51E0]/20">
      <ResearchSiteHeader />
      <main>{children}</main>
      <ResearchSiteFooter />
    </div>
  );
}

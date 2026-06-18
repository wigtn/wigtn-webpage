"use client";

/**
 * Shared chrome for the research-led mockup — header, footer, the scroll
 * motion variant, the section index rule, and the event icon map. Kept in
 * one place so the home page and every article detail page stay visually
 * identical.
 */

import Link from "next/link";
import { Trophy, MapPin, ArrowRight } from "lucide-react";
import { HOME, NAV } from "./data";

/* Event icon map — data references icons by string key (data.ts stays
 * serializable for the static-export route). */
export const EVENT_ICON = { trophy: Trophy, pin: MapPin } as const;

/* Single custom-indexed motion variant. `custom={i}` staggers via delay
 * while preserving the easing curve — never pass a separate `transition`
 * prop alongside it (framer would fall back to a spring → jitter). */
export const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

export const VIEWPORT = { once: true, margin: "-12% 0px" } as const;

export function IndexRule({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-xs text-violet">{n}</span>
      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAFAFA]/75 border-b border-gray-200/70">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={HOME} aria-label="WIGTN home" className="shrink-0">
          <img src="/images/WIGTN_LOGO_NAVY.png" alt="WIGTN" className="h-7 md:h-9 w-auto" />
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-sm text-gray-500">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="hover:text-foreground transition-colors">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="mailto:contact@wigtn.com"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-white px-4 py-2 text-sm font-medium hover:bg-violet-dark transition-colors"
        >
          Contact <ArrowRight size={14} />
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <img src="/images/WIGTN_LOGO_NAVY.png" alt="WIGTN" className="h-12 md:h-16 w-auto" />
            <p className="mt-3 text-gray-500 max-w-sm">
              Deep-tech research &amp; consulting. We prove it by what we publish.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 text-sm text-gray-500">
            <a href="mailto:contact@wigtn.com" className="hover:text-foreground transition-colors">
              contact@wigtn.com
            </a>
            <a
              href="https://github.com/wigtn"
              className="hover:text-foreground transition-colors"
            >
              github.com/wigtn
            </a>
            <span className="text-xs text-gray-400 mt-3">© WIGTN. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Sub-page shell — backdrop + header + footer around page content. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans antialiased">
      <BackdropDecor />
      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

/* Sub-page hero — eyebrow + display title + lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-10 md:pt-28 md:pb-14">
      <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-violet mb-5">
        <span className="h-1.5 w-1.5 rounded-full bg-violet" />
        {eyebrow}
      </span>
      <h1 className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold tracking-[-0.03em] leading-[1.05] max-w-3xl">
        {title}
      </h1>
      {lead && <p className="mt-5 max-w-2xl text-lg md:text-xl text-gray-500 leading-relaxed">{lead}</p>}
    </section>
  );
}

/* Page-level ambient background — faint technical grid + violet wash. */
export function BackdropDecor() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,10,10,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 90%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% -5%, rgba(139,92,246,0.12), transparent 70%)",
        }}
      />
    </>
  );
}

"use client";

/**
 * Shared chrome — dark, SORI-inspired. Black base (#0A0A0A), white text,
 * single accent = Pantone 265 (`brand` token in tailwind.config). Sticky
 * always-on header; footer carries a big CTA + a "system status" tech
 * detail. The navy wordmark is inverted to pure white for the dark base
 * (swap for a real white logo asset when available).
 */

import { useState } from "react";
import Link from "next/link";
import { Trophy, MapPin, ArrowUpRight, ArrowLeft, Menu, X } from "lucide-react";
import { HOME, NAV } from "./data";

export const EVENT_ICON = { trophy: Trophy, pin: MapPin } as const;

/* Single custom-indexed motion variant — preserves the easing curve. */
export const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

export const VIEWPORT = { once: true, margin: "-12% 0px" } as const;

/* White wordmark from the navy asset (brightness-0 invert → pure white). */
function Wordmark({ className = "h-7 md:h-8" }: { className?: string }) {
  return (
    <img
      src="/images/WIGTN_LOGO_NAVY.png"
      alt="WIGTN"
      className={`${className} w-auto [filter:brightness(0)_invert(1)]`}
    />
  );
}

export function IndexRule({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-xs text-brand-light">{n}</span>
      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0A0A0A]/70 backdrop-blur-md">
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={HOME} aria-label="WIGTN home" className="shrink-0">
          <Wordmark />
        </Link>

        {/* centered nav (desktop) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="rounded-full px-3.5 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* right side */}
        <div className="flex items-center gap-2">
          <a
            href="mailto:contact@wigtn.com"
            className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white hover:bg-white hover:text-[#0A0A0A] md:inline-flex"
          >
            Contact <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="rl-mobile-nav"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-white hover:text-white md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div id="rl-mobile-nav" className="border-t border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="mt-1">
              <a
                href="mailto:contact@wigtn.com"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg bg-brand px-3 py-2.5 font-medium text-white"
              >
                Contact <ArrowUpRight size={15} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      {/* Big CTA */}
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
        <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.05]">
          Let's build something.
        </h2>
        <a
          href="mailto:contact@wigtn.com"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-light hover:text-[#0A0A0A] transition-colors"
        >
          Talk to us <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Footer columns */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between gap-10">
          <div>
            <Wordmark className="h-9 md:h-11" />
            <p className="mt-4 max-w-xs text-sm text-zinc-500">
              Deep-tech research &amp; consulting. We prove it by what we publish.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600 mb-4">
                Explore
              </div>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-white transition-colors">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600 mb-4">
                Connect
              </div>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li>
                  <a href="mailto:contact@wigtn.com" className="hover:text-white transition-colors">
                    contact@wigtn.com
                  </a>
                </li>
                <li>
                  <a href="https://github.com/wigtn" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-end border-t border-white/10 pt-6">
          <span className="text-[11px] text-zinc-600">© 2026 WIGTN. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}

/* Sub-page shell — dark backdrop + header + footer. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-brand/30">
      <BackdropDecor />
      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

/* Sub-page hero — back link + eyebrow + display title + lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
  backHref = HOME,
  backLabel = "Back to home",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-10 md:pt-32 md:pb-14">
      <Link
        href={backHref}
        className="group mb-7 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
        {backLabel}
      </Link>
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-light mb-5">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
        {eyebrow}
      </div>
      <h1 className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold tracking-[-0.03em] leading-[1.05] max-w-3xl">
        {title}
      </h1>
      {lead && <p className="mt-5 max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed">{lead}</p>}
    </section>
  );
}

/* Page-level ambient background — a single soft brand glow on black. */
export function BackdropDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(55% 45% at 50% -5%, rgba(117,59,189,0.18), transparent 70%)",
      }}
    />
  );
}

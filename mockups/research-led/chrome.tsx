"use client";

/**
 * Shared chrome, theme-aware. Colors come from the semantic tokens defined in
 * tailwind.config.ts and resolved in app/globals.css: `paper*` surfaces,
 * `ink*` text, `line`/`rule` hairlines, and a single accent = Pantone 265
 * (`brand`; `accent` is the brand tone that stays legible on the page
 * surface in either theme). Sticky always-on header with the theme toggle;
 * footer carries links. The wordmark swaps navy ⇄ white with the theme.
 */

import { useState } from "react";
import Link from "next/link";
import { Trophy, MapPin, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme";
import { HOME, NAV, tx, type Locale } from "./data";
import { LangToggle } from "./LangToggle";
import { UI } from "./ui";

export const EVENT_ICON = { trophy: Trophy, pin: MapPin } as const;

/* Single custom-indexed motion variant; preserves the easing curve. */
export const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

export const VIEWPORT = { once: true, margin: "-12% 0px" } as const;

/* Both wordmarks ship in the markup and are swapped by CSS rather than state,
 * the correct one is visible on the very first paint, before React hydrates. */
function Wordmark({ className = "h-7 md:h-8" }: { className?: string }) {
  return (
    <>
      <img
        src="/images/WIGTN_LOGO_NAVY.png"
        alt="WIGTN"
        className={`${className} w-auto dark:hidden`}
      />
      {/* Exactly one of the two is `display: none` per theme, and hidden
          images aren't announced, so screen readers still get one "WIGTN". */}
      <img
        src="/images/WIGTN_LOGO_WHITE.png"
        alt="WIGTN"
        className={`${className} w-auto hidden dark:block`}
      />
    </>
  );
}

export function IndexRule({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-xs text-accent">{n}</span>
      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-ink-4">
        {label}
      </span>
      <span className="h-px flex-1 bg-rule" />
    </div>
  );
}

export function SiteHeader({ locale = "en" }: { locale?: Locale } = {}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/[0.07] bg-paper/80 backdrop-blur-md">
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={HOME} aria-label="WIGTN home" className="shrink-0">
          <Wordmark />
        </Link>

        {/* right-aligned nav (desktop) + theme toggle (all breakpoints) */}
        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-2 md:flex">
            {NAV.map((n) =>
              n.disabled ? (
                <li key={n.key}>
                  <span
                    aria-disabled="true"
                    className="cursor-default rounded-full px-3.5 py-1.5 text-sm text-ink-5 select-none"
                  >
                    {tx(UI.nav[n.key], locale)}
                  </span>
                </li>
              ) : (
                <li key={n.key}>
                  <Link
                    href={n.href(locale)}
                    className="rounded-full px-3.5 py-1.5 text-sm text-ink-3 transition-colors hover:bg-line/[0.04] hover:text-ink"
                  >
                    {tx(UI.nav[n.key], locale)}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <LangToggle locale={locale} />
          <ThemeToggle className="ml-1" />

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="rl-mobile-nav"
            className="grid h-9 w-9 place-items-center rounded-full border border-line/15 text-ink-2 transition-colors hover:border-ink hover:text-ink md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div id="rl-mobile-nav" className="border-t border-line/[0.07] bg-paper/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) =>
              n.disabled ? (
                <li key={n.key}>
                  <span
                    aria-disabled="true"
                    className="block cursor-default rounded-lg px-3 py-2.5 text-ink-5 select-none"
                  >
                    {tx(UI.nav[n.key], locale)}
                  </span>
                </li>
              ) : (
                <li key={n.key}>
                  <Link
                    href={n.href(locale)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-ink-2 transition-colors hover:bg-line/[0.04] hover:text-ink"
                  >
                    {tx(UI.nav[n.key], locale)}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export function SiteFooter({ locale = "en" }: { locale?: Locale } = {}) {
  return (
    <footer className="relative z-10 border-t border-line/[0.08] bg-paper-sunken text-ink">
      {/* Footer columns */}
      <div className="max-w-6xl mx-auto px-6 pb-10 pt-16 md:pt-20">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <Wordmark className="h-9 md:h-11" />
            <p className="mt-4 max-w-sm text-pretty text-sm text-ink-3">
              {tx(UI.footerTagline, locale)}
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-4 mb-4">
                {tx(UI.footerExplore, locale)}
              </div>
              <ul className="space-y-2.5 text-sm text-ink-3">
                {NAV.map((n) =>
                  n.disabled ? (
                    <li key={n.key} className="cursor-default text-ink-5 select-none">
                      {tx(UI.nav[n.key], locale)}
                    </li>
                  ) : (
                    <li key={n.key}>
                      <Link href={n.href(locale)} className="hover:text-ink transition-colors">
                        {tx(UI.nav[n.key], locale)}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-4 mb-4">
                {tx(UI.footerConnect, locale)}
              </div>
              <ul className="space-y-2.5 text-sm text-ink-3">
                <li>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@wigtn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink transition-colors"
                  >
                    contact@wigtn.com
                  </a>
                </li>
                <li>
                  <a href="https://github.com/wigtn" className="hover:text-ink transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://huggingface.co/Wigtn" className="hover:text-ink transition-colors">
                    Hugging Face
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-end border-t border-line/10 pt-6">
          <span className="text-[11px] text-ink-4">© 2026 WIGTN. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}

/* Sub-page shell: light backdrop + header + footer. */
/* `lang` lives here rather than on <html>: `output: "export"` renders one
 * root layout for every page, so splitting it per locale would mean route
 * groups and duplicate layouts. A subtree lang is what screen readers switch
 * voice on and what the :lang(ko) rule in globals.css selects. */
export function PageShell({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <div
      lang={locale}
      className="relative min-h-screen bg-paper text-ink font-sans antialiased selection:bg-brand/20"
    >
      <BackdropDecor />
      <SiteHeader locale={locale} />
      <main className="relative z-10">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}

/* Sub-page hero: display title + lead (no back link / eyebrow). */
export function PageHero({
  title,
  lead,
  titleClassName = "",
  leadClassName = "max-w-2xl",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  backHref?: string;
  backLabel?: string;
  titleClassName?: string;
  /* Overrides the lead's width cap — pass a wider max-w when a one-sentence
   * lead should stay on a single line at desktop widths. */
  leadClassName?: string;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-28 pb-10 md:pt-36 md:pb-14">
      <h1
        className={`font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold tracking-[-0.03em] leading-[1.05] max-w-3xl ${titleClassName}`}
      >
        {title}
      </h1>
      {lead && (
        <p className={`mt-5 text-lg md:text-xl text-ink-3 leading-relaxed ${leadClassName}`}>
          {lead}
        </p>
      )}
    </section>
  );
}

/* Page-level ambient background: a single soft brand glow. The gradient
 * itself lives in `--backdrop-glow` (app/globals.css) so dark can carry a
 * brighter, more saturated purple than the off-white needs. */
export function BackdropDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "var(--backdrop-glow)" }}
    />
  );
}

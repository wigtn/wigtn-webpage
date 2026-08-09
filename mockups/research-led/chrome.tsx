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
import { CONTACT_EMAIL, CONTACT_HREF, TAGLINE } from "@/lib/brand";
import { HOME, NAV } from "./data";

/* NavDropdown lived here while the nav carried a WIG-log menu with Tech and
 * Feed under it. The stories came back on-site as /blog, the menu had one
 * destination left, and a menu of one is a link, so the dropdown and the
 * `children` shape in NAV went together. It is in the git history if a nav
 * item ever needs children again. */

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

/* Keyword labels: scannable metadata, not boxed chips (no card aesthetic).
 * Shared by the homepage Services rows and the /team What-we-do rows, which
 * is why it lives here rather than in either page file. */
export function Tags({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-4"
        >
          <span aria-hidden className="h-1 w-1 rounded-full bg-brand/60" />
          {t}
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
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
            {/* Three shapes, tested in the order that settles them: disabled
                is a label whatever else the item carries, an absolute URL is
                an off-site plain anchor (today: Tech, to WIG-log), and the
                rest are client-side links. Same tab for the anchor, matching
                every other off-site link on the site. */}
            {NAV.map((n) =>
              n.disabled ? (
                <li key={n.label}>
                  <span
                    aria-disabled="true"
                    className="cursor-default rounded-full px-3.5 py-1.5 text-sm text-ink-5 select-none"
                  >
                    {n.label}
                  </span>
                </li>
              ) : n.href.startsWith("http") ? (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="rounded-full px-3.5 py-1.5 text-sm text-ink-3 transition-colors hover:bg-line/[0.04] hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ) : (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    className="rounded-full px-3.5 py-1.5 text-sm text-ink-3 transition-colors hover:bg-line/[0.04] hover:text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

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
            {/* Same three shapes as the desktop row; the off-site anchor also
                closes the sheet, so returning with the back button does not
                land on an open menu. */}
            {NAV.map((n) =>
              n.disabled ? (
                <li key={n.label}>
                  <span
                    aria-disabled="true"
                    className="block cursor-default rounded-lg px-3 py-2.5 text-ink-5 select-none"
                  >
                    {n.label}
                  </span>
                </li>
              ) : n.href.startsWith("http") ? (
                <li key={n.label}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-ink-2 transition-colors hover:bg-line/[0.04] hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ) : (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-ink-2 transition-colors hover:bg-line/[0.04] hover:text-ink"
                  >
                    {n.label}
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

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line/[0.08] bg-paper-sunken text-ink">
      {/* Footer columns */}
      <div className="max-w-6xl mx-auto px-6 pb-10 pt-16 md:pt-20">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <Wordmark className="h-9 md:h-11" />
            <p className="mt-4 max-w-sm text-pretty text-sm text-ink-3">
              {/* Break after the first sentence rather than wherever the
                  column happens to run out, so the two claims read as two
                  lines instead of one ragged paragraph. */}
              {TAGLINE}
              <br />
              Everything we learn, we share.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-4 mb-4">
                Explore
              </div>
              <ul className="space-y-2.5 text-sm text-ink-3">
                {NAV.map((n) =>
                  n.disabled ? (
                    <li key={n.label} className="cursor-default text-ink-5 select-none">
                      {n.label}
                    </li>
                  ) : n.href.startsWith("http") ? (
                    <li key={n.label}>
                      <a href={n.href} className="hover:text-ink transition-colors">
                        {n.label}
                      </a>
                    </li>
                  ) : (
                    <li key={n.label}>
                      <Link href={n.href} className="hover:text-ink transition-colors">
                        {n.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-4 mb-4">
                Connect
              </div>
              <ul className="space-y-2.5 text-sm text-ink-3">
                <li>
                  {/* mailto, so no target/rel: a new tab for a mail handler
                      leaves a blank one behind. See CONTACT_HREF in lib/brand. */}
                  <a href={CONTACT_HREF} className="hover:text-ink transition-colors">
                    {CONTACT_EMAIL}
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
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans antialiased selection:bg-brand/20">
      <BackdropDecor />
      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
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
  /* Not `string`. A lead is one sentence about the page and sometimes that
     sentence names somewhere else, which wants a link inside it rather than a
     second paragraph under it. /notices is the case: it says where the
     conference write-ups went. */
  lead?: React.ReactNode;
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

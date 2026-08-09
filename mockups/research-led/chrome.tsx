"use client";

/**
 * Shared chrome, theme-aware. Colors come from the semantic tokens defined in
 * tailwind.config.ts and resolved in app/globals.css: `paper*` surfaces,
 * `ink*` text, `line`/`rule` hairlines, and a single accent = Pantone 265
 * (`brand`; `accent` is the brand tone that stays legible on the page
 * surface in either theme). Sticky always-on header with the theme toggle;
 * footer carries links. The wordmark swaps navy ⇄ white with the theme.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Trophy, MapPin, Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme";
import { CONTACT_EMAIL, CONTACT_HREF, TAGLINE } from "@/lib/brand";
import { HOME, NAV, type NavChild } from "./data";

/**
 * Desktop dropdown for a NAV item with children (today: WIG-log).
 *
 * Opens on hover for a mouse and on click for everything else, and the same
 * `open` state drives both, so a keyboard user gets the menu a mouse user
 * gets rather than a hover-only affordance they cannot reach. The trigger is
 * a button, not a link: the parent has no destination of its own (see NAV in
 * data.ts), and a link that only opens a menu lies to a screen reader.
 *
 * Closing is handled in three places because there are three ways out:
 * Escape, a click elsewhere on the page, and focus leaving the group. The
 * pointer handlers sit on the wrapper rather than the button so the cursor can
 * travel from the tab down into the panel without crossing a gap that closes
 * it; the panel is flush against the trigger for the same reason.
 */
function NavDropdown({ item }: { item: { label: string; children: NavChild[] } }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <li
      ref={wrap}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition-colors hover:bg-line/[0.04] hover:text-ink ${
          open ? "bg-line/[0.04] text-ink" : "text-ink-3"
        }`}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={item.label}
          /* pt-2 rather than mt-2: the gap belongs inside the element the
             pointer is still over, so crossing it does not fire mouseleave. */
          className="absolute right-0 top-full z-50 w-64 pt-2"
        >
          <ul className="overflow-hidden rounded-xl border border-line/10 bg-paper/95 p-1.5 shadow-lg shadow-ink/5 backdrop-blur-md">
            {item.children.map((c) => (
              <li key={c.label}>
                <a
                  role="menuitem"
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-line/[0.05]"
                >
                  <span className="block text-sm font-medium text-ink">{c.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink-4">{c.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

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
                is a label whatever else the item carries, an item with
                children is a menu, and the rest are links. */}
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
              ) : n.children ? (
                <NavDropdown key={n.label} item={n} />
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
            {/* No nested disclosure here. The sheet is already the disclosure,
                and burying two links behind a second tap on a surface with
                room for four rows costs a tap and gains nothing. The parent is
                a heading over its children instead. */}
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
              ) : n.children ? (
                <li key={n.label}>
                  <span className="block px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-4">
                    {n.label}
                  </span>
                  <ul className="flex flex-col gap-1">
                    {n.children.map((c) => (
                      <li key={c.label}>
                        <a
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-ink-2 transition-colors hover:bg-line/[0.04] hover:text-ink"
                        >
                          {c.label}
                          <span className="mt-0.5 block text-xs text-ink-4">{c.note}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
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
                {/* Same flattening as the mobile sheet: a footer that hides
                    half a destination behind a hover menu is a footer that
                    does not carry the route, which is the one job it has. */}
                {NAV.map((n) =>
                  n.disabled ? (
                    <li key={n.label} className="cursor-default text-ink-5 select-none">
                      {n.label}
                    </li>
                  ) : n.children ? (
                    <li key={n.label}>
                      <span className="text-ink-4">{n.label}</span>
                      <ul className="mt-2 space-y-2 border-l border-line/10 pl-3">
                        {n.children.map((c) => (
                          <li key={c.label}>
                            <a href={c.href} className="hover:text-ink transition-colors">
                              {c.label}
                            </a>
                          </li>
                        ))}
                      </ul>
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

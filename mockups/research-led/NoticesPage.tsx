"use client";

/**
 * /notices, labelled "Notice" in the nav. It was /news, labelled "Updates",
 * until 2026-08-09; the old URL redirects here through RETIRED in data.ts.
 *
 * ONE FLAT LIST, AND ONLY RELEASES. This page held News and Releases as
 * stacked sections, then as two levels of tabs, while it was the site's
 * whole feed. The section split ended that: the events live on /story, so
 * what is left here is the release record, and a record wants a ledger, not
 * tabs. Every row is one shipped version: date, product, version, and the
 * one-line note sourced with that version's changelog. RELEASE_ROWS in
 * data.ts flattens the release posts' versions arrays into exactly this.
 *
 * An announcement with no version does not belong here, and that is a
 * decision rather than an omission. An Announcements list was tried above
 * the ledger and taken out again: this page answers what shipped, and the
 * awards and the acceptance answer what happened, which is Story's question.
 * They reach readers as the /story rows they were written for. Do not
 * reinstate the list, and do not put a versionless post in RELEASE_ROWS
 * either: the no-versions branch would file it with an empty version cell
 * and no type chip.
 *
 * A TYPE FILTER, NOT A SPLIT. Review (#78) asked whether the ledger should
 * break into per-product sections for readability; it stays one list, and
 * the chips between the hero and the list cut it down instead. Each release
 * post carries a releaseType (model / plugin / tool), the row inherits it,
 * and a chip shows only the types that actually have rows. Search joins the
 * chips when the release count earns it; the per-post metadata is the
 * groundwork for both.
 *
 * A row navigates to the product's release note, where the full changelog and
 * the post's prose live. It is a link, not a button: the old News rows opened
 * in place because their whole body was two paragraphs; a version row's
 * context is a page.
 *
 * PAGINATION, NOT TRUNCATION. The old lists cut at five with a count-naming
 * toggle, which fit a page where each product's changelog was its own list.
 * One flat ledger is long in a different way: the reader is either skimming
 * the top or looking for a specific line, and page numbers serve the second
 * reader without burying the first. Ten to a page, over the filtered list,
 * and changing the filter goes back to page one.
 *
 * Every row stays in the DOM whatever the filter and pager say; the inactive
 * ones carry `hidden`. A static export ships the first paint as its HTML, so
 * conditional rendering would put the first page in the file and leave the
 * rest reachable only by running the page. `hidden` keeps all of it in the
 * markup, out of the accessibility tree, and out of the way of a
 * find-in-page that should not match a row nobody is looking at. (The old
 * tab panels made the same choice; the reasoning survives the tabs.)
 *
 * THE HERO IS `PageHero`, the same one /team uses: the nav has no active
 * state, no `aria-current` and no pathname check, so the accent sentence is
 * what tells a reader arriving on a shared link which page they are on.
 */

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, PageHero } from "./chrome";
import { RELEASE_ROWS, STORY_INDEX, type ReleaseType } from "./data";

const PAGE_SIZE = 10;

/* Chip order is a display choice, not data: plugins first because they carry
 * most of the ledger's rows. A type with no rows never gets a chip, so the
 * row is future-proof against the union growing before the artifact ships. */
const TYPE_ORDER: ReleaseType[] = ["plugin", "tool", "model"];
const TYPE_LABEL: Record<ReleaseType, string> = {
  plugin: "Plugin",
  tool: "Tool",
  model: "Model",
};
const TYPES = TYPE_ORDER.filter((t) => RELEASE_ROWS.some((r) => r.type === t));

/* "WIGTN Plugin v1: Claude Code" carries the org name the sticky header
 * already shows; the row label drops it, the same way the old product tabs
 * did. The release page the row links to keeps the full title. */
const productLabel = (product: string) => product.replace(/^WIGTN /, "");

/* One shipped version. Desktop is a ledger line: date | product | version |
 * note, with the note clamped to one line because its full text lives on the
 * release page. Mobile stacks, and the version joins the date instead of
 * holding a line of its own. */
function ReleaseRowLine({
  row,
  hidden,
}: {
  row: (typeof RELEASE_ROWS)[number];
  hidden: boolean;
}) {
  return (
    <li hidden={hidden} className="border-b border-line/[0.08]">
      <Link
        href={row.href}
        className="group flex flex-col gap-1 py-5 transition-colors hover:bg-line/[0.03] sm:grid sm:grid-cols-[6rem_13rem_4.5rem_minmax(0,1fr)_1.25rem] sm:items-baseline sm:gap-x-6"
      >
        <span className="font-mono text-xs text-ink-5">
          {row.date}
          {row.version && <span className="sm:hidden"> · {row.version}</span>}
        </span>
        <span className="text-sm font-semibold text-ink transition-colors group-hover:text-accent">
          {productLabel(row.product)}
        </span>
        <span className="hidden font-mono text-xs text-ink-4 sm:block">{row.version}</span>
        <span className="line-clamp-2 text-sm leading-relaxed text-ink-3 sm:line-clamp-1">
          {row.note}
        </span>
        <ArrowUpRight
          size={14}
          className="hidden shrink-0 self-center text-ink-5 transition-colors group-hover:text-accent sm:block"
        />
      </Link>
    </li>
  );
}

/* The type chips. Buttons, not links: a filter is display state over one
 * list, and a route per type would be exported pages standing in for it. */
function TypeFilter({
  active,
  onSelect,
}: {
  active: "All" | ReleaseType;
  onSelect: (f: "All" | ReleaseType) => void;
}) {
  const options: ("All" | ReleaseType)[] = ["All", ...TYPES];
  return (
    <div role="group" aria-label="Filter by type" className="flex flex-wrap items-center gap-1 pb-4">
      {options.map((f) => {
        const on = f === active;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={on}
            onClick={() => onSelect(f)}
            className={`rounded-full px-3.5 py-1 text-[13px] transition-colors ${
              on
                ? "bg-brand font-medium text-white"
                : "text-ink-4 hover:bg-line/[0.05] hover:text-ink"
            }`}
          >
            {f === "All" ? "All" : TYPE_LABEL[f]}
          </button>
        );
      })}
    </div>
  );
}

/* The numbered pager. Buttons, not links, for the same reason as the chips. */
function Pager({
  pageCount,
  page,
  onSelect,
}: {
  pageCount: number;
  page: number;
  onSelect: (p: number) => void;
}) {
  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-1">
      {Array.from({ length: pageCount }, (_, p) => (
        <span key={p} className="flex items-center gap-1">
          {p > 0 && (
            <span aria-hidden className="text-xs text-ink-5">
              |
            </span>
          )}
          <button
            type="button"
            aria-label={`Page ${p + 1}`}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onSelect(p)}
            className={`rounded-full px-3 py-1 font-mono text-[13px] transition-colors ${
              p === page
                ? "bg-brand font-medium text-white"
                : "text-ink-4 hover:bg-line/[0.05] hover:text-ink"
            }`}
          >
            {p + 1}
          </button>
        </span>
      ))}
    </nav>
  );
}

export function NoticesPage() {
  const [filter, setFilter] = useState<"All" | ReleaseType>("All");
  const [page, setPage] = useState(0);

  const filtered =
    filter === "All" ? RELEASE_ROWS : RELEASE_ROWS.filter((r) => r.type === filter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  /* Clamped rather than reset in an effect: the only way page can exceed the
   * count is a filter change, and the chip handler already resets it. The
   * clamp is the belt for that suspender. */
  const current = Math.min(page, pageCount - 1);
  const visible = new Set(filtered.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE));

  return (
    <PageShell>
      <PageHero
        title="What shipped."
        lead={
          <>
            Every version of everything we have released, dated from the
            registry that serves it. The events, and the stories behind them,
            are on{" "}
            <Link
              href={STORY_INDEX}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Story
            </Link>
            .
          </>
        }
        titleClassName="text-accent"
        leadClassName="max-w-3xl"
      />

      <div className="mx-auto max-w-5xl px-6 pb-28 md:pb-40">
        <TypeFilter
          active={filter}
          onSelect={(f) => {
            setFilter(f);
            setPage(0);
          }}
        />
        {/* The chips and the pager both change what is on screen without
            moving focus or the page, so a screen reader is given the count in
            words. `sr-only` rather than a visible line: a sighted reader can
            see the list change, and a running total above a ledger this short
            reads as chrome. */}
        <p aria-live="polite" className="sr-only">
          {`Showing ${visible.size} of ${filtered.length} releases`}
          {filter === "All" ? "" : `, filtered to ${TYPE_LABEL[filter]}`}
          {pageCount > 1 ? `, page ${current + 1} of ${pageCount}` : ""}
        </p>
        <ul className="border-t border-line/[0.08]">
          {RELEASE_ROWS.map((row) => (
            <ReleaseRowLine
              key={`${row.product}@${row.version ?? row.date}`}
              row={row}
              hidden={!visible.has(row)}
            />
          ))}
        </ul>
        {pageCount > 1 && <Pager pageCount={pageCount} page={current} onSelect={setPage} />}
      </div>
    </PageShell>
  );
}

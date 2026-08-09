"use client";

/**
 * /notices, labelled "Notice" in the nav. It was /news, labelled "Updates",
 * until 2026-08-09; the old URL redirects here through RETIRED in data.ts.
 *
 * ONE FLAT LIST. This page held News and Releases as stacked sections, then
 * as two levels of tabs, while it was the site's whole feed. The section
 * split ended that: the event news rows live on /story and the long accounts
 * on /blog, so what is left here is the release record, and a record wants a
 * ledger, not tabs. Every row is one shipped version: date, product, version,
 * and the one-line note sourced with that version's changelog. RELEASE_ROWS
 * in data.ts flattens the release posts' versions arrays into exactly this.
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
 * reader without burying the first. Ten to a page.
 *
 * Every page's rows stay in the DOM and the inactive pages carry `hidden`,
 * rather than the active page being the only thing rendered. A static export
 * ships the first paint as its HTML, so conditional rendering would put page
 * one in the file and leave the rest reachable only by running the page.
 * `hidden` keeps every row in the markup, out of the accessibility tree, and
 * out of the way of a find-in-page that should not match a page nobody is
 * looking at. (The old tab panels made the same choice; the reasoning
 * survives the tabs.)
 *
 * THE HERO IS `PageHero`, the same one /team uses: the nav has no active
 * state, no `aria-current` and no pathname check, so the accent sentence is
 * what tells a reader arriving on a shared link which page they are on.
 */

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, PageHero } from "./chrome";
import { BLOG_INDEX, RELEASE_ROWS, STORY } from "./data";

const PAGE_SIZE = 10;

/* "WIGTN Plugin v1: Claude Code" carries the org name the sticky header
 * already shows; the row label drops it, the same way the old product tabs
 * did. The release page the row links to keeps the full title. */
const productLabel = (product: string) => product.replace(/^WIGTN /, "");

/* One shipped version. Desktop is a ledger line: date | product | version |
 * note, with the note clamped to one line because its full text lives on the
 * release page. Mobile stacks, and the version joins the date instead of
 * holding a line of its own. */
function ReleaseRowLine({ row }: { row: (typeof RELEASE_ROWS)[number] }) {
  return (
    <li className="border-b border-line/[0.08]">
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

/* The numbered pager. Buttons, not links: a page here is a filter over one
 * list, and a route per page would be exported files standing in for a
 * scroll position. */
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
  const pageCount = Math.ceil(RELEASE_ROWS.length / PAGE_SIZE);
  const [page, setPage] = useState(0);

  return (
    <PageShell>
      <PageHero
        title="What shipped."
        lead={
          <>
            Every version of everything we have released, dated from the
            registry that serves it. The event news is on{" "}
            <Link
              href={STORY}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Story
            </Link>
            , and the long accounts are on{" "}
            <Link
              href={BLOG_INDEX}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              the blog
            </Link>
            .
          </>
        }
        titleClassName="text-accent"
        leadClassName="max-w-3xl"
      />

      <div className="mx-auto max-w-5xl px-6 pb-28 md:pb-40">
        {Array.from({ length: pageCount }, (_, p) => (
          <ul key={p} hidden={p !== page} className="border-t border-line/[0.08]">
            {RELEASE_ROWS.slice(p * PAGE_SIZE, (p + 1) * PAGE_SIZE).map((row) => (
              <ReleaseRowLine key={`${row.product}@${row.version ?? row.date}`} row={row} />
            ))}
          </ul>
        ))}
        {pageCount > 1 && <Pager pageCount={pageCount} page={page} onSelect={setPage} />}
      </div>
    </PageShell>
  );
}

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
 * A QUERY BAR, NOT A CHIP ROW. Review (#78) asked whether the ledger should
 * break into per-product sections for readability; it stays one list and the
 * bar above it cuts the list down instead. The bar was four always-on chips
 * (All / Plugin / Tool / Model) and is now search + applied filters +
 * "Add filter", the shape a console uses for a table it expects to grow.
 *
 * TWO CONTROLS, TWO JOBS, AND THEY DO NOT OVERLAP.
 *
 *   Filter answers "what kind of thing is this", and the only answer the
 *   data has is `releaseType`: model, plugin, tool. It is metadata, it is a
 *   closed set, and a menu is the right shape for a closed set.
 *
 *   Search answers "which project", and a project is a name. It matches the
 *   product name and nothing else.
 *
 * A product filter was tried here and taken out. It made the two controls
 * answer the same question from different ends, and it let a reader build
 * Plugin + WIGSS, which is empty because WIGSS is a tool: a combination the
 * UI offered, the reader could not have predicted, and no data can satisfy.
 * One filter dimension has no cross-dimension case, so it cannot happen. If
 * a second dimension is ever added, it needs an answer to that first.
 *
 * Within the one dimension the filters are OR, which is what picking Plugin
 * and Tool means and is the only reading available. No "All" pill: no
 * filters is all, and a pill for the absence of a filter is a control that
 * does nothing. The count is live, because a filtered list with no count
 * makes the reader wonder what they are not seeing.
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
 * and anything that changes the filtered set goes back to page one.
 *
 * Every row stays in the DOM whatever the bar and pager say; the inactive
 * ones carry `hidden`. A static export ships the first paint as its HTML, so
 * conditional rendering would put the first page in the file and leave the
 * rest reachable only by running the page. `hidden` keeps all of it in the
 * markup, out of the accessibility tree, and out of the way of a
 * find-in-page that should not match a row nobody is looking at. (The old
 * tab panels made the same choice; the reasoning survives the tabs.)
 *
 * THE EMPTY STATE IS NOT DECORATION ANY MORE. With chips alone it was
 * unreachable, because a chip only existed for a type that had rows. A search
 * box reaches it on the first typo, so the list says so rather than showing
 * a bare hairline.
 *
 * THE HERO IS `PageHero`, the same one /team uses: the nav has no active
 * state, no `aria-current` and no pathname check, so the accent sentence is
 * what tells a reader arriving on a shared link which page they are on.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Plus, Search, X } from "lucide-react";
import { PageShell, PageHero } from "./chrome";
import { RELEASE_ROWS, STORY_INDEX, type ReleaseType } from "./data";

const PAGE_SIZE = 10;

/* Menu order is a display choice, not data: plugins first because they carry
 * most of the ledger's rows. A value with no rows never gets an option, so
 * this is future-proof against the union growing before the artifact ships. */
const TYPE_ORDER: ReleaseType[] = ["plugin", "tool", "model"];
const TYPE_LABEL: Record<ReleaseType, string> = {
  plugin: "Plugin",
  tool: "Tool",
  model: "Model",
};

/* "WIGTN Plugin v1: Claude Code" carries the org name the sticky header
 * already shows; the row label drops it, the same way the old product tabs
 * did. The release page the row links to keeps the full title. */
const productLabel = (product: string) => product.replace(/^WIGTN /, "");

/* The filter options, derived from the rows rather than declared, so a type
 * that has no releases yet never offers a filter that returns nothing. */
const TYPE_OPTIONS: ReleaseType[] = TYPE_ORDER.filter((t) =>
  RELEASE_ROWS.some((r) => r.type === t),
);

/* What search matches: the product name, which is what a project is called.
 * Not the note, and not the version. Both were in here for one commit and
 * came out: they turn a name box into a full-text box, so "release" matches
 * half the ledger through changelog prose and the reader cannot tell why.
 * The date was never in it, for the same reason at a larger scale. */
const searchable = (row: (typeof RELEASE_ROWS)[number]) => row.product.toLowerCase();

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

/* An applied filter. The pill is a span with a button in it rather than one
 * button doing both jobs: the label is not a control, and a reader who wants
 * the filter gone is aiming at the cross. */
function TypePill({ type, onRemove }: { type: ReleaseType; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-line/[0.07] py-1 pl-2.5 pr-1.5 text-[13px] text-ink">
      <Check size={13} className="shrink-0 text-accent" aria-hidden />
      {TYPE_LABEL[type]}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${TYPE_LABEL[type]}`}
        className="grid h-4 w-4 place-items-center rounded-full text-ink-4 transition-colors hover:bg-line/[0.12] hover:text-ink"
      >
        <X size={12} />
      </button>
    </span>
  );
}

/* The Add filter menu. One flat list, because there is one dimension: a
 * "Type" heading over the only group would name it rather than group it. An
 * option already applied is left out rather than shown ticked, since it is
 * in the bar two inches away as a pill. */
function AddFilter({
  applied,
  onAdd,
}: {
  applied: ReleaseType[];
  onAdd: (t: ReleaseType) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  /* Escape and click-away, the two exits a popover needs. Mousedown rather
   * than click so a drag that starts inside and ends outside does not close
   * it, which is how a reader selecting text in the menu loses their place. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const options = TYPE_OPTIONS.filter((t) => !applied.includes(t));

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={options.length === 0}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line/25 px-3 py-1 text-[13px] text-ink-4 transition-colors hover:border-line/40 hover:text-ink disabled:cursor-default disabled:opacity-40 disabled:hover:border-line/25 disabled:hover:text-ink-4"
      >
        <Plus size={13} />
        Add filter
      </button>

      {open && options.length > 0 && (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%+6px)] z-30 w-44 overflow-hidden rounded-xl border border-line/12 bg-paper py-1.5 shadow-xl shadow-black/20"
        >
          {options.map((t) => (
            <button
              key={t}
              type="button"
              role="menuitem"
              onClick={() => {
                onAdd(t);
                setOpen(false);
              }}
              className="block w-full px-3 py-1.5 text-left text-sm text-ink-2 transition-colors hover:bg-line/[0.06] hover:text-ink"
            >
              {TYPE_LABEL[t]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* The numbered pager. Buttons, not links: a route per page would be exported
 * pages standing in for display state. */
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
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<ReleaseType[]>([]);
  const [page, setPage] = useState(0);

  /* The kind narrows, the name narrows, and they compose: Plugin plus
   * "codex" is the Codex plugin's history.
   *
   * Typing "wigss" with Plugin applied still returns nothing, because WIGSS
   * is a tool. The difference from the product filter is where the empty set
   * comes from: that one was built out of two menus the bar itself offered,
   * so the UI proposed a combination it could not satisfy. This one is a
   * name the reader typed against a kind they picked, which is their own
   * question, and the empty state is the answer to it. */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RELEASE_ROWS.filter(
      (r) =>
        (types.length === 0 || (r.type !== undefined && types.includes(r.type))) &&
        (q === "" || searchable(r).includes(q)),
    );
  }, [query, types]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  /* Clamped rather than reset in an effect: every control that can shrink the
   * filtered set already resets the page, and the clamp is the belt for that
   * suspender. Typing is the one that would otherwise strand a reader on page
   * 2 of a set that just became one page long. */
  const current = Math.min(page, pageCount - 1);
  const visible = new Set(filtered.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE));

  const addType = (t: ReleaseType) => {
    setTypes((prev) => (prev.includes(t) ? prev : [...prev, t]));
    setPage(0);
  };
  const removeType = (t: ReleaseType) => {
    setTypes((prev) => prev.filter((x) => x !== t));
    setPage(0);
  };

  const narrowed = query.trim() !== "" || types.length > 0;

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
        {/* The bar. One row at desktop, wrapping at narrow widths, with the
            count pushed to the end so it sits opposite the search box and
            reads as the answer to it. */}
        <div className="flex flex-wrap items-center gap-2 pb-4">
          <div className="relative">
            <Search
              size={14}
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-5"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search by project"
              aria-label="Search releases by project name"
              className="w-56 rounded-full border border-line/15 bg-transparent py-1.5 pl-8 pr-3 text-[13px] text-ink transition-colors placeholder:text-ink-5 hover:border-line/25 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Pills in TYPE_ORDER, not in the order they were clicked: the bar
              should look the same for the same filter however it was built. */}
          {TYPE_OPTIONS.filter((t) => types.includes(t)).map((t) => (
            <TypePill key={t} type={t} onRemove={() => removeType(t)} />
          ))}

          <AddFilter applied={types} onAdd={addType} />

          {narrowed && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTypes([]);
                setPage(0);
              }}
              className="text-[13px] text-ink-5 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Clear
            </button>
          )}

          {/* aria-live on the count alone: it is already the sentence a
              screen reader needs when a pill or a keystroke changes the list,
              and a second announcement elsewhere would talk over it. */}
          <span aria-live="polite" className="ml-auto text-[13px] text-ink-4">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
            {pageCount > 1 && (
              <span className="text-ink-5">
                {" "}
                · page {current + 1} of {pageCount}
              </span>
            )}
          </span>
        </div>

        <ul className="border-t border-line/[0.08]">
          {RELEASE_ROWS.map((row) => (
            <ReleaseRowLine
              key={`${row.product}@${row.version ?? row.date}`}
              row={row}
              hidden={!visible.has(row)}
            />
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-4">
            No release matches that. Search takes a project name.
          </p>
        )}

        {pageCount > 1 && <Pager pageCount={pageCount} page={current} onSelect={setPage} />}
      </div>
    </PageShell>
  );
}

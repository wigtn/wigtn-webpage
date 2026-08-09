"use client";

/**
 * /notices, labelled "Notices" in the nav. It was /news, labelled "Updates",
 * until 2026-08-09; the old URL redirects here through RETIRED in data.ts.
 *
 * TWO LEVELS OF TABS. News and Releases at the top, and inside Releases one
 * tab per product. What separates the top two has not changed: a release is
 * about a thing you can install and carries a version; an announcement is
 * about the team, and does not.
 *
 * The two were stacked sections until 2026-08-09, and stacking is what stopped
 * working. A release post is one post per product, but a product has a version
 * history, and nine plugin releases under a list of four products is a page
 * where the reader scrolls past three products to reach the one they came for.
 * Tabs make the product the unit of navigation, which is what it already was
 * in the reader's head.
 *
 * A product panel is a changelog, not a list of posts: the product's name, its
 * summary, a link to its release note, and every version it has shipped. The
 * versions come from the registry that serves each product, and two of the
 * four publish no per-version text, so those panels are versions and dates and
 * say so. See `versions` in data.ts.
 *
 * News uses a dated row, no image. A package page screenshot is not a
 * photograph and does not earn a card, and an announcement that needs a
 * photograph is probably a feed post.
 *
 * THE HERO IS `PageHero`, THE SAME ONE /team USES, and the distinction is
 * worth keeping because this page has had both. What it carried until
 * 2026-08-09 was a masthead: "WIGTN NOTICES", centred, uppercase, tracked
 * wide, which is a second wordmark two inches under the one in the sticky
 * header. That went, and for a few hours the page had no visible title at all,
 * only an `sr-only` h1.
 *
 * No title at all was worse, for a reason that is not about this page: the nav
 * has no active state, no `aria-current` and no pathname check, so nothing
 * except the browser tab tells a reader arriving on a shared link which page
 * they are on. /team answers that with a sentence in the accent, and this page
 * now answers it the same way. If the nav ever grows an active state, this is
 * still a lead worth having, but the argument for it gets weaker.
 *
 * The title is the site's own framing of itself, from AGENTS.md: wigtn.com
 * answers "what did we do", WIG-log answers "what did we find". The lead is
 * where the pointer to the WIG-log feed lives, which is why `PageHero.lead`
 * takes a node rather than a string.
 */

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";
import { NEWSROOM_FEED, articleHref, TECH_FEED_INDEX, type Article, type Block } from "./data";

const isRelease = (a: Article) => a.newsTopic === "release";

/* How many rows a list shows before it asks. Five is the count at which the
 * plugin changelog stops being a list and starts being a page: nine versions
 * under a tab the reader opened to see one product pushes the next product's
 * tab off the top of the viewport.
 *
 * One number for every list on the page, rather than one per list. A News list
 * that cut at three and a version list that cut at ten would make the cut look
 * like a judgement about each list's contents; it is not, it is the point at
 * which any list here is long enough to skim past. */
const COLLAPSED_ROWS = 5;

/* The control under a truncated list.
 *
 * It says how many rows are hidden, not "Show more". A reader deciding whether
 * to expand is deciding whether four more rows are worth it, and the count is
 * the whole of that decision. It collapses again, because a list that can only
 * grow leaves the reader scrolling back to a tab row that has moved.
 *
 * A button, and never a link: nothing here navigates. */
function MoreToggle({
  expanded,
  hiddenCount,
  noun,
  onToggle,
}: {
  expanded: boolean;
  hiddenCount: number;
  noun: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="w-full border-b border-line/[0.06] py-4 text-sm font-medium text-accent transition-colors hover:bg-line/[0.03] hover:text-ink"
    >
      {expanded ? "Show less" : `Show ${hiddenCount} more ${noun}${hiddenCount === 1 ? "" : "s"}`}
    </button>
  );
}

/**
 * One row of tabs.
 *
 * Every panel stays in the DOM and the inactive ones carry `hidden`, rather
 * than the active one being the only thing rendered. A static export ships the
 * first paint as its HTML, so conditional rendering would put one tab's
 * contents in the file and leave the rest reachable only by running the page.
 * `hidden` keeps all of it in the markup, out of the accessibility tree, and
 * out of the way of a find-in-page that should not match a panel nobody is
 * looking at.
 *
 * Buttons, not links. A tab that changes the URL is a route, and a route per
 * product would be five more exported pages standing in for a filter.
 */
function Tabs({
  labels,
  active,
  onSelect,
  size = "lg",
}: {
  labels: string[];
  active: string;
  onSelect: (label: string) => void;
  size?: "lg" | "sm";
}) {
  return (
    <div
      role="tablist"
      className={`flex flex-wrap items-center ${size === "lg" ? "gap-1" : "gap-0.5"}`}
    >
      {labels.map((label) => {
        const on = label === active;
        return (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onSelect(label)}
            className={
              size === "lg"
                ? `rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    on ? "bg-brand text-white" : "text-ink-3 hover:bg-line/[0.05] hover:text-ink"
                  }`
                : `rounded-full px-3 py-1 text-[13px] transition-colors ${
                    on
                      ? "bg-line/[0.08] font-medium text-ink"
                      : "text-ink-4 hover:bg-line/[0.04] hover:text-ink-2"
                  }`
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* The changelog under a product tab: every version that product has shipped,
 * newest first, from the registry that serves it.
 *
 * The `noNotes` branch is not dead code waiting for a use. Two of the four
 * products tag releases with an empty body, and their lines are currently
 * written from commit history instead; if a product ever ships versions with
 * neither, this is what keeps the panel honest rather than blank. Which source
 * each list used is in that post's header. See `versions` in data.ts. */
function Changelog({ a }: { a: Article }) {
  const versions = a.versions ?? [];
  const noNotes = versions.length > 0 && versions.every((v) => !v.note);
  const [expanded, setExpanded] = useState(false);
  /* Per product, and it resets when the reader switches tabs and comes back.
     Expanding the plugin history is a decision about the plugin, and carrying
     it over to WIGSS would open a list nobody asked to see. */
  const shown = expanded ? versions : versions.slice(0, COLLAPSED_ROWS);

  return (
    <div className="pb-24 pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-2xl font-bold tracking-tight text-ink">{a.title}</h3>
        <Link
          href={articleHref(a.slug)}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-ink"
        >
          Read the release note
          <ArrowUpRight aria-hidden size={14} />
        </Link>
      </div>
      <p className="mt-3 max-w-3xl text-ink-3">{a.summary}</p>

      {versions.length === 0 ? (
        /* WigtnOCR. Its HuggingFace repo carries no tags, so there is no
           version history to draw and the post is the whole record. */
        <p className="mt-8 border-t border-line/[0.08] pt-6 text-sm text-ink-4">
          This one ships as a single artifact and carries no version tags, so there is no history
          to list. The release note is the record.
        </p>
      ) : (
        <>
          {noNotes && (
            <p className="mt-8 text-sm text-ink-4">
              These releases are tagged without notes, so the list is versions and dates. What
              changed in each is in the repository.
            </p>
          )}
          <ul className={`border-t border-line/[0.08] ${noNotes ? "mt-4" : "mt-8"}`}>
            {shown.map((v) => (
              <li
                key={v.version}
                className="grid gap-1 border-b border-line/[0.06] py-4 md:grid-cols-[7.5rem_1fr] md:gap-8"
              >
                <div className="font-mono text-sm text-ink-2 md:pt-0.5">
                  <span>{v.version}</span>
                  <span className="ml-2 text-ink-5 md:ml-0 md:mt-1 md:block">{v.date}</span>
                </div>
                {v.note && <p className="max-w-3xl text-sm leading-relaxed text-ink-3">{v.note}</p>}
              </li>
            ))}
          </ul>
          {versions.length > COLLAPSED_ROWS && (
            <MoreToggle
              expanded={expanded}
              hiddenCount={versions.length - COLLAPSED_ROWS}
              noun="version"
              onToggle={() => setExpanded((v) => !v)}
            />
          )}
        </>
      )}
    </div>
  );
}

/* The News panel. Its own component only so the expand state has somewhere to
 * live that is not the page: `hidden` keeps this mounted while the reader is
 * on Releases, so state here survives a tab switch, which is what a reader who
 * expanded the list and went to look at a version number expects. */
function NewsList({ items }: { items: Article[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(0, COLLAPSED_ROWS);

  return (
    <div className="pb-24">
      {/* The list draws its own top hairline, so the first row is closed on
          both sides like every row under it. */}
      <ul className="mt-8 border-t border-line/[0.08]">
        {shown.map((a, i) => (
          <UpdateRow key={a.slug} a={a} i={i} />
        ))}
      </ul>
      {items.length > COLLAPSED_ROWS && (
        <MoreToggle
          expanded={expanded}
          hiddenCount={items.length - COLLAPSED_ROWS}
          noun="post"
          onToggle={() => setExpanded((v) => !v)}
        />
      )}
    </div>
  );
}

export function NoticesPage() {
  const news = NEWSROOM_FEED.filter((a) => !isRelease(a));
  const releases = NEWSROOM_FEED.filter(isRelease);

  /* Product tabs come from the release posts themselves, in the order they
   * already sit in ARTICLES, so adding a product is adding a post and nothing
   * else. The label is the post's title with the "WIGTN " prefix dropped: the
   * tabs sit on wigtn.com and repeating the company name four times across one
   * row says nothing a reader does not already know. */
  const productLabel = (a: Article) => a.title.replace(/^WIGTN /, "");

  const [tab, setTab] = useState<"News" | "Releases">("News");
  const [product, setProduct] = useState(() =>
    releases.length > 0 ? productLabel(releases[0]) : "",
  );

  return (
    <PageShell>
      {/* The same hero /team has, and deliberately not the one this page used
          to carry. That was a centred, wide-tracked "WIGTN NOTICES" masthead:
          a second wordmark two inches under the one in the sticky header. This
          is a sentence, left-aligned, in the accent, which is what the other
          sub-page does and what the nav cannot do for either of them. The nav
          has no active state, so without this a reader arriving on a shared
          link is told which page they are on by the browser tab and nothing
          else. */}
      <PageHero
        title="What we did."
        lead={
          <>
            Announcements and releases, dated. Conference and hackathon write-ups are in the{" "}
            <a
              href={TECH_FEED_INDEX}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              WIG-log feed
            </a>
            , next to the technical reports.
          </>
        }
        titleClassName="text-accent"
        leadClassName="max-w-3xl"
      />

      <div className="mx-auto max-w-5xl px-6">
        <div className="border-b border-line/[0.08] pb-4">
          <Tabs
            labels={["News", "Releases"]}
            active={tab}
            onSelect={(l) => setTab(l as "News" | "Releases")}
          />
        </div>

        <div hidden={tab !== "News"}>
          <NewsList items={news} />
        </div>

        <div hidden={tab !== "Releases"}>
          {/* Second level, and deliberately quieter than the first. One row of
              pills above another in the same weight reads as eight peers
              rather than two inside one; the product row is smaller, unfilled,
              and sits under the rule that closes the row above it. */}
          <div className="pt-5">
            <Tabs
              labels={releases.map(productLabel)}
              active={product}
              onSelect={setProduct}
              size="sm"
            />
          </div>
          {releases.map((a) => (
            <div key={a.slug} hidden={productLabel(a) !== product}>
              <Changelog a={a} />
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

/* The body of a note, rendered inside an open row.
 *
 * A deliberately small subset of `Block`, and it does not fall back silently.
 * A note is text: paragraphs, and a list if it is genuinely enumerating. The
 * cases left out are `image` and `gallery`, and they are left out because a
 * post with a photograph is not a note. If one turns up here, the row throws
 * at build rather than dropping the picture on the floor, which is how a
 * missing figure gets noticed on a static export.
 *
 * `quote` renders as a command block on the article page and is included so a
 * note carrying one command does not lose it. */
function NoteBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        switch (block.t) {
          case "p":
            return (
              <p key={i} className="text-sm leading-relaxed text-ink-3">
                {block.text}
              </p>
            );
          case "h":
            return (
              <h4 key={i} className="pt-2 text-sm font-semibold text-ink">
                {block.text}
              </h4>
            );
          case "list":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-3">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <p
                key={i}
                className="overflow-x-auto rounded-sm bg-line/[0.05] px-3 py-2 font-mono text-xs text-ink-2"
              >
                {block.text}
              </p>
            );
          default:
            throw new Error(
              `A notice row cannot render a "${block.t}" block. A post with a picture is not a note: give it a page, or move the picture to the WIG-log feed post it belongs to.`,
            );
        }
      })}
    </div>
  );
}

/* One row per item: date and version in the left rail, the title on the right,
 * and the summary in a panel that opens under it. No kicker repeating "News"
 * under a tab that says News.
 *
 * IT OPENS IN PLACE RATHER THAN NAVIGATING, which is the whole change here.
 * These posts are two or three sentences; a row that sends the reader to a
 * page to read one paragraph and come back charges two navigations for a
 * sentence. The panel carries that sentence and the post's own links, and the
 * page is still there, one link inside the panel, for anyone who wants the URL.
 *
 * The version cell is conditional, which is what lets announcements share this
 * component. A release has one and an announcement does not, so the left rail
 * is a date alone for news items and the rows still line up.
 *
 * The version used to live inside the title, back when a title was a sentence
 * about one release. Titles are product names now, and two of these products
 * number twice: "WIGTN Plugin v2: Codex" is our second plugin and v0.3.0 is
 * the version of it that shipped. Separating them puts each number where it
 * can be read on its own, and stacks the four versions into a column. */
function UpdateRow({ a, i }: { a: Article; i: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `notice-${a.slug}`;

  return (
    <motion.li
      variants={rise}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="border-b border-line/[0.06]"
    >
      {/* The whole row is the control, and it is a button rather than a link.
          A row that opens in place is not navigation, and calling it a link
          would promise a reader using a keyboard or a screen reader that
          Enter takes them somewhere. The link to the post lives inside the
          panel, where it is one destination among the article's own. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full gap-1 py-6 text-left md:grid-cols-[7.5rem_1fr] md:gap-8"
      >
        <div className="font-mono text-sm text-ink-5 md:pt-1">
          <span>{a.date}</span>
          {a.version && (
            <span className="ml-2 text-ink-5/70 md:ml-0 md:mt-1 md:block">{a.version}</span>
          )}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink text-balance transition-colors group-hover:text-accent">
            {a.title}
          </h3>
          {/* The only thing that says this row opens. A chevron that turns is
              cheaper than a word, and the row has no other affordance now that
              the summary has moved inside. */}
          <ChevronDown
            aria-hidden
            size={16}
            className={`mt-1 shrink-0 text-ink-5 transition-transform group-hover:text-accent ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* The post itself, not a teaser for it. These are three paragraphs at
          most, so the panel carries the whole body and the reader never leaves
          the page to read one. The only links out are the article's own, which
          go off-site: the ACL Anthology, a repository, a write-up on WIG-log.
          There is no "read the post" link, because there is nothing left on
          that page that is not already open here. */}
      {/* The element carrying `hidden` carries no display utility, and the
          grid moves to a child. `hidden` is `display: none` from the user
          agent stylesheet, so any `display` rule in a class beats it: with
          `md:grid` on this element the panel stayed open at every width above
          `md` and the button did nothing a reader could see. */}
      <div id={panelId} hidden={!open}>
        <div className="pb-6 md:grid md:grid-cols-[7.5rem_1fr] md:gap-8">
          <div />
          <div className="max-w-3xl">
            <NoteBody blocks={a.body} />
            {a.links && a.links.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {a.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-ink"
                  >
                    {l.label}
                    <ArrowUpRight aria-hidden size={13} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

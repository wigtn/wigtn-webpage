/**
 * Update: WIGTN Coding v0.1.14 - announcement.
 *
 * Follows updates/_template/announcement/STRUCTURE.md: lede -> get it -> what
 * shipped -> read the report.
 *
 * THIS POST USED TO BE A FULL RELEASE NOTE, with a "why it exists" section, a
 * "the numbers" section and a long limitations list. Those moved to the
 * tech-report site under the split described in AGENTS.md: this site says what
 * the team did, the report site says what the work found. Do not restore them
 * here. If a fact seems missing, it is one link away, and two copies of one
 * explanation drift apart in a month.
 *
 * Sources, in order of authority:
 *  - The public plugin repository, https://github.com/wigtn/wigtn-plugins, read
 *    at commit 3bd447c, the v0.1.14 version bump of 14 July 2026. Every count is
 *    from `.claude-plugin/marketplace.json` at that commit, cross-checked
 *    against the file tree at the same commit: 13 files under agents/, 5 top
 *    level command files, 6 skill directories, 20 files under
 *    skills/design-system-reference/styles/.
 *  - The commit messages for v0.1.10 (04c90dd) through v0.1.14 (3bd447c).
 *  - The WIGTN Coding tech report, which is where the limitations (L01-L03) and
 *    the line that the benchmark "exists as a protocol, not yet as a result"
 *    now live.
 *  - The two existing data.ts entries for this project (`wigtn-coding` and
 *    `wigtn-coding-release`).
 *
 * The conflicting counts, resolved rather than quietly picked. The `wigtn-coding`
 * report entry in data.ts says 13 agents / 6 skills / 20 design references; the
 * `wigtn-coding-release` entry says 12 agents / 3 skills / 17 design styles.
 * The first is correct for v0.1.14 and matches both the manifest and the tree.
 * The second traces to .github/WIGTN_META.md, an SEO description string reading
 * "12 agents, 3 commands, 17 design styles" that has been stale since the June
 * 2026 rename and is still stale on main; the website also transcribed its
 * "3 commands" as "3 skills". This post carries the v0.1.14 numbers and names
 * the version they belong to. Do not restore the 12/3/17 line.
 *
 * The GitHub link was changed, and deliberately. The old inline entry pointed
 * at wigtn-plugins-with-claude-code, which was renamed to wigtn-plugins on
 * 2 June 2026 (commit a05f651, a BREAKING CHANGE that also moved the plugin id
 * from `wigtn-coding` to `wigtn-plugins`). GitHub redirects the old slug, so
 * the stale link worked, but the body two sections down tells the reader to
 * update a cloned remote, and a button that hands them the retired address
 * back argues with its own page. Two fields differ from the inline entry this
 * replaced: this link, and `readTime`, which fell with the section cuts.
 *
 * The tech-report link is built with `techReportHref()` from ../../links, a
 * leaf module. Importing a value from ../../data would be circular, because data.ts
 * imports this file, so the helper would still be in its temporal dead zone
 * when this module evaluates. Types from data are erased and stay safe.
 *
 * No cover image, deliberately. There is no screenshot of this plugin anywhere
 * in the repository, and inventing one or borrowing another project's would be
 * worse than the fallback: with no `image` field the news card renders
 * BrandCover, which is the intended behaviour. There is no *_COVER export for
 * the same reason. The folder exists anyway, for structural parity with the
 * other posts, so the first real screenshot has an obvious home.
 *
 * externalUrl is preserved from the old entry and currently 404s. So does every
 * other wigtn.github.io/blog/ URL on the site, including the ACL post's, so it
 * is a site-wide condition rather than anything to fix in this file.
 */

import type { Article, Block } from "../../data";
import { techReportHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const wigtnCodingRelease: Article = {
  slug: "wigtn-coding-release",
  kind: "report",
  channel: "newsroom",
  newsTopic: "release",
  tag: "RELEASE",
  /* The version carries a date, per the template: "v0.1.14" on its own is
   * meaningless six months from now. */
  title:
    "WIGTN Coding v0.1.14, 14 July 2026: the PRD review now checks its premises against the web",
  summary:
    "Until this release the plugin's four review lenses only asked whether a spec matched your codebase. v0.1.14 adds a conditional pass that pulls out the claims depending on the outside world (a third-party API's behaviour, its price, a library's capabilities, a regulation) and verifies them before the review starts.",
  date: "2026.07.14",
  author: "WIGTN",
  readTime: "2 min",
  externalUrl: "https://wigtn.github.io/blog/wigtn-coding/",
  links: [
    /* The live address. The inline entry this replaced still pointed at
     * wigtn-plugins-with-claude-code, which GitHub redirects, but the body
     * two sections down tells the reader to update a cloned remote, so the
     * button had better not send them back to the retired one. */
    { label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins" },
    { label: "Tech report", href: techReportHref("wigtn-coding") },
  ],
  body: [
    p(
      "WIGTN Coding v0.1.14 landed on 14 July 2026. It changes one thing, in the review stage: before the four reviewers read your product spec, the pipeline now pulls out the claims in it that depend on the outside world, meaning what a third-party API actually does, what it costs, what a library actually supports and what a regulation actually requires, then checks each one against the web.",
    ),
    p(
      "That is a small feature with an uncomfortable implication, which is that until this version the review had no way of noticing that a spec was built on something untrue. Four reviewers reading the same wrong premise agree with each other.",
    ),

    { t: "h", text: "Get it" },
    p("It is a Claude Code plugin. Two lines, verbatim from the v0.1.14 README:"),
    /* A single command goes in a `quote` (see the other two announcements); a
     * *sequence* goes in a `list`, because `quote` renders as one paragraph
     * and the browser collapses any padding used to fake a line break. Joining
     * them with a separator was worse than the bullet it was avoiding: it read
     * as one line, it was no longer verbatim, and pasting it ran nothing. */
    {
      t: "list",
      items: ["/plugin marketplace add wigtn/wigtn-plugins", "/install wigtn-plugins"],
    },
    p(
      "The install id is wigtn-plugins, not wigtn-coding. The plugin was renamed on 2 June 2026 and the old id stopped working then; namespaced subagent calls became wigtn-plugins:<agent> in the same change. The repository moved with it, from wigtn-plugins-with-claude-code to wigtn-plugins. GitHub still redirects the old address, so an old link lands fine, but a cloned remote is worth updating.",
    ),

    { t: "h", text: "What shipped" },
    p(
      "v0.1.14 is a prompt-and-contract release. Nothing here compiles: the plugin is Markdown agent definitions, command definitions, skills, one hooks file, and a shell script the quality gate writes into your own repository.",
    ),
    {
      t: "list",
      items: [
        "The change itself: Phase 1.5, External Grounding, added to the parallel digging coordinator and referenced from the sequential prd-reviewer path so both routes get it. Nine files, 158 lines added and 17 removed.",
        "The package surface at v0.1.14, from the manifest and checked against the tree: 13 agents, 5 commands, 6 skills, 20 design styles. That is an inventory of what is in the box, not a claim about what comes out of it. The tech report is where that claim is examined, and declined.",
        "Apache 2.0, unchanged.",
        "Not included: any benchmark. No measurement of this plugin against a single-agent baseline has been published, at this version or any other.",
        "Also not included: a standalone runner. It works inside Claude Code and nowhere else.",
      ],
    },

    { t: "h", text: "Read the report" },
    p(
      "The workflow this release sits inside is in the WIGTN Coding tech report: the six stages, the three layers of shared memory, and the evaluation protocol that has not been run yet. The release history, the agent definitions and the commit hook are in the repository. Both are linked at the top of this page.",
    ),
  ],
};

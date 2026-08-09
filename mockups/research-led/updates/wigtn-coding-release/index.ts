/**
 * Update: WIGTN Plugin v1 for Claude Code, v0.1.16 - announcement.
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
 * IT ALSO USED TO BE PINNED TO v0.1.14, and it is worth saying why that
 * changed, because the sibling post updates/wigss-npm-release states the
 * opposite rule in its own header: pin the post to its release, and write a new
 * one when a later version ships. That rule is right for a post whose title is
 * a sentence about one release, which this was: "WIGTN Coding v0.1.14, 14 July
 * 2026: the PRD review now checks its premises against the web".
 *
 * The Releases list is now four product entries rather than a running log of
 * every version, so this post became the entry for the Claude Code plugin
 * itself, at whatever version it currently is. That is a different kind of
 * post, and pinning does not apply to it. What does apply is that the body has
 * to be re-sourced at the version in the title, which is what happened here. If
 * this ever goes back to being a per-release note, the pinning rule comes back
 * with it.
 *
 * Sources, in order of authority:
 *  - The public plugin repository, https://github.com/wigtn/wigtn-plugins, read
 *    at tag v0.1.16. Every count is from .claude-plugin/marketplace.json at
 *    that tag, cross-checked against the file tree at the same tag: 11 files
 *    under agents/, 5 command files at the top of commands/ (the sixth entry
 *    there is the references/ directory, not a command), 7 skill directories,
 *    20 files under skills/design-system-reference/styles/.
 *  - The GitHub releases API for the same repository: v0.1.14 on 2026-07-14,
 *    v0.1.15 on 2026-08-04, v0.1.16 on 2026-08-04. The last two carry only a
 *    PR title each, so the tree is what describes them.
 *  - `git diff --shortstat v0.1.14 v0.1.16`: 50 files changed, 3,274
 *    insertions, 3,608 deletions.
 *  - The WIGTN Coding tech report, dated the same day as v0.1.16, which is
 *    where the instruction-surface history and the limitations live.
 *
 * NUMBERS DELIBERATELY NOT COPIED HERE. The v0.1.15 release title claims a 20%
 * cut in instruction text and a 39-file product surface. Both are commit-message
 * claims, and the report measures the same thing properly and over the whole
 * history. The counts in this post are the ones that can be recounted from the
 * tree in a minute. Do not swap them for the PR numbers.
 *
 * The conflicting counts, resolved rather than quietly picked, and kept here
 * because the stale source is still live: .github/WIGTN_META.md carries an SEO
 * string reading "12 agents, 3 commands, 17 design styles", stale since the
 * June 2026 rename, and this website once transcribed its "3 commands" as
 * "3 skills". The manifest and the tree agree with each other at every tag we
 * have checked, and they are what this post follows. Do not restore 12/3/17.
 *
 * The GitHub link was changed once, and deliberately. The old inline entry
 * pointed at wigtn-plugins-with-claude-code, renamed to wigtn-plugins on 2 June
 * 2026 (commit a05f651, a BREAKING CHANGE that also moved the plugin id from
 * `wigtn-coding` to `wigtn-plugins`). GitHub redirects the old slug, but the
 * body tells the reader to update a cloned remote, and a button handing them
 * the retired address back argues with its own page.
 *
 * The tech-report link is built with `techReportHref()` from ../../links, a leaf
 * module. Importing a value from ../../data would be circular, because data.ts
 * imports this file, so the helper would still be in its temporal dead zone when
 * this module evaluates. Types from data are erased and stay safe.
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
  title: "WIGTN Plugin v1: Claude Code",
  version: "v0.1.16",
  summary:
    "The first of the two plugins, for Claude Code. It got smaller in the release before this one, then gained a skill that files what a session worked out and gates what leaves the machine.",
  date: "2026.08.04",
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
  /* Full tag history, from `gh api repos/wigtn/wigtn-plugins/releases` on
   * 2026-08-09. Nine releases, v0.1.7 to v0.1.16. Dates are `published_at`,
   * converted from UTC to YYYY.MM.DD and nothing else.
   *
   * Each note is one line taken from that release's own body, which for this
   * repo is a generated "What's Changed" list of merged pull requests. Where
   * the PR title is Korean the line is put into English; no fact is added on
   * the way across, and where the source states a figure without its unit the
   * figure is quoted as it stands. v0.1.11's "1.7k" is the case: the release
   * says the prompt surface was cut by 1.7k and does not say 1.7k of what.
   *
   * v0.1.8 IS NOT IN THIS LIST and its absence is a fact rather than a gap.
   * The v0.1.9 release says it was a manifest-only bump that never got a
   * release of its own, so the API returns nine tags and not ten. Do not
   * "restore" it; its changes are in the v0.1.9 line. */
  versions: [
    {
      version: "v0.1.16",
      date: "2026.08.04",
      note: "knowledge-wiki: a session's knowledge accumulated automatically, behind a four-stage export gate.",
    },
    {
      version: "v0.1.15",
      date: "2026.08.04",
      note: "The harness cut back to its contracts: instructions down 20 percent, 39 product files.",
    },
    {
      version: "v0.1.14",
      date: "2026.07.14",
      note: "PRD external grounding: web evidence blocks a false premise before it reaches a build.",
    },
    {
      version: "v0.1.13",
      date: "2026.07.10",
      note: "objective-check on by default, and no spec tags left in shipped code.",
    },
    {
      version: "v0.1.12",
      date: "2026.07.10",
      note: "Hard gate hardened: repo-root resolution, and objective checks made opt-in.",
    },
    {
      version: "v0.1.11",
      date: "2026.07.10",
      note: "Prompt surface cut by 1.7k, plus a hard-gate commit hook.",
    },
    {
      version: "v0.1.10",
      date: "2026.07.09",
      note: "CI publishes a GitHub Release on a version bump.",
    },
    {
      version: "v0.1.9",
      date: "2026.06.27",
      note: "The wigtn-ppt skill, handdrawn-diagram colour rules, Opus 4.8 tuning, and the rename to wigtn-plugins. v0.1.8 was a manifest-only bump with no release of its own and is folded in here.",
    },
    {
      version: "v0.1.7",
      date: "2026.06.01",
      note: "First tagged release: Opus 4.8 support across 13 agents, a rebuilt /screen-spec, the handdrawn-diagram skill, and Linear issue tracking.",
    },
  ],
  body: [
    p(
      "WIGTN Plugin v1 is the Claude Code plugin, and v0.1.16 landed on 4 August 2026. Two releases went out that day. v0.1.15 cut the plugin back to its contracts, and v0.1.16 added knowledge-wiki, a skill that writes down what a session established and puts a gate in front of anything leaving the machine.",
    ),
    p(
      "The direction is the part worth noticing. This is the second time the plugin has been cut rather than extended, and the report is where that history is measured instead of asserted.",
    ),

    { t: "h", text: "What changed since v0.1.14" },
    p(
      "v0.1.14 is where this page used to stop, so that is the version worth measuring against. Two releases have landed since, both on 4 August 2026.",
    ),
    {
      t: "list",
      items: [
        "v0.1.15 cut the harness back to its contracts. The agent count went from 13 to 11.",
        "v0.1.16 added knowledge-wiki, the skill that writes down what a session established and gates what leaves the machine. The skill count went from 6 to 7.",
        "Across both: 50 files changed, 3,274 lines added and 3,608 removed. The release removes more than it adds, which is the point of it.",
        "Unchanged: the install id, the commands, the 20 design styles, and the licence.",
      ],
    },

    { t: "h", text: "Get it" },
    p("Two lines, verbatim from the v0.1.16 README:"),
    /* A single command goes in a `quote` (see the other announcements); a
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
      "Nothing here compiles. The plugin is Markdown agent definitions, command definitions, skills, one hooks file, and a shell script the quality gate writes into your own repository.",
    ),
    {
      t: "list",
      items: [
        "knowledge-wiki, the v0.1.16 addition: a session's conclusions are written to a wiki, and four checks run before anything is published out of the machine it was written on.",
        "The package surface at v0.1.16, from the manifest and checked against the tree: 11 agents, 5 commands, 7 skills, 20 design styles. That is an inventory of what is in the box, not a claim about what comes out of it. The tech report is where that claim is examined, and declined.",
        "Apache 2.0, unchanged.",
        "Not included: any benchmark. No measurement of this plugin against a single-agent baseline has been published, at this version or any other. The one controlled result we have is on the Codex side, and it covers two tasks on one model.",
        "Also not included: a standalone runner. It works inside Claude Code and nowhere else.",
      ],
    },

    { t: "h", text: "Read the report" },
    p(
      "The workflow this release sits inside is in the WIGTN Coding tech report: the six stages, the three layers of shared memory, and what happened to the instruction surface over seven months, which is the thing this release is another step in. The release history, the agent definitions and the commit hook are in the repository. Both are linked at the top of this page.",
    ),
  ],
};

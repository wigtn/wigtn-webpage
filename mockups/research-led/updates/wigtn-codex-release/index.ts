/**
 * Update: WIGTN Plugin v2 for Codex, v0.3.0 - announcement.
 *
 * Follows updates/_template/announcement/STRUCTURE.md: lede -> what it does ->
 * get it -> what shipped -> read the report. Voice follows
 * updates/wigtn-coding-release, the sibling post for the Claude Code plugin.
 *
 * "What it does" rather than "What changed since", because this is the plugin's
 * first appearance on this site. Its repository has three releases behind it
 * (v0.1.0, v0.2.0, v0.3.0, all in July 2026), and their dates are in "What
 * shipped"; a reader meeting the plugin here needs what it is before what moved
 * in it.
 *
 * Sources, in order of authority:
 *  - The public repository, https://github.com/wigtn/wigtn-plugins-codex, read
 *    at tag v0.3.0. The install lines are verbatim from its README. The nine
 *    skills are the nine directories under
 *    plugins/wigtn-plugins-with-codex/skills, which match the README's own
 *    table one for one, so the count is checked twice rather than transcribed.
 *  - The GitHub releases API for the same repository: v0.1.0 on 2026-07-14,
 *    v0.2.0 on 2026-07-27, v0.3.0 on 2026-07-28. Every release body is a bare
 *    changelog link, so the repository is the only description of what shipped.
 *  - LICENSE at that tag, Apache 2.0.
 *  - The Codex tech report, "Running a harness on frontier models, part 2",
 *    which is where the evaluation behind the selective design lives.
 *
 * WHY THE POST IS SHORT ON EVIDENCE FOR THE DESIGN. The README states an
 * evaluation on GPT-5.5 and GPT-5.6 Sol, a table of which claims it supports,
 * and one row reading that a claim is contradicted by the current fixtures.
 * None of that is quoted here. It is a finding, findings live on the report
 * site under the split described in AGENTS.md, and the report already carries
 * the same evaluation with its method next to it. This post says the plugin
 * shipped and what is in it. Do not import the table.
 *
 * EDITORIAL DECISIONS a future editor would otherwise undo:
 *
 * 1. No cover, and the folder holds no image. There is no screenshot of this
 *    plugin in either repository. The report site has a Codex banner, but it is
 *    OpenAI's brand image for the tool being evaluated, and running it as the
 *    cover of a WIGTN release would claim it depicts something of ours. With no
 *    `image` the feed renders BrandCover, which is the intended behaviour and
 *    what wigtn-coding-release does for the same reason. The folder exists so
 *    the first real screenshot has an obvious home.
 *
 * 2. The one-of-nine invocation rule is the lede, not the skill count. Nine
 *    skills is a package surface, and the template says a surface is labelled
 *    as one rather than presented as an achievement. What is actually new is
 *    that eight of them open on their own and the ninth refuses to.
 *
 * 3. The install is two commands, so it is a `list` and not a `quote`. A quote
 *    renders as one paragraph and the browser collapses anything used to fake
 *    the line break, which makes the pair unpastable. Same call as the sibling
 *    post.
 *
 * 4. No `externalUrl`. The two older release posts carry one pointing at
 *    wigtn.github.io/blog/, which 404s site-wide; there is no reason to add a
 *    fourth dead link to the set.
 *
 * 5. The comparison with the Claude Code plugin is one sentence, not the
 *    README's table. The table is a design argument, and the reader who wants
 *    it has the repository linked at the top of the page.
 */

import type { Article, Block } from "../../data";
import { techReportHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const wigtnCodexRelease: Article = {
  slug: "wigtn-codex-release",
  kind: "report",
  channel: "newsroom",
  newsTopic: "release",
  tag: "RELEASE",
  title: "WIGTN Plugin v2: Codex",
  version: "v0.3.0",
  summary:
    "A second plugin, for Codex rather than Claude Code. Nine skills, of which eight open on their own and one has to be named, so an ordinary coding request cannot grow into the full delivery pipeline by accident.",
  date: "2026.07.28",
  author: "WIGTN",
  readTime: "2 min",
  links: [
    { label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins-codex" },
    { label: "Tech report", href: techReportHref("codex-selective-harness") },
  ],
  /* Full tag history, from `gh api repos/wigtn/wigtn-plugins-codex/releases`
   * on 2026-08-09. Three releases. Dates are `published_at`.
   *
   * THE NOTES COME FROM COMMITS, NOT FROM RELEASE NOTES, and that is a weaker
   * source than the one the Claude Code plugin's list uses. All three releases
   * here have a body containing a "Full Changelog" compare link and nothing
   * else, so each line below is written from the release commit's own subject
   * and the files it touched, read through
   * `gh api repos/wigtn/wigtn-plugins-codex/compare/<prev>...<tag>` and
   * `.../commits/<sha>` on 2026-08-09:
   *   - v0.3.0, 14ac417c "feat: release selective lifecycle plugin v0.3.0",
   *     which adds docs/WORKGRAPH-LIFECYCLE.md and docs/EVIDENCE-CONTRACT.md
   *     alongside the 2026-07-28 evaluation protocol documents.
   *   - v0.2.0, 07a99150 "feat: release evidence-first Codex plugin v0.2.0",
   *     which replaces product-spec's prd-template.md and review-checklist.md
   *     with create-contract.md and review-contract.md and adds
   *     scripts/validate-prd.py.
   *   - v0.1.0, bcc4232b "feat: launch WIGTN Codex plugin marketplace", the
   *     first commit with content: the marketplace manifest, the skills, the
   *     evidence-collection scripts, and the validate and release workflows.
   *
   * Each line therefore says what the commit says it did and names what the
   * diff shows was added or removed. Nothing here is inferred from reading the
   * code and deciding what mattered. The real fix is still to write release
   * notes in the plugin repo, and when they exist, re-source from those. */
  versions: [
    {
      version: "v0.3.0",
      date: "2026.07.28",
      note: "The selective lifecycle release: a workgraph lifecycle and an evidence contract, with the evaluation protocol documents behind them.",
    },
    {
      version: "v0.2.0",
      date: "2026.07.27",
      note: "The evidence-first release: product-spec rebuilt around a create contract and a review contract, with a PRD validator in place of the old template and checklist.",
    },
    {
      version: "v0.1.0",
      date: "2026.07.14",
      note: "First release: the marketplace manifest, the skills, the change-evidence scripts, and the validate and release workflows.",
    },
  ],
  body: [
    p(
      "WIGTN Plugin v2 is a Codex plugin, and v0.3.0 landed on 28 July 2026. It is not the Claude Code plugin ported across: that one puts a fixed team of agents in front of the model, and this one hands Codex nine skills and stays out of the way until a request matches one of them.",
    ),
    { t: "h", text: "What it does" },
    p(
      "The rule that shapes it is which skills are allowed to start themselves. Eight are selected automatically when a request matches what they do. The ninth, verified-delivery, runs only when it is named, because it is the one that opens the whole implement-and-verify loop and an ordinary bug fix should not fall into it.",
    ),
    p(
      "So the day-to-day behaviour is that nothing happens. Ask for a fix and Codex fixes it. The skills open on the work that repeats across products: writing a PRD, turning it into screens, planning the tasks, checking the requirements against executed tests, and getting a branch to the point where it can be pushed.",
    ),

    { t: "h", text: "Get it" },
    p("Two lines, verbatim from the v0.3.0 README:"),
    {
      t: "list",
      items: [
        "codex plugin marketplace add wigtn/wigtn-plugins-codex",
        "codex plugin add wigtn-plugins-with-codex@wigtn",
      ],
    },
    p(
      "After that there is nothing to memorise: the skills are chosen from plain requests. Naming one explicitly is $wigtn-plugins-with-codex:<skill>, which is also how verified-delivery is invoked, since it will not start any other way.",
    ),

    { t: "h", text: "What shipped" },
    p(
      "Nothing here compiles. The plugin is skill definitions, JSON schemas and one Python script that reads and writes a project's WorkGraph state file.",
    ),
    {
      t: "list",
      items: [
        "Nine skills at v0.3.0, from the repository tree and matching the README's table: product-spec, screen-spec, work-planner, verified-delivery, acceptance-verifier, design-direction, release-readiness, handdrawn-diagram and wigtn-presentation. That is an inventory of what is in the box, not a claim about what comes out of it.",
        "The state contract that v0.3.0 is named for: requirement, artifact, task, check and release gate are linked, and a change to a source hash marks everything downstream of it stale. A task cannot reach verified without a passing check behind it.",
        "Release authority is separated from the rest. Reviewing, committing, pushing and opening a PR are distinct permissions, and none of them is taken without being asked for.",
        "Apache 2.0.",
        "Not included: any claim that this makes ordinary coding faster. The README lists that one as contradicted by its own fixtures, and the report is where the evaluation is set out.",
      ],
    },

    { t: "h", text: "Read the report" },
    p(
      "Why the harness got smaller instead of larger is the second part of the Codex tech report: what the evaluation on two SWE-bench Verified tasks actually showed, what it cost, and what the result does not cover. The release history and every skill definition are in the repository. Both are linked at the top of this page.",
    ),
  ],
};

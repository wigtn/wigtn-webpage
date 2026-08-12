/**
 * Release record: WIGTN Plugin v2 for Codex, current through v0.4.0.
 *
 * Follows updates/_template/announcement/STRUCTURE.md. This is one product
 * record with a newest-first versions array, not one post per version.
 *
 * Sources, in order of authority:
 *  - https://github.com/wigtn/wigtn-plugins-codex at annotated tag v0.4.0,
 *    created 2026-08-12. Commit 92175ff adds the opt-in knowledge-wiki skill,
 *    its Stop hook, safety gates, examples and regression checks.
 *  - README.md and .codex-plugin/plugin.json at v0.4.0. They support the
 *    ten-skill count, the two install commands, the opt-in boundary and the
 *    per-user-only automatic publishing boundary.
 *  - LICENSE at v0.4.0, Apache 2.0.
 *  - The Codex tech report, "Running a harness on frontier models, part 2",
 *    for the evaluation behind the earlier selective lifecycle design. There
 *    is no separate report for knowledge-wiki, so this notice makes no
 *    performance or effectiveness claim about it.
 *
 * Editorial decisions:
 * 1. No cover. Neither repository contains a product screenshot that carries
 *    a fact the prose cannot, and the announcement template has a zero-photo
 *    default.
 * 2. The v0.4.0 change is the lead. The skill count is package inventory, not
 *    an achievement claim.
 * 3. The install remains a two-command list copied from the v0.4.0 README.
 * 4. The original v0.1.0 through v0.3.0 rows remain unchanged because their
 *    source history has not changed.
 */

import type { Article, Block } from "../../data";
import { techReportHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const wigtnCodexRelease: Article = {
  slug: "wigtn-codex-release",
  kind: "report",
  channel: "newsroom",
  newsTopic: "release",
  releaseType: "plugin",
  tag: "RELEASE",
  title: "WIGTN Plugin v2: Codex",
  version: "v0.4.0",
  summary:
    "v0.4.0 adds an opt-in Knowledge Wiki that turns reusable Codex session learning into gated per-user notes. Installation alone captures nothing.",
  date: "2026.08.12",
  author: "WIGTN Engineering",
  readTime: "2 min",
  links: [
    { label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins-codex" },
    { label: "Tech report", href: techReportHref("codex-selective-harness") },
  ],
  /* Full version history. v0.1.0 through v0.3.0 were sourced from `gh api
   * repos/wigtn/wigtn-plugins-codex/releases` on 2026-08-09. v0.4.0 is sourced
   * from its annotated tag and release commit on 2026-08-12.
   *
   * THE NOTES COME FROM COMMITS, NOT FROM RELEASE NOTES, and that is a weaker
   * source than the one the Claude Code plugin's list uses. The first three
   * release objects contain a "Full Changelog" compare link and nothing else.
   * Their lines come from the release commits and files they touched, read
   * through `gh api repos/wigtn/wigtn-plugins-codex/compare/<prev>...<tag>` and
   * `.../commits/<sha>` on 2026-08-09. The v0.4.0 line comes from its annotated
   * tag and commit diff on 2026-08-12:
   *   - v0.4.0, 92175ff6 "feat: add opt-in Codex knowledge wiki", which adds
   *     the knowledge-wiki skill, Stop hook, gated worker and regression test.
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
      version: "v0.4.0",
      date: "2026.08.12",
      note: "Adds an opt-in Knowledge Wiki with scope, secret, semantic audit and output gates before a generated note can enter a per-user wiki path.",
    },
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
      "WIGTN Plugin v2 for Codex reached v0.4.0 on 12 August 2026. The release adds an opt-in Knowledge Wiki that can turn reusable session learning into a Markdown note under a personal wiki path. Installing the plugin does not turn capture on.",
    ),
    { t: "h", text: "What changed since v0.3.0" },
    p(
      "Knowledge Wiki is the tenth skill. It runs only after a separate configuration sets enabled to true and names a narrow repository scope. A completed Codex turn first passes a scope check and a deterministic secret scan. A detached worker then generalises reusable knowledge, runs a separate semantic audit and scans the output again before it can write a note.",
    ),
    p(
      "Automatic publishing stops at per-user paths. The shared area still requires human review, and remote push stays off unless it is enabled separately. If a gate cannot decide, the pipeline discards the note rather than publishing it.",
    ),

    { t: "h", text: "Get it" },
    p("Two lines, verbatim from the v0.4.0 README:"),
    {
      t: "list",
      items: [
        "codex plugin marketplace add wigtn/wigtn-plugins-codex",
        "codex plugin add wigtn-plugins-with-codex@wigtn",
      ],
    },
    p(
      "The existing product workflow skills are still chosen from plain requests. Knowledge capture is different: installation makes the skill available, but a separate local configuration must enable the hook and define what repositories and personal wiki path it may touch.",
    ),

    { t: "h", text: "What shipped" },
    p(
      "The release adds a Stop hook, a private one-shot queue and Python workers alongside the existing skill definitions and schemas.",
    ),
    {
      t: "list",
      items: [
        "Ten skills at v0.4.0. Knowledge-wiki joins the nine skills shipped in v0.3.0.",
        "Four knowledge export gates: repository scope, deterministic secret blocking, a separate semantic audit and a deterministic output scan.",
        "Automatic wiki writes are limited to per-user paths. The shared path remains a human-reviewed promotion step.",
        "The v0.3.0 WorkGraph, evidence and release-authority contracts remain in the package.",
        "Apache 2.0.",
        "Not included: a claim that Knowledge Wiki improves productivity or captures every useful session. No evaluation supporting either claim has been published.",
      ],
    },

    { t: "h", text: "Read the report" },
    p(
      "The Codex tech report explains the selective lifecycle design that preceded this release. The v0.4.0 implementation, safety policy and full version history are in the repository. Both are linked at the top of this page.",
    ),
  ],
};

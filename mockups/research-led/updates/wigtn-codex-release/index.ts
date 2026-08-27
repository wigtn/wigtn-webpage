/**
 * Release record: WIGTN Plugin v2 for Codex, current through v0.5.1.
 *
 * Follows updates/_template/announcement/STRUCTURE.md. This is one product
 * record with a newest-first versions array, not one post per version.
 *
 * Sources, in order of authority:
 *  - https://github.com/wigtn/wigtn-plugins-codex releases v0.5.0 and v0.5.1,
 *    published 2026-08-24 and 2026-08-25. Their target commits are 48ca387
 *    and 75dc8a0.
 *  - README.md and .codex-plugin/plugin.json at v0.5.1. They support the
 *    nine-skill Core count, the Core install commands, the separate optional
 *    knowledge-wiki install and the current invocation boundaries.
 *  - Commit 48ca387 and its diff from v0.4.0. It splits Knowledge Wiki into
 *    its own plugin and narrows the Core PRD, screen, planning, acceptance and
 *    verified-delivery contracts.
 *  - Commit 75dc8a0 and its diff from v0.5.0. It adds structural and visual
 *    checks for diagrams, presentations and responsive screen wireframes.
 *  - LICENSE at v0.5.1, Apache 2.0.
 *  - The Codex tech report, "Running a harness on frontier models, part 2",
 *    for the evaluation behind the earlier selective lifecycle design. There
 *    is no separate report for the v0.5 visual-delivery changes, so this
 *    notice makes no performance or effectiveness claim about them.
 *
 * Editorial decisions:
 * 1. No cover. Neither repository contains a product screenshot that carries
 *    a fact the prose cannot, and the announcement template has a zero-photo
 *    default.
 * 2. The two v0.5 releases are the lead. Skill and validator counts are
 *    package inventory, not achievement claims.
 * 3. The Core install remains a two-command list copied from the v0.5.1
 *    README. The optional Knowledge Wiki command is labelled separately.
 * 4. The original v0.1.0 through v0.4.0 rows remain unchanged because their
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
  version: "v0.5.1",
  summary:
    "v0.5.0 moved Knowledge Wiki out of Core and cut back the PRD, screen and delivery workflows. v0.5.1 adds checks for diagrams, decks and wireframes.",
  date: "2026.08.25",
  author: "WIGTN Engineering",
  readTime: "2 min",
  links: [
    { label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins-codex" },
    { label: "Tech report", href: techReportHref("codex-selective-harness") },
  ],
  /* Full version history. v0.1.0 through v0.3.0 were sourced from `gh api
   * repos/wigtn/wigtn-plugins-codex/releases` on 2026-08-09. v0.4.0 is sourced
   * from its annotated tag and release commit on 2026-08-12. v0.5.0 and
   * v0.5.1 are sourced from their GitHub release objects and target commits
   * on 2026-08-27.
   *
   * THE NOTES COME FROM COMMITS, NOT FROM RELEASE NOTES, and that is a weaker
   * source than the one the Claude Code plugin's list uses. All six
   * release objects contain a "Full Changelog" compare link and nothing else.
   * Their lines come from the release commits and files they touched, read
   * through `gh api repos/wigtn/wigtn-plugins-codex/compare/<prev>...<tag>` and
   * `.../commits/<sha>` on 2026-08-09. The v0.4.0 line comes from its annotated
   * tag and commit diff on 2026-08-12. The two v0.5 lines come from their
   * target commits and README sections:
   *   - v0.5.1, 75dc8a03 "feat: harden visual delivery for v0.5.1", which
   *     adds diagram and HTML-deck verifiers, makes the responsive wireframe
   *     self-contained and adds resource-integrity and visual contracts.
   *   - v0.5.0, 48ca3875 "feat: slim Codex harness for v0.5", which moves
   *     Knowledge Wiki into a separate plugin and narrows PRD, screen,
   *     WorkGraph, acceptance and verified-delivery invocation contracts.
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
      version: "v0.5.1",
      date: "2026.08.25",
      note: "Checks Mermaid source, SVG and PNG output, HTML decks, responsive wireframes and bundled resources.",
    },
    {
      version: "v0.5.0",
      date: "2026.08.24",
      note: "Moves Knowledge Wiki out of Core, starts PRDs in Compact mode, and narrows when Screen Spec, Work Planner and Verified Delivery step in.",
    },
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
      "WIGTN Plugin v2 for Codex reached v0.5.1 on 25 August 2026. v0.5.0 moved session knowledge capture into a separate optional plugin and left nine skills in Core. v0.5.1 added checks for the diagrams, decks and wireframes those skills produce.",
    ),
    { t: "h", text: "What changed since v0.4.0" },
    p(
      "v0.5.0 moved Knowledge Wiki out of Core. Product Spec now starts with the Compact format. Screen Spec writes only the requested files and the files they depend on. Work Planner steps in only when a plan must be saved or resumed. Verified Delivery still requires an explicit call and asks for only the evidence the change needs.",
    ),
    p(
      "v0.5.1 added checks for Mermaid source, SVG and PNG output before visual review. WIGTN Presentation now leaves file generation to Codex and applies the WIGTN brand. HTML decks are built only when requested. Screen wireframes no longer use a CDN, and the validator checks their viewport setting, internal links and remote resources.",
    ),

    { t: "h", text: "Get it" },
    p("Two lines, verbatim from the v0.5.1 README:"),
    {
      t: "list",
      items: [
        "codex plugin marketplace add wigtn/wigtn-plugins-codex",
        "codex plugin add wigtn-plugins-with-codex@wigtn",
      ],
    },
    p(
      "The Core package contains no lifecycle hook. Session knowledge capture is available as a separate optional install:",
    ),
    { t: "quote", text: "codex plugin add wigtn-knowledge-wiki@wigtn" },
    p(
      "Installing that plugin still captures nothing until a local configuration enables it and defines the allowed repositories and personal wiki path.",
    ),

    { t: "h", text: "What shipped" },
    p(
      "Core and Knowledge Wiki now ship as two plugins in the same marketplace. Core contains the skills and validators for product and release work. Knowledge Wiki remains optional.",
    ),
    {
      t: "list",
      items: [
        "Core ships nine skills for PRDs, screen files, saved plans, acceptance checks, design direction, verified delivery, Git releases, diagrams and WIGTN decks.",
        "Knowledge Wiki stays outside Core. Its repository, secret, semantic-audit and output checks still apply when it is installed.",
        "Product Spec starts with Compact, Screen Spec writes only the requested files, and Verified Delivery runs only when called by name.",
        "v0.5.1 checks diagram files, decks, wireframes and bundled resources before they are handed off.",
        "WorkGraph, evidence and Git-authority contracts remain in Core.",
        "Apache 2.0.",
        "This release does not claim that the plugin improves coding quality or efficiency. The published evaluation does not show a general improvement.",
      ],
    },

    { t: "h", text: "Read the report" },
    p(
      "The Codex tech report explains why these workflows stay selective. The repository contains the v0.5.1 code, its validators and the full release history. Both links are at the top of this page.",
    ),
  ],
};

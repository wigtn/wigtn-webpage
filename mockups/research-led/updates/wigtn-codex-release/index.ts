/**
 * Release record: WIGTN Plugin v2 for Codex, drafted through v0.5.3.
 *
 * Follows updates/_template/announcement/STRUCTURE.md. This is one product
 * record with a newest-first versions array, not one post per version.
 *
 * Sources, in order of authority:
 *  - The local wigtn-plugins-codex worktree based on v0.5.2 commit 093d2f0.
 *    Its candidate manifests and README identify v0.5.3, and its diff supports
 *    the context-size and stack-neutrality details below. v0.5.3 is not yet a
 *    commit, tag or GitHub release, so this record must be re-sourced before
 *    publication.
 *  - https://github.com/wigtn/wigtn-plugins-codex releases v0.5.0 through
 *    v0.5.2, published 2026-08-24, 2026-08-25 and 2026-08-30. Their target
 *    commits are 48ca387, 75dc8a0 and 093d2f0.
 *  - README.md and both .codex-plugin/plugin.json files at candidate v0.5.3. They support the
 *    nine-skill Core count, the Core install commands, the separate optional
 *    knowledge-wiki install and the current invocation boundaries.
 *  - Commit 48ca387 and its diff from v0.4.0. It splits Knowledge Wiki into
 *    its own plugin and narrows the Core PRD, screen, planning, acceptance and
 *    verified-delivery contracts.
 *  - Commit 75dc8a0 and its diff from v0.5.0. It adds structural and visual
 *    checks for diagrams, presentations and responsive screen wireframes.
 *  - Commit 093d2f0 and its diff from v0.5.1. It hardens queued Knowledge Wiki
 *    authority, visual portability checks, dual-plugin release validation and
 *    trims the Design Direction references.
 *  - LICENSE at v0.5.2, Apache 2.0. The candidate does not change it.
 *  - The Codex tech report, "Running a harness on frontier models, part 2",
 *    for the evaluation behind the earlier selective lifecycle design. There
 *    is no separate report for the v0.5 delivery changes, so this
 *    notice makes no performance or effectiveness claim about them.
 *
 * Editorial decisions:
 * 1. No cover. Neither repository contains a product screenshot that carries
 *    a fact the prose cannot, and the announcement template has a zero-photo
 *    default.
 * 2. v0.5.3 is the lead, with exact local byte and character counts. These are
 *    package-size facts, not claims about model quality or task efficiency.
 * 3. The Core install remains a two-command list copied from the candidate
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
  version: "v0.5.3",
  summary:
    "v0.5.3 trims always-on skill metadata, makes Screen Spec project-native, and loads detailed evidence guidance only when a task needs it.",
  date: "2026.09.01",
  author: "WIGTN Engineering",
  readTime: "3 min",
  links: [
    { label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins-codex" },
    { label: "Tech report", href: techReportHref("codex-selective-harness") },
  ],
  /* Full version history. v0.1.0 through v0.3.0 were sourced from `gh api
   * repos/wigtn/wigtn-plugins-codex/releases` on 2026-08-09. v0.4.0 is sourced
   * from its annotated tag and release commit on 2026-08-12. v0.5.0 and
   * v0.5.1 are sourced from their GitHub release objects and target commits
   * on 2026-08-27. v0.5.2 is sourced from its GitHub release object and
   * target commit on 2026-08-30. The v0.5.3 row is a pre-release draft sourced
   * from the local candidate diff on 2026-09-01.
   *
   * THE NOTES COME FROM COMMITS, NOT FROM RELEASE NOTES, and that is a weaker
   * source than the one the Claude Code plugin's list uses. All seven
   * release objects contain a "Full Changelog" compare link and nothing else.
   * Their lines come from the release commits and files they touched, read
   * through `gh api repos/wigtn/wigtn-plugins-codex/compare/<prev>...<tag>` and
   * `.../commits/<sha>` on 2026-08-09. The v0.4.0 line comes from its annotated
   * tag and commit diff on 2026-08-12. Released v0.5 lines come from their
   * target commits and README sections. The candidate line comes from its local
   * README and measured diff:
   *   - v0.5.3, local candidate, which shortens Core skill descriptions and
   *     Screen Spec guidance, removes framework assumptions, loads detailed
   *     evidence references conditionally and merges presentation guidance.
   *   - v0.5.2, 093d2f0b "fix: harden plugin delivery for v0.5.2", which
   *     prevents queued Knowledge Wiki jobs from gaining later push authority,
   *     isolates failed jobs, tightens visual portability checks, validates both
   *     plugin releases together and shortens Design Direction references.
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
      version: "v0.5.3",
      date: "2026.09.01",
      note: "Reduces always-on skill metadata and Screen Spec guidance, removes stack assumptions, and loads detailed evidence handoffs only when needed.",
    },
    {
      version: "v0.5.2",
      date: "2026.08.30",
      note: "Prevents queued Knowledge Wiki jobs from gaining later push permission, isolates failed jobs, and strengthens visual and dual-plugin release checks.",
    },
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
      "The v0.5.3 candidate removes more prompt overhead from WIGTN Plugin v2 for Codex without removing its deterministic validators. It shortens always-on skill descriptions, narrows the Screen Spec reading path, and moves detailed evidence instructions behind the requests that use them.",
    ),
    { t: "h", text: "What changed in v0.5.3" },
    p(
      "The combined Core skill descriptions fell from 2,980 to 2,162 characters. Screen Spec's skill text, templates and references fell from 30,960 to 13,558 bytes. It now reads only the selected artifact templates, plus state and handoff contracts when those outputs need them.",
    ),
    p(
      "The Screen Spec templates no longer assume admin routes, response codes, breakpoints, CSS tokens, frameworks or data libraries that the repository has not established. Detailed Verified Delivery evidence guidance and Acceptance Verifier's saved JSON handoff are loaded only for tasks that need them.",
    ),
    p(
      "Presentation's separate brand and design references are now one 3,082-byte contract instead of 4,825 bytes across two files. Placeholder, requirement, anchor, remote-resource and repository checks remain in place, with a new regression case for project-native template tokens.",
    ),

    { t: "h", text: "What changed earlier in v0.5" },
    p(
      "v0.5.0 moved Knowledge Wiki out of Core. Product Spec now starts with the Compact format. Screen Spec writes only the requested files and the files they depend on. Work Planner steps in only when a plan must be saved or resumed. Verified Delivery still requires an explicit call and asks for only the evidence the change needs.",
    ),
    p(
      "v0.5.1 added checks for Mermaid source, SVG and PNG output before visual review. WIGTN Presentation leaves file generation to Codex and applies the WIGTN brand. HTML decks are built only when requested. Screen wireframes no longer use a CDN, and the validator checks their viewport setting, internal links and remote resources.",
    ),
    p(
      "v0.5.2 hardened queued Knowledge Wiki authority, isolated failed jobs, expanded visual portability checks, validated both plugin versions together, and reduced the Design Direction references from 98,899 to 18,479 bytes.",
    ),

    { t: "h", text: "Get it" },
    p("The Core install commands are unchanged:"),
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
        "Queued Knowledge Wiki jobs keep their captured push and destination limits, expire after the configured time limit, and are processed independently.",
        "Product Spec starts with Compact, Screen Spec writes only the requested files and supporting contracts, and Verified Delivery runs only when called by name.",
        "Screen Spec derives routes, states, layout behavior and implementation boundaries from the target repository instead of prescribing a stack.",
        "Diagram, deck and wireframe checks reject truncated PNG files and remote HTML or CSS resources before handoff.",
        "Core and Knowledge Wiki use the same release version, while either package can still be installed on its own.",
        "WorkGraph, evidence and Git-authority contracts remain in Core.",
        "Apache 2.0.",
        "This release does not claim that the plugin improves coding quality or efficiency. The published evaluation does not show a general improvement.",
      ],
    },

    { t: "h", text: "Read the report" },
    p(
      "The Codex tech report explains why these workflows stay selective. The repository link contains the released code through v0.5.2; this v0.5.3 article remains a draft until the candidate is committed and released.",
    ),
  ],
};

/**
 * Codex release notice, updated from the public v0.5.1 record to v0.5.5.
 * Uses the announcement template. The user requested one new v0.5.5 ledger
 * row, with v0.5.2-v0.5.4 changes summarized in the body. Older public rows
 * remain verbatim; the earlier unpublished v0.5.3 draft is superseded.
 * Sources: plugin release v0.5.5 published 2026-09-08T07:26:38Z, commit
 * a038c7dac606ab5ab0e9ffa47f874a62339264ac; its README and RELEASE-v0.5.4-KO.md
 * and RELEASE-v0.5.5-KO.md support the install commands and behavior changes.
 * No benchmark table or cover: methods, numbers and limits belong in the
 * linked report. Retained invocation boundaries are not advertised as new.
 * Link the published Korean study until the English site report is live.
 */
import type { Article } from "../../data";
import {
  CODEX_PLUGIN_REPOSITORY,
  CODEX_PLUGIN_RELEASE,
  CODEX_SCOPED_INSPECT_EVIDENCE,
  CODEX_SCOPED_INSPECT_REPORT,
} from "../../links";

export const wigtnCodexRelease: Article = {
  slug: "wigtn-codex-release",
  kind: "report",
  channel: "newsroom",
  newsTopic: "release",
  releaseType: "plugin",
  tag: "RELEASE",
  title: "WIGTN Plugin v2: Codex",
  version: "v0.5.5",
  summary: "Revises the harness for GPT-6 Astra with task-specific review guidance and scoped WorkGraph inspection, alongside state and permission fixes since v0.5.1.",
  date: "2026.09.08",
  author: "WIGTN Engineering",
  readTime: "3 min",
  links: [
    { label: "GitHub", href: CODEX_PLUGIN_REPOSITORY },
    { label: "v0.5.5 release", href: CODEX_PLUGIN_RELEASE },
    { label: "Tech report (Korean)", href: CODEX_SCOPED_INSPECT_REPORT },
    { label: "Execution records", href: CODEX_SCOPED_INSPECT_EVIDENCE },
  ],
  versions: [
    {
      version: "v0.5.5",
      date: "2026.09.08",
      note: "Updates Astra review guidance and adds scoped WorkGraph inspection, with state and permission fixes since v0.5.1.",
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
  {
    "t": "p",
    "text": "WIGTN Plugin v2: Codex v0.5.5 is available. Following the release of GPT-6 Astra, we revisited the prompts, review rules and tool responses around Codex. Versions 0.5.4 and 0.5.5 revise those paths while keeping routine coding outside the plugin’s full delivery workflow. This notice also covers the changes since v0.5.1, the last version listed on this site."
  },
  {
    "t": "h",
    "text": "Get it"
  },
  {
    "t": "list",
    "items": [
      "codex plugin marketplace add wigtn/wigtn-plugins-codex",
      "codex plugin add wigtn-plugins-with-codex@wigtn"
    ]
  },
  {
    "t": "h",
    "text": "Updated for GPT-6 Astra"
  },
  {
    "t": "p",
    "text": "The review focused on the work the plugin asks Codex to repeat and the information its tools return. We reduced redundant instructions, made review rules more specific to the requested document, and changed saved-plan inspection to return the records needed for the task."
  },
  {
    "t": "list",
    "items": [
      "Keep routine coding light. We reduced fixed procedures and duplicate references in the optional workflows. Verified Delivery remains an explicit invocation; routine edits do not automatically enter the full requirements-and-evidence workflow.",
      "Match reviews to the request. Compact and externally supplied PRDs are reviewed against their own contracts. Review guidance no longer caps serious findings at a fixed count. Acceptance checks distinguish an observed constraint violation from a requirement that cannot yet be verified, and retain disagreements between saved evidence and the report.",
      "Read the relevant work state. inspect --task returns the requested tasks, their transitive dependencies and linked records. Whole-plan validation and source-change detection remain active. Work Planner now shows the scoped command directly and reads the mutation reference only when the task needs it.",
      "Preserve saved work. Concurrent WorkGraph writes retain both changes or reject a stale revision. Invalid project settings block plan writes, and inspection distinguishes the saved revision from a source-change preview."
    ]
  },
  {
    "t": "p",
    "text": "Earlier in this release series, v0.5.2 hardened Knowledge Wiki queue permissions and isolated failed jobs. v0.5.3 reduced duplicate skill content, removed framework assumptions from screen specifications and made detailed references conditional. v0.5.4 revised the Astra review guidance and saved-state handling; v0.5.5 adds scoped inspection and its usage example. Verified Delivery’s explicit invocation and Knowledge Wiki’s optional installation are retained behavior, not new features introduced in v0.5.5."
  },
  {
    "t": "h",
    "text": "What shipped"
  },
  {
    "t": "p",
    "text": "The repository includes the Core and separate Knowledge Wiki plugins, regression tests, and the inputs, execution records and reproduction scripts for the state-query comparison. The code is Apache 2.0. Knowledge Wiki remains a separate, optional installation."
  },
  {
    "t": "h",
    "text": "Read the report"
  },
  {
    "t": "p",
    "text": "The technical report compares the revised state-query path with v0.5.4 on GPT-6 Astra. It reports answer correctness, session input and cases where the expected reduction did not occur. These measurements concern saved-plan queries; they do not establish a general coding-performance improvement or a comparison between GPT-5.6 and GPT-6."
  }
]
};

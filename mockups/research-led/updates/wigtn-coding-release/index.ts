/**
 * Update: WIGTN Coding v0.1.14 — release note.
 *
 * Follows the release template (updates/_template/release/STRUCTURE.md):
 * lede → get it → what is in the release → why it exists → the gate underneath
 * it → the numbers → what it does not do yet → go deeper. Section 6 is the one
 * the template says carries the post, and it is deliberately the longest thing
 * here. Do not trim it to balance the page.
 *
 * Sources, in order of authority:
 *  - The public plugin repository, https://github.com/wigtn/wigtn-plugins, read
 *    at commit 3bd447c — the v0.1.14 version bump, 14 July 2026. Every count is
 *    from `.claude-plugin/marketplace.json` at that commit, cross-checked
 *    against the file tree at the same commit: 13 files under agents/, 5 top
 *    level command files, 6 skill directories, 20 files under
 *    skills/design-system-reference/styles/.
 *  - The commit messages for v0.1.10 (04c90dd) through v0.1.14 (3bd447c). Every
 *    figure in "The numbers" is quoted from one of them and labelled
 *    self-reported in the body, because that is what it is.
 *  - The WIGTN Coding tech report. Its limitations (L01-L03) and its line that
 *    the benchmark "exists as a protocol, not yet as a result" are the spine of
 *    "What it does not do yet".
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
 * The two links on the old entry pointed at different repositories.
 * wigtn-plugins-with-claude-code was renamed to wigtn-plugins on 2 June 2026
 * (commit a05f651, a BREAKING CHANGE that also moved the plugin id from
 * `wigtn-coding` to `wigtn-plugins`). GitHub still redirects the old slug, so
 * both links land in the same place. `links` is preserved exactly as it was;
 * the body gives the current install id so nobody types the retired one.
 *
 * The tech-report link is built with `techReportHref()` from ../../links, a
 * leaf module. Importing a value from ../../data would be circular — data.ts
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
    "Until this release the plugin's four review lenses only asked whether a spec matched your codebase. v0.1.14 adds a conditional pass that pulls out the claims depending on the outside world — a third-party API's behaviour, its price, a library's capabilities, a regulation — and verifies them before the review starts.",
  date: "2026.07.14",
  author: "WIGTN",
  readTime: "7 min",
  externalUrl: "https://wigtn.github.io/blog/wigtn-coding/",
  links: [
    /* The live address. The inline entry this replaced still pointed at
     * wigtn-plugins-with-claude-code, which GitHub redirects — but the body
     * two sections down tells the reader to update a cloned remote, so the
     * button had better not send them back to the retired one. */
    { label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins" },
    { label: "Tech report", href: techReportHref("wigtn-coding") },
  ],
  body: [
    p(
      "WIGTN Coding v0.1.14 landed on 14 July 2026. It changes one thing, in the review stage: before the four reviewers read your product spec, the pipeline now pulls out the claims in it that depend on the outside world — what a third-party API actually does, what it costs, what a library actually supports, what a regulation actually requires — and checks each one against the web.",
    ),
    p(
      "That is a small feature with an uncomfortable implication, which is that until this version the review had no way of noticing that a spec was built on something untrue. Four reviewers reading the same wrong premise agree with each other.",
    ),

    { t: "h", text: "Get it" },
    p("It is a Claude Code plugin. Two lines, verbatim from the v0.1.14 README:"),
    /* A command goes in a `quote`, not a `list`: the Block union has no code
     * block, and a list renders each line behind a bullet dot, which reads
     * badly for something you are meant to type. Same treatment in the other
     * two release notes. */
    {
      t: "quote",
      text: "/plugin marketplace add wigtn/wigtn-plugins   ·   /install wigtn-plugins",
    },
    p(
      "The install id is wigtn-plugins, not wigtn-coding. The plugin was renamed on 2 June 2026 and the old id stopped working then; namespaced subagent calls became wigtn-plugins:<agent> in the same change. The repository moved with it, from wigtn-plugins-with-claude-code to wigtn-plugins. GitHub still redirects the old address, so an old link lands fine, but a cloned remote is worth updating.",
    ),

    { t: "h", text: "What is in the release" },
    p(
      "v0.1.14 is a prompt-and-contract release. Nothing here compiles: the plugin is Markdown agent definitions, command definitions, skills, one hooks file, and a shell script the quality gate writes into your own repository.",
    ),
    {
      t: "list",
      items: [
        "The change itself: Phase 1.5, External Grounding, added to the parallel digging coordinator and referenced from the sequential prd-reviewer path so both routes get it. Nine files, 158 lines added and 17 removed.",
        "The package surface at v0.1.14, from the manifest and checked against the tree: 13 agents, 5 commands, 6 skills, 20 design styles. That is an inventory of what is in the box, not a claim about what comes out of it — see the last section.",
        "Apache 2.0, unchanged.",
        "Not included: any benchmark. No measurement of this plugin against a single-agent baseline has been published, at this version or any other.",
        "Also not included: a standalone runner. It works inside Claude Code and nowhere else.",
      ],
    },

    { t: "h", text: "Why it exists" },
    p(
      "The review stage — the plugin calls it digging — splits a PRD across four adversarial lenses: completeness, feasibility, security, consistency. Each is grounded in your actual codebase, using the module map, the installed dependencies and the patterns sampled out of existing files. The coordinator's stated principle is \"Context First, Evidence Always\", and every finding has to cite a PRD section number or a code path.",
    ),
    p(
      "All four lenses ask whether something is in the codebase. None of them asked whether it is true in the world. A spec that says a library supports SAML, or that the free tier will cover the volume, or that a webhook retries five times, passes all four reviews and gets built. Phase 1.5 extracts those claims first — capped at eight, with feasibility and security claims taking priority when a spec has more — searches for each, and tags it confirmed, contradicted or unverifiable, with a source URL and a quote required for the first two. Contradicted claims are handed to the feasibility and security lenses as Critical seeds.",
    ),
    p(
      "A contradiction is expensive to get wrong, so it is the only verdict that gets re-checked: three independent votes, each trying to prove the contradiction itself wrong. It survives at two out of three. Below that it is downgraded to unverifiable and carries no weight.",
    ),

    { t: "h", text: "The gate underneath it" },
    p(
      "v0.1.14 was the last of five versions that landed on main between 9 and 14 July. The other four were one argument in four parts: a quality gate a model can talk its way past is not a gate.",
    ),
    {
      t: "list",
      items: [
        "v0.1.10 (committed 8 July, merged 9 July) replaced the review's summed 100-point score with a deterministic rollup over findings — a critical finding fails, major and minor findings fail at thresholds. The 100-point number was demoted to a display value.",
        "v0.1.11 (9 July) cut 1,763 lines, about 19% of the attention surface, out of the agent and command prompts — base-competence re-teaching, four near-duplicate auto-discovery blocks, UX mockups — while leaving the logic, gates and thresholds alone. It also added a PreToolUse hook that blocks a pipeline git commit when the message carries the review's score signal but there is no fresh .wigtn/gate-pass artifact, within a 30-minute window. Manual commits carry no signal and are untouched.",
        "v0.1.12 (10 July) fixed that hook resolving the artifact against the session's working directory instead of the repository root, which false-blocked anyone committing from a subdirectory. It also added an optional .wigtn/checks.sh that the hook runs before a pipeline commit; a non-zero exit blocks.",
        "v0.1.13 (10 July) turned that check on by default, scaffolding checks.sh from whatever fast verification the repository already has — a typecheck or lint script in package.json, or tsc if there is a tsconfig — and stopped the build agents leaving internal FR-### and section-reference tags in shipped source comments.",
      ],
    },
    {
      t: "quote",
      text: "Before checks.sh the gate could confirm that a review happened. After it, the gate is bound to the exit code of a command the reviewing model did not write.",
    },

    { t: "h", text: "The numbers" },
    p(
      "There is no benchmark. The tech report is explicit: the evaluation exists as a protocol — long-horizon coding, code review, ambiguous PRD interpretation and frontend design, with fixed prompts and tools, three runs per task, blind graders, and median-and-range reported rather than the best run — and not yet as a result.",
    ),
    p(
      "What does exist is the verification each release ran on itself, reported in its own commit message, in an isolated harness, by the session that wrote the change. They are smoke tests, and worth reading as smoke tests:",
    ),
    {
      t: "list",
      items: [
        "v0.1.11: the prompt cut was checked by four fresh-context adversarial verifiers, 18 of 18 rated SAFE.",
        "v0.1.12: 5 of 5 hook scenarios in an isolated harness — allow from a subdirectory and from the top level, block on a failing checks.sh, allow on a passing one, allow a manual commit, block on a missing gate-pass artifact.",
        "v0.1.13: 10 of 10 on the checks.sh scaffolding, covering create, executable, valid syntax, graceful degradation, tsc fallback and no-overwrite.",
        "v0.1.14: two PRDs run in both directions. A Startup-grade spec had two false premises and came back BLOCKED. A Hobby-grade spec skipped the phase entirely and made zero web calls.",
      ],
    },
    p(
      "None of those is a comparison against anything. They say the feature does what its author intended, on the cases its author chose.",
    ),

    { t: "h", text: "What it does not do yet" },
    p(
      "The counts first, because they are the number everyone quotes back. At v0.1.14 the repository lists 13 agents, 6 reusable skills and 20 design styles. Those numbers describe the package surface. They do not prove that a multi-agent run is faster, cheaper or better than a single-agent run, and nothing published so far measures that. The tech report says the same thing three ways in its limitations: agent and skill counts describe the package surface, not developer productivity; operational timing observations are not a controlled single-agent comparison; and the current benchmark matrix is incomplete and must not be summarised as a result. A controlled task set with time, cost, correctness and review outcomes is still what is missing. Until it exists, the honest claim is that this is a workflow we like using, not a workflow we have shown to be better.",
    ),
    p("The rest is specific to what shipped this week."),
    {
      t: "list",
      items: [
        "The fourfold speedup from running the four lenses in parallel is a design intent written into the coordinator's own spec, not a measurement. It has never been timed against a single pass.",
        "External grounding decides on one source. Only a contradicted verdict gets the three-vote re-check; a confirmed verdict is one search and one fetch. A claim it cannot source at all is passed along as a \"needs checking\" tag, not a finding.",
        "It skips more often than you would guess. A Hobby-grade spec with no third-party integration, a refactor, a spec with no external claims, or the --no-research flag: each of those skips the phase, and the rest of the pipeline runs on codebase grounding alone. If WebSearch is simply unavailable it skips too, and only that path flags the result degraded. Running unchanged is the safe behaviour, and it also means an ungrounded review reads much like a grounded one unless you go looking.",
        "Eight claims is the cap. A spec with twelve assumptions about a payment provider gets eight of them checked.",
        "The anti-fabrication check is absent rather than enforced when a repository has nothing to run. If v0.1.13 finds no typecheck or lint script it writes no checks.sh and blocks nothing, by design — so the strongest guarantee in the gate is opt-out by omission.",
        "Claude Code only. No CLI, no CI runner, no other editor.",
        "The verification figures above were produced by the same sessions that wrote the code. Nobody outside has reproduced them.",
      ],
    },

    { t: "h", text: "Go deeper" },
    p(
      "The workflow this release sits inside — the six stages, the three layers of shared memory, and the evaluation protocol that has not been run yet — is in the WIGTN Coding tech report. The release history, the agent definitions and the commit hook are in the repository. Both are linked at the top of this page.",
    ),
  ],
};

/**
 * Update: WIGSS v0.1.4 on npm — release note.
 *
 * Colocated post. The cover sits next to the text and is imported, so a
 * renamed or deleted file becomes a build error rather than a silent 404.
 *
 * Structure follows the release template: lede → get it → what is in the
 * release → why it exists → the numbers → what it does not do yet → go
 * deeper. "What it does not do yet" is the section that carries the post and
 * is deliberately the longest; a release note without it reads as marketing.
 *
 * Sources for every fact here, and nothing beyond them:
 *   - the public WIGSS README (github.com/wigtn/wigss) — install and CLI
 *     flags, the five CSS strategies, the requirements, the Apache 2.0
 *     licence, and the verbatim limitations list;
 *   - the npm registry metadata for `wigss` — version 0.1.4 published
 *     2026-04-03, the 0.1.0–0.1.4 version list, Node >=18, Apache-2.0;
 *   - the npm package page in the cover screenshot — 222 kB unpacked, 40
 *     files, 17 dependencies;
 *   - the `wigss` engineering note in ../../data.ts — the scan/select/edit/
 *     save loop, the StyleIntent dispatch, and the fidelity/rollback story.
 *
 * Editorial decisions a future editor would otherwise undo:
 *
 * 1. "The numbers" says there is no benchmark. That is a stated fact, not a
 *    gap waiting to be filled. No controlled speed or code-quality benchmark
 *    for WIGSS has been published, and the section says so on purpose — see
 *    the `sourceNote` on the `wigss` entry in ../../data.ts. Do not
 *    substitute feature counts for it.
 *
 * 2. The post is pinned to v0.1.4, published 2026-04-03. It is a release note
 *    for that release. If a later version ships, write a new post; do not
 *    quietly renumber this one.
 *
 * 3. No download or adoption figures, although the cover screenshot happens to
 *    show npm's counter. A live counter is not a published figure, the
 *    screenshot post-dates the release by a few days, and download counts are
 *    not evidence that the thing works.
 *
 * 4. The install line is `npx`, not `npm install`. WIGSS is a CLI you run
 *    against a dev server, and the README's quick start is npx. npm's page
 *    shows its usual `npm i wigss` box, which is not how the tool is used.
 *
 * 5. The command runs in a `quote` block because the Block union has no code
 *    block. If one is ever added, move it there.
 *
 * 6. The tech-report URL comes from `techReportHref` in ../../links, a leaf
 *    module, not from ../../data: data.ts imports this module, so pulling a
 *    *value* back out of it would close a runtime import cycle. Types are
 *    erased and are safe to import from data.
 *
 * The cover is copied from public/images/carousel/wigss-npm.png rather than
 * moved: components/sections/Pillars.tsx still reads it from public/. It is a
 * 1698x1169 PNG screenshot at 163 KB with no EXIF, so the shared README's
 * prep command is a no-op here — the resize cap is 2000px and re-encoding a
 * screenshot of text to JPEG q82 would only add artifacts. Copied byte for
 * byte on purpose.
 */

import type { Article, Block } from "../../data";
import { techReportHref } from "../../links";
import npmPackagePage from "./npm-package-page.png";

const p = (text: string): Block => ({ t: "p", text });

/* No `*_COVER` export: nothing outside this post reuses the image, and this
 * release has no MILESTONES entry. See _template/README.md — an exported
 * constant nobody imports reads as a wire someone forgot to connect. */

export const wigssNpmRelease: Article = {
  slug: "wigss-npm-release",
  kind: "report",
  channel: "newsroom",
  newsTopic: "release",
  tag: "RELEASE",
  /* Version and date both in the title: `v0.1.4` on its own stops meaning
   * anything six months from now. */
  title:
    "WIGSS v0.1.4, April 2026: drag a component in the browser and the source file rewrites itself",
  summary:
    "A CLI that wraps your running dev server in an iframe, lets you drag and resize components on the live page, and writes the change back into whichever of five CSS strategies your project actually uses. Apache 2.0, Node 18+, React and Next.js only, and no benchmark yet.",
  date: "2026.04.03",
  author: "WIGTN",
  readTime: "5 min",
  image: npmPackagePage.src,
  /* The method write-up lives on the report blog; this note links it rather
   * than restating it. Two copies of one explanation drift apart in a month. */
  externalUrl: "https://wigtn.github.io/blog/wigss/",
  links: [
    { label: "npm", href: "https://npmjs.com/package/wigss" },
    { label: "GitHub", href: "https://github.com/wigtn/wigss" },
    { label: "Tech report", href: techReportHref("wigss") },
  ],
  body: [
    p(
      "WIGSS v0.1.4 went up on npm on April 3, 2026. It is a command-line tool for the part of frontend work that coding agents are worst at, which is not producing the page but nudging it afterwards. You point it at a dev server you already have running, drag a component on the live page, and WIGSS writes the change back into the source file that produced it.",
    ),
    p(
      "Apache 2.0, Node 18 or newer, React and Next.js only. That last one is the first of several limits, and they are further down rather than buried.",
    ),

    { t: "h", text: "Get it" },
    p(
      "Nothing is added to your dependency list. Start your dev server the way you always do, then open a second terminal:",
    ),
    { t: "quote", text: "npx wigss@latest --port <your-port-number>" },
    p(
      "That starts the editor on port 4000 with your page loaded inside it. The --wigss-port flag moves the editor if 4000 is taken, and npx wigss@latest --demo runs the whole thing against a built-in demo page if you have no project handy. WIGSS reads OPENAI_API_KEY, takes --key, or asks for a key on first run. If you installed wigss globally at some point, uninstall it first, or npx will keep serving the old copy. The npm page shows its usual npm i wigss install box; ignore it, this is a CLI you run, not a dependency you add.",
    ),
    {
      t: "image",
      src: npmPackagePage.src,
      alt: "The npm package page for wigss at version 0.1.4, showing the readme with the WIGTN logo and the Quick Start commands, and a sidebar listing the GitHub repository, the version, the Apache-2.0 licence, unpacked size, file count and weekly downloads.",
      caption:
        "wigss on npm: v0.1.4, Apache-2.0, 222 kB unpacked across 40 files. Captured a few days after publishing, which is why the header says three days ago.",
    },

    { t: "h", text: "What is in the release" },
    {
      t: "list",
      items: [
        "The wigss CLI at v0.1.4, published to npm on April 3, 2026. It is the fifth release of the package: 0.1.0 through 0.1.4.",
        "Five CSS strategies, detected from your project rather than configured: Tailwind utility classes, CSS Modules, plain CSS or SCSS, an HTML file with a linked stylesheet, and inline React styles as the universal fallback.",
        "Save-time verification. Every save produces a rollback token and a set of fidelity expectations, then compares the post-apply DOM against what you designed within a two-pixel tolerance. A mismatch is surfaced as a warning with a one-click rollback, not reported as a successful refactor.",
        "Apache 2.0, and the whole source on GitHub. 222 kB unpacked, 40 files, 17 dependencies.",
      ],
    },
    p(
      "What is not in it, because an omission found later reads as a claim withdrawn. There is no model and no hosted service: the component detection, the design suggestions, the drag feedback and the chat all call GPT-4o with your own OpenAI key, and without a key those four do not run. The refactoring is the half that never calls a model at all. Strategy detection, the Tailwind class mapping, the PostCSS work on CSS files and the Babel work on inline styles are ordinary code, which is the reason a save is reproducible and a suggestion is not.",
    ),

    { t: "h", text: "Why it exists" },
    p(
      "Coding agents are good at the first layout and bad at the second pass. \"Make this card a bit wider\" is easy to say and slow to land: you describe a visual intent in prose, a model turns the prose into a class, and you go back to the browser to find out whether it worked. Then you do it again. The loop is short enough to feel fine and long enough to eat an afternoon.",
    ),
    p(
      "WIGSS keeps the browser as the editing surface and the source file as the artifact. The editor runs on its own port with your dev server held in an iframe; a DOM scan labels navigation, cards, footers and repeated component groups and maps them back to files; drag and resize events stream over a WebSocket. On save the visual change becomes a StyleIntent, gets dispatched to whichever rewriter matches your project, and lands as a targeted diff. Adding a language means adding a rewriter and nothing else. The long version of that pipeline is in the tech report.",
    ),

    { t: "h", text: "The numbers" },
    p(
      "There are none. No controlled speed or code-quality benchmark has been published for WIGSS: no time-to-edit comparison against writing the CSS by hand, no diff-quality study, and no measure of how often the two-pixel check passes on a codebase we did not write. The counts in the README, five CSS strategies and five agent actions, describe a package surface rather than a result, and we would rather say that than let a feature list stand in for evidence.",
    ),

    { t: "h", text: "What it does not do yet" },
    p(
      "The README carries these and so does this post, because they are what decides whether WIGSS is worth your afternoon.",
    ),
    {
      t: "list",
      items: [
        "React JSX only. Vue, Svelte and Angular are not supported. The one non-React path is a plain .html file with a linked stylesheet, which the strategy detector does handle.",
        "Selectors are handled simply. Compound selectors like .card.active and pseudo-selectors like :hover have basic support, which means the rules most worth editing are also the ones most likely to need a look afterwards.",
        "The WebSocket has origin validation and rate limiting, and no token auth. This is a local development tool and it should stay on localhost.",
        "Single user. There is no shared session and nothing reconciles two people editing the same page.",
        "An applied diff is validated to touch className and style only, never JavaScript. That is a deliberate safety property rather than a shortcoming, but it does bound what a visual edit can be: WIGSS restyles markup, it does not restructure it.",
      ],
    },
    p(
      "None of those come with a version number attached. The README says \"not yet supported\" and stops there, and putting a milestone in a release note that the repository has not committed to is the wrong kind of promise.",
    ),

    { t: "h", text: "Go deeper" },
    p(
      "How a DOM node is mapped back to the source file that produced it, and how one apply path stays honest across five very different CSS strategies, is in the WIGSS tech report. The CLI flags, the architecture and the current limitations are in the README.",
    ),
  ],
};

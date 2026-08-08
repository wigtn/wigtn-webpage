/**
 * Update: WIGSS v0.1.4 on npm - announcement.
 *
 * Colocated post. The cover sits next to the text and is imported, so a
 * renamed or deleted file becomes a build error rather than a silent 404.
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
 * Sources for every fact here, and nothing beyond them:
 *   - the public WIGSS README (github.com/wigtn/wigss): install and CLI
 *     flags, the five CSS strategies, the requirements, the Apache 2.0
 *     licence, and the framework and runtime requirements;
 *   - the npm registry metadata for `wigss`: version 0.1.4 published
 *     2026-04-03, the 0.1.0 to 0.1.4 version list, Node >=18, Apache-2.0;
 *   - the npm package page in the cover screenshot: 222 kB unpacked, 40
 *     files, 17 dependencies;
 *   - the `wigss` engineering note that used to sit in ../../data.ts, for the
 *     fidelity and rollback behaviour quoted in "What shipped".
 *
 * Editorial decisions a future editor would otherwise undo:
 *
 * 1. There is still no published benchmark for WIGSS, and the summary says so.
 *    The detail of what has and has not been measured lives in the tech report,
 *    which is where a reader chasing a number will go. Do not substitute
 *    feature counts for it in this post.
 *
 * 2. The post is pinned to v0.1.4, published 2026-04-03. It is an announcement
 *    for that release. If a later version ships, write a new post; do not
 *    quietly renumber this one.
 *
 * 3. No download or adoption figures, although the cover screenshot happens to
 *    show npm's counter. A live counter is not a published figure, and download
 *    counts are not evidence that the thing works. Note the screenshot was
 *    taken a few days after publishing, and its header reads "3 days ago", so it
 *    is a picture of the package page, not of launch day. It runs as the cover
 *    only; there is no second copy of it in the body.
 *
 * 4. The install line is `npx`, not `npm install`. WIGSS is a CLI you run
 *    against a dev server, and the README's quick start is npx. npm's page
 *    shows its usual `npm i wigss` box, which is not how the tool is used.
 *
 * 5. The command runs in a `quote` block because the Block union has no code
 *    block. If one is ever added, move it there. One command belongs in a
 *    quote; a sequence belongs in a list, because a quote is a single
 *    paragraph and the browser collapses whatever you use to fake a break.
 *
 * 6. The tech-report URL comes from `techReportHref` in ../../links, a leaf
 *    module, not from ../../data: data.ts imports this module, so pulling a
 *    *value* back out of it would close a runtime import cycle. Types are
 *    erased and are safe to import from data.
 *
 * The cover is copied from public/images/carousel/wigss-npm.png rather than
 * moved: components/sections/Pillars.tsx still reads it from public/. It is a
 * 1698x1169 PNG screenshot at 163 KB with no EXIF, so the shared README's
 * prep command is a no-op here. The resize cap is 2000px and re-encoding a
 * screenshot of text to JPEG q82 would only add artifacts. Copied byte for
 * byte on purpose.
 */

import type { Article, Block } from "../../data";
import { techReportHref } from "../../links";
import npmPackagePage from "./npm-package-page.png";

const p = (text: string): Block => ({ t: "p", text });

/* No `*_COVER` export: nothing outside this post reuses the image, and this
 * release has no MILESTONES entry. See _template/README.md. An exported
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
  readTime: "2 min",
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
      "Apache 2.0, Node 18 or newer, React and Next.js only. That last one is a real limit, and it is one of several the tech report sets out in full.",
    ),

    { t: "h", text: "Get it" },
    p(
      "Nothing is added to your dependency list. Start your dev server the way you always do, then open a second terminal:",
    ),
    { t: "quote", text: "npx wigss@latest --port <your-port-number>" },
    p(
      "That starts the editor on port 4000 with your page loaded inside it. The --wigss-port flag moves the editor if 4000 is taken, and npx wigss@latest --demo runs the whole thing against a built-in demo page if you have no project handy. WIGSS reads OPENAI_API_KEY, takes --key, or asks for a key on first run. If you installed wigss globally at some point, uninstall it first, or npx will keep serving the old copy. The npm page shows its usual npm i wigss install box; ignore it, this is a CLI you run, not a dependency you add.",
    ),
    /* No image block here. The npm page screenshot is already the cover, one
     * screen up, and the same frame twice in one scroll reads as a mistake.
     * The facts its caption carried, 222 kB across 40 files, are in the list
     * below, which is where a reader looking for them would go anyway. */

    { t: "h", text: "What shipped" },
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

    { t: "h", text: "Read the report" },
    p(
      "How a DOM node is mapped back to the source file that produced it, and how one apply path stays honest across five very different CSS strategies, is in the WIGSS tech report. The CLI flags, the architecture and the current limitations are in the README.",
    ),
  ],
};

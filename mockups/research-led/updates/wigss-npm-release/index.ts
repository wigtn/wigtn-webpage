/**
 * Update: WIGSS v0.1.4 on npm - announcement.
 *
 * Follows updates/_template/announcement/STRUCTURE.md: lede -> what it does ->
 * get it -> what shipped -> read the report.
 *
 * NO COVER, and the folder holds no image. It had one, a screenshot of the npm
 * package page, deleted with this change along with its import. A release page
 * is read to find out what the thing does and how to run it, and a picture of a
 * registry listing answers neither. The two facts the screenshot was cited for,
 * 222 kB unpacked across 40 files, were already in "What shipped" and stay
 * there, sourced to the npm page itself rather than to a photograph of it.
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
 *   - the npm package page itself: 222 kB unpacked, 40 files, 17
 *     dependencies;
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
 * 3. No download or adoption figures, although the npm page shows a counter.
 *    A live counter is not a published figure, and download counts are not
 *    evidence that the thing works.
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
 */

import type { Article, Block } from "../../data";
import { techReportHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const wigssNpmRelease: Article = {
  slug: "wigss-npm-release",
  kind: "report",
  channel: "newsroom",
  newsTopic: "release",
  tag: "RELEASE",
  /* The title used to be "WIGSS v0.1.4, April 2026: drag a component in the
   * browser and the source file rewrites itself", on the rule that a bare
   * version means nothing six months later. The rule stands and the row still
   * obeys it: the version moved to `version` and the date is beside it, both
   * rendered in the left rail. The title is free to be the product name. */
  title: "WIGSS",
  version: "v0.1.4",
  summary:
    "Drag and resize components on your running dev server, and the source file rewrites itself into whichever of five CSS strategies the project already uses.",
  date: "2026.04.03",
  author: "WIGTN",
  readTime: "2 min",
  /* The method write-up lives on the report blog; this note links it rather
   * than restating it. Two copies of one explanation drift apart in a month. */
  externalUrl: "https://wigtn.github.io/blog/wigss/",
  links: [
    { label: "npm", href: "https://npmjs.com/package/wigss" },
    { label: "GitHub", href: "https://github.com/wigtn/wigss" },
    { label: "Tech report", href: techReportHref("wigss") },
  ],
  /* Full publish history, from the npm registry document for `wigss`
   * (registry.npmjs.org/wigss) on 2026-08-09, read off its `time` map with
   * `created` and `modified` dropped. Five versions, 0.1.0 to 0.1.4, which the
   * registry reports as the current `latest`.
   *
   * THE NOTES COME FROM COMMITS. `gh api repos/wigtn/wigss/releases` returns
   * an empty list and the repository has no tags at all, so there is no
   * per-version text to quote and each line below is written from the commit
   * subjects that fall in that version's window.
   *
   * HOW THE WINDOWS WERE DRAWN, because this is the part that would otherwise
   * be guesswork. Two versions were published within 96 minutes of each other
   * on 2026-03-30, so a date is not enough to say which commit went into
   * which. The publish timestamps from the registry were compared against
   * commit timestamps from
   * `gh api "repos/wigtn/wigss/commits?per_page=100"`, both in UTC, and a
   * commit belongs to the first version published after it:
   *   - 0.1.0, published 08:09:19 on 03-28. Everything up to 08:09:00, which
   *     is the whole first push of the project.
   *   - 0.1.1, published 12:52:45 on 03-30. One commit, 12:49:08, and its
   *     subject already carries "(v0.1.1)".
   *   - 0.1.2, published 14:28:36 on 03-30. Three commits from 12:59 to 13:02
   *     plus "chore: Bump version to 0.1.2" at 14:28:01, 35 seconds before the
   *     publish.
   *   - 0.1.3, published 17:00:44 on 04-02. Everything from 15:56 on 03-30
   *     onward, which is where the Apache 2.0 licence, the CSS strategies, the
   *     AST rewriting and the test suite actually landed, and it ends with a
   *     commit whose subject carries "v0.1.3".
   *   - 0.1.4, published 09:41:46 on 04-03. The commit subjected "chore: v0.1.4
   *     ..." at 09:42:32, which is 46 seconds AFTER the publish. It is counted
   *     here anyway because it names the version it belongs to; the ordering
   *     just says the tree was published and then committed.
   *
   * WHAT THIS COSTS: 0.1.4 is the version this post is written about, and the
   * window shows it is a metadata release. That is not a criticism of the post,
   * which never claimed otherwise, but it is the sort of thing a reader can now
   * see, and it should stay visible rather than be smoothed over.
   *
   * Versions here carry no leading "v", because that is how npm names them and
   * how `npm i wigss@0.1.4` is typed. The two plugins tag with a "v" and keep
   * it for the same reason. The lists are not inconsistent; each follows its
   * own registry. */
  versions: [
    {
      version: "0.1.4",
      date: "2026.04.03",
      note: "Package metadata enriched for search and retrieval, and the WIGTN logo added.",
    },
    {
      version: "0.1.3",
      date: "2026.04.02",
      note: "Four CSS strategies supported rather than one (Tailwind, inline style, CSS Modules, plain CSS), rewriting moved onto @babel/parser and postcss, Apache 2.0 applied, and the test suite grown to 252.",
    },
    {
      version: "0.1.2",
      date: "2026.03.30",
      note: "Dead code removed, the demo target excluded from the published package, and a data-flow diagram added to the READMEs.",
    },
    {
      version: "0.1.1",
      date: "2026.03.30",
      note: "False GPT-5.4 claims corrected, with memory-leak, performance and security fixes.",
    },
    {
      version: "0.1.0",
      date: "2026.03.28",
      note: "First publish. Tailwind rewriting done directly instead of through a model, a live iframe preview, and one-click save with safe diffs.",
    },
  ],
  body: [
    p(
      "WIGSS v0.1.4 went up on npm on April 3, 2026, the first release of it we have written up. It is a command-line tool for the part of frontend work that coding agents are worst at, which is not producing the page but nudging it afterwards.",
    ),

    { t: "h", text: "What it does" },
    p(
      "You point it at a dev server you already have running, drag a component on the live page, and WIGSS writes the change back into the source file that produced it. It reads which of five CSS strategies your project uses and writes in that one, so the diff looks like something you would have typed.",
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

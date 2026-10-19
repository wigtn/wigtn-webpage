/**
 * MOCKUP DATA: research-led renewal
 * ------------------------------------------------------------------
 * Now filled with REAL WIGTN content (sourced from constants/*.ts):
 * papers/models, hackathon awards, open source, team, partners, videos.
 *
 * Per the strategy, Projects/Products (WIGEX, WIGVU consumer apps) are
 * intentionally excluded, since this is a research-led site. WigtnOCR / WIGVO
 * appear under Research because they are papers/models, not products.
 *
 * Community (meetups/seminars) has not happened yet, so there are no entries
 * for it. The `community` topic stays in the taxonomy for the first real one.
 *
 * Pure, serializable data (no React/icons) so the static-export route can
 * import it. Stands in for the future MDX-backed content model.
 */

/* Every newsroom post now lives in `updates/<slug>/`, where the text sits next
 * to its own images and those images are imported rather than referenced by a
 * public path. A deleted or renamed photo is a build error instead of a silent
 * 404, and each file ships with a content hash so a changed photo can never be
 * served from a stale cache.
 *
 * There are no inline entries left. Every article in ARTICLES is an imported
 * post module, and nothing new should be written inline here.
 *
 * Templates live in updates/_template/, one per kind of post: conference,
 * hackathon, release, community. Read its README before starting a new one:
 * the outline that suits a hackathon is not the one that suits a release. */
/* The four conference and hackathon posts left for the WIGTN Tech feed on
 * 2026-08-09 and came back the same day. They carry channel: "story" and
 * render at /story/<slug>, under the rows that summarize them; their covers
 * ship from the post folders again, which is why ./milestones is gone. */
import type { StaticImageData } from "next/image";
import { ACL_2026_COVER, acl2026SanDiego } from "./updates/acl-2026-san-diego";
/* The IWSLT talk photo, which the homepage milestone rail shows for IWSLT 2026.
 * The post exports only its cover, so the file is imported directly. Importing
 * a post folder's file is safe here: data.ts may read a post folder, a post may
 * never read data.ts (see AGENTS.md, Hard rules). */
import iwsltTalk from "./updates/acl-2026-san-diego/iwslt-talk.jpg";
import { OBA_WEEKENDTHON_COVER, obaWeekendthonTop6 } from "./updates/oba-weekendthon-top6";
import { obaWeekendthon2026Top6 } from "./updates/oba-weekendthon-2026-top6";
import { SNOWFLAKE_2026_COVER, snowflakeKorea2026 } from "./updates/snowflake-korea-2026";
import { TRAE_SEOUL_COVER, traeSeoulGrandPrize } from "./updates/trae-seoul-grand-prize";
import { snowflakeKorea2026TechTrack } from "./updates/snowflake-korea-2026-tech-track";
import { traeSeoul2026GrandPrize } from "./updates/trae-seoul-2026-grand-prize";
import { wigssNpmRelease } from "./updates/wigss-npm-release";
import { wigtnCodexRelease } from "./updates/wigtn-codex-release";
import { wigtnCodingRelease } from "./updates/wigtn-coding-release";
import { wigtnocrOpenSource } from "./updates/wigtnocr-open-source";
import { wigvoAcl2026 } from "./updates/wigvo-acl-2026";

/* No trailing slashes: the Pages build exports flat files (`team.html`), so
 * `/team` is the URL that resolves and `/team/` 404s. See next.config.ts. */
export const HOME = "/";
/* /news until 2026-08-09. The page is called Notices now and its URL says so;
 * the old one still exports, as a redirect, through RETIRED below. */
export const NOTICES = `${HOME}notices`;
export const TEAM_PAGE = `${HOME}team`;
export const articleHref = (slug: string) => `${HOME}${slug}`;

/* These now live in ./links, because posts under `updates/` need them and
 * cannot import a value from this module without closing a cycle. See the
 * comment in links.ts. Imported as well as re-exported: NAV below uses
 * several locally, and `export ... from` creates no local binding.
 * STORY_INDEX moved there too (posts link story pages), so /story has no
 * local constant of its own. */
import {
  BLOG_INDEX,
  STORY_INDEX,
  TECH_REPORT_INDEX,
  TECH_REPORT_SITE,
  blogHref,
  storyHref,
  techReportHref,
} from "./links";
export {
  BLOG_INDEX,
  STORY_INDEX,
  TECH_REPORT_INDEX,
  TECH_REPORT_SITE,
  blogHref,
  storyHref,
  techReportHref,
};

/* Reference-led structure (Next Securities / MakinaRocks): the homepage is
 * a short teaser; depth lives on these sub-pages. Nav points to pages, not
 * in-page anchors.
 *
 * Tech is the one external item: it hands the reader to WIGTN Tech's report
 * index, that site's front door for findings. The nav carried a WIGTN Tech
 * dropdown with Tech and Feed under it while the stories lived on the feed;
 * the stories came back on-site, which left the menu one destination, and a
 * menu of one is a link. The `children` machinery went with it.
 *
 * No Blog tab. The section is closed until it has business-track content of
 * its own; docs/blog-section.md is the gate and the reopening steps. While
 * it mirrored Story it was two names in the nav for one list.
 *
 * No Projects tab. The page it pointed at, /work, is retired and redirects
 * to /story. Restoring the tab means deciding what it should point at first,
 * not adding a line. */
/* `disabled` was on this type and no entry ever set it, while all three nav
 * surfaces carried a branch for it. Both are gone. A nav item that should
 * not be clickable yet is an item that should not be in NAV yet. */
export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "About", href: TEAM_PAGE },
  /* "Products" since 2026-10-19 (it was "Notice"). The page is still the
   * release ledger at /notices; WIGTN's own products will be promoted from
   * the homepage when they launch, and this page changes with them. */
  { label: "Products", href: NOTICES },
  { label: "Story", href: STORY_INDEX },
  /* Trailing slash on purpose: the report site builds with trailingSlash, so
   * the bare URL 301s. Linking the final URL saves that round trip. */
  { label: "Tech", href: TECH_REPORT_INDEX },
];

/* ── The module kit (retained, unrendered) ──────────────────────────────────
 *
 * The homepage's answer to what the web half of the business was, until
 * 2026-10-19, when the Solutions panel moved to enterprise projects
 * (PROJECT_ROWS below). WEB_ROWS, ModuleCard in ResearchLedHome.tsx and the
 * eight files in public/images/modules/ are kept by decision for a surface
 * that wants the kit back; nothing renders them today.
 *
 * Why a kit: a portfolio says we finished some jobs; a kit says the next one
 * starts from something already built and already under test, which is
 * nearer to what a client is buying.
 *
 * FOUR MODULES, AND THE OTHER SIX ARE LEFT OUT AFTER COUNTING. The `module/`
 * directory in wigtn/web-agency holds ten, and on 2026-08-16 they were counted
 * rather than assumed:
 *
 *     ui-kit                   69 source files, 31 test files
 *     backoffice-frame         20              5
 *     ai-pipeline-sdk          18             14
 *     notification-file        14              7
 *     api-contracts             7              5   README: "v0 skeleton"
 *     auth-membership           2              2
 *     content-engine            2              2
 *     portfolio-showcase        2              1
 *     project-scaffold-deploy   0             10
 *     company-review            0              0
 *
 * The four here are the four with a body of code behind them and a running
 * surface a visitor can open. `api-contracts` says in its own README that it is
 * a scaffold skeleton awaiting a contract, and `company-review` is empty.
 * Putting either on a homepage would be the overclaim the web-agency brief
 * spends a section banning. When one fills out, it earns a row.
 *
 * NO TOTAL IS QUOTED for the same reason. "Ten modules" is true of the folder
 * and false about what is ready, and a client who counted would find two of the
 * ten empty.
 *
 * `role` leads and `name` follows, because "backoffice-frame" is a folder and
 * "the room your team works in" is the thing being bought. The descriptions are
 * the modules' own README and package descriptions put into English, with no
 * capability added on the way across. */
export type PracticeRow = {
  slug: string;
  /* The title, and it is the thing's own name. The rows were titled with a
   * plain-language sentence for a while ("The look, decided once") and the
   * name was demoted to a footnote, which read as four slogans with the
   * products hidden under them. The reference titles its rows AIP, Gotham,
   * Foundry: a name a reader can carry away and ask for. */
  name: string;
  /* One line. Not two, and not a paragraph: the row is an index entry, and the
   * report or the demo behind it is where the detail lives. If it needs a
   * second sentence the row is doing the page's job for it. */
  line: string;
  /* Where the row goes, when it goes anywhere. A web row opens the module
   * running in the demo. A project or a paper row has nothing public to open,
   * so it has no href and renders as text rather than pretending to be a link
   * that does nothing. */
  href?: string;
  /* The small line under the blurb. It names the artifact and where it is, so
   * the row says what it is offering evidence of before it is clicked. */
  meta: string;
  /* The picture that appears when the row is pointed at. A composition, not a
   * screenshot: built as HTML, rendered at 2x with Playwright, shipped at
   * 1000px. Four of them share one stylesheet, so the lighting and the
   * component set are identical across the set.
   *
   * EACH ONE IS A CROP, NOT A SCREEN. The first pass drew the whole product
   * for every module and all four came out as the same dark admin page with a
   * sidebar; at the 344px the hover frame gives them, nothing told them apart
   * and none of them said which module it belonged to. Each now shows the one
   * thing that makes that module that module and nothing else: the token ramp
   * beside the same card in both themes, the operator queue with its counts,
   * the three safety gates with the number they held, the mail that went out
   * beside the rule that stopped one. Legible at thumbnail size is the whole
   * requirement; if a new one needs a caption to be understood, it is drawing
   * too much.
   *
   * Hover-only on purpose. The row has to read without it, because a phone has
   * no hover and a keyboard arrives through focus rather than a pointer.
   * Nothing in the copy depends on the picture being seen.
   *
   * Scene sources are in the session scratchpad as art/scene-*.html. To change
   * one, edit the scene and re-render rather than retouching the JPEG. */
  /* Optional. The four web modules have compositions and the open-source rows
   * have their WIGTN Tech cover art; project and paper rows do not, because
   * inventing a picture for an engagement or a published paper would be
   * dressing. They carry a `logo` instead. */
  image?: string;
  /* The image file's own size. Set on the open-source rows, whose cover art
   * is also the social card of the release page the row opens. */
  imageSize?: { width: number; height: number };
  /* The same composition, moving. Five seconds, looped, VP8, one per module.
   *
   * It is the poster that runs rather than a different picture: the scene HTML
   * gained a 5s animation and was recorded, so the still and the clip are the
   * same frame set. Nothing new is drawn; what is already there arms, lands or
   * resolves, which is the module doing its job rather than decoration.
   *
   * The JPEG stays and is the video's poster. It shows instantly, it is what a
   * browser that cannot decode VP8 keeps, and it is what renders under
   * prefers-reduced-motion, where the clip never starts. */
  clip?: string;
  /* The organisation's own logo, for a project or a paper row: the client or
   * partner, or the venue. Shown contained on a white tile so it keeps its own
   * colours in both themes. Only an official or public-domain file goes here
   * (sources are listed beside PROJECT_ROWS and PAPER_ROWS). */
  logo?: string;
};

/* Where the modules are running, so a row can be opened rather than believed. */
const MODULE_DEMO = "https://portfolio-recruit-platform.vercel.app";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WEB_ROWS: PracticeRow[] = [
  {
    slug: "ui-kit",
    name: "UI Kit",
    line:
      "Tokens for light and dark, a brand theme, a schema-driven form renderer.",
    href: `${MODULE_DEMO}/`,
    meta: "Live at /",
    image: "/images/modules/ui-kit.jpg",
    clip: "/images/modules/ui-kit.webm",
  },
  {
    slug: "backoffice-frame",
    name: "Back office",
    line:
      "A tool registry, screen layout validation, an outbox batch runner.",
    href: `${MODULE_DEMO}/admin`,
    meta: "Live at /admin",
    image: "/images/modules/backoffice-frame.jpg",
    clip: "/images/modules/backoffice-frame.webm",
  },
  {
    slug: "ai-pipeline-sdk",
    name: "AI pipeline",
    line:
      "Answers filtered, moderated, held for a person. Strength is an operator setting.",
    href: `${MODULE_DEMO}/admin/ai`,
    meta: "Live at /admin/ai",
    image: "/images/modules/ai-pipeline-sdk.jpg",
    clip: "/images/modules/ai-pipeline-sdk.webm",
  },
  {
    slug: "notification-file",
    name: "Notifications",
    line:
      "Mail, in-app notices, recipient rules, expiring upload ports.",
    href: `${MODULE_DEMO}/admin/inquiries`,
    meta: "Live at /admin/inquiries",
    image: "/images/modules/notification-file.jpg",
    clip: "/images/modules/notification-file.webm",
  },
];

/* ── Solutions: enterprise projects ─────────────────────────────────────────
 *
 * What the Solutions team has delivered or is delivering, one row per
 * organisation, each with its logo. They replaced the web module kit on
 * 2026-10-19, and the AX stages that sat under the other half (Consulting,
 * Evaluation, Feedback) went with that change; consulting is now one of the
 * panel's keywords rather than a row.
 *
 * EACH ROW STATES THE RELATIONSHIP AS IT IS. SK hynix is an end client reached
 * through Braincrew, so its row says "With Braincrew" and the Braincrew row is
 * the partnership itself; a row that read as a direct SK hynix contract would
 * overstate it. The /team wall (PARTNERS_AND_CLIENTS) keeps its stricter rule
 * of direct relationships only, which is why SK hynix is here and not there.
 *
 * Logos: Braincrew and Mind AI are the files the wall uses. SK hynix is
 * Wikimedia Commons "File:SK_Hynix.svg" (public domain as a simple logo,
 * author SK Hynix Inc., trademarked); the company's own site serves it only
 * as a 92x48 PNG. Dates match MILESTONES. */
const PROJECT_ROWS: PracticeRow[] = [
  {
    slug: "sk-hynix",
    name: "SK hynix",
    line: "Global One ERP (i\u2011ERP) Platform development.",
    meta: "With Braincrew · 2026.10",
    logo: "/images/partners/sk-hynix.svg",
  },
  {
    slug: "braincrew",
    name: "Braincrew",
    line: "AX project partnership.",
    meta: "Partner · 2026.10",
    logo: "/images/partners/braincrew.svg",
  },
  {
    slug: "mind-ai",
    name: "Mind AI",
    line: "Closed beta test partner for MEGA Code.",
    meta: "Partner · 2026.06",
    logo: "/images/partners/mind-ai.svg",
  },
];

/* ── R&D: accepted papers ────────────────────────────────────────────────────
 *
 * One row per venue, sourced like MILESTONES from the org profile's Papers
 * list (github.com/wigtn/.github, profile/README.md). The meta pairs the
 * track with the panel keyword the paper stands for: WIGVO is speech in and
 * speech out (STT-TTS), RCPS is an evaluation protocol, MDI measures an LLM
 * judge (LLM).
 *
 * Logos are the venues' own files: ACL 2026 and EMNLP 2026 from their
 * conference sites (the EMNLP file is 8703px wide at source and is shipped at
 * 1200), NeurIPS from neurips.cc with a viewBox added so it scales. */
const PAPER_ROWS: PracticeRow[] = [
  {
    slug: "acl-2026",
    name: "ACL 2026",
    line: "WIGVO: real-time speech translation over phone calls.",
    meta: "System Demonstrations · STT-TTS",
    logo: "/images/venues/acl-2026.png",
  },
  {
    slug: "emnlp-2026",
    name: "EMNLP 2026",
    line: "RCPS: choosing document parsers by retrieval.",
    meta: "Industry Track · Evaluation",
    logo: "/images/venues/emnlp-2026.png",
  },
  {
    slug: "neurips-2026",
    name: "NeurIPS 2026",
    line: "MDI: the minimum detectable improvement of an LLM judge.",
    meta: "TAE Workshop · LLM",
    logo: "/images/venues/neurips.svg",
  },
];

/* ── Product: open-source releases ──────────────────────────────────────────
 *
 * The three tools on the /notices ledger that are not a model: WIGSS and the
 * two WIGTN plugins. Product showed "Coming soon" until 2026-10-19; these are
 * what the team has shipped so far, and WIGTN's own product will take the
 * panel's lead when it launches.
 *
 * Each row opens its release post, which carries every version. The lines are
 * cut from those posts and from the WIGTN Tech reports, adding nothing. The
 * pictures are the reports' cover art, copied from wigtn-tech-report
 * (public/images/projects/) at 960px: WIGSS's own banner, and the Claude Code
 * and Codex brand images the plugin reports use to name the tool each plugin
 * runs in. */
const OPEN_SOURCE_ROWS: PracticeRow[] = [
  {
    slug: "wigss",
    name: "WIGSS",
    line: "Drag a component on your dev server and the source file rewrites itself.",
    href: articleHref(wigssNpmRelease.slug),
    meta: "npm · Open source",
    image: "/images/products/wigss.jpg",
    imageSize: { width: 960, height: 640 },
  },
  {
    slug: "wigtn-plugin-claude-code",
    name: "WIGTN Plugin for Claude Code",
    line: "Product workflows for Claude Code, with a gate on what leaves the machine.",
    href: articleHref(wigtnCodingRelease.slug),
    meta: "Claude Code · Open source",
    image: "/images/products/wigtn-plugin-claude-code.jpg",
    imageSize: { width: 960, height: 540 },
  },
  {
    slug: "wigtn-plugin-codex",
    name: "WIGTN Plugin for Codex",
    line: "Requirements, verification and release decisions, reusable in Codex.",
    href: articleHref(wigtnCodexRelease.slug),
    meta: "Codex · Open source",
    image: "/images/products/wigtn-plugin-codex.jpg",
    imageSize: { width: 960, height: 540 },
  },
];

/* The cover art a release page shares as its social card: the Product
 * panel's picture for the product that page releases. WigtnOCR has no row
 * there, so its page uses the site's default card. */
export function releaseCoverFor(slug: string) {
  const row = OPEN_SOURCE_ROWS.find((r) => r.href === articleHref(slug));
  return row?.image && row.imageSize ? { src: row.image, ...row.imageSize, name: row.name } : undefined;
}

/* ── The three teams ─────────────────────────────────────────────────────────
 *
 * What we do used to state the lines of business as two cards with keyword
 * tags, which is the shape every agency site uses and says nothing either of
 * them could not say. Then they were two stacked bands, one practice each,
 * which was honest but ran to about 1,800px of page for seven items. Then two
 * halves of one section that open when pointed at, so the whole business fit
 * in 432px and the reader chose which half spent it.
 *
 * Since 2026-10-19 the panels are WIGTN's three teams, in the order the
 * company names them: Solutions, Product, Research. Solutions shows its
 * enterprise projects and Research its accepted papers, each row with a logo
 * (the kickers were "Web Agency" and "AX Agency"; the slugs stay "web" and
 * "ax" as identities). Product shows the open-source tools, each with its
 * cover art, and links them to their release posts.
 *
 * Leads are cut to what fits a 240px column. */
export type Practice = {
  /* Identity for the open state, and the React key. */
  slug: string;
  /* The team's name, set as a micro-label. It says which of the three this
   * is; the heading has a harder job. */
  kicker: string;
  /* The heading. "We build it" says what Solutions does; R&D is the
   * Research team's own name for its work, with what it does in `subtitle`.
   * Product's is "We ship it". */
  title: string;
  /* A second line under the heading that appears only when the panel opens,
   * so the resting panels stay one heading each. */
  subtitle?: string;
  lead?: string; // absent while a team has nothing to describe
  /* The team's areas, set as small chips under the lead. Hidden on a folded
   * panel with the lead. */
  keywords?: string[];
  /* How much is behind this panel, said before it opens. It is the closest
   * thing the section has to an affordance: "4 modules" tells a reader there
   * is something under the pointer without drawing a button that is not
   * there. Absent when nothing is behind it; the disclosure button stays for
   * the keyboard and shows only its rule. */
  cue?: string;
  rows: PracticeRow[];
};

export const PRACTICES: Practice[] = [
  {
    slug: "web",
    kicker: "Solutions",
    title: "We build it",
    lead: "AX for enterprises, from consulting to the systems that run it.",
    keywords: ["AX Consulting", "System Integration"],
    cue: "3 projects",
    rows: PROJECT_ROWS,
  },
  {
    slug: "product",
    kicker: "Product",
    title: "We ship it",
    lead: "Open-source tools we build and use ourselves.",
    keywords: ["Open Source", "Coding Agents"],
    cue: "3 releases",
    rows: OPEN_SOURCE_ROWS,
  },
  {
    slug: "ax",
    kicker: "Research",
    title: "R&D",
    subtitle: "We publish it",
    lead: "Peer-reviewed research on LLMs, their evaluation, and speech.",
    keywords: ["LLM", "Evaluation", "STT-TTS"],
    cue: "3 papers",
    rows: PAPER_ROWS,
  },
];

/* CAPABILITIES, the four-pillar record list (published research, open models,
 * reports with their limits, hackathon placings), was deleted when /team went
 * back to "Who we are." and no surface rendered it. The claims themselves
 * still live where they are checkable: the posts, MILESTONES, and the report
 * site. It is in the git history if a surface wants the list back. */

/* The /team logo wall. Only companies WIGTN holds a direct relationship with:
 * a partner, or a client that contracted WIGTN itself. An end client reached
 * through someone else's contract is neither, so it stays off this list.
 * `logo` is a file under public/images/partners/ whose viewBox is trimmed to
 * the artwork, so every logo renders at the same height; without one the
 * name is set in type at that height. */
export type Company = {
  name: string;
  logo?: string;
  /* How tall the logo sits, in the row's unit (its font-size; 56px from xl).
   * Wordmarks about six times wider than tall sit at 0.85; the stacked
   * Arustay mark would be a sliver at that height, so it sits at 2 to read
   * at a similar weight. The wordmarks were at 1 until 2026-10-20, which
   * made Arustay look small beside them. */
  height?: number;
};

/* Arustay's logo is a stacked mark (an arch over ARU / STAY). It was supplied
 * as a raster with a baked-in checkerboard and an image generator's sparkle in
 * the corner; arustay.svg is a potrace of the brown ink alone, so neither came
 * across, in the ink's own colour (#644e41). */
export const PARTNERS_AND_CLIENTS: Company[] = [
  { name: "Braincrew", logo: "/images/partners/braincrew.svg", height: 0.85 },
  { name: "Mind AI", logo: "/images/partners/mind-ai.svg", height: 0.85 },
  { name: "Arustay", logo: "/images/partners/arustay.svg", height: 2 },
];

/* The /team Sponsor row, under Partners: AWS, through its startup programme,
 * since 2026-10-20. Not on the Partners wall, which holds direct partners and
 * clients; WIGTN is not an AWS Partner Network member. Use of the logo was
 * cleared by the AWS Startups team (confirmed by the founder, 2026-10-20).
 *
 * aws-startups.svg is the AWS Startups lockup ("aws" mark, "startups"), built
 * from the 300x79 white PNG of it supplied with that clearance. The aws mark
 * is AWS's own vector, the one aws.amazon.com's header draws, placed where
 * the PNG draws it (scale 1.215, fitted to within 0.025 mean error per
 * pixel). Only "startups" is traced: a 16x Lanczos upscale, a 6px blur to
 * take out the pixel steps, a 0.52 threshold that keeps the strokes' weight,
 * then potrace. One colour, squid ink #232F3E, so the row's dark-mode invert
 * turns it white like the provided file. */
export const SPONSORS: Company[] = [
  /* The lockup is about 3.8 times wider than tall and its letters fill the
   * top half, so at 1.7 the "aws" letters stand as tall as the 0.85
   * Partners wordmarks. */
  { name: "AWS Startups", logo: "/images/sponsors/aws-startups.svg", height: 1.7 },
];

export type Kind = "report" | "event" | "community" | "insight";

/* Channel split: "newsroom" = in-site news feed (awards, releases,
 * announcements; short posts); "story" = long-form event stories rendered at
 * /story/<slug> (conference trips, hackathon write-ups, photographs and
 * all); "report" = deep tech content that lives on the external WIGTN Tech
 * site. "blog" belongs to the closed blog section and no post carries it
 * today; it stays in the union so BlogPage and the machinery it will need
 * compile while they wait. Untagged articles are treated as
 * report/back-catalog and stay out of every feed. */
export type Channel = "newsroom" | "report" | "story" | "blog";
export type NewsTopic = "award" | "release" | "announcement" | "community";

/* `aspect` overrides the gallery's default 4/3 crop for a single image.
 * Portrait shots (a poster, a person standing) lose their subject entirely
 * when forced into a landscape box, so they should pass "3/4". */
export type GalleryAspect = "4/3" | "3/4" | "1/1" | "16/9";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  aspect?: GalleryAspect;
};

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "quote"; text: string }
  | { t: "list"; items: string[] }
  | { t: "image"; src: string; alt: string; caption?: string }
  | { t: "gallery"; images: GalleryImage[]; caption?: string };

export type Link = { label: string; href: string };

/* One shipped version of a product, for the changelog under its tab on
 * /notices.
 *
 * `note` is optional and is left off rather than filled in. Two of the four
 * products publish no per-version notes at all: wigtn-plugins-codex tags its
 * releases with an empty body, and WIGSS has no GitHub releases, only npm
 * publishes. A version with a date and no note is the whole truth about those,
 * and writing one from the version number would be inventing a changelog.
 *
 * `date` is the date the registry recorded, in the site's YYYY.MM.DD form:
 * `published_at` from the GitHub releases API, or the `time` map from the npm
 * registry. Not the commit date, and not the date anyone announced it. */
export type ReleaseVersion = {
  version: string;
  date: string;
  note?: string;
};

/* What shape of artifact a release post ships: weights, an agent plugin, or
 * a CLI/library. Drives the /notices type filter and nothing else. Three
 * values because three shapes have shipped; extend the union when a new
 * shape does (a dataset, a harness), not before. */
export type ReleaseType = "model" | "plugin" | "tool";

export type Article = {
  slug: string;
  kind: Kind;
  tag: string;
  title: string;
  summary: string;
  date: string;
  readTime?: string;
  /* The byline on a detail page, and it is a WIGTN team, never a company.
   *
   * Two values and no others: "WIGTN Research" for the papers and the models,
   * "WIGTN Engineering" for the tools, the plugins and the hackathon builds.
   * The story posts each carried their event's organizer here (Snowflake,
   * ByteDance, Open Builders Alliance), which put another company's name
   * under a post that company did not write. Where an organizer belongs is
   * in the title or the prose, as TRAE Seoul's "by ByteDance" is.
   *
   * A note renders no byline, which is why the notice posts set nothing. */
  author?: "WIGTN Research" | "WIGTN Engineering";
  place?: string;
  icon?: "trophy" | "pin";
  featured?: boolean;
  video?: boolean;
  videoUrl?: string;
  image?: string;
  links?: Link[];
  sourceNote?: string;
  placeholder?: boolean; // not-yet-real content kept as mock
  /* How the detail page is built. Default is the full article: standfirst,
   * read time, byline, contact strip, and a rail of related posts.
   *
   * "note" is for a post whose body is a few sentences. Everything in that
   * list is scaffolding around the text, and around fifty words of text it
   * outnumbers what it is holding: the award notices ran eight blocks of
   * chrome over two paragraphs, and the standfirst restated the body's first
   * sentence one type size larger, because `summary` is written for a row
   * (the /notices ledger for a release, the /story entry for a notice) and
   * was being reused as a lede.
   *
   * Set it on the post, do not infer it from body length. A short post that
   * wants the full treatment should be able to say so, and a threshold in the
   * renderer would silently reshape a page when someone edits a paragraph. */
  layout?: "note";
  /* Release only: every version this product has shipped, newest first.
   *
   * `version` above stays what it was, the version the post was written about,
   * and it is the one the post's prose describes. This is the rest of the
   * history, which the post does not describe and should not: a release note
   * per version, on a site that publishes one post per product, would be nine
   * rows saying a plugin was bumped.
   *
   * Sourced from the registry that serves the thing, never from a README badge
   * or a CHANGELOG file. See the header of each post for which call produced
   * its list and when. */
  versions?: ReleaseVersion[];
  channel?: Channel; // undefined = back-catalog/report (excluded from newsroom)
  /* Newsroom sub-category. "release" puts the post in the version ledger on
   * /notices; everything else keeps it out, and it reaches readers through
   * its /story entry instead. */
  newsTopic?: NewsTopic;
  /* Release only: the shipped version, rendered in the ledger row on /notices.
   *
   * It is a separate field rather than part of the title because two of these
   * products carry two different numbers. "WIGTN Plugin v2: Codex" is the
   * second plugin we have made; v0.3.0 is the version of it that shipped. Put
   * both in one heading and the reader has to work out which is which.
   *
   * Copy it from the registry that serves the thing, not from a README badge:
   * npm for WIGSS, the GitHub releases API for the two plugins. Omit it when
   * the artifact has no version, which is the case for the WigtnOCR adapter:
   * the HuggingFace repo carries no tags and the "v1" in its name is the
   * product line, not a release. */
  version?: string;
  /* Release only: which shape of artifact the product is, for the /notices
   * type filter. See ReleaseType above. */
  releaseType?: ReleaseType;
  body: Block[];
};

const p = (text: string): Block => ({ t: "p", text });

export const ARTICLES: Article[] = [
  /* ───────── Newsroom · Notices (real), newest first ─────────
   * Everything here has `newsTopic` other than "release", which keeps it out
   * of RELEASE_ROWS: /notices is the version ledger and these have no
   * version. Each one reaches readers through its STORIES entry, which
   * carries its words on /story and links both its page and the story. A
   * notice with no story to pair with has nowhere to land; see the comment
   * above NEWSROOM_FEED's replacement below. */
  wigvoAcl2026, // 2026.07, announcement
  /* One post per contest, on the date that contest was. They were a single
   * roundup for an afternoon; see the header on trae-seoul-2026-grand-prize
   * for why that was the wrong shape and why the roundup is deleted rather
   * than kept beside them. */
  obaWeekendthon2026Top6, // 2026.05.31, award
  snowflakeKorea2026TechTrack, // 2026.04.29, award
  traeSeoul2026GrandPrize, // 2026.03.28, award

  /* ───────── Newsroom · Releases (real), newest first ─────────
   * One entry per product, not per version. NEWSROOM_FEED sorts by date, so
   * this order is for a reader of the file; the page does not depend on it. */
  wigtnCodexRelease, // 2026.08.25, v0.5.1
  wigtnCodingRelease, // 2026.08.04, v0.1.16
  wigssNpmRelease, // 2026.04.03, v0.1.4
  wigtnocrOpenSource, // 2026.04.03, no version

  /* ───────── Story · long-form event stories (real), newest first ─────────
   * channel: "story": rendered at /story/<slug>, kept out of NEWSROOM_FEED
   * by the channel filter. Each pairs with a /story row through STORIES
   * below. */
  acl2026SanDiego, // 2026.07.16, trip report
  obaWeekendthonTop6, // 2026.05.31, hackathon
  snowflakeKorea2026, // 2026.04.29, hackathon
  traeSeoulGrandPrize, // 2026.03.28, hackathon
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/* Where an article's page lives. Story posts render under /story, blog posts
 * (none today; the section is closed) under /blog, everything else at the
 * root slug. Any surface that could be handed any kind of article links
 * through this, not through articleHref. */
export const hrefFor = (a: Article) =>
  a.channel === "story"
    ? storyHref(a.slug)
    : a.channel === "blog"
      ? blogHref(a.slug)
      : articleHref(a.slug);

/* The long-form stories, newest first: the /story detail pages' params. */
export const STORY_FEED = ARTICLES.filter(
  (a) => !a.placeholder && a.channel === "story",
).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/* The /blog index. Empty while the blog is closed; BlogPage (retained,
 * unrouted) reads it, so the first channel: "blog" post fills the page the
 * day the section reopens. */
export const BLOG_FEED = ARTICLES.filter(
  (a) => !a.placeholder && a.channel === "blog",
).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/* The /story rows: each event's short notice paired with its long account,
 * which renders at /story/<storySlug>.
 *
 * A hand-kept table rather than a field on either post, because the pairing
 * is knowledge about two posts at once, and the thumbnail needs the story
 * post's cover, which only this module already imports. The note supplies
 * the words (title, summary, date were written for exactly this kind of
 * row); the story post supplies the picture and the destination. `cover` is
 * the image import itself, so the story page's social card can give its size.
 *
 * Newest first, like every other list on the site. wigvo-acl-2026 pairs with
 * the trip report: the acceptance is the notice, the trip is the story. */
export type Story = { article: Article; cover: StaticImageData; storySlug: string };
export const STORIES: Story[] = [
  { article: wigvoAcl2026, cover: ACL_2026_COVER, storySlug: "acl-2026-san-diego" },
  { article: obaWeekendthon2026Top6, cover: OBA_WEEKENDTHON_COVER, storySlug: "oba-weekendthon-top6" },
  { article: snowflakeKorea2026TechTrack, cover: SNOWFLAKE_2026_COVER, storySlug: "snowflake-korea-2026" },
  { article: traeSeoul2026GrandPrize, cover: TRAE_SEOUL_COVER, storySlug: "trae-seoul-grand-prize" },
];

export const getStory = (storySlug: string) => STORIES.find((s) => s.storySlug === storySlug);

/* The homepage report rail (TECH_REPORTS, a hand-kept mirror of three report
 * cards from the sibling wigtn-tech-report repo) went with the landing
 * slimming of 2026-08-09: the landing is Hero, Services, Contact now, and the
 * nav's Tech item is the pointer to WIGTN Tech. If a rail like it comes back,
 * read that mirror's rules in the git history first; they were earned. */

/* ── Research & Tech Assets (homepage centerpiece) ── */

/* Milestones: the company record, oldest → newest. /team renders it as the
 * History timeline; the homepage's retained (unrendered) MilestoneTimeline
 * reads it too. Entries whose copy is not final carry placeholder: true,
 * which keeps them out of History.
 *
 * Two kinds of entry, by decision of 2026-10-19: paper acceptances (plus the
 * IWSLT invited oral, which came with the ACL acceptance) and business
 * relationships WIGTN entered (a client project, a partnership). Hackathon
 * placings came off; they stay on /story, which is where a reader looks for
 * what the team did in public. Every paper entry is sourced from the org
 * profile's Papers list (github.com/wigtn/.github, profile/README.md).
 *
 * Each entry is a date and a title that says the whole thing. `text` is an
 * optional one-line sub-title for what the title cannot carry: the work
 * under a partnership (Braincrew's project, Mind AI's product test) and the
 * paper behind a venue. Description sentences were cut on 2026-10-19 as
 * noise on a record this short. Each `text` is kept short enough to stay on
 * one line in the desktop columns; paper titles are cut at the colon's
 * second clause where the full one would wrap (the full titles are in the
 * org profile's Papers list).
 *
 * Dates are the month the event happened, not a cadence. The ACL acceptance
 * once sat in February with the wrong date on it: the acceptance email
 * arrived in April (the trip report says so in its lede,
 * ../updates/acl-2026-san-diego, and camera-ready was May). Do not redate an
 * entry to fill a month. */
export type Milestone = {
  month: string; // short month label, e.g. "Jan"
  date: string; // "2026.01"
  label: string; // chip
  title: string; // short headline
  text?: string; // optional sub-line, only for a fact the title cannot carry
  /* The homepage rail card is only 208px of text and clamps the title to one
   * line and the body to two. Entries whose full copy overflows that supply a
   * teaser here; /team History always renders the full `title`/`text`. */
  railTitle?: string;
  railText?: string;
  image?: string; // optional photo; blank frame when absent
  upcoming?: boolean; // future / roadmap entry
  placeholder?: boolean; // copy not finalized yet
};

export const MILESTONES: Milestone[] = [
  {
    month: "Jan",
    date: "2026.01",
    label: "Founded",
    title: "WIGTN Founded",
  },
  {
    month: "Feb",
    date: "2026.02",
    label: "Arustay",
    title: "Arustay: Website Development",
  },
  {
    month: "Apr",
    date: "2026.04",
    label: "ACL 2026",
    title: "ACL 2026 System Demonstrations: Paper Accepted",
    text: "WIGVO: Real-Time Speech Translation over PSTN Calls",
    railTitle: "ACL 2026 System Demos",
    image: "/images/projects/wigvo_screenshot_call.png",
  },
  {
    month: "Jun",
    date: "2026.06",
    label: "Partnership",
    title: "Mind AI: Partnership",
    text: "MEGA Code Closed Beta Test",
  },
  {
    month: "Jul",
    date: "2026.07",
    label: "IWSLT 2026",
    title: "IWSLT 2026: Oral Presentation, San Diego",
    text: "WIGVO: Real-Time Speech Translation over PSTN Calls",
    railTitle: "IWSLT 2026 Oral",
    image: iwsltTalk.src,
  },
  {
    month: "Aug",
    date: "2026.08",
    label: "EMNLP 2026",
    title: "EMNLP 2026 Industry Track: Paper Accepted",
    text: "RCPS: Choosing Document Parsers by Retrieval",
  },
  {
    month: "Sep",
    date: "2026.09",
    label: "NeurIPS 2026",
    title: "NeurIPS 2026 Workshop: Paper Accepted",
    text: "MDI: The Minimum Detectable Improvement of an LLM Judge",
  },
  {
    month: "Oct",
    date: "2026.10",
    label: "Partnership",
    title: "Braincrew: AX Project Partnership",
    /* "i\u2011ERP" spells the hyphen as U+2011 (non-breaking) so a narrow
     * column never splits the product name at it. */
    text: "SK hynix Global One ERP (i\u2011ERP) Platform Development Project",
    railTitle: "Braincrew Partnership",
  },
];
/* There is no announcements feed, and that is deliberate.
 *
 * NEWSROOM_FEED used to be every channel: "newsroom" post and lost its last
 * consumer when /notices became the release ledger; an ANNOUNCEMENTS list
 * replaced it for one commit and came out again, because /notices answers
 * what shipped and an award answers what happened. The notices reach readers
 * through STORIES below: the /story entry carries the note's words and links
 * both its page and the long-form story. If a notice ever arrives that pairs
 * with no story, it needs a surface before it needs a post, or it exports a
 * page nothing links. */

/* The /notices rows: every shipped version of every release post, flattened
 * into one date-ordered list.
 *
 * The one-line impact each row carries is versions[].note, unchanged. Those
 * notes were derived from the release bodies (or, where bodies are empty, the
 * release commits) when the changelogs were sourced; a second hand-written
 * string per version would be a shadow copy that drifts. A row whose
 * version has no note renders without one, and for those versions that is the
 * whole truth. WigtnOCR has no versions array at all (the HuggingFace repo
 * carries no tags), so its post contributes one row from its own date and
 * summary.
 *
 * Sorted by date descending. Array.prototype.sort is stable, so rows sharing
 * a date (v0.1.15 and v0.1.16 both shipped 2026.08.04) keep the order of
 * their versions array, which is newest first from the registry. */
export type ReleaseRow = {
  date: string;
  product: string;
  type?: ReleaseType;
  version?: string;
  note?: string;
  href: string;
};
export const RELEASE_ROWS: ReleaseRow[] = ARTICLES.filter(
  (a) => a.channel === "newsroom" && a.newsTopic === "release",
)
  .flatMap((a): ReleaseRow[] =>
    a.versions?.length
      ? a.versions.map((v) => ({
          date: v.date,
          product: a.title,
          type: a.releaseType,
          version: v.version,
          note: v.note,
          href: articleHref(a.slug),
        }))
      : [
          {
            date: a.date,
            product: a.title,
            type: a.releaseType,
            version: a.version,
            note: a.summary,
            href: articleHref(a.slug),
          },
        ],
  )
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/* ── Retired URLs ────────────────────────────────────────────────────────────
 *
 * These pages were published here, indexed, and listed in the sitemap before
 * the split between what the team did (this site) and what the work found (the
 * tech-report site). Their content now lives on the report site, and deleting
 * the routes outright would 404 every inbound link and search result pointing
 * at them.
 *
 * A static export has no server to redirect with, so `app/[slug]/page.tsx`
 * still generates a page for each slug below: a canonical link to the new home
 * plus a meta refresh, and visible text for anyone who lands with JS disabled.
 * They stay out of the sitemap, because a redirect is not a page worth
 * indexing.
 *
 * Do not remove an entry to tidy up. The only safe time to drop one is when
 * the old URL has stopped receiving traffic, which is a decision with data
 * behind it rather than a cleanup. */
export type Retired = {
  slug: string;
  to: string;
  title: string;
  /* What the redirect page says. It used to be derived from whether `to` was
   * off-site, which worked only while /work was the single on-site exception.
   * The second on-site entry inherited /work's paragraph and told the reader
   * its content had moved to the report site, which is where it had just been
   * deleted from. Write the sentence per entry instead of inferring it. */
  note: string;
};

export const RETIRED: Retired[] = [
  { slug: "wigtnocr", note: "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news.", to: techReportHref("wigtnocr"), title: "WigtnOCR" },
  { slug: "wigvo", note: "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news.", to: techReportHref("wigvo"), title: "WIGVO" },
  { slug: "wigss", note: "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news.", to: techReportHref("wigss"), title: "WIGSS" },
  { slug: "wigtn-coding", note: "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news.", to: techReportHref("wigtn-coding"), title: "WIGTN Coding" },
  {
    note: "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news.",
    slug: "wigvo-realtime-translation-video",
    to: techReportHref("wigvo"),
    title: "WIGVO",
  },
  /* The WIGTN Flake report was removed from the tech-report site, and the
   * Snowflake hackathon story that replaced it now lives on this site's
   * Story pages. This hop follows it rather than pointing at the deleted
   * report. */
  {
    note: "The WIGTN Flake report was taken down with the rest of the hackathon write-ups. The Snowflake story is the account of that project now, and it carries the code-path audit in full.",
    slug: "wigtn-flake-cortex-debate-video",
    to: storyHref("snowflake-korea-2026"),
    title: "the Snowflake hackathon story",
  },
  {
    note: "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news.",
    slug: "why-we-distill-30b-into-2b",
    to: techReportHref("wigtnocr"),
    title: "WigtnOCR",
  },
  /* These four URLs served the stories when they were root-level articles,
   * then redirected to the WIGTN Tech feed for the day the stories lived there.
   * The posts are back on this site under /story now, and the URLs are in
   * sitemaps that were already crawled, so each one forwards to the same
   * post at its story address rather than 404ing. */
  { note: "The conference and hackathon write-ups live under the Story page now. This address predates that section, so it forwards.", slug: "acl-2026-san-diego", to: storyHref("acl-2026-san-diego"), title: "the ACL 2026 trip report" },
  { note: "The conference and hackathon write-ups live under the Story page now. This address predates that section, so it forwards.", slug: "oba-weekendthon-top6", to: storyHref("oba-weekendthon-top6"), title: "the OBA Weekendthon story" },
  { note: "The conference and hackathon write-ups live under the Story page now. This address predates that section, so it forwards.", slug: "snowflake-korea-2026", to: storyHref("snowflake-korea-2026"), title: "the Snowflake Korea story" },
  { note: "The conference and hackathon write-ups live under the Story page now. This address predates that section, so it forwards.", slug: "trae-seoul-grand-prize", to: storyHref("trae-seoul-grand-prize"), title: "the TRAE Seoul story" },
  /* /work is gone with the article groups it listed. What it had that still
   * exists, the events and the awards, is on /story now. */
  { note: "The page that used to be here grouped work that has since moved. What is left of it, the events and the awards, is on the Story page.",
    slug: "work", to: STORY_INDEX, title: "WIGTN Story" },
  /* /news was this site's own route until 2026.08.09, labelled "Updates".
   * It forwarded to /notices while that page kept the name Notice; since
   * 2026-10-20 it forwards to /story, because /notices is the Products ledger
   * now and what /news carried, the team's news, is what Story holds.
   * `app/news/page.tsx` is gone, so `app/[slug]` is free to export /news as a
   * redirect the same way it does the rest. */
  { note: "The news this page carried, the conferences, awards and launches, is on the Story page now.",
    slug: "news", to: STORY_INDEX, title: "WIGTN Story" },
  /* Removed here on 2026.08.08 and deliberately kept out of RETIRED while the
   * paper sat in the EMNLP 2026 Industry Track anonymity period — the
   * destination report was not public, so a redirect would have pointed at
   * nothing. The paper was accepted and the report went live on 2026.08.26
   * under the slug `rcps`, which is why the old slug and the target differ. */
  {
    note: "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news.",
    slug: "wigtnocr-radp",
    to: techReportHref("rcps"),
    title: "RCPS",
  },
];

export const getRetired = (slug: string) => RETIRED.find((r) => r.slug === slug);

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
/* The four conference and hackathon posts left for the WIG-log feed on
 * 2026-08-09 and came back the same day. They carry channel: "story" and
 * render at /story/<slug>, under the rows that summarize them; their covers
 * ship from the post folders again, which is why ./milestones is gone. */
import { ACL_2026_COVER, acl2026SanDiego } from "./updates/acl-2026-san-diego";
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
 * Tech is the one external item: it hands the reader to WIG-log's report
 * index, that site's front door for findings. The nav carried a WIG-log
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
  { label: "Notice", href: NOTICES },
  { label: "Story", href: STORY_INDEX },
  /* Trailing slash on purpose: the report site builds with trailingSlash, so
   * the bare URL 301s. Linking the final URL saves that round trip. */
  { label: "Tech", href: TECH_REPORT_INDEX },
];

/* ── The module kit ─────────────────────────────────────────────────────────
 *
 * The homepage's answer to what Web Agency actually is. A portfolio says we
 * finished some jobs; a kit says the next one starts from something already
 * built and already under test, which is nearer to what a client is buying.
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
   * running in the demo. An AX row is a stage of an engagement and has nothing
   * to open, so it has no href and renders as text rather than pretending to
   * be a link that does nothing. */
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
  /* Optional. The four web modules have compositions; the AX rows do not,
   * because nothing has been built for them and inventing a picture for a
   * published paper would be dressing. A row without one simply shows no
   * picture on hover. */
  image?: string;
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
  /* AX rows carry figures where web rows carry a picture, and the difference
   * is not decoration: a web module is evidence because you can open it and
   * click, and a published system is evidence because it was measured and the
   * measurement is checkable. Numbers are what that half of the business
   * actually hands over.
   *
   * Every one is copied from that system's own report on WIG-log, at the
   * precision the report uses, with the label the report gave it. Read on
   * 2026-08-17. Do not round, and do not add one that is not in a report.
   *
   * Three per row, which is the most that fits without becoming a table. The
   * report is one click away and has the rest. */
  figures?: { value: string; label: string }[];
};

/* Where the modules are running, so a row can be opened rather than believed. */
const MODULE_DEMO = "https://portfolio-recruit-platform.vercel.app";

const WEB_ROWS: PracticeRow[] = [
  {
    slug: "ui-kit",
    name: "UI Kit",
    line:
      "Tokens for light and dark, a brand theme, and a form renderer driven by schema, vendored into every scaffold.",
    href: `${MODULE_DEMO}/`,
    meta: "ui-kit · running at /",
    image: "/images/modules/ui-kit.jpg",
    clip: "/images/modules/ui-kit.webm",
  },
  {
    slug: "backoffice-frame",
    name: "Back office",
    line:
      "A tool registry, screen layout validation and an outbox batch runner, built before launch rather than after it.",
    href: `${MODULE_DEMO}/admin`,
    meta: "backoffice-frame · running at /admin",
    image: "/images/modules/backoffice-frame.jpg",
    clip: "/images/modules/backoffice-frame.webm",
  },
  {
    slug: "ai-pipeline-sdk",
    name: "AI pipeline",
    line:
      "Generated answers filtered, moderated, and held for a person, with the strength set by an operator rather than a deploy.",
    href: `${MODULE_DEMO}/admin/ai`,
    meta: "ai-pipeline-sdk · running at /admin/ai",
    image: "/images/modules/ai-pipeline-sdk.jpg",
    clip: "/images/modules/ai-pipeline-sdk.webm",
  },
  {
    slug: "notification-file",
    name: "Notifications",
    line:
      "Transactional mail, in-app notifications, recipient rules and presigned upload ports. The plumbing nobody specifies.",
    href: `${MODULE_DEMO}/admin/inquiries`,
    meta: "notification-file · running at /admin/inquiries",
    image: "/images/modules/notification-file.jpg",
    clip: "/images/modules/notification-file.webm",
  },
];

/* ── AX Agency ──────────────────────────────────────────────────────────────
 *
 * The second line of business, and its rows are stages of an engagement rather
 * than things we shipped.
 *
 * They were four of our own AI systems for a while, each linking its report.
 * That was evidence of something, but of the wrong thing: it described a lab,
 * not a service, and a client reading it learned what we had made for
 * ourselves instead of what we would do for them.
 *
 * NO CLIENT WORK IS NAMED because there is none to name yet, and there will
 * not be until a client agrees to be named. So no row carries a case, a logo,
 * or a number from an engagement. What each row carries instead is what the
 * client ends up holding at the end of that stage, which is a promise we can
 * keep on the first one.
 *
 * NO FIGURES HERE, and that is deliberate. The web rows show a running screen
 * and these could have shown metrics from our own systems, but a number from
 * WIGVO is not evidence about your project. The one claim this section makes
 * about measurement is that we do it and publish the limits, and the place
 * that is checkable is WIG-log, linked once from the lead rather than pinned
 * to a stage it did not come from.
 *
 * THE THIRD STAGE SAYS WHAT GETS CUT. An AX pitch that only describes building
 * is a pitch with no way to be wrong, and the harness report on WIG-log is us
 * doing exactly this to our own work: same tasks resolved, half again the wall
 * time, no repeatable quality lift, published. The row has to promise the same
 * treatment or the report contradicts the page. */
const AX_ROWS: PracticeRow[] = [
  {
    slug: "ax-consulting",
    name: "Consulting",
    line:
      "Where AI has leverage in the workflows you already run, and where it does not. We put both in writing, including the parts we advise against.",
    meta: "You keep · a written map, and what we said no to",
  },
  {
    slug: "ax-evaluation",
    name: "Evaluation",
    line:
      "The metric is agreed before anything is built, and measured on your own data rather than a public benchmark. A number nobody signed off on is not a result.",
    meta: "You keep · an evaluation set and a baseline",
  },
  {
    slug: "ax-feedback",
    name: "Feedback",
    line:
      "What shipped is measured again against that baseline. What did not move the number gets cut, and we say plainly that it did not move.",
    meta: "You keep · a measured before and after",
  },
];

/* ── The two lines of business ──────────────────────────────────────────────
 *
 * What we do used to state these as two cards with keyword tags, which is the
 * shape every agency site uses and says nothing either of them could not say.
 * They are practices with a body of work behind them, so each is now a heading
 * over its own evidence, in the same row form.
 *
 * The leads are the old SERVICES copy, which came from README.md and was the
 * one part of that section worth keeping. */
export type Practice = {
  index: string;
  name: string;
  lead: string;
  rows: PracticeRow[];
};

export const PRACTICES: Practice[] = [
  {
    index: "01",
    name: "Web Agency",
    lead: "Websites and web products, designed, built, and shipped end to end. A client site is assembled from modules we own and keep under test.",
    rows: WEB_ROWS,
  },
  {
    index: "02",
    name: "AX Agency",
    lead: "We map where AI has leverage in your business, build it into the products and workflows you already run, and measure whether it moved anything. How we measure, applied to our own work and including the results that went nowhere, is on WIG-log.",
    rows: AX_ROWS,
  },
];

/* CAPABILITIES, the four-pillar record list (published research, open models,
 * reports with their limits, hackathon placings), was deleted when /team went
 * back to "Who we are." and no surface rendered it. The claims themselves
 * still live where they are checkable: the posts, MILESTONES, and the report
 * site. It is in the git history if a surface wants the list back. */

export const PARTNERS = ["Mind AI", "MEGA Code", "Tripla", "Arustay"];

/* The /team roster renders one row per person: portrait + name on the left,
 * `position` / `role` / `bio` on the right. `position` is the WIGTN title and
 * is intentionally set on the team lead only; everyone else shows `role`
 * (their discipline) alone. `bio` is a single career-shaped sentence.
 *
 * `currentRole`, `credential`, `expertise`, `github` and `linkedin` are read by
 * nothing. They are kept in step with the rendered fields anyway, because a
 * shadow copy that disagrees with what the page says is worse than one that
 * does not, and they still ship inside the client bundle. */
export type TeamMember = {
  name: string;
  position?: string; // WIGTN title; team lead only
  role: string; // discipline
  currentRole: string;
  credential?: string;
  bio: string;
  image: string;
  imagePosition?: string;
  github?: string;
  linkedin?: string;
  expertise: string[];
};

export const TEAM: TeamMember[] = [
  {
    name: "Harrison Kim 김형섭",
    position: "Team Lead",
    role: "AI Research Engineer",
    /* The employer is described, not named. It was named here and in the bio
     * until now, which put a company that has nothing to do with WIGTN on
     * WIGTN's own roster page. What the reader needs is the kind of work, and
     * that is what both fields carry now. */
    currentRole: "AI Research Engineer, enterprise agent development and consulting",
    credential: "Ex-Hyundai E&C",
    bio: "Builds agent systems for enterprise clients at an AX (AI transformation) company, covering development, consulting and solution delivery, after a decade of large-scale project management at Hyundai E&C.",
    image: "/images/team/hyeongseob_kim.jpg",
    imagePosition: "center 15%",
    github: "https://github.com/Hyeongseob91",
    linkedin: "https://linkedin.com/in/harrison-hyeongseob-kim",
    expertise: ["AI Modeling", "GPU Computing", "Applied Research"],
  },
  {
    name: "Diego Son 손상우",
    role: "AI Research Engineer",
    currentRole: "AI Research Engineer & AX Team Lead",
    bio: "AX Team Lead building LLM-powered applications and autonomous agent systems, focused on multi-agent orchestration and workflow automation.",
    image: "/images/team/sangwoo_son.png",
    imagePosition: "left top",
    github: "https://github.com/wigtn",
    linkedin: "https://linkedin.com/in/sangwooson",
    expertise: ["Multi-Agent Systems", "Agent Orchestration", "LLM Apps"],
  },
  {
    name: "Eric Kim 김진모",
    /* Was "MLOps Engineer" here while `currentRole` right below said DevOps.
     * DevOps is the one that was right, and the bio no longer opens by
     * repeating the line directly above it. */
    role: "DevOps Engineer",
    currentRole: "DevOps Engineer",
    bio: "Runs the crew's deployment pipelines on Docker, Kubernetes and CI/CD, and leads its DBA and UI/UX direction.",
    image: "/images/team/jinmo_kim.png",
    imagePosition: "center 30%",
    github: "https://github.com/moriroKim",
    linkedin: "https://www.linkedin.com/in/jinmo-kim-62878533b/",
    expertise: ["DevOps", "Infra (Docker/K8s)", "CI/CD · DBA"],
  },
  {
    name: "Maximus Kim 김현상",
    role: "AI Product Engineer",
    currentRole: "Full-Stack Developer & MX Team Lead",
    bio: "MX Team Lead and mobile-first full-stack developer, covering the entire 3-tier stack with React Native.",
    image: "/images/team/hyeonsang_kim.jpeg",
    imagePosition: "center 35%",
    github: "https://github.com/HyeonsangKim",
    linkedin: "https://www.linkedin.com/in/hyeonsang-kim-5a7a67260/",
    expertise: ["Full-Stack", "React Native", "Mobile"],
  },
  {
    name: "David Cho 조현우",
    role: "AI Product Engineer",
    currentRole: "Full-Stack Developer",
    bio: "Full-stack developer working across web and React Native, using AI-native tooling to ship quickly.",
    image: "/images/team/hyunwoo_cho.png",
    imagePosition: "center 20%",
    github: "https://github.com/starz-woo",
    linkedin: "https://www.linkedin.com/in/%ED%98%84%EC%9A%B0-%EC%A1%B0-8a6800393/",
    expertise: ["Full-Stack", "Web", "AI-native Tooling"],
  },
];

export type Kind = "report" | "event" | "community" | "insight";

/* Channel split: "newsroom" = in-site news feed (awards, releases,
 * announcements; short posts); "story" = long-form event stories rendered at
 * /story/<slug> (conference trips, hackathon write-ups, photographs and
 * all); "report" = deep tech content that lives on the external WIG-log
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
 * row); the story post supplies the picture and the destination.
 *
 * Newest first, like every other list on the site. wigvo-acl-2026 pairs with
 * the trip report: the acceptance is the notice, the trip is the story. */
export type Story = { article: Article; image: string; storySlug: string };
export const STORIES: Story[] = [
  { article: wigvoAcl2026, image: ACL_2026_COVER, storySlug: "acl-2026-san-diego" },
  { article: obaWeekendthon2026Top6, image: OBA_WEEKENDTHON_COVER, storySlug: "oba-weekendthon-top6" },
  { article: snowflakeKorea2026TechTrack, image: SNOWFLAKE_2026_COVER, storySlug: "snowflake-korea-2026" },
  { article: traeSeoul2026GrandPrize, image: TRAE_SEOUL_COVER, storySlug: "trae-seoul-grand-prize" },
];

/* The homepage report rail (TECH_REPORTS, a hand-kept mirror of three report
 * cards from the sibling wigtn-tech-report repo) went with the landing
 * slimming of 2026-08-09: the landing is Hero, Services, Contact now, and the
 * nav's Tech item is the pointer to WIG-log. If a rail like it comes back,
 * read that mirror's rules in the git history first; they were earned. */

/* ── Research & Tech Assets (homepage centerpiece) ── */

/* Milestones: the build-in-public track record, oldest → newest. Horizontal
 * swipe rail on the homepage; each card's photo rises into view on scroll.
 * Items without a real photo yet leave the frame blank; entries whose copy is
 * not final carry placeholder: true, which also keeps them out of the /team
 * History timeline.
 *
 * It was one entry per month since founding, and it is not any more. The ACL
 * acceptance sat in the February slot with the wrong date on it: the
 * acceptance email arrived in April (the trip report says so in its lede,
 * ../updates/acl-2026-san-diego, and camera-ready was May). Correcting it put
 * two entries in April and left February empty, which is the honest shape.
 * Do not fill February back in to restore the cadence, and do not redate this
 * entry to do it either. */
export type Milestone = {
  month: string; // short month label, e.g. "Jan"
  date: string; // "2026.01"
  label: string; // chip
  title: string; // short headline
  text: string; // one-liner
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
    title: "WIGTN founded",
    text: "Five engineers start publishing research and shipping open source together, without a lab behind them.",
  },
  {
    month: "Mar",
    date: "2026.03",
    label: "Grand Prize",
    title: "Build with TRAE Seoul",
    text: "WIGENT, a multi-agent debate arena, wins the Grand Prize (ByteDance).",
    image: TRAE_SEOUL_COVER,
  },
  {
    month: "Apr",
    date: "2026.04",
    label: "ACL 2026",
    title: "WIGVO accepted to ACL",
    text: "Real-time phone-call translation accepted to ACL 2026, System Demonstrations.",
    image: "/images/projects/wigvo_screenshot_call.png",
  },
  {
    month: "Apr",
    date: "2026.04",
    label: "2nd Place",
    title: "Snowflake AI & Data Hackathon",
    text: "WIGTN Flake takes 2nd in the Tech Track, built on Snowflake Cortex.",
    image: SNOWFLAKE_2026_COVER,
  },
  {
    month: "May",
    date: "2026.05",
    label: "Top 6",
    title: "OBA Weekendthon",
    text: "MyunZy, an AI interviewer built in two days, finishes in the Top 6.",
    image: OBA_WEEKENDTHON_COVER,
  },
  {
    month: "Jun",
    date: "2026.06",
    label: "Mind AI",
    title: "Mind AI: Technical Collaboration",
    text: "Domestic test partner for MEGA Code.",
  },
  {
    month: "Jul",
    date: "2026.07",
    label: "ACL · IWSLT",
    title: "ACL 2026 Poster & IWSLT 2026 Invited talk",
    text: "WIGVO ran a live demo booth at ACL System Demonstrations, followed by an invited oral talk and poster at IWSLT 2026.",
    railTitle: "ACL 2026 & IWSLT 2026",
    railText: "A live demo booth at ACL, then an invited talk at IWSLT.",
    image: ACL_2026_COVER,
  },
  {
    month: "Aug",
    date: "2026.08",
    label: "Research PoC",
    title: "KineticFlow: e-sports 경기분석 PoC",
    text: "A study of what actually moves a pro player's win rate, measured from in-game behavior data.",
    railTitle: "KineticFlow PoC",
    railText: "What actually moves a pro player's win rate.",
    upcoming: true,
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
 * string per version would be a shadow copy that drifts, which is the same
 * argument the TeamMember comment above makes about dead fields. A row whose
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
export const RETIRED: {
  slug: string;
  to: string;
  title: string;
  /* What the redirect page says. It used to be derived from whether `to` was
   * off-site, which worked only while /work was the single on-site exception.
   * The second on-site entry inherited /work's paragraph and told the reader
   * its content had moved to the report site, which is where it had just been
   * deleted from. Write the sentence per entry instead of inferring it. */
  note: string;
}[] = [
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
   * then redirected to the WIG-log feed for the day the stories lived there.
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
  /* /news was this site's own route until 2026.08.09, when the page took the
   * name the nav had been using for it and became /notices. It is the only
   * entry here that retires a static route rather than an article, which is
   * why it is a slug at all: `app/news/page.tsx` is gone, so `app/[slug]` is
   * free to export /news as a redirect the same way it does the rest. */
  { note: "The page is called Notice now, and its URL says so. It carries the release record; the event news moved to the Story page.",
    slug: "news", to: NOTICES, title: "WIGTN Notice" },
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

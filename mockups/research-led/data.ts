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
import { acl2026SanDiego, ACL_2026_COVER } from "./updates/acl-2026-san-diego";
import { obaWeekendthonTop6, OBA_WEEKENDTHON_COVER } from "./updates/oba-weekendthon-top6";
import { snowflakeKorea2026, SNOWFLAKE_2026_COVER } from "./updates/snowflake-korea-2026";
import { traeSeoulGrandPrize, TRAE_SEOUL_COVER } from "./updates/trae-seoul-grand-prize";
import { wigssNpmRelease } from "./updates/wigss-npm-release";
import { wigtnCodexRelease } from "./updates/wigtn-codex-release";
import { wigtnCodingRelease } from "./updates/wigtn-coding-release";
import { wigtnocrOpenSource } from "./updates/wigtnocr-open-source";

/* No trailing slashes: the Pages build exports flat files (`team.html`), so
 * `/team` is the URL that resolves and `/team/` 404s. See next.config.ts. */
export const HOME = "/";
export const NEWS = `${HOME}news`;
export const TEAM_PAGE = `${HOME}team`;
export const articleHref = (slug: string) => `${HOME}${slug}`;

/* These now live in ./links, because posts under `updates/` need them and
 * cannot import a value from this module without closing a cycle. See the
 * comment in links.ts. Imported as well as re-exported: NAV below uses
 * TECH_REPORT_SITE locally, and `export ... from` creates no local binding. */
import { TECH_REPORT_SITE, techReportAsset, techReportHref } from "./links";
export { TECH_REPORT_SITE, techReportHref };

/* Reference-led structure (Next Securities / MakinaRocks): the homepage is
 * a short teaser; depth lives on these sub-pages. Nav points to pages, not
 * in-page anchors. */
export const NAV: { label: string; href: string; disabled?: boolean }[] = [
  { label: "About", href: TEAM_PAGE },
  { label: "Updates", href: NEWS },
  /* Trailing slash on purpose: the report site builds with trailingSlash,
   * so the bare URL 301s. Linking the final URL saves that round trip. */
  { label: "Tech Reports", href: `${TECH_REPORT_SITE}/` },
  /* No Projects tab. It was hidden behind a commented-out line here for a
   * while; the page it pointed at, /work, has since been retired and now
   * redirects to /news. Restoring the tab means deciding what it should point
   * at first, not uncommenting a line. */
];

/* What we do, in the order the record supports it. Each pillar names something
 * that has already happened and can be checked: a venue, a registry, a placing.
 *
 * There used to be a fourth pillar for meetups and seminars. It was the only
 * one with nothing behind it, and it sat next to three that were true. It comes
 * back when a first meeting has actually happened, and not before. */
export const CAPABILITIES = [
  {
    title: "Published research",
    lead: "We publish where the work gets read by people who can check it.",
    /* ACL only. There is a second paper, and it is under review, and saying so
     * in public under our own name is the thing the anonymity period forbids.
     * It goes here after a notification, not before. */
    body: "WIGVO was accepted to ACL 2026 System Demonstrations and presented at booth D3, alongside an invited talk at IWSLT 2026.",
    tags: ["ACL 2026", "IWSLT 2026", "Peer reviewed"],
  },
  {
    title: "Open models and code",
    lead: "Everything we build ships in the open: models, tools, plugins.",
    body: "Weights, training data, and eval code released on HuggingFace, GitHub, and npm for anyone to use.",
    tags: ["HuggingFace", "GitHub", "npm"],
  },
  {
    title: "Reports with their limits",
    lead: "Every result we publish comes with what it does not show.",
    body: "Every result we publish arrives with its method, its measurements and the questions it leaves open, on a report site of its own.",
    tags: ["Method", "Measurement", "Limitations"],
  },
  {
    title: "Hackathons and challenges",
    lead: "We build against a clock in public, and we say what survived.",
    body: "Grand Prize at Build with TRAE Seoul, 2nd in the Tech Track at Snowflake Korea, Top 6 at OBA Weekendthon.",
    tags: ["Grand Prize", "2nd Place", "Top 6"],
  },
];

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
 * announcements, community; LinkedIn-style short posts); "report" = deep tech
 * content that lives on the external GitHub Pages blog. Untagged articles are
 * treated as report/back-catalog and stay out of the newsroom feed. */
export type Channel = "newsroom" | "report";
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

export type Article = {
  slug: string;
  kind: Kind;
  tag: string;
  title: string;
  summary: string;
  date: string;
  readTime?: string;
  author?: string;
  place?: string;
  icon?: "trophy" | "pin";
  featured?: boolean;
  video?: boolean;
  videoUrl?: string;
  image?: string;
  links?: Link[];
  sourceNote?: string;
  placeholder?: boolean; // not-yet-real content kept as mock
  channel?: Channel; // undefined = back-catalog/report (excluded from newsroom)
  newsTopic?: NewsTopic; // newsroom sub-category; "release" splits the /news groups
  /* Release only: the shipped version, rendered under the date on /news.
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
  externalUrl?: string; // report only: GitHub Pages blog post URL
  body: Block[];
};

const p = (text: string): Block => ({ t: "p", text });

export const ARTICLES: Article[] = [
  /* ───────── Events (real) ───────── */
  traeSeoulGrandPrize,
  snowflakeKorea2026,
  obaWeekendthonTop6,
  acl2026SanDiego,

  /* ───────── Newsroom · Releases (real), newest first ─────────
   * One entry per product, not per version. NEWSROOM_FEED sorts by date, so
   * this order is for a reader of the file; the page does not depend on it. */
  wigtnCodingRelease, // 2026.08.04, v0.1.16
  wigtnCodexRelease, // 2026.07.28, v0.3.0
  wigssNpmRelease, // 2026.04.03, v0.1.4
  wigtnocrOpenSource, // 2026.04.03, no version
];

/* Curated homepage "newsroom": research credibility & wins told as article
 * cards with imagery (papers, conference reports, awards), not a dry list. */
export const NEWSROOM = [
  ARTICLES.find((a) => a.slug === "acl-2026-san-diego")!, // 2026.07.16
  ARTICLES.find((a) => a.slug === "snowflake-korea-2026")!, // 2026.04.29
  ARTICLES.find((a) => a.slug === "trae-seoul-grand-prize")!, // 2026.03.28
];
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/* ── Homepage report rail ────────────────────────────────────────────────────
 *
 * The three newest tech reports, as cards that leave this site. The nav already
 * links the report site, but a reader who has not yet decided to go there is
 * not reading the nav. Three covers with real titles under them say what is
 * over there; a single link says only that somewhere else exists.
 *
 * This is a hand-kept mirror, and the report site is the source of truth. This
 * repo has no build-time access to it: separate Next app, separate repository,
 * separate deploy, so nothing here can read its data or notice when it changes.
 * The rules that follow from that are worth stating rather than rediscovering.
 *
 *   - Newest first, which is the order the report hub itself renders. Its dates
 *     are zero-padded "YYYY.MM" or "YYYY.MM.DD" and sort as plain strings.
 *   - When a report ships, add it at the top and drop the last entry. Three is
 *     the number the grid is built for, not a floor.
 *   - `title` is the report's `cardTitle` when it has one and its `title` when
 *     it does not, which is the same choice the report hub card makes. The two
 *     harness reports have no `cardTitle` on purpose: their titles carry the
 *     series numbering, which is how a reader gets from part 1 to part 2.
 *   - Do not copy the `dek` across. It states measured figures, and a figure
 *     living in a repo that cannot check it is a figure that will go wrong here
 *     while staying right there.
 *
 * Sourced 2026.08.09 from wigtn-tech-report at 245a465,
 * components/technical-reports/data.ts. */
export type TechReport = {
  slug: string;
  title: string;
  date: string;
  /* Full path under the report repo's `public/`, resolved across origins by
   * `techReportAsset`. Nothing in this build verifies it; see ./links. */
  image: string;
  alt: string;
};

export const TECH_REPORTS: TechReport[] = [
  {
    slug: "wigtn-coding",
    title: "Running a harness on frontier models, part 1: Claude Code",
    date: "2026.08.04",
    image: techReportAsset("/images/projects/claudecode_image_v1.jpg"),
    alt: "Claude Code",
  },
  {
    slug: "codex-selective-harness",
    title: "Running a harness on frontier models, part 2: Codex",
    date: "2026.07.28",
    image: techReportAsset("/images/projects/codex_image_v1.jpg"),
    alt: "Codex",
  },
  {
    slug: "wigvo",
    title: "Real-time translation over an ordinary PSTN call",
    date: "2026.07",
    image: techReportAsset("/images/projects/wigvo_image_v1.jpg"),
    alt: "WIGVO, real-time bidirectional speech translation over PSTN calls",
  },
];


/* ── Research & Tech Assets (homepage centerpiece) ── */

/* Milestones: the build-in-public track record, oldest → newest, one per
 * month since founding. Horizontal swipe rail on the homepage; each card's
 * photo rises into view on scroll. Items without a real photo yet leave the
 * frame blank; entries whose copy is not final carry placeholder: true, which
 * also keeps them out of the /team History timeline. */
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
  slug?: string; // optional link to the full article
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
    month: "Feb",
    date: "2026.02",
    label: "ACL 2026",
    title: "WIGVO accepted to ACL",
    text: "Real-time phone-call translation accepted to ACL 2026, System Demonstrations.",
    image: "/images/projects/wigvo_screenshot_call.png",
  },
  {
    month: "Mar",
    date: "2026.03",
    label: "Grand Prize",
    title: "Build with TRAE Seoul",
    text: "WIGENT, a multi-agent debate arena, wins the Grand Prize (ByteDance).",
    image: TRAE_SEOUL_COVER,
    slug: "trae-seoul-grand-prize",
  },
  {
    month: "Apr",
    date: "2026.04",
    label: "2nd Place",
    title: "Snowflake AI & Data Hackathon",
    text: "WIGTN Flake takes 2nd in the Tech Track, built on Snowflake Cortex.",
    image: SNOWFLAKE_2026_COVER,
    slug: "snowflake-korea-2026",
  },
  {
    month: "May",
    date: "2026.05",
    label: "Top 6",
    title: "OBA Weekendthon",
    text: "MyunZy, an AI interviewer built in two days, finishes in the Top 6.",
    image: OBA_WEEKENDTHON_COVER,
    slug: "oba-weekendthon-top6",
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
    slug: "acl-2026-san-diego",
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
/* Newsroom feed: only channel:"newsroom" items (awards, releases,
 * announcements). Deep tech "report" content lives on the external blog and is
 * excluded here. Newest first. */
export const NEWSROOM_FEED = ARTICLES.filter(
  (a) => !a.placeholder && a.channel === "newsroom",
).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

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
  /* The WIGTN Flake report was removed from the tech-report site, so this one
   * points back into this site rather than off it. The Snowflake hackathon post
   * is the surviving account of that project. */
  {
    note: "The WIGTN Flake report was taken down with the rest of the hackathon write-ups. The Snowflake post is the account of that project now, and it carries the code-path audit in full.",
    slug: "wigtn-flake-cortex-debate-video",
    to: `${HOME}snowflake-korea-2026`,
    title: "the Snowflake hackathon post",
  },
  {
    note: "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news.",
    slug: "why-we-distill-30b-into-2b",
    to: techReportHref("wigtnocr"),
    title: "WigtnOCR",
  },
  /* /work is gone with the article groups it listed. What it had that still
   * exists, the awards, is the Stories group on /news. */
  { note: "The page that used to be here grouped work that has since moved to the tech-report site. What is left of it, the events and the awards, lives in Updates.",
    slug: "work", to: NEWS, title: "WIGTN Updates" },
];

/* `wigtnocr-radp` (RCPS) was removed here on 2026.08.08 and is deliberately NOT
 * in RETIRED. The paper is under review at EMNLP 2026 Industry Track and the
 * anonymity period is still running, so the destination report is not public
 * yet and a redirect would point at nothing. /wigtnocr-radp 404s on purpose
 * until then.
 *
 * When the notification lands and the report goes live on the tech-report site,
 * add it to RETIRED pointing at techReportHref("wigtnocr-radp"). */

export const getRetired = (slug: string) => RETIRED.find((r) => r.slug === slug);

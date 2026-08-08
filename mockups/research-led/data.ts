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
 * The inline entries left below are the back-catalogue reports, the video
 * companions and the community placeholders. They move over as they are next
 * edited; nothing new should be written inline here.
 *
 * Templates live in updates/_template/, one per kind of post — conference,
 * hackathon, release, community. Read its README before starting a new one:
 * the outline that suits a hackathon is not the one that suits a release. */
import { acl2026SanDiego, ACL_2026_COVER } from "./updates/acl-2026-san-diego";
import { obaWeekendthonTop6, OBA_WEEKENDTHON_COVER } from "./updates/oba-weekendthon-top6";
import { snowflakeKorea2026, SNOWFLAKE_2026_COVER } from "./updates/snowflake-korea-2026";
import { traeSeoulGrandPrize, TRAE_SEOUL_COVER } from "./updates/trae-seoul-grand-prize";
import { wigssNpmRelease } from "./updates/wigss-npm-release";
import { wigtnCodingRelease } from "./updates/wigtn-coding-release";
import { wigtnocrOpenSource } from "./updates/wigtnocr-open-source";

/* No trailing slashes: the Pages build exports flat files (`team.html`), so
 * `/team` is the URL that resolves and `/team/` 404s. See next.config.ts. */
export const HOME = "/";
export const NEWS = `${HOME}news`;
export const TEAM_PAGE = `${HOME}team`;
export const articleHref = (slug: string) => `${HOME}${slug}`;

/* These now live in ./links, because posts under `updates/` need them and
 * cannot import a value from this module without closing a cycle — see the
 * comment in links.ts. Imported as well as re-exported: NAV below uses
 * TECH_REPORT_SITE locally, and `export ... from` creates no local binding. */
import { TECH_REPORT_SITE, techReportHref } from "./links";
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
    title: "Peer-reviewed research",
    lead: "We publish where the work gets checked by people who can check it.",
    /* ACL only. There is a second paper, and it is under review, and saying so
     * in public under our own name is the thing the anonymity period forbids.
     * It goes here after a notification, not before. */
    body: "WIGVO was accepted to ACL 2026 System Demonstrations and presented at booth D3, alongside an invited talk at IWSLT 2026.",
    tags: ["ACL 2026", "IWSLT 2026", "Peer review"],
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
    body: "Six technical reports, each carrying its method, its measurements and the questions it leaves open.",
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
 * is intentionally set on the organizer only; everyone else shows `role`
 * (their discipline) alone. `bio` is a single career-shaped sentence. */
export type TeamMember = {
  name: string;
  position?: string; // WIGTN title; organizer only
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
    position: "Organizer & Crew Lead",
    role: "AI Research Engineer",
    currentRole: "AI Research Engineer & Engineering Part Lead, BrainCrew",
    credential: "Ex-Hyundai E&C",
    bio: "Engineering Part Lead at BrainCrew, working on AI modeling and GPU-accelerated computing after a decade of large-scale project management at Hyundai E&C.",
    image: "/images/team/hyeongseob_kim.jpg",
    imagePosition: "center 15%",
    github: "https://github.com/Hyeongseob91",
    linkedin: "https://linkedin.com/in/harrison-hyeongseob-kim",
    expertise: ["AI Modeling", "GPU Computing", "Applied Research"],
  },
  {
    name: "Diego Son 손상우",
    role: "AI Engineer",
    currentRole: "AI Engineer & AX Team Lead",
    bio: "AX Team Lead building LLM-powered applications and autonomous agent systems, focused on multi-agent orchestration and workflow automation.",
    image: "/images/team/sangwoo_son.png",
    imagePosition: "left top",
    github: "https://github.com/wigtn",
    linkedin: "https://linkedin.com/in/sangwooson",
    expertise: ["Multi-Agent Systems", "Agent Orchestration", "LLM Apps"],
  },
  {
    name: "Eric Kim 김진모",
    role: "MLOps Engineer",
    currentRole: "DevOps Engineer",
    bio: "DevOps engineer running full MLOps pipelines on Docker, Kubernetes and CI/CD, and the crew's DBA and UI/UX direction lead.",
    image: "/images/team/jinmo_kim.png",
    imagePosition: "center 30%",
    github: "https://github.com/moriroKim",
    linkedin: "https://www.linkedin.com/in/jinmo-kim-62878533b/",
    expertise: ["MLOps", "Infra (Docker/K8s)", "CI/CD · DBA"],
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
  newsTopic?: NewsTopic; // newsroom sub-category (drives the /news filter)
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

  /* ───────── Newsroom · Releases & Updates (real) ───────── */
  wigtnocrOpenSource,
  wigssNpmRelease,
  wigtnCodingRelease,
];

/* Curated homepage "newsroom": research credibility & wins told as article
 * cards with imagery (papers, conference reports, awards), not a dry list. */
export const NEWSROOM = [
  ARTICLES.find((a) => a.slug === "acl-2026-san-diego")!, // 2026.07.16
  ARTICLES.find((a) => a.slug === "snowflake-korea-2026")!, // 2026.04.29
  ARTICLES.find((a) => a.slug === "trae-seoul-grand-prize")!, // 2026.03.28
];
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);


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
export const RETIRED: { slug: string; to: string; title: string }[] = [
  { slug: "wigtnocr", to: techReportHref("wigtnocr"), title: "WigtnOCR" },
  { slug: "wigvo", to: techReportHref("wigvo"), title: "WIGVO" },
  { slug: "wigss", to: techReportHref("wigss"), title: "WIGSS" },
  { slug: "wigtn-coding", to: techReportHref("wigtn-coding"), title: "WIGTN Coding" },
  {
    slug: "wigvo-realtime-translation-video",
    to: techReportHref("wigvo"),
    title: "WIGVO",
  },
  {
    slug: "wigtn-flake-cortex-debate-video",
    to: techReportHref("wigtn-flake"),
    title: "WIGTN Flake",
  },
  {
    slug: "why-we-distill-30b-into-2b",
    to: techReportHref("wigtnocr"),
    title: "WigtnOCR",
  },
  /* /work is gone with the article groups it listed. Its one surviving group,
   * awards, is the Awards filter on /news. */
  { slug: "work", to: NEWS, title: "WIGTN Updates" },
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

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
 * Community (meetups/seminars) has no real data yet, so those entries are
 * left as placeholder mock, flagged with `placeholder: true`.
 *
 * Pure, serializable data (no React/icons) so the static-export route can
 * import it. Stands in for the future MDX-backed content model.
 */

/* ── Locale ───────────────────────────────────────────────────────────────
 * Only the Updates surface (channel: "newsroom") is bilingual for now. Every
 * translatable field takes either a plain string or an { en, ko } pair, so
 * the untranslated back catalogue keeps working untouched and a missing `ko`
 * degrades to English rather than to an empty slot.
 * ─────────────────────────────────────────────────────────────────────── */
export type Locale = "en" | "ko";
export const LOCALES: readonly Locale[] = ["en", "ko"];
export const DEFAULT_LOCALE: Locale = "en";

export type I18nText = string | { en: string; ko: string };

/** Resolve a translatable field for `locale`, falling back to English. */
export const tx = (value: I18nText, locale: Locale): string =>
  typeof value === "string" ? value : value[locale] || value.en;

export const HOME = "/";
export const WORK = `${HOME}work/`;
export const NEWS = `${HOME}news/`;
export const TEAM_PAGE = `${HOME}team/`;

/* Korean lives under its own path prefix rather than a query flag or a
 * client-side toggle: with output: "export" each locale then gets its own
 * indexable page, and a shared link keeps the language it was copied in.
 * Only the Updates surface has a Korean counterpart today. */
export const KO_PREFIX = "/ko/";
export const KO_NEWS = `${KO_PREFIX}news/`;
export const newsHref = (locale: Locale) => (locale === "ko" ? KO_NEWS : NEWS);
export const articleHref = (slug: string, locale: Locale = DEFAULT_LOCALE) =>
  locale === "ko" ? `${KO_PREFIX}${slug}/` : `${HOME}${slug}/`;

/* External research / tech-report site: its own GitHub Pages app for now.
 * When the custom domain is ready, change ONLY this constant to
 * "https://research.wigtn.com". Slugs match the report site's routes
 * (wigvo, wigtnocr, wigss, wigtn-flake, wigtn-coding). */
export const TECH_REPORT_SITE = "https://wigtn.github.io/wigtn-tech-report";
export const techReportHref = (slug: string) => `${TECH_REPORT_SITE}/${slug}/`;

/* Reference-led structure (Next Securities / MakinaRocks): the homepage is
 * a short teaser; depth lives on these sub-pages. Nav points to pages, not
 * in-page anchors. */
export type NavKey = "about" | "updates" | "techReports" | "projects";

/* Keyed rather than labelled: the label comes from ui.ts so the header can
 * render in either locale, and `href` is a function because Updates is the
 * one destination that has a Korean counterpart. */
export const NAV: { key: NavKey; href: (locale: Locale) => string; disabled?: boolean }[] = [
  { key: "about", href: () => TEAM_PAGE },
  { key: "updates", href: newsHref },
  { key: "techReports", href: () => TECH_REPORT_SITE },
  /* Projects tab hidden for now. NAV drives the header, the mobile menu and
   * the footer "Explore" column, so this one line removes the link from all
   * three. The /work/ page itself is untouched and still builds, so restoring
   * the tab is just uncommenting this line. */
  // { key: "projects", href: () => WORK },
];

/* What we do TOGETHER: community activity pillars. Everything is framed as
 * shared, in-the-open work; the research/OSS below are the receipts. */
export const CAPABILITIES = [
  {
    title: "Open Research",
    lead: "We study AI in the open and publish what we find.",
    body: "Peer-reviewed papers at venues like ACL and EMNLP, written together and shared with everyone.",
    tags: ["ACL 2026", "EMNLP 2026", "Benchmarks"],
  },
  {
    title: "Open Source",
    lead: "Everything we build ships in the open: models, tools, plugins.",
    body: "Weights, training data, and eval code released on HuggingFace, GitHub, and npm for anyone to use.",
    tags: ["HuggingFace", "GitHub", "npm"],
  },
  {
    title: "Meetups & Seminars",
    lead: "We share what we learn, face to face.",
    body: "Tech meetups and open seminars where builders swap real production lessons. Everyone is welcome.",
    tags: ["Tech meetups", "Open seminars", "Study groups"],
  },
  {
    title: "Hackathons & Challenges",
    lead: "We team up, build in public, and put our ideas on stage.",
    body: "Grand Prize at Build with TRAE Seoul, 2nd at Snowflake Korea, built with and alongside the community.",
    tags: ["Grand Prize", "Team builds", "Build in public"],
  },
];

/* Real proof points (from constants/projects.ts achievements). */
export const STATS = [
  { value: "ACL ’26", label: "Paper accepted" },
  { value: "#1", label: "on KoGovDoc-Bench" },
  { value: "2", label: "Hackathon awards" },
  { value: "3", label: "Open-source releases" },
];

/* Friends & collaborators: teams and communities we build alongside.
 * TODO: drop real logo assets into /images/partners and swap the text
 * wordmarks in the view for <img> once they exist. */
export const PARTNERS = ["Mind AI", "MEGA Code", "Tripla", "Arustay"];

/* Tech stack actually used across WIGTN projects; demoted "Powered by". */
export const POWERED_BY = ["ANTHROPIC", "OPENAI", "GOOGLE", "SNOWFLAKE", "HUGGINGFACE", "AWS", "VERCEL"];

/* About copy: community framing. */
export const ABOUT = {
  heading: "A community of AI builders who learn together and share everything in the open.",
  paragraphs: [
    "WIGTN is an independent community of five AI builders. We study AI in the open, publishing at venues like ACL and EMNLP, and release everything we make so anyone can build on it.",
    "We don't keep what we learn to ourselves. Peer-reviewed papers, award-winning hackathon builds, and open-source models and tools, all shared back with the developer community.",
  ],
};

export type TeamMember = {
  name: string;
  role: string;
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
    role: "Organizer & Crew Lead",
    currentRole: "AI Research Engineer & Engineering Part Lead, BrainCrew",
    credential: "Ex-Hyundai E&C",
    bio: "Former construction PM with a decade of large-scale project experience. Leads WIGTN: AI modeling, product development, and GPU-accelerated computing research.",
    image: "/images/team/hyeongseob_kim.jpg",
    github: "https://github.com/Hyeongseob91",
    linkedin: "https://linkedin.com/in/harrison-hyeongseob-kim",
    expertise: ["AI Modeling", "GPU Computing", "Applied Research"],
  },
  {
    name: "Diego Son 손상우",
    role: "AI Engineer",
    currentRole: "AI Engineer & AX Team Lead",
    bio: "Builds LLM-powered applications and autonomous agent systems. Focuses on multi-agent orchestration and workflow automation.",
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
    bio: "Manages full MLOps pipelines with Docker, Kubernetes, and CI/CD. Team DBA and UI/UX direction lead.",
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
    bio: "Mobile-first full-stack engineer covering the entire 3-tier stack with React Native. Focused on software engineering craft.",
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
    bio: "Web-focused full-stack engineer who builds across the 3-tier architecture, with React Native experience and AI-native tooling for rapid delivery.",
    image: "/images/team/hyunwoo_cho.png",
    imagePosition: "center 20%",
    github: "https://github.com/starz-woo",
    linkedin: "https://www.linkedin.com/in/%ED%98%84%EC%9A%B0-%EC%A1%B0-8a6800393/",
    expertise: ["Full-Stack", "Web", "AI-native Tooling"],
  },
];

export const TEAM_BADGES = ["AI Research", "Open Source", "Meetups", "Hackathons"];

export type Kind = "report" | "event" | "community" | "insight";

/* Channel split: "newsroom" = in-site news feed (awards, releases,
 * announcements, community; LinkedIn-style short posts); "report" = deep tech
 * content that lives on the external GitHub Pages blog. Untagged articles are
 * treated as report/back-catalog and stay out of the newsroom feed. */
export type Channel = "newsroom" | "report";
export type NewsTopic = "award" | "release" | "announcement" | "community";

export type GalleryImage = { src: string; caption?: I18nText; alt?: I18nText };

export type Block =
  | { t: "p"; text: I18nText }
  | { t: "h"; text: I18nText }
  | { t: "quote"; text: I18nText }
  | { t: "list"; items: I18nText[] }
  | { t: "image"; src: string; caption?: I18nText; alt?: I18nText }
  | { t: "gallery"; images: GalleryImage[]; caption?: I18nText };

export type Link = { label: I18nText; href: string };

export type Article = {
  slug: string;
  kind: Kind;
  tag: I18nText;
  title: I18nText;
  summary: I18nText;
  date: string;
  readTime?: I18nText;
  author?: string; // organiser / byline, a proper noun in both locales
  place?: I18nText;
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

const p = (text: I18nText): Block => ({ t: "p", text });

export const ARTICLES: Article[] = [
  /* ───────── Research (real) ───────── */
  {
    slug: "wigtnocr",
    kind: "report",
    tag: "MODEL RELEASE · OPEN",
    title: "WigtnOCR: Distilling a 30B document parser into 2B",
    summary:
      "WigtnOCR compresses Qwen3-VL-30B into a 2B parser trained for Korean government documents. It leads Hit@1, Hit@5, and MRR@10 in the released six-parser KoGovDoc evaluation.",
    date: "2026.05.20",
    readTime: "12 min",
    author: "WIGTN Research",
    featured: true,
    image: "/images/projects/wigtnocr-huggingface.png",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/wigtnOCR-v1" },
      { label: "HuggingFace", href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR" },
    ],
    sourceNote:
      "This report summarizes the released WigtnOCR repository, model card, training recipe, and evaluation artifacts. It is a WIGTN model report, not a peer-reviewed paper.",
    body: [
      { t: "h", text: "Why document structure matters" },
      p(
        "Korean government PDFs mix scanned pages, dense tables, forms, stamps, charts, and multi-column text. Plain OCR can recover characters while losing the structure that tells a retrieval system which values belong together. A parser for this domain has to preserve headings, tables, formulas, and reading order in one consistent output.",
      ),
      p(
        "The project therefore evaluates two things separately. OmniDocBench measures intrinsic parsing quality. KoGovDoc measures whether the parsed output actually helps semantic chunking and retrieval on Korean government documents.",
      ),
      { t: "h", text: "Building supervision with a 30B teacher" },
      p(
        "Qwen3-VL-30B-Instruct generated structured Markdown for 4,501 pages from 49 documents. A text-only Qwen3.5-122B judge scored the outputs for structure, table quality, completeness, hallucination, and consistency. Pages below the quality threshold were removed before training.",
      ),
      { t: "list", items: [
        "Training set: 2,667 pages after filtering and document-ratio correction",
        "Validation set: 294 held-out Korean government document pages",
        "Student: Qwen3-VL-2B-Instruct with LoRA rank 8 and alpha 32",
        "Training: 3 epochs with ms-swift and DeepSpeed ZeRO-2",
      ] },
      { t: "h", text: "What the evaluation showed" },
      p(
        "On OmniDocBench, the 2B student matches or exceeds the 30B teacher in four of five reported metric categories. Table TEDS rises from 0.523 to 0.649, while formula CDM F1 remains lower than the teacher. The result is strong, but it is not a blanket claim that the student is better at every document task.",
      ),
      { t: "list", items: [
        "KoGovDoc Hit@1: 0.739, compared with 0.716 for the 30B teacher",
        "KoGovDoc Hit@5: 0.855, the highest result among the six compared parsers",
        "KoGovDoc MRR@10: 0.788, also the highest result in the released table",
        "OmniDocBench Table TEDS: 0.649, 12.6 percentage points above the teacher",
      ] },
      { t: "h", text: "What is released" },
      p(
        "The model weights and model card are published on Hugging Face. The repository includes the training recipe, evaluation code, benchmark figures, and comparison tables used in this report.",
      ),
    ],
  },
  {
    slug: "wigtnocr-radp",
    kind: "report",
    tag: "RESEARCH DRAFT · RCPS",
    title: "RCPS: Selecting document parsers by downstream retrieval",
    summary:
      "RCPS selects document parsers by downstream retrieval rather than visual cleanliness, exposing a 35.1-point Hit@1 gap on Korean government documents.",
    date: "2026.06.07",
    readTime: "14 min",
    author: "WIGTN Research",
    links: [
      { label: "WigtnOCR code", href: "https://github.com/wigtn/wigtnOCR-v1" },
      { label: "Model", href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR" },
    ],
    body: [
      { t: "h", text: "Parsing quality is not retrieval quality" },
      p(
        "On 6 parsers, 3 retrievers, and 663 question-answer pairs, the parser with the cleanest chunk boundaries produced the weakest retrieval result. Boundary Clarity anti-correlated with retrieval performance at Pearson r = −0.81.",
      ),
      { t: "h", text: "Retrieval-Conditional Parsing Score" },
      p(
        "RCPS is a no-training selection protocol that averages held-out retrieval performance across multiple embedders and normalizes formatting differences. It asks whether the parser preserves answer-bearing content, not whether its Markdown looks clean.",
      ),
      { t: "list", items: [
        "Parser choice moves Hit@1 from 0.197 to 0.549, a +35.1 percentage-point change",
        "20.2% of answers are absent from parser output, while no more than 2.3% are split by chunking",
        "RADP-Distill improves OHR-Bench Hit@5 by +1.22 points on 2,264 samples",
      ] },
      { t: "quote", text: "Choose the parser by what retrieval can recover, not by how clean the output looks." },
    ],
  },
  {
    slug: "wigvo",
    kind: "report",
    tag: "PAPER · ACL 2026 (ACCEPTED)",
    title: "WIGVO: Real-time bidirectional translation over PSTN calls",
    summary:
      "Two directional AI sessions deliver bidirectional translation over standard phone lines: 555ms median caller-to-callee latency and zero echo-induced loops.",
    date: "2026.04.27",
    readTime: "5 min",
    author: "WIGTN Research",
    image: "/images/projects/wigvo_screenshot_call.png",
    externalUrl: "https://wigtn.github.io/blog/wigvo/",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/wigvo" },
      { label: "ACL paper", href: "https://aclanthology.org/2026.acl-demo.33/" },
      { label: "Watch demo", href: "https://www.youtube.com/watch?v=jK1CDOQExLw" },
    ],
    body: [
      { t: "h", text: "An email we read twice" },
      p(
        "Some emails you read twice. In April, one of ours confirmed that WIGVO, our system for real-time phone-call translation, had been accepted to the ACL 2026 System Demonstrations track. For a team that started with a simple, stubborn question, it was the kind of validation that's hard to put into words.",
      ),
      {
        t: "image",
        src: "/images/projects/wigvo_screenshot_call.png",
        caption: "WIGVO in a live bidirectional call: the recipient just answers an ordinary phone.",
      },
      { t: "h", text: "The question behind WIGVO" },
      p(
        "K-Culture brought millions of people to Korea, but everyday phone calls still hit a language wall. And the people who need translation most aren't chatting in an app. They're calling a hospital, a city office, a bank: places that still run on landlines. No smartphone on the other end, no app that can reach that line.",
      ),
      p(
        "WIGVO answers that. It runs two parallel AI interpreter sessions, one per speaker, for natural bidirectional translation over normal phone lines. The recipient just answers a call. No app, no install, nothing to learn.",
      ),
      { t: "h", text: "What the paper reports" },
      { t: "list", items: [
        "555ms median caller-to-callee latency across 155 PSTN calls",
        "Zero echo-induced loops across 147 completed calls",
        "$0.28 per minute · OpenAI Realtime API + Twilio Media Streams",
      ] },
      {
        t: "gallery",
        images: [
          { src: "/images/projects/wigvo_architecture.png", caption: "Two interpreter sessions, one per speaker." },
          { src: "/images/projects/wigvo_latency_histogram.png", caption: "Latency distribution across production calls." },
        ],
      },
      { t: "quote", text: "Accepted to ACL 2026, System Demonstrations." },
      { t: "h", text: "Read the full report" },
      p(
        "This is the short version. The full technical write-up (architecture, echo-gating, and evaluation) lives on our Tech Report blog.",
      ),
    ],
  },
  {
    slug: "wigss",
    kind: "report",
    tag: "OPEN SOURCE · npm",
    title: "WIGSS: Visual browser edits that rewrite source code",
    summary:
      "WIGSS scans a running web page, lets a developer move or resize components, and writes the approved change back to the relevant source file.",
    date: "2026.04.10",
    readTime: "5 min",
    author: "WIGTN",
    image: "/images/carousel/wigss-npm.png",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/wigss" },
      { label: "npm", href: "https://npmjs.com/package/wigss" },
    ],
    sourceNote:
      "This engineering note is based on the public WIGSS README and npm package documentation. No controlled speed or code-quality benchmark has been published.",
    body: [
      { t: "h", text: "The gap after AI generates a page" },
      p(
        "Coding agents are good at producing a first layout. Fine adjustments are still awkward because visual intent has to be translated into prose, then into CSS, then checked again in the browser. WIGSS keeps the browser as the editing surface and uses source code as the final artifact.",
      ),
      { t: "h", text: "Scan, edit, save" },
      { t: "list", items: [
        "Scan: inspect the live DOM and label navigation, cards, footers, and repeated component groups",
        "Select: choose a component from the overlay or component tag bar",
        "Edit: drag or resize while the browser renders the change immediately",
        "Save: generate a targeted source diff, apply it, and reload the iframe",
      ] },
      { t: "h", text: "How a visual change reaches source code" },
      p(
        "The editor runs around the target development server in an iframe. DOM scan results are mapped to source files, while an overlay tracks component bounds at animation-frame speed. Edit events travel over WebSocket. On save, WIGSS converts the visual change into a StyleIntent and dispatches it to the matching source rewriter.",
      ),
      { t: "list", items: [
        "Tailwind utility classes",
        "CSS Modules through a PostCSS syntax tree",
        "Plain CSS or SCSS rules",
        "HTML with a linked stylesheet",
        "Inline React styles as a fallback",
      ] },
      { t: "h", text: "Verification and rollback" },
      p(
        "Each save produces fidelity expectations and a rollback token. WIGSS compares the post-apply DOM with the edited result using a two-pixel tolerance. A mismatch is shown as a warning instead of being treated as a successful refactor.",
      ),
    ],
  },
  {
    slug: "wigtn-coding",
    kind: "report",
    tag: "OPEN SOURCE",
    title: "WIGTN Coding: Parallel multi-agent workflows for software delivery",
    summary:
      "WIGTN Coding packages product specification, architecture, implementation, review, and release checks into one Claude Code plugin with 13 specialized agents.",
    date: "2026.03.28",
    readTime: "6 min",
    author: "WIGTN",
    links: [{ label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins" }],
    sourceNote:
      "This page describes version 0.1.14 of the public plugin repository. Agent, skill, and style counts are configuration counts, not productivity or quality benchmarks.",
    body: [
      { t: "h", text: "Why the workflow is split into roles" },
      p(
        "A single coding prompt tends to mix product decisions, architecture, implementation, and review in one context. WIGTN Coding separates those responsibilities so that each stage has a named output and a quality gate before the next stage begins.",
      ),
      { t: "h", text: "The published pipeline" },
      { t: "list", items: [
        "Product definition: create a PRD and a phased implementation plan",
        "PRD review: inspect completeness, feasibility, security, and consistency in parallel",
        "Design: load the approved requirements, choose architecture, and inspect the current project",
        "Build: assign backend, frontend, AI, and operations work according to the files in scope",
        "Review: score readability, performance, testability, best practices, and security",
        "Release: stop on a failed quality gate, or prepare a deliberate commit and pull request",
      ] },
      { t: "h", text: "How the agents share context" },
      p(
        "The workflow uses three layers of memory. Repository conventions live in persistent memory. Session-specific contracts are written to a shared context file. Individual work items track short-lived task state. The goal is to keep API contracts and naming decisions visible when several roles work on the same feature.",
      ),
      { t: "h", text: "What the counts mean" },
      p(
        "The repository currently lists 13 agents, 6 reusable skills, and 20 design references. These numbers describe the package surface. They do not prove that a multi-agent run is faster or produces better software than a single-agent run. A controlled task set with time, cost, correctness, and review outcomes is still needed.",
      ),
    ],
  },

  /* ───────── Events (real) ───────── */
  {
    slug: "trae-seoul-grand-prize",
    kind: "event",
    channel: "newsroom",
    newsTopic: "award",
    tag: { en: "GRAND PRIZE", ko: "대상" },
    icon: "trophy",
    title: { en: "Grand Prize: Build with TRAE Seoul (ByteDance)", ko: "대상 수상: Build with TRAE Seoul (ByteDance)" },
    summary:
      { en: "WIGENT, a multi-agent debate arena, won the Grand Prize, built by 3 engineers in 3.5 hours.", ko: "다중 에이전트 토론 아레나 WIGENT가 대상을 받았습니다. 엔지니어 3명이 3시간 30분 만에 만들었습니다." },
    date: "2026.03.28",
    place: { en: "Seoul, KOR", ko: "서울" },
    author: "ByteDance",
    readTime: { en: "4 min", ko: "4분" },
    image: "/images/projects/trae_hackthon_seoul.png",
    externalUrl: "https://wigtn.github.io/blog/wigent/",
    links: [{ label: { en: "GitHub", ko: "GitHub" }, href: "https://github.com/wigtn/wigent" }],
    body: [
      { t: "h", text: { en: "Grand Prize in 3.5 hours", ko: "3시간 30분 만의 대상" } },
      p(
        { en: "At Build with TRAE Seoul, ByteDance's hackathon, three of us built WIGENT, a multi-agent debate arena where AI experts argue a question out and ship a page from the conclusion, in three and a half hours. It won the Grand Prize.", ko: "ByteDance가 연 해커톤 Build with TRAE Seoul에서 세 명이 WIGENT를 만들었습니다. AI 전문가들이 질문 하나를 끝까지 토론한 뒤, 그 결론으로 페이지 한 장을 뽑아내는 다중 에이전트 토론 아레나입니다. 세 시간 반이 걸렸고, 대상을 받았습니다." },
      ),
      p(
        { en: "Blank repo to a working demo on stage in a single afternoon. It's the kind of build we keep signing up for.", ko: "빈 저장소에서 시작해 오후 한나절 만에 무대 위 데모까지. 저희가 이런 자리에 계속 참가 신청을 하는 이유입니다." },
      ),
      { t: "quote", text: { en: "Grand Prize: Build with TRAE Seoul, built by 3 engineers in 3.5 hours.", ko: "대상, Build with TRAE Seoul. 엔지니어 3명이 3시간 30분 만에." } },
    ],
  },
  {
    slug: "snowflake-korea-2026",
    kind: "event",
    channel: "newsroom",
    newsTopic: "award",
    tag: { en: "2ND PLACE · TECH TRACK", ko: "테크 트랙 2위" },
    icon: "trophy",
    title: { en: "2nd Place, Tech Track: Snowflake AI & Data Hackathon Korea 2026", ko: "테크 트랙 2위: Snowflake AI & Data Hackathon Korea 2026" },
    summary:
      { en: "WIGTN Flake turns Snowflake Cortex into a purpose-driven neighborhood-intelligence platform where five AI experts debate evidence from three actively selected datasets.", ko: "WIGTN Flake는 Snowflake Cortex를 목적 중심 동네 분석 플랫폼으로 바꿉니다. AI 전문가 다섯이 실제로 선택된 세 개 데이터셋의 근거를 놓고 토론합니다." },
    date: "2026.04.29",
    place: { en: "Seoul, KOR", ko: "서울" },
    author: "Snowflake",
    readTime: { en: "5 min", ko: "5분" },
    image: "/images/news/snowflake.jpeg",
    externalUrl: "https://wigtn.github.io/blog/wigtn-flake/",
    links: [
      { label: { en: "Watch demo", ko: "데모 영상" }, href: "https://www.youtube.com/watch?v=1YzSp3SdzTk" },
      { label: { en: "Press", ko: "보도자료" }, href: "https://www.newswire.co.kr/newsRead.php?no=1033575" },
      { label: { en: "Tech report", ko: "테크 리포트" }, href: techReportHref("wigtn-flake") },
    ],
    body: [
      { t: "h", text: { en: "Second place, Tech Track", ko: "테크 트랙 2위" } },
      p(
        { en: "At the Snowflake AI & Data Hackathon Korea 2026 in Seoul, WIGTN Flake placed 2nd in the Tech Track. From an open-ended brief, we built a neighborhood-intelligence platform on Snowflake Cortex: pick a goal, and five AI experts debate the data before landing on a ranked, actionable answer.", ko: "서울에서 열린 Snowflake AI & Data Hackathon Korea 2026에서 WIGTN Flake가 테크 트랙 2위에 올랐습니다. 열린 주제 하나만 주어진 상태에서 Snowflake Cortex 위에 동네 분석 플랫폼을 만들었습니다. 목적을 고르면 AI 전문가 다섯이 데이터를 놓고 토론한 뒤, 순위가 매겨진 실행 가능한 답을 내놓습니다." },
      ),
      { t: "h", text: { en: "The best part wasn't the trophy", ko: "트로피가 가장 좋았던 건 아닙니다" } },
      p(
        { en: "The finals floor was full of sharp teams solving the same brief in completely different ways. We left with as many ideas from the other builders as from our own demo, which is the part we keep coming back for.", ko: "결선장은 같은 주제를 완전히 다른 방식으로 푸는 날카로운 팀들로 가득했습니다. 우리 데모에서 얻은 것만큼 다른 빌더들에게서 아이디어를 얻어 돌아왔고, 저희가 이런 자리를 계속 찾는 이유가 바로 그 부분입니다." },
      ),
      { t: "quote", text: { en: "Tech Track 2nd Place: Snowflake AI & Data Hackathon Korea 2026.", ko: "테크 트랙 2위, Snowflake AI & Data Hackathon Korea 2026." } },
    ],
  },
  {
    slug: "oba-weekendthon-top6",
    kind: "event",
    channel: "newsroom",
    newsTopic: "award",
    tag: "TOP 6",
    icon: "trophy",
    title: { en: "Top 6 at OBA Weekendthon: MyunZy, an AI interviewer built in a weekend", ko: "OBA 위켄드톤 Top 6: 주말 이틀에 만든 AI 면접관 면지" },
    summary:
      { en: "MyunZy reads your real resume and a real job posting, then runs the interview before the interview. Built over two days on EXAONE-4.5 inside a deterministic tool-calling harness.", ko: "면지는 당신의 실제 이력서와 실제 채용공고를 읽고, 면접 전에 면접을 겪게 합니다. EXAONE-4.5를 결정론 tool-call 하네스 안에서 굴려 이틀 만에 만들었습니다." },
    date: "2026.05.31",
    place: { en: "Yongin, KOR", ko: "용인" },
    author: "Open Builders Alliance",
    readTime: { en: "4 min", ko: "4분" },
    image: "/images/news/OBA.jpeg",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/myunzy-hackathone" },
      { label: { en: "Event", ko: "행사 페이지" }, href: "https://luma.com/y3nz68hw" },
    ],
    body: [
      { t: "h", text: { en: "Two days, one rule", ko: "이틀, 규칙 하나" } },
      p(
        { en: "OBA Weekendthon ran over the last weekend of May at the Kakao AI Campus in Yongin, organised by Hashed, Market Fit Lab, and vooy under the Open Builders Alliance. Fifty builders, teams of three, and one rule that shaped every project: whatever you build has to run on the Open APIs the event provides. Judging was split evenly between the official panel and peer review from the other teams.", ko: "OBA 위켄드톤은 5월 마지막 주말 용인 카카오 AI 캠퍼스에서 열렸습니다. Hashed, 마켓핏랩, vooy가 Open Builders Alliance 아래 주최했습니다. 빌더 50명, 팀당 세 명, 그리고 모든 프로젝트를 규정한 규칙 하나. 무엇을 만들든 행사가 제공한 Open API 위에서 돌아가야 한다는 것이었습니다. 심사는 공식 심사위원과 다른 팀들의 피어리뷰가 반반이었습니다." },
      ),
      p(
        { en: "Three of us went, and came out in the Top 6 with MyunZy (면지), an AI interviewer. Give it your actual resume and an actual job posting and it assembles four interviewers, technical, culture fit, executive, and HR, each already knowing where your story is thin. You answer out loud. It follows up on whatever you fumble, and it keeps a weakness profile that sharpens as the session goes.", ko: "저희는 세 명이 참가해 AI 면접관 면지로 Top 6에 올랐습니다. 실제 이력서와 실제 채용공고를 넣으면 면접관 넷이 만들어집니다. 기술, 컬처핏, 임원, HR. 각자 당신의 이야기가 어디서 얇은지 이미 알고 있습니다. 소리 내어 답하면 흔들린 지점을 놓치지 않고 파고들고, 세션이 진행될수록 날카로워지는 약점 프로필을 쌓아갑니다." },
      ),
      { t: "h", text: { en: "The bet: a small Korean model, held in place by the harness", ko: "베팅: 작은 한국어 모델, 하네스가 붙잡는다" } },
      p(
        { en: "The instinct in a hackathon is to reach for the biggest model on offer. We went the other way and ran EXAONE-4.5, LG's open Korean model, on vLLM inside a deterministic tool-calling harness: schema validation on every call, automatic re-prompting when one comes back malformed, and scoring done in pure functions rather than by the model. The interviewer holds character to the last question without needing frontier-scale improvisation.", ko: "해커톤에서는 가장 큰 모델을 집는 게 본능입니다. 저희는 반대로 갔습니다. LG의 한국어 오픈 모델 EXAONE-4.5를 vLLM으로 띄우고 결정론 tool-call 하네스 안에 넣었습니다. 모든 호출에 스키마 검증, 형식이 깨져 돌아오면 자동 리프롬프트, 채점은 모델이 아니라 순수 함수가 담당합니다. 프런티어급 자유연기 없이도 면접관은 마지막 질문까지 캐릭터를 유지합니다." },
      ),
      p(
        { en: "The build is mock-first, so every feature completes end to end with zero API keys and flipping an environment variable promotes it to the live services without touching code. Word-level timestamps from Qwen3 ASR feed the STAR-based feedback and let you rewind to a single answer and try it a different way.", ko: "빌드는 mock-first입니다. API 키가 하나도 없어도 모든 기능이 끝까지 동작하고, 환경 변수 하나만 바꾸면 코드를 건드리지 않고 실서비스로 승격됩니다. Qwen3 ASR의 단어 단위 타임스탬프가 STAR 기반 피드백에 들어가고, 답변 하나를 골라 되감아 다르게 시도해 볼 수 있게 합니다." },
      ),
      { t: "h", text: { en: "The room was the prize", ko: "진짜 상은 그 공간이었습니다" } },
      p(
        { en: "The best part of a weekendthon is not your own build. It is watching the other teams start from the same blank page and the same two days, then walk out with things none of us would have thought of. We went for the trophy and left with a list of ideas to steal.", ko: "위켄드톤에서 가장 좋은 건 우리가 만든 결과물이 아닙니다. 다른 팀들이 같은 백지와 같은 이틀에서 출발해, 우리는 떠올리지도 못한 것을 들고 나오는 걸 지켜보는 것입니다. 트로피를 노리고 갔다가 훔쳐 오고 싶은 아이디어 목록을 들고 돌아왔습니다." },
      ),
      p({ en: "Built by Hyeonsang Kim, Jinmo Kim, and Sang-Woo Son.", ko: "김현상, 김진모, 손상우가 만들었습니다." }),
      { t: "quote", text: { en: "Top 6 at OBA Weekendthon, built by 3 engineers in two days.", ko: "OBA 위켄드톤 Top 6. 엔지니어 3명이 이틀 만에." } },
    ],
  },
  {
    slug: "acl-2026-san-diego",
    kind: "event",
    channel: "newsroom",
    newsTopic: "announcement",
    tag: "ACL 2026",
    icon: "pin",
    title: { en: "WIGVO at ACL 2026 in San Diego: a live demo booth, plus an IWSLT invited talk", ko: "ACL 2026 샌디에이고의 WIGVO: 라이브 데모 부스, 그리고 IWSLT 초청 발표" },
    summary:
      { en: "We brought WIGVO to the ACL 2026 System Demonstrations floor as a live booth, and were invited to present at IWSLT 2026: an oral talk and a poster.", ko: "WIGVO를 ACL 2026 System Demonstrations 현장에 라이브 부스로 가져갔고, IWSLT 2026에도 초청받아 구두 발표와 포스터를 진행했습니다." },
    date: "2026.07.16",
    place: { en: "San Diego, USA", ko: "샌디에이고, 미국" },
    author: "WIGTN Research",
    readTime: { en: "6 min", ko: "6분" },
    image: "/images/news/acl_sandiego_TEAM.jpg",
    externalUrl: "https://wigtn.github.io/blog/wigvo/",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/wigvo-v2" },
      { label: { en: "Watch demo", ko: "데모 영상" }, href: "https://youtu.be/_ixVEnHJxjk" },
    ],
    body: [
      p(
        { en: "San Diego, July 2026. After the acceptance email back in April, WIGVO finally made it to the ACL 2026 floor, not as a poster tucked in a hallway, but as a live demo booth in the System Demonstrations track. For three days we handed strangers a phone, let them speak their own language, and watched the person on the other end hear it in theirs.", ko: "2026년 7월 샌디에이고. 4월의 억셉 메일 이후 WIGVO는 마침내 ACL 2026 현장에 섰습니다. 복도 한켠의 포스터가 아니라 System Demonstrations 트랙의 라이브 데모 부스로였습니다. 사흘 동안 처음 만난 사람들에게 전화기를 건네고, 각자의 언어로 말하게 하고, 상대방이 자기 언어로 그것을 듣는 장면을 지켜봤습니다." },
      ),
      { t: "h", text: { en: "A demo you could actually pick up and use", ko: "직접 들고 써볼 수 있는 데모" } },
      p(
        { en: "Most demos ask you to watch. Ours asked you to talk. Visitors dialed a number, the recipient answered an ordinary phone (no app, no headset, no setup) and the two of them held a conversation across a language barrier in near real time. That is the whole point of WIGVO: it meets people where they already are. The hospital front desk, the city office, the bank call center: the places that need translation most are still running on landlines.", ko: "대부분의 데모는 보라고 합니다. 저희 데모는 말하라고 했습니다. 방문자가 번호를 누르면 상대는 평범한 전화기로 받았고, 앱도 헤드셋도 설정도 없이 두 사람이 언어 장벽을 사이에 두고 거의 실시간으로 대화했습니다. WIGVO의 요점이 바로 그것입니다. 사람들이 이미 있는 자리로 찾아가는 것. 병원 접수대, 시청 민원실, 은행 콜센터처럼 번역이 가장 필요한 곳은 아직 유선 전화 위에서 돌아갑니다." },
      ),
      p(
        { en: "Running it live, all day, in a noisy conference hall was its own stress test. The software-only echo cancellation held. The dual-session design kept each speaker's interpreter from bleeding into the other. And the latency stayed low enough that conversations felt like conversations, not walkie-talkie exchanges.", ko: "시끄러운 컨퍼런스 홀에서 하루 종일 라이브로 돌리는 것 자체가 스트레스 테스트였습니다. 소프트웨어만으로 구현한 에코 제거가 버텼습니다. 듀얼 세션 설계 덕분에 두 화자의 통역이 서로 섞이지 않았습니다. 지연 시간도 충분히 낮아서, 무전기를 주고받는 느낌이 아니라 대화처럼 느껴졌습니다." },
      ),
      { t: "h", text: { en: "The questions that surprised us", ko: "예상 밖의 질문들" } },
      p(
        { en: "We expected the academic questions about the model, the data, the evaluation. We got those. What we didn't expect was how many people came at it from the industry side: How does it handle the PSTN? What's the per-minute cost at scale? Can it drop into an existing call center? Which languages are production-ready today?", ko: "모델과 데이터, 평가에 관한 학술적인 질문은 예상했고 실제로 받았습니다. 예상하지 못한 건 산업 쪽에서 온 질문이 얼마나 많았는가였습니다. PSTN은 어떻게 처리하나? 규모가 커지면 분당 비용은? 기존 콜센터에 그대로 넣을 수 있나? 지금 프로덕션에 쓸 수 있는 언어는 어디까지인가?" },
      ),
      p(
        { en: "Those are deployment questions, not paper questions. They came from engineers and product people who weren't asking whether it works in a benchmark. They were asking whether they could ship it next quarter.", ko: "논문의 질문이 아니라 배포의 질문이었습니다. 벤치마크에서 동작하는지가 아니라 다음 분기에 출시할 수 있는지를 묻는, 엔지니어와 프로덕트 담당자들의 질문이었습니다." },
      ),
      {
        t: "quote",
        text: { en: "That's when it clicked: this isn't just a paper, it's a product people are waiting for.", ko: "그때 확신했습니다. 이건 그냥 논문이 아니라, 사람들이 기다리고 있는 프로덕트라는 것." },
      },
      { t: "h", text: { en: "A lucky bonus: IWSLT 2026", ko: "운 좋은 보너스: IWSLT 2026" } },
      p(
        { en: "Alongside the main-conference demo, WIGVO was invited to IWSLT 2026, the spoken-language-translation workshop. That turned into two more sessions: an invited oral talk and a poster. The oral let us walk through the architecture end to end; the poster turned into a two-hour conversation with the people who care most about real-time speech translation.", ko: "메인 컨퍼런스 데모와 별개로, WIGVO는 음성 언어 번역 워크숍인 IWSLT 2026에도 초청받았습니다. 덕분에 두 세션이 더 생겼습니다. 초청 구두 발표와 포스터입니다. 구두 발표에서는 아키텍처를 처음부터 끝까지 짚었고, 포스터는 실시간 음성 번역에 가장 진심인 사람들과의 두 시간짜리 대화가 됐습니다." },
      ),
      {
        t: "image",
        src: "/images/news/acl_sandiego_IWSLT.jpg",
        caption: { en: "Presenting WIGVO at the IWSLT 2026 workshop: invited oral talk and poster.", ko: "IWSLT 2026 워크숍에서 WIGVO를 발표하는 모습. 초청 구두 발표와 포스터." },
      },
      { t: "h", text: { en: "What we're taking home", ko: "돌아오며 챙긴 것" } },
      p(
        { en: "We flew back with a longer to-do list than we arrived with: languages people asked for, integrations people wanted, edge cases we hadn't hit until a stranger tried them live. San Diego reframed the work for us: WIGVO isn't finished when the paper is published. It's finished when someone calls a hospital in a language they don't share, and it just works.", ko: "돌아오는 비행기에서는 갈 때보다 할 일 목록이 길어져 있었습니다. 사람들이 요청한 언어들, 원한 연동들, 낯선 사람이 직접 해보기 전까지는 마주치지 못한 예외들. 샌디에이고는 이 일을 다시 정의해 줬습니다. WIGVO는 논문이 게재되면 끝나는 게 아닙니다. 누군가 자기가 모르는 언어를 쓰는 병원에 전화를 걸었을 때 그냥 되는 순간에 끝납니다." },
      ),
      { t: "quote", text: { en: "San Diego, you were great. Now back to shipping.", ko: "샌디에이고, 좋았습니다. 이제 다시 만들러 갑니다." } },
    ],
  },

  /* ───────── Newsroom · Releases & Updates (real) ───────── */
  {
    slug: "wigtnocr-open-source",
    kind: "report",
    channel: "newsroom",
    newsTopic: "release",
    tag: { en: "RELEASE", ko: "릴리스" },
    title: { en: "WigtnOCR is open source: our 2B Korean doc parser is on HuggingFace", ko: "WigtnOCR 오픈소스 공개: 2B 한국어 문서 파서가 HuggingFace에 올라갔습니다" },
    summary:
      { en: "Weights, training data, and eval code for the 2B parser that ranked #1 on KoGovDoc-Bench are now public. Teacher-level document parsing on a single consumer GPU.", ko: "KoGovDoc-Bench 1위를 기록한 2B 파서의 가중치, 학습 데이터, 평가 코드를 모두 공개했습니다. 소비자용 GPU 한 장으로 교사 모델 수준의 문서 파싱을 돌릴 수 있습니다." },
    date: "2026.05.21",
    author: "WIGTN",
    readTime: { en: "5 min", ko: "5분" },
    image: "/images/projects/wigtnocr-huggingface.png",
    externalUrl: "https://wigtn.github.io/blog/wigtnocr/",
    links: [
      { label: "HuggingFace", href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR" },
      { label: "GitHub", href: "https://github.com/wigtn/wigtnOCR-v1" },
      { label: { en: "Tech report", ko: "테크 리포트" }, href: techReportHref("wigtnocr") },
    ],
    body: [
      { t: "h", text: { en: "It's open", ko: "공개했습니다" } },
      p(
        { en: "WigtnOCR is now fully open source: model weights on HuggingFace, training data and evaluation code on GitHub. The 2B parser that ranked #1 on KoGovDoc-Bench, reading Korean government documents like a model fifteen times its size, is now yours to run or retrain.", ko: "WigtnOCR을 완전히 공개했습니다. 모델 가중치는 HuggingFace에, 학습 데이터와 평가 코드는 GitHub에 있습니다. KoGovDoc-Bench에서 1위를 기록하며 15배 큰 모델처럼 한국어 공문서를 읽어내는 2B 파서를, 이제 직접 돌리거나 재학습시킬 수 있습니다." },
      ),
      { t: "quote", text: { en: "Teacher-level accuracy at 1/15th the size, now yours to run.", ko: "15분의 1 크기로 교사 모델 수준의 정확도. 이제 직접 돌려보실 수 있습니다." } },
      { t: "h", text: { en: "Go deeper", ko: "더 자세히" } },
      p({ en: "How we distilled a 30B teacher into a 2B student (the method, ablations, and full benchmark breakdown) is in the WigtnOCR tech report.", ko: "30B 교사 모델을 2B 학생 모델로 증류한 방법과 어블레이션, 전체 벤치마크 분석은 WigtnOCR 테크 리포트에 있습니다." }),
    ],
  },
  {
    slug: "wigss-npm-release",
    kind: "report",
    channel: "newsroom",
    newsTopic: "release",
    tag: { en: "RELEASE", ko: "릴리스" },
    title: { en: "WIGSS v0.1.4 is on npm: drag UI in the browser, watch the source rewrite itself", ko: "WIGSS v0.1.4 npm 배포: 브라우저에서 UI를 끌면 소스가 알아서 바뀝니다" },
    summary:
      { en: "Our always-on visual refactoring agent is on npm, now at v0.1.4. Point it at your dev server, drag components around in the browser, and the source rewrites itself.", ko: "상시 동작하는 시각 리팩터링 에이전트를 npm에 올렸습니다. 현재 v0.1.4입니다. 개발 서버를 가리키고 브라우저에서 컴포넌트를 끌면 소스가 스스로 다시 쓰입니다." },
    date: "2026.04.03",
    author: "WIGTN",
    readTime: { en: "3 min", ko: "3분" },
    image: "/images/carousel/wigss-npm.png",
    externalUrl: "https://wigtn.github.io/blog/wigss/",
    links: [
      { label: "npm", href: "https://npmjs.com/package/wigss" },
      { label: "GitHub", href: "https://github.com/wigtn/wigss" },
      { label: { en: "Tech report", ko: "테크 리포트" }, href: techReportHref("wigss") },
    ],
    body: [
      { t: "h", text: "npm install wigss@0.1.4" },
      p(
        { en: "WIGSS is on npm, now at v0.1.4 (published April 3). The always-on visual refactoring agent installs in one command: point it at your running dev server, drag UI components around in the browser, and it rewrites the underlying source to match.", ko: "WIGSS가 npm에 올라갔습니다. 4월 3일 배포된 v0.1.4입니다. 상시 동작하는 시각 리팩터링 에이전트로, 명령 한 줄이면 설치됩니다. 실행 중인 개발 서버를 가리킨 뒤 브라우저에서 UI 컴포넌트를 끌면, 그에 맞게 소스 코드가 다시 쓰입니다." },
      ),
      { t: "quote", text: { en: "Drag UI, code rewrites itself.", ko: "UI를 끌면 코드가 스스로 바뀝니다." } },
      { t: "h", text: { en: "Go deeper", ko: "더 자세히" } },
      p({ en: "How WIGSS keeps the browser canvas and your source in sync is in the WIGSS tech report.", ko: "WIGSS가 브라우저 캔버스와 소스를 어떻게 동기화하는지는 WIGSS 테크 리포트에 있습니다." }),
    ],
  },
  {
    slug: "wigtn-coding-release",
    kind: "report",
    channel: "newsroom",
    newsTopic: "release",
    tag: { en: "RELEASE", ko: "릴리스" },
    title: { en: "WIGTN Coding v0.1.14: the PRD analyzer now fact-checks its premises against the live web", ko: "WIGTN Coding v0.1.14: PRD 분석기가 전제를 실시간 웹으로 사실 확인합니다" },
    summary:
      { en: "The newest release of our Claude Code plugin ecosystem adds PRD external-grounding: before it analyzes a spec, it verifies the assumptions against real web evidence so false premises don't slip through.", ko: "Claude Code 플러그인 생태계의 최신 릴리스에 PRD 외부 근거 확인이 추가됐습니다. 명세를 분석하기 전에 전제를 실제 웹 근거와 대조해, 틀린 전제가 그대로 넘어가지 않게 합니다." },
    date: "2026.07.14",
    author: "WIGTN",
    readTime: { en: "3 min", ko: "3분" },
    externalUrl: "https://wigtn.github.io/blog/wigtn-coding/",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins-with-claude-code" },
      { label: { en: "Tech report", ko: "테크 리포트" }, href: techReportHref("wigtn-coding") },
    ],
    body: [
      { t: "h", text: { en: "What's new in v0.1.14", ko: "v0.1.14의 변경점" } },
      p(
        { en: "The latest WIGTN Coding release adds PRD external-grounding. When the plugin reviews a product spec, it now checks the spec's assumptions against live web evidence, catching false premises before they turn into wrong code.", ko: "이번 WIGTN Coding 릴리스에 PRD 외부 근거 확인이 들어갔습니다. 플러그인이 제품 명세를 검토할 때, 명세가 깔고 있는 전제를 실시간 웹 근거와 대조합니다. 틀린 전제가 잘못된 코드로 바뀌기 전에 잡아냅니다." },
      ),
      p(
        { en: "It caps a busy week of shipping: five releases, v0.1.10 through v0.1.14, between July 9 and 14.", ko: "7월 9일부터 14일까지 v0.1.10에서 v0.1.14까지 다섯 번 배포한 한 주의 마무리이기도 합니다." },
      ),
      { t: "quote", text: { en: "Idea to deploy, zero friction.", ko: "아이디어에서 배포까지, 마찰 없이." } },
      { t: "h", text: { en: "Go deeper", ko: "더 자세히" } },
      p({ en: "The full agent lineup (12 agents, 3 skills, 17 design styles) and how the parallel execution works are in the WIGTN Coding tech report.", ko: "에이전트 12개, 스킬 3개, 디자인 스타일 17종의 전체 구성과 병렬 실행 방식은 WIGTN Coding 테크 리포트에 있습니다." }),
    ],
  },

  /* ───────── Community (placeholder mock, no real data yet) ───────── */
  {
    slug: "tech-meetup-07-inference-optimization",
    kind: "community",
    tag: "MEETUP",
    title: "WIGTN Tech Meetup #07: Inference optimization in practice",
    summary: "Quantization, KV cache, and speculative decoding from a practitioner's view. (Placeholder)",
    date: "2026.06.05",
    place: "Seoul, KOR",
    placeholder: true,
    body: [
      { t: "quote", text: "Placeholder: community meetups/seminars have no real data yet. This stands in to show the layout." },
      p("Quantization, KV cache, and speculative decoding from a practitioner's view. Slides and recording would be linked here."),
    ],
  },
  {
    slug: "open-seminar-evaluating-agents",
    kind: "community",
    tag: "SEMINAR",
    title: "Open Seminar: How should we evaluate agents?",
    summary: "Designing evaluation metrics for production agents. (Placeholder)",
    date: "2026.05.20",
    place: "Online",
    placeholder: true,
    body: [
      { t: "quote", text: "Placeholder: kept as mock until real seminar content exists." },
      p("A practical evaluation playbook for production agents: outcome metrics over vibes, trajectory checks, and cost/latency as first-class metrics."),
    ],
  },

  /* ───────── Tech Insights (real videos + note) ───────── */
  {
    slug: "wigvo-realtime-translation-video",
    kind: "insight",
    tag: "VIDEO",
    title: "How WIGVO translates a phone call in real time",
    summary: "A video walkthrough of the dual-session relay, silence injection, and voice-activity gating used to translate ordinary PSTN calls.",
    date: "2026.03.02",
    author: "WIGTN",
    video: true,
    videoUrl: "https://www.youtube.com/watch?v=jK1CDOQExLw",
    links: [
      { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=jK1CDOQExLw" },
      { label: "ACL 2026 paper", href: "https://aclanthology.org/2026.acl-demo.33/" },
    ],
    sourceNote:
      "This is a companion page for the WIGTN walkthrough video. Evaluation figures come from the ACL 2026 system-demonstration paper, not from the video alone.",
    body: [
      { t: "h", text: "Why a normal phone call is difficult" },
      p(
        "PSTN calls use narrowband G.711 audio and do not provide the client-side echo cancellation available in a mobile or web calling app. Synthesized speech can return through the phone network, enter speech recognition again, and create a repeating translation loop.",
      ),
      { t: "h", text: "Two sessions, one call" },
      p(
        "WIGVO keeps the two directions separate. Session A handles the browser speaker and delivers translated audio to the phone. Session B receives the phone speaker, filters the PSTN audio, and returns translated speech to the browser. Independent prompts and context prevent one direction from contaminating the other.",
      ),
      { t: "h", text: "The audio path shown in the video" },
      { t: "list", items: [
        "Echo gate: replace returning synthesized audio with valid G.711 silence frames",
        "Energy gate: reject weak PSTN noise before it reaches speech recognition",
        "Voice activity detection: use a local detector with PSTN-specific onset and offset timing",
        "Hallucination filter: block broadcast-style phrases produced from line noise",
        "Translation: separate transcription from deterministic text translation before speech output",
      ] },
      { t: "h", text: "Published evaluation" },
      p(
        "The ACL paper reports 155 Korean-English PSTN calls, including 148 instrumented calls and 147 completed calls. Median caller-to-callee latency was 555 ms. The reported field evaluation observed no echo-induced translation loops and an average cost of USD 0.28 per minute.",
      ),
    ],
  },
  {
    slug: "wigtn-flake-cortex-debate-video",
    kind: "insight",
    tag: "VIDEO",
    title: "WIGTN Flake: Multi-agent location analysis with Snowflake Cortex",
    summary: "A demo of five purpose-specific agents using Snowflake Cortex to compare three actively selected datasets and produce a ranked location recommendation.",
    date: "2026.04.15",
    author: "WIGTN",
    video: true,
    videoUrl: "https://www.youtube.com/watch?v=1YzSp3SdzTk",
    links: [
      { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=1YzSp3SdzTk" },
      { label: "Award announcement", href: "https://www.newswire.co.kr/newsRead.php?no=1033575" },
    ],
    sourceNote:
      "This page is a guided companion to WIGTN's hackathon demo. The system description comes from the project documentation; the Tech Track second-place result is verified by Snowflake's event announcement.",
    body: [
      { t: "h", text: "Start with a decision, not a dashboard" },
      p(
        "The user chooses a concrete goal such as opening a cafe, placing a billboard, targeting rental-appliance customers, investing in real estate, or detecting an unusual trade area. That goal changes which evidence matters and how each district is scored.",
      ),
      { t: "h", text: "Five agents examine the same question" },
      p(
        "A facilitator coordinates a data analyst, forecast analyst, insight analyst, and sentiment analyst. The agents can disagree because they inspect different signals. Their job is to expose trade-offs before the system produces a final ranking.",
      ),
      { t: "h", text: "What runs underneath the debate" },
      { t: "list", items: [
        "Cortex Analyst queries three actively selected semantic models for foot traffic, real estate, and telecom data",
        "FORECAST and ANOMALY_DETECTION run in parallel for candidate districts",
        "The orchestrator merges the results into a shared evidence set",
        "The final report returns a Top 3, anomaly badges, a six-month view, and an action checklist",
      ] },
      { t: "h", text: "What the demo proves" },
      p(
        "The demo proves that the multi-agent flow and three actively selected data sources were integrated into a working hackathon system. It does not establish that five agents make better location decisions than one agent or a human analyst. The published external result is the Tech Track second-place award.",
      ),
    ],
  },
  {
    slug: "why-we-distill-30b-into-2b",
    kind: "insight",
    tag: "ENGINEERING NOTE · WIGTNOCR",
    title: "Why we distilled a 30B document parser into a 2B model",
    summary:
      "This engineering note explains one decision from the WigtnOCR release: use a large model to create filtered supervision, then serve the task with a smaller domain model.",
    date: "2026.05.22",
    readTime: "5 min",
    author: "WIGTN Research",
    links: [
      { label: "WigtnOCR repository", href: "https://github.com/wigtn/wigtnOCR-v1" },
      { label: "Model card", href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR" },
    ],
    sourceNote:
      "This is a WIGTN editorial note derived from the WigtnOCR v1 repository and model card. It is not a separate paper, benchmark, or third-party article.",
    body: [
      { t: "h", text: "Where this note comes from" },
      p(
        "WigtnOCR began with a specific engineering question: can a small parser learn the useful document behavior of a much larger vision-language model? This page interprets the released training and evaluation results. It should be read as commentary on the WigtnOCR release, not as an independent study.",
      ),
      { t: "h", text: "Use the large model where it adds leverage" },
      p(
        "The 30B model was used offline to convert 4,501 document pages into structured Markdown. A separate text-only judge filtered weak supervision before training. The large model therefore paid a one-time data-generation cost instead of sitting in the production path for every document.",
      ),
      { t: "list", items: [
        "Teacher: Qwen3-VL-30B-Instruct for pseudo-ground-truth generation",
        "Judge: Qwen3.5-122B for five-dimension text-only quality scoring",
        "Student: Qwen3-VL-2B-Instruct with LoRA fine-tuning",
        "Final training set: 2,667 pages with 294 pages held out for validation",
      ] },
      { t: "h", text: "The student is narrower, not universally smarter" },
      p(
        "The 2B student is specialized for structure-preserving parsing. It matches or exceeds the teacher in four of five reported OmniDocBench metric categories and performs better in the released KoGovDoc retrieval table. The teacher still leads formula CDM F1, and the student retains a 5.8 percent skip rate.",
      ),
      { t: "h", text: "Why the deployment decision follows" },
      p(
        "The model card supports single-GPU serving through vLLM. That changes the serving footprint from a large general model to a compact task model. The released artifacts do not include a controlled cost or throughput study, so this note does not claim a specific saving. The defensible conclusion is narrower: distillation preserved the evaluated document behavior while reducing the parameter count from 30B to 2B.",
      ),
    ],
  },
];

/* Selectors */
export const byKind = (k: Kind) => ARTICLES.filter((a) => a.kind === k);
export const FEATURED = ARTICLES.find((a) => a.featured)!;
/* Curated homepage "newsroom": research credibility & wins told as article
 * cards with imagery (papers, conference reports, awards), not a dry list. */
export const NEWSROOM = [
  ARTICLES.find((a) => a.slug === "snowflake-korea-2026")!, // 2026.04.29
  ARTICLES.find((a) => a.slug === "wigvo")!, // 2026.04.27
  ARTICLES.find((a) => a.slug === "trae-seoul-grand-prize")!, // 2026.03.28
];
export const REPORTS = byKind("report").filter((a) => !a.featured);
export const EVENTS = byKind("event");
export const COMMUNITY = byKind("community");
export const INSIGHTS = byKind("insight");
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);


/* Homepage teasers: a few highlights only; the rest lives on sub-pages. */
export const SELECTED_WORK = [getArticle("wigtnocr")!, getArticle("wigvo")!];

/* Swipe carousel: image-led highlights (all have posters). */
export const HIGHLIGHTS: { article: Article; short: string }[] = [
  { article: getArticle("wigtnocr")!, short: "WigtnOCR" },
  { article: getArticle("wigvo")!, short: "WIGVO" },
  { article: getArticle("snowflake-korea-2026")!, short: "Snowflake ’26" },
  { article: getArticle("trae-seoul-grand-prize")!, short: "TRAE Seoul" },
  { article: getArticle("acl-2026-san-diego")!, short: "ACL San Diego" },
];

/* Scroll-highlight strengths (SORI "Our strength"). */
export const STRENGTHS = [
  { kicker: "Published at ACL & EMNLP", title: "Peer-reviewed research" },
  { kicker: "Meetups, seminars, and study groups", title: "Learning together" },
  { kicker: "Models, tools, and plugins in the open", title: "Open source by default" },
];

/* ── Research & Tech Assets (homepage centerpiece) ── */

/* Publications: venue + status emphasized as the proof of research depth. */
export const PUBLICATIONS = [
  { venue: "ACL 2026", status: "Accepted · System Demonstrations", slug: "wigvo" },
  { venue: "EMNLP 2026", status: "In preparation · Industry Track", slug: "wigtnocr" },
];

/* Open source & models: platform-labelled cards (no fabricated metrics). */
export const OPEN_SOURCE = [
  {
    name: "WigtnOCR",
    platform: "HuggingFace + GitHub",
    desc: "2B Korean document parser, #1 on KoGovDoc-Bench. Weights, data, and eval open.",
    href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR",
    slug: "wigtnocr",
    metrics: ["#1 KoGovDoc-Bench", "2B params", "Runs on 1 GPU"],
  },
  {
    name: "WIGSS",
    platform: "npm",
    desc: "Drag UI in the browser, watch the source rewrite itself. Always-on AI agent.",
    href: "https://npmjs.com/package/wigss",
    slug: "wigss",
    metrics: ["Browser-native", "AI refactor agent", "npm"],
  },
  {
    name: "WIGTN Coding",
    platform: "GitHub",
    desc: "A Claude Code plugin ecosystem with 13 agents, 6 skills, and 20 design styles.",
    href: "https://github.com/wigtn/wigtn-plugins",
    slug: "wigtn-coding",
    metrics: ["13 agents", "6 skills", "20 design styles"],
  },
];

/* Demos / playground: real, clickable links that boost trust. */
export const DEMOS = [
  { name: "TimeLens", tag: "Live", desc: "AI museum curator via Gemini Live.", href: "https://timelens-852253134165.asia-northeast3.run.app/" },
  { name: "WigtnOCR", tag: "Try on HF", desc: "2B Korean document parser.", href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR" },
  { name: "WIGVO", tag: "Watch", desc: "Real-time phone-call translation.", href: "https://www.youtube.com/watch?v=jK1CDOQExLw" },
];

/* Milestones: the build-in-public track record, oldest → newest, one per
 * month since founding. Horizontal swipe rail on the homepage; each card's
 * photo rises into view on scroll. Items without a real photo yet leave the
 * frame blank (placeholder: true). The remaining data-less entries (IWSLT,
 * Qualcomm, Meetup) carry editable placeholder copy until real text lands. */
export type Milestone = {
  month: string; // short month label, e.g. "Jan"
  date: string; // "2026.01"
  label: string; // chip
  title: string; // short headline
  text: string; // one-liner
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
    text: "Five AI builders come together as an open community to learn and build in public.",
  },
  {
    month: "Feb",
    date: "2026.02",
    label: "ACL 2026",
    title: "WIGVO accepted to ACL",
    text: "Real-time phone-call translation accepted to ACL 2026, System Demonstrations.",
    image: "/images/projects/wigvo_screenshot_call.png",
    slug: "wigvo",
  },
  {
    month: "Mar",
    date: "2026.03",
    label: "Grand Prize",
    title: "Build with TRAE Seoul",
    text: "WIGENT, a multi-agent debate arena, wins the Grand Prize (ByteDance).",
    image: "/images/projects/trae_hackthon_seoul.png",
    slug: "trae-seoul-grand-prize",
  },
  {
    month: "Apr",
    date: "2026.04",
    label: "2nd Place",
    title: "Snowflake AI & Data Hackathon",
    text: "WIGTN Flake takes 2nd in the Tech Track, built on Snowflake Cortex.",
    image: "/images/projects/wigtn-flake-stage.jpg",
    slug: "snowflake-korea-2026",
  },
  {
    month: "May",
    date: "2026.05",
    label: "Top 6",
    title: "OBA Weekendthon",
    text: "MyunZy, an AI interviewer built in two days, finishes in the Top 6.",
    image: "/images/news/OBA.jpeg",
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
    label: "IWSLT 2026",
    title: "IWSLT 2026",
    text: "Invited Talk.",
    upcoming: true,
  },
  {
    month: "Aug",
    date: "2026.08",
    label: "Meetup",
    title: "First community meetup",
    text: "Our first open meetup, details to be announced.",
    upcoming: true,
    placeholder: true,
  },
];
export const LATEST_NEWS = [
  getArticle("snowflake-korea-2026")!,
  getArticle("trae-seoul-grand-prize")!,
  getArticle("wigvo-realtime-translation-video")!,
];

/* Sub-page groupings */
export const WORK_GROUPS = [
  /* Grouping keys off the English tag on purpose: these buckets are a build-
   * time classification, not display copy, so they must not shift with locale. */
  {
    label: "Papers & Models",
    items: ARTICLES.filter((a) => a.kind === "report" && /PAPER|MODEL/.test(tx(a.tag, "en"))),
  },
  {
    label: "Open Source",
    items: ARTICLES.filter((a) => a.kind === "report" && tx(a.tag, "en").includes("OPEN SOURCE")),
  },
  { label: "Awards", items: EVENTS },
];
/* News feed: every real article (papers, awards, talks, releases), newest
 * first. Reports are included here since there is no separate Work page.
 * Placeholder/mock entries are excluded. */
export const NEWS_FEED = ARTICLES.filter((a) => !a.placeholder).sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
);

/* Newsroom feed: only channel:"newsroom" items (awards, releases,
 * announcements). Deep tech "report" content lives on the external blog and is
 * excluded here. Newest first. */
export const NEWSROOM_FEED = ARTICLES.filter(
  (a) => !a.placeholder && a.channel === "newsroom",
).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/* The set that has a Korean counterpart. Drives both /ko/[slug] static params
 * and the language toggle's "is there a page to switch to" check, so the two
 * can never disagree. */
export const NEWSROOM_SLUGS: string[] = NEWSROOM_FEED.map((a) => a.slug);

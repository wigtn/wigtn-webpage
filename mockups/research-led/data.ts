/**
 * MOCKUP DATA — research-led renewal
 * ------------------------------------------------------------------
 * Now filled with REAL WIGTN content (sourced from constants/*.ts):
 * papers/models, hackathon awards, open source, team, partners, videos.
 *
 * Per the strategy, Projects/Products (WIGEX, WIGVU consumer apps) are
 * intentionally excluded — this is a research-led site. WigtnOCR / WIGVO
 * appear under Research because they are papers/models, not products.
 *
 * Community (meetups/seminars) has no real data yet, so those entries are
 * left as placeholder mock — flagged with `placeholder: true`.
 *
 * Pure, serializable data (no React/icons) so the static-export route can
 * import it. Stands in for the future MDX-backed content model.
 */

export const HOME = "/mockups/research-led/";
export const WORK = `${HOME}work/`;
export const NEWS = `${HOME}news/`;
export const TEAM_PAGE = `${HOME}team/`;
export const articleHref = (slug: string) => `${HOME}${slug}/`;

/* Reference-led structure (Next Securities / MakinaRocks): the homepage is
 * a short teaser; depth lives on these sub-pages. Nav points to pages, not
 * in-page anchors. */
export const NAV = [
  { label: "Work", href: WORK },
  { label: "News", href: NEWS },
  { label: "Team", href: TEAM_PAGE },
];

/* What we do — capability pillars (philosophy/capability-led, not output
 * lists). Drops "Products" per the research-led direction. */
export const PILLARS = [
  {
    title: "Research",
    body: "Peer-reviewed work at venues like ACL and EMNLP — studied in the open.",
  },
  {
    title: "Enterprise Consulting",
    body: "We turn that research into systems enterprises can actually run.",
  },
  {
    title: "Open Source",
    body: "Tools, models, and plugins the developer community uses.",
  },
];

/* Real proof points (from constants/projects.ts achievements). */
export const STATS = [
  { value: "ACL ’26", label: "Paper accepted" },
  { value: "#1", label: "on KoGovDoc-Bench" },
  { value: "2", label: "Hackathon awards" },
  { value: "5", label: "AI engineers" },
];

/* Official partners. MEGACODE (contract in progress) + BrainCrew (LangChain
 * Global Partner Co., Harrison's parent company). Remaining slots are mock
 * placeholders until real partners land. */
export const PARTNERS = ["MEGACODE", "BRAINCREW", "PARTNER 03", "PARTNER 04", "PARTNER 05"];

/* Tech stack actually used across WIGTN projects — demoted "Powered by". */
export const POWERED_BY = ["ANTHROPIC", "OPENAI", "GOOGLE", "SNOWFLAKE", "HUGGINGFACE", "AWS", "VERCEL"];

/* About copy (from constants/translations.ts, research-led trim). */
export const ABOUT = {
  heading: "Researchers and builders who start from real-world friction and ship production-grade systems.",
  paragraphs: [
    "WIGTN is an independent crew of five AI engineers. We study AI in the open — publishing at venues like ACL and EMNLP — and turn that research into systems enterprises can actually run.",
    "We don't build demos. We move fast, but we deliver results that hold up: peer-reviewed papers, award-winning systems, and open-source tools the developer community uses.",
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
};

export const TEAM: TeamMember[] = [
  {
    name: "Harrison Kim 김형섭",
    role: "Founder & Crew Lead",
    currentRole: "AI Research Engineer & Engineering Part Lead, BrainCrew",
    credential: "Ex-Hyundai E&C",
    bio: "Former construction PM with a decade of large-scale project experience. Leads WIGTN — AI modeling, product development, and GPU-accelerated computing research.",
    image: "/images/team/hyeongseob_kim.jpg",
    github: "https://github.com/Hyeongseob91",
    linkedin: "https://linkedin.com/in/harrison-hyeongseob-kim",
  },
  {
    name: "Diego Son 손상우",
    role: "AI Engineer",
    currentRole: "AI Engineer & AX Team Lead",
    bio: "Builds LLM-powered applications and autonomous agent systems. Focuses on multi-agent orchestration and workflow automation.",
    image: "/images/team/sangwoo_son.jpg",
    imagePosition: "left top",
    github: "https://github.com/wigtn",
    linkedin: "https://linkedin.com/in/sangwooson",
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
  },
  {
    name: "Maximus Kim 김현상",
    role: "AI Product Engineer",
    currentRole: "Full-Stack Developer & MX Team Lead",
    bio: "Mobile-first full-stack engineer covering the entire 3-tier stack with React Native. Focused on software engineering craft.",
    image: "/images/team/hyeonsang_kim.jpg",
    imagePosition: "center 35%",
    github: "https://github.com/HyeonsangKim",
    linkedin: "https://www.linkedin.com/in/hyeonsang-kim-5a7a67260/",
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
  },
];

export const TEAM_BADGES = ["AI Research", "Enterprise Consulting", "Open Source", "Deep-tech"];

export type Kind = "report" | "event" | "community" | "insight";

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "quote"; text: string }
  | { t: "list"; items: string[] };

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
  placeholder?: boolean; // not-yet-real content kept as mock
  body: Block[];
};

const p = (text: string): Block => ({ t: "p", text });

export const ARTICLES: Article[] = [
  /* ───────── Research (real) ───────── */
  {
    slug: "wigtnocr",
    kind: "report",
    tag: "MODEL · EMNLP 2026 (IN PREP)",
    title: "WigtnOCR: a 2B parser that reads Korean gov forms like a model 15× its size",
    summary:
      "A 2B-parameter document parser distilled from a 30B teacher — ranked #1 on the KoGovDoc Korean government-document benchmark while running on a single consumer GPU.",
    date: "2026.05.20",
    readTime: "12 min",
    author: "WIGTN Research",
    featured: true,
    image: "/images/projects/wigtnocr-huggingface.png",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/wigtnOCR-v1" },
      { label: "HuggingFace", href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR" },
    ],
    body: [
      { t: "h", text: "The problem" },
      p(
        "Existing OCR and rule-based parsers fail on Korean government documents — missing tables, forms, and complex layouts. State-of-the-art VLM parsers are tuned for English/Chinese, and 30B models are too expensive to deploy in production.",
      ),
      { t: "h", text: "The approach" },
      p(
        "WigtnOCR distills a 30B teacher into a 2B student through pseudo-label distillation and LoRA fine-tuning on 2,667 Korean government document pages — reaching teacher-level accuracy on OmniDocBench while running on a single consumer GPU.",
      ),
      { t: "list", items: [
        "Student: Qwen3-VL-2B-Instruct · Teacher: Qwen3-VL-30B-Instruct",
        "LoRA rank=8 fine-tuning, trained in 31 minutes with DeepSpeed ZeRO-2",
        "#1 overall on KoGovDoc-Bench across 6 parsers — beating models 10–30× larger",
      ] },
      { t: "quote", text: "Teacher-level accuracy at 1/15th the size, on hardware you already own — that is the whole point." },
      { t: "h", text: "Open" },
      p("Model weights, training data, and evaluation code are all released on HuggingFace and GitHub."),
    ],
  },
  {
    slug: "wigvo",
    kind: "report",
    tag: "PAPER · ACL 2026 (ACCEPTED)",
    title: "WIGVO: real-time phone-call translation with zero echo across 148 calls",
    summary:
      "Two parallel AI interpreter sessions deliver bidirectional voice translation over standard phone lines — 557ms average latency, zero echo-loop incidents. Accepted to ACL 2026 System Demonstrations.",
    date: "2026.02.18",
    readTime: "10 min",
    author: "WIGTN Research",
    image: "/images/projects/wigvo_logo.png",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/wigvo-v2" },
      { label: "Watch demo", href: "https://youtu.be/_ixVEnHJxjk" },
    ],
    body: [
      { t: "h", text: "Call anyone, in any language" },
      p(
        "K-Culture brought millions to Korea — but everyday phone calls hit a language wall. WIGVO runs two parallel AI interpreter sessions, one per speaker, for natural bidirectional translation over normal phone lines. The recipient just answers a call; no app required.",
      ),
      { t: "list", items: [
        "557ms average latency across 169 production calls",
        "Software-only echo cancellation — zero echo-loop incidents, no dedicated hardware",
        "$0.27 per minute · OpenAI Realtime API + Twilio Media Streams",
      ] },
      { t: "quote", text: "Accepted to ACL 2026 — System Demonstrations." },
    ],
  },
  {
    slug: "wigss",
    kind: "report",
    tag: "OPEN SOURCE · npm",
    title: "WIGSS: drag UI in the browser, watch the source rewrite itself",
    summary:
      "Visual code refactoring with an always-on AI agent — point it at your dev server, rearrange components in the browser, and the source updates itself. Published on npm.",
    date: "2026.04.10",
    readTime: "5 min",
    author: "WIGTN",
    image: "/images/carousel/wigss-npm.png",
    links: [
      { label: "GitHub", href: "https://github.com/wigtn/wigss" },
      { label: "npm", href: "https://npmjs.com/package/wigss" },
    ],
    body: [
      p(
        "WIGSS connects to your running dev server, lets you visually drag and rearrange UI components in the browser, and rewrites the underlying source with an always-on AI agent. Drag UI, code rewrites itself.",
      ),
    ],
  },
  {
    slug: "wigtn-coding",
    kind: "report",
    tag: "OPEN SOURCE",
    title: "WIGTN Coding: a Claude Code plugin ecosystem — idea to deploy, zero friction",
    summary:
      "12 agents, 3 skills, and 17 design styles working together with team-based parallel execution for a 3–5× speedup.",
    date: "2026.03.28",
    readTime: "6 min",
    author: "WIGTN",
    links: [{ label: "GitHub", href: "https://github.com/wigtn/wigtn-plugins-with-claude-code" }],
    body: [
      p(
        "A unified Claude Code plugin that takes you from idea to deploy with zero friction — 12 agents, 3 skills, and 17 design styles, coordinated by team-based parallel execution for a 3–5× speedup.",
      ),
    ],
  },

  /* ───────── Events (real) ───────── */
  {
    slug: "trae-seoul-grand-prize",
    kind: "event",
    tag: "GRAND PRIZE",
    icon: "trophy",
    title: "Grand Prize — Build with TRAE Seoul (ByteDance)",
    summary:
      "WIGENT, a multi-agent debate arena, won the Grand Prize — built by 3 engineers in 3.5 hours.",
    date: "2026",
    place: "Seoul, KOR",
    author: "ByteDance",
    image: "/images/projects/trae_hackthon_seoul.png",
    links: [{ label: "GitHub", href: "https://github.com/wigtn/wigent" }],
    body: [
      p(
        "WIGENT is a multi-agent debate arena where a PM agent orchestrates auto-spawned domain experts in a Slack-style chat. Agents argue, challenge each other, retire when outmatched, and summon new specialists — then the system auto-generates a landing page from the debate conclusions.",
      ),
      { t: "quote", text: "Grand Prize at Build with TRAE Seoul — built by 3 engineers in 3.5 hours." },
    ],
  },
  {
    slug: "snowflake-korea-2026",
    kind: "event",
    tag: "2ND PLACE · TECH TRACK",
    icon: "trophy",
    title: "2nd Place, Tech Track — Snowflake AI & Data Hackathon Korea 2026",
    summary:
      "WIGTN Flake turns Snowflake Cortex into a purpose-driven neighborhood-intelligence platform — five AI experts debate across four datasets.",
    date: "2026",
    place: "Seoul, KOR",
    author: "Snowflake",
    image: "/images/projects/wigtn-flake-stage.jpg",
    links: [
      { label: "Watch demo", href: "https://www.youtube.com/watch?v=1YzSp3SdzTk" },
      { label: "Press", href: "https://www.newswire.co.kr/newsRead.php?no=1033575" },
    ],
    body: [
      p(
        "Pick a goal — open a cafe, place a billboard, invest — and a GPT-4o orchestrator summons five purpose-tuned experts who debate in a Slack-style chat while Cortex Analyst runs text-to-SQL across four Semantic Models (foot traffic, real estate, markets, telecom).",
      ),
      { t: "list", items: [
        "11 Snowflake Cortex functions · 5 AI experts × 4 datasets",
        "ANOMALY_DETECTION auto-flags districts to watch; FORECAST projects six months out",
        "Converges into a ranked Top 3 with a concrete action checklist",
      ] },
      { t: "quote", text: "Tech Track 2nd Place at Snowflake AI & Data Hackathon Korea 2026." },
    ],
  },
  {
    slug: "gemini-live-challenge",
    kind: "event",
    tag: "CHALLENGE",
    icon: "pin",
    title: "Google Gemini Live Agent Challenge — TimeLens",
    summary:
      "An AI museum curator that narrates exhibits in real time via Gemini Live, with historical context and restoration visualizations.",
    date: "2026",
    place: "Online",
    author: "Google",
    image: "/images/carousel/timelens_hero.png",
    links: [
      { label: "Live", href: "https://timelens-852253134165.asia-northeast3.run.app/" },
      { label: "GitHub", href: "https://github.com/wigtn/wigtn-timelens" },
      { label: "Watch", href: "https://youtu.be/ITaMtVO5jFg" },
    ],
    body: [
      p(
        "Point your camera at a museum artifact and an AI curator explains it in real time — historical context, significance, and restoration visualizations — powered by Gemini Live.",
      ),
    ],
  },

  /* ───────── Community (placeholder mock — no real data yet) ───────── */
  {
    slug: "tech-meetup-07-inference-optimization",
    kind: "community",
    tag: "MEETUP",
    title: "WIGTN Tech Meetup #07 — Inference optimization in practice",
    summary: "Quantization, KV cache, and speculative decoding from a practitioner's view. (Placeholder)",
    date: "2026.06.05",
    place: "Seoul, KOR",
    placeholder: true,
    body: [
      { t: "quote", text: "Placeholder — community meetups/seminars have no real data yet. This stands in to show the layout." },
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
      { t: "quote", text: "Placeholder — kept as mock until real seminar content exists." },
      p("A practical evaluation playbook for production agents: outcome metrics over vibes, trajectory checks, and cost/latency as first-class metrics."),
    ],
  },

  /* ───────── Tech Insights (real videos + note) ───────── */
  {
    slug: "wigvo-realtime-translation-video",
    kind: "insight",
    tag: "VIDEO",
    title: "How WIGVO translates a phone call in real time",
    summary: "A walkthrough of the dual-session architecture and software-only echo cancellation behind WIGVO.",
    date: "2026.03.02",
    author: "WIGTN",
    video: true,
    videoUrl: "https://youtu.be/_ixVEnHJxjk",
    links: [{ label: "Watch on YouTube", href: "https://youtu.be/_ixVEnHJxjk" }],
    body: [
      p("A 10-minute walkthrough of how WIGVO runs two parallel AI interpreter sessions over a normal phone line, and how the software-only echo-cancellation pipeline keeps the conversation natural."),
    ],
  },
  {
    slug: "wigtn-flake-cortex-debate-video",
    kind: "insight",
    tag: "VIDEO",
    title: "WIGTN Flake: five AI experts debate where to open your cafe",
    summary: "Watch Cortex-powered experts cross-query four datasets and converge on a ranked Top 3 of Seoul districts.",
    date: "2026.04.15",
    author: "WIGTN",
    video: true,
    videoUrl: "https://www.youtube.com/watch?v=1YzSp3SdzTk",
    links: [{ label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=1YzSp3SdzTk" }],
    body: [
      p("The Snowflake hackathon demo: pick a purpose, five purpose-tuned experts debate over Cortex Analyst, and the conversation converges into a data-backed Top 3 with an action checklist."),
    ],
  },
  {
    slug: "why-we-distill-30b-into-2b",
    kind: "insight",
    tag: "INSIGHT",
    title: "Why we distill 30B into 2B instead of serving the big model",
    summary: "Cost, latency, and where the data lives — the case for small, on-device models from our WigtnOCR work.",
    date: "2026.05.22",
    readTime: "5 min",
    author: "WIGTN Research",
    body: [
      { t: "h", text: "Right-sized beats biggest" },
      p("For most enterprise problems, the right-sized model that runs where the data lives beats the biggest model behind an API. WigtnOCR is our proof: a 2B student matched its 30B teacher on the benchmark that mattered."),
      { t: "list", items: [
        "Cost — predictable, no per-token surprises at scale",
        "Latency — single consumer GPU, no network round-trip",
        "Privacy — sensitive government documents never leave the building",
      ] },
      { t: "quote", text: "The question is rarely “is this model smart enough?” It is “is this the smallest model that is smart enough?”" },
    ],
  },
];

/* Selectors */
export const byKind = (k: Kind) => ARTICLES.filter((a) => a.kind === k);
export const FEATURED = ARTICLES.find((a) => a.featured)!;
export const REPORTS = byKind("report").filter((a) => !a.featured);
export const EVENTS = byKind("event");
export const COMMUNITY = byKind("community");
export const INSIGHTS = byKind("insight");
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/* Homepage teasers — a few highlights only; the rest lives on sub-pages. */
export const SELECTED_WORK = [getArticle("wigtnocr")!, getArticle("wigvo")!];

/* Swipe carousel — image-led highlights (all have posters). */
export const HIGHLIGHTS: { article: Article; short: string }[] = [
  { article: getArticle("wigtnocr")!, short: "WigtnOCR" },
  { article: getArticle("wigvo")!, short: "WIGVO" },
  { article: getArticle("snowflake-korea-2026")!, short: "Snowflake ’26" },
  { article: getArticle("trae-seoul-grand-prize")!, short: "TRAE Seoul" },
  { article: getArticle("gemini-live-challenge")!, short: "Gemini Live" },
];

/* Scroll-highlight strengths (SORI "Our strength"). */
export const STRENGTHS = [
  { kicker: "Published at ACL & EMNLP", title: "Peer-reviewed research" },
  { kicker: "Research → systems enterprises run", title: "Applied AI consulting" },
  { kicker: "Models, tools, and plugins in the open", title: "Open source by default" },
];
export const LATEST_NEWS = [
  getArticle("snowflake-korea-2026")!,
  getArticle("trae-seoul-grand-prize")!,
  getArticle("wigvo-realtime-translation-video")!,
];

/* Sub-page groupings */
export const WORK_GROUPS = [
  { label: "Papers & Models", items: ARTICLES.filter((a) => a.kind === "report" && /PAPER|MODEL/.test(a.tag)) },
  { label: "Open Source", items: ARTICLES.filter((a) => a.kind === "report" && a.tag.includes("OPEN SOURCE")) },
  { label: "Awards", items: EVENTS },
];
export const NEWS_FEED = [...EVENTS, ...INSIGHTS, ...COMMUNITY];

import type { LucideIcon } from "lucide-react";
import { Phone, Globe, Mic, Shield, Brain, FileText } from "lucide-react";

/* ─────────────── Shared sub-types (used by product detail blocks) ─────────────── */

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  descriptionKey: string;
}

export interface ProductStat {
  value: string;
  labelKey: string;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface CommunicationMode {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
}

/* ─────────────── Section / Phase / Achievement ───────────────
 *
 * The homepage is composed of three showcase sections (Products,
 * Open Source, Hackathon). Every project belongs to exactly one
 * section and is rendered exactly once on the homepage.
 *
 * `sectionBadge` is a free-text sub-category label shown on each
 * card — e.g. "Research" / "Paper" / "Tool" inside Open Source,
 * "Grand Prize" / "Participated" / "Upcoming" inside Hackathon.
 */

export type Section =
  | "products"
  | "models"
  | "papers"
  | "open-source"
  | "hackathon";

/**
 * Free-form but typed sub-category badge. Constrained so a typo in the
 * data file fails the build instead of silently falling through to the
 * default card styling.
 */
export type SectionBadge =
  | "Research"
  | "Paper"
  | "Tool"
  | "Grand Prize"
  | "Participated"
  | "Upcoming";

export type Phase = "in-progress" | "under-review" | "completed" | "archived";

export type AchievementResult =
  | "winner"
  | "grand-prize"
  | "second-place"
  | "third-place"
  | "finalist"
  | "accepted"
  | "participated"
  | "upcoming";

export interface Achievement {
  event: string;
  result: AchievementResult;
  organizer?: string;
  date?: string;
  note?: string;
}

/** Plain string — i18n removed, English only. */
export type I18nText = string;

/**
 * Media assets consumed by the project detail page (`/projects/[slug]/`).
 */
export interface ProjectMedia {
  poster: string;
  hoverClip?: string;
  heroVideo?: string;
  heroVideoType?: "youtube" | "local";
  gallery?: string[];
}

/**
 * Mobile-app assets consumed by the Products carousel's phone mockup.
 * Only Products-section items populate this field.
 */
export interface ProjectApp {
  /** Portrait screenshot shown inside the phone frame. */
  screenshot?: string;
  /** Optional portrait video (autoplay muted loop inside the phone frame). */
  video?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export interface ProjectTimeline {
  started?: string;
  submittedAt?: string;
  decidedAt?: string;
  deadline?: string;
}

export interface ProjectDetail {
  /** References existing productDetail.wigvo / productDetail.wigvu translation blobs. */
  translationKey?: "wigvo" | "wigvu";
  liveUrl?: string;
  features?: ProductFeature[];
  stats?: ProductStat[];
  techStack?: TechCategory[];
  modes?: CommunicationMode[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  section: Section;
  sectionBadge?: SectionBadge;
  phase: Phase;
  tagline: I18nText;
  description: I18nText;
  gradient: string;
  media: ProjectMedia;
  app?: ProjectApp;
  timeline: ProjectTimeline;
  achievements?: Achievement[];
  publication?: string;
  featured?: boolean;
  links: {
    github?: string;
    live?: string;
    video?: string;
    huggingface?: string;
  };
  detail?: ProjectDetail;
}

/* ─────────────── Phase label (used on detail pages) ─────────────── */

export const PHASE_LABEL: Record<Phase, string> = {
  "in-progress": "Coming Soon",
  "under-review": "Under review",
  completed: "Released",
  archived: "Archived",
};

/* ─────────────── Home-page stat bar ─────────────── */

export const HOME_STATS: { value: string; label: string }[] = [
  { value: "8+", label: "projects" },
  { value: "1", label: "grand prize" },
  { value: "1", label: "paper" },
  { value: "5", label: "engineers" },
];

/* ─────────────── PROJECTS ─────────────── */

export const PROJECTS: Project[] = [
  /* ─────── Products ─────── */

  {
    id: "wigex",
    slug: "wigex",
    name: "WIGEX",
    section: "products",
    phase: "in-progress",
    tagline: "Plan, track, and relive every trip — from budget to boarding pass home.",
    description: "before_title::Before You Go\nbefore::AI builds your daily budget based on destination, travel style, and length of stay — so you land with a plan, not a guess.\nduring_title::While You're There\nduring::Snap any receipt in any language. WIGEX reads it in seconds, converts to your home currency at the day-of-purchase rate, and tracks spending against your budget in real time. Split bills, check exchange rates, and stay on track — all in one tap.\nafter_title::When You're Back\nafter::Get a full stats dashboard — by category, destination, and day. Share a travel card to Instagram, KakaoTalk, and other social platforms, level up your traveler profile, and relive the trip through your spending story.",
    gradient: "from-emerald-500 to-teal-400",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/wigex",
      heroVideo: "/videos/wigex_video.mp4",
      heroVideoType: "local",
    },
    app: {
      screenshot: "/images/apps/wigex-screenshot.png",
      video: "/videos/wigex_video.mp4",
      // appStoreUrl: TBD
    },
    timeline: {},
    links: {
      github: "https://github.com/wigtn/wigex",
    },
  },

  {
    id: "wigvu",
    slug: "wigvu",
    name: "WIGVU",
    section: "products",
    phase: "in-progress",
    tagline: "Learn Korean through the content you love — K-Drama, K-POP, YouTube, and more.",
    description: "before_title::Discover\nbefore::Browse real Korean content — K-Drama clips, K-POP lyrics, news articles, and YouTube videos — curated by difficulty level and topic.\nduring_title::Learn\nduring::Every sentence is translated with context-aware AI. Key expressions, grammar patterns, and cultural nuances are automatically extracted and explained — all synced with the original content.\nafter_title::Master\nafter::Track your progress with AI-generated quizzes, vocabulary lists, and comprehension scores. Build your Korean skills one episode at a time.",
    gradient: "from-pink-500 to-rose-400",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/wigvu",
    },
    app: {
      // appStoreUrl: TBD
    },
    timeline: {},
    links: {
      github: "https://github.com/wigtn/wigvu",
    },
  },

  /* ─────── Open Source ─────── */

  {
    id: "wigtnocr",
    slug: "wigtnocr",
    name: "WigtnOCR",
    section: "models",
    sectionBadge: "Research",
    phase: "completed",
    featured: true,
    publication: "EMNLP 2026 — Document AI Track (in preparation)",
    tagline: "A 2B-parameter document parser that reads Korean government forms as accurately as a model 15x its size — ranked #1 on KoGovDoc.",
    description: "WigtnOCR distills a 30B teacher model into a 2B student through pseudo-label distillation and LoRA fine-tuning, achieving teacher-level accuracy on OmniDocBench while running on a single consumer GPU. On the KoGovDoc Korean government document retrieval benchmark — a dataset of scanned civil forms, tax filings, and public notices — it ranks #1 overall, outperforming models with 10-30x more parameters.",
    gradient: "from-yellow-500 to-amber-400",
    media: {
      poster: "/images/projects/wigtnocr-huggingface.png",
    },
    timeline: {},
    links: {
      github: "https://github.com/wigtn/wigtnOCR-v1",
      huggingface: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR",
    },
  },

  {
    id: "wigvo",
    slug: "wigvo",
    name: "WIGVO",
    section: "papers",
    sectionBadge: "Paper",
    phase: "completed",
    featured: true,
    publication: "ACL 2026 — Speech & Multimodal Track (submitted)",
    tagline: "Real-time voice translation for phone calls — call anyone, in any language, with zero echo-loop incidents across 148 production calls.",
    description: "WIGVO runs two parallel AI interpreter sessions — one for each speaker — to deliver natural, bidirectional voice translation over standard phone lines. A software-only echo-cancellation pipeline eliminates feedback loops without dedicated hardware, achieving 557ms average latency and zero echo incidents across 148 real-world calls. The recipient answers a normal phone call; no app download required.",
    gradient: "from-violet to-purple-400",
    media: {
      poster: "/images/projects/wigvo_logo.png",
      heroVideo: "https://youtu.be/_ixVEnHJxjk?si=P257fqme3B0zTzNu",
      heroVideoType: "youtube",
    },
    timeline: {
      submittedAt: "2026-02",
    },
    links: {
      github: "https://github.com/wigtn/wigvo-v2",
      video: "https://youtu.be/_ixVEnHJxjk?si=P257fqme3B0zTzNu",
      live: "https://wigvo.run",
    },
    detail: {
      translationKey: "wigvo",
      liveUrl: "https://wigvo.run",
      stats: [
        { value: "557ms", labelKey: "avgLatency" },
        { value: "169", labelKey: "callsMade" },
        { value: "$0.27", labelKey: "perMinute" },
        { value: "0", labelKey: "echoLoops" },
      ],
      features: [
        { icon: Phone, title: "Dual Session Architecture", descriptionKey: "wigvo_feature_dual" },
        { icon: Globe, title: "Any Phone, Any Language", descriptionKey: "wigvo_feature_phone" },
        { icon: Mic, title: "Echo Cancellation", descriptionKey: "wigvo_feature_echo" },
        { icon: Shield, title: "No App Required", descriptionKey: "wigvo_feature_noapp" },
      ],
      techStack: [
        { category: "AI / Voice", items: ["OpenAI Realtime API", "Dual WebSocket Sessions", "VAD"] },
        { category: "Telephony", items: ["Twilio PSTN", "WebRTC", "SIP Trunking"] },
        { category: "Backend", items: ["Node.js", "WebSocket Server", "Redis"] },
        { category: "Infrastructure", items: ["AWS", "Docker", "CI/CD"] },
      ],
      modes: [
        { id: "v2v", titleKey: "mode_v2v_title", descriptionKey: "mode_v2v_desc", icon: Mic },
        { id: "t2v", titleKey: "mode_t2v_title", descriptionKey: "mode_t2v_desc", icon: FileText },
        { id: "agent", titleKey: "mode_agent_title", descriptionKey: "mode_agent_desc", icon: Brain },
      ],
    },
  },

  {
    id: "wigss",
    slug: "wigss",
    name: "WIGSS",
    section: "open-source",
    sectionBadge: "Tool",
    phase: "in-progress",
    tagline: "Drag UI, code rewrites itself.",
    description: "Visual code refactoring with AI. Point WIGSS at your running dev server, visually drag and rearrange UI components in the browser, and watch the source code rewrite itself with an always-on AI agent. Published on npm.",
    gradient: "from-sky-500 to-cyan-400",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/wigss",
    },
    timeline: {},
    links: {
      github: "https://github.com/wigtn/wigss",
      live: "https://npmjs.com/package/wigss",
    },
  },

  {
    id: "wigtn-coding",
    slug: "wigtn-coding",
    name: "WIGTN Coding",
    section: "open-source",
    sectionBadge: "Tool",
    phase: "in-progress",
    tagline: "Claude Code plugin ecosystem.",
    description: "Unified Claude Code plugin — from idea to deploy, zero friction. 12 agents, 3 skills, and 17 design styles working together with team-based parallel execution for 3-5x speedup.",
    gradient: "from-gray-700 to-gray-900",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/wigtn-plugins-with-claude-code",
    },
    timeline: {},
    links: {
      github: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
    },
  },

  /* ─────── Hackathon ─────── */

  {
    id: "wigent",
    slug: "wigent",
    name: "WIGENT",
    section: "hackathon",
    sectionBadge: "Grand Prize",
    phase: "completed",
    featured: true,
    tagline: "Drop a topic, watch AI agents debate it live — PM orchestrates, experts spawn and retire, then a landing page writes itself from the conclusions.",
    description: "WIGENT is a multi-agent debate arena where a PM agent orchestrates auto-spawned domain experts in a Slack-style chat UI. Agents argue, challenge each other, retire when outmatched, and summon new specialists on the fly. Once consensus is reached, the system auto-generates a polished landing page from the debate conclusions. Grand Prize winner at Build with TRAE Seoul (ByteDance) — built by 3 engineers in 3.5 hours.",
    gradient: "from-yellow-400 to-amber-500",
    media: {
      poster: "/images/projects/trae_hackthon_seoul.png",
    },
    timeline: {},
    achievements: [
      {
        event: "Build with TRAE Seoul",
        organizer: "ByteDance",
        result: "grand-prize",
        note: "Grand Prize",
      },
    ],
    links: {
      github: "https://github.com/wigtn/wigent",
    },
  },

  {
    id: "timelens",
    slug: "timelens",
    name: "TimeLens",
    section: "hackathon",
    sectionBadge: "Participated",
    phase: "completed",
    tagline: "AI museum curator.",
    description: "AI-powered cultural heritage companion. Point your camera at museum artifacts and have an AI curator explain them in real-time with historical context and restoration visualizations.",
    gradient: "from-amber-500 to-orange-400",
    media: {
      poster: "/images/projects/timelens_hero.png",
      heroVideo: "https://youtu.be/ITaMtVO5jFg?si=Qb9-5mGiXtHMcewm",
      heroVideoType: "youtube",
    },
    timeline: {},
    achievements: [
      {
        event: "Google Gemini Live Agent Challenge",
        organizer: "Google",
        result: "participated",
      },
    ],
    links: {
      github: "https://github.com/wigtn/wigtn-timelens",
      video: "https://youtu.be/ITaMtVO5jFg?si=Qb9-5mGiXtHMcewm",
      live: "https://timelens-852253134165.asia-northeast3.run.app/",
    },
  },

  {
    id: "datapulse",
    slug: "datapulse",
    name: "DataPulse",
    section: "hackathon",
    sectionBadge: "Upcoming",
    phase: "in-progress",
    tagline: "Decoupling Index.",
    description: "A decoupling index and live data-driven signal platform built on Snowflake. Upcoming entry for Snowflake Korea 2026.",
    gradient: "from-slate-500 to-slate-700",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/datapulse",
    },
    timeline: {},
    achievements: [
      {
        event: "Snowflake Korea 2026",
        organizer: "Snowflake",
        result: "upcoming",
      },
    ],
    links: {},
  },
];

/* ─────────────── Derived lookups ─────────────── */

export const PROJECTS_BY_SLUG: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p]),
);

export const PROJECTS_BY_SECTION: Readonly<Record<Section, readonly Project[]>> =
  Object.freeze({
    products: PROJECTS.filter((p) => p.section === "products"),
    models: PROJECTS.filter((p) => p.section === "models"),
    papers: PROJECTS.filter((p) => p.section === "papers"),
    "open-source": PROJECTS.filter((p) => p.section === "open-source"),
    hackathon: PROJECTS.filter((p) => p.section === "hackathon"),
  });

/**
 * Projects flagged for the homepage Featured Work row. Returned in the order
 * they appear in `PROJECTS`, so curation is driven by data order + the flag.
 */
export const FEATURED_PROJECTS: readonly Project[] = PROJECTS.filter(
  (p) => p.featured,
);

/**
 * Human-readable labels for each section — used by the /projects filter UI
 * and the Featured Work meta chips.
 */
export const SECTION_LABEL: Record<Section, string> = {
  products: "Products",
  models: "Models",
  papers: "Papers",
  "open-source": "Open Source",
  hackathon: "Hackathon",
};

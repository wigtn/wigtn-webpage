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

export type Section = "products" | "open-source" | "hackathon";

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

export interface I18nText {
  en: string;
  ko: string;
  ja: string;
}

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
  "in-progress": "In development",
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

  // NOTE: WIGVU is intentionally excluded from the homepage for now. Its
  // translation blob in constants/translations.ts is kept for future re-add.

  {
    id: "wigex",
    slug: "wigex",
    name: "WIGEX",
    section: "products",
    phase: "in-progress",
    tagline: {
      en: "Travel expense tracker with receipt OCR.",
      ko: "영수증 OCR이 탑재된 여행 경비 관리 앱.",
      ja: "レシートOCR搭載の旅行経費管理アプリ。",
    },
    description: {
      en: "Snap a receipt in any language. WIGEX reads it, converts the currency, categorizes the expense, and gives you a clean report at the end of your trip.",
      ko: "어떤 언어로 된 영수증이든 사진 한 장. WIGEX가 읽고, 환율을 변환하고, 카테고리를 분류해, 여행이 끝나면 깔끔한 리포트로 돌려드립니다.",
      ja: "どんな言語のレシートでも一枚撮るだけ。WIGEXが読み取り、通貨を変換し、カテゴリを分類して、旅の終わりにきれいなレポートとして返します。",
    },
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

  /* ─────── Open Source ─────── */

  {
    id: "wigtnocr",
    slug: "wigtnocr",
    name: "WigtnOCR",
    section: "open-source",
    sectionBadge: "Research",
    phase: "completed",
    publication: "EMNLP 2026 prep",
    tagline: {
      en: "2B document parser. #1 on KoGovDoc.",
      ko: "2B 문서 파서. KoGovDoc 1위.",
      ja: "2B文書パーサー。KoGovDoc 1位。",
    },
    description: {
      en: "2B document parsing model distilled from a 30B teacher via pseudo-label distillation and LoRA fine-tuning. Matches teacher performance on OmniDocBench; ranks #1 on the KoGovDoc Korean government document retrieval benchmark.",
      ko: "30B 교사 모델에서 pseudo-label distillation과 LoRA로 증류한 2B 문서 파싱 모델. OmniDocBench에서 교사 모델 수준 달성, KoGovDoc 한국 정부 문서 검색 벤치마크 1위.",
      ja: "30B教師モデルから疑似ラベル蒸留とLoRAで蒸留した2B文書パーシングモデル。OmniDocBenchで教師モデル同等性能、KoGovDoc韓国政府文書検索ベンチマーク1位。",
    },
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
    section: "open-source",
    sectionBadge: "Paper",
    phase: "completed",
    publication: "ACL 2026 (submitted)",
    tagline: {
      en: "Real-time voice translation.",
      ko: "실시간 음성 통역.",
      ja: "リアルタイム音声通訳。",
    },
    description: {
      en: "Real-time voice translation for phone calls. Dual AI sessions with software-only echo cancellation enable natural bilingual conversations over standard phone lines. 0 echo-loop incidents across 148 production calls.",
      ko: "실시간 전화 음성 통역. 듀얼 AI 세션과 소프트웨어 기반 에코 캔슬레이션으로 일반 전화선에서 자연스러운 이중 언어 대화를 실현합니다. 148회 프로덕션 통화에서 에코 루프 0건.",
      ja: "電話通話のためのリアルタイム音声通訳。デュアルAIセッションとソフトウェアベースのエコーキャンセレーションにより、一般電話回線で自然な二言語会話を実現。148回の本番通話でエコーループ0件。",
    },
    gradient: "from-violet to-purple-400",
    media: {
      poster: "/images/projects/wigvo_screenshot_call.png",
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
    tagline: {
      en: "Drag UI, code rewrites itself.",
      ko: "UI를 드래그하면, 코드가 스스로 다시 써집니다.",
      ja: "UIをドラッグすると、コードが自ら書き直される。",
    },
    description: {
      en: "Visual code refactoring with AI. Point WIGSS at your running dev server, visually drag and rearrange UI components in the browser, and watch the source code rewrite itself with an always-on AI agent. Published on npm.",
      ko: "AI 기반 비주얼 코드 리팩토링. WIGSS를 실행 중인 개발 서버에 연결하고, 브라우저에서 UI 컴포넌트를 드래그·재배치하면 상시 AI 에이전트가 소스 코드를 다시 써줍니다. npm 배포 중.",
      ja: "AIによるビジュアルコードリファクタリング。WIGSSを実行中の開発サーバーに接続し、ブラウザでUIコンポーネントをドラッグ・再配置すると、常時稼働AIエージェントがソースコードを書き換えます。npm公開中。",
    },
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
    tagline: {
      en: "Claude Code plugin ecosystem.",
      ko: "Claude Code 플러그인 생태계.",
      ja: "Claude Codeプラグインエコシステム。",
    },
    description: {
      en: "Unified Claude Code plugin — from idea to deploy, zero friction. 12 agents, 3 skills, and 17 design styles working together with team-based parallel execution for 3-5x speedup.",
      ko: "아이디어에서 배포까지, 제로 프릭션 통합 Claude Code 플러그인. 12개 에이전트, 3개 스킬, 17가지 디자인 스타일을 팀 기반 병렬 실행으로 3-5배 빠르게.",
      ja: "アイデアからデプロイまでゼロフリクションの統合Claude Codeプラグイン。12エージェント、3スキル、17デザインスタイルをチーム並列実行で3-5倍高速化。",
    },
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
    name: "Wigent",
    section: "hackathon",
    sectionBadge: "Grand Prize",
    phase: "completed",
    tagline: {
      en: "Multi-agent debate arena.",
      ko: "멀티 에이전트 토론 아레나.",
      ja: "マルチエージェント討論アリーナ。",
    },
    description: {
      en: "Throw in a topic and watch a PM agent plus auto-spawned expert agents discuss, argue, retire, and spawn new specialists in a Slack-style chat UI — then auto-generate a landing page from the conclusions. Built in 3.5 hours by 3 members.",
      ko: "주제를 던지면 PM 에이전트와 자동 생성된 전문가 에이전트들이 Slack 스타일 채팅 UI에서 토론하고, 반박하고, 물러나고, 새로운 전문가를 소환합니다. 결론을 바탕으로 랜딩 페이지까지 자동 생성. 3명이 병렬로 3.5시간 만에 완성.",
      ja: "トピックを投げ込むとPMエージェントと自動生成された専門家エージェントがSlack風チャットUIで討論・反論・引退・新しい専門家召喚を繰り返し、結論からランディングページまで自動生成。3人で並列で3.5時間で完成。",
    },
    gradient: "from-yellow-400 to-amber-500",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/wigent",
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
    tagline: {
      en: "AI museum curator.",
      ko: "AI 박물관 큐레이터.",
      ja: "AI博物館キュレーター。",
    },
    description: {
      en: "AI-powered cultural heritage companion. Point your camera at museum artifacts and have an AI curator explain them in real-time with historical context and restoration visualizations.",
      ko: "AI 기반 문화유산 가이드. 박물관 유물에 카메라를 대면 AI 큐레이터가 역사적 맥락과 복원 시각화를 통해 실시간으로 설명합니다.",
      ja: "AI搭載の文化遺産ガイド。博物館の展示物にカメラを向けると、AIキュレーターが歴史的文脈と復元ビジュアライゼーションでリアルタイム解説。",
    },
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
    tagline: {
      en: "Decoupling Index.",
      ko: "디커플링 인덱스.",
      ja: "デカップリング指数。",
    },
    description: {
      en: "A decoupling index and live data-driven signal platform built on Snowflake. Upcoming entry for Snowflake Korea 2026.",
      ko: "Snowflake 기반의 디커플링 인덱스 및 실시간 데이터 시그널 플랫폼. Snowflake Korea 2026 출품 예정.",
      ja: "Snowflakeベースのデカップリング指数とリアルタイムデータシグナルプラットフォーム。Snowflake Korea 2026 出場予定。",
    },
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
    "open-source": PROJECTS.filter((p) => p.section === "open-source"),
    hackathon: PROJECTS.filter((p) => p.section === "hackathon"),
  });

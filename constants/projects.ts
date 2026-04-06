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

  // NOTE: WIGVU is intentionally excluded from the homepage for now. Its
  // translation blob in constants/translations.ts is kept for future re-add.

  {
    id: "wigex",
    slug: "wigex",
    name: "WIGEX",
    section: "products",
    phase: "in-progress",
    tagline: {
      en: "Plan, track, and relive every trip — from budget to boarding pass home.",
      ko: "예산 계획부터 귀국까지 — 여행의 모든 순간을 기록하고 되살리세요.",
      ja: "予算計画から帰国まで — 旅のすべてを記録し、追体験する。",
    },
    description: {
      en: "before_title::Before You Go\nbefore::AI builds your daily budget based on destination, travel style, and length of stay — so you land with a plan, not a guess.\nduring_title::While You're There\nduring::Snap any receipt in any language. WIGEX reads it in seconds, converts to your home currency at the day-of-purchase rate, and tracks spending against your budget in real time. Split bills, check exchange rates, and stay on track — all in one tap.\nafter_title::When You're Back\nafter::Get a full stats dashboard — by category, destination, and day. Share a travel card to Instagram or KakaoTalk, level up your traveler profile, and relive the trip through your spending story.",
      ko: "before_title::떠나기 전\nbefore::AI가 목적지, 여행 스타일, 체류 기간을 기반으로 하루 예산을 짜줍니다 — 감이 아닌 계획으로 여행을 시작하세요.\nduring_title::여행 중\nduring::어떤 언어의 영수증이든 찍기만 하면 됩니다. WIGEX가 몇 초 만에 읽고, 구매 당일 환율로 환산하고, 예산 대비 지출을 실시간으로 추적합니다. 더치페이, 환율 계산, 예산 체크까지 한 번에.\nafter_title::돌아온 후\nafter::카테고리별·목적지별·일자별 통계 대시보드를 확인하세요. 여행 카드를 인스타·카카오톡에 공유하고, 여행자 레벨을 올리고, 지출 스토리로 여행을 되새기세요.",
      ja: "before_title::出発前\nbefore::AIが目的地・旅行スタイル・滞在期間から1日の予算を作成 — 勘ではなく計画で旅を始めましょう。\nduring_title::旅行中\nduring::どんな言語のレシートでも撮るだけ。WIGEXが数秒で読み取り、購入日のレートで換算し、予算に対する支出をリアルタイムで追跡します。割り勘、為替計算、予算チェックもワンタップで。\nafter_title::帰国後\nafter::カテゴリ別・目的地別・日別の統計ダッシュボードを確認。旅行カードをSNSでシェアし、トラベラーレベルを上げ、支出ストーリーで旅を追体験しましょう。",
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
    section: "models",
    sectionBadge: "Research",
    phase: "completed",
    featured: true,
    publication: "EMNLP 2026 — Document AI Track (in preparation)",
    tagline: {
      en: "A 2B-parameter document parser that reads Korean government forms as accurately as a model 15x its size — ranked #1 on KoGovDoc.",
      ko: "15배 큰 모델만큼 정확하게 한국 정부 문서를 읽는 2B 파라미터 문서 파서 — KoGovDoc 벤치마크 1위.",
      ja: "15倍大きなモデルと同等の精度で韓国政府文書を読む2Bパラメータ文書パーサー — KoGovDocベンチマーク1位。",
    },
    description: {
      en: "WigtnOCR distills a 30B teacher model into a 2B student through pseudo-label distillation and LoRA fine-tuning, achieving teacher-level accuracy on OmniDocBench while running on a single consumer GPU. On the KoGovDoc Korean government document retrieval benchmark — a dataset of scanned civil forms, tax filings, and public notices — it ranks #1 overall, outperforming models with 10-30x more parameters.",
      ko: "WigtnOCR은 pseudo-label distillation과 LoRA 파인튜닝으로 30B 교사 모델을 2B 학생 모델로 증류하여, 소비자급 단일 GPU에서도 OmniDocBench 교사 모델급 정확도를 달성합니다. 스캔된 민원 서류, 세금 신고서, 공고문으로 구성된 KoGovDoc 한국 정부 문서 검색 벤치마크에서 10-30배 큰 모델을 제치고 전체 1위를 기록했습니다.",
      ja: "WigtnOCRは疑似ラベル蒸留とLoRAファインチューニングで30B教師モデルを2B学生モデルに蒸留し、消費者向け単一GPUでOmniDocBench教師モデル級の精度を達成。スキャンされた行政書類・税務申告書・公告で構成されるKoGovDoc韓国政府文書検索ベンチマークで、10-30倍のパラメータを持つモデルを上回り総合1位を獲得しました。",
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
    section: "papers",
    sectionBadge: "Paper",
    phase: "completed",
    featured: true,
    publication: "ACL 2026 — Speech & Multimodal Track (submitted)",
    tagline: {
      en: "Real-time voice translation for phone calls — call anyone, in any language, with zero echo-loop incidents across 148 production calls.",
      ko: "전화 통화를 위한 실시간 음성 통역 — 어떤 언어로든, 누구에게든 전화하세요. 148회 프로덕션 통화에서 에코 루프 0건.",
      ja: "電話通話のためのリアルタイム音声通訳 — どの言語でも、誰にでも通話可能。148回の本番通話でエコーループ0件。",
    },
    description: {
      en: "WIGVO runs two parallel AI interpreter sessions — one for each speaker — to deliver natural, bidirectional voice translation over standard phone lines. A software-only echo-cancellation pipeline eliminates feedback loops without dedicated hardware, achieving 557ms average latency and zero echo incidents across 148 real-world calls. The recipient answers a normal phone call; no app download required.",
      ko: "WIGVO는 각 화자를 위한 두 개의 병렬 AI 통역 세션을 실행하여 일반 전화선에서 자연스러운 양방향 음성 통역을 제공합니다. 소프트웨어 전용 에코 캔슬레이션 파이프라인이 전용 하드웨어 없이 피드백 루프를 제거하며, 평균 지연 557ms, 148회 실전 통화에서 에코 사고 0건을 달성했습니다. 수신자는 일반 전화를 받기만 하면 됩니다.",
      ja: "WIGVOは各話者用に2つの並列AI通訳セッションを実行し、一般電話回線で自然な双方向音声通訳を提供します。ソフトウェア専用エコーキャンセレーションパイプラインが専用ハードウェアなしでフィードバックループを除去し、平均遅延557ms、148回の実通話でエコー事故0件を達成。受信者は通常の電話に出るだけです。",
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
    featured: true,
    tagline: {
      en: "Drop a topic, watch AI agents debate it live — PM orchestrates, experts spawn and retire, then a landing page writes itself from the conclusions.",
      ko: "주제를 던지면 AI 에이전트들이 실시간 토론 — PM이 조율하고, 전문가가 소환·퇴장하며, 결론에서 랜딩 페이지가 자동 생성됩니다.",
      ja: "トピックを投げるとAIエージェントがリアルタイム討論 — PMが調整し、専門家が召喚・退場、結論からランディングページが自動生成。",
    },
    description: {
      en: "Wigent is a multi-agent debate arena where a PM agent orchestrates auto-spawned domain experts in a Slack-style chat UI. Agents argue, challenge each other, retire when outmatched, and summon new specialists on the fly. Once consensus is reached, the system auto-generates a polished landing page from the debate conclusions. Grand Prize winner at Build with TRAE Seoul (ByteDance) — built by 3 engineers in 3.5 hours.",
      ko: "Wigent은 PM 에이전트가 자동 소환된 도메인 전문가들을 Slack 스타일 채팅 UI에서 조율하는 멀티 에이전트 토론 아레나입니다. 에이전트들은 토론하고, 반박하고, 밀리면 퇴장하고, 즉석에서 새 전문가를 소환합니다. 합의에 도달하면 토론 결론에서 완성된 랜딩 페이지를 자동 생성합니다. Build with TRAE Seoul (ByteDance) 대상 수상 — 3명이 3.5시간 만에 완성.",
      ja: "WigentはPMエージェントが自動召喚されたドメイン専門家をSlack風チャットUIで調整するマルチエージェント討論アリーナです。エージェントは討論し、反論し、劣勢なら退場し、その場で新しい専門家を召喚します。合意に達すると討論結論から完成されたランディングページを自動生成。Build with TRAE Seoul（ByteDance）大賞受賞 — 3人で3.5時間で完成。",
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

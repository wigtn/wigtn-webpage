import type { LucideIcon } from "lucide-react";
import {
  Phone,
  Globe,
  Mic,
  Shield,
  BookOpen,
  Languages,
  Brain,
  FileText,
} from "lucide-react";

/* ─────────────── Shared sub-types (reused from old products.ts) ─────────────── */

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

/* ─────────────── Category / Phase / Achievement ─────────────── */

export type Category = "product" | "research" | "oss";

export type Phase = "in-progress" | "under-review" | "completed" | "archived";

export type AchievementResult =
  | "winner"
  | "finalist"
  | "accepted"
  | "participated";

export interface Achievement {
  event: string;
  result: AchievementResult;
  date?: string; // "YYYY-MM"
  note?: string;
}

export interface I18nText {
  en: string;
  ko: string;
  ja: string;
}

export interface ProjectMedia {
  /** Required — shown on cards idle and as detail-page fallback. */
  poster: string;
  /** Short loop (5–8s) for card hover. Optional. */
  hoverClip?: string;
  /** Full video for detail-page hero autoplay. */
  heroVideo?: string;
  heroVideoType?: "youtube" | "local";
  gallery?: string[];
}

export interface ProjectTimeline {
  started?: string;
  submittedAt?: string;
  decidedAt?: string;
  /** D-day for under-review items. */
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
  category: Category;
  phase: Phase;
  tagline: I18nText;
  description: I18nText;
  gradient: string;
  media: ProjectMedia;
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

/* ─────────────── Phase label map ───────────────
 * Card phase badge text by (category, phase). Detail pages and cards
 * read these labels via components/projects/PhaseBadge.
 */

export const PHASE_LABEL: Record<Category, Record<Phase, string>> = {
  product: {
    "in-progress": "In development",
    "under-review": "Beta",
    completed: "Live",
    archived: "Sunset",
  },
  research: {
    "in-progress": "In preparation",
    "under-review": "Under peer review",
    completed: "Published",
    archived: "Withdrawn",
  },
  oss: {
    "in-progress": "Active",
    "under-review": "Pre-release",
    completed: "Stable",
    archived: "Unmaintained",
  },
};

/* ─────────────── PROJECTS ─────────────── */

export const PROJECTS: Project[] = [
  {
    id: "timelens",
    slug: "timelens",
    name: "TimeLens",
    category: "product",
    phase: "completed",
    featured: true,
    tagline: {
      en: "Point your camera. Meet your AI curator.",
      ko: "카메라를 대면, AI 큐레이터를 만나세요.",
      ja: "カメラを向ければ、AIキュレーターに出会える。",
    },
    description: {
      en: "AI-powered cultural heritage companion. Point your camera at museum artifacts and have an AI curator explain them in real-time with historical context and restoration visualizations. Built with Gemini Live API and Google ADK.",
      ko: "AI 기반 문화유산 가이드. 박물관 유물에 카메라를 대면 AI 큐레이터가 역사적 맥락과 복원 시각화를 통해 실시간으로 설명합니다. Gemini Live API와 Google ADK로 구축.",
      ja: "AI搭載の文化遺産ガイド。博物館の展示物にカメラを向けると、AIキュレーターが歴史的文脈と復元ビジュアライゼーションでリアルタイム解説。Gemini Live APIとGoogle ADKで構築。",
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
    id: "wigent",
    slug: "wigent",
    name: "Wigent",
    category: "product",
    phase: "completed",
    featured: true,
    tagline: {
      en: "Multi-agent debate arena. Built in 3.5 hours.",
      ko: "멀티 에이전트 토론 아레나. 3.5시간 만에 완성.",
      ja: "マルチエージェント討論アリーナ。3.5時間で完成。",
    },
    description: {
      en: "Multi-agent debate platform. Throw in a topic and watch a PM agent plus auto-spawned expert agents discuss, argue, retire, and spawn new specialists in a Slack-style chat UI — then auto-generate a landing page from the conclusions. Built in 3.5 hours by 3 members using parallel Claude Code development.",
      ko: "멀티 에이전트 토론 플랫폼. 주제를 던지면 PM 에이전트와 자동 생성된 전문가 에이전트들이 Slack 스타일 채팅 UI에서 토론하고, 반박하고, 물러나고, 새로운 전문가를 소환합니다. 결론을 바탕으로 랜딩 페이지까지 자동 생성. 3명이 병렬 Claude Code 개발로 3.5시간 만에 완성.",
      ja: "マルチエージェント討論プラットフォーム。トピックを投げ込むと、PMエージェントと自動生成された専門家エージェントがSlack風チャットUIで討論・反論・引退・新しい専門家召喚を繰り返し、結論からランディングページまで自動生成。3人が並列Claude Code開発で3.5時間で完成。",
    },
    gradient: "from-yellow-400 to-amber-500",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/wigent",
    },
    timeline: {},
    achievements: [
      {
        event: "Build with TRAE Seoul (ByteDance)",
        result: "winner",
        note: "Grand Prize",
      },
    ],
    links: {
      github: "https://github.com/wigtn/wigent",
    },
  },
  {
    id: "wigvo",
    slug: "wigvo",
    name: "WIGVO",
    category: "product",
    phase: "completed",
    featured: true,
    publication: "ACL 2026 (submitted)",
    tagline: {
      en: "Break language barriers. Call anyone, in any language.",
      ko: "언어 장벽을 깨다. 누구에게든, 어떤 언어로든 전화하세요.",
      ja: "言語の壁を壊す。誰にでも、どの言語でも電話できる。",
    },
    description: {
      en: "Real-time voice translation for phone calls. Dual AI sessions with software-only echo cancellation enable natural bilingual conversations over standard phone lines. 0 echo-loop incidents across 148 production calls. Production-deployed on Google Cloud Run.",
      ko: "실시간 전화 음성 통역. 듀얼 AI 세션과 소프트웨어 기반 에코 캔슬레이션으로 일반 전화선에서 자연스러운 이중 언어 대화를 실현합니다. 148회 프로덕션 통화에서 에코 루프 0건. Google Cloud Run 프로덕션 배포 중.",
      ja: "電話通話のためのリアルタイム音声通訳。デュアルAIセッションとソフトウェアベースのエコーキャンセレーションにより、一般電話回線で自然な二言語会話を実現。148回の本番通話でエコーループ0件。Google Cloud Runで本番稼働中。",
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
    id: "wigtnocr",
    slug: "wigtnocr",
    name: "WigtnOCR-v1",
    category: "research",
    phase: "completed",
    publication: "EMNLP 2026 (in preparation)",
    tagline: {
      en: "2B document parser distilled from 30B. #1 on KoGovDoc.",
      ko: "30B에서 증류한 2B 문서 파서. KoGovDoc 1위.",
      ja: "30Bから蒸留した2B文書パーサー。KoGovDoc 1位。",
    },
    description: {
      en: "2B document parsing model distilled from a 30B teacher via pseudo-label distillation and LoRA fine-tuning. Matches teacher performance on OmniDocBench, ranks #1 on KoGovDoc Korean government document retrieval benchmark.",
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
    id: "wigvu",
    slug: "wigvu",
    name: "WIGVU",
    category: "product",
    phase: "in-progress",
    tagline: {
      en: "Learn Korean through the content you love.",
      ko: "좋아하는 콘텐츠로 한국어를 배우세요.",
      ja: "好きなコンテンツで韓国語を学ぼう。",
    },
    description: {
      en: "AI-powered Korean learning from real content. Transforms K-Drama, K-POP, and YouTube into interactive lessons with sentence-level translation.",
      ko: "실제 콘텐츠 기반 AI 한국어 학습. K-Drama, K-POP, YouTube를 문장 단위 번역이 가능한 인터랙티브 학습 자료로 변환합니다.",
      ja: "実際のコンテンツからのAI韓国語学習。K-Drama、K-POP、YouTubeを文レベル翻訳付きインタラクティブレッスンに変換。",
    },
    gradient: "from-indigo-500 to-violet",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/wigvu",
    },
    timeline: {},
    links: {
      github: "https://github.com/wigtn/wigvu",
    },
    detail: {
      translationKey: "wigvu",
      stats: [
        { value: "7+", labelKey: "languagesSupported" },
        { value: "2", labelKey: "contentModes" },
        { value: "AI", labelKey: "powered" },
      ],
      features: [
        { icon: BookOpen, title: "Content-Based Learning", descriptionKey: "wigvu_feature_content" },
        { icon: Languages, title: "Sentence-Level Translation", descriptionKey: "wigvu_feature_translation" },
        { icon: Brain, title: "AI Analysis", descriptionKey: "wigvu_feature_ai" },
        { icon: FileText, title: "Expression Extraction", descriptionKey: "wigvu_feature_expression" },
      ],
      techStack: [
        { category: "AI / NLP", items: ["GPT-4o-mini", "WhisperX STT", "Custom Prompts"] },
        { category: "Frontend", items: ["React", "Next.js", "Chrome Extension"] },
        { category: "Backend", items: ["Python", "FastAPI", "PostgreSQL"] },
        { category: "Infrastructure", items: ["GCP", "Docker", "CI/CD"] },
      ],
    },
  },
  {
    id: "wigex",
    slug: "wigex",
    name: "WIGEX",
    category: "product",
    phase: "in-progress",
    tagline: {
      en: "Travel expense tracker with receipt OCR.",
      ko: "영수증 OCR이 탑재된 여행 경비 관리 앱.",
      ja: "レシートOCR搭載の旅行経費管理アプリ。",
    },
    description: {
      en: "Travel expense tracker with receipt OCR powered by our own WigtnOCR model. Real-time currency conversion and offline support. Monorepo + microservices architecture (Expo mobile, NestJS backend, Next.js admin).",
      ko: "자체 WigtnOCR 모델 기반 영수증 OCR 탑재 여행 경비 관리 앱. 실시간 환율 변환과 오프라인 지원. 모노레포 + 마이크로서비스 아키텍처 (Expo 모바일, NestJS 백엔드, Next.js 어드민).",
      ja: "自社WigtnOCRモデルによるレシートOCR搭載の旅行経費管理アプリ。リアルタイム為替変換とオフライン対応。モノレポ＋マイクロサービスアーキテクチャ（Expoモバイル、NestJSバックエンド、Next.js管理画面）。",
    },
    gradient: "from-emerald-500 to-teal-400",
    media: {
      poster: "https://opengraph.githubassets.com/1/wigtn/wigex",
      heroVideo: "/videos/wigex_video.mp4",
      heroVideoType: "local",
    },
    timeline: {},
    links: {
      github: "https://github.com/wigtn/wigex",
    },
  },
  {
    id: "wigss",
    slug: "wigss",
    name: "WIGSS",
    category: "oss",
    phase: "in-progress",
    tagline: {
      en: "Drag your UI. The source code rewrites itself.",
      ko: "UI를 드래그하면, 소스 코드가 스스로 다시 써집니다.",
      ja: "UIをドラッグすると、ソースコードが自ら書き直される。",
    },
    description: {
      en: 'Visual code refactoring with AI. Point WIGSS at your running dev server, visually drag and rearrange UI components in the browser, and watch the source code rewrite itself with an always-on AI agent. Published on npm.',
      ko: "AI 기반 비주얼 코드 리팩토링. WIGSS를 실행 중인 개발 서버에 연결하면, 브라우저에서 UI 컴포넌트를 드래그하고 재배치하는 대로 상시 AI 에이전트가 소스 코드를 다시 써줍니다. npm 배포 중.",
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
    category: "oss",
    phase: "in-progress",
    tagline: {
      en: "From idea to deploy, zero friction. Claude Code plugin ecosystem.",
      ko: "아이디어에서 배포까지, 제로 프릭션. Claude Code 플러그인 생태계.",
      ja: "アイデアからデプロイまで、ゼロフリクション。Claude Codeプラグインエコシステム。",
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
];

/* ─────────────── Derived lookups ─────────────── */

export const PROJECTS_BY_SLUG: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p]),
);

/* ─────────────── Impact stats (migrated from results.ts) ─────────────── */

export const IMPACT_STATS = {
  papers: 2,
  competitions: 2,
  liveServices: 2,
  models: 1,
  openSource: 6,
};

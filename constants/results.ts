export type Tag = "Research" | "Competition" | "Product" | "Open Source" | "Model";

export interface ResultItem {
  id: string;
  name: string;
  tags: Tag[];
  status: string;
  featured?: boolean;
  description: {
    en: string;
    ko: string;
    ja: string;
  };
  gradient: string;
  image?: string;
  localVideo?: string;
  publication?: string;
  links: {
    detail?: string;
    github?: string;
    huggingface?: string;
    video?: string;
    live?: string;
  };
}

export const IMPACT_STATS = {
  papers: 2,
  competitions: 2,
  liveServices: 2,
  models: 1,
  openSource: 6,
};

export const RESULTS: ResultItem[] = [
  {
    id: "timelens",
    name: "TimeLens",
    tags: ["Competition", "Product"],
    status: "Live",
    featured: true,
    description: {
      en: "AI-powered cultural heritage companion. Point your camera at museum artifacts and have an AI curator explain them in real-time with historical context and restoration visualizations.",
      ko: "AI 기반 문화유산 가이드. 박물관 유물에 카메라를 대면 AI 큐레이터가 역사적 맥락과 복원 시각화를 통해 실시간으로 설명합니다.",
      ja: "AI搭載の文化遺産ガイド。博物館の展示物にカメラを向けると、AIキュレーターが歴史的文脈と復元ビジュアライゼーションでリアルタイム解説。",
    },
    gradient: "from-amber-500 to-orange-400",
    image: "/images/projects/timelens_hero.png",
    links: {
      github: "https://github.com/wigtn/wigtn-timelens",
      video: "https://youtu.be/ITaMtVO5jFg?si=Qb9-5mGiXtHMcewm",
      live: "https://timelens-852253134165.asia-northeast3.run.app/",
    },
  },
  {
    id: "wigvo",
    name: "WIGVO",
    tags: ["Research", "Competition", "Product"],
    status: "Live",
    featured: true,
    description: {
      en: "Real-time voice translation for phone calls. Dual AI sessions with software-only echo cancellation enable natural bilingual conversations over standard phone lines.",
      ko: "실시간 전화 음성 통역. 듀얼 AI 세션과 소프트웨어 기반 에코 캔슬레이션으로 일반 전화선에서 자연스러운 이중 언어 대화를 실현합니다.",
      ja: "電話通話のためのリアルタイム音声通訳。デュアルAIセッションとソフトウェアベースのエコーキャンセレーションにより、一般電話回線で自然な二言語会話を実現。",
    },
    gradient: "from-violet to-purple-400",
    image: "/images/projects/wigvo_screenshot_call.png",
    publication: "ACL 2026",
    links: {
      detail: "/products/wigvo/",
      github: "https://github.com/wigtn/wigvo-v2",
      video: "https://youtu.be/_ixVEnHJxjk?si=P257fqme3B0zTzNu",
      live: "https://wigvo-web-gzjzn35jyq-du.a.run.app/",
    },
  },
  {
    id: "wigtnocr",
    name: "WigtnOCR-v1",
    tags: ["Research", "Model"],
    status: "Released",
    description: {
      en: "2B document parsing model distilled from 30B teacher via LoRA. Matches teacher performance on OmniDocBench, ranks #1 on KoGovDoc retrieval benchmark.",
      ko: "30B 교사 모델에서 LoRA로 증류한 2B 문서 파싱 모델. OmniDocBench에서 교사 모델 수준 달성, KoGovDoc 검색 벤치마크 1위.",
      ja: "30B教師モデルからLoRAで蒸留した2B文書パーシングモデル。OmniDocBenchで教師モデルと同等性能、KoGovDoc検索ベンチマーク1位。",
    },
    gradient: "from-yellow-500 to-amber-400",
    image: "/images/projects/wigtnocr-huggingface.png",
    links: {
      github: "https://github.com/wigtn/wigtnOCR-v1",
      huggingface: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR",
    },
  },
  {
    id: "wigvu",
    name: "WIGVU",
    tags: ["Product"],
    status: "Preparing",
    description: {
      en: "AI-powered Korean learning from real content. Transforms K-Drama, K-POP, and YouTube into interactive lessons with sentence-level translation.",
      ko: "실제 콘텐츠 기반 AI 한국어 학습. K-Drama, K-POP, YouTube를 문장 단위 번역이 가능한 인터랙티브 학습 자료로 변환합니다.",
      ja: "実際のコンテンツからのAI韓国語学習。K-Drama、K-POP、YouTubeを文レベル翻訳付きインタラクティブレッスンに変換。",
    },
    gradient: "from-indigo-500 to-violet",
    image: "https://opengraph.githubassets.com/1/wigtn/wigvu",
    links: {
      detail: "/products/wigvu/",
      github: "https://github.com/wigtn/wigvu",
    },
  },
  {
    id: "wigex",
    name: "WIGEX",
    tags: ["Product", "Model"],
    status: "Preparing",
    description: {
      en: "Travel expense tracker with receipt OCR powered by our own WigtnOCR model. Real-time currency conversion and offline support.",
      ko: "자체 WigtnOCR 모델 기반 영수증 OCR 탑재 여행 경비 관리 앱. 실시간 환율 변환과 오프라인 지원.",
      ja: "自社WigtnOCRモデルによるレシートOCR搭載の旅行経費管理アプリ。リアルタイム為替変換とオフライン対応。",
    },
    gradient: "from-emerald-500 to-teal-400",
    image: "https://opengraph.githubassets.com/1/wigtn/wigex",
    localVideo: "/videos/wigex_video.mp4",
    links: {
      github: "https://github.com/wigtn/wigex",
    },
  },
  {
    id: "wigtn-plugins",
    name: "WIGTN Coding",
    tags: ["Open Source"],
    status: "Active",
    description: {
      en: "Unified Claude Code plugin — from idea to deploy, zero friction. 12 agents, 3 commands, 3 skills, and 17 design styles with team-based parallel execution for 3-5x speedup.",
      ko: "아이디어에서 배포까지, 제로 프릭션 통합 Claude Code 플러그인. 12개 에이전트, 3개 커맨드, 3개 스킬, 17가지 디자인 스타일을 팀 기반 병렬 실행으로 3-5배 빠르게.",
      ja: "アイデアからデプロイまでゼロフリクションの統合Claude Codeプラグイン。12エージェント、3コマンド、3スキル、17デザインスタイルをチーム並列実行で3-5倍高速化。",
    },
    gradient: "from-gray-700 to-gray-900",
    image: "https://opengraph.githubassets.com/1/wigtn/wigtn-plugins-with-claude-code",
    links: {
      github: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
    },
  },
];

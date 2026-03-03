export interface ResultItem {
  id: string;
  name: string;
  type: "product" | "opensource";
  status: string;
  badge?: string;
  videoUrl?: string;
  description: {
    en: string;
    ko: string;
    ja: string;
  };
  gradient: string;
  link: string;
}

export const RESULTS: ResultItem[] = [
  {
    id: "wigvo",
    name: "WIGVO",
    type: "product",
    status: "Live",
    badge: "ACL 2025 Demo Track",
    description: {
      en: "Real-time voice translation for phone calls. Powered by dual AI sessions and software-only echo cancellation.",
      ko: "실시간 전화 음성 통역. 듀얼 AI 세션과 소프트웨어 기반 에코 캔슬레이션으로 구동됩니다.",
      ja: "電話通話のためのリアルタイム音声通訳。デュアルAIセッションとソフトウェアベースのエコーキャンセレーションで駆動。",
    },
    gradient: "from-violet to-purple-400",
    link: "/products/wigvo/",
    videoUrl: "https://youtu.be/_ixVEnHJxjk?si=P257fqme3B0zTzNu",
  },
  {
    id: "wigvu",
    name: "WIGVU",
    type: "product",
    status: "Renewing",
    description: {
      en: "AI-powered Korean learning from real content. Transforms K-Drama, K-POP, and YouTube into interactive lessons.",
      ko: "실제 콘텐츠 기반 AI 한국어 학습. K-Drama, K-POP, YouTube를 인터랙티브 학습 자료로 변환합니다.",
      ja: "実際のコンテンツからのAI韓国語学習。K-Drama、K-POP、YouTubeをインタラクティブなレッスンに変換。",
    },
    gradient: "from-indigo-500 to-violet",
    link: "/products/wigvu/",
  },
  {
    id: "wigtn-plugins-claude-code",
    name: "WIGTN Plugins with Claude Code",
    type: "opensource",
    status: "Active",
    description: {
      en: "A collection of powerful plugins for Claude Code that enhance your AI-assisted development workflow.",
      ko: "AI 지원 개발 워크플로우를 향상시키는 Claude Code용 강력한 플러그인 모음.",
      ja: "AI支援開発ワークフローを強化するClaude Code用の強力なプラグインコレクション。",
    },
    gradient: "from-gray-700 to-gray-900",
    link: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
  },
];

export type Language = "en" | "ko" | "ja";

export const LANGUAGES: { code: Language; label: string; short: string }[] = [
  { code: "en", label: "ENG", short: "EN" },
  { code: "ko", label: "KOR", short: "KR" },
  { code: "ja", label: "JPN", short: "JP" },
];

// Only translatable content
export const TRANSLATIONS = {
  en: {
    about: {
      text: "We build AI-native development tools that transform how software is created. Our mission is simple: turn your one-sentence idea into a complete, working program.",
    },
    whatWeDo: {
      description: "We create AI-native tools and services that empower developers and teams to build faster, smarter, and more efficiently.",
      items: [
        "Powerful tools designed for the AI era. From intelligent code generators to automated workflows.",
        "Production-ready applications built with our own tools, proving the power of AI-native development.",
        "Free, community-driven extensions that enhance development workflows for everyone.",
      ],
    },
    products: {
      items: [
        "WIGVO connects people across language barriers through real phone calls. Powered by dual OpenAI Realtime sessions and software-only echo cancellation, it delivers bidirectional voice translation over actual PSTN lines. The recipient just answers a normal call — no apps, no setup needed.",
        "WIGVU extracts subtitles from YouTube videos, translates them in real-time, and synchronizes translated scripts with video playback. Powered by WhisperX STT and GPT-4o-mini, it also provides AI-generated summaries, watch scores, keywords, and highlights.",
      ],
    },
    plugins: {
      items: [
        "A collection of powerful plugins for Claude Code that enhance your AI-assisted development workflow. Includes PRD generator, code review, and more.",
        "Custom plugins and extensions for Cursor IDE. Boost your productivity with AI-powered coding assistance.",
      ],
    },
    team: {
      bios: [
        "Building the future of AI-native development. Passionate about making software development accessible to everyone through the power of AI.",
        "Architecting robust and scalable AI systems. Deep expertise in building distributed systems and integrating large language models into production environments.",
        "Turning cutting-edge AI research into practical applications. Specializing in prompt engineering, model fine-tuning, and building intelligent agents.",
        "AI Engineer specializing in Speech-to-Text and Text-to-Speech technologies. Focused on building natural voice interaction systems that bridge the gap between humans and AI.",
        "Crafting intuitive experiences for complex AI tools. Believes that powerful technology should feel effortless to use.",
      ],
    },
  },
  ko: {
    about: {
      text: "WIGTN Crew는 AI-Native 개발을 지향하며, 누구나 소프트웨어 개발을 할 수 있는 도구를 만듭니다.<br>아이디어부터 서비스까지 단 한번에.",
    },
    whatWeDo: {
      description: "개발자와 팀이 더 빠르고, 스마트하게, 효율적으로 개발할 수 있도록 AI 네이티브 도구와 서비스를 만듭니다.",
      items: [
        "AI 시대를 위해 설계된 강력한 도구. 지능형 코드 생성기부터 자동화된 워크플로우까지.",
        "자체 도구로 구축한 프로덕션 수준의 애플리케이션. AI 네이티브 개발의 힘을 증명합니다.",
        "모든 개발자의 워크플로우를 향상시키는 무료 커뮤니티 기반 확장 프로그램.",
      ],
    },
    products: {
      items: [
        "WIGVO는 실제 전화 통화를 통해 언어 장벽을 넘어 사람들을 연결합니다. 듀얼 OpenAI Realtime 세션과 소프트웨어 기반 에코 캔슬레이션으로 실제 전화망(PSTN)에서 양방향 음성 통역을 제공합니다. 수신자는 앱 설치 없이 일반 전화만 받으면 됩니다.",
        "WIGVU는 YouTube 영상의 자막을 추출하고, 실시간으로 번역하며, 영상 재생과 동기화된 스크립트를 제공합니다. WhisperX STT와 GPT-4o-mini를 활용하여 AI 요약, 시청 점수, 키워드, 하이라이트를 생성합니다.",
      ],
    },
    plugins: {
      items: [
        "AI 지원 개발 워크플로우를 향상시키는 Claude Code용 강력한 플러그인 모음. PRD 생성기, 코드 리뷰 등 포함.",
        "Cursor IDE용 커스텀 플러그인 및 확장 프로그램. AI 기반 코딩 지원으로 생산성을 높이세요.",
      ],
    },
    team: {
      bios: [
        "AI-NATIVE 시대의 개발은 더 빠르고 효율적으로 이루어져야 합니다. 누구든 쉽게 도전 할 수 있도록 환경을 만들어드립니다.",
        "견고하고 확장 가능한 AI 시스템을 설계합니다. 분산 시스템 구축과 대규모 언어 모델의 프로덕션 환경 통합에 깊은 전문성을 보유하고 있습니다.",
        "최첨단 AI 연구를 실용적인 애플리케이션으로 전환합니다. 프롬프트 엔지니어링, 모델 파인튜닝, 지능형 에이전트 구축을 전문으로 합니다.",
        "음성 인식(STT)과 음성 합성(TTS) 기술을 전문으로 하는 AI 엔지니어입니다. 인간과 AI 사이의 자연스러운 음성 인터랙션 시스템을 구축하는 데 집중합니다.",
        "복잡한 AI 도구를 위한 직관적인 경험을 만듭니다. 강력한 기술이 사용하기 쉬워야 한다고 믿습니다.",
      ],
    },
  },
  ja: {
    about: {
      text: "ソフトウェア開発の方法を変革するAIネイティブ開発ツールを構築しています。私たちのミッションはシンプルです：一文のアイデアを完全なプログラムに変えること。",
    },
    whatWeDo: {
      description: "開発者とチームがより速く、スマートに、効率的に開発できるようにするAIネイティブツールとサービスを作っています。",
      items: [
        "AI時代のために設計された強力なツール。インテリジェントなコードジェネレーターから自動化されたワークフローまで。",
        "自社ツールで構築したプロダクションレディなアプリケーション。AIネイティブ開発の力を証明します。",
        "すべての開発者のワークフローを向上させる無料のコミュニティ主導の拡張機能。",
      ],
    },
    products: {
      items: [
        "WIGVOは実際の電話を通じて言語の壁を越えて人々をつなぎます。デュアルOpenAI Realtimeセッションとソフトウェアベースのエコーキャンセレーションにより、実際の電話回線（PSTN）で双方向音声通訳を提供します。受信者はアプリ不要、普通の電話に出るだけです。",
        "WIGVUはYouTube動画の字幕を抽出し、リアルタイムで翻訳し、動画再生と同期したスクリプトを提供します。WhisperX STTとGPT-4o-miniを活用し、AI要約、視聴スコア、キーワード、ハイライトを生成します。",
      ],
    },
    plugins: {
      items: [
        "AI支援開発ワークフローを強化するClaude Code用の強力なプラグインコレクション。PRDジェネレーター、コードレビューなどを含む。",
        "Cursor IDE用のカスタムプラグインと拡張機能。AI駆動のコーディング支援で生産性を向上。",
      ],
    },
    team: {
      bios: [
        "AIネイティブ開発の未来を構築しています。AIの力で誰もがソフトウェア開発できるようにすることに情熱を持っています。",
        "堅牢でスケーラブルなAIシステムを設計。分散システムの構築と大規模言語モデルのプロダクション環境への統合に深い専門知識を持っています。",
        "最先端のAI研究を実用的なアプリケーションに変換。プロンプトエンジニアリング、モデルファインチューニング、インテリジェントエージェントの構築を専門としています。",
        "音声認識（STT）と音声合成（TTS）技術を専門とするAIエンジニア。人間とAIの間の自然な音声インタラクションシステムの構築に注力しています。",
        "複雑なAIツールのための直感的な体験を作成。強力な技術は使いやすくあるべきだと信じています。",
      ],
    },
  },
};

export interface Translations {
  about: {
    text: string;
  };
  whatWeDo: {
    description: string;
    items: string[];
  };
  products: {
    items: string[];
  };
  plugins: {
    items: string[];
  };
  team: {
    bios: string[];
  };
}

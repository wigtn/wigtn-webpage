export type Language = "en" | "ko" | "ja";

export const LANGUAGES: { code: Language; label: string; short: string }[] = [
  { code: "en", label: "ENG", short: "EN" },
  { code: "ko", label: "KOR", short: "KR" },
  { code: "ja", label: "JPN", short: "JP" },
];

export const TRANSLATIONS = {
  en: {
    hero: {
      tagline: "We prove ourselves by what we build, not how long we've built.",
    },
    about: {
      heading: "We prove ourselves by what we build, not how long we've built.",
      paragraphs: [
        "We're a crew of engineers who believe results speak louder than résumés. We started building because growth doesn't come from waiting — it comes from shipping.",
        "Every product, every open-source tool, every research paper is proof. Not of where we've been, but of what we can do.",
        "We move fast, we build real things, and we let the work speak for itself.",
      ],
    },
    results: {
      heading: "What We've Built",
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
    footer: {
      tagline: "We prove ourselves by what we build, not how long we've built.",
    },
    productDetail: {
      back: "Back",
      backToHome: "Back to Home",
      tryItLive: "Try it live",
      comingSoon: "Coming Soon",
      theProblem: "THE PROBLEM",
      theSolution: "THE SOLUTION",
      keyMetrics: "KEY METRICS",
      techStack: "TECH STACK",
      howItWorks: "HOW IT WORKS",
      learnMore: "Learn More",
      wigvo: {
        tagline: "Break language barriers in Korea. Call anyone, in any language.",
        description: "Real-time voice translation for phone calls. Powered by dual AI sessions and software-only echo cancellation, WIGVO lets you call any phone number in any language. The other person just answers a normal call — no app needed.",
        problem: "K-Culture brought millions to Korea — but when they need to make a phone call, the language wall hits hard. Booking a restaurant, calling a hospital, reaching a landlord — everyday calls that locals handle in seconds become impossible without Korean. And Koreans living abroad face the same wall in reverse.",
        solution: "WIGVO bridges the gap with real-time phone translation. Our dual-session architecture runs two parallel AI interpreters — one for each speaker — delivering natural, bidirectional voice translation over standard phone lines.",
        statusBadge: "Live",
      },
      wigvu: {
        tagline: "Learn Korean through the content you love.",
        description: "AI-powered Korean learning from real content. WIGVU transforms K-Drama clips, K-POP lyrics, news articles, and YouTube videos into interactive Korean lessons with sentence-level translation and expression analysis.",
        problem: "You binge K-Dramas and stream K-POP, but learning Korean from actual Korean content feels impossible. Subtitles skip nuance, textbooks ignore slang, and there's no tool that turns the content you already love into real learning material.",
        solution: "WIGVU uses AI to transform real Korean content into structured learning material. Every sentence gets translated, key expressions are extracted, and grammar patterns are broken down — all synced with the original content.",
        statusBadge: "Renewing",
      },
      features: {
        wigvo_feature_dual: "Two parallel OpenAI Realtime sessions handle each side of the conversation independently, ensuring natural turn-taking.",
        wigvo_feature_phone: "Call any phone number on any carrier. Works with landlines, mobile phones, and VoIP — the recipient doesn't need any app.",
        wigvo_feature_echo: "Software-only echo cancellation eliminates feedback loops without hardware, keeping conversations natural.",
        wigvo_feature_noapp: "The person you're calling just answers their phone normally. Zero setup, zero downloads on their end.",
        wigvu_feature_content: "Learn from K-Dramas, K-POP, YouTube videos, and news articles — real Korean content, not textbook examples.",
        wigvu_feature_translation: "Every sentence is translated with context-aware AI, preserving nuance, slang, and cultural meaning.",
        wigvu_feature_ai: "AI-generated summaries, difficulty scores, and keyword extraction help you find content at your level.",
        wigvu_feature_expression: "Key expressions and grammar patterns are automatically extracted and explained for deeper understanding.",
      },
      stats: {
        avgLatency: "Avg. Latency",
        callsMade: "Calls Made",
        perMinute: "Per Minute",
        echoLoops: "Echo Loops",
        languagesSupported: "Languages",
        contentModes: "Content Modes",
        powered: "Powered",
      },
      modes: {
        mode_v2v_title: "Voice-to-Voice",
        mode_v2v_desc: "Speak naturally in your language. WIGVO translates your voice in real-time and delivers it as natural speech to the other person — and vice versa.",
        mode_t2v_title: "Text-to-Voice",
        mode_t2v_desc: "Type what you want to say, and WIGVO speaks it to the other person in their language. Perfect for noisy environments or precise messages.",
        mode_agent_title: "AI Agent",
        mode_agent_desc: "Let WIGVO's AI agent handle the call for you. Describe what you need — book a reservation, schedule an appointment — and the agent makes the call.",
      },
    },
  },
  ko: {
    hero: {
      tagline: "경력이 아닌 결과물로 증명한다",
    },
    about: {
      heading: "경력이 아닌 결과물로 증명한다",
      paragraphs: [
        "우리는 이력서보다 결과물이 더 크게 말한다고 믿는 엔지니어 크루입니다. 기다림이 아닌, 만들어냄으로써 성장해 왔습니다.",
        "모든 제품, 모든 오픈소스 도구, 모든 연구 논문이 증거입니다. 어디에 있었는지가 아니라, 무엇을 할 수 있는지를 보여줍니다.",
        "빠르게 움직이고, 실제로 만들고, 결과물이 스스로 말하게 합니다.",
      ],
    },
    results: {
      heading: "우리가 만든 것들",
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
    footer: {
      tagline: "경력이 아닌 결과물로 증명한다",
    },
    productDetail: {
      back: "뒤로",
      backToHome: "홈으로 돌아가기",
      tryItLive: "사용해보기",
      comingSoon: "준비 중",
      theProblem: "문제",
      theSolution: "솔루션",
      keyMetrics: "핵심 지표",
      techStack: "기술 스택",
      howItWorks: "작동 방식",
      learnMore: "자세히 보기",
      wigvo: {
        tagline: "한국에서의 언어 장벽을 깨다. 누구에게든, 어떤 언어로든 전화하세요.",
        description: "전화 통화를 위한 실시간 음성 통역. 듀얼 AI 세션과 소프트웨어 기반 에코 캔슬레이션으로, WIGVO는 어떤 전화번호로든 어떤 언어로든 통화할 수 있게 합니다. 상대방은 일반 전화만 받으면 됩니다 — 앱 설치 불필요.",
        problem: "K-Culture는 수많은 사람들을 한국으로 이끌었지만, 전화 한 통이 필요한 순간 언어의 벽에 부딪힙니다. 식당 예약, 병원 전화, 부동산 문의 — 한국인에게는 몇 초면 되는 일상적인 전화가, 한국어 없이는 불가능합니다. 해외에 사는 한국인도 똑같은 벽에 부딪힙니다.",
        solution: "WIGVO는 실시간 전화 통역으로 그 간격을 연결합니다. 듀얼 세션 아키텍처가 두 개의 병렬 AI 통역사를 실행하여, 일반 전화선에서 자연스러운 양방향 음성 통역을 제공합니다.",
        statusBadge: "운영 중",
      },
      wigvu: {
        tagline: "좋아하는 콘텐츠로 한국어를 배우세요.",
        description: "실제 콘텐츠 기반 AI 한국어 학습. WIGVU는 K-Drama 클립, K-POP 가사, 뉴스 기사, YouTube 영상을 문장별 번역과 표현 분석이 가능한 인터랙티브 한국어 학습 자료로 변환합니다.",
        problem: "K-Drama를 정주행하고 K-POP을 스트리밍하지만, 실제 한국 콘텐츠로 한국어를 배우는 것은 불가능하게 느껴집니다. 자막은 뉘앙스를 놓치고, 교과서는 신조어를 무시하며, 이미 좋아하는 콘텐츠를 진짜 학습 자료로 바꿔주는 도구가 없습니다.",
        solution: "WIGVU는 AI를 사용하여 실제 한국 콘텐츠를 구조화된 학습 자료로 변환합니다. 모든 문장이 번역되고, 핵심 표현이 추출되며, 문법 패턴이 분석됩니다 — 모두 원본 콘텐츠와 동기화됩니다.",
        statusBadge: "리뉴얼 중",
      },
      features: {
        wigvo_feature_dual: "두 개의 병렬 OpenAI Realtime 세션이 대화의 양쪽을 독립적으로 처리하여 자연스러운 턴테이킹을 보장합니다.",
        wigvo_feature_phone: "모든 통신사의 모든 전화번호로 통화 가능. 유선전화, 휴대폰, VoIP 모두 지원 — 수신자는 앱이 필요 없습니다.",
        wigvo_feature_echo: "하드웨어 없이 소프트웨어만으로 에코를 제거하여 자연스러운 대화를 유지합니다.",
        wigvo_feature_noapp: "상대방은 평소처럼 전화를 받기만 하면 됩니다. 설정도, 다운로드도 필요 없습니다.",
        wigvu_feature_content: "K-Drama, K-POP, YouTube 영상, 뉴스 기사 등 실제 한국 콘텐츠로 학습하세요 — 교과서 예문이 아닌.",
        wigvu_feature_translation: "모든 문장이 맥락 인식 AI로 번역되어 뉘앙스, 신조어, 문화적 의미가 보존됩니다.",
        wigvu_feature_ai: "AI 생성 요약, 난이도 점수, 키워드 추출로 자신의 수준에 맞는 콘텐츠를 찾을 수 있습니다.",
        wigvu_feature_expression: "핵심 표현과 문법 패턴이 자동으로 추출되고 설명되어 깊은 이해를 돕습니다.",
      },
      stats: {
        avgLatency: "평균 지연시간",
        callsMade: "통화 횟수",
        perMinute: "분당 비용",
        echoLoops: "에코 루프",
        languagesSupported: "지원 언어",
        contentModes: "콘텐츠 모드",
        powered: "구동",
      },
      modes: {
        mode_v2v_title: "음성 대 음성",
        mode_v2v_desc: "자연스럽게 자신의 언어로 말하세요. WIGVO가 실시간으로 음성을 번역하여 상대방에게 자연스러운 음성으로 전달합니다 — 반대 방향도 마찬가지.",
        mode_t2v_title: "텍스트 대 음성",
        mode_t2v_desc: "말할 내용을 타이핑하면, WIGVO가 상대방의 언어로 음성 전달합니다. 시끄러운 환경이나 정확한 메시지 전달에 적합합니다.",
        mode_agent_title: "AI 에이전트",
        mode_agent_desc: "WIGVO의 AI 에이전트가 대신 전화합니다. 필요한 것을 설명하세요 — 예약, 예약 일정 등 — 에이전트가 전화를 겁니다.",
      },
    },
  },
  ja: {
    hero: {
      tagline: "キャリアではなく、成果で証明する",
    },
    about: {
      heading: "キャリアではなく、成果で証明する",
      paragraphs: [
        "私たちは、履歴書よりも成果が雄弁に語ると信じるエンジニアクルーです。待つのではなく、作ることで成長してきました。",
        "すべてのプロダクト、すべてのオープンソースツール、すべての研究論文が証拠です。どこにいたかではなく、何ができるかを示します。",
        "速く動き、本物を作り、仕事そのものに語らせます。",
      ],
    },
    results: {
      heading: "私たちが作ったもの",
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
    footer: {
      tagline: "キャリアではなく、成果で証明する",
    },
    productDetail: {
      back: "戻る",
      backToHome: "ホームに戻る",
      tryItLive: "試してみる",
      comingSoon: "近日公開",
      theProblem: "課題",
      theSolution: "ソリューション",
      keyMetrics: "主要指標",
      techStack: "技術スタック",
      howItWorks: "仕組み",
      learnMore: "詳しく見る",
      wigvo: {
        tagline: "韓国での言語の壁を壊す。誰にでも、どの言語でも電話できます。",
        description: "電話通話のためのリアルタイム音声通訳。デュアルAIセッションとソフトウェアベースのエコーキャンセレーションにより、WIGVOはどの電話番号にもどの言語でも通話できます。相手は普通の電話に出るだけ — アプリ不要。",
        problem: "K-Cultureは何百万もの人々を韓国に導きましたが、電話一本かける必要がある時、言語の壁に直面します。レストランの予約、病院への電話、不動産への問い合わせ — 韓国人なら数秒でできる日常の電話が、韓国語なしでは不可能です。海外に住む韓国人も同じ壁に直面します。",
        solution: "WIGVOはリアルタイム電話通訳でそのギャップを埋めます。デュアルセッションアーキテクチャが2つの並列AI通訳者を実行し、標準電話回線で自然な双方向音声通訳を提供します。",
        statusBadge: "運用中",
      },
      wigvu: {
        tagline: "好きなコンテンツで韓国語を学ぼう。",
        description: "実際のコンテンツからのAI韓国語学習。WIGVUはK-Dramaクリップ、K-POPの歌詞、ニュース記事、YouTube動画を文レベルの翻訳と表現分析が可能なインタラクティブな韓国語学習教材に変換します。",
        problem: "K-Dramaを一気見し、K-POPをストリーミングしていますが、実際の韓国コンテンツから韓国語を学ぶことは不可能に感じます。字幕はニュアンスを見逃し、教科書はスラングを無視し、すでに好きなコンテンツを本当の学習教材に変えるツールがありません。",
        solution: "WIGVUはAIを使って実際の韓国コンテンツを構造化された学習教材に変換します。すべての文が翻訳され、キーフレーズが抽出され、文法パターンが分析されます — すべてオリジナルコンテンツと同期されます。",
        statusBadge: "リニューアル中",
      },
      features: {
        wigvo_feature_dual: "2つの並列OpenAI Realtimeセッションが会話の両側を独立して処理し、自然なターンテイキングを保証します。",
        wigvo_feature_phone: "どのキャリアのどの電話番号にも通話可能。固定電話、携帯電話、VoIPすべて対応 — 受信者はアプリ不要。",
        wigvo_feature_echo: "ハードウェアなしのソフトウェアのみでエコーを除去し、自然な会話を維持します。",
        wigvo_feature_noapp: "相手は普通に電話に出るだけ。セットアップもダウンロードも不要です。",
        wigvu_feature_content: "K-Drama、K-POP、YouTube動画、ニュース記事から学習 — 教科書の例文ではなく、実際の韓国コンテンツで。",
        wigvu_feature_translation: "すべての文がコンテキスト認識AIで翻訳され、ニュアンス、スラング、文化的意味が保持されます。",
        wigvu_feature_ai: "AI生成の要約、難易度スコア、キーワード抽出で自分のレベルに合ったコンテンツを見つけられます。",
        wigvu_feature_expression: "キーフレーズと文法パターンが自動的に抽出・説明され、深い理解を助けます。",
      },
      stats: {
        avgLatency: "平均遅延",
        callsMade: "通話回数",
        perMinute: "分あたり",
        echoLoops: "エコーループ",
        languagesSupported: "対応言語",
        contentModes: "コンテンツモード",
        powered: "駆動",
      },
      modes: {
        mode_v2v_title: "音声対音声",
        mode_v2v_desc: "自分の言語で自然に話してください。WIGVOがリアルタイムで音声を翻訳し、相手に自然な音声で届けます — 逆方向も同様。",
        mode_t2v_title: "テキスト対音声",
        mode_t2v_desc: "言いたいことをタイプすると、WIGVOが相手の言語で音声を届けます。騒がしい環境や正確なメッセージに最適。",
        mode_agent_title: "AIエージェント",
        mode_agent_desc: "WIGVOのAIエージェントが代わりに電話します。必要なことを説明してください — 予約、スケジュール調整など — エージェントが電話をかけます。",
      },
    },
  },
};

export interface ProductDetailTranslations {
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  statusBadge: string;
}

export interface Translations {
  hero: {
    tagline: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
  };
  results: {
    heading: string;
  };
  team: {
    bios: string[];
  };
  footer: {
    tagline: string;
  };
  productDetail: {
    back: string;
    backToHome: string;
    tryItLive: string;
    comingSoon: string;
    theProblem: string;
    theSolution: string;
    keyMetrics: string;
    techStack: string;
    howItWorks: string;
    learnMore: string;
    wigvo: ProductDetailTranslations;
    wigvu: ProductDetailTranslations;
    features: Record<string, string>;
    stats: Record<string, string>;
    modes: Record<string, string>;
  };
}

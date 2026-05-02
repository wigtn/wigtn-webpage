export const TRANSLATIONS = {
  hero: {
    taglineLight: "From idea to production — no seniors, no shortcuts. We ship.",
    taglineStrong: "We don't study AI. We just ship it.",
    tagline: "We prove ourselves by what we build, not how long we've built.",
  },
  about: {
    heading: "An AI-native builder crew that starts from real-world friction and ships production-grade systems end-to-end.",
    paragraphs: [
      "WIGTN is an independent development crew of five AI engineers. We start from real-world friction — the tangible inconveniences people face in everyday life and in the field — and take ideas all the way to production-grade systems.",
      "We don't build demos. We build products that make people say, \"Wait, this actually works?\" We move fast, but we deliver results that leave a lasting impression — creating meaningful impact in remarkably short timeframes.",
      "Through research, open-source projects, and shipping production AI systems, we prove what a small team of builders can accomplish in the AI-Native era.",
    ],
  },
  whatWeDo: {
    eyebrow: "What we do",
    heading: "We ship across four fronts.",
    lead: "An independent crew of five AI engineers. We start from real-world friction and take ideas all the way to production-grade systems — across research, open source, awards, and products.",
    categories: {
      research: {
        title: "Research",
        description:
          "Peer-reviewed papers at top NLP venues. ACL 2026 (accepted), EMNLP 2026 (in preparation).",
      },
      awards: {
        title: "Awards",
        description:
          "International hackathon recognition. ByteDance Trae.ai Seoul winner, Snowflake AI Korea runner-up.",
      },
      openSource: {
        title: "Open Source",
        description:
          "Tools used by the developer community. Claude Code plugins, npm packages, HuggingFace models.",
      },
      products: {
        title: "Products",
        description: "Mobile apps in active development.",
      },
    },
  },
  results: {
    heading: "What We've Built",
    filterAll: "All",
    filterResearch: "Research",
    filterCompetition: "Competition",
    filterProducts: "Products",
    filterModels: "Models",
    filterOpensource: "Open Source",
    statPapers: "Papers",
    statCompetitions: "Competitions",
    statLive: "Live Services",
    statModels: "Models",
    statOpenSource: "Open Source Repos",
  },
  team: {
    // Order MUST match the member order in `constants/team.ts`:
    // Harrison → Sangwoo → Eric → Hyeonsang → David.
    bios: [
      "Former construction PM with a decade of large-scale project experience. Now leading WIGTN, focused on AI modeling, product development, and applied research in GPU-accelerated computing.",
      "Builds LLM-powered applications and autonomous agent systems. Focuses on multi-agent orchestration and workflow automation.",
      "Manages full MLOps pipelines with Docker, Kubernetes, and CI/CD. Also serves as the team's DBA and leads UI/UX direction.",
      "Mobile-first full-stack engineer covering the entire 3-tier stack with React Native. Focused on software engineering craft rather than model development.",
      "Web-focused full-stack engineer who builds across the 3-tier architecture. Brings mobile experience with React Native and leverages AI-native tooling for rapid delivery.",
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
    viewOnGithub: "View on GitHub",
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
    wigtnocr: {
      tagline: "A 2B-parameter document parser that reads Korean government forms as accurately as a model 15x its size.",
      description: "WigtnOCR distills a 30B teacher model into a 2B student through pseudo-label distillation and LoRA fine-tuning, achieving teacher-level accuracy on OmniDocBench while running on a single consumer GPU. Ranked #1 on the KoGovDoc Korean government document retrieval benchmark.",
      problem: "Existing OCR and rule-based parsers fail on Korean government documents — missing tables, forms, and complex layouts. State-of-the-art VLM parsers are optimized for English/Chinese, and 30B models are too expensive for production deployment.",
      solution: "Pseudo-label distillation compresses a 30B teacher's parsing intelligence into a 2B student via LoRA fine-tuning on 2,667 Korean government document pages, achieving #1 retrieval performance across 6 parsers.",
      statusBadge: "Released",
    },
    wigent: {
      tagline: "Drop a topic, watch AI agents debate it live — then a landing page writes itself from the conclusions.",
      description: "WIGENT is a multi-agent debate platform where a PM agent orchestrates auto-spawned domain experts in a Slack-style chat UI. Agents debate, challenge each other, retire, and summon new specialists. Once consensus is reached, the chat transforms into a landing page generated from the debate conclusions. Grand Prize winner at Build with TRAE Seoul — built by 3 engineers in 3.5 hours.",
      problem: "Solo brainstorming is biased, team discussions take hours, and AI chat tools give single-perspective responses with no debate or convergence. There's no way to get the clash of viewpoints that produces strong ideas — quickly, with a tangible deliverable.",
      solution: "AI agents autonomously debate your topic in a Slack-style UI — PM anchors the discussion, domain experts argue and get replaced, and the debate converges into a structured business idea that instantly renders as a landing page from 9 design templates.",
      statusBadge: "Released",
    },
    wigtnflake: {
      tagline: "Pick a goal, get a data-backed Top 3 of Seoul districts — five Cortex-powered AI experts debate the answer.",
      description: "WIGTN Flake is a purpose-driven neighborhood-intelligence platform. The user picks a goal — open a cafe, target rental-appliance ads, place a billboard, invest, or detect anomalies — and five Cortex-powered AI experts cross-query four datasets (SPH, RichGo, NextTrade, AJD) over Cortex Analyst, ANOMALY_DETECTION, and FORECAST. The output is a ranked Top 3 of Seoul districts, anomaly badges, six-month projections, and a concrete action checklist. Tech Track Top 3 at Snowflake AI & Data Hackathon Korea 2026.",
      problem: "Public-data dashboards in Korea answer \"how many people walk through Yeoksam-dong?\" but rarely \"so where should I open my cafe?\" Generic dashboards aren't goal-aware, single-perspective AI is too agreeable, and cross-querying real estate × foot traffic × card sales × telecom requires manual spreadsheet work that takes a week.",
      solution: "Pick one of five preset purposes (or type your own). A GPT-4o orchestrator summons five purpose-tuned experts who debate in a Slack-style chat while Cortex Analyst runs text-to-SQL across four Semantic Models. ANOMALY_DETECTION auto-injects 'watch this district' badges, FORECAST projects six months out, and the report converges into a Top 3 ranking with a purpose-specific action checklist.",
      statusBadge: "Top 3",
    },
    features: {
      wigvo_feature_dual: "Two parallel OpenAI Realtime sessions handle each side of the conversation independently, ensuring natural turn-taking.",
      wigvo_feature_phone: "Call any phone number on any carrier. Works with landlines, mobile phones, and VoIP — the recipient doesn't need any app.",
      wigvo_feature_echo: "Software-only echo cancellation eliminates feedback loops without hardware, keeping conversations natural.",
      wigvo_feature_noapp: "The person you're calling just answers their phone normally. Zero setup, zero downloads on their end.",
      wigtnocr_feature_distillation: "Compresses 30B teacher intelligence into a 2B student through pseudo-label distillation on 2,667 Korean government document pages.",
      wigtnocr_feature_lora: "LoRA rank=8 fine-tuning on all language model linear layers in just 31 minutes with DeepSpeed ZeRO-2.",
      wigtnocr_feature_benchmark: "KoGovDoc-Bench — a new evaluation dataset of 294 Korean government document pages with pseudo-GT annotations.",
      wigtnocr_feature_opensource: "Model weights, training data, and evaluation code all released on HuggingFace and GitHub.",
      wigvu_feature_content: "Learn from K-Dramas, K-POP, YouTube videos, and news articles — real Korean content, not textbook examples.",
      wigvu_feature_translation: "Every sentence is translated with context-aware AI, preserving nuance, slang, and cultural meaning.",
      wigvu_feature_ai: "AI-generated summaries, difficulty scores, and keyword extraction help you find content at your level.",
      wigvu_feature_expression: "Key expressions and grammar patterns are automatically extracted and explained for deeper understanding.",
      wigent_feature_orchestrator: "AsyncGenerator-based debate engine controls 30-turn free debates with automatic phase transitions, agent retirement at turns 12 and 22, and forced convergence after turn 25.",
      wigent_feature_landing: "9 design templates (Glassmorphism, Neobrutalism, Editorial, etc.) render instantly when the debate concludes — no 60-second GPT wait. Dual-path rendering keeps GPT generation as a silent fallback.",
      wigent_feature_ui: "Full Slack-style dark-theme chat with typing indicators, agent join/leave system messages, sidebar with online status, and Framer Motion page transitions.",
      wigent_feature_hitl: "Users can reject the result. The PM announces the rejection, the team runs 8 more turns of focused debate, and a new landing page is generated — all without the user typing into the debate.",
      wigtnflake_feature_purpose: "Six purpose cards (cafe location, rental-appliance targeting, billboard placement, investment, anomaly detection, free-form). UX and orchestrator both branch from the chosen goal — every component carries the purpose context.",
      wigtnflake_feature_cortex: "Cortex Analyst runs text-to-SQL across four Semantic Models (SPH, RichGo, NextTrade, AJD) — coordinated by Cortex Agent with a fall-through to direct Analyst calls under trial limits, then GPT-4o Function Calling, then pure GPT-4o.",
      wigtnflake_feature_anomaly: "ANOMALY_DETECTION promoted from supporting role to demo lead — automatically injects 'watch this district' badges into the ranking. The 'wait, something's happening here' moment that anchors the demo.",
      wigtnflake_feature_hybrid: "Cortex LLM (claude-4-sonnet) for streaming long-Korean reports; GPT-4o for debate personas and Function Calling. A streaming garbage-token detector triggers instant fall-over when Cortex LLM degrades.",
    },
    stats: {
      avgLatency: "Avg. Latency",
      callsMade: "Calls Made",
      perMinute: "Per Minute",
      echoLoops: "Echo Loops",
      languagesSupported: "Languages",
      contentModes: "Content Modes",
      powered: "Powered",
      tableTeds: "Table TEDS (#1)",
      retrievalHit1: "Retrieval Hit@1 (#1)",
      trainingTime: "Training Time",
      parameters: "Parameters",
      prototypeTime: "To Prototype",
      commits: "Commits",
      mergeConflicts: "Merge Conflicts",
      agentPatterns: "Agent Patterns",
      aiExperts: "AI Experts",
      snowflakeServices: "Cortex Functions",
      hackathonRank: "Tech Track",
      datasetSize: "Datasets",
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
};

export type Translations = typeof TRANSLATIONS;

export interface ProductDetailTranslations {
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  statusBadge: string;
}

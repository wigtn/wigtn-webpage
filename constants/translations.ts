export const TRANSLATIONS = {
  hero: {
    tagline: "We prove ourselves by what we build, not how long we've built.",
  },
  about: {
    heading: "An AI-Native Builder Crew That Starts from Real Problems, Builds Without Senior Guidance, and Makes \"Wait, This Actually Works?\" a Reality",
    paragraphs: [
      "WIGTN is an independent development crew of five AI engineers. We start from real-world friction — the tangible inconveniences people face in everyday life and in the field — and take ideas all the way to production-grade systems, without relying on senior mentorship or hand-holding.",
      "We don't build demos. We build products that make people say, \"Wait, this actually works?\" We move fast, but we deliver results that leave a lasting impression — creating meaningful impact in remarkably short timeframes.",
      "Through hackathons, open-source projects, and community education, we learn by doing, proving what a small team of builders can accomplish in the AI-Native era.",
    ],
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
    bios: [
      "Former construction PM with a decade of large-scale project experience. Now leading WIGTN, focused on AI modeling, product development, and applied research in GPU-accelerated computing.",
      "Architecting robust and scalable AI systems. Deep expertise in building distributed systems and integrating large language models into production environments.",
      "Turning cutting-edge AI research into practical applications. Specializing in prompt engineering, model fine-tuning, and building intelligent agents.",
      "AI Engineer focused on building LLM-powered applications and autonomous agent systems. Passionate about designing intelligent workflows that leverage large language models to solve real-world problems.",
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

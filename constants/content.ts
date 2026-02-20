export const CONTENT = {
  meta: {
    title: "WIGTN - One Sentence. Complete Program.",
    description: "AI-Native development team building tools and services for the future.",
  },

  crew: {
    title: "WIGTN Crew",
  },

  about: {
    label: "ABOUT",
    tagline: "One Sentence. Complete Program.",
    text: "We build AI-native development tools that transform how software is created. Our mission is simple: turn your one-sentence idea into a complete, working program.",
  },

  whatWeDo: {
    label: "WHAT WE DO",
    title: "Building the Future of Development",
    description: "We create AI-native tools and services that empower developers and teams to build faster, smarter, and more efficiently.",
    items: [
      {
        title: "AI-Native Development Tools",
        description: "Powerful tools designed for the AI era. From intelligent code generators to automated workflows.",
      },
      {
        title: "App-Based Services",
        description: "Production-ready applications built with our own tools, proving the power of AI-native development.",
      },
      {
        title: "Open Source Plugins",
        description: "Free, community-driven extensions that enhance development workflows for everyone.",
      },
    ],
  },

  products: {
    label: "PRODUCTS",
    title: "Our Apps",
    description: "App-based services built with AI-native development.",
    items: [
      {
        id: "wigvo",
        name: "WIGVO",
        tagline: "Real-time phone translation, just call",
        description: "WIGVO connects people across language barriers through real phone calls. Powered by dual OpenAI Realtime sessions and software-only echo cancellation, it delivers bidirectional voice translation over actual PSTN lines. The recipient just answers a normal call — no apps, no setup needed.",
        features: ["Bidirectional real-time voice translation", "Any phone number, any carrier", "4 modes: Voice, Text, and AI Agent"],
        status: "Live",
        image: "/images/wigvo-preview.png",
      },
      {
        id: "wigvu",
        name: "WIGVU",
        tagline: "Watch, understand, any language",
        description: "WIGVU extracts subtitles from YouTube videos, translates them in real-time, and synchronizes translated scripts with video playback. Powered by WhisperX STT and GPT-4o-mini, it also provides AI-generated summaries, watch scores, keywords, and highlights.",
        features: ["Subtitle extraction and real-time translation", "AI analysis with summaries and highlights", "Synchronized script panel with video playback"],
        status: "Live",
        image: "/images/wigvu-preview.png",
      },
    ],
  },

  plugins: {
    label: "PLUGINS",
    title: "Open Source",
    description: "Free tools for the developer community.",
    items: [
      {
        id: "wigtn-plugins-with-claude-code",
        name: "WIGTN Plugins with Claude Code",
        description: "A collection of powerful plugins for Claude Code that enhance your AI-assisted development workflow. Includes PRD generator, code review, and more.",
        repo: "https://github.com/wigtn/wigtn-plugins-with-claude-code",
      },
    ],
  },

  contact: {
    label: "CONTACT",
    title: "Get in Touch",
    email: "contact@wigtn.com",
  },

  footer: {
    copyright: "WIGTN. ALL RIGHTS RESERVED.",
  },
} as const;

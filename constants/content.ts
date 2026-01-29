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
        id: "wigvu",
        name: "WIGVU",
        tagline: "See your ideas come to life",
        description: "WIGVU transforms your concepts into visual prototypes instantly. Simply describe what you want to build, and watch as AI generates interactive previews. Perfect for validating ideas before committing to full development.",
        features: ["Instant visual prototyping", "Natural language input", "Export to code"],
        status: "Coming Soon",
        image: "/images/wigvu-preview.png",
      },
      {
        id: "wigex",
        name: "WIGEX",
        tagline: "Execute with precision",
        description: "WIGEX takes your approved designs and executes them into production-ready code. Powered by advanced AI agents, it handles the heavy lifting of implementation while you focus on what matters most.",
        features: ["AI-powered code generation", "Production-ready output", "Continuous iteration"],
        status: "Coming Soon",
        image: "/images/wigex-preview.png",
      },
    ],
  },

  plugins: {
    label: "PLUGINS",
    title: "Open Source",
    description: "Free tools for the developer community.",
    items: [
      {
        id: "claude-code-plugins",
        name: "Claude Code Plugins",
        description: "A collection of powerful plugins for Claude Code that enhance your AI-assisted development workflow. Includes PRD generator, code review, and more.",
        repo: "https://github.com/wigtn/claude-code-plugins",
      },
      {
        id: "cursor-plugins",
        name: "Cursor Plugins",
        description: "Custom plugins and extensions for Cursor IDE. Boost your productivity with AI-powered coding assistance.",
        repo: "https://github.com/wigtn/cursor-plugins",
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

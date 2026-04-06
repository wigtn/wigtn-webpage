import type { TeamMember } from "@/types";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Hyeongseob Kim",
    role: "Founder & Crew Lead",
    bio: "Former construction PM with a decade of large-scale project experience. Now leading WIGTN, focused on AI modeling, product development, and applied research in GPU-accelerated computing.",
    expertise: ["AI/ML", "Product Strategy", "System Architecture", "Operations"],
    links: {
      github: "https://github.com/Hyeongseob91",
      linkedin: "https://linkedin.com/in/harrison-hyeongseob-kim",
    },
  },
  {
    name: "Jinmo Kim",
    role: "MLOps Engineer & Designer",
    bio: "Owns the full MLOps lifecycle — containerizing models with Docker, orchestrating training and inference workloads on Kubernetes, and managing CI/CD pipelines that ship AI services to production. Also serves as the team's DBA, tuning query performance and maintaining data reliability across distributed datastores. Beyond infrastructure, brings a strong design sensibility to the table — leading UI/UX direction and building video processing systems that turn raw footage into polished product assets.",
    expertise: ["Docker", "Kubernetes", "CI/CD", "MLOps", "DBA", "UI/UX Design", "Video Processing"],
    links: {
      github: "https://github.com/moriroKim",
      linkedin: "https://www.linkedin.com/in/jinmo-kim-62878533b/",
    },
  },
  {
    name: "Hyeonsang Kim",
    role: "AI Product Engineer",
    bio: "Mobile-first full-stack engineer who architects and ships cross-platform applications from presentation layer to database. Specializes in React Native for native-quality mobile experiences while building the supporting backend services with Node.js and relational databases — covering the full 3-tier stack end to end. Integrates AI-native tooling throughout the development workflow to accelerate iteration speed and maintain production-grade quality, with a focus on software engineering craft rather than model development.",
    expertise: ["React Native", "Expo", "Next.js", "Nest.js", "Node.js", "PostgreSQL", "Full-Stack"],
    links: {
      github: "https://github.com/HyeonsangKim",
      linkedin: "https://www.linkedin.com/in/hyeonsang-kim-5a7a67260/",

    },
  },
  {
    name: "Sangwoo Son",
    role: "AI Engineer",
    bio: "AI Engineer focused on building LLM-powered applications and autonomous agent systems. Passionate about designing intelligent workflows that leverage large language models to solve real-world problems.",
    expertise: ["AI/ML", "LLM Application", "AI Agent", "Language AI"],
    links: {
      github: "https://github.com/wigtn",
      linkedin: "https://linkedin.com/in/sangwooson",
    },
  },
  {
    name: "Hyunwoo Cho",
    role: "AI Product Engineer",
    bio: "Web-focused full-stack engineer who delivers responsive, high-performance applications across the entire 3-tier architecture — from pixel-perfect React frontends through API design to database-backed services. Brings additional mobile development experience with React Native, enabling seamless cross-platform contributions when the team needs it. Leverages AI-native tooling across every phase of the development cycle to ship faster without sacrificing code quality, with a clear focus on software engineering discipline over model building.",
    expertise: ["React", "Next.js", "TypeScript", "Nest.js", "Node.js", "React Native", "PostgreSQL", "Full-Stack"],
    links: {
      linkedin:
        "https://www.linkedin.com/in/%ED%98%84%EC%9A%B0-%EC%A1%B0-8a6800393/",
      github: "https://github.com/starz-woo",
    },
  },
];

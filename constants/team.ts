import type { TeamMember } from "@/types";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "김형섭 Hyeongseob Kim",
    role: "Founder & Crew Lead",
    bio: "Former construction PM with a decade of large-scale project experience. Now leading WIGTN, focused on AI modeling, product development, and applied research in GPU-accelerated computing.",
    image: "/images/team/hyeongseob_kim.jpg",
    expertise: ["AI/ML", "Product Strategy", "System Architecture", "Operations"],
    links: {
      github: "https://github.com/Hyeongseob91",
      linkedin: "https://linkedin.com/in/harrison-hyeongseob-kim",
    },
  },
  {
    name: "김진모 Jinmo Kim",
    role: "MLOps Engineer & Designer",
    bio: "Manages full MLOps pipelines with Docker, Kubernetes, and CI/CD. Also serves as the team's DBA and leads UI/UX direction.",
    image: "/images/team/jinmo_kim.png",
    imagePosition: "center 30%",
    expertise: ["Docker", "Kubernetes", "CI/CD", "MLOps", "DBA", "UI/UX Design", "Video Processing"],
    links: {
      github: "https://github.com/moriroKim",
      linkedin: "https://www.linkedin.com/in/jinmo-kim-62878533b/",
    },
  },
  {
    name: "김현상 Hyeonsang Kim",
    role: "AI Product Engineer",
    bio: "Mobile-first full-stack engineer covering the entire 3-tier stack with React Native. Focused on software engineering craft rather than model development.",
    image: "/images/team/hyeonsang_kim.jpg",
    expertise: ["React Native", "Expo", "Next.js", "Nest.js", "Node.js", "PostgreSQL", "Full-Stack"],
    links: {
      github: "https://github.com/HyeonsangKim",
      linkedin: "https://www.linkedin.com/in/hyeonsang-kim-5a7a67260/",
    },
  },
  {
    name: "손상우 Sangwoo Son",
    role: "AI Engineer",
    bio: "Builds LLM-powered applications and autonomous agent systems. Focuses on multi-agent orchestration and workflow automation.",
    image: "/images/team/sangwoo_son.jpg",
    imagePosition: "left top",
    expertise: ["AI/ML", "LLM Application", "AI Agent", "Language AI"],
    links: {
      github: "https://github.com/wigtn",
      linkedin: "https://linkedin.com/in/sangwooson",
    },
  },
  {
    name: "조현우 Hyunwoo Cho",
    role: "AI Product Engineer",
    bio: "Web-focused full-stack engineer who builds across the 3-tier architecture. Brings mobile experience with React Native and leverages AI-native tooling for rapid delivery.",
    image: "/images/team/hyunwoo_cho.jpg",
    imagePosition: "center 20%",
    expertise: ["React", "Next.js", "TypeScript", "Node.js", "Full-Stack"],
    links: {
      linkedin:
        "https://www.linkedin.com/in/%ED%98%84%EC%9A%B0-%EC%A1%B0-8a6800393/",
      github: "https://github.com/starz-woo",
    },
  },
];

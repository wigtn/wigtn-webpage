import type { TeamMember } from "@/types";

/**
 * WIGTN crew — five members. Two cross-cutting role dimensions per member:
 *
 *   1. `role`         — WIGTN-internal role (e.g. "Founder & Crew Lead").
 *                       Rendered as the violet uppercase label on the card.
 *   2. `currentRole`  — Day-job role at the member's parent company. Rendered
 *                       as a neutral-gray normal-case line below the violet
 *                       label so the two dimensions are visually distinct.
 *
 * `credential` (the "Ex-…" prior-employer line) is currently set on the
 * founder only — other members have no prior employers worth surfacing.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "김형섭 Harrison Kim",
    role: "Founder & Crew Lead",
    bio: "Former construction PM with a decade of large-scale project experience. Now leading WIGTN, focused on AI modeling, product development, and applied research in GPU-accelerated computing.",
    image: "/images/team/hyeongseob_kim.jpg",
    featured: true,
    currentRole:
      "AI Research Engineer & Engineering Part Lead at BrainCrew (LangChain Global Partner Co.)",
    credential: "Ex-Hyundai E&C, Soundmind",
    expertise: [],
    links: {
      github: "https://github.com/Hyeongseob91",
      linkedin: "https://linkedin.com/in/harrison-hyeongseob-kim",
    },
  },
  {
    name: "손상우 Sangwoo Son",
    role: "AI Engineer",
    bio: "Builds LLM-powered applications and autonomous agent systems. Focuses on multi-agent orchestration and workflow automation.",
    image: "/images/team/sangwoo_son.jpg",
    imagePosition: "left top",
    currentRole: "AI Engineer & AX Team Lead at Soundmind",
    expertise: [],
    links: {
      github: "https://github.com/wigtn",
      linkedin: "https://linkedin.com/in/sangwooson",
    },
  },
  {
    name: "김진모 Eric Kim",
    role: "MLOps Engineer",
    bio: "Manages full MLOps pipelines with Docker, Kubernetes, and CI/CD. Also serves as the team's DBA and leads UI/UX direction.",
    image: "/images/team/jinmo_kim.png",
    imagePosition: "center 30%",
    currentRole: "DevOps Engineer at Soundmind",
    expertise: [],
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
    imagePosition: "center 35%",
    currentRole: "Full-Stack Developer & MX Team Lead at Soundmind",
    expertise: [],
    links: {
      github: "https://github.com/HyeonsangKim",
      linkedin: "https://www.linkedin.com/in/hyeonsang-kim-5a7a67260/",
    },
  },
  {
    name: "조현우 David Cho",
    role: "AI Product Engineer",
    bio: "Web-focused full-stack engineer who builds across the 3-tier architecture. Brings mobile experience with React Native and leverages AI-native tooling for rapid delivery.",
    image: "/images/team/hyunwoo_cho.jpg",
    imagePosition: "center 20%",
    currentRole: "Full-Stack Developer at Soundmind",
    expertise: [],
    links: {
      linkedin:
        "https://www.linkedin.com/in/%ED%98%84%EC%9A%B0-%EC%A1%B0-8a6800393/",
      github: "https://github.com/starz-woo",
    },
  },
];

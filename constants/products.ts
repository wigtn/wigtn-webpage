import type { LucideIcon } from "lucide-react";
import {
  Phone,
  Globe,
  Mic,
  Shield,
  BookOpen,
  Languages,
  Brain,
  FileText,
} from "lucide-react";

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  descriptionKey: string;
}

export interface ProductStat {
  value: string;
  labelKey: string;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface CommunicationMode {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
}

export interface ProductDetail {
  id: string;
  name: string;
  gradient: string;
  liveUrl?: string;
  stats: ProductStat[];
  features: ProductFeature[];
  techStack: TechCategory[];
  modes?: CommunicationMode[];
}

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  wigvo: {
    id: "wigvo",
    name: "WIGVO",
    gradient: "from-violet to-purple-400",
    liveUrl: "https://wigvo.run",
    stats: [
      { value: "557ms", labelKey: "avgLatency" },
      { value: "169", labelKey: "callsMade" },
      { value: "$0.27", labelKey: "perMinute" },
      { value: "0", labelKey: "echoLoops" },
    ],
    features: [
      {
        icon: Phone,
        title: "Dual Session Architecture",
        descriptionKey: "wigvo_feature_dual",
      },
      {
        icon: Globe,
        title: "Any Phone, Any Language",
        descriptionKey: "wigvo_feature_phone",
      },
      {
        icon: Mic,
        title: "Echo Cancellation",
        descriptionKey: "wigvo_feature_echo",
      },
      {
        icon: Shield,
        title: "No App Required",
        descriptionKey: "wigvo_feature_noapp",
      },
    ],
    techStack: [
      {
        category: "AI / Voice",
        items: ["OpenAI Realtime API", "Dual WebSocket Sessions", "VAD"],
      },
      {
        category: "Telephony",
        items: ["Twilio PSTN", "WebRTC", "SIP Trunking"],
      },
      {
        category: "Backend",
        items: ["Node.js", "WebSocket Server", "Redis"],
      },
      {
        category: "Infrastructure",
        items: ["AWS", "Docker", "CI/CD"],
      },
    ],
    modes: [
      {
        id: "v2v",
        titleKey: "mode_v2v_title",
        descriptionKey: "mode_v2v_desc",
        icon: Mic,
      },
      {
        id: "t2v",
        titleKey: "mode_t2v_title",
        descriptionKey: "mode_t2v_desc",
        icon: FileText,
      },
      {
        id: "agent",
        titleKey: "mode_agent_title",
        descriptionKey: "mode_agent_desc",
        icon: Brain,
      },
    ],
  },
  wigvu: {
    id: "wigvu",
    name: "WIGVU",
    gradient: "from-indigo-500 to-violet",
    liveUrl: undefined,
    stats: [
      { value: "7+", labelKey: "languagesSupported" },
      { value: "2", labelKey: "contentModes" },
      { value: "AI", labelKey: "powered" },
    ],
    features: [
      {
        icon: BookOpen,
        title: "Content-Based Learning",
        descriptionKey: "wigvu_feature_content",
      },
      {
        icon: Languages,
        title: "Sentence-Level Translation",
        descriptionKey: "wigvu_feature_translation",
      },
      {
        icon: Brain,
        title: "AI Analysis",
        descriptionKey: "wigvu_feature_ai",
      },
      {
        icon: FileText,
        title: "Expression Extraction",
        descriptionKey: "wigvu_feature_expression",
      },
    ],
    techStack: [
      {
        category: "AI / NLP",
        items: ["GPT-4o-mini", "WhisperX STT", "Custom Prompts"],
      },
      {
        category: "Frontend",
        items: ["React", "Next.js", "Chrome Extension"],
      },
      {
        category: "Backend",
        items: ["Python", "FastAPI", "PostgreSQL"],
      },
      {
        category: "Infrastructure",
        items: ["GCP", "Docker", "CI/CD"],
      },
    ],
  },
};

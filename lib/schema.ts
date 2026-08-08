import { DESCRIPTION, ORG_NAME, SITE_URL } from "./brand";

/* Name and description come from ./brand so the structured data cannot say one
 * thing while the page says another. It used to: "WIGTN Crew" here against
 * "WIGTN" in the title, and "AI-native open-source research crew" here against
 * "An independent AI research team" in the meta description, on every page.
 *
 * The "Korea-based" the old description carried is not lost, it moved into
 * `address`, where a crawler can actually read it as a country. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": ORG_NAME,
  "url": SITE_URL,
  "logo": `${SITE_URL}/wigtn_logo.png`,
  "description": DESCRIPTION,
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "KR",
  },
  "sameAs": [
    "https://github.com/wigtn",
    "https://huggingface.co/Wigtn",
    "https://www.npmjs.com/org/wigtn",
  ],
  "knowsAbout": [
    "Document Intelligence",
    "Voice AI",
    "RAG Systems",
    "Korean NLP",
    "Vision Language Models",
    "LoRA Fine-tuning",
  ],
};

/**
 * MOCKUP DATA — research-led renewal
 * ------------------------------------------------------------------
 * Single source of truth for the mockup. Pure, serializable data (no
 * React/icons) so it can be imported by both the static-export route
 * (generateStaticParams) and the client components. Icons are referenced
 * by string key and mapped to components in chrome.tsx.
 *
 * This stands in for the future MDX-backed content model: each Article
 * here ≈ one /content/*.mdx file (frontmatter + body blocks).
 */

export const HOME = "/mockups/research-led/";
export const articleHref = (slug: string) => `${HOME}${slug}/`;

export const NAV = [
  { label: "Research", id: "research" },
  { label: "Events", id: "events" },
  { label: "Community", id: "community" },
  { label: "Insights", id: "insights" },
  { label: "Partners", id: "partners" },
  { label: "Team", id: "team" },
];

export const STATS = [
  { value: "40+", label: "Reports published" },
  { value: "12", label: "Enterprise engagements" },
  { value: "7", label: "Peer-reviewed papers" },
  { value: "2.4k", label: "Community members" },
];

export const PARTNERS = ["MEGACODE", "PARTNER 02", "PARTNER 03", "PARTNER 04", "PARTNER 05"];
export const POWERED_BY = ["ANTHROPIC", "OPENAI", "GOOGLE", "MICROSOFT", "AWS", "VERCEL"];
export const TEAM_BADGES = ["AI Research", "Enterprise Consulting", "Open Source", "Deep-tech"];

export type Kind = "report" | "event" | "community" | "insight";

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "quote"; text: string }
  | { t: "list"; items: string[] };

export type Article = {
  slug: string;
  kind: Kind;
  tag: string;
  title: string;
  summary: string;
  date: string;
  readTime?: string;
  author?: string;
  place?: string; // events
  icon?: "trophy" | "pin"; // events
  featured?: boolean;
  video?: boolean; // insight with a YouTube bumper
  body: Block[];
};

const lorem = (s: string): Block => ({ t: "p", text: s });

export const ARTICLES: Article[] = [
  /* ── Research ── */
  {
    slug: "on-device-korean-ocr",
    kind: "report",
    tag: "TECHNICAL REPORT",
    title: "On-device Korean OCR: accuracy/latency trade-offs in lightweight VLMs",
    summary:
      "Quantization strategies and benchmarks for Korean document recognition at the edge — reaching 92% of cloud accuracy at 17ms latency, and a candid look at where it breaks down.",
    date: "2026.05.28",
    readTime: "12 min",
    author: "WIGTN Research",
    featured: true,
    body: [
      { t: "h", text: "Why edge OCR, and why Korean" },
      lorem(
        "Cloud OCR is accurate but it is not always an option: privacy-sensitive documents, intermittent connectivity, and per-call cost all push recognition back onto the device. Korean adds its own difficulty — a large syllable inventory, dense layouts, and mixed Hangul/Latin/number scripts that trip up models tuned on English receipts.",
      ),
      lorem(
        "We set out to answer a narrow, practical question: how close can a 4B-parameter vision-language model running fully on-device get to a frontier cloud pipeline, and what does it cost in latency?",
      ),
      { t: "h", text: "Setup" },
      lorem(
        "We evaluated three quantization schemes (INT8, INT4 weight-only, and a mixed 4/8-bit layout) against an FP16 baseline on a 5,000-page internal corpus of Korean business documents — invoices, contracts, and scanned forms.",
      ),
      { t: "list", items: [
        "Model: 4B VLM, vision encoder frozen, decoder fine-tuned on 1.2M Korean lines",
        "Hardware: Apple M-series NPU and a mid-range Android SoC",
        "Metric: normalized edit distance (CER) and end-to-end latency per page",
      ] },
      { t: "quote", text: "The headline: INT4 weight-only reaches 92% of cloud accuracy at 17ms/page — but the last 8% is where the real engineering lives." },
      { t: "h", text: "Where it breaks down" },
      lorem(
        "Failures clustered in three places: handwritten annotations, low-contrast stamps overlapping text, and tables where cell boundaries are implied rather than ruled. INT4 degraded fastest on stamps; the mixed-precision layout recovered most of that gap at a 1.4× latency cost.",
      ),
      lorem(
        "Our recommendation for production: ship INT4 as the default path and fall back to mixed-precision only when a lightweight confidence head flags a page. That keeps the median fast while protecting the tail.",
      ),
    ],
  },
  {
    slug: "token-economics-agent-orchestration",
    kind: "report",
    tag: "RESEARCH NOTE",
    title: "The token economics of agent orchestration",
    summary:
      "We decompose the cost structure of multi-agent pipelines and show where context caching cut inference spend 3.4×.",
    date: "2026.05.11",
    readTime: "8 min",
    author: "WIGTN Research",
    body: [
      { t: "h", text: "The hidden bill" },
      lorem(
        "Multi-agent systems feel cheap to prototype and expensive to run. The cost rarely shows up in the obvious place — the final answer — and instead hides in the orchestration: re-sent context, redundant tool descriptions, and verifier passes that re-read everything.",
      ),
      { t: "list", items: [
        "Re-sent system + tool context across hops: ~46% of total tokens",
        "Verifier / critic passes: ~28%",
        "Actual task reasoning: ~26%",
      ] },
      { t: "quote", text: "Most agent bills are not reasoning bills. They are repetition bills." },
      { t: "h", text: "What helped" },
      lorem(
        "Prompt-prefix caching on the shared context collapsed the first bucket almost entirely, taking total spend down 3.4× on our reference pipeline without touching task quality. The lesson generalizes: cache the parts that do not change, and only pay for the delta.",
      ),
    ],
  },
  {
    slug: "enterprise-rag-failure-modes",
    kind: "report",
    tag: "WHITEPAPER",
    title: "A taxonomy of failure modes in enterprise RAG",
    summary:
      "Seven categories of RAG failure collected across 12 enterprise engagements, each with a concrete mitigation.",
    date: "2026.04.22",
    readTime: "15 min",
    author: "WIGTN Consulting",
    body: [
      { t: "h", text: "From anecdotes to a taxonomy" },
      lorem(
        "Across a year of enterprise engagements we kept seeing the same RAG failures described in different words. This whitepaper names them, so teams can diagnose instead of guess.",
      ),
      { t: "list", items: [
        "Retrieval miss — the answer was never fetched",
        "Context dilution — too many chunks drowned the right one",
        "Stale source — the index lagged the system of record",
        "Permission leak — retrieval ignored row-level access",
        "Format mismatch — tables flattened into unusable text",
        "Confident fabrication — the model filled a retrieval gap",
        "Evaluation blindness — no metric caught any of the above",
      ] },
      { t: "quote", text: "RAG rarely fails loudly. It fails plausibly — which is worse." },
      lorem(
        "For each category we ship a minimal reproduction and a mitigation that does not require re-architecting the stack. The permission-leak section, in particular, has saved two clients from shipping a compliance incident.",
      ),
    ],
  },
  {
    slug: "speculative-decoding-cost-benefit",
    kind: "report",
    tag: "RESEARCH NOTE",
    title: "Speculative decoding: the real-world cost/benefit",
    summary:
      "When the draft model actually pays for itself — and the workloads where it quietly costs you more.",
    date: "2026.04.03",
    readTime: "6 min",
    author: "WIGTN Research",
    body: [
      { t: "h", text: "The promise vs the invoice" },
      lorem(
        "Speculative decoding speeds up generation by letting a small draft model propose tokens a larger model verifies. The speedup is real — but it is workload-dependent, and on some traffic shapes the draft model is pure overhead.",
      ),
      lorem(
        "We measured acceptance rates across chat, code, and long-form summarization. Code accepted drafts most often (predictable token distributions); creative long-form accepted least, occasionally making the speculative path slower than plain decoding.",
      ),
      { t: "quote", text: "Speculative decoding is a bet on predictability. Price the bet per workload, not per model." },
    ],
  },

  /* ── Events ── */
  {
    slug: "neurips-2026-best-paper",
    kind: "event",
    tag: "AWARD",
    icon: "trophy",
    title: "Best Paper at the NeurIPS 2026 workshop",
    summary:
      "Our research team's paper was selected as best paper in the efficient-inference track.",
    date: "2026.05.30",
    place: "San Diego, USA",
    body: [
      lorem(
        "At the NeurIPS 2026 Efficient Inference workshop, our paper on mixed-precision on-device decoding received the Best Paper award out of 140 submissions.",
      ),
      { t: "h", text: "What the paper argues" },
      lorem(
        "The core contribution is a confidence-gated precision switch: run cheap INT4 by default, and escalate to mixed precision only on tokens the model is unsure about. The result is frontier-class quality at edge-class latency.",
      ),
      { t: "quote", text: "“A rare paper that is both rigorous and immediately shippable.” — workshop committee" },
      lorem(
        "Slides, the camera-ready PDF, and our reference implementation are linked from the WIGTN research index. We will run a community deep-dive on it at the next Tech Meetup.",
      ),
    ],
  },
  {
    slug: "icml-2026-oral",
    kind: "event",
    tag: "CONFERENCE",
    icon: "pin",
    title: "Oral accepted at ICML 2026",
    summary:
      "Our work on on-device multimodal reasoning was accepted for an oral session.",
    date: "2026.04.18",
    place: "Seoul, KOR",
    body: [
      lorem(
        "ICML 2026 accepted our submission on on-device multimodal reasoning for an oral presentation — roughly the top 2% of submissions.",
      ),
      { t: "h", text: "The talk" },
      lorem(
        "We show that small multimodal models, given the right routing between vision and language experts, can match much larger models on document and chart understanding while staying inside a phone's memory budget.",
      ),
      lorem(
        "If you are attending in Seoul, come find the WIGTN crew — we will be running an informal office-hours table after the session.",
      ),
    ],
  },

  /* ── Community ── */
  {
    slug: "tech-meetup-07-inference-optimization",
    kind: "community",
    tag: "MEETUP",
    title: "WIGTN Tech Meetup #07 — Inference optimization in practice",
    summary:
      "Quantization, KV cache, and speculative decoding from a practitioner's view. 80+ attendees.",
    date: "2026.06.05",
    place: "Seoul, KOR",
    body: [
      lorem(
        "Our seventh Tech Meetup packed the room with 80+ engineers for a hands-on evening on making inference fast and cheap without a research lab's budget.",
      ),
      { t: "h", text: "Three talks" },
      { t: "list", items: [
        "Quantization that survives production — what to measure before you ship",
        "KV cache management for long-context chat",
        "Speculative decoding: when the draft model earns its keep",
      ] },
      { t: "quote", text: "The best question of the night: “How do you know your quantized model degraded before your users tell you?”" },
      lorem(
        "Slides and the full recording are linked below. The next meetup will be a deep-dive on our NeurIPS best-paper method — RSVP opens soon.",
      ),
    ],
  },
  {
    slug: "open-seminar-evaluating-agents",
    kind: "community",
    tag: "SEMINAR",
    title: "Open Seminar: How should we evaluate agents?",
    summary:
      "Slides and recording from our public talk on designing evaluation metrics for production agents.",
    date: "2026.05.20",
    place: "Online",
    body: [
      { t: "h", text: "Why evaluation is the hard part" },
      lorem(
        "Everyone can build an agent in an afternoon. Knowing whether it got better or worse between two versions is the part that separates a demo from a product. This seminar laid out a practical evaluation playbook.",
      ),
      { t: "list", items: [
        "Task-level outcome metrics over vibes",
        "Trajectory checks: did it take a sane path, not just a lucky answer?",
        "Cost and latency as first-class metrics, not afterthoughts",
      ] },
      { t: "quote", text: "If you cannot diff two agent versions on a number, you are not iterating — you are gambling." },
    ],
  },

  /* ── Insights ── */
  {
    slug: "why-we-bet-on-small-models",
    kind: "insight",
    tag: "INSIGHT",
    title: "Why we bet on small models",
    summary: "Where lightweight models win on cost, latency, and privacy.",
    date: "2026.06.01",
    readTime: "5 min",
    author: "Harrison Kim",
    video: true,
    body: [
      lorem(
        "The industry narrative says bigger is better. Our consulting experience says: for most enterprise problems, the right-sized model that runs where the data lives beats the biggest model behind an API.",
      ),
      { t: "h", text: "Three axes where small wins" },
      { t: "list", items: [
        "Cost — predictable, no per-token surprises at scale",
        "Latency — no network round-trip; the model is on the device",
        "Privacy — sensitive data never leaves the building",
      ] },
      { t: "quote", text: "The question is rarely “is this model smart enough?” It is “is this the smallest model that is smart enough?”" },
      lorem(
        "Watch the 10-minute explainer for the full argument, including the benchmarks behind our on-device OCR work.",
      ),
    ],
  },
  {
    slug: "three-illusions-llm-adoption",
    kind: "insight",
    tag: "INSIGHT",
    title: "Three illusions about LLM adoption, from the consulting floor",
    summary: "The expectations enterprises most often get wrong — and how we correct them.",
    date: "2026.05.14",
    readTime: "7 min",
    author: "WIGTN Consulting",
    body: [
      { t: "h", text: "Illusion 1: the model is the product" },
      lorem(
        "The model is the smallest part. Retrieval, evaluation, guardrails, and the boring plumbing around it are where projects succeed or stall.",
      ),
      { t: "h", text: "Illusion 2: more context is always better" },
      lorem(
        "Stuffing the prompt with everything dilutes the signal and inflates the bill. Precision beats volume.",
      ),
      { t: "h", text: "Illusion 3: a demo is a deployment" },
      lorem(
        "A demo proves the happy path exists. A deployment survives the unhappy ones. The distance between them is most of the work — and most of the value.",
      ),
      { t: "quote", text: "Our job is rarely to make the demo better. It is to make the other 90% boring and reliable." },
    ],
  },
];

/* Selectors */
export const byKind = (k: Kind) => ARTICLES.filter((a) => a.kind === k);
export const FEATURED = ARTICLES.find((a) => a.featured)!;
export const REPORTS = byKind("report").filter((a) => !a.featured);
export const EVENTS = byKind("event");
export const COMMUNITY = byKind("community");
export const INSIGHTS = byKind("insight");
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

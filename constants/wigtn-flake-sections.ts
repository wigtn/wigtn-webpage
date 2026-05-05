import type { ResearchSection } from "./projects";

/**
 * WIGTN FLAKE — Snowflake AI & Data Hackathon Korea 2026, Tech Track 2nd Place.
 *
 * Purpose-driven neighborhood-intelligence platform built on Snowflake Cortex.
 * Source of truth for this content: the wigtn-for-snowflake repository
 * (README + PRD_pivot_purpose_driven.md). Mirrors the WIGENT section shape
 * so the project detail page renders consistently.
 */
export const WIGTN_FLAKE_SECTIONS: ResearchSection[] = [
  {
    id: "overview",
    title: "Overview",
    blocks: [
      {
        type: "prose",
        text: "WIGTN Flake is a purpose-driven neighborhood-intelligence platform. Pick what you actually want to do — open a cafe, target rental-appliance ads, choose a billboard site, invest in real estate, or detect anomalies in your existing trade area — and a five-agent Cortex Analyst team cross-queries four real-world datasets to answer with a Top 3 ranking, anomaly badges, a 6-month forecast, and a concrete action checklist.",
      },
      {
        type: "prose",
        text: "Built for Snowflake AI &amp; Data Hackathon Korea 2026 (Tech Track), the project deliberately weaves <strong>11 Snowflake Cortex capabilities</strong> into a coherent decision flow rather than a checklist demo. The user never sees raw SQL. They see five experts argue about which Seoul district fits their goal — backed live by Cortex Analyst, ANOMALY_DETECTION, and FORECAST queries running underneath the chat.",
      },
      {
        type: "figure",
        layout: "single",
        images: [
          {
            src: "/images/projects/wigtn-flake-title.jpg",
            alt: "Snowflake AI & Data Hackathon 2026 — Tech Track 2nd Place, WIGTN Flake announcement on stage.",
            caption: "Tech Track 2nd Place announcement — WIGTN Flake : Snowflake Cortex 기반 실시간 데이터 검증을 통한 '목적 중심 에이전트 토론' 플랫폼.",
          },
        ],
      },
      {
        type: "highlights",
        title: "Key Results",
        items: [
          "<strong>Snowflake AI &amp; Data Hackathon Korea 2026 — Tech Track 2nd Place</strong>",
          "<strong>11 Snowflake Cortex functions</strong> woven into a single user flow (Agent, Analyst × 4, LLM, FORECAST, ANOMALY_DETECTION, AI_SENTIMENT, AI_CLASSIFY, data_to_chart, Dynamic Tables × 2, Python UDF × 2, Semantic Model YAML × 4)",
          "<strong>5 AI experts × 4 datasets</strong> — purpose-tuned personas debate over SPH, RichGo, NextTrade, and AJD telemetry via Cortex Analyst text-to-SQL",
          "<strong>3-tier fallback architecture</strong> — Cortex Agent → Cortex Analyst direct → GPT-4o Function Calling — keeps the demo green even when trial limits hit",
          "<strong>Anomaly detection promoted to lead role</strong> — ranking results auto-inject \"watch this district\" badges, the demo's climax moment",
        ],
      },
    ],
  },
  {
    id: "the-problem",
    title: "The Problem We Solved",
    blocks: [
      {
        type: "prose",
        text: "Every public-data dashboard in Korea answers \"how many people walk through Yeoksam-dong?\" Almost none answers \"so where should I open my cafe?\" The gap between data and decision is the actual problem.",
      },
      {
        type: "list",
        items: [
          "<strong>Generic dashboards aren't goal-aware.</strong> Foot traffic is good for advertisers, bad for cafes (wrong dwell time). Income data is good for rental-appliance targeting, bad for billboards. The same query needs a <em>different</em> interpretation per goal.",
          "<strong>Single-perspective AI is too agreeable.</strong> Asking GPT \"where should I open a cafe?\" gets you a confident-sounding paragraph with no data behind it. There's no debate, no contradicting expert, no live SQL.",
          "<strong>Multi-dataset analysis is glued together by humans.</strong> Real estate × foot traffic × card sales × telecom contracts each live in different tools. Cross-querying them used to mean spreadsheets and a week of manual work.",
        ],
      },
      {
        type: "prose",
        text: "We wanted the user to <strong>state a purpose, not a query</strong>, and have a team of Cortex-powered experts return a defensible recommendation — with the data trail visible the entire time.",
      },
    ],
  },
  {
    id: "how-it-works",
    title: "How It Works",
    blocks: [
      {
        type: "prose",
        text: "Five stages, all visible to the user as they happen:",
      },
      {
        type: "list",
        items: [
          "<strong>Step 1 — Purpose selection.</strong> Six cards: Cafe/restaurant location · Rental-appliance target zones · Billboard placement · Real-estate investment · Trade-area anomaly detection · or free-form input.",
          "<strong>Step 2 — District context.</strong> AI suggests candidates, or the user names districts directly. Goal + districts together become the analysis brief.",
          "<strong>Step 3 — Expert orchestration.</strong> A GPT-4o orchestrator summons five purpose-tuned experts: PM facilitator, data analyst (Cortex Analyst), forecast analyst (FORECAST + ANOMALY_DETECTION), insight analyst (DNA + AI_CLASSIFY), and sentiment/news analyst (AI_SENTIMENT + Tavily).",
          "<strong>Step 4 — Cortex execution.</strong> Cortex Analyst runs text_to_sql over four Semantic Models. ANOMALY_DETECTION and FORECAST run in parallel via <code>Promise.all</code>, results converge in the warehouse, and the data analyst speaks the merged finding.",
          "<strong>Step 5 — Decision report.</strong> Top 3 ranking cards · anomaly signal badges · 6-month FORECAST charts · purpose-specific action checklist (\"secure 500m radius around the Banpo subway exit; peak 12-14h; lead with Instagram\").",
        ],
      },
    ],
  },
  {
    id: "five-personas",
    title: "Five Real Use Cases",
    subtitle: "Purpose-first UX, end to end",
    blocks: [
      {
        type: "prose",
        text: "Each preset purpose ships with a worked example so the user knows what \"good\" looks like before they type anything.",
      },
      {
        type: "table",
        caption: "Five preset purposes — who, what data, what decision",
        headers: ["Purpose", "User", "Core data", "Decision"],
        rows: [
          { cells: ["🍰 Cafe / restaurant location", "Small-business owner", "Foot traffic × coffee sales × asset income", "Where to open"] },
          { cells: ["📦 Rental-appliance target zones", "B2B marketer (LG, Coway, Woongjin)", "Telecom new-line + asset income + move-in trends", "Where to spend ad budget"] },
          { cells: ["📣 Billboard / offline placement", "Franchise marketer", "Foot traffic by hour × work-vs-home × card sales", "Ad ROI optimization"] },
          { cells: ["💰 Real-estate investment", "Individual / corporate investor", "RichGo prices + FORECAST + population growth", "When and where to buy"] },
          { cells: ["🚨 Trade-area anomaly", "Existing operator", "ANOMALY_DETECTION (sales · foot traffic · telecom)", "When to pivot or respond"], highlight: true },
        ],
      },
      {
        type: "prose",
        text: "Beyond the five presets, free-form purpose input is supported. The orchestrator infers an appropriate expert lineup and Semantic Model selection from the natural-language goal.",
      },
    ],
  },
  {
    id: "snowflake-features",
    title: "Snowflake Features Used",
    subtitle: "11 capabilities, woven not checklisted",
    blocks: [
      {
        type: "prose",
        text: "Each Snowflake feature earns its place by solving a problem in the flow — not by being on a list. Listed in order of how they appear during a single session.",
      },
      {
        type: "figure",
        layout: "single",
        images: [
          {
            src: "/images/projects/wigtn-flake-datasets.jpg",
            alt: "Dataset assignment chart from the live presentation — four hackathon datasets routed to Snowflake ML.FORECAST, Semantic Model, and AI_SENTIMENT.",
            caption: "Four datasets, split by shape: time-series (RichGo + SPH) → ML.FORECAST · investment scenarios (NextTrade) → Semantic Model · sentiment (AJD) → AI_SENTIMENT.",
          },
        ],
      },
      {
        type: "table",
        headers: ["#", "Feature", "Role"],
        rows: [
          { cells: ["1", "Cortex Agent", "Goal-aware cross-query orchestration over four Semantic Models. Falls back to direct Cortex Analyst calls under trial limits."] },
          { cells: ["2", "Cortex Analyst × 4", "Natural-language → SQL over SPH / RichGo / NextTrade / AJD Semantic Models."] },
          { cells: ["3", "Cortex LLM (claude-4-sonnet)", "Final report markdown generation — streaming, long-Korean-context strength. Garbage-token detection auto-fails over to GPT-4o."] },
          { cells: ["4", "FORECAST", "6-month projections on price / card sales / foot traffic for the Top 3 ranked districts."] },
          { cells: ["5", "ANOMALY_DETECTION ⭐", "Promoted to lead role — auto-injects anomaly badges into the ranking. The demo climax."], highlight: true },
          { cells: ["6", "AI_SENTIMENT", "Local call-center / news sentiment fed into ranking weights as a risk factor."] },
          { cells: ["7", "AI_CLASSIFY", "Classifies ranking results into growing / stable / declining types."] },
          { cells: ["8", "data_to_chart", "Auto-generates the Top 3 comparison chart with no manual chart spec."] },
          { cells: ["9", "Dynamic Tables × 2", "<code>DT_DISTRICT_HEALTH</code> and <code>DT_DISTRICT_DNA</code> — refreshed health and similarity-matrix tables, extensible per purpose."] },
          { cells: ["10", "Python UDF × 2", "Decoupling index, district-DNA similarity, purpose-fit score — all callable from SQL."] },
          { cells: ["11", "Semantic Model YAML × 4", "Per-dataset semantic definitions — the contract that makes Cortex Analyst answers reliable."] },
        ],
      },
    ],
  },
  {
    id: "architecture",
    title: "System Architecture",
    blocks: [
      {
        type: "prose",
        text: "Three layers, with a deliberate three-tier fallback so the demo stays green under any Snowflake trial constraint.",
      },
      {
        type: "figure",
        layout: "single",
        images: [
          {
            src: "/images/projects/wigtn-flake-architecture.jpg",
            alt: "WIGTN Flake 3-Layer Hybrid AI Architecture — Brain Layer (GPT-4o orchestrator) feeds Data Layer (Snowflake Cortex × 11 features over four marketplace datasets), which feeds Render Layer (Cortex LLM markdown) for the report output.",
            caption: "Brain (GPT-4o orchestrator) → Data (Snowflake Cortex 11 features over SPH / RichGo / NextTrade / AJD) → Render (Cortex LLM markdown). Anomaly detection is the demo climax; GPT-4o is the safety-net fallback.",
          },
        ],
      },
      {
        type: "highlights",
        title: "Architecture Layers",
        items: [
          "<strong>UI layer.</strong> Next.js 16 App Router with PurposeSelector → PurposeChatInput → live SSE chat → decision report. Slack-style chat with typing indicators, agent join/leave events, and Vega-Lite charts inline.",
          "<strong>Orchestrator.</strong> Purpose context injection → expert summoning (purpose-tuned personas) → SSE event yield. Handles parallel ML calls (FORECAST + ANOMALY_DETECTION via <code>Promise.all</code>) and merges results in the warehouse.",
          "<strong>Snowflake infrastructure.</strong> Four Semantic Models, two Dynamic Tables, two Python UDFs, three pre-trained FORECAST models, AI SQL functions. Cortex Agent on top.",
        ],
      },
      {
        type: "highlights",
        title: "3-Tier Fallback",
        items: [
          "<strong>Tier 1 — Cortex Agent.</strong> Cortex Analyst × 4 + data_to_chart routed by Cortex Agent. The happy path.",
          "<strong>Tier 2 — Cortex Analyst direct + GPT-4o Function Calling.</strong> Four GPT tools — <code>execute_snowflake_sql</code>, <code>web_search</code> (Tavily), <code>real_estate_transaction</code> (MOLIT), <code>statistical_analysis</code> — when Cortex Agent hits trial limits.",
          "<strong>Tier 3 — GPT-4o pure inference.</strong> Final safety net so the demo never freezes.",
        ],
      },
    ],
  },
  {
    id: "hybrid-model-strategy",
    title: "Hybrid Model Strategy",
    subtitle: "Cortex LLM where it wins, GPT-4o where it wins",
    blocks: [
      {
        type: "prose",
        text: "Single-vendor purity wasn't worth the latency. We picked the best model per layer, with a streaming fallback when Cortex LLM degrades.",
      },
      {
        type: "table",
        headers: ["Layer", "Model", "Why"],
        rows: [
          { cells: ["Data analysis orchestration", "Cortex Agent (claude-4-sonnet)", "text_to_sql + Semantic Model integration native to Cortex"] },
          { cells: ["Report markdown generation", "Cortex LLM (claude-4-sonnet)", "Streaming + long-Korean-context. Bench: 17.3s · 1657 chars · 0 garbage tokens"], highlight: true },
          { cells: ["Debate personas", "GPT-4o", "Multi-agent persona delivery, Function Calling stability, fewer repetition loops"] },
          { cells: ["Safety fallback", "GPT-4o", "<code>hasGarbageTokens()</code> streaming check triggers instant switch when Cortex LLM degrades"] },
        ],
      },
      {
        type: "prose",
        text: "Bench evidence: <code>snowflake-llama-3.3-70b</code> took 38.4s on the same task (≈2× slower) with intermittent token collapse (<code>&lt;|reserved_special_token|&gt;</code>, garbled fragments). <code>scripts/test-cortex-streaming.ts</code> in the repo runs this benchmark on demand.",
      },
    ],
  },
  {
    id: "datasets",
    title: "Datasets — All Four Used",
    blocks: [
      {
        type: "table",
        caption: "Four datasets, all wired to Semantic Models and used live during the demo",
        headers: ["Provider", "Dataset", "Coverage", "Period", "Use"],
        rows: [
          { cells: ["SPH", "SKT foot traffic + Shinhan card sales + KCB asset / income", "Seocho · Yeongdeungpo · Jung-gu", "2021–2025 monthly", "Population / consumption / income"] },
          { cells: ["RichGo", "Apartment AI price index (sale / lease)", "Seocho · Yeongdeungpo · Jung-gu", "2012–2024", "Real-estate time series + FORECAST"] },
          { cells: ["NextTrade", "Stock quote / fill / program-trading", "All listed equities", "Real-time", "Equity-vs-property trend cross-check"] },
          { cells: ["AJD (아정당)", "Telecom contracts + GA4 + call center + rentals", "All Korean districts", "2024–", "Move-in trends + AI_SENTIMENT"] },
        ],
      },
    ],
  },
  {
    id: "tech-stack",
    title: "Tech Stack",
    blocks: [
      {
        type: "table",
        headers: ["Tech", "Version", "Use"],
        rows: [
          { cells: ["Next.js", "16.2", "Frontend + API routes (SSE)"] },
          { cells: ["React", "19.2", "UI (React Compiler enabled)"] },
          { cells: ["TypeScript", "5.9", "Strict-mode types"] },
          { cells: ["Tailwind CSS", "4", "Styling"] },
          { cells: ["Framer Motion", "12", "Animations"] },
          { cells: ["Vega-Lite", "6", "Inline data charts"] },
          { cells: ["snowflake-sdk", "1.15", "Direct Snowflake connection"] },
          { cells: ["OpenAI SDK", "6", "GPT-4o + Cortex LLM (OpenAI-compatible)"] },
        ],
      },
    ],
  },
  {
    id: "principles",
    title: "Engineering Principles",
    blocks: [
      {
        type: "highlights",
        title: "What Drove Every Decision",
        items: [
          "<strong>Purpose-first.</strong> UX and code both start from \"what is this analysis for\". Every component carries a purpose context.",
          "<strong>Hybrid AI.</strong> Cortex (data / SQL / report) + GPT-4o (debate personas) — pick the best model per layer.",
          "<strong>Snowflake = leading role.</strong> 11 Cortex capabilities present throughout the demo, woven not checklisted.",
          "<strong>All four datasets, used live.</strong> SPH, RichGo, NextTrade, AJD — every one wired to a Semantic Model and queried during the demo.",
          "<strong>Demo-first.</strong> The 10-minute video is the first round of judging. Demo climax = the anomaly-detection moment.",
          "<strong>Reuse the WIGENT base.</strong> 90%+ of the orchestrator and chat components carry over from WIGENT (Build with TRAE Seoul winner).",
          "<strong>Honest engineering.</strong> What the slide claims and what the code does must match. Decisions are benchmark-backed.",
        ],
      },
    ],
  },
  {
    id: "numbers",
    title: "WIGTN Flake by the Numbers",
    blocks: [
      {
        type: "table",
        headers: ["Metric", "Value"],
        rows: [
          { cells: ["Hackathon", "Snowflake AI &amp; Data Hackathon Korea 2026"] },
          { cells: ["Track", "Tech Track"] },
          { cells: ["Result", "2nd Place"], highlight: true },
          { cells: ["Snowflake Cortex functions used", "11"] },
          { cells: ["Datasets", "4 (SPH · RichGo · NextTrade · AJD)"] },
          { cells: ["Semantic Models", "4 YAML"] },
          { cells: ["AI experts per session", "5"] },
          { cells: ["Pre-trained FORECAST models", "3"] },
          { cells: ["Python UDFs", "2"] },
          { cells: ["Dynamic Tables", "2"] },
          { cells: ["Fallback tiers", "3"] },
          { cells: ["Code reuse from WIGENT", "≈90%"] },
        ],
      },
    ],
  },
];

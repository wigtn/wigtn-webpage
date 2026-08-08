/**
 * Update: Snowflake AI & Data Hackathon Korea 2026 — hackathon report.
 *
 * Colocated post. Images live next to the text and are imported, so a photo is
 * never referenced by a string path that can rot and every file ships with a
 * content hash.
 *
 * Follows the hackathon template (`updates/_template/hackathon/STRUCTURE.md`):
 * lede → brief and constraints → what we built → the bet → what shipped → the
 * result → what survived. Two deviations from that outline, both deliberate:
 *
 *   1. The code-path audit gets its own section between "the result" and
 *      "what survived". STRUCTURE.md files it under one of those two, but it
 *      is the spine of this post and it does not fit inside either as a
 *      subordinate clause.
 *   2. There is no hour or commit count in "what shipped". We do not have a
 *      clean one for the month, and the template is explicit that an invented
 *      number is worse than a missing one. The post says so out loud rather
 *      than quietly skipping the section.
 *
 * WHERE THE NUMBERS COME FROM
 *
 *   Event facts — March 17 kickoff, April 29 finals, "more than 500"
 *   participants, two tracks with three finalists each, the three judging
 *   criteria, the four Marketplace datasets, and the Tech Track placings —
 *   come from Snowflake's Newswire announcement (no. 1033575), linked in
 *   `links` as "Press".
 *
 *   System facts, the streaming benchmark (17.3s / 1,657 chars / 0 garbage
 *   tokens against snowflake-llama-3.3-70b's 38.4s) and the audit came from
 *   `constants/wigtn-flake-sections.ts`, itself sourced from the
 *   wigtn-for-snowflake repository README and PRD. That file was deleted with
 *   the /projects tree; the WIGTN Flake tech report is the live source now.
 *
 * THE CAPABILITY COUNT IS SEVEN, NOT ELEVEN — DO NOT "CORRECT" IT BACK.
 *
 *   The April presentation claimed eleven Cortex capabilities across four
 *   datasets. A later code-path audit cut that to seven capabilities across
 *   three actively selected datasets: NextTrade was connected but never
 *   actively selected, Cortex Agent was dead code, and TOP_INSIGHTS fell back
 *   to dynamic-table SQL. Seven and three are the audited numbers and they are
 *   what the whole post argues for. The eleven and the four still appear in
 *   two places on purpose: printed on the architecture diagram and on the
 *   dataset slide, both of which are photographs of the deck as presented.
 *   Their captions say so. The deleted `constants/wigtn-flake-sections.ts`
 *   carried the pre-audit "11" and "4" in its by-the-numbers table; if that
 *   table resurfaces anywhere, it is not a source for this post.
 *
 * NAMING
 *
 *   Competing teams are named as teams; their individual members are not,
 *   even though the press release lists some. Judges are referred to by the
 *   rubric they applied rather than by name, because the only quotes we have
 *   are machine translations of a Korean press release and a misattributed
 *   quote is worse than no quote.
 *
 *   There is no teammate credits line. The WIGTN Flake roster is not recorded
 *   anywhere in this repository and the template's rule is to cut rather than
 *   guess. If you know who built it, add the line — that is an addition, not
 *   a correction.
 *
 * IMAGES
 *
 *   All five were prepped from `public/images/`. Four came from
 *   `public/images/projects/`, which were kept while the /projects page read
 *   them, and `winners-on-stage.jpg` from `public/images/news/snowflake.jpeg`,
 *   which nothing else read. /projects is gone and so is the whole legacy
 *   image store, so the files in this folder are the only copies.
 *
 *   Three of the five came from Display P3 originals and are converted to
 *   sRGB before the strip: `final-round-stage`, `tech-track-top3` and
 *   `datasets-slide`. Dropping the profile without converting leaves P3 values
 *   that the browser reads as sRGB, and the stage lighting in these shots is
 *   exactly the saturated content that shows it — the dataset slide measures
 *   52% off at its worst pixel. `three-layer-architecture.jpg` and
 *   `winners-on-stage.jpg` carried no profile at all; there was nothing to
 *   convert, and both reproduce bit-exact under a plain strip.
 *
 *   Five images is more than the hackathon template's "two or three", and
 *   deliberately: they do five different jobs — the winners, the room, the
 *   placing slide, the architecture, and the dataset slide the audit section
 *   argues against. Drop one and a section loses its evidence. If a sixth
 *   stage shot ever gets added, that one is a third crowd shot and the budget
 *   should win.
 *
 *   Two full-width `image` blocks, for two different reasons, both deliberate:
 *   the architecture diagram is 1028px wide natively, so the breakout renders
 *   it at about 1:1 and any gallery crop would cut a layer off it; the dataset
 *   slide is a 16:9 photo like the two in the gallery above it, but it carries
 *   fine print the reader has to be able to follow against the audit section,
 *   and at gallery width that print closes up.
 */

import type { Article, Block } from "../../data";
/* The tech-report URL is built from ../../links, a leaf module, rather than
 * from ../../data: data.ts imports this file, so importing a *value* back from
 * it would close a runtime cycle. The type import above is erased and is
 * safe. */
import { techReportHref } from "../../links";
import datasetsSlide from "./datasets-slide.jpg";
import finalRoundStage from "./final-round-stage.jpg";
import techTrackTop3 from "./tech-track-top3.jpg";
import threeLayerArchitecture from "./three-layer-architecture.jpg";
import winnersOnStage from "./winners-on-stage.jpg";

const p = (text: string): Block => ({ t: "p", text });

/* Exported because MILESTONES in ../../data.ts renders this post's card on the
 * homepage rail and reuses the same file the body does. That is the only
 * consumer; do not add the export to a post without one. */
export const SNOWFLAKE_2026_COVER = winnersOnStage.src;

export const snowflakeKorea2026: Article = {
  slug: "snowflake-korea-2026",
  kind: "event",
  channel: "newsroom",
  newsTopic: "award",
  tag: "2ND PLACE · TECH TRACK",
  icon: "trophy",
  title:
    "Tech Track 2nd at Snowflake Korea 2026: the eleven Cortex features that were really seven",
  summary:
    "Pick a goal, and five agents argue over Snowflake Cortex evidence before ranking Seoul districts. WIGTN Flake placed second in the Tech Track. A later code-path audit cut the eleven capabilities we presented down to seven.",
  date: "2026.04.29",
  place: "Seoul, KOR",
  author: "Snowflake",
  readTime: "9 min",
  image: winnersOnStage.src,
  externalUrl: "https://wigtn.github.io/blog/wigtn-flake/",
  links: [
    { label: "Watch demo", href: "https://www.youtube.com/watch?v=1YzSp3SdzTk" },
    { label: "Press", href: "https://www.newswire.co.kr/newsRead.php?no=1033575" },
    { label: "Tech report", href: techReportHref("wigtn-flake") },
  ],
  body: [
    p(
      "Seoul, April 2026. Snowflake's AI & Data Hackathon Korea opened on March 17, ran for a month with more than 500 people taking part, and finished on April 29 with three finalists on stage in each of its two tracks. WIGTN Flake placed second in the Tech Track.",
    ),
    p(
      "This is the brief we were handed, the thing we built against it, the model decision the demo rested on, and the audit that afterwards took our own headline number from eleven down to seven.",
    ),

    { t: "h", text: "The brief, and what it would not let us do" },
    p(
      "Snowflake supplied the data and left the idea open. Four datasets came through Snowflake Marketplace — NextTrade, RichGo, SPH and AJD — and everything you built had to sit on top of them and on the Snowflake platform. You could bring your own problem. You could not bring your own warehouse.",
    ),
    p(
      "Three judging criteria: how well you used the technology, how complete the service was as a combination of data and AI, and whether it complied with security and data governance. That third one is not where a hackathon usually puts its attention, and it quietly rules out the easiest answer in the room, which is to pull everything out of the warehouse and hand it to an external model.",
    ),
    p(
      "The constraint that shaped the build most, though, was the format. The first cut was not a live demo. It was a ten-minute video. A recording judges what an audience can see happening, not what the system is technically capable of, so every design decision downstream became a decision about legibility: what appears on screen, in what order, and whether a viewer can tell that real SQL just ran.",
    ),

    { t: "h", text: "What we built" },
    p(
      "Every public-data dashboard in Korea can tell you how many people walk through Yeoksam-dong. Almost none of them will tell you where to open your cafe. The gap between a number and a decision is the actual problem, and it is not a data problem.",
    ),
    p(
      "So WIGTN Flake starts from the goal rather than the query. You pick one of six purpose cards — cafe or restaurant location, rental-appliance target zones, billboard placement, real-estate investment, trade-area anomaly detection, or free-form input — and either name the districts you are weighing or let the system suggest them. The goal plus the districts become the brief.",
    ),
    p(
      "From there a GPT-4o orchestrator summons five purpose-tuned experts: a PM who facilitates, a data analyst on Cortex Analyst, a forecast analyst on FORECAST and ANOMALY_DETECTION, an insight analyst on AI_CLASSIFY, and a sentiment analyst on AI_SENTIMENT and Tavily web search. They argue in a Slack-style chat that streams as it happens, and they can disagree, because each is reading a different signal.",
    ),
    p(
      "What lands at the end is a Top 3 ranking with the reason each district that lost was excluded, anomaly badges on the ones behaving strangely, six-month FORECAST charts, and an action checklist written for the purpose you picked. For a cafe that reads like: secure a 500m radius around the Banpo subway exit, peak hours 12 to 14, lead with Instagram.",
    ),
    {
      t: "image",
      src: threeLayerArchitecture.src,
      alt: "The WIGTN Flake three-layer hybrid AI architecture: a green Brain Layer running GPT-4o for persona acting, tool invocation, semantic-model routing and external search; a blue Data Layer running Snowflake Cortex over four marketplace datasets, with ANOMALY_DETECTION marked as the demo climax; and a purple Render Layer running Cortex LLM for markdown streaming, ranking, forecasts and a GPT-4o garbage-detection fallback.",
      caption:
        "The deck's diagram: a GPT-4o brain, a Cortex data layer, a Cortex LLM render layer. The counts printed on it, eleven features over four datasets, are what we presented in April. Two sections down is why they are now seven and three.",
    },

    { t: "h", text: "The bet: two vendors, not one" },
    p(
      "The obvious play at a Snowflake hackathon is to run everything through Snowflake. We did not, and that was the decision that could have gone badly with judges scoring us on technology utilization.",
    ),
    p(
      "Cortex LLM on claude-4-sonnet took the report generation, and it took it on measurement rather than preference: 1,657 characters in 17.3 seconds with zero garbage tokens, against snowflake-llama-3.3-70b at 38.4 seconds on the same task, roughly twice as slow and intermittently collapsing into reserved-token fragments mid-stream. The comparison lives in the repository as scripts/test-cortex-streaming.ts, so it can be re-run instead of believed.",
    ),
    p(
      "GPT-4o took the debate personas, where Function Calling stability and staying out of repetition loops mattered more than streaming throughput. The rejected alternative was the all-Cortex build, and the reason to reject it was never that Cortex is worse. It is that the two layers are being asked for different things, and committing to one vendor across both guarantees that one of them gets a model chosen for somebody else's problem.",
    ),
    p(
      "The bet came with three tiers of insurance. Direct Cortex Analyst calls are the live path. If the warehouse path is unavailable, GPT-4o Function Calling picks up the supported tool calls. If the Cortex LLM stream degrades, a hasGarbageTokens() check switches the report over to GPT-4o mid-generation. When the first round of judging is a recording, a red error screen is not a bug you fix later. It is the submission.",
    ),

    { t: "h", text: "What shipped" },
    {
      t: "list",
      items: [
        "Five purpose-tuned agents per session behind a GPT-4o orchestrator, streamed over SSE into a Slack-style chat with the join, leave and typing events visible.",
        "Cortex Analyst running text-to-SQL over three actively selected Semantic Models: SPH (SKT foot traffic, Shinhan card sales, KCB asset and income across Seocho, Yeongdeungpo and Jung-gu, 2021–2025 monthly), RichGo (apartment sale and lease price index, 2012–2024) and AJD (telecom contracts, call-centre and rental data across all Korean districts, 2024 onward).",
        "Three pre-trained FORECAST models over the structured time series: price per pyeong, foot traffic, card sales. They return a six-month projection on call without retraining.",
        "ANOMALY_DETECTION promoted from a supporting signal to the lead role, injecting \"watch this district\" badges into the ranking. That is the moment the whole demo is arranged around.",
        "A three-tier fallback: live Cortex path, GPT-4o Function Calling for tool calls, GPT-4o for the report when the Cortex stream degrades.",
        "Next.js 16.2, React 19.2 with the compiler on, TypeScript 5.9 strict, Vega-Lite charts rendered inline in the chat rather than in a separate results pane.",
        "Roughly 90% of the orchestrator and the chat components carried over from WIGENT, the debate platform that took the Grand Prize at Build with TRAE Seoul. Almost none of the multi-agent machinery was written during this hackathon.",
      ],
    },
    p(
      "What is not in that list is an hour count or a commit count. The development window ran from the March 17 kickoff to the April 29 finals; we did not instrument our own month, and a number invented after the fact is worth less than the gap.",
    ),

    { t: "h", text: "The result" },
    p(
      "Second in the Tech Track. First went to 너의 모든 순간 for 정정당당, a Cortex RAG multi-agent platform that combines external data to improve field sales strategy and call conversion in real time; third to 우승하고싶은맘이커졌어막공룡만해. On the Business Track, Team Kaos won with 상권, a service that merges trade-area data to forecast which districts will be worth being in six months out. Snowflake announced all six placings at the April 29 final round.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: finalRoundStage.src,
          alt: "The Snowflake AI & Data Hackathon 2026 final round stage in Seoul, with the event banner filling the screen behind five empty chairs and a host at the microphone.",
          caption: "The final round, before the panel filled the chairs.",
          aspect: "16/9",
        },
        {
          src: techTrackTop3.src,
          alt: "The Tech Track Top 3 announcement slide on stage, reading \"WIGTN Flake : Snowflake Cortex 기반 실시간 데이터 검증을 통한 '목적 중심 에이전트 토론' 플랫폼\" under a \"트랙 3\" badge.",
          caption: "Tech Track, Top 3. The full Korean title, which nobody has ever said out loud in one breath.",
          aspect: "16/9",
        },
      ],
    },

    { t: "h", text: "Eleven capabilities, then seven" },
    p(
      "The deck said eleven Cortex capabilities across four datasets. Afterwards, someone read the production code path end to end, and three of those claims did not survive it.",
    ),
    {
      t: "list",
      items: [
        "NextTrade was connected and registered as a Semantic Model, and the audited path never actively selected it. Real-time stock quotes, fills and program-trading data are a fine dataset; they are not what a question about which district to open a cafe in reaches for, and the orchestrator kept routing around it. Connected, not used.",
        "The Cortex Agent layer was dead code. It is in the repository and it does not execute on the live path, which means it cannot be counted as a capability the system uses. The grounded SQL results all came from direct Cortex Analyst calls.",
        "TOP_INSIGHTS fell back to dynamic-table SQL. The insight the user reads is real. The function credited on the slide for producing it was not the thing that produced it.",
      ],
    },
    p(
      "What is left is seven capabilities that actually run: Cortex Analyst, Cortex LLM, FORECAST, ANOMALY_DETECTION, AI_SENTIMENT, AI_CLASSIFY and data_to_chart. And three actively selected datasets: SPH, RichGo, AJD. Seven and three are the numbers on this site, on the project page, and in the tech report, and they should stay seven and three.",
    ),
    {
      t: "quote",
      text: "Connected is not used. A slide that counts the difference is a slide that will not survive someone reading the code.",
    },
    {
      t: "image",
      src: datasetsSlide.src,
      alt: "The dataset slide during the presentation, headed \"해커톤 4개 데이터셋, 형태에 따라 역할을 분리\", with RichGo and SPH routed into Snowflake ML.FORECAST as three pre-trained models on the left, and NextTrade and 아정당 in smaller panels on the right.",
      caption:
        "The dataset slide as presented: four datasets split by shape, with NextTrade routed to a Semantic Model on the right. Three of the four were actively selected in the audited path, and NextTrade was the one that was not.",
    },
    p(
      "None of this changes the placing, and none of it was invented to win anything. It is what happens when a count is taken from an architecture diagram rather than from a stack trace, under a clock, at two in the morning. The useful part is not the correction. It is that the correction was cheap to make because the code was there to be read, and that it was made before anyone else made it for us.",
    ),

    { t: "h", text: "What survived" },
    {
      t: "list",
      items: [
        "The WIGENT base, again. The orchestrator and the Slack-style chat have now gone into two hackathons without a rewrite, which is the entire argument for keeping them.",
        "The three-tier fallback, which is now how we build anything with a live demo attached to it. Not because the warehouse fails often, but because finding out on stage costs more than the code we would save.",
        "Purpose-first routing, as a pattern rather than a feature. The goal, not the query, decides which models get summoned and which data gets selected. It is the part of this build we have reached for since.",
        "The benchmark habit. scripts/test-cortex-streaming.ts is a small comparison script that settled a model choice in an afternoon and is still runnable a quarter later. Every model decision on this project has one behind it.",
        "The Cortex Agent layer did not survive. It came out of the capability count and it should come out of the repository.",
        "NextTrade did not survive either. It was in the build because it was in the brief, not because a purpose needed it, and that is the wrong reason to connect a dataset. We would rather ship three that carry weight.",
        "The eleven-capability slide did not survive, and it took the habit of counting integrations with it. The number that goes on a slide now is the number that survives a read of the code path.",
      ],
    },

    { t: "h", text: "Thanks to" },
    p(
      "Snowflake Korea, for running it and for supplying the data through NextTrade, RichGo, SPH and AJD on Marketplace. A hackathon that hands you the datasets is a hackathon where the teams are actually comparable.",
    ),
    p(
      "The judges, for a rubric that put security and data governance next to technology utilization. That is not where a hackathon usually puts it, and it is a better question than the one we were braced for.",
    ),
    p(
      "And the other five finalists. A month, four shared datasets, six teams, and no two of the systems on that stage looked anything alike. That is the part worth showing up for.",
    ),
    { t: "quote", text: "Seven capabilities that run beats eleven that were counted." },
  ],
};

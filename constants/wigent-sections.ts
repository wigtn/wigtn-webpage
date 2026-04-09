import type { ResearchSection } from "./projects";

export const WIGENT_SECTIONS: ResearchSection[] = [
  {
    id: "overview",
    title: "Overview",
    blocks: [
      {
        type: "prose",
        text: "WIGENT is a multi-agent debate platform built in 3.5 hours during the Build with TRAE Seoul Hackathon (2026-03-28). Three engineers, each using Claude Code for parallel development, took the project from PRD to a working product in 55 minutes — then spent the remaining 2 hours on feature additions and polish.",
      },
      {
        type: "prose",
        text: "The core idea: when you brainstorm alone, your thinking is biased. Team discussions take time. Existing AI tools give you a single response with no clash of perspectives. WIGENT fills that gap — AI agents autonomously debate your idea, challenge each other, and <strong>the chat UI itself transforms into the landing page</strong> they built from the conclusions.",
      },
      {
        type: "highlights",
        title: "Key Results",
        items: [
          "Grand Prize — <strong>Build with TRAE Seoul (ByteDance)</strong>",
          "PRD to working prototype — <strong>55 minutes</strong>",
          "3 engineers, 3.5 hours — <strong>26 commits, 0 merge conflicts</strong>",
          "8+ agent design patterns — <strong>Orchestrator, Spawning, Retirement, Human-in-the-Loop, etc.</strong>",
          "9 design templates — <strong>instant landing page rendering</strong>",
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
        text: "Brainstorming a business idea is broken in three ways:",
      },
      {
        type: "list",
        items: [
          "<strong>Solo thinking is biased.</strong> You fall in love with your own idea and can't see blind spots. There's no one to say \"who would actually pay for this?\"",
          "<strong>Team brainstorming is slow.</strong> Scheduling, facilitating, keeping people on track — it takes hours to reach a conclusion that might still be half-baked.",
          "<strong>AI chat is one-dimensional.</strong> ChatGPT gives you a single, agreeable response. There's no debate, no tension, no convergence from opposing viewpoints.",
        ],
      },
      {
        type: "prose",
        text: "We wanted the <strong>collision and convergence</strong> of a real team debate — but driven by AI agents, in minutes, with a tangible deliverable at the end.",
      },
    ],
  },
  {
    id: "how-it-works",
    title: "How It Works",
    blocks: [
      {
        type: "prose",
        text: "The user drops a topic. WIGENT does the rest:",
      },
      {
        type: "list",
        items: [
          "<strong>Step 1 — Agent Creation.</strong> A PM agent (always present) and a topic-specific expert are auto-generated. The PM is the realist (\"Who would pay for this?\"), the expert is the visionary.",
          "<strong>Step 2 — Free Debate (30 turns).</strong> Agents debate in a Slack-style chat UI. A Designer agent joins at turn 3. At turns 12 and 22, non-fixed agents are retired and replaced with new specialists — the conversation evolves as the topic deepens.",
          "<strong>Step 3 — Convergence.</strong> After turn 25, agents are forced to converge. No new ideas allowed — just conclusions and action items.",
          "<strong>Step 4 — Result Synthesis.</strong> The debate is summarized, then distilled into a structured business idea (title, one-liner, target audience, revenue model, differentiator, market size, next steps).",
          "<strong>Step 5 — Landing Page.</strong> The chat UI transforms into a full landing page generated from the idea. Nine design templates (Glassmorphism, Neobrutalism, Editorial, etc.) ensure instant rendering — no waiting for GPT to generate HTML.",
        ],
      },
      {
        type: "prose",
        text: "If the user doesn't like the result, they can <strong>reject it</strong>. The PM announces the rejection, the team runs 8 more turns of debate, and a new landing page is generated. Human-in-the-Loop, without typing a single word into the debate itself.",
      },
    ],
  },
  {
    id: "architecture",
    title: "System Architecture",
    blocks: [
      {
        type: "prose",
        text: "WIGENT is a Next.js 16 full-stack application with three cleanly separated layers:",
      },
      {
        type: "highlights",
        title: "Architecture Layers",
        items: [
          "<strong>Orchestrator (AsyncGenerator).</strong> The debate engine yields SSE events as it progresses — agent creation, speech chunks, retirements, spawns, final results. It controls the full lifecycle: 30 turns of debate, summarization, result synthesis, and landing page generation.",
          "<strong>API Route (SSE Stream).</strong> A thin layer that consumes the orchestrator's AsyncGenerator via for-await-of and forwards each event as Server-Sent Events to the client. Two endpoints: /api/debate (new debate) and /api/debate/continue (rejection follow-up).",
          "<strong>Frontend (useReducer State Machine).</strong> A React hook (useDebate) parses the SSE stream and dispatches 13 event types into a useReducer state machine. The UI transitions through idle → creating → debating → retiring → spawning → landing states.",
        ],
      },
      {
        type: "prose",
        text: "This separation means the orchestrator knows nothing about HTTP, the API route knows nothing about debate logic, and the frontend knows nothing about GPT-4o. Each layer communicates through typed SSE events — 13 event types, all defined in a shared <code>types.ts</code>.",
      },
    ],
  },
  {
    id: "parallel-development",
    title: "Contract-First Parallel Development",
    blocks: [
      {
        type: "prose",
        text: "Three engineers needed to work simultaneously on a codebase that didn't exist yet. The solution: <strong>define the contract before writing any implementation</strong>.",
      },
      {
        type: "prose",
        text: "At 13:43 (minute 43 of the hackathon), a 281-line <code>types.ts</code> was committed. It defined every interface the team would need: Agent, ChatItem, SSEEvent, DebateState, FinalIdea, HistoryEntry, and all 13 SSE event payloads. This file was the contract — the single source of truth that enabled zero-conflict parallel work.",
      },
      {
        type: "table",
        caption: "Parallel development — three streams, committed within 1 minute of each other",
        headers: ["Stream", "Engineer", "Committed", "Output"],
        rows: [
          { cells: ["P1: Backend Core", "hwcho", "13:48", "orchestrator.ts, prompts.ts, SSE API route"] },
          { cells: ["P2: Slack Chat UI", "swson", "13:49", "10 components (ChatLayout, Sidebar, ChatMessage, etc.)"] },
          { cells: ["P3: Hooks + I/O", "hskim", "13:49", "useDebate (441 lines), TopicInput, LandingPageView"] },
        ],
      },
      {
        type: "prose",
        text: "The merge at 13:51 had <strong>zero conflicts</strong>. Integration took 3 minutes. By 13:54 — 55 minutes into the hackathon — the prototype was functional end-to-end.",
      },
      {
        type: "prose",
        text: "The lesson: when time is the constraint, invest 5 minutes defining interfaces upfront. That small investment prevented every merge conflict and misunderstanding for the remaining 3 hours.",
      },
    ],
  },
  {
    id: "four-pivots",
    title: "Four Pivots in Three Hours",
    subtitle: "The decisions that shaped the final product",
    blocks: [
      {
        type: "prose",
        text: "The initial PRD described a straightforward chat UI with result cards. Over 3 hours, four pivots transformed it into something much more impactful. Each pivot followed the same pattern: <strong>problem noticed → solution designed → implemented within 30 minutes</strong>.",
      },
    ],
  },
  {
    id: "pivot-1",
    title: "Pivot 1 — Slack UI + Full Page Swap",
    subtitle: "Minute 38 — The demo strategy that won the hackathon",
    blocks: [
      {
        type: "prose",
        text: "The hackathon judging was three rounds: (1) AI visits the URL and evaluates the frontend, (2) full code review, (3) human panel. We reverse-engineered the architecture from the judging criteria.",
      },
      {
        type: "table",
        caption: "Judging criteria → engineering response",
        headers: ["Round", "Criteria", "Our Response"],
        rows: [
          { cells: ["1st (AI)", "Frontend visual quality", "Slack dark-theme UI — familiar yet polished"], highlight: true },
          { cells: ["2nd (Code)", "Code structure & quality", "TypeScript strict + single-responsibility components"] },
          { cells: ["3rd (Human)", "Demo impact", "\"The chat transforms into a landing page\" — Full Page Swap"] },
        ],
      },
      {
        type: "prose",
        text: "The Slack-style UI was chosen because it naturally visualizes agent join/leave events, typing indicators, and multi-participant conversations — exactly the patterns our multi-agent system needed to showcase. The Full Page Swap (chat → landing page transition) became the demo's \"wow moment\" that the human judges remembered.",
      },
    ],
  },
  {
    id: "pivot-2",
    title: "Pivot 2 — Rounds → Free Debate (30 Turns)",
    subtitle: "Minute 109 — Naturalness over structure",
    blocks: [
      {
        type: "prose",
        text: "The original design used 3 structured rounds: R1 Brainstorming → R2 Debate → R3 Convergence, with 10 GPT-4o calls total. This was scrapped in favor of a 30-turn free debate with automatic phase transitions.",
      },
      {
        type: "table",
        caption: "Before vs. after the pivot",
        headers: ["Aspect", "Before (Rounds)", "After (Free Debate)"],
        rows: [
          { cells: ["Structure", "3 rigid rounds", "30 turns, 4 auto-phases (early/mid/late/closing)"] },
          { cells: ["Agent swaps", "Round boundaries", "Deterministic turns (12, 22)"] },
          { cells: ["GPT calls", "10", "~35"] },
          { cells: ["Naturalness", "Artificial round breaks", "Continuous conversation flow"], highlight: true },
          { cells: ["Demo stability", "Complex edge cases", "Predictable, reliable progression"], highlight: true },
        ],
      },
      {
        type: "prose",
        text: "<strong>Why:</strong> Real meetings don't have \"Round 2\" announcements. The round transitions felt artificial and created edge cases in the orchestrator logic. Free debate with phase-based prompt adjustments (\"argue harder\" in mid-phase, \"converge now\" in late-phase) produced more natural conversations and far fewer bugs.",
      },
      {
        type: "prose",
        text: "<strong>Trade-off:</strong> GPT-4o calls tripled (10 → 35+), increasing cost and debate duration from 2-3 to 5-8 minutes. We accepted this because debate quality and demo stability mattered more than speed at a hackathon.",
      },
    ],
  },
  {
    id: "pivot-3",
    title: "Pivot 3 — Template-Based Instant Rendering",
    subtitle: "Minute 157 — Solving the 60-second wait",
    blocks: [
      {
        type: "prose",
        text: "The original flow: debate ends → GPT-4o generates full HTML → user waits 30-60 seconds → landing page appears. During a hackathon demo, 60 seconds of \"Generating...\" is fatal.",
      },
      {
        type: "prose",
        text: "The solution was a <strong>dual-path rendering strategy</strong>:",
      },
      {
        type: "highlights",
        title: "Dual-Path Rendering",
        items: [
          "<strong>Primary path (instant):</strong> When FINAL_RESULT arrives, a keyword-matching algorithm selects one of 9 design templates (Glassmorphism, Neobrutalism, Editorial, Minimalism, Dark Neon, Bento Grid, Organic Shapes, Corporate, Gradient Mesh) and renders it immediately with the debate conclusions.",
          "<strong>Background path (GPT):</strong> GPT-4o continues generating custom HTML in the background. If the template is already displayed, the GPT result is silently ignored.",
        ],
      },
      {
        type: "prose",
        text: "This eliminated the wait entirely. The moment the debate concluded, the landing page appeared. The 9 templates also provided consistent visual quality — GPT-generated HTML varied wildly in quality and sometimes got refused entirely by the model.",
      },
      {
        type: "prose",
        text: "<strong>Trade-off:</strong> Templates can't produce truly custom designs per idea. But consistent, instant, high-quality output beat unpredictable, slow, variable-quality output — especially for a live demo.",
      },
    ],
  },
  {
    id: "pivot-4",
    title: "Pivot 4 — Forced Convergence Prompts",
    subtitle: "Minute 174 — Making agents actually conclude",
    blocks: [
      {
        type: "prose",
        text: "With 30 turns of free debate, agents kept introducing new ideas right up to the last turn. The debate would end without consensus, and the summary prompt couldn't extract a coherent conclusion from a divergent conversation.",
      },
      {
        type: "prose",
        text: "The fix was simple but critical: after turn 25, the system prompt changes to force convergence:",
      },
      {
        type: "highlights",
        title: "Closing Phase Prompt Directive",
        items: [
          "\"The debate is ending soon. You MUST reach a final conclusion.\"",
          "\"No new ideas allowed. Summarize and converge on what's been agreed.\"",
          "\"Start your message with '정리하면~' (To summarize~) or '결론적으로~' (In conclusion~).\"",
        ],
      },
      {
        type: "prose",
        text: "This transformed the last 5 turns from divergent brainstorming into natural consensus-building. The agents started agreeing, refining, and producing actionable conclusions — exactly what the summary prompt needed to generate a strong final result.",
      },
    ],
  },
  {
    id: "agent-patterns",
    title: "Agent Design Patterns (8 Patterns)",
    blocks: [
      {
        type: "prose",
        text: "The hackathon theme was agent design, so we deliberately incorporated as many patterns as possible into a single coherent system:",
      },
      {
        type: "table",
        headers: ["Pattern", "Implementation", "Purpose"],
        rows: [
          { cells: ["Orchestrator", "orchestrator.ts — AsyncGenerator controlling the full debate lifecycle", "Central coordination of agent turns, phases, and state transitions"] },
          { cells: ["Specialist Agent", "createAgentPrompt — auto-generates domain expert based on topic", "Topic-appropriate expertise (e.g., marketer for a marketing topic)"] },
          { cells: ["Persistent Agent", "PM_AGENT & DESIGNER_AGENT with isFixed: true", "Anchors that prevent scope creep and ensure design perspective"] },
          { cells: ["Agent Spawning", "doRetireSpawn — new agent creation at turns 12 and 22", "Fresh perspectives when the debate needs a new angle"] },
          { cells: ["Agent Retirement", "agent_retire event with natural exit message", "Graceful departure when an agent's expertise is exhausted"] },
          { cells: ["Multi-turn Debate", "30-turn free debate with 4 automatic phases", "Deep exploration before convergence"] },
          { cells: ["Result Synthesis", "finalResultPrompt — investor-pitch-level structured output", "Actionable output, not just conversation logs"] },
          { cells: ["Human-in-the-Loop", "Reject → 8 additional turns → new result", "User control without direct debate participation"], highlight: true },
        ],
      },
    ],
  },
  {
    id: "tech-deep-dive",
    title: "Technical Deep Dive",
    blocks: [
      {
        type: "prose",
        text: "<strong>SSE + AsyncGenerator Pattern.</strong> The orchestrator is an async generator function that yields typed SSE events. The API route consumes these with <code>for await...of</code> and writes them as SSE text. The frontend hook parses the SSE stream and dispatches actions to a useReducer. This three-layer separation keeps each concern isolated — the orchestrator doesn't know about HTTP, the route doesn't know about debate logic, and the frontend doesn't know about GPT-4o.",
      },
      {
        type: "prose",
        text: "<strong>Speaker Selection Algorithm.</strong> Each turn, the system selects the next speaker by: (1) filtering to online agents only, (2) excluding the last speaker to prevent consecutive turns, (3) sorting by speak count ascending to ensure balanced participation. Simple, but effective — every agent gets roughly equal airtime.",
      },
      {
        type: "prose",
        text: "<strong>Agent Persona Engineering.</strong> The quality of debate is entirely determined by persona design. Generic descriptions like \"market-focused thinker\" produce boring conversations. Specific speech patterns produce engaging ones: the PM says \"근데 이거 누가 쓰는데?\" (\"But who would actually use this?\"), the Designer says \"유저가 3초 안에 이해 못 하면 실패\" (\"If the user can't understand it in 3 seconds, it's a failure\"). These speech habits make the agents feel like real people arguing in a meeting room.",
      },
      {
        type: "prose",
        text: "<strong>Random Inter-Agent Delay.</strong> Between each agent's turn, a random delay of 800-2500ms is injected. Without it, agents respond instantly one after another, breaking the illusion of a real conversation. This small detail significantly improves demo immersion.",
      },
      {
        type: "prose",
        text: "<strong>GPT-4o Refusal Handling.</strong> GPT-4o sometimes refuses to generate landing page HTML, treating it as a security concern. We addressed this by: (1) switching the landing page prompt to English, (2) framing it as \"a design prototype with placeholder demo content,\" (3) detecting refusals by checking for <code>&lt;!DOCTYPE</code> or <code>&lt;html</code> tags, and (4) falling back to a minimal HTML template when generation fails.",
      },
    ],
  },
  {
    id: "timeline",
    title: "Complete Timeline",
    subtitle: "26 commits in 3 hours",
    blocks: [
      {
        type: "table",
        caption: "Hackathon timeline — from PRD to polish",
        headers: ["Time", "Milestone", "Impact"],
        rows: [
          { cells: ["12:59", "PRD v1.0 written", "Initial concept: \"Agent Arena\""] },
          { cells: ["13:37", "PRD v2.0 — Slack UI + Full Page Swap pivot", "Demo strategy locked in"], highlight: true },
          { cells: ["13:43", "types.ts contract (281 lines) committed", "Parallel development enabled"] },
          { cells: ["13:48-49", "P1 + P2 + P3 committed simultaneously", "Backend, UI, hooks — all in parallel"] },
          { cells: ["13:51", "All branches merged (0 conflicts)", "Integration in 3 minutes"] },
          { cells: ["13:54", "End-to-end prototype working", "55 minutes from start to working product"], highlight: true },
          { cells: ["14:09", "Designer agent added", "Third persistent agent for UX perspective"] },
          { cells: ["14:48", "Rounds → Free Debate 30 turns", "Major architecture pivot"], highlight: true },
          { cells: ["14:55", "Code export (ZIP download)", "User can take the landing page home"] },
          { cells: ["15:06", "9 design templates — instant rendering", "Eliminated 60-second wait"], highlight: true },
          { cells: ["15:07", "Reject → continue debate (8 more turns)", "Human-in-the-Loop pattern"] },
          { cells: ["15:13", "Forced convergence prompts", "Agents actually reach conclusions"] },
          { cells: ["15:23", "Rebranding: Agent Arena → Wigent", "Final identity"] },
          { cells: ["15:55", "Lint fixes — final commit", "Ship it"] },
        ],
      },
    ],
  },
  {
    id: "lessons",
    title: "Lessons Learned",
    blocks: [
      {
        type: "highlights",
        title: "What Worked",
        items: [
          "<strong>Contract-first development.</strong> 5 minutes defining types.ts prevented all merge conflicts for 3 hours. When time is the constraint, invest in interfaces before implementations.",
          "<strong>Demo-driven architecture.</strong> We designed backwards from \"what will impress the judges\" to \"what architecture supports that.\" Hackathons reward demos, not codebases.",
          "<strong>Fearless pivoting.</strong> Four pivots in 3 hours, each implemented within 30 minutes. The initial design was a starting point, not a commitment.",
          "<strong>Claude Code for parallel generation.</strong> Each engineer used Claude Code to generate entire component trees in single commits. P2 generated 10 Slack UI components at once. This is not traditional pair programming — it's multiplied individual output.",
        ],
      },
      {
        type: "highlights",
        title: "What We'd Do Differently",
        items: [
          "<strong>User participation.</strong> Users can only watch and reject. Letting them steer the debate mid-conversation would produce much better results.",
          "<strong>Model tiering.</strong> Every turn uses GPT-4o. In production, only critical turns (opening, closing, synthesis) need the top model — the rest could use GPT-4o-mini at 1/10th the cost.",
          "<strong>Testing.</strong> Zero tests — a hackathon reality. The orchestrator, reducer, and SSE parser all deserve unit tests.",
          "<strong>Landing page editing.</strong> The only way to improve the result is to reject and re-debate. A drag-and-drop editor for the generated page would be far more practical.",
        ],
      },
    ],
  },
  {
    id: "numbers",
    title: "WIGENT by the Numbers",
    blocks: [
      {
        type: "table",
        headers: ["Metric", "Value"],
        rows: [
          { cells: ["Development time", "3.5 hours (12:30 — 16:00)"] },
          { cells: ["Commits", "26"] },
          { cells: ["Time to working prototype", "55 minutes"], highlight: true },
          { cells: ["Source files", "26"] },
          { cells: ["Components", "16 (8 chat + 8 other)"] },
          { cells: ["SSE event types", "13"] },
          { cells: ["GPT-4o calls per session", "~35"] },
          { cells: ["Design templates", "9"] },
          { cells: ["Prompt functions", "7"] },
          { cells: ["Agent design patterns", "8"] },
          { cells: ["Team members", "3"] },
          { cells: ["Merge conflicts", "0"], highlight: true },
          { cells: ["Brand name changes", "2 (Agent Arena → Wegent → Wigent)"] },
        ],
      },
    ],
  },
];

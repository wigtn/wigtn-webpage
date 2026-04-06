import type { ResearchSection } from "./projects";

export const WIGVO_SECTIONS: ResearchSection[] = [
  {
    id: "target-users",
    title: "Who Is This For?",
    blocks: [
      {
        type: "list",
        items: [
          "<strong>Foreign residents in Korea:</strong> 2.2 million residents (2024) who cannot make phone calls in Korean",
          "<strong>Koreans living abroad:</strong> 2.8 million overseas Koreans who cannot call in the local language",
          "<strong>Hearing and speech impaired:</strong> 390,000 registered individuals for whom voice calls are inaccessible",
          "<strong>Call-phobic generation:</strong> ~40% of Gen MZ who avoid phone calls entirely",
        ],
      },
    ],
  },
  {
    id: "technical-challenges",
    title: "Technical Challenges — Why PSTN Is Hard",
    blocks: [
      {
        type: "prose",
        text: "<strong>Audio Quality Gap:</strong> High-bandwidth environments (16-24kHz PCM16) assume wideband audio and client-side AEC. PSTN operates on G.711 μ-law 8kHz narrowband codec with 80-600ms variable delay and constant codec compression noise.",
      },
      {
        type: "prose",
        text: "<strong>Echo Loop:</strong> AI-translated TTS audio returns through the PSTN after 80-600ms, re-entering the STT → translation → TTS pipeline in an infinite loop. <strong>8 out of 10 initial test calls experienced this.</strong> Without client-side AEC available in high-bandwidth app environments, PSTN requires a software-only solution.",
      },
      {
        type: "prose",
        text: "<strong>VAD Failure:</strong> OpenAI Server VAD assumes clean wideband audio. PSTN background noise (RMS 50-200) registers as \"speech in progress\" to Server VAD, causing <strong><code>speech_stopped</code> to fire 15-72 seconds late or not at all</strong>.",
      },
      {
        type: "table",
        caption: "Comparison with Existing Bidirectional Voice Translation Systems",
        headers: ["System", "PSTN", "Bidirectional", "S2S", "Echo Handling", "Accessibility"],
        rows: [
          { cells: ["SeamlessM4T", "", "O", "O", "N/A", ""] },
          { cells: ["Moshi / Hibiki", "", "", "O", "N/A", ""] },
          { cells: ["Google Duplex", "O", "", "", "N/D", ""] },
          { cells: ["Samsung Galaxy AI", "O", "O", "O", "HW AEC", ""] },
          { cells: ["SKT A.dot", "O", "O", "O", "Carrier Infra", ""] },
          { cells: ["WIGVO", "O", "O", "O", "Software", "O"], highlight: true },
        ],
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture — Dual-Session Echo Gating",
    blocks: [
      {
        type: "prose",
        text: "When a browser client connects via WebSocket to the relay server, the server manages <strong>2 independent Realtime LLM sessions</strong> and a Twilio phone gateway. An AudioRouter delegates events to one of 3 pipelines (V2V, T2V, FullAgent) via the Strategy pattern.",
      },
      {
        type: "figure",
        images: [
          {
            src: "/images/projects/wigvo_architecture.png",
            alt: "WIGVO System Architecture",
            caption: "WIGVO system architecture. Session A (red) translates user voice to G.711 for Twilio delivery. Session B (blue) processes PSTN audio through the 3-Stage filter pipeline.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "<strong>Layer 1 — Transport:</strong> Twilio Media Streams (PSTN ↔ G.711 μ-law 8kHz) + Browser WebSocket (PCM 16kHz)",
          "<strong>Layer 2 — Pipeline:</strong> AudioRouter delegates events to V2V / T2V / Agent mode via Strategy pattern",
          "<strong>Layer 3 — Sessions:</strong> Session A (browser→phone) + Session B (phone→browser) maintain independent system prompts and 6-turn sliding context",
        ],
      },
      {
        type: "prose",
        text: "<strong>STT-Translation Separation:</strong> Delegating translation to the Realtime API causes hallucinations that add content not present in the original speech. STT uses Realtime API's built-in Whisper-1, while translation is handled by <strong>GPT-4o-mini Chat API (temperature=0)</strong>. <code>context_prune_keep=0</code> completely blocks the Realtime API's own translation.",
      },
    ],
  },
  {
    id: "echo-gate",
    title: "Echo Gate (7-Stage Evolution)",
    subtitle: "STAGE 1",
    blocks: [
      {
        type: "prose",
        text: "Blocks the echo loop where TTS audio returns through PSTN.",
      },
      {
        type: "figure",
        images: [
          {
            src: "/images/projects/wigvo_pipeline.png",
            alt: "3-Stage Audio Processing Pipeline",
            caption: "3-Stage audio filter pipeline: Echo Gate → Energy Gate → Silero VAD.",
          },
        ],
      },
      {
        type: "prose",
        text: '<strong>The Critical Breakthrough — Drop vs Replace:</strong> "Dropping" audio causes Server VAD to interpret it as a stream interruption and freeze. "Replacing" with μ-law silence (0xFF) maintains stream continuity while VAD correctly recognizes it as silence. This "Drop vs Replace" paradigm is the core principle applied consistently across both Echo Gate and VAD.',
      },
      {
        type: "list",
        items: [
          "<strong>Echo Window:</strong> Replaces PSTN audio with μ-law silence during TTS playback + 0.5s jitter margin after TTS ends",
          "<strong>Dynamic Settling:</strong> TTS length × 0.3 (clamped 0.5s-1.5s) suppresses AGC recovery noise; RMS ≥ 500 passes through as real speech",
          "<strong>Normal Window:</strong> RMS ≥ 150 energy threshold",
        ],
      },
      {
        type: "prose",
        text: "<strong>7-Stage Evolution:</strong> (1) Audio Fingerprint via Pearson correlation — failed completely due to G.711 μ-law nonlinear quantization destroying correlation. (2) Fixed 2.5s Echo Gate — solved echo but disrupted conversation flow. (3) Dynamic Cooldown — proportional to TTS length, but AGC noise spike after gate release. (4) <strong>Final: Silence Injection + RMS + Dynamic Settling + Silero</strong>.",
      },
      {
        type: "prose",
        text: "<strong>Result:</strong> Echo loop rate reduced from <strong>8/10 initial calls → 0/148 production calls</strong>.",
      },
    ],
  },
  {
    id: "pstn-vad",
    title: "PSTN VAD — Independent Architecture",
    subtitle: "STAGE 2",
    blocks: [
      {
        type: "prose",
        text: "OpenAI Server VAD is a black box with no frame-level control during echo windows. RMS thresholds of 150→80→30→20 were all attempted, but no single stable threshold exists for PSTN. The solution: <strong>switch to local Silero VAD</strong> with a PSTN-specific independent architecture.",
      },
      {
        type: "list",
        items: [
          "<strong>Stage 1 — RMS Energy Gate:</strong> Echo window RMS ≥ 500, Settling RMS ≥ 200, Normal RMS ≥ 150",
          "<strong>Stage 2 — Silero VAD:</strong> Neural network judgment on frames passing the energy gate. 8kHz → 16kHz zero-order hold upsampling",
          "Asymmetric hysteresis: onset 160ms (5 frames) / offset 800ms (25 frames)",
          "Minimum utterance 250ms, minimum peak RMS 300 to reject weak signals as noise",
        ],
      },
      {
        type: "prose",
        text: "<strong>Result:</strong> <code>speech_stopped</code> latency reduced from <strong>15-72 seconds → 480ms</strong>.",
      },
    ],
  },
  {
    id: "whisper-hallucination",
    title: "Whisper Hallucination Filter",
    subtitle: "STAGE 3",
    blocks: [
      {
        type: "prose",
        text: 'When PSTN noise enters Whisper-1, it generates "plausible" text learned from training data (YouTube, broadcasts). Broadcast-style patterns like "MBC News, this is Lee Deokyoung" and "Thanks for watching" leaked into the translation pipeline and <strong>actually reached recipients\' phones in production</strong>.',
      },
      {
        type: "list",
        items: [
          "<strong>Pre-STT (Stage 0):</strong> Echo Gate + Silence Injection prevents contaminated audio from reaching Whisper",
          "<strong>Post-STT (Stage 1):</strong> 29 Korean + 22 English = 51 broadcast-style blocklist patterns + 4-layer text filter (min length, silence timeout, repeated phrases, confidence score)",
          "<strong>Post-Translation (Stage 2):</strong> 3-level Guardrail: L1 (pass, 0ms) · L2 (immediate TTS + background correction, 0ms) · L3 (block + GPT-4o-mini correction, ~800ms)",
        ],
      },
      {
        type: "prose",
        text: "<strong>Result:</strong> Hallucination leak rate <strong>below 0.3%</strong>, average 0.7 blocks per call (148 calls). 95%+ cases handled by L1 with zero additional latency.",
      },
    ],
  },
  {
    id: "strategy-pattern",
    title: "Strategy Pattern — 3 Communication Pipelines",
    blocks: [
      {
        type: "prose",
        text: "The initial monolithic AudioRouter was refactored into a <strong>thin delegator + 3 independent pipelines</strong> via the Strategy pattern (73% code reduction).",
      },
      {
        type: "list",
        items: [
          "<strong>VoiceToVoice (V2V):</strong> Bidirectional voice translation. Echo Gate + Silence Injection + 3-tier interrupt priority",
          "<strong>TextToVoice (T2V):</strong> For hearing/speech-impaired users. Text input → AI-translated voice delivery",
          "<strong>FullAgent:</strong> AI proxy calling for call-phobic users. Inherits TextToVoice + Function Calling",
          "<strong>EchoGateManager:</strong> Shared echo prevention logic across pipelines",
          "<strong>ChatTranslator:</strong> T2V/Agent Session B translation via GPT-4o-mini",
        ],
      },
    ],
  },
  {
    id: "key-metrics",
    title: "Key Metrics — 148 Production Calls",
    blocks: [
      {
        type: "prose",
        text: "<strong>Latency:</strong>",
      },
      {
        type: "list",
        items: [
          "Session A P50: <strong>555ms</strong> / P95: 1,169ms",
          "Session B P50: <strong>2,868ms</strong> (correlated with utterance length, Pearson r=0.400)",
          "First message P50: 1,215ms (cold start)",
        ],
      },
      {
        type: "prose",
        text: "<strong>Echo & Safety:</strong>",
      },
      {
        type: "list",
        items: [
          "Echo loops: <strong>0 / 148 calls</strong> (prototype 80% → 0%)",
          "Echo gate activations per call: avg 7.0",
          "VAD false positives per call: avg 1.8",
          "Hallucination blocks per call: avg 0.7",
          "Guardrail L2: 148 (normal corrections) / L3: 0",
        ],
      },
      {
        type: "prose",
        text: "<strong>Cost:</strong>",
      },
      {
        type: "list",
        items: [
          "V2V: $0.30/min · T2V: $0.29/min",
          "After architecture optimization: <strong>$0.18/min (33% reduction)</strong>",
          "Mode distribution: T2V 116 calls (68.6%) · V2V 52 calls (30.8%) · Agent 1 call (0.6%)",
        ],
      },
    ],
  },
  {
    id: "latency-distribution",
    title: "Latency Distribution",
    blocks: [
      {
        type: "figure",
        images: [
          {
            src: "/images/projects/wigvo_latency_histogram.png",
            alt: "Latency Distribution Histogram",
            caption: "E2E latency distribution. Session A (N=814 turns) and Session B (N=744 turns) from live PSTN calls.",
          },
          {
            src: "/images/projects/wigvo_utterance_scatter.png",
            alt: "Utterance Length vs Latency Scatter",
            caption: "Utterance length vs Session B E2E latency. Pearson r=0.400 (p<0.001).",
          },
        ],
        layout: "grid",
      },
    ],
  },
  {
    id: "ablation-study",
    title: "Ablation Study",
    blocks: [
      {
        type: "table",
        caption: "Echo Gate Design Comparison",
        headers: ["Method", "Echo Loop", "Conversation Delay", "Adopted"],
        rows: [
          { cells: ["Audio Fingerprint (Pearson)", "Unresolved", "—", ""] },
          { cells: ["Fixed Echo Gate (2.5s)", "Resolved", "Disrupted", ""] },
          { cells: ["Dynamic Cooldown", "Resolved", "Improved", ""] },
          { cells: ["Silence Injection + RMS + Dynamic Settling + Silero", "Resolved", "Minimized", "O"], highlight: true },
        ],
      },
      {
        type: "prose",
        text: "<strong>Finding:</strong> In PSTN environments, signal correlation-based echo detection does not work. Only direct control of echo windows with silence frame replacement is stable. The Realtime API's generation characteristics are suitable for STT but not for translation — separating translation to a <code>temperature=0</code> Chat API improves both accuracy and stability.",
      },
    ],
  },
];

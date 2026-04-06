import type { ResearchSection } from "./projects";

export const WIGTNOCR_SECTIONS: ResearchSection[] = [
  {
    id: "overview",
    title: "Overview",
    blocks: [
      {
        type: "prose",
        text: "A VLM-based document parser specialized for Korean government documents. This research project originated from a practical need to parse Korean government public documents for a B2G (government-facing) RAG service. In a B2G environment where the end user's document structure is unknown in advance, the only certainty was the domain: Korean government public documents. The goal was to build an SLM-based document parser that could accurately read and structure these documents while meeting practical infrastructure constraints (limited GPU, cost).",
      },
      {
        type: "prose",
        text: 'Beyond the "bigger is better" paradigm, the central question in AI engineering today is: <strong>how to efficiently transfer LLM intelligence into SLMs</strong>. We applied the knowledge distillation paradigm pioneered by Orca (Microsoft, 2023) — training an SLM to learn from an LLM\'s reasoning process — to the domain of Korean government document parsing.',
      },
      {
        type: "prose",
        text: 'By LoRA fine-tuning Qwen3-VL-2B-Instruct on 2,667 Korean government document pages, WigtnOCR <strong>matches or exceeds a 15x larger Teacher model (30B)</strong> in parsing performance and <strong>ranks #1 in retrieval across 6 parsers</strong>, validating the end-to-end causal chain: "structured parsing → improved chunking → better retrieval." Model weights, training data, and evaluation code are all released as open source.',
      },
      {
        type: "highlights",
        title: "Key Results",
        items: [
          "2B model matches or exceeds a 15x larger 30B Teacher — <strong>4/5 categories matched or exceeded</strong>",
          "OmniDocBench Table TEDS — <strong>#1 (0.649)</strong>",
          "6-parser retrieval comparison — <strong>Hit@1 and MRR@10 best performance</strong>",
          "LoRA fine-tuning time — <strong>31 minutes (DeepSpeed ZeRO-2)</strong>",
          "Fully open-source — <strong>HuggingFace Model + Dataset + GitHub</strong>",
        ],
      },
    ],
  },
  {
    id: "research-question",
    title: "Research Question",
    blocks: [
      {
        type: "prose",
        text: '"Can we compress a 30B Teacher\'s parsing ability into a 2B Student while achieving specialized performance on Korean government documents? And does structured parsing actually lead to better chunking and retrieval quality in a real RAG pipeline?"',
      },
      {
        type: "figure",
        images: [
          {
            src: "/images/projects/wigtnocr-highlights.png",
            alt: "WigtnOCR key benchmark results",
            caption: "WigtnOCR key benchmark results — Table TEDS #1, Retrieval Hit@1 #1 across 6 parsers.",
          },
        ],
      },
    ],
  },
  {
    id: "technical-challenges",
    title: "Technical Challenges — Why Existing Parsers Fall Short",
    blocks: [
      {
        type: "prose",
        text: "<strong>Pure OCR Limitations:</strong> Traditional OCR tools like PaddleOCR can recognize text but fail to understand document structure. In our evaluation, they extracted 3-30x less text than WigtnOCR and missed most tables, forms, and complex layouts in Korean government documents.",
      },
      {
        type: "prose",
        text: "<strong>Rule-based Parser Limitations:</strong> Rule-based parsers like PyMuPDF4LLM offer fast text extraction but near-zero structural recognition. They cannot preserve the hierarchical structure of legal articles (sections/clauses/items) or handle mixed layouts of tables, diagrams, and text.",
      },
      {
        type: "prose",
        text: "<strong>Latest VLM Parser Limitations:</strong> State-of-the-art VLM parsers such as dots.ocr (RedNote) and olmOCR (AI2) are primarily trained on English and Chinese documents. They are not optimized for Korean government documents, which feature complex tables, forms, stamps, mixed scanned/digital pages, and multi-column layouts.",
      },
      {
        type: "prose",
        text: "<strong>30B Model Deployment Limitations:</strong> While 30B-parameter VLMs deliver excellent parsing quality, they require dual GPUs and have slow inference, making production deployment difficult. A 2B model can be served on a single GPU with fast inference and realistic edge deployment.",
      },
    ],
  },
  {
    id: "contribution-stack",
    title: "Contribution Stack (3 Layers)",
    blocks: [
      {
        type: "list",
        items: [
          "<strong>Layer 1 — Benchmark:</strong> KoGovDoc-Bench — a Korean government document evaluation set (294 validation pages with pseudo-GT)",
          "<strong>Layer 2 — Fine-tuned Model:</strong> Wigtn/Qwen3-VL-2B-WigtnOCR — LoRA domain-adaptive fine-tuning weights (released on HuggingFace)",
          "<strong>Layer 3 — Framework (Next Step):</strong> wigtnocr — a pip-installable OSS library providing a unified parsing → structured markdown → chunking pipeline (under development)",
        ],
      },
    ],
  },
  {
    id: "pseudo-gt-pipeline",
    title: "Pseudo-GT Pipeline",
    subtitle: "STAGES 1-3",
    blocks: [
      {
        type: "prose",
        text: "<strong>Stage 1 — Pseudo-GT Generation:</strong> PDF page images were fed to Qwen3-VL-30B-Instruct (Teacher) to generate structured markdown. A total of 4,501 pages were processed: 3,637 pages from 10 KoGovDoc documents + 864 pages from 39 arXiv papers. Initially, the 30B-Thinking model was used but produced unstable outputs (think tag contamination, token truncation), leading to a switch to the Instruct model. <strong>Finding: For document transcription, instruction-tuned models are more stable than reasoning models.</strong>",
      },
      {
        type: "prose",
        text: '<strong>Stage 2 — GT Quality Verification:</strong> Qwen3.5-122B was used as a judge on a 5-point scale. Critically, evaluation was performed <strong>text-only without the original images</strong> — not asking "does this match the original?" but "is this output usable as training data?" This design prevents circular evaluation bias that would occur if a VLM evaluated another VLM\'s visual interpretation. A text-only LLM judge independently assesses structure, tables, completeness, hallucination, and consistency across 5 dimensions. Pass rate: KoGovDoc 75.1%, arXiv 73.8%. Pages scoring below 3 were excluded from training.',
      },
      {
        type: "prose",
        text: "<strong>Stage 3 — Data Refinement:</strong> Document kogov_008 comprised 53% of all data — controlled via <strong>max_doc_ratio=0.25</strong>. Reasoning residue (English thought processes from the 30B-Thinking model) contaminating the GT was discovered — 20 pages deleted, 257 cleaned. Final dataset: <strong>train 2,667 + val 294 pages</strong>.",
      },
    ],
  },
  {
    id: "lora-finetuning",
    title: "LoRA Fine-tuning",
    subtitle: "STAGE 4",
    blocks: [
      {
        type: "prose",
        text: "Base Model: Qwen3-VL-2B-Instruct. LoRA rank=8, alpha=32, targeting all linear layers in the language model. <strong>Vision Encoder and Aligner were frozen</strong> — a pilot test confirmed the VLM's visual recognition was sufficient (Structure F1 79%) but text generation accuracy was lacking.",
      },
      {
        type: "list",
        items: [
          "Hardware: 2x NVIDIA RTX PRO 6000 Blackwell (96GB each)",
          "DeepSpeed ZeRO-2, <strong>training time 31 minutes</strong>, final loss 0.075",
        ],
      },
      {
        type: "table",
        caption: "Ablation Study — LoRA Configuration Comparison (OmniDocBench)",
        headers: ["Config", "LoRA r", "Epochs", "Text NED↓", "TEDS↑", "TEDS-S↑", "CDM F1↑", "RO NED↓", "Skip%↓", "Verdict"],
        rows: [
          { cells: ["v1 (Final)", "8", "3", "0.288", "0.649", "0.732", "0.884", "0.211", "5.8%", "Best overall"], highlight: true },
          { cells: ["v2-best", "32", "3", "0.309", "0.600", "0.697", "—", "0.215", "0.7%", "Table regression"] },
          { cells: ["v2-last", "32", "5", "0.306", "0.610", "0.695", "0.892", "0.214", "0.0%", "Overfitting"] },
        ],
      },
      {
        type: "prose",
        text: "<strong>Finding:</strong> LoRA rank 8 outperformed rank 32 — increasing rank slightly improved formulas but degraded table performance (-4.9pp) and text (+2.1pp). Epoch 5 showed overfitting via rising val loss. v2 achieved 0% skip rate but at the cost of core parsing quality, so v1 was selected as the final model.",
      },
    ],
  },
  {
    id: "omnidocbench-evaluation",
    title: "OmniDocBench Evaluation",
    subtitle: "STAGE 5",
    blocks: [
      {
        type: "prose",
        text: "Evaluated on OmniDocBench (CVPR 2025) — 1,355 PDF pages with human-annotated ground truth — comparing 4 models.",
      },
      {
        type: "figure",
        images: [
          {
            src: "/images/projects/wigtnocr-omnidocbench.png",
            alt: "OmniDocBench evaluation overview",
            caption: "OmniDocBench evaluation results — WigtnOCR achieves Table TEDS #1 among 4 models (Qwen3-VL-30B, 2B, Marker, WigtnOCR).",
          },
        ],
      },
      {
        type: "table",
        caption: "OmniDocBench (CVPR 2025) — 4 Models Comparison",
        headers: ["Model", "Text NED↓", "Table TEDS↑", "TEDS-S↑", "CDM F1↑", "CDM Exp↑", "RO NED↓", "Skip%↓"],
        rows: [
          { cells: ["Qwen3-VL-30B (Teacher)", "0.289", "0.523", "0.657", "0.939", "0.692", "0.227", "5.5%"] },
          { cells: ["Qwen3-VL-2B (Base)", "0.364", "0.561", "0.667", "0.865", "0.504", "0.300", "18.8%"] },
          { cells: ["Marker (Rule-based)", "0.218", "0.586", "0.658", "0.863", "0.582", "0.165", "0.4%"] },
          { cells: ["WigtnOCR v1 (Ours)", "0.288", "0.649", "0.732", "0.884", "0.600", "0.211", "5.8%"], highlight: true },
        ],
      },
      {
        type: "list",
        items: [
          "<strong>Text NED:</strong> Matches 30B Teacher (0.288 vs 0.289)",
          "<strong>Table TEDS:</strong> Overall #1 — 0.649 (vs Teacher's 0.523, +12.6pp)",
          "<strong>Reading Order:</strong> Exceeds 30B Teacher (0.211 vs 0.227)",
          "vs Base 2B — Text NED +21%, Table TEDS +16%, Reading Order +30%",
          "Student <strong>matches or exceeds 30B Teacher in 4/5 categories</strong> — validating pseudo-label distillation",
        ],
      },
    ],
  },
  {
    id: "kogovdoc-evaluation",
    title: "KoGovDoc Val Evaluation",
    subtitle: "STAGE 6",
    blocks: [
      {
        type: "prose",
        text: "Full-page text NED evaluation on 294 validation pages excluded from training.",
      },
      {
        type: "table",
        caption: "KoGovDoc Val — 3 Models Comparison",
        headers: ["Model", "NED↓", "Eval Success", "Errors"],
        rows: [
          { cells: ["WigtnOCR v1", "0.285", "289/294", "5"], highlight: true },
          { cells: ["Qwen3-VL-30B (Teacher)", "0.334", "294/294", "0"] },
          { cells: ["Qwen3-VL-2B (Base)", "0.390", "294/294", "0"] },
        ],
      },
      {
        type: "prose",
        text: "<strong>WigtnOCR exceeds the 30B Teacher on Korean government documents</strong> (NED 0.285 vs 0.334), demonstrating effective domain-specific knowledge transfer.",
      },
    ],
  },
  {
    id: "chunking-retrieval",
    title: "Chunking Quality & Retrieval Evaluation",
    subtitle: "STAGES 7-8",
    blocks: [
      {
        type: "prose",
        text: 'To verify whether "structured parsing actually produces better chunks," we evaluated 6 parsers using the BC/CS metrics from MoC (ACL 2025). Semantic chunking (BGE-M3) was used as the primary comparison strategy — both parsers chunk using the same method, with only the input text\'s structural quality differing, ensuring a fair comparison.',
      },
      {
        type: "table",
        caption: "KoGovDoc Semantic Chunking — BC/CS Quality (6 Parsers)",
        headers: ["Model", "BC↑", "CS↓"],
        rows: [
          { cells: ["MinerU", "0.735", "2.711"] },
          { cells: ["WigtnOCR-2B", "0.706", "2.859"], highlight: true },
          { cells: ["Qwen3-VL-30B", "0.714", "3.164"] },
          { cells: ["Marker", "0.683", "3.206"] },
          { cells: ["Qwen3-VL-2B", "0.678", "3.446"] },
          { cells: ["PaddleOCR", "0.654", "3.420"] },
        ],
      },
      {
        type: "figure",
        images: [
          {
            src: "/images/projects/wigtnocr-bc-vs-retrieval.png",
            alt: "BC vs Hit@1 scatter plot",
            caption: "BC/CS chunk quality vs Retrieval Hit@1 correlation — BC/CS #1 (MinerU) is Retrieval #5, revealing that chunk boundary quality alone doesn't predict retrieval performance.",
          },
        ],
      },
      {
        type: "prose",
        text: "BC/CS quality doesn't guarantee retrieval performance. Stage 8 measures the final retrieval performance to complete the causal chain. Pipeline: Semantic chunking → BGE-M3 vectorization → FAISS search, evaluated on 564 queries.",
      },
      {
        type: "figure",
        images: [
          {
            src: "/images/projects/wigtnocr-retrieval.png",
            alt: "Retrieval performance comparison",
            caption: "6-parser retrieval comparison — WigtnOCR achieves #1 in Hit@1, Hit@5, and MRR@10.",
          },
        ],
      },
      {
        type: "table",
        caption: "KoGovDoc Retrieval — 564 Queries",
        headers: ["Model", "Hit@1↑", "Hit@5↑", "MRR@10↑", "nDCG@10↑"],
        rows: [
          { cells: ["WigtnOCR-2B", "0.739", "0.855", "0.788", "0.437"], highlight: true },
          { cells: ["Qwen3-VL-30B", "0.716", "0.839", "0.771", "0.411"] },
          { cells: ["Marker", "0.711", "0.853", "0.771", "0.412"] },
          { cells: ["Qwen3-VL-2B", "0.709", "0.814", "0.756", "0.444"] },
          { cells: ["MinerU", "0.608", "0.789", "0.682", "0.384"] },
          { cells: ["PaddleOCR", "0.512", "0.693", "0.592", "0.293"] },
        ],
      },
      {
        type: "list",
        items: [
          "<strong>WigtnOCR ranks #1 in Hit@1 (0.739), Hit@5 (0.855), and MRR@10 (0.788)</strong>",
          "vs PaddleOCR: Hit@1 +22.7pp; vs 30B Teacher: +2.3pp",
          "<strong>MinerU is BC/CS #1 but Retrieval #5</strong> — chunk boundary quality doesn't predict retrieval; text richness and structural fidelity matter more for end-to-end RAG performance",
        ],
      },
    ],
  },
  {
    id: "practical-findings",
    title: "Practical Findings",
    blocks: [
      {
        type: "list",
        items: [
          "<strong>Thinking vs Instruct:</strong> For document transcription, reasoning models produce unstable output (think tag contamination, token truncation). Instruction-tuned models are more reliable.",
          "<strong>LoRA Rank Sweet Spot:</strong> With 2,667 training samples, r=8 is optimal. Increasing to r=32 degrades table performance by -4.9pp.",
          "<strong>BC/CS ≠ Retrieval:</strong> BC/CS chunk quality metrics do not predict retrieval performance. MinerU ranks #1 in BC/CS but #5 in retrieval. Text richness and structural fidelity are more important for end-to-end RAG.",
          "<strong>CS O(n²) Solution:</strong> MAX_CHUNKS_FOR_CS=50 with uniform sampling maintains representativeness while bounding computation.",
          "<strong>Page → Document Aggregation:</strong> Page-level chunking produced too few chunks for BC/CS calculation. Switching to document-level aggregation resolved this.",
          "<strong>VLM Text Extraction Volume:</strong> WigtnOCR extracts 3-30x more text than PaddleOCR, capturing tables, forms, and complex layouts that pure OCR misses.",
        ],
      },
    ],
  },
];

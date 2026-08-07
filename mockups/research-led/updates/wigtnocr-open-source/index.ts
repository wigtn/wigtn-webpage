/**
 * Update: WigtnOCR on HuggingFace — release note.
 *
 * Colocated post. Images live next to the text and are imported, so a file is
 * never referenced by a string path that can rot and each one ships with a
 * content hash.
 *
 * Follows updates/_template/release/STRUCTURE.md: lede → get it → what is in
 * the release → why it exists → the numbers → what it does not do yet → go
 * deeper. Voice follows updates/acl-2026-san-diego/index.ts.
 *
 * WHERE THE NUMBERS COME FROM. Three sources, and nothing here is outside
 * them:
 *   - constants/wigtnocr-sections.ts — the distillation pipeline, the judge,
 *     the LoRA config, and every OmniDocBench / KoGovDoc / retrieval / BC-CS
 *     table quoted below, at the precision that file uses.
 *   - The HuggingFace model card, Wigtn/Qwen3-VL-2B-WigtnOCR — the model id,
 *     the vllm serve line (verbatim), Apache 2.0, the adapter-not-merged fact,
 *     and the four stated limitations (formulas, skip rate, 200 DPI,
 *     language scope).
 *   - The `why-we-distill-30b-into-2b` entry in ../../data.ts — the deployment
 *     framing and the explicit statement that no controlled cost or throughput
 *     study was released.
 * Do not add a figure that is not in one of those. In particular there is no
 * cost-per-page, latency, or throughput number in this post because none has
 * been published; "The numbers" says so in a line rather than leaving a gap a
 * later editor fills in with an estimate.
 *
 * EDITORIAL DECISIONS a future editor would otherwise undo:
 *
 * 1. "What it does not do yet" is the section that carries a release note, and
 *    it is deliberately the longest list in the post. The formula gap, the
 *    5.8% skip rate, the five pages that errored on KoGovDoc val, and MinerU
 *    beating us on chunk-boundary quality are all real and all published. Do
 *    not trim them for reading negative — they are the reason the rest of the
 *    post gets believed, and every one of them is already in the model card or
 *    the tech report where a reader will find it anyway.
 * 2. The release is a LoRA adapter over Qwen3-VL-2B-Instruct, not merged
 *    weights, and the post says so twice. "Open source" is easy to overclaim
 *    here; naming the artifact exactly is the fix.
 * 3. The skip rate is framed as a choice, not a defect, because the ablation
 *    in wigtnocr-sections.ts shows a rank-32 / 5-epoch config that reached
 *    0.0% skip at Table TEDS 0.610 instead of 0.649. Keep the tradeoff
 *    visible; dropping it turns an engineering decision back into an excuse.
 * 4. nDCG@10 is reported even though it is the one retrieval metric the
 *    untuned 2B base wins (0.444 against 0.437). Three of four is the honest
 *    claim and it is still a strong one.
 * 5. The transformers loading snippet is NOT reproduced here. The model card's
 *    version names a class that looks like a paste artifact from another
 *    model, so the post points at the card instead of copying something it
 *    cannot verify.
 * 6. Two images, which is the release template's whole budget. The model card
 *    screenshot is the cover and is not repeated in the body — the same image
 *    twice in one scroll reads as a mistake. The retrieval chart is the one
 *    benchmark figure a reader can actually read at article width; the
 *    five-panel OmniDocBench figure is linked through the tech report rather
 *    than embedded, because at the 1080px media breakout its panels are about
 *    200px wide and illegible.
 * 7. The tech-report URL is built with `techReportHref()` from ../../links, a
 *    leaf module. Calling data.ts's copy would hit it in the temporal dead
 *    zone, since data.ts imports this module. Types from data are erased and
 *    stay safe to import.
 */

import type { Article, Block } from "../../data";
import { techReportHref } from "../../links";
/* Copied, not moved, from public/images/projects/: constants/projects.ts and
 * constants/wigtnocr-sections.ts still read the originals from public/. */
import huggingfaceModelCard from "./huggingface-model-card.png";
import kogovdocRetrieval from "./kogovdoc-retrieval.png";

const p = (text: string): Block => ({ t: "p", text });

/* No `*_COVER` export: nothing outside this post reuses the image, and this
 * release has no MILESTONES entry. See _template/README.md — an exported
 * constant nobody imports reads as a wire someone forgot to connect. */

export const wigtnocrOpenSource: Article = {
  slug: "wigtnocr-open-source",
  kind: "report",
  channel: "newsroom",
  newsTopic: "release",
  tag: "RELEASE",
  title: "WigtnOCR is on HuggingFace: a 2B adapter that reads Korean government documents",
  summary:
    "The adapter, the KoGovDoc-Bench evaluation set, and the training and eval code are public under Apache 2.0. The 2B student leads Hit@1, Hit@5 and MRR@10 in the released six-parser table, and still loses formulas to its 30B teacher.",
  date: "2026.05.21",
  author: "WIGTN",
  readTime: "5 min",
  image: huggingfaceModelCard.src,
  externalUrl: "https://wigtn.github.io/blog/wigtnocr/",
  links: [
    { label: "HuggingFace", href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR" },
    { label: "GitHub", href: "https://github.com/wigtn/wigtnOCR-v1" },
    { label: "Tech report", href: techReportHref("wigtnocr") },
  ],
  body: [
    p(
      "WigtnOCR is public. It is a LoRA adapter over Qwen3-VL-2B-Instruct, trained to turn Korean government PDFs into structured Markdown — headings, tables, forms and reading order preserved in one pass, rather than a bag of recovered characters. The model lives at Wigtn/Qwen3-VL-2B-WigtnOCR on HuggingFace, the 294-page evaluation set beside it as Wigtn/KoGovDoc-Bench, and the training and evaluation code on GitHub. Apache 2.0, all of it.",
    ),

    { t: "h", text: "Get it" },
    p("The model id is Wigtn/Qwen3-VL-2B-WigtnOCR. To serve it:"),
    /* A command goes in a `quote`, not a single-item `list`: the Block union
     * has no code block, and a list renders each line behind a bullet dot,
     * which reads badly for a shell invocation. Same treatment in the other
     * two release notes. */
    {
      t: "quote",
      text: "vllm serve Wigtn/Qwen3-VL-2B-WigtnOCR --max-model-len 16384 --trust-remote-code",
    },
    p(
      "It is an adapter and not merged weights, so Qwen/Qwen3-VL-2B-Instruct comes down with it. The transformers loading snippet is on the model card. Feed it pages at 200 DPI: that is the resolution the card lists as the one it performs best at, and lower inputs degrade the output.",
    ),

    { t: "h", text: "What is in the release" },
    {
      t: "list",
      items: [
        "Wigtn/Qwen3-VL-2B-WigtnOCR on HuggingFace — a LoRA adapter at rank 8, alpha 32, applied to the language model's linear layers. The vision encoder and the aligner were frozen during training and are unchanged from the base model.",
        "Wigtn/KoGovDoc-Bench on HuggingFace — the 294-page Korean government document set held out of training and used for every KoGovDoc number below.",
        "github.com/wigtn/wigtnOCR-v1 — the training recipe (ms-swift with DeepSpeed ZeRO-2), the evaluation code, and the comparison tables and figures the numbers here are read off.",
        "Apache 2.0 across the model, the dataset and the code.",
      ],
    },
    p(
      "What is not in it: a pip package. The unified parse → Markdown → chunk library, wigtnocr, is the next layer of this project and is still under development. Today you get an adapter and an evaluation harness, not a one-line document pipeline.",
    ),

    { t: "h", text: "Why it exists" },
    p(
      "Korean government PDFs are a specific kind of hard: scanned pages mixed with digital ones, dense tables, forms, stamps, and multi-column layouts. Character-level OCR recovers the text and loses the structure that tells a retrieval system which value belongs to which row — in our evaluation PaddleOCR extracted 3 to 30 times less text than WigtnOCR, missing most of the tables and forms outright. The recent VLM parsers do understand structure, but dots.ocr and olmOCR are trained primarily on English and Chinese documents and are not optimized for this one.",
    ),
    p(
      "A 30B vision-language model parses these well and needs two GPUs to do it, which rules it out of the deployment we were building for. So the 30B ran once, offline: Qwen3-VL-30B-Instruct generated structured Markdown for 4,501 pages across 49 documents, a text-only Qwen3.5-122B judge scored each page out of five on structure, tables, completeness, hallucination and consistency, and anything below 3 was dropped. 75.1% of the government pages and 73.8% of the arXiv pages survived. What was left — 2,667 pages, after capping any single document at 25% of the set — trained the 2B student in 31 minutes. The method, the ablations and the failures are in the tech report; this note does not repeat them.",
    ),
    {
      t: "quote",
      text: "The 30B model ran once, offline, to write the training data. It is not in the serving path.",
    },

    { t: "h", text: "The numbers" },
    p(
      "Two evaluations, because parsing quality and retrieval quality are not the same thing. OmniDocBench (CVPR 2025) measures the parse itself across 1,355 human-annotated PDF pages. KoGovDoc measures whether the parsed output actually helps a RAG pipeline find the right chunk: semantic chunking with BGE-M3, FAISS search, 564 queries.",
    ),
    p("On OmniDocBench, against the 30B teacher it was distilled from:"),
    {
      t: "list",
      items: [
        "Text NED 0.288, against the teacher's 0.289. A match, not a win.",
        "Table TEDS 0.649, against 0.523 — the best of the four models compared, Marker and the untuned 2B base included.",
        "Reading order NED 0.211, against 0.227.",
        "Formula CDM F1 0.884, against the teacher's 0.939. This one the teacher keeps.",
      ],
    },
    p(
      "On the 294 held-out Korean government pages, full-page text NED is 0.285 against the teacher's 0.334 — measured over the 289 pages that completed, with five errors, where the teacher and the base model both finished all 294.",
    ),
    {
      t: "image",
      src: kogovdocRetrieval.src,
      alt: "Two bar charts titled KoGovDoc: Retrieval Performance by Parser. Hit@1: WigtnOCR-2B 73.9, Qwen3-VL-30B 71.6, Marker 71.1, Qwen3-VL-2B 70.9, MinerU 60.8, PaddleOCR 51.2. MRR@10: WigtnOCR-2B 78.8, Qwen3-VL-30B 77.1, Marker 77.1, Qwen3-VL-2B 75.6, MinerU 68.2, PaddleOCR 59.2.",
      caption:
        "The end of the chain the project was actually testing: does structured parsing produce chunks a retriever can find. Six parsers, one chunking strategy, 564 queries.",
    },
    {
      t: "list",
      items: [
        "Hit@1 0.739, ahead of the 30B teacher's 0.716 and 22.7 percentage points ahead of PaddleOCR's 0.512.",
        "Hit@5 0.855 and MRR@10 0.788, both the highest in the six-parser table.",
        "nDCG@10 0.437 — where the untuned Qwen3-VL-2B base scores 0.444. Three of the four retrieval metrics, not four.",
      ],
    },
    p(
      "No cost or throughput study was released. The model card supports single-GPU serving through vLLM, and a serving footprint that fits on one GPU is the whole reason a 2B student exists, but nobody has published a controlled measurement — so there is no saving quoted here, in per-page cost or in tokens per second.",
    ),

    { t: "h", text: "What it does not do yet" },
    {
      t: "list",
      items: [
        "Formulas. CDM F1 is 0.884 against the teacher's 0.939 on OmniDocBench, and the model card says the same. If your documents are mostly equations, the 30B is still the better parser and this is not a close call.",
        "A 5.8% skip rate. Roughly one page in seventeen does not parse end to end. That number is a choice rather than an accident: the rank-32, five-epoch configuration in the ablation reached a 0.0% skip rate, at Table TEDS 0.610 instead of 0.649 and with validation loss already rising. We took the tables and shipped the skip rate.",
        "Resolution. 200 DPI is where it was measured; below that, quality degrades. A phone photo of a page is not the input this was trained for.",
        "Language scope. Korean and English are what it was trained and evaluated on. The model card is explicit that other languages may be worse, and we have not measured them, which is not the same as them being fine.",
        "Chunk boundaries are not where it wins. On the BC/CS chunk-quality metrics MinerU scores better than we do — BC 0.735 and CS 2.711 against our 0.706 and 2.859 — and then finishes fifth of six on retrieval. Both halves of that are in the release, because the pair is the interesting result and dropping the half that beats us would make the other half worthless.",
      ],
    },

    { t: "h", text: "Go deeper" },
    p(
      "The pseudo-label pipeline, the judge design and why it scores text without the source image, the LoRA rank ablation, and the full OmniDocBench and retrieval breakdowns are all in the WigtnOCR tech report. The repository carries the code those tables were produced with.",
    ),
  ],
};

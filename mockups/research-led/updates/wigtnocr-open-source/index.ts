/**
 * Update: WigtnOCR on HuggingFace - announcement.
 *
 * Colocated post. The images live next to the text and are imported, so a file
 * is never referenced by a string path that can rot and each one ships with a
 * content hash.
 *
 * Follows updates/_template/announcement/STRUCTURE.md: lede -> what it does ->
 * get it -> what shipped -> read the report. Voice follows
 * updates/acl-2026-san-diego/index.ts.
 *
 * NO COVER, and the folder holds no image. It had one, a screenshot of the
 * HuggingFace model card, deleted with this change along with its import. A
 * release page is read to find out what the thing does and how to run it, and a
 * picture of a model card answers neither; the card itself is one button away
 * at the top of the page.
 *
 * THIS POST USED TO BE A FULL RELEASE NOTE. It carried the distillation
 * method, the OmniDocBench and KoGovDoc tables, and a long limitations
 * section. All of that moved to the tech-report site under the split described
 * in AGENTS.md: this site says what the team did, the report site says what the
 * work found. The report is at tech.wigtn.com/wigtnocr/ and
 * it is better than what was here, because it is bilingual and it keeps its
 * limitations next to its results.
 *
 * Do not restore any of it. If a number seems to be missing from this post,
 * that is the design: one number in the lede, the rest one link away. Two
 * copies of one explanation drift apart in a month.
 *
 * WHERE THE REMAINING FACTS COME FROM:
 *   - The HuggingFace model card, Wigtn/Qwen3-VL-2B-WigtnOCR: the model id, the
 *     vllm serve line (verbatim), Apache 2.0, and the adapter-not-merged fact.
 *   - constants/wigtnocr-sections.ts for the artifact list. That file was
 *     deleted with the /projects tree; the same content is on the report site.
 *
 * The KoGovDoc retrieval chart went with the numbers section. It is a results
 * figure, and results figures are report figures. The file is deleted rather
 * than left in the folder unused.
 *
 * EDITORIAL DECISION a future editor would otherwise undo: the release is a
 * LoRA adapter over Qwen3-VL-2B-Instruct, not merged weights, and the post says
 * so plainly. "Open source" is easy to overclaim here, and this site has
 * already published "weights are now public" about it once. Naming the artifact
 * exactly is the fix, and it is the section that carries an announcement.
 */
import type { Article, Block } from "../../data";
import { techReportHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const wigtnocrOpenSource: Article = {
  slug: "wigtnocr-open-source",
  kind: "report",
  channel: "newsroom",
  newsTopic: "release",
  releaseType: "model",
  tag: "RELEASE",
  /* Was "WigtnOCR is on HuggingFace: a 2B adapter that reads Korean government
   * documents". Product name now, so the release rows read as a list. No
   * `version`: the HuggingFace repo carries no tags, and the "v1" here is the
   * product line, matching the wigtnOCR-v1 repository name. */
  title: "WigtnOCR v1",
  summary:
    "A LoRA adapter over Qwen3-VL-2B-Instruct that reads Korean government documents, with the 294-page KoGovDoc-Bench set and the training and evaluation code, all Apache 2.0.",
  /* Was 2026.05.21, which no source supports. The HuggingFace API reports the
   * model repo created 2026-03-16 and last modified 2026-04-03, and the
   * wigtnOCR-v1 repository was last pushed the same day and has no releases or
   * tags. 2026.04.03 is the last date on which anything was published to the
   * artifact this post announces, and it is checkable; the old date was in the
   * file with no note saying where it came from. If it was the announcement
   * date, restore it and write down the source this time. */
  date: "2026.04.03",
  author: "WIGTN",
  readTime: "2 min",
  links: [
    { label: "HuggingFace", href: "https://huggingface.co/Wigtn/Qwen3-VL-2B-WigtnOCR" },
    { label: "GitHub", href: "https://github.com/wigtn/wigtnOCR-v1" },
    { label: "Tech report", href: techReportHref("wigtnocr") },
  ],
  body: [
    p(
      "WigtnOCR is public, and this is the first release of it. The model lives at Wigtn/Qwen3-VL-2B-WigtnOCR on HuggingFace, the 294-page evaluation set beside it as Wigtn/KoGovDoc-Bench, and the training and evaluation code on GitHub. Apache 2.0, all of it.",
    ),

    { t: "h", text: "What it does" },
    p(
      "It is a LoRA adapter over Qwen3-VL-2B-Instruct, trained to turn Korean government PDFs into structured Markdown, with headings, tables, forms and reading order preserved in one pass rather than a bag of recovered characters. The structure is the point: what a downstream retriever gets is a document it can chunk, not a page of loose characters in reading order it has to guess at.",
    ),

    { t: "h", text: "Get it" },
    p("The model id is Wigtn/Qwen3-VL-2B-WigtnOCR. To serve it:"),
    /* A single command goes in a `quote`, not a one-item `list`: the Block
     * union has no code block, and a list renders it behind a bullet dot,
     * which reads badly for a shell invocation. A *sequence* of commands goes
     * in a list instead. See `wigtn-coding-release`, where `quote` collapsed
     * two lines into one. */
    {
      t: "quote",
      text: "vllm serve Wigtn/Qwen3-VL-2B-WigtnOCR --max-model-len 16384 --trust-remote-code",
    },
    p(
      "It is an adapter and not merged weights, so Qwen/Qwen3-VL-2B-Instruct comes down with it. The transformers loading snippet is on the model card. Feed it pages at 200 DPI: that is the resolution the card lists as the one it performs best at, and lower inputs degrade the output.",
    ),

    { t: "h", text: "What shipped" },
    {
      t: "list",
      items: [
        "Wigtn/Qwen3-VL-2B-WigtnOCR on HuggingFace, a LoRA adapter at rank 8, alpha 32, applied to the language model's linear layers. The vision encoder and the aligner were frozen during training and are unchanged from the base model.",
        "Wigtn/KoGovDoc-Bench on HuggingFace: the 294-page Korean government document set held out of training.",
        "github.com/wigtn/wigtnOCR-v1: the training recipe (ms-swift with DeepSpeed ZeRO-2) and the evaluation code.",
        "Apache 2.0 across the model, the dataset and the code.",
      ],
    },
    p(
      "What is not in it: a pip package. The unified parse → Markdown → chunk library, wigtnocr, is the next layer of this project and is still under development. Today you get an adapter and an evaluation harness, not a one-line document pipeline.",
    ),

    { t: "h", text: "Read the report" },
    p(
      "The pseudo-label pipeline, the judge design and why it scores text without the source image, the LoRA rank ablation, and the full OmniDocBench and retrieval breakdowns are all in the WigtnOCR tech report. The repository carries the code those tables were produced with.",
    ),
  ],
};

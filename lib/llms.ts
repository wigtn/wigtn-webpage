import {
  ARTICLES,
  SPONSORS,
  MILESTONES,
  PRACTICES,
  RELEASE_ROWS,
  STORIES,
  hrefFor,
  storyHref,
} from "@/mockups/research-led/data";
import { CONTACT_EMAIL, ORG_NAME, SITE_URL, TAGLINE } from "./brand";
import { absoluteUrl } from "./metadata";
import { PAPERS, SOFTWARE } from "./schema";

/**
 * /llms.txt and /llms-full.txt, for language models reading the site.
 *
 * Built from the same data the pages render, so the files cannot fall behind
 * the site. They did: the hand-written copies still called /notices "Notice",
 * had no RCPS or MDI, and said nothing of the three teams after the homepage
 * reorganised around them. Facts only, in the format llmstxt.org describes:
 * an H1, a one-paragraph summary, then link lists.
 *
 * The one hand-written part is RESEARCH_DETAILS, the figures each technical
 * report publishes with its stated limits. It summarises WIGTN Tech, which
 * this repo cannot read, so it changes only when a report does.
 */

const rowsOf = (slug: string) => PRACTICES.find((p) => p.slug === slug)?.rows ?? [];

/* Plain text for a file read as plain text: the non-breaking hyphen in
 * "i\u2011ERP" becomes a hyphen, and the cards' " · " a comma. */
const plain = (s: string) => s.replace(/\u2011/g, "-").replace(/ · /g, ", ");
const teamOf = (slug: string) => PRACTICES.find((p) => p.slug === slug)!;

/* One entry per product on the /notices ledger, newest version first. */
function releases() {
  const seen = new Set<string>();
  return RELEASE_ROWS.filter((r) => !seen.has(r.href) && seen.add(r.href)).map((r) => {
    const article = ARTICLES.find((a) => hrefFor(a) === r.href)!;
    const row = rowsOf("product").find((x) => x.href === r.href);
    return { article, name: row?.name ?? article.title, line: row?.line ?? article.summary };
  });
}

export function llmsIndex(): string {
  const solutions = teamOf("web");
  const product = teamOf("product");
  const research = teamOf("ax");

  const papers = rowsOf("ax").map((row) => {
    const p = PAPERS[row.slug];
    const head = p.url ? `[${p.title}](${p.url})` : p.title;
    const status = p.status ? `, ${p.status.toLowerCase()}` : "";
    return `- ${head}: ${row.name}, ${row.meta.split(" · ")[0]}${status}. Authors: ${p.authors.join(", ")}.`;
  });

  const products = releases().map(({ article, name, line }) => {
    const repo = SOFTWARE[article.slug]?.repo;
    return `- [${name}](${absoluteUrl(hrefFor(article))}): ${line}${repo ? ` Code: ${repo}` : ""}`;
  });

  const stories = STORIES.map(
    (s) => `- [${s.article.title}](${absoluteUrl(storyHref(s.storySlug))}) (${s.article.date}): ${s.article.summary}`,
  );

  return `# ${ORG_NAME}

> ${TAGLINE} Founded in January 2026, with three teams: ${solutions.kicker}, ${product.kicker} and ${research.kicker}.

Every item below is on ${SITE_URL} or at the source it links. Papers are listed
once accepted. Versions and release dates are on the Products page.

## ${solutions.kicker}

${solutions.lead}

${rowsOf("web").map((r) => `- ${r.name}: ${plain(r.line)} ${plain(r.meta)}.`).join("\n")}

## ${research.kicker}

${research.lead} Accepted papers:

${papers.join("\n")}

## ${product.kicker}

${product.lead} Open-source releases:

${products.join("\n")}

## Story

${stories.join("\n")}

## Pages

- [Home](${SITE_URL}/): the three teams and their projects, releases and papers
- [About](${SITE_URL}/team): the founder's introduction, partners, sponsor (${SPONSORS.map((s) => s.name).join(", ")}), and history
- [Products](${SITE_URL}/notices): every released version, dated from the registry that serves it
- [Story](${SITE_URL}/story): one entry per event, each with the full account
- [WIGTN Tech](https://tech.wigtn.com/): technical reports, each with its method, measurements and limitations

## Contact

- Email: ${CONTACT_EMAIL}
- [GitHub](https://github.com/wigtn)
- [Hugging Face](https://huggingface.co/Wigtn)
- [LinkedIn](https://www.linkedin.com/company/wigtn)
- [npm](https://www.npmjs.com/org/wigtn)

## Optional

- [Full text](${SITE_URL}/llms-full.txt): history, figures from the technical reports, and a summary of every page
`;
}

/* Summarised from the WIGTN Tech reports linked under each entry. */
const RESEARCH_DETAILS = `### WIGVO, real-time speech translation over PSTN

- Problem: a telephone call gives you narrowband G.711 audio at 8 kHz, variable
  delay, and no control over the recipient's device, so translated speech played
  to the line returns and is recognized again. Eight of ten ungated test calls
  looped until interrupted by hand.
- Architecture: two directional sessions, one per speaker, with a three-stage
  filter between them. The echo gate replaces returning audio with valid mu-law
  silence rather than dropping packets, because dropping them reads to the far
  end as a dead stream.
- Reported: 555 ms median caller-to-callee latency over 814 turns; 2,684 ms in
  the other direction over 744 turns, where speech recognition dominates; zero
  echo-induced loops across 147 completed calls; USD 0.28 per minute on the
  evaluated provider stack. From 155 Korean-English calls over a live network.
- Stated limits: the field study is Korean-English over PSTN, not a broad
  language matrix; the callee-to-caller P95 is not yet acceptable for every
  conversation; evaluation used offline LLM references rather than human
  translations; cost reflects one provider configuration and pricing period.
- Venue: ACL 2026 System Demonstrations, accepted, pp. 336-344. An invited oral
  talk and poster followed at IWSLT 2026.
- Report: https://tech.wigtn.com/wigvo/

### WigtnOCR, a 2B document parser

- Method: a 30B teacher generated structured Markdown for 4,501 pages offline,
  a text-only judge scored and filtered it, and a 2B student was LoRA fine-tuned
  on what survived. 2,667 training pages, 294 held out.
- Reported on OmniDocBench: Table TEDS 0.649 against the teacher's 0.523. The
  teacher still leads formula CDM F1.
- Reported on KoGovDoc-Bench: Hit@1 0.739, Hit@5 0.855, MRR@10 0.788, first of
  six parsers on those three. It loses nDCG@10 to the untuned 2B base.
- Stated limits: the released artifact is a LoRA adapter, not merged weights;
  the student retains a skip rate; no controlled cost or throughput study has
  been published.
- Open: adapter, evaluation set and code, Apache 2.0.
- Report: https://tech.wigtn.com/wigtnocr/

### WIGTN plugins, multi-agent software workflows

- The published agent, skill and design-style counts describe the package
  surface. They are not a productivity result and are labelled as such.
- A controlled evaluation on two SWE-bench Verified tasks found GPT-5.6 Sol
  resolved 4/4 runs in each condition, with and without the legacy harness,
  while the harness increased median wall time by 151.7%, output tokens by
  141.2% and command count by 32.0%. The system was redesigned around selective,
  task-dependent intervention because of that result.
- Report: https://tech.wigtn.com/codex-selective-harness/

### WIGSS, visual editing that rewrites source

- Detects which of five CSS strategies a project uses and writes the change into
  that one: Tailwind utilities, CSS Modules, plain CSS or SCSS, HTML with a
  linked stylesheet, or inline React styles as a fallback.
- Every save produces a rollback token and compares the resulting DOM against
  the edited one within a two-pixel tolerance. A mismatch is surfaced as a
  warning rather than reported as a successful refactor.
- No controlled speed or code-quality benchmark has been published.
- Report: https://tech.wigtn.com/wigss/`;

export function llmsFull(): string {
  const history = MILESTONES.filter((m) => !m.placeholder)
    .slice()
    .reverse()
    .map((m) => `- ${m.date}: ${plain(m.title)}${m.text ? `. ${plain(m.text)}` : ""}`);

  const pages = ARTICLES.filter((a) => !a.placeholder && a.channel !== "blog").map((a) => {
    const meta = [a.date, a.place, a.version].filter(Boolean).join(", ");
    return `### ${a.title}\n\n${absoluteUrl(hrefFor(a))} (${meta})\n\n${a.summary}`;
  });

  return `${llmsIndex()}
## History

${history.join("\n")}

## Research details

${RESEARCH_DETAILS}

## Page summaries

${pages.join("\n\n")}
`;
}

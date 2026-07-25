"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  FileText,
  FlaskConical,
  Quote,
  User,
} from "lucide-react";
import {
  REPORT_BENCHMARKS,
  TECH_REPORTS,
  TECH_REPORTS_PAGE,
  articleHref,
  getArticle,
  type Block,
  type TechReportEntry,
} from "./data";
import { ResearchFooter, ResearchHeader } from "./ResearchChrome";

const STATUS_STYLE: Record<TechReportEntry["status"], string> = {
  Published: "border-[#A9C8B4] bg-[#EEF7F0] text-[#27643D]",
  "Public release": "border-[#B7C7DB] bg-[#EFF5FB] text-[#285A82]",
  "Research draft": "border-[#D8C58C] bg-[#FBF6E7] text-[#775E16]",
  Preliminary: "border-[#CECEC8] bg-[#F0F0EC] text-[#62625D]",
};

const SYSTEM_BY_SLUG: Record<string, string> = {
  wigtnocr: "WigtnOCR-2B",
  "wigtnocr-radp": "WigtnOCR-RADP",
  wigvo: "WIGVO",
  "wigvo-realtime-translation-video": "WIGVO",
  wigss: "WIGSS",
};

const LIMITATIONS: Record<string, string[]> = {
  wigtnocr: [
    "KoGovDoc retrieval uses a Korean government-document distribution and BGE-M3; performance can move under other domains, embedders, and chunking policies.",
    "OmniDocBench parsing metrics and KoGovDoc retrieval metrics answer different questions and should not be collapsed into a single overall score.",
    "The 4,501 pages describe the released research corpus before every downstream filtering and sampling decision.",
  ],
  "wigtnocr-radp": [
    "The RCPS study is a research draft, not a peer-reviewed publication. Claims and confidence intervals may change before release.",
    "The observed correlation uses a small parser set. It diagnoses a failure mode; it does not imply that intrinsic parsing metrics are never useful.",
    "Retrieval-grounded selection is specific to the target corpus and must be repeated when the domain, retriever, or answer policy changes.",
  ],
  wigvo: [
    "The field evaluation covers Korean–English calls over PSTN; wideband app-to-app audio and additional language pairs were outside the reported scope.",
    "Caller-to-callee and callee-to-caller latency are asymmetric because the PSTN direction is ASR-bound under G.711 audio.",
    "Cost reflects the evaluated provider stack and pricing period, not a permanent serving guarantee.",
  ],
  wigss: [
    "The public repository documents product behavior and supported CSS strategies, but it does not yet include a controlled benchmark artifact.",
    "Correctness, ranking quality, and layout safety need separate evaluation protocols before any aggregate product-quality claim is published.",
    "Performance metrics should remain unpublished until the dataset, evaluator, and reproducible logs are released together.",
  ],
  "why-we-distill-30b-into-2b": [
    "This note interprets the WigtnOCR release. It does not introduce a separate experiment or dataset.",
    "The evidence concerns structure-preserving document parsing on OmniDocBench and Korean government documents. It should not be generalized to unrelated model families or tasks.",
    "The released artifacts do not include a controlled serving-cost, throughput, or energy benchmark.",
  ],
  "wigtn-coding": [
    "Agent count and workflow stages describe system composition, not measured productivity or software quality.",
    "The documented sequential-versus-parallel timing is an operational observation; a controlled task-quality benchmark is still required.",
  ],
  "wigvo-realtime-translation-video": [
    "The field evaluation covers Korean-English calls over PSTN. Wideband app-to-app audio and additional language pairs were outside the reported scope.",
    "Caller-to-callee and callee-to-caller latency are asymmetric because the PSTN direction is ASR-bound under G.711 audio.",
    "Cost reflects the evaluated provider stack and pricing period, not a permanent serving guarantee.",
  ],
  "wigtn-flake-cortex-debate-video": [
    "The released evidence is a hackathon demonstration and award result, not a controlled benchmark of decision quality.",
    "Five agents, three actively selected datasets, and seven verified Cortex capabilities describe system composition. They are not accuracy or productivity metrics.",
    "The demonstrated goals and datasets cover the hackathon scenario and should not be treated as a general location-intelligence evaluation.",
  ],
};

const EVIDENCE_NOTES: Record<string, string> = {
  "why-we-distill-30b-into-2b":
    "This note uses the benchmark tables published with WigtnOCR. The independent evidence is shown in the main WigtnOCR model report; no additional experiment was run for this editorial note.",
  wigss:
    "The public repository documents the scan, edit, save, fidelity-check, and rollback paths. A controlled benchmark for refactor correctness, task time, or generated-code quality has not been released.",
  "wigtn-coding":
    "The repository verifies the workflow stages and package counts. A comparative evaluation against a single-agent workflow has not been published.",
  "wigtn-flake-cortex-debate-video":
    "The public evidence is the working demo and Snowflake's Tech Track second-place announcement. No controlled comparison of location recommendations has been released.",
};

function youtubeEmbedUrl(videoUrl?: string) {
  if (!videoUrl) return undefined;
  const videoId = videoUrl.match(/[?&]v=([^&]+)/)?.[1] ?? videoUrl.match(/youtu\.be\/([^?]+)/)?.[1];
  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0` : undefined;
}

function StatusBadge({ status }: { status: TechReportEntry["status"] }) {
  return (
    <span
      className={`inline-flex border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${STATUS_STYLE[status]}`}
    >
      {status}
    </span>
  );
}

function ReportBlock({ block }: { block: Block }) {
  switch (block.t) {
    case "h":
      return (
        <h3 className="mb-4 mt-12 font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#151515]">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-y border-[#CECEC8] py-8">
          <Quote size={20} strokeWidth={1.5} className="mb-4 text-brand-dark" />
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-[#202020]">
            {block.text}
          </p>
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="grid grid-cols-[1rem_1fr] gap-3 text-[1.03rem] leading-7 text-[#4F4F4A]">
              <span className="mt-3 h-1.5 w-1.5 bg-brand-dark" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="my-9">
          <img src={block.src} alt={block.alt ?? ""} className="w-full border border-[#D6D6D1] object-cover" />
          {block.caption && (
            <figcaption className="mt-3 font-mono text-[11px] leading-6 text-[#777771]">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "gallery": {
      const cols =
        block.images.length >= 3 ? "sm:grid-cols-3" : block.images.length === 2 ? "sm:grid-cols-2" : "";
      return (
        <figure className="my-9">
          <div className={`grid gap-3 ${cols}`}>
            {block.images.map((im, i) => (
              <div key={i}>
                <img
                  src={im.src}
                  alt={im.alt ?? ""}
                  className="aspect-[4/3] w-full border border-[#D6D6D1] object-cover"
                />
                {im.caption && <p className="mt-2 font-mono text-[10px] leading-5 text-[#8B8B85]">{im.caption}</p>}
              </div>
            ))}
          </div>
          {block.caption && (
            <figcaption className="mt-3 font-mono text-[11px] leading-6 text-[#777771]">{block.caption}</figcaption>
          )}
        </figure>
      );
    }
    default:
      return <p className="my-5 text-[1.05rem] leading-8 text-[#4F4F4A]">{block.text}</p>;
  }
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3 border-b border-[#CECEC8] pb-4">
      <span className="font-mono text-[10px] text-brand-dark">{number}</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#777771]">
        {children}
      </span>
    </div>
  );
}

function SuggestedCitation({ slug, title, date }: { slug: string; title: string; date: string }) {
  const year = date.slice(0, 4);
  const citation =
    slug === "wigvo"
      ? 'Kim, H. et al. (2026). "WIGVO: Real-Time Bidirectional Speech Translation over Legacy PSTN Calls via Dual-Session Echo Gating." ACL 2026 System Demonstrations.'
      : `WIGTN Research. (${year}). "${title}." WIGTN Technical Reports.`;

  return (
    <div className="border border-[#CECEC8] bg-[#F0F0EC] p-5">
      <code className="block whitespace-pre-wrap font-mono text-[11px] leading-6 text-[#565650]">
        {citation}
      </code>
    </div>
  );
}

export function TechnicalReportDetail({ slug }: { slug: string }) {
  const article = getArticle(slug);
  const entry = TECH_REPORTS.find((report) => report.article.slug === slug);

  if (!article || !entry) {
    return (
      <div className="min-h-screen bg-[#F8F8F5] text-[#151515]">
        <ResearchHeader />
        <main className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-display text-3xl font-semibold">Technical report not found</h1>
          <Link href={TECH_REPORTS_PAGE} className="mt-6 inline-flex items-center gap-2 text-brand-dark">
            <ArrowLeft size={16} /> Back to reports
          </Link>
        </main>
        <ResearchFooter />
      </div>
    );
  }

  const system = SYSTEM_BY_SLUG[slug];
  const benchmarkRows = system
    ? REPORT_BENCHMARKS.filter((row) => row.system === system)
    : [];
  const limitations = LIMITATIONS[slug] ?? [
    "The report describes the evaluated system and scope at publication time. Results should not be generalized beyond the linked evidence.",
  ];
  const related = TECH_REPORTS.filter(
    (candidate) => candidate.listed !== false && candidate.article.slug !== slug,
  ).slice(0, 3);
  const sourceLinks = article.links ?? [];
  const externalIsDuplicate = sourceLinks.some((link) => link.href === entry.externalUrl);
  const allSourceLinks = externalIsDuplicate
    ? sourceLinks
    : [...sourceLinks, { label: entry.externalLabel, href: entry.externalUrl }];
  const embedUrl = youtubeEmbedUrl(article.videoUrl);
  const evidenceNote =
    EVIDENCE_NOTES[slug] ??
    "No controlled performance benchmark is published for this report. The linked sources document the released system and its current evidence.";
  const titleSeparator = article.title.indexOf(":");
  const titleLabel =
    titleSeparator > -1 ? article.title.slice(0, titleSeparator) : entry.track;
  const titleText =
    titleSeparator > -1 ? article.title.slice(titleSeparator + 1).trim() : article.title;

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#151515] selection:bg-brand/20">
      <ResearchHeader />

      <main>
        <header className="border-b border-[#CECEC8]">
          <div className="mx-auto max-w-6xl px-6 pb-12 pt-10 md:pb-16 md:pt-14">
            <Link
              href={TECH_REPORTS_PAGE}
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#777771] hover:text-brand-dark"
            >
              <ArrowLeft size={13} />
              All reports
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <StatusBadge status={entry.status} />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-dark">
                {entry.track}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#8B8B85]">
                {entry.format}
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-balance font-display font-semibold">
              <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-brand-dark md:text-xs">
                {titleLabel}
              </span>
              <span className="mt-4 block text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.06] tracking-[-0.042em]">
                {titleText}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4F4F4A] md:text-xl">
              {article.summary}
            </p>

            <div className="mt-9 grid gap-6 border-t border-[#CECEC8] pt-6 md:grid-cols-[1fr_auto] md:items-end">
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#777771]">
                <span className="inline-flex items-center gap-2">
                  <User size={14} /> {article.author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar size={14} /> {article.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={14} /> {article.readTime ?? "Technical note"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FlaskConical size={14} /> {entry.scope}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {sourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-[#AFAFA9] px-4 py-2 text-xs font-medium hover:border-[#151515]"
                  >
                    {link.label} <ArrowUpRight size={13} />
                  </a>
                ))}
                {!externalIsDuplicate && (
                  <a
                    href={entry.externalUrl}
                    target={entry.externalUrl.startsWith("http") ? "_blank" : undefined}
                    rel={entry.externalUrl.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 border border-[#AFAFA9] px-4 py-2 text-xs font-medium hover:border-[#151515]"
                  >
                    {entry.externalLabel} <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>

            {entry.metrics && (
              <div className="mt-8 grid border border-[#CECEC8] sm:grid-cols-2 lg:grid-cols-4">
                {entry.metrics.map((metric, index) => (
                  <div
                    key={metric}
                    className={`p-4 sm:p-5 ${
                      index > 0 ? "border-t border-[#CECEC8] sm:border-l sm:border-t-0" : ""
                    } ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#92928C]">
                      Key fact {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong className="mt-2 block font-display text-xl font-semibold text-brand-dark">
                      {metric}
                    </strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        {article.video && embedUrl && (
          <section aria-label={`${article.title} video`} className="border-b border-[#CECEC8]">
            <div className="mx-auto max-w-6xl px-6 py-8 md:py-12">
              <div className="aspect-video overflow-hidden border border-[#AFAFA9] bg-[#111111]">
                <iframe
                  src={embedUrl}
                  title={`${article.title} video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.1em] text-[#777771]">
                <span>WIGTN video report</span>
                <a
                  href={article.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-brand-dark"
                >
                  Open on YouTube <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          </section>
        )}

        <nav className="sticky top-16 z-30 border-b border-[#D6D6D1] bg-[#F8F8F5]/94 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-7 gap-y-2 px-6 py-4 font-mono text-[9px] uppercase tracking-[0.12em] text-[#777771]">
            {[
              ["Abstract", "#abstract"],
              ["Method", "#method"],
              ["Evidence", "#results"],
              ["Limitations", "#limitations"],
              ["Sources", "#sources"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="shrink-0 hover:text-brand-dark">
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 md:py-20 lg:grid-cols-[11rem_minmax(0,48rem)] lg:justify-between">
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#8B8B85]">
                Contents
              </span>
              <ol className="mt-5 space-y-4 font-mono text-[10px] text-[#777771]">
                {[
                  ["01", "Abstract", "#abstract"],
                  ["02", "Method", "#method"],
                  ["03", "Evidence", "#results"],
                  ["04", "Limitations", "#limitations"],
                  ["05", "Sources", "#sources"],
                ].map(([number, label, href]) => (
                  <li key={href}>
                    <a href={href} className="grid grid-cols-[1.7rem_1fr] gap-2 hover:text-[#151515]">
                      <span className="text-brand-dark">{number}</span>
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article className="min-w-0">
            <section id="abstract" className="scroll-mt-36">
              <SectionLabel number="01">Abstract</SectionLabel>
              <p className="max-w-2xl text-[1.15rem] leading-8 text-[#3F3F3A] md:text-[1.3rem] md:leading-9">
                {article.summary}
              </p>
              <div className="mt-8 border-l-2 border-brand-dark pl-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-dark">
                  Evaluation scope
                </span>
                <p className="mt-2 text-sm leading-6 text-[#62625D]">{entry.scope}</p>
              </div>
              {article.sourceNote && (
                <div className="mt-6 border border-[#CECEC8] bg-[#F0F0EC] p-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-dark">
                    Source note
                  </span>
                  <p className="mt-2 text-sm leading-6 text-[#565650]">{article.sourceNote}</p>
                </div>
              )}
            </section>

            <section id="method" className="mt-16 scroll-mt-36">
              <SectionLabel number="02">Method & findings</SectionLabel>
              {article.body.map((block, index) => (
                <ReportBlock key={index} block={block} />
              ))}
            </section>

            <section id="results" className="mt-20 scroll-mt-36">
              <SectionLabel number="03">
                {benchmarkRows.length > 0 ? "Benchmark results" : "Evidence status"}
              </SectionLabel>
              {benchmarkRows.length > 0 ? (
                <div className="border border-[#CECEC8]">
                  <div className="hidden grid-cols-[1fr_0.8fr_0.7fr_1.25fr] gap-4 border-b border-[#CECEC8] bg-[#F0F0EC] px-5 py-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#777771] sm:grid">
                    <span>Benchmark</span>
                    <span>Metric</span>
                    <span>Result</span>
                    <span>Comparison / scope</span>
                  </div>
                  {benchmarkRows.map((row) => (
                    <a
                      key={`${row.benchmark}-${row.metric}`}
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                      className="grid gap-4 border-b border-[#CECEC8] px-5 py-5 last:border-b-0 hover:bg-white/65 sm:grid-cols-[1fr_0.8fr_0.7fr_1.25fr] sm:items-center"
                    >
                      <span className="font-display text-base font-semibold">{row.benchmark}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#777771]">
                        {row.metric}
                      </span>
                      <strong className="font-display text-2xl font-semibold text-brand-dark">
                        {row.result}
                      </strong>
                      <span>
                        <span className="block text-sm text-[#4F4F4A]">{row.comparison}</span>
                        <span className="mt-1 block font-mono text-[8px] leading-5 text-[#92928C]">
                          {row.scope}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="border border-[#CECEC8] bg-[#F0F0EC] p-6 text-sm leading-7 text-[#62625D]">
                  {evidenceNote}
                </div>
              )}
            </section>

            <section id="limitations" className="mt-20 scroll-mt-36">
              <SectionLabel number="04">Limitations</SectionLabel>
              <div className="border-y border-[#CECEC8]">
                {limitations.map((limitation, index) => (
                  <div
                    key={limitation}
                    className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#CECEC8] py-5 last:border-b-0"
                  >
                    <span className="font-mono text-[10px] text-brand-dark">
                      L{String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.98rem] leading-7 text-[#4F4F4A]">{limitation}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="sources" className="mt-20 scroll-mt-36">
              <SectionLabel number="05">Sources & reproducibility</SectionLabel>
              <div className="divide-y divide-[#CECEC8] border-y border-[#CECEC8]">
                {allSourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-5 py-5"
                  >
                    <span className="inline-flex min-w-0 items-center gap-3">
                      <FileText size={16} strokeWidth={1.5} className="shrink-0 text-brand-dark" />
                      <span className="min-w-0">
                        <strong className="block font-display text-base font-semibold">
                          {link.label}
                        </strong>
                        <span className="mt-1 block truncate font-mono text-[8px] text-[#92928C]">
                          {link.href}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight size={15} className="shrink-0 text-[#92928C] group-hover:text-brand-dark" />
                  </a>
                ))}
              </div>

              <h3 className="mb-4 mt-12 font-display text-xl font-semibold">Suggested citation</h3>
              <SuggestedCitation slug={slug} title={article.title} date={article.date} />
            </section>
          </article>
        </div>

        <section className="border-t border-[#CECEC8]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex items-center justify-between border-b border-[#AFAFA9] pb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#777771]">
                More reports
              </span>
              <Link href={TECH_REPORTS_PAGE} className="inline-flex items-center gap-2 text-xs hover:text-brand-dark">
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div>
              {related.map((candidate) => (
                <Link
                  key={candidate.article.slug}
                  href={articleHref(candidate.article.slug)}
                  className="group grid gap-3 border-b border-[#D6D6D1] py-5 sm:grid-cols-[7rem_1fr_auto] sm:items-center"
                >
                  <span className="font-mono text-[9px] text-[#8B8B85]">
                    {candidate.article.date}
                  </span>
                  <strong className="font-display text-lg font-semibold group-hover:text-brand-dark">
                    {candidate.article.title}
                  </strong>
                  <ArrowRight size={15} className="text-[#92928C] group-hover:text-brand-dark" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ResearchFooter />
    </div>
  );
}

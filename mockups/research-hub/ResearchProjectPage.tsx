import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import {
  RESEARCH_PROJECTS,
  getResearchProject,
  researchHref,
  type ResearchFigure,
  type ResearchStatus,
  type ResearchTable,
} from "./data";
import { ResearchShell } from "./ResearchChrome";

const STATUS_STYLE: Record<ResearchStatus, string> = {
  "Peer reviewed": "border-[#97B6A2] bg-[#EDF5EF] text-[#285D3A]",
  "Open model": "border-[#AFC3D8] bg-[#EEF4F9] text-[#315B80]",
  "Measured system": "border-[#BFA9D8] bg-[#F4EFF8] text-[#6B2EAA]",
  "Engineering note": "border-[#C8C6BE] bg-[#F0EFEA] text-[#5E5C55]",
  "Case study": "border-[#D4BE85] bg-[#F8F2E3] text-[#765B14]",
};

function Status({ status }: { status: ResearchStatus }) {
  return (
    <span
      className={`inline-flex border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] ${STATUS_STYLE[status]}`}
    >
      {status}
    </span>
  );
}

function Figure({ figure }: { figure: ResearchFigure }) {
  return (
    <figure className={`my-9 ${figure.portrait ? "max-w-xl" : "max-w-[46rem]"}`}>
      <div
        className={`relative overflow-hidden border border-[#D9D6CF] bg-white ${
          figure.portrait ? "aspect-[4/5]" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          fill
          sizes="(min-width: 1024px) 736px, 100vw"
          className={figure.contain ? "object-contain p-3 md:p-7" : "object-cover"}
        />
      </div>
      <figcaption className="mt-3 grid grid-cols-[2.4rem_1fr] gap-3 font-mono text-[9px] leading-5 text-[#777584]">
        <span className="text-[#9B51E0]">FIG.</span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}

function DataTable({ table }: { table: ResearchTable }) {
  return (
    <div className="my-10">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#777584]">
        {table.caption}
      </p>
      <div className="overflow-x-auto border border-[#D9D6CF] bg-white">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead className="bg-[#EFEEE9]">
            <tr>
              {table.headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-[#D9D6CF] px-4 py-3 font-mono text-[8px] font-medium uppercase tracking-[0.1em] text-[#777584]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={`${row.cells[0]}-${rowIndex}`}
                className={row.highlight ? "bg-[#F4EFF8]" : undefined}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className={`border-b border-[#E4E1DB] px-4 py-3 text-sm leading-5 last:border-r-0 ${
                      cellIndex === 0 ? "font-medium text-[#1E1E28]" : "text-[#5E5C68]"
                    } ${row.highlight ? "font-semibold text-[#6B2EAA]" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function youtubeEmbedUrl(url: string) {
  const id = url.match(/[?&]v=([^&]+)/)?.[1] ?? url.match(/youtu\.be\/([^?]+)/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : undefined;
}

export function ResearchProjectPage({ slug }: { slug: string }) {
  const project = getResearchProject(slug);

  if (!project) {
    return (
      <ResearchShell>
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <h1 className="font-display text-4xl font-semibold">Research project not found</h1>
          <Link href="/research/" className="mt-8 inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={15} /> Back to research
          </Link>
        </div>
      </ResearchShell>
    );
  }

  const videoLink = project.links.find((link) => link.href.includes("youtube.com"));
  const embedUrl = videoLink ? youtubeEmbedUrl(videoLink.href) : undefined;
  const related = RESEARCH_PROJECTS.filter((candidate) => candidate.slug !== slug).slice(0, 3);

  return (
    <ResearchShell>
      <header className="border-b border-[#D9D6CF]">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:px-8 md:pb-14 md:pt-10">
          <Link
            href="/research/"
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[#777584] transition-colors hover:text-[#6B2EAA]"
          >
            <ArrowLeft size={12} /> Research archive
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Status status={project.status} />
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#777584]">
                  {project.track}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#9A98A2]">
                  {project.format}
                </span>
              </div>
              <p className="mt-6 font-display text-lg font-semibold tracking-[-0.025em] text-[#6B2EAA] md:text-xl">
                {project.shortTitle}
              </p>
              <h1 className="mt-3 max-w-4xl text-balance font-display text-[clamp(2.45rem,4.5vw,4.35rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-[#5E5C68] md:text-lg md:leading-8">
                {project.dek}
              </p>
            </div>

            <div className="border-l-2 border-[#9B51E0] pl-5 font-mono text-[9px] leading-5 text-[#777584]">
              <p>{project.authors}</p>
              <p className="mt-2">{project.date}</p>
              {project.venue && <p className="mt-2 text-[#6B2EAA]">{project.venue}</p>}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-[#D9D6CF] pt-5">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors ${
                  link.primary
                    ? "bg-[#1E1E28] text-white hover:bg-[#6B2EAA]"
                    : "border border-[#AAA7A0] hover:border-[#1E1E28]"
                }`}
              >
                {link.href.includes("youtube.com") && <Play size={12} fill="currentColor" />}
                {link.label} <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="border-b border-[#D9D6CF] bg-white">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`p-5 md:p-6 ${
                index > 0 ? "border-t border-[#D9D6CF] sm:border-l sm:border-t-0" : ""
              } ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
            >
              <strong className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#6B2EAA] md:text-3xl">
                {metric.value}
              </strong>
              <span className="mt-3 block text-sm font-semibold">{metric.label}</span>
              <span className="mt-1 block text-xs leading-5 text-[#777584]">{metric.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <nav className="sticky top-16 z-40 border-b border-[#D9D6CF] bg-[#F7F6F2]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-2 px-5 py-3 font-mono text-[8px] uppercase tracking-[0.11em] text-[#777584] md:px-8">
          {project.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="hover:text-[#6B2EAA]">
              {section.index} {section.eyebrow}
            </a>
          ))}
          <a href="#limitations" className="hover:text-[#6B2EAA]">
            {String(project.sections.length + 1).padStart(2, "0")} Limitations
          </a>
          <a href="#sources" className="hover:text-[#6B2EAA]">
            {String(project.sections.length + 2).padStart(2, "0")} Sources
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[11rem_minmax(0,52rem)] lg:justify-between">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#777584]">
                Contents
              </span>
              <ol className="mt-5 space-y-3">
                {project.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="grid grid-cols-[1.7rem_1fr] gap-2 font-mono text-[9px] leading-5 text-[#777584] hover:text-[#1E1E28]"
                    >
                      <span className="text-[#9B51E0]">{section.index}</span>
                      <span>{section.eyebrow}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article className="min-w-0">
            {project.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 border-t border-[#AAA7A0] py-14 first:pt-0 md:py-20"
              >
                <div className="mb-9 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.13em] text-[#777584]">
                  <span className="text-[#9B51E0]">{section.index}</span>
                  <span>{section.eyebrow}</span>
                </div>
                <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                  {section.title}
                </h2>
                {section.lead && (
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4F4D59]">
                    {section.lead}
                  </p>
                )}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-6 max-w-[46rem] text-[1.03rem] leading-8 text-[#5E5C68]">
                    {paragraph}
                  </p>
                ))}

                {project.heroFigure && project.heroSectionId === section.id && (
                  <Figure figure={project.heroFigure} />
                )}

                {section.steps && (
                  <div className="mt-10 border-y border-[#D9D6CF]">
                    {section.steps.map((step) => (
                      <div
                        key={`${section.id}-${step.label}`}
                        className="grid gap-3 border-b border-[#D9D6CF] py-5 last:border-b-0 sm:grid-cols-[6rem_12rem_minmax(0,1fr)]"
                      >
                        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#9B51E0]">
                          {step.label}
                        </span>
                        <strong className="font-display text-base font-semibold">{step.title}</strong>
                        <p className="text-sm leading-6 text-[#66646F]">{step.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.figures?.map((figure) => (
                  <Figure key={figure.src} figure={figure} />
                ))}
                {section.table && <DataTable table={section.table} />}

                {section.bullets && (
                  <ul className="mt-8 border-y border-[#D9D6CF]">
                    {section.bullets.map((bullet, index) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#D9D6CF] py-5 last:border-b-0"
                      >
                        <span className="font-mono text-[9px] text-[#9B51E0]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.98rem] leading-7 text-[#5E5C68]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <div className="mt-10 border-l-2 border-[#9B51E0] bg-[#F0EDF3] px-5 py-5 md:px-7">
                    <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-[#6B2EAA]">
                      {section.callout.label}
                    </span>
                    <p className="mt-3 text-base leading-7 text-[#494753]">{section.callout.text}</p>
                  </div>
                )}
              </section>
            ))}

            {embedUrl && (
              <section className="border-t border-[#AAA7A0] py-14 md:py-20">
                <div className="mb-7 font-mono text-[9px] uppercase tracking-[0.13em] text-[#777584]">
                  System video
                </div>
                <div className="aspect-video max-w-[42rem] overflow-hidden border border-[#AAA7A0] bg-[#15151E]">
                  <iframe
                    src={embedUrl}
                    title={`${project.shortTitle} system video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            <section id="limitations" className="scroll-mt-32 border-t border-[#AAA7A0] py-14 md:py-20">
              <div className="mb-9 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.13em] text-[#777584]">
                <span className="text-[#9B51E0]">
                  {String(project.sections.length + 1).padStart(2, "0")}
                </span>
                <span>Limitations</span>
              </div>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">
                Where the claim stops
              </h2>
              <ul className="mt-8 border-y border-[#D9D6CF]">
                {project.limitations.map((limitation, index) => (
                  <li
                    key={limitation}
                    className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#D9D6CF] py-5 last:border-b-0"
                  >
                    <span className="font-mono text-[9px] text-[#9B51E0]">
                      L{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.98rem] leading-7 text-[#5E5C68]">{limitation}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="sources" className="scroll-mt-32 border-t border-[#AAA7A0] py-14 md:py-20">
              <div className="mb-9 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.13em] text-[#777584]">
                <span className="text-[#9B51E0]">
                  {String(project.sections.length + 2).padStart(2, "0")}
                </span>
                <span>Sources & citation</span>
              </div>
              <div className="divide-y divide-[#D9D6CF] border-y border-[#D9D6CF]">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-5 py-5"
                  >
                    <span>
                      <strong className="block text-sm font-semibold">{link.label}</strong>
                      <span className="mt-1 block break-all font-mono text-[8px] leading-4 text-[#8B8995]">
                        {link.href}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-[#9B51E0] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
              <div className="mt-10 border border-[#D9D6CF] bg-white p-5">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#6B2EAA]">
                  Suggested citation
                </span>
                <code className="mt-3 block whitespace-pre-wrap font-mono text-[10px] leading-6 text-[#5E5C68]">
                  {project.citation}
                </code>
              </div>
            </section>
          </article>
        </div>
      </div>

      <section className="border-t border-[#D9D6CF] bg-[#EFEEE9]">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="mb-6 flex items-end justify-between border-b border-[#AAA7A0] pb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-[#777584]">
              Continue reading
            </span>
            <Link href="/research/" className="text-xs font-medium">
              All projects
            </Link>
          </div>
          <div className="grid gap-0 md:grid-cols-3">
            {related.map((candidate) => (
              <Link
                key={candidate.slug}
                href={researchHref(candidate.slug)}
                className="group border-b border-[#D9D6CF] py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#6B2EAA]">
                  {candidate.status}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.03em]">
                  {candidate.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#66646F]">{candidate.title}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium">
                  Read report{" "}
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ResearchShell>
  );
}

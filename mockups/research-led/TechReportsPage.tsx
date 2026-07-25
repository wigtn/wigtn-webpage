import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  RESEARCH_PROJECTS,
  researchHref,
  type ResearchProject,
  type ResearchStatus,
} from "@/mockups/research-hub/data";
import { ResearchFooter, ResearchHeader } from "./ResearchChrome";

const STATUS_STYLE: Record<ResearchStatus, string> = {
  "Peer reviewed": "border-[#97B6A2] bg-[#EDF5EF] text-[#285D3A]",
  "Open model": "border-[#AFC3D8] bg-[#EEF4F9] text-[#315B80]",
  "Measured system": "border-[#BFA9D8] bg-[#F4EFF8] text-[#6B2EAA]",
  "Engineering note": "border-[#C8C6BE] bg-[#F0EFEA] text-[#5E5C55]",
  "Case study": "border-[#D4BE85] bg-[#F8F2E3] text-[#765B14]",
};

function StatusBadge({ status }: { status: ResearchStatus }) {
  return (
    <span
      className={`inline-flex w-fit border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.11em] ${STATUS_STYLE[status]}`}
    >
      {status}
    </span>
  );
}

function ReportRow({ project, index }: { project: ResearchProject; index: number }) {
  return (
    <article className="group border-t border-[#D6D6D1] last:border-b">
      <Link
        href={researchHref(project.slug)}
        className="grid gap-5 py-7 transition-colors hover:bg-white/65 md:grid-cols-[7.5rem_minmax(0,1fr)_1.5rem] md:px-3"
      >
        <div className="flex items-start justify-between gap-3 md:block">
          <span className="font-mono text-[10px] text-[#777771]">{project.date}</span>
          <span className="font-mono text-[9px] text-[#A0A09A] md:mt-4 md:block">
            R-{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#777771]">
              {project.track}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#A0A09A]">
              {project.format}
            </span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#151515] transition-colors group-hover:text-brand-dark md:text-[2rem]">
            {project.shortTitle}
          </h2>
          <p className="mt-1 max-w-3xl text-base font-medium leading-6 text-[#3F3F3A]">
            {project.title}
          </p>
          <p className="mt-3 max-w-3xl text-[0.95rem] leading-6 text-[#62625D]">
            {project.dek}
          </p>
          <p className="mt-4 font-mono text-[8px] leading-5 text-[#8B8B85]">
            {project.metrics
              .slice(0, 3)
              .map((metric) => `${metric.value} ${metric.label}`)
              .join(" · ")}
          </p>
        </div>

        <ArrowRight
          size={18}
          className="hidden self-center text-[#A0A09A] transition-transform group-hover:translate-x-1 group-hover:text-brand-dark md:block"
        />
      </Link>
    </article>
  );
}

export function TechReportsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#151515] selection:bg-brand/20">
      <ResearchHeader />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12 md:pt-16">
        <div className="grid gap-8 border-b border-[#AFAFA9] pb-9 md:grid-cols-[minmax(0,1fr)_17rem] md:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-dark">
              WIGTN Research
            </span>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.045em]">
              Tech Reports
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#62625D]">
              A concise index on wigtn.com. Full methods, figures, benchmarks and
              reproducibility notes live in the research archive.
            </p>
          </div>
          <Link
            href="/research/"
            className="inline-flex items-center justify-between border border-[#151515] bg-[#151515] px-4 py-3 text-xs font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Open research archive <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D6D6D1] py-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#777771]">
          <span>{RESEARCH_PROJECTS.length} canonical reports</span>
          <span>Updated 2026.07</span>
        </div>

        <section aria-label="Technical report list" className="pt-4">
          {RESEARCH_PROJECTS.map((project, index) => (
            <ReportRow key={project.slug} project={project} index={index} />
          ))}
        </section>
      </main>

      <ResearchFooter />
    </div>
  );
}

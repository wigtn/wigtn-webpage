import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  RESEARCH_PROJECTS,
  researchHref,
  type ResearchStatus,
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

function ProjectRow({
  project,
  index,
}: {
  project: (typeof RESEARCH_PROJECTS)[number];
  index: number;
}) {
  return (
    <article className="group border-t border-[#D9D6CF] last:border-b">
      <Link
        href={researchHref(project.slug)}
        className="grid gap-5 py-7 transition-colors hover:bg-white/55 md:grid-cols-[5rem_12rem_minmax(0,1fr)_auto] md:items-start md:px-3"
      >
        <span className="font-mono text-[9px] text-[#777584]">
          R-{String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <Status status={project.status} />
          <span className="mt-3 block font-mono text-[8px] uppercase tracking-[0.1em] text-[#8B8995]">
            {project.format}
          </span>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">
            {project.shortTitle}
          </h3>
          <p className="mt-1 text-base font-medium text-[#3E3D49]">{project.title}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#66646F]">{project.dek}</p>
        </div>
        <ArrowRight
          size={18}
          className="hidden text-[#9B51E0] transition-transform group-hover:translate-x-1 md:block"
        />
      </Link>
    </article>
  );
}

export function ResearchHubPage() {
  return (
    <ResearchShell>
      <header className="border-b border-[#D9D6CF]">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pb-14 md:pt-14">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B2EAA]">
                WIGTN Research
              </span>
              <h1 className="mt-3 max-w-5xl font-display text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                Research archive
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5E5C68] md:text-lg">
                Papers, model reports and engineering notes with protocols,
                failure modes and artifacts behind each claim.
              </p>
            </div>
            <div className="border-l border-[#AAA7A0] pl-5">
              <p className="font-mono text-[9px] leading-5 text-[#777584]">
                Evidence status, evaluation scope and source are shown on every report.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="projects" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
          <div>
            {RESEARCH_PROJECTS.map((project, index) => (
              <ProjectRow key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="standards" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6B2EAA]">
                Evidence standard
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.04em]">
                Different pages make different promises.
              </h2>
            </div>
            <div className="grid gap-px border border-[#D9D6CF] bg-[#D9D6CF] sm:grid-cols-2">
              {[
                ["Peer reviewed", "Venue, full protocol, results, limitations and citation."],
                ["Open model", "Weights or code plus released evaluation artifacts."],
                ["Measured system", "Live or offline metrics with an explicit sample and evaluator."],
                ["Engineering note", "Architecture and implementation facts without comparative performance claims."],
              ].map(([title, body]) => (
                <div key={title} className="bg-[#F7F6F2] p-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6B2EAA]">
                    {title}
                  </span>
                  <p className="mt-3 text-sm leading-6 text-[#5E5C68]">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex justify-end">
            <a
              href="https://github.com/wigtn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-[#1E1E28] pb-1 text-sm font-medium"
            >
              Browse WIGTN source <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </ResearchShell>
  );
}

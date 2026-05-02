"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/constants/projects";
import { GitHubIcon, YouTubeIcon, HuggingFaceIcon } from "@/components/ui/icons";

interface ResearchTableProps {
  projects: readonly Project[];
}

/**
 * Research view — compact data table. Papers are best displayed as a list
 * with venue and acceptance status, not as cards. Click a row to open the
 * project detail page.
 *
 * Status pill is derived from the `publication` string when present:
 *   "(accepted)" → ACCEPTED (violet)
 *   "(in preparation)" / "(in prep)" → IN PREP (gray)
 *   "(submitted)" → SUBMITTED (gray)
 *   anything else → falls back to the raw string
 */
function deriveStatus(publication?: string): { label: string; tone: "violet" | "gray" } {
  if (!publication) return { label: "—", tone: "gray" };
  const lower = publication.toLowerCase();
  if (lower.includes("accepted")) return { label: "Accepted", tone: "violet" };
  if (lower.includes("in preparation") || lower.includes("in prep"))
    return { label: "In Prep", tone: "gray" };
  if (lower.includes("submitted")) return { label: "Submitted", tone: "gray" };
  return { label: publication, tone: "gray" };
}

function deriveVenue(publication?: string): string {
  if (!publication) return "—";
  // Strip the trailing parenthetical status — leaves the venue clean.
  return publication.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

export function ResearchTable({ projects }: ResearchTableProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        No research projects yet.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.07] bg-white">
      {/* Desktop table */}
      <table className="hidden md:table w-full text-sm">
        <thead>
          <tr className="border-b border-black/[0.06] bg-gray-50/60">
            <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 w-[32%]">
              Project
            </th>
            <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Venue
            </th>
            <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 w-[16%]">
              Status
            </th>
            <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 w-[16%]">
              Links
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const status = deriveStatus(project.publication);
            const venue = deriveVenue(project.publication);
            return (
              <tr
                key={project.id}
                className="border-b border-black/[0.04] last:border-b-0 hover:bg-violet/[0.03] transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Thumbnail project={project} />
                    <div className="min-w-0">
                      <Link
                        href={`/projects/${project.slug}/`}
                        className="font-semibold text-foreground hover:text-violet transition-colors"
                      >
                        {project.name}
                      </Link>
                      <p className="mt-1 text-[12.5px] text-gray-500 leading-snug line-clamp-2 max-w-sm">
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-700">{venue}</td>
                <td className="px-5 py-4">
                  <StatusPill label={status.label} tone={status.tone} />
                </td>
                <td className="px-5 py-4">
                  <ProjectLinks project={project} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile stacked cards — same data, vertical layout. */}
      <ul className="md:hidden divide-y divide-black/[0.06]">
        {projects.map((project) => {
          const status = deriveStatus(project.publication);
          const venue = deriveVenue(project.publication);
          return (
            <li key={project.id} className="px-5 py-4">
              <Link href={`/projects/${project.slug}/`} className="block">
                <div className="flex items-start gap-3">
                  <Thumbnail project={project} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-semibold text-foreground">
                        {project.name}
                      </span>
                      <StatusPill label={status.label} tone={status.tone} />
                    </div>
                    <p className="mt-1 text-[12.5px] text-gray-500 leading-snug">
                      {project.tagline}
                    </p>
                    <p className="mt-2 text-[12px] text-gray-700">{venue}</p>
                    <div className="mt-2.5">
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Thumbnail({ project }: { project: Project }) {
  const src = project.media.poster;
  if (!src) {
    return (
      <span className="block w-12 h-12 rounded-md border border-black/[0.07] bg-gray-50 flex-shrink-0" />
    );
  }
  return (
    <span className="relative block w-12 h-12 rounded-md overflow-hidden border border-black/[0.07] bg-gray-50 flex-shrink-0">
      <Image
        src={src}
        alt=""
        fill
        sizes="48px"
        className="object-cover"
        unoptimized
      />
    </span>
  );
}

function StatusPill({ label, tone }: { label: string; tone: "violet" | "gray" }) {
  const cls =
    tone === "violet"
      ? "border-violet/40 bg-violet/[0.08] text-violet"
      : "border-black/[0.10] bg-white text-gray-600";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-mono font-semibold tracking-[0.12em] uppercase ${cls}`}
    >
      {label}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const items: { key: string; href: string; icon: React.ReactNode; label: string }[] = [];
  if (project.links.github)
    items.push({ key: "gh", href: project.links.github, icon: <GitHubIcon className="w-3.5 h-3.5" />, label: "GitHub" });
  if (project.links.huggingface)
    items.push({ key: "hf", href: project.links.huggingface, icon: <HuggingFaceIcon className="w-3.5 h-3.5 rounded-full" />, label: "HF" });
  if (project.links.video)
    items.push({ key: "yt", href: project.links.video, icon: <YouTubeIcon className="w-3.5 h-3.5 text-red-600" />, label: "Video" });
  if (items.length === 0) return <span className="text-[12px] text-gray-400">—</span>;
  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — ${item.label}`}
          className="inline-flex items-center gap-1 text-[12px] text-gray-500 hover:text-violet transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {item.icon}
          <span className="hidden lg:inline">{item.label}</span>
        </a>
      ))}
    </div>
  );
}

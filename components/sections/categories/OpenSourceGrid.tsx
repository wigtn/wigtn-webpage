"use client";

import type { Project } from "@/constants/projects";
import { GitHubIcon } from "@/components/ui/icons";
import { CategoryCard, type CategoryCardLink } from "./CategoryCard";

interface OpenSourceGridProps {
  projects: readonly Project[];
}

function metaFor(project: Project): string | null {
  // Prefer a recognisable `npm:` / `github.com/...` line over an
  // empty meta slot — keeps the third info line consistent across cards.
  if (project.links.live?.startsWith("https://npmjs.com/package/")) {
    const pkg = project.links.live.replace("https://npmjs.com/package/", "");
    return `npm · ${pkg}`;
  }
  if (project.links.github) {
    return project.links.github.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
  return null;
}

function badgeFor(project: Project): { label: string; tone: "sky" | "gray" } {
  if (project.links.live?.startsWith("https://npmjs.com/package/")) {
    return { label: "NPM", tone: "sky" };
  }
  return { label: "Open Source", tone: "sky" };
}

function linksFor(project: Project): CategoryCardLink[] {
  const out: CategoryCardLink[] = [];
  if (project.links.github) out.push({ kind: "github", href: project.links.github });
  if (project.links.live?.startsWith("https://npmjs.com/package/")) {
    out.push({ kind: "npm", href: project.links.live });
  } else if (project.links.live) {
    out.push({ kind: "live", href: project.links.live });
  }
  return out;
}

export function OpenSourceGrid({ projects }: OpenSourceGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        No open-source projects yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
      {projects.map((project) => (
        <CategoryCard
          key={project.id}
          slug={project.slug}
          name={project.name}
          description={project.tagline}
          meta={metaFor(project)}
          badge={badgeFor(project)}
          links={linksFor(project)}
          visualClassName="bg-gradient-to-br from-sky-50 to-sky-100"
          visual={<GitHubIcon className="w-16 h-16 text-sky-700/80" />}
        />
      ))}
    </div>
  );
}

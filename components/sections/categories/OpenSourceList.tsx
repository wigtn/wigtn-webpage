"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/constants/projects";
import { GitHubIcon } from "@/components/ui/icons";

interface OpenSourceListProps {
  projects: readonly Project[];
}

/**
 * Open Source view — GitHub-style vertical list. Open-source repos read
 * best as a feed of "name · description · stars" rather than as cards.
 *
 * The `Project` type doesn't carry stars/language metadata yet, so this
 * view shows only what's available (repo name, tagline, GitHub link, and
 * an `npm install` hint when the live URL points at npmjs.com). When we
 * later add `Project.openSourceMeta`, those fields slot in here.
 */
export function OpenSourceList({ projects }: OpenSourceListProps) {
  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gray-500">
        No open-source projects yet.
      </p>
    );
  }

  return (
    <ul className="rounded-xl border border-black/[0.07] bg-white overflow-hidden divide-y divide-black/[0.06]">
      {projects.map((project) => {
        const githubHref = project.links.github;
        const liveHref = project.links.live;
        const npmName = liveHref?.startsWith("https://npmjs.com/package/")
          ? liveHref.replace("https://npmjs.com/package/", "")
          : undefined;

        return (
          <li
            key={project.id}
            className="group transition-colors hover:bg-violet/[0.03]"
          >
            <a
              href={githubHref ?? `/projects/${project.slug}/`}
              target={githubHref ? "_blank" : undefined}
              rel={githubHref ? "noopener noreferrer" : undefined}
              className="flex items-start gap-4 px-4 md:px-5 py-4 md:py-5"
            >
              {/* Repo icon */}
              <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-md border border-black/[0.08] bg-white text-gray-600 flex-shrink-0">
                <GitHubIcon className="w-4 h-4" />
              </span>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[15px] md:text-base font-semibold text-foreground group-hover:text-violet transition-colors">
                    {project.name}
                  </span>
                  {npmName && (
                    <span className="text-[10.5px] font-mono tracking-wide text-gray-500 border border-black/[0.08] rounded px-1.5 py-0.5">
                      npm
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[13px] text-gray-600 leading-snug">
                  {project.tagline}
                </p>
                {npmName && (
                  <code className="mt-2 inline-block text-[11.5px] font-mono text-gray-500 bg-gray-50 border border-black/[0.06] rounded px-2 py-0.5">
                    npm install {npmName}
                  </code>
                )}
              </div>

              {/* External arrow */}
              <ArrowUpRight className="mt-1 w-4 h-4 text-gray-400 group-hover:text-violet transition-colors flex-shrink-0" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

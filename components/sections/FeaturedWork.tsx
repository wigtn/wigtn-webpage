"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  FEATURED_PROJECTS,
  PROJECTS,
  type Project,
  type Section,
} from "@/constants/projects";
import { ProjectRow } from "@/components/projects";

/**
 * Maps a project's section to the ProjectRow list variant. Products are not
 * currently featured (they live in the Products section on the homepage) but
 * the mapping is defined defensively so the curator can flag a product as
 * featured later without breaking the render.
 */
const VARIANT_FOR_SECTION: Record<
  Section,
  "models" | "papers" | "open-source" | "hackathon"
> = {
  products: "open-source",
  models: "models",
  papers: "papers",
  "open-source": "open-source",
  hackathon: "hackathon",
};

/**
 * Builds the right-side meta string for a featured row. Prefers publication
 * info (papers / models in prep), falls back to the hackathon achievement
 * "event · organizer", and finally to null for rows without context.
 */
function metaFor(project: Project): string | null {
  if (project.publication) return project.publication;
  const achievement = project.achievements?.[0];
  if (achievement) {
    return [achievement.event, achievement.organizer]
      .filter(Boolean)
      .join(" · ");
  }
  return null;
}

/**
 * Featured Work — the homepage's single curated showcase that replaces the
 * old Open Source and Hackathon sections. Shows the projects flagged with
 * `featured: true` as editorial rows, with a "See all" link that routes to
 * the full /projects index page.
 */
export function FeaturedWork() {
  if (FEATURED_PROJECTS.length === 0) return null;

  const totalCount = PROJECTS.length;

  return (
    <section id="featured" className="min-h-screen py-16 md:py-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 flex items-end justify-between gap-4 flex-wrap"
        >
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-4">
              <span className="w-6 h-px bg-violet/40" />
              <span>Featured work</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] leading-[1.05]">
              The models, papers, and wins{" "}
              <span className="text-gray-400">we&apos;re proudest of.</span>
            </h2>
          </div>
          <Link
            href="/projects/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet hover:text-violet/70 transition-colors"
          >
            See all {totalCount} projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div>
          {FEATURED_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectRow
                project={project}
                index={i}
                variant={VARIANT_FOR_SECTION[project.section]}
                meta={metaFor(project)}
                isLast={i === FEATURED_PROJECTS.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

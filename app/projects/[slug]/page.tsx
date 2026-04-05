import type { Metadata } from "next";
import { PROJECTS, PROJECTS_BY_SLUG } from "@/constants/projects";
import { ProjectDetail } from "./ProjectDetail";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_BY_SLUG[slug];
  if (!project) return { title: "Project | WIGTN" };

  return {
    title: `${project.name} | WIGTN`,
    description: project.description.en,
    openGraph: {
      title: project.name,
      description: project.description.en,
      images: project.media.poster ? [project.media.poster] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}

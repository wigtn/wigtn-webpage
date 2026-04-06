"use client";

import { useLanguage } from "@/lib/i18n";
import { PROJECTS_BY_SLUG, PHASE_LABEL } from "@/constants/projects";
import type { ProductDetailTranslations } from "@/constants/translations";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { Footer } from "@/components/sections/Footer";
import {
  ProductDetailNav,
  ProductHero,
  ProductProblem,
  ProductFeatures,
  ProductStats,
  ProductTechStack,
  ProductCTA,
  WigvoModes,
  ResearchSectionComponent,
  TableOfContents,
} from "@/components/products";
import type { TocEntry } from "@/components/products";

interface ProjectDetailProps {
  slug: string;
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const { t } = useLanguage();
  const { processText } = useBudouX();
  const project = PROJECTS_BY_SLUG[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <p className="text-gray-500">Project not found.</p>
      </div>
    );
  }

  const pd = t.productDetail;
  const translationKey = project.detail?.translationKey;

  // Prefer baked-in i18n (wigvo/wigvu); otherwise synthesize from Project fields.
  const translations: ProductDetailTranslations = translationKey
    ? pd[translationKey]
    : {
        tagline: project.tagline,
        description: project.description,
        problem: "",
        solution: "",
        statusBadge: PHASE_LABEL[project.phase],
      };

  const liveUrl = project.detail?.liveUrl ?? project.links.live;
  const githubUrl = project.links.github;
  const ctaUrl = liveUrl ?? githubUrl;
  const ctaLabel = liveUrl ? pd.tryItLive : githubUrl ? pd.viewOnGithub : pd.comingSoon;

  const detail = project.detail;
  const hasFeatures = !!detail?.features?.length && translationKey; // features need translation blob
  const hasModes = !!detail?.modes?.length && translationKey;
  const hasStats = !!detail?.stats?.length && translationKey;
  const hasTech = !!detail?.techStack?.length;
  const hasProblem = !!translationKey && !!translations.problem;
  const hasResearch = !!detail?.researchSections?.length;

  // Build TOC entries from visible sections
  const tocEntries: TocEntry[] = [];
  if (hasProblem) tocEntries.push({ id: "toc-problem", title: pd.theProblem });
  if (hasFeatures) tocEntries.push({ id: "toc-solution", title: pd.theSolution });
  if (hasModes) tocEntries.push({ id: "toc-modes", title: pd.howItWorks });
  if (hasStats) tocEntries.push({ id: "toc-metrics", title: pd.keyMetrics });
  if (hasTech) tocEntries.push({ id: "toc-tech", title: pd.techStack });
  if (hasResearch) {
    for (const section of detail!.researchSections!) {
      tocEntries.push({ id: section.id, title: section.title });
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <ProductDetailNav />

      <ProductHero
        product={{
          name: project.name,
          gradient: project.gradient,
          liveUrl: ctaUrl,
        }}
        translations={translations}
        ctaLabel={ctaLabel}
        posterImage={project.media.poster}
        heroVideo={project.media.heroVideo}
        heroVideoType={project.media.heroVideoType}
      />

      {/* Body: content + sticky TOC sidebar */}
      <div className="flex max-w-[90rem] mx-auto">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {hasProblem && (
            <ProductProblem id="toc-problem" label={pd.theProblem} text={translations.problem} />
          )}

          {hasFeatures && (
            <ProductFeatures
              id="toc-solution"
              label={pd.theSolution}
              solutionText={translations.solution}
              features={detail!.features!}
              featureTranslations={pd.features}
            />
          )}

          {hasModes && (
            <WigvoModes
              id="toc-modes"
              label={pd.howItWorks}
              modes={detail!.modes!}
              modeTranslations={pd.modes}
            />
          )}

          {hasStats && (
            <ProductStats
              id="toc-metrics"
              label={pd.keyMetrics}
              stats={detail!.stats!}
              statTranslations={pd.stats}
            />
          )}

          {hasTech && (
            <ProductTechStack id="toc-tech" label={pd.techStack} techStack={detail!.techStack!} />
          )}

          {hasResearch &&
            detail!.researchSections!.map((section, i) => (
              <ResearchSectionComponent
                key={section.id}
                section={section}
                bgWhite={i % 2 === 1}
              />
            ))}

          {/* Portfolio fallback */}
          {!translationKey && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-3xl mx-auto px-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {processText(project.description)}
                </p>

                {project.achievements && project.achievements.length > 0 && (
                  <div className="mt-10 space-y-3">
                    {project.achievements.map((a) => (
                      <div
                        key={a.event}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium mr-2"
                      >
                        <span>🏆</span>
                        <span>
                          {a.event}
                          {a.note ? ` — ${a.note}` : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {project.publication && (
                  <div className="mt-6 inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full text-red-700 bg-red-50 border border-red-200">
                    {project.publication}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Sticky TOC sidebar */}
        <div className="hidden xl:block flex-shrink-0 w-56 pr-6">
          <TableOfContents entries={tocEntries} />
        </div>
      </div>

      <ProductCTA
        product={{ liveUrl: ctaUrl }}
        tagline={translations.tagline}
        ctaLabel={ctaLabel}
        backToHomeLabel={pd.backToHome}
      />

      <Footer />
    </div>
  );
}

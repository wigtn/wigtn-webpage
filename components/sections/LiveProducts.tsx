"use client";

import { PROJECTS } from "@/constants/projects";
import { ProjectCard, ProjectHeroCard } from "@/components/projects";

/**
 * Live Products — every product-category project in the `completed` phase.
 * The first featured project is promoted to a ProjectHeroCard (with autoplay
 * video), the rest render as 2-column standard cards.
 */
export function LiveProducts() {
  const items = PROJECTS.filter(
    (p) => p.category === "product" && p.phase === "completed",
  );

  if (items.length === 0) return null;

  const hero = items.find((p) => p.featured) ?? items[0];
  const rest = items.filter((p) => p.id !== hero.id);

  return (
    <section id="live" className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-section text-violet mb-2 tracking-wide">
          Live Products
        </h2>
        <p className="text-lg md:text-xl text-foreground mb-8">
          Shipped. Running. Being used.
        </p>

        {/* Home-page hero stays poster-only: video autoplay is reserved for
            the detail page per the media policy (at most one autoplaying
            surface per page load). */}
        <ProjectHeroCard project={hero} autoplayVideo={false} />

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {rest.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

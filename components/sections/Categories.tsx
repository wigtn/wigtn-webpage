"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS_BY_SECTION } from "@/constants/projects";
import { ResearchGrid } from "./categories/ResearchGrid";
import { AwardsGrid } from "./categories/AwardsGrid";
import { OpenSourceGrid } from "./categories/OpenSourceGrid";
import { ProductsGrid } from "./categories/ProductsGrid";

/* ─────────────── Tab definitions ───────────────
 *
 * Four categories. The text-based inline nav (no pills, no boxes) sits
 * directly under the section header. Active tab is violet semibold;
 * inactive tabs are neutral gray. Tab counts are deliberately omitted —
 * "Research · 2" reads as "only 2 papers" instead of "2 strong papers",
 * and the cards themselves carry the volume signal. */

type TabKey = "research" | "awards" | "open-source" | "products";

const HASH_TO_TAB: Record<string, TabKey> = {
  "#research": "research",
  "#awards": "awards",
  "#open-source": "open-source",
  "#products": "products",
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "research", label: "Research" },
  { key: "awards", label: "Awards" },
  { key: "open-source", label: "Open Source" },
  { key: "products", label: "Products" },
];

const RESEARCH_PROJECTS = [
  ...PROJECTS_BY_SECTION.papers,
  ...PROJECTS_BY_SECTION.models,
];

export function Categories() {
  const [activeTab, setActiveTab] = useState<TabKey>("research");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromHash = HASH_TO_TAB[window.location.hash];
    if (fromHash) setActiveTab(fromHash);

    const onHashChange = () => {
      const next = HASH_TO_TAB[window.location.hash];
      if (!next) return;
      setActiveTab(next);
      const main = document.querySelector("main");
      const target = document.getElementById("categories");
      if (main && target) {
        const offset = target.offsetTop - 64;
        main.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${key}`);
    }
  };

  return (
    <section id="categories" className="relative py-20 md:py-28 overflow-hidden">
      {/* Quiet violet washes — visual continuity with the rest of the site. */}
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-violet/[0.05] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-200/[0.18] blur-3xl pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        {/* Header — eyebrow + a single short declarative line. No
            "pick a category" command verb; the cards do the work. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-3">
            <span className="w-6 h-px bg-violet/40" />
            <span>What we build</span>
          </div>
          <h2 className="text-balance text-4xl md:text-5xl font-semibold text-foreground tracking-[-0.02em] leading-[1.1]">
            What we&apos;ve shipped.
          </h2>
        </motion.div>

        {/* Text-based inline tab nav. No pills, no boxes, no borders.
            Just text + `|` separators. Wraps to two rows on very narrow
            viewports without losing the separator vocabulary. */}
        <div
          role="tablist"
          aria-label="Work categories"
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-8 md:mb-10 text-[15px] md:text-base"
        >
          {TABS.map((tab, index) => {
            const isActive = tab.key === activeTab;
            return (
              <span key={tab.key} className="inline-flex items-center gap-3">
                <button
                  type="button"
                  role="tab"
                  id={`categories-tab-${tab.key}`}
                  aria-selected={isActive}
                  aria-controls="categories-tab-panel"
                  onClick={() => handleTabChange(tab.key)}
                  className={`transition-colors ${
                    isActive
                      ? "text-violet font-semibold"
                      : "text-gray-500 hover:text-violet"
                  }`}
                >
                  {tab.label}
                </button>
                {index < TABS.length - 1 && (
                  <span
                    aria-hidden
                    className="text-gray-300 select-none"
                  >
                    |
                  </span>
                )}
              </span>
            );
          })}
        </div>

        {/* Tabpanel — single panel, content swaps based on activeTab. */}
        <div
          id="categories-tab-panel"
          role="tabpanel"
          aria-labelledby={`categories-tab-${activeTab}`}
        >
          {activeTab === "research" && <ResearchGrid projects={RESEARCH_PROJECTS} />}
          {activeTab === "awards" && <AwardsGrid projects={PROJECTS_BY_SECTION.hackathon} />}
          {activeTab === "open-source" && <OpenSourceGrid projects={PROJECTS_BY_SECTION["open-source"]} />}
          {activeTab === "products" && <ProductsGrid projects={PROJECTS_BY_SECTION.products} />}
        </div>
      </div>
    </section>
  );
}

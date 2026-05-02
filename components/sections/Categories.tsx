"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TabList } from "@/components/ui/TabList";
import { PROJECTS_BY_SECTION } from "@/constants/projects";
import { ResearchTable } from "./categories/ResearchTable";
import { AwardsGrid } from "./categories/AwardsGrid";
import { OpenSourceList } from "./categories/OpenSourceList";
import { ProductsGrid } from "./categories/ProductsGrid";

/* ─────────────── Tab definitions ───────────────
 *
 * Four categories, each with the view shape that matches its evaluation
 * axis. The first tab is the default — Research leads because ACL
 * accepted + EMNLP in-prep is the strongest credibility signal in WIGTN's
 * portfolio for a B2B / academic reader.
 *
 * Hash routing is purely client-side — the homepage server-renders the
 * default Research view, then the effect below picks up `window.location.hash`
 * to switch tabs without scroll. Sharing `wigtn.com/#awards` lands a reader
 * on Awards on first paint (after hydration). */

type TabKey = "research" | "awards" | "open-source" | "products";

const HASH_TO_TAB: Record<string, TabKey> = {
  "#research": "research",
  "#awards": "awards",
  "#open-source": "open-source",
  "#products": "products",
};

const RESEARCH_PROJECTS = [
  ...PROJECTS_BY_SECTION.papers,
  ...PROJECTS_BY_SECTION.models,
];

export function Categories() {
  const [activeTab, setActiveTab] = useState<TabKey>("research");

  // Read the initial hash on mount, and listen for changes (covers
  // back/forward navigation and clicks on nav-bar hash links). Internal
  // tab clicks use `history.replaceState`, which deliberately does NOT
  // fire `hashchange` — so we don't scroll on those.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromHash = HASH_TO_TAB[window.location.hash];
    if (fromHash) setActiveTab(fromHash);

    const onHashChange = () => {
      const next = HASH_TO_TAB[window.location.hash];
      if (!next) return;
      setActiveTab(next);
      // Bring the section into view so a nav-bar click lands on Categories,
      // not on whatever scroll position the page happened to be in.
      const main = document.querySelector("main");
      const target = document.getElementById("categories");
      if (main && target) {
        const offset = target.offsetTop - 64; // leave room for the nav header
        main.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    // replaceState (not pushState) — clicking tabs shouldn't pollute the
    // browser back-stack with one entry per click.
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${key}`);
    }
  };

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "research", label: "Research", count: RESEARCH_PROJECTS.length },
    { key: "awards", label: "Awards", count: PROJECTS_BY_SECTION.hackathon.length },
    { key: "open-source", label: "Open Source", count: PROJECTS_BY_SECTION["open-source"].length },
    { key: "products", label: "Products", count: PROJECTS_BY_SECTION.products.length },
  ];

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-4">
            <span className="w-6 h-px bg-violet/40" />
            <span>Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] leading-[1.05]">
            Pick a category.{" "}
            <span className="text-gray-400">See what we&apos;ve shipped.</span>
          </h2>
        </motion.div>

        {/* Tab list — wrap with overflow-x-auto so 4 tabs don't crowd
            a 375px viewport. The fade mask keeps the right edge soft. */}
        <div
          className="-mx-6 px-6 mb-8 md:mb-10 overflow-x-auto"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)",
          }}
        >
          <TabList<TabKey>
            tabs={tabs}
            activeKey={activeTab}
            onChange={handleTabChange}
            ariaLabel="Work categories"
            idPrefix="categories-tab"
            className="flex-nowrap min-w-max"
          />
        </div>

        {/* Tabpanel — single panel, content swaps based on activeTab.
            Using one panel id keeps the aria-controls contract simple. */}
        <div
          id="categories-tab-panel"
          role="tabpanel"
          aria-labelledby={`categories-tab-${activeTab}`}
        >
          {activeTab === "research" && <ResearchTable projects={RESEARCH_PROJECTS} />}
          {activeTab === "awards" && <AwardsGrid projects={PROJECTS_BY_SECTION.hackathon} />}
          {activeTab === "open-source" && <OpenSourceList projects={PROJECTS_BY_SECTION["open-source"]} />}
          {activeTab === "products" && <ProductsGrid projects={PROJECTS_BY_SECTION.products} />}
        </div>
      </div>
    </section>
  );
}

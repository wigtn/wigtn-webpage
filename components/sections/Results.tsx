"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { GitHubIcon } from "@/components/ui/icons";
import { RESULTS, type ResultItem } from "@/constants/results";

type FilterType = "all" | ResultItem["type"];

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="px-2 py-0.5 text-xs text-violet bg-violet/10 rounded-full font-medium">
      {status}
    </span>
  );
}

function VideoBadge({ url }: { url: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(url, "_blank", "noopener,noreferrer");
      }}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-red-600 bg-red-50 rounded-full font-medium hover:bg-red-100 transition-colors"
    >
      <Play className="w-3 h-3" />
      Video
    </button>
  );
}

function BadgeLabel({ text }: { text: string }) {
  return (
    <span className="px-2 py-0.5 text-xs text-amber-700 bg-amber-100 rounded-full font-medium">
      {text}
    </span>
  );
}

function ResultCard({
  item,
  description,
}: {
  item: ResultItem;
  description: string;
}) {
  const { processText } = useBudouX();

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm`}
        >
          {item.type === "product" ? (
            <span className="text-base font-bold text-white">
              {item.name.charAt(0)}
            </span>
          ) : (
            <GitHubIcon className="w-5 h-5 text-white" />
          )}
        </div>

        <h3 className="text-lg font-semibold text-foreground group-hover:text-violet transition-colors">
          {item.name}
        </h3>

        {item.type === "product" ? (
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-violet transition-colors ml-auto flex-shrink-0" />
        ) : (
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-violet transition-colors ml-auto flex-shrink-0" />
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <StatusBadge status={item.status} />
        {item.videoUrl && <VideoBadge url={item.videoUrl} />}
        {item.badge && <BadgeLabel text={item.badge} />}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        {item.type === "product" ? processText(description) : description}
      </p>
    </div>
  );

  const cardClass =
    "group block bg-white rounded-2xl border border-gray-200 p-5 hover:border-violet/30 hover:shadow-sm transition-all h-full";

  if (item.type === "product") {
    return (
      <Link href={item.link} className={cardClass}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {content}
    </a>
  );
}

type FilterConfig = {
  key: FilterType;
  translationKey: "filterAll" | "filterProducts" | "filterOpensource";
};

const FILTERS: FilterConfig[] = [
  { key: "all", translationKey: "filterAll" },
  { key: "product", translationKey: "filterProducts" },
  { key: "opensource", translationKey: "filterOpensource" },
];

export function Results() {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredItems = activeFilter === "all" ? RESULTS : RESULTS.filter((i) => i.type === activeFilter);

  return (
    <section id="results" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <h2 className="text-section text-violet mb-2 tracking-wide">
          RESULTS
        </h2>
        <p className="text-lg md:text-xl text-foreground mb-6">
          {t.results.heading}
        </p>

        <div className="flex gap-2" role="radiogroup" aria-label="Filter results">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="radio"
              aria-checked={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                activeFilter === f.key
                  ? "bg-violet text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t.results[f.translationKey]}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={staggerItem}>
                <ResultCard
                  item={item}
                  description={item.description[language]}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

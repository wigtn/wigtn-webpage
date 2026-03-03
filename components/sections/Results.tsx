"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { GitHubIcon } from "@/components/ui/icons";
import { RESULTS, type ResultItem } from "@/constants/results";

type FilterType = "all" | ResultItem["type"];

const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
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

const NAV_BUTTON_CLASS =
  "flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-violet/30 hover:text-violet transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-500";

function ResultCard({
  item,
  description,
}: {
  item: ResultItem;
  description: string;
}) {
  const { processText } = useBudouX();

  const content = (
    <div className="flex items-start gap-5">
      <div
        className={`w-16 h-16 md:w-[72px] md:h-[72px] flex-shrink-0 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm`}
      >
        {item.type === "product" ? (
          <span className="text-2xl md:text-3xl font-bold text-white">
            {item.name.charAt(0)}
          </span>
        ) : (
          <GitHubIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-violet transition-colors">
            {item.name}
          </h3>
          <StatusBadge status={item.status} />
          {item.videoUrl && <VideoBadge url={item.videoUrl} />}
          {item.badge && <BadgeLabel text={item.badge} />}
          {item.type === "product" ? (
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-violet transition-colors ml-auto flex-shrink-0" />
          ) : (
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-violet transition-colors ml-auto flex-shrink-0" />
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {item.type === "product" ? processText(description) : description}
        </p>
      </div>
    </div>
  );

  const cardClass =
    "group block bg-white rounded-2xl border border-gray-200 p-5 hover:border-violet/30 hover:shadow-sm transition-all";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredItems = useMemo(
    () => activeFilter === "all" ? RESULTS : RESULTS.filter((i) => i.type === activeFilter),
    [activeFilter],
  );

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < filteredItems.length - 1;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  const goPrev = useCallback(() => {
    if (canGoPrev) goTo(currentIndex - 1);
  }, [canGoPrev, goTo, currentIndex]);

  const goNext = useCallback(() => {
    if (canGoNext) goTo(currentIndex + 1);
  }, [canGoNext, goTo, currentIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    },
    [goPrev, goNext],
  );

  const handleFilterChange = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentIndex(0);
    setDirection(0);
  }, []);

  const item = filteredItems[currentIndex];

  return (
    <section id="results" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <span className="text-sm font-semibold text-violet mb-6 block tracking-wide">
          RESULTS
        </span>
        <h2 className="text-section text-foreground mb-6">
          {t.results.heading}
        </h2>

        <div className="flex gap-2" role="radiogroup" aria-label="Filter results">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="radio"
              aria-checked={activeFilter === f.key}
              onClick={() => handleFilterChange(f.key)}
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

      <div
        className="max-w-5xl mx-auto px-6"
        role="toolbar"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Results carousel controls"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous result"
            className={NAV_BUTTON_CLASS}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            className="flex-1 overflow-hidden relative min-h-[100px]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Results carousel"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={item.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD && canGoNext) {
                    goNext();
                  } else if (info.offset.x > SWIPE_THRESHOLD && canGoPrev) {
                    goPrev();
                  }
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <ResultCard
                  item={item}
                  description={item.description[language]}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next result"
            className={NAV_BUTTON_CLASS}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-5" role="group" aria-label="Slide indicators">
          {filteredItems.map((r, i) => (
            <button
              key={r.id}
              aria-current={i === currentIndex ? "step" : undefined}
              onClick={() => goTo(i)}
              aria-label={`Go to ${r.name}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-violet scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

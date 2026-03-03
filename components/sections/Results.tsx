"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { RESULTS, type ResultItem } from "@/constants/results";

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

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="px-2 py-0.5 text-xs text-violet bg-violet/10 rounded-full font-medium">
      {status}
    </span>
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

export function Results() {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < RESULTS.length - 1;

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

  const item = RESULTS[currentIndex];

  return (
    <section id="results" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <span className="text-sm font-semibold text-violet mb-6 block tracking-wide">
          RESULTS
        </span>
        <h2 className="text-section text-foreground mb-4">
          {t.results.heading}
        </h2>
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="max-w-5xl mx-auto px-6"
        onKeyDown={handleKeyDown}
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

        <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Result navigation">
          {RESULTS.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={i === currentIndex}
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

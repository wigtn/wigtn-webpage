"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Globe, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { GitHubIcon, HuggingFaceIcon } from "@/components/ui/icons";
import {
  RESULTS,
  IMPACT_STATS,
  type ResultItem,
  type Tag,
} from "@/constants/results";

/* ──────────────────────────── helpers ──────────────────────────── */

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/
  );
  return match ? match[1] : null;
}


const TEXT_SHADOW = { textShadow: "0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)" };

/* ──────────────────────────── sub-components ──────────────────────── */

const TAG_LEGEND_STYLE: Record<Tag, { dot: string; text: string }> = {
  Research: { dot: "bg-blue-500", text: "text-blue-700" },
  Competition: { dot: "bg-orange-500", text: "text-orange-700" },
  Product: { dot: "bg-violet", text: "text-violet" },
  "Open Source": { dot: "bg-gray-500", text: "text-gray-600" },
  Model: { dot: "bg-yellow-500", text: "text-yellow-700" },
};

function TagLegend({ tag }: { tag: Tag }) {
  const style = TAG_LEGEND_STYLE[tag];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white border border-gray-200 ${style.text}`}>
      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
      {tag}
    </span>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const dotColor =
    status === "Live"
      ? "bg-green-400"
      : status === "Active" || status === "Released"
        ? "bg-blue-400"
        : "bg-amber-400";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70">
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColor} ${status === "Live" ? "animate-pulse" : ""}`}
      />
      {status}
    </span>
  );
}

/* ──────────────────────────── Impact Strip ──────────────────────── */

function ImpactStrip() {
  const { t } = useLanguage();
  const stats = [
    { value: IMPACT_STATS.papers, label: t.results.statPapers },
    { value: IMPACT_STATS.competitions, label: t.results.statCompetitions },
    { value: IMPACT_STATS.liveServices, label: t.results.statLive },
    { value: IMPACT_STATS.models, label: t.results.statModels },
    { value: IMPACT_STATS.openSource, label: t.results.statOpenSource },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mb-12 py-6 border-y border-gray-200">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-foreground">
            {s.value}
          </div>
          <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────── Slide ──────────────────────────── */

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "60%" : "-60%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-40%" : "40%",
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

function SlideLinks({ item }: { item: ResultItem }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {item.links.live && (
        <a
          href={item.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-900 text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <Globe className="w-4 h-4" />
          Live Demo
        </a>
      )}
      {item.links.github && (
        <a
          href={item.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          <GitHubIcon className="w-4 h-4" />
          GitHub
        </a>
      )}
      {item.links.huggingface && (
        <a
          href={item.links.huggingface}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          <HuggingFaceIcon className="w-4 h-4" />
          Model
        </a>
      )}
      {item.links.video && (
        <a
          href={item.links.video}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/80 border border-red-400/30 text-white text-sm font-medium hover:bg-red-600 transition-colors"
        >
          Watch Demo
        </a>
      )}
      {item.links.detail && (
        <button
          type="button"
          onClick={() => {
            window.location.href = item.links.detail!;
          }}
          className="inline-flex items-center gap-1.5 text-white/70 text-sm font-medium hover:text-white transition-colors ml-auto"
        >
          Details
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

/* ── Center video layout: vertical video centered with overlay info ── */

function CenterVideoSlide({
  item,
  description,
  isActive,
}: {
  item: ResultItem;
  description: string;
  isActive: boolean;
}) {
  const { processText } = useBudouX();

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ height: "clamp(400px, 55vh, 560px)" }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered video */}
      {item.localVideo && isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            src={item.localVideo}
            autoPlay
            muted
            loop
            playsInline
            className="h-full object-contain"
          />
        </div>
      )}

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/15" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
        <div className="flex items-start justify-end">
          <StatusIndicator status={item.status} />
        </div>

        <div className="max-w-2xl" style={TEXT_SHADOW}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {item.name}
          </h3>
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6">
            {processText(description)}
          </p>
          <SlideLinks item={item} />
        </div>
      </div>
    </div>
  );
}

/* ── Default layout: fullscreen bg ── */

function FullSlide({
  item,
  description,
  isActive,
}: {
  item: ResultItem;
  description: string;
  isActive: boolean;
}) {
  const { processText } = useBudouX();
  const videoId = item.links.video ? getYouTubeId(item.links.video) : null;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ height: "clamp(400px, 55vh, 560px)" }}
    >
      {/* Background: youtube > image > gradient */}
      {videoId && isActive ? (
        <div className="absolute inset-0 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&disablekb=1`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "177.78vh",
              height: "100vh",
              minWidth: "100%",
              minHeight: "100%",
            }}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
      ) : item.image ? (
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
        <div className="flex items-start justify-end">
          <StatusIndicator status={item.status} />
        </div>

        <div className="max-w-2xl" style={TEXT_SHADOW}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {item.name}
          </h3>
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6">
            {processText(description)}
          </p>
          <SlideLinks item={item} />
        </div>
      </div>
    </div>
  );
}

/* ── Slide router ── */

function Slide({
  item,
  description,
  isActive,
}: {
  item: ResultItem;
  description: string;
  isActive: boolean;
}) {
  if (item.localVideo) {
    return <CenterVideoSlide item={item} description={description} isActive={isActive} />;
  }
  return <FullSlide item={item} description={description} isActive={isActive} />;
}

/* ──────────────────────────── Main Section ──────────────────────── */

export function Results() {
  const { language, t } = useLanguage();
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const touchStartX = useRef(0);

  const total = RESULTS.length;

  const goTo = useCallback(
    (dir: number) => {
      setSlide(([prev]) => {
        const next = (prev + dir + total) % total;
        return [next, dir];
      });
    },
    [total]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo]);

  const currentItem = RESULTS[currentIndex];
  if (!currentItem) return null;

  return (
    <section id="results" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-section text-violet mb-2 tracking-wide">
          Results
        </h2>
        <p className="text-lg md:text-xl text-foreground mb-8">
          What We&apos;ve Built
        </p>

        {/* Impact Strip */}
        <ImpactStrip />

        {/* View all link */}
        <div className="flex justify-end mb-4">
          <span
            className="text-sm font-medium text-violet cursor-default"
            title="Coming soon"
          >
            View all →
          </span>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) goTo(diff > 0 ? 1 : -1);
          }}
        >
          {/* Slide area */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentItem.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Slide
                  item={currentItem}
                  description={currentItem.description[language]}
                  isActive
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation + Legend */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              {/* Arrow buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-violet hover:text-violet transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-violet hover:text-violet transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dots + counter */}
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  {RESULTS.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSlide([i, i > currentIndex ? 1 : -1])}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "w-8 bg-violet"
                          : "w-1.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to ${item.name}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400 font-mono tabular-nums">
                  {String(currentIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Tag legend for current slide */}
            <div className="flex flex-wrap items-center gap-2">
              {currentItem.tags.map((tag) => (
                <TagLegend key={tag} tag={tag} />
              ))}
              {currentItem.publication && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full text-red-700 bg-red-50 border border-red-200">
                  {currentItem.publication}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

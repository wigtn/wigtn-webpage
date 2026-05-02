"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS_BY_SECTION, type Project } from "@/constants/projects";

/* ─────────────── Pillar definitions ───────────────
 *
 * Editorial / terminal-style index. Four numbered rows instead of feature
 * cards — closer to a printed table-of-contents (or a `ls` of the repo
 * root) than a SaaS landing-page bento. Each row carries:
 *   • a large mono-font index number (01–04)
 *   • the pillar's label as the row's headline
 *   • a short pitch
 *   • inline project list with `·` separators
 *   • a count + venue/badge meta on the right
 * Hover nudges the row right by a few px and turns the numeral + arrow
 * violet, the way a directory listing reacts to focus in a terminal UI. */

interface PillarBadge {
  text: string;
}

interface Pillar {
  key: "research" | "services" | "hackathons" | "tools";
  label: string;
  subtitle: string;
  pitch: string;
  href: string;
  /** Padded numeric prefix shown left of the row, e.g. "01". */
  index: string;
  count: string;
  countLabel: string;
  badges?: PillarBadge[];
  projects: readonly Project[];
  /** Representative cover thumbnail rendered at the right of the row. */
  cover: string;
  /** Tailwind gradient classes for the violet/colour glow that frames the
   *  thumbnail on hover, picked per pillar so each row has a distinct
   *  identity even though they share the editorial layout. */
  glow: string;
}

const RESEARCH_PROJECTS: readonly Project[] = [
  ...PROJECTS_BY_SECTION.papers,
  ...PROJECTS_BY_SECTION.models,
];

const PILLARS: Pillar[] = [
  {
    key: "research",
    label: "Research",
    subtitle: "Papers & frontier models",
    pitch:
      "Two submissions to top-tier NLP venues. A 2B-parameter document parser that ranks #1 on its Korean benchmark — at a fraction of the size of the models it beats.",
    href: "/projects/?category=research",
    index: "01",
    count: "02",
    countLabel: "papers in submission",
    badges: [{ text: "ACL 2026" }, { text: "EMNLP 2026" }],
    projects: RESEARCH_PROJECTS,
    cover: "/images/projects/wigvo_logo.png",
    glow: "from-violet/30 to-indigo-300/20",
  },
  {
    key: "services",
    label: "Services",
    subtitle: "Production mobile apps",
    pitch:
      "AI-native consumer apps that ship — built on the same models we publish.",
    href: "/projects/?category=products",
    index: "02",
    count: "02",
    countLabel: "mobile apps shipping",
    projects: PROJECTS_BY_SECTION.products,
    cover: "/images/carousel/timelens_hero.png",
    glow: "from-emerald-300/30 to-teal-300/20",
  },
  {
    key: "hackathons",
    label: "Hackathons",
    subtitle: "Velocity, validated",
    pitch:
      "Grand Prize at Build with TRAE Seoul. Three engineers, three and a half hours.",
    href: "/projects/?category=hackathon",
    index: "03",
    count: "01",
    countLabel: "hackathon win",
    badges: [
      { text: "🏆 Grand Prize" },
      { text: "ByteDance · TRAE" },
    ],
    projects: PROJECTS_BY_SECTION.hackathon,
    cover: "/images/projects/trae_hackthon_seoul.png",
    glow: "from-amber-300/30 to-orange-300/20",
  },
  {
    key: "tools",
    label: "Tools",
    subtitle: "Open-source for builders",
    pitch:
      "Developer infrastructure published to npm and the Claude Code marketplace.",
    href: "/projects/?category=open-source",
    index: "04",
    count: "02",
    countLabel: "open-source packages",
    projects: PROJECTS_BY_SECTION["open-source"],
    cover: "/images/carousel/wigss-npm.png",
    glow: "from-sky-300/30 to-cyan-300/20",
  },
];

/* ─────────────── Row ─────────────── */

function PillarRow({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-t border-black/[0.08] first:border-t-0"
    >
      <Link
        href={pillar.href}
        className="group relative grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 md:gap-x-10 gap-y-3 md:gap-y-3 py-5 md:py-9 px-3 md:px-5 -mx-3 md:-mx-5 rounded-md"
      >
        {/* Left violet accent bar — desktop hover only */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-violet origin-top scale-y-0 md:group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
        {/* Background wash — desktop hover only */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-violet/[0.05] via-violet/[0.025] to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-400"
        />

        {/* Index — mono font, fixed-width */}
        <span
          aria-hidden
          className="relative font-mono text-xs md:text-sm tabular-nums tracking-[0.18em] text-gray-300 md:group-hover:text-violet transition-colors duration-300 mt-2 md:mt-3"
        >
          {pillar.index}
        </span>

        {/* Main text column */}
        <div className="relative min-w-0 md:col-start-2">
          <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1.5">
            <h3 className="relative inline-block text-[20px] md:text-4xl font-bold tracking-[-0.02em] text-foreground transition-colors duration-300 leading-[1.1] md:leading-[1.05]">
              {pillar.label}
              {/* Mobile-only tap chevron next to the headline so the row
                  clearly reads as a navigation entry on touch devices */}
              <ArrowUpRight
                aria-hidden
                className="md:hidden inline-block ml-2 -mt-0.5 w-4 h-4 align-middle text-violet/70"
              />
            </h3>
            {/* Inline count chip — labels the meta clearly next to the
                headline on every viewport, replacing the giant ambiguous
                mono numeral that previously sat in the right column. */}
            <span className="inline-flex items-baseline gap-1 px-2 py-0.5 rounded-md bg-violet/10 text-violet font-semibold text-[11.5px] md:text-[12px] tabular-nums whitespace-nowrap">
              <span>{Number(pillar.count)}</span>
              <span className="font-medium">{pillar.countLabel}</span>
            </span>
          </div>

          <p className="mt-1.5 md:mt-2 text-[11px] md:text-[13px] uppercase tracking-[0.14em] md:tracking-[0.16em] text-violet font-semibold">
            {pillar.subtitle}
          </p>

          <p className="mt-3 md:mt-4 text-[13.5px] md:text-base text-gray-600 leading-[1.6] md:leading-relaxed max-w-2xl text-pretty">
            {pillar.pitch}
          </p>

          {/* Project list — inline, dot-separated, mono for that
              README-style feel. Names link straight through to the row's
              section filter (the parent <Link>). On mobile, kept on one
              line with overflow-x scroll if the list outgrows the row. */}
          <div className="mt-3 md:mt-4 flex flex-wrap items-baseline gap-x-2.5 md:gap-x-3 gap-y-1">
            {pillar.projects.map((p, i) => (
              <span key={p.id} className="flex items-baseline gap-2.5 md:gap-3">
                {i > 0 && (
                  <span aria-hidden className="text-gray-300 select-none">
                    ·
                  </span>
                )}
                <span className="font-mono text-[12px] md:text-[13.5px] font-semibold text-foreground/85 whitespace-nowrap">
                  {p.name}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Right column — thumbnail + meta (desktop). Mobile uses a
            separate compact inline block (below) so we don't show the
            confusing big-mono numeral on small screens. */}
        <div className="hidden md:flex col-span-2 md:col-span-1 md:col-start-3 md:text-right md:min-w-[220px] md:mt-2 flex-col items-end gap-4">
          <div className="relative w-[220px] flex-shrink-0">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-50 ring-1 ring-black/[0.06] group-hover:ring-violet/25 transition-[box-shadow] duration-500 ease-out group-hover:shadow-[0_12px_30px_-18px_rgba(76,29,149,0.35)]">
              <Image
                src={pillar.cover}
                alt=""
                fill
                sizes="220px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                unoptimized
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 text-right">
            {pillar.badges && pillar.badges.length > 0 && (
              <div className="flex flex-wrap justify-end gap-1.5">
                {pillar.badges.map((b) => (
                  <span
                    key={b.text}
                    className="font-mono text-[10.5px] tracking-wide px-2 py-0.5 border border-black/[0.12] rounded text-gray-700 whitespace-nowrap"
                  >
                    {b.text}
                  </span>
                ))}
              </div>
            )}

            <span className="inline-flex items-center gap-1 mt-4 text-[12px] font-semibold text-foreground/80 group-hover:text-violet transition-colors">
              view
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>

        {/* Mobile-only badges row (count chip already lives next to the
            headline, so we only render badges here when present). */}
        {pillar.badges && pillar.badges.length > 0 && (
          <div className="md:hidden col-span-2 mt-1 flex flex-wrap items-center gap-1.5">
            {pillar.badges.map((b) => (
              <span
                key={b.text}
                className="font-mono text-[10px] tracking-wide px-1.5 py-0.5 border border-black/[0.12] rounded text-gray-700 whitespace-nowrap"
              >
                {b.text}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}

/* ─────────────── Pillars section ─────────────── */

export function Pillars() {
  return (
    <section
      id="work"
      className="relative py-14 md:py-28 border-y border-black/[0.05] overflow-hidden"
    >
      {/* Faint grid texture so the white section doesn't read as flat */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] pointer-events-none [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-6">
        {/* Editorial header — fully separate mobile/desktop layouts. On
            mobile: tight vertical stack with the description tucked under
            the headline behind a violet accent rail. On desktop: classic
            8/4 grid with description floated to the right edge. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-9 md:mb-14"
        >
          {/* ──── MOBILE LAYOUT (hidden on md+) ──── */}
          <div className="md:hidden">
            <div className="inline-flex items-center gap-3 text-[10.5px] font-semibold tracking-[0.18em] text-violet uppercase mb-3">
              <span className="w-5 h-px bg-violet/40" />
              <span>What we build</span>
            </div>
            <h2 className="text-balance text-[28px] font-bold text-foreground tracking-[-0.02em] leading-[1.2]">
              <span className="block">
                Research that{" "}
                <span className="inline-block bg-gradient-to-br from-violet to-indigo-500 bg-clip-text text-transparent">
                  ships
                </span>
                .
              </span>
              <span className="block text-gray-400">
                Products that earn.
              </span>
            </h2>
            <div className="mt-5 pl-3 border-l-2 border-violet/40">
              <p className="text-[13px] text-gray-500 leading-[1.6] text-pretty">
                Four pillars, one team. Every row is a front door to deeper
                work.
              </p>
            </div>
          </div>

          {/* ──── DESKTOP LAYOUT (hidden on mobile) ──── */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-10 md:items-end">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-violet uppercase mb-4">
                <span className="w-6 h-px bg-violet/40" />
                <span>What we build</span>
              </div>
              <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-[-0.02em] leading-[1.02]">
                <span className="block">
                  Research that{" "}
                  <span className="inline-block bg-gradient-to-br from-violet to-indigo-500 bg-clip-text text-transparent">
                    ships
                  </span>
                  .
                </span>
                <span className="block text-gray-400">
                  Products that earn.
                </span>
              </h2>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="text-[15px] text-gray-500 leading-relaxed max-w-xs md:ml-auto text-pretty">
                Four pillars, one team. Every row is a front door to deeper
                work.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Numbered list of pillar rows — replaces the bento card grid */}
        <div>
          {PILLARS.map((p, i) => (
            <PillarRow key={p.key} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

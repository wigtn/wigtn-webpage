"use client";

/** Shared article cards — reused by the homepage teasers and the /work
 *  and /news sub-pages so the look stays consistent. */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { articleHref, type Article } from "./data";
import { rise, VIEWPORT } from "./chrome";

/* Full card with image band — used in grids. */
export function ArticleCard({ a, i = 0 }: { a: Article; i?: number }) {
  return (
    <motion.div variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <Link
        href={articleHref(a.slug)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/70 hover:border-violet/40 hover:shadow-[0_12px_40px_rgba(139,92,246,0.08)] transition-all"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-violet/15 via-violet/5 to-transparent">
          {a.image ? (
            <img
              src={a.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-5xl font-bold text-violet/25 select-none">w.</span>
            </div>
          )}
          {a.placeholder && (
            <span className="absolute top-3 right-3 rounded-full border border-gray-200 bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              Placeholder
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-violet">
            {a.tag}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-violet-dark transition-colors">
            {a.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-gray-500 leading-relaxed line-clamp-3">{a.summary}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} /> {a.date}
            </span>
            {a.place && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} /> {a.place}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* Compact row — used in dense feeds. */
export function ArticleRow({ a, i = 0 }: { a: Article; i?: number }) {
  return (
    <motion.div variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <Link href={articleHref(a.slug)} className="group flex items-start gap-6 py-5">
        <span className="w-20 shrink-0 pt-1 text-xs text-gray-400">{a.date}</span>
        <div className="flex-1">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-violet">
            {a.tag}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug group-hover:text-violet-dark transition-colors">
            {a.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 leading-relaxed">{a.summary}</p>
        </div>
        <ArrowUpRight size={18} className="mt-1 shrink-0 text-gray-300 group-hover:text-violet transition-colors" />
      </Link>
    </motion.div>
  );
}

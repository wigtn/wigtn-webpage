"use client";

/** Shared article cards — dark. Reused by the homepage and /work, /news. */

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
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.025] ring-1 ring-inset ring-white/[0.07] transition-all duration-300 hover:bg-white/[0.04] hover:ring-white/15"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at 50% -10%, rgba(117,59,189,0.16), transparent 70%)" }}
        />
        <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.03]">
          {a.image ? (
            <img
              src={a.image}
              alt=""
              className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-5xl font-bold text-brand/30 select-none">w.</span>
            </div>
          )}
          {a.placeholder && (
            <span className="absolute top-3 right-3 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400 backdrop-blur">
              Placeholder
            </span>
          )}
        </div>
        <div className="relative flex flex-1 flex-col p-5">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-brand-light">
            {a.tag}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-white group-hover:text-brand-light transition-colors">
            {a.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-zinc-400 leading-relaxed line-clamp-3">{a.summary}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500">
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
        <span className="w-20 shrink-0 pt-1 font-mono text-xs text-zinc-600">{a.date}</span>
        <div className="flex-1">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-brand-light">
            {a.tag}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug text-white group-hover:text-brand-light transition-colors">
            {a.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{a.summary}</p>
        </div>
        <ArrowUpRight size={18} className="mt-1 shrink-0 text-zinc-600 group-hover:text-brand-light transition-colors" />
      </Link>
    </motion.div>
  );
}

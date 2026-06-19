"use client";

/** /news — events, insights, and (placeholder) community in one feed. */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { PageShell, PageHero, rise, VIEWPORT } from "./chrome";
import { ArticleCard } from "./cards";
import { NEWS_FEED, articleHref } from "./data";

export function NewsPage() {
  const [featured, ...rest] = NEWS_FEED;

  return (
    <PageShell>
      <PageHero
        title="What's happening."
        titleClassName="text-brand-light"
        lead="Papers, awards, and talks — newest first."
      />

      <div className="max-w-6xl mx-auto px-6 pb-24">
        {/* Featured — latest, wide split card */}
        {featured && (
          <motion.div variants={rise} initial="hidden" animate="show">
            <Link
              href={articleHref(featured.slug)}
              className="group relative mb-6 grid overflow-hidden rounded-2xl bg-white/[0.025] ring-1 ring-inset ring-white/[0.07] transition-all duration-300 hover:bg-white/[0.04] hover:ring-white/15 md:grid-cols-2"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(600px circle at 30% -10%, rgba(117,59,189,0.16), transparent 70%)" }}
              />
              <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03] md:aspect-auto md:min-h-[320px]">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-6xl font-bold text-brand/30 select-none">w.</span>
                  </div>
                )}
              </div>
              <div className="relative flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-light">
                    Latest
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-brand-light">
                    {featured.tag}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-snug tracking-tight text-white">
                  {featured.title}
                </h2>
                <p className="mt-3 text-zinc-400 leading-relaxed line-clamp-3">{featured.summary}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} /> {featured.date}
                  </span>
                  {featured.place && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} /> {featured.place}
                    </span>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 font-medium text-brand-light">
                    Read <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Rest of the feed */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-5 text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500"
        >
          More notes
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((a, i) => (
            <ArticleCard key={a.slug} a={a} i={i} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

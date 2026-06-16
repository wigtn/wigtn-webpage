"use client";

/**
 * Article detail — the page a card opens into. One layout serves every
 * kind (report / event / community / insight); kind-specific bits (event
 * place, insight video bumper) render conditionally. Content comes from
 * data.ts by slug, standing in for a future MDX render.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Play, Clock, User } from "lucide-react";
import { HOME, articleHref, getArticle, ARTICLES, type Block, type Article } from "./data";
import { SiteHeader, SiteFooter, BackdropDecor, EVENT_ICON, rise } from "./chrome";

const KIND_LABEL: Record<Article["kind"], string> = {
  report: "Research",
  event: "Events",
  community: "Community",
  insight: "Tech Insights",
};

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "h":
      return <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-violet pl-5 text-xl font-medium leading-snug text-foreground">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 text-gray-600 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="my-5 text-lg leading-relaxed text-gray-600">{block.text}</p>;
  }
}

export function ArticleDetail({ slug }: { slug: string }) {
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="relative min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans antialiased">
        <BackdropDecor />
        <SiteHeader />
        <main className="relative z-10 max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Article not found</h1>
          <Link href={HOME} className="mt-6 inline-flex items-center gap-2 text-violet-dark hover:text-violet">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const EventIcon = article.icon ? EVENT_ICON[article.icon] : null;
  const related = ARTICLES.filter((a) => a.kind === article.kind && a.slug !== article.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans antialiased">
      <BackdropDecor />
      <SiteHeader />

      <main className="relative z-10">
        <article className="max-w-3xl mx-auto px-6 pt-12 pb-8 md:pt-16">
          {/* Back + breadcrumb */}
          <Link
            href={`${HOME}#${article.kind === "report" ? "research" : article.kind === "insight" ? "insights" : article.kind}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={15} /> {KIND_LABEL[article.kind]}
          </Link>

          {/* Header */}
          <motion.header
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-6"
          >
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-violet">
              {article.tag}
            </span>
            <h1 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-tight leading-[1.1]">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-gray-500 leading-relaxed">{article.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> {article.date}
              </span>
              {article.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {article.readTime} read
                </span>
              )}
              {article.place && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> {article.place}
                </span>
              )}
              {article.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} /> {article.author}
                </span>
              )}
            </div>
          </motion.header>

          {/* Hero visual */}
          <motion.div
            variants={rise}
            custom={1}
            initial="hidden"
            animate="show"
            className="relative mt-8 aspect-[16/8] rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-violet/15 via-violet/5 to-transparent flex items-center justify-center"
          >
            {article.video ? (
              <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Play className="text-violet-dark ml-1" size={26} fill="currentColor" />
              </div>
            ) : EventIcon ? (
              <EventIcon className="text-violet/60" size={56} strokeWidth={1.25} />
            ) : (
              <span className="font-mono text-7xl font-bold text-violet/25 select-none">w.</span>
            )}
          </motion.div>

          {/* Body */}
          <motion.div variants={rise} custom={2} initial="hidden" animate="show" className="mt-4">
            {article.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </motion.div>

          {/* Share / CTA strip */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/60 px-6 py-5">
            <p className="text-sm text-gray-500">
              Working on something like this? We consult on exactly this.
            </p>
            <a
              href="mailto:contact@wigtn.com"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-white px-5 py-2.5 text-sm font-medium hover:bg-violet-dark transition-colors"
            >
              Talk to us <ArrowUpRight size={16} />
            </a>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-500">
                More from {KIND_LABEL[article.kind]}
              </span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  variants={rise}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10% 0px" }}
                >
                  <Link
                    href={articleHref(r.slug)}
                    className="group block rounded-2xl border border-gray-200 bg-white/70 p-6 hover:border-violet/40 hover:shadow-[0_8px_30px_rgba(139,92,246,0.08)] transition-all"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-violet">
                      {r.tag}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-violet-dark transition-colors">
                      {r.title}
                    </h3>
                    <div className="mt-3 text-xs text-gray-400">{r.date}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

"use client";

/**
 * MOCKUP — Research-led homepage renewal
 * ------------------------------------------------------------------
 * WIGTN as a deep-tech research & consulting org that proves itself
 * through a steady stream of published work. Every card links into a
 * real article detail page (see ArticleDetail.tsx + the [slug] route),
 * so the click-through flow is fully navigable on mock data.
 *
 * The logo intro is a reveal → it plays ONCE in the Preloader and fades
 * out (looping a reveal reads as uncanny). Scroll-in motion uses a single
 * `custom`-indexed variant so the easing curve is preserved.
 *
 * Viewable at /mockups/research-led (npm run dev).
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Calendar, MapPin } from "lucide-react";
import {
  articleHref,
  STATS,
  PARTNERS,
  POWERED_BY,
  TEAM_BADGES,
  FEATURED,
  REPORTS,
  EVENTS,
  COMMUNITY,
  INSIGHTS,
} from "./data";
import {
  SiteHeader,
  SiteFooter,
  BackdropDecor,
  IndexRule,
  EVENT_ICON,
  rise,
  VIEWPORT,
} from "./chrome";

/* ─────────────── Preloader ───────────────
 * Plays the logo intro reveal ONCE, then fades out. A fallback timer
 * dismisses it if `onEnded` never fires. mix-blend-multiply drops the
 * white-bg video's white so only the mark animates over #FAFAFA. */
function Preloader({ onDone }: { onDone: () => void }) {
  const [hide, setHide] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setHide(true);
    setTimeout(onDone, 700);
  };

  useEffect(() => {
    const t = setTimeout(finish, 6000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-[#FAFAFA] transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        src="/WIGTN%20Intro/04_Dynamic-White.mp4"
        autoPlay
        muted
        playsInline
        onEnded={finish}
        className="h-full w-full object-cover mix-blend-multiply"
      />
    </div>
  );
}

/* ─────────────── Page ─────────────── */

/* Module-scoped, so the intro plays once per real page load: it stays in
 * memory across client-side navigation (returning from an article doesn't
 * replay it) but resets on a fresh URL visit or hard refresh — which is
 * exactly when we want the reveal to play again. */
let introPlayed = false;

export function ResearchLedHome() {
  const [introDone, setIntroDone] = useState(introPlayed);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans antialiased">
      {!introDone && (
        <Preloader
          onDone={() => {
            introPlayed = true;
            setIntroDone(true);
          }}
        />
      )}
      <BackdropDecor />
      <SiteHeader />

      <main className="relative z-10">
        {/* ───── Hero ───── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
            <div>
              <motion.span
                variants={rise}
                initial="hidden"
                animate="show"
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-violet mb-5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                Deep-tech research &amp; consulting
              </motion.span>

              <motion.h1
                variants={rise}
                custom={1}
                initial="hidden"
                animate="show"
                className="text-[clamp(2.5rem,6.5vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.04]"
              >
                We <span className="text-violet">research</span>, we{" "}
                <span className="text-violet">publish</span>, we ship what works.
              </motion.h1>

              <motion.p
                variants={rise}
                custom={2}
                initial="hidden"
                animate="show"
                className="mt-6 text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed"
              >
                WIGTN is a deep-tech research crew. We study AI in the open, publish
                what we learn, and help enterprises put it to work.
              </motion.p>

              <motion.div
                variants={rise}
                custom={3}
                initial="hidden"
                animate="show"
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href={articleHref(FEATURED.slug)}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-white px-6 py-3 text-sm font-medium hover:bg-violet-dark transition-colors"
                >
                  Read the latest report <ArrowUpRight size={16} />
                </Link>
                <a
                  href="mailto:contact@wigtn.com"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium hover:border-foreground transition-colors"
                >
                  Talk to us
                </a>
              </motion.div>
            </div>

            {/* Brand lockup — navy wordmark over a soft violet glow. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative flex min-h-[220px] lg:min-h-[340px] items-center justify-center lg:justify-end"
            >
              <div
                aria-hidden
                className="absolute inset-0 m-auto h-56 w-56 lg:h-72 lg:w-72 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.22), transparent 70%)" }}
              />
              <div className="relative flex flex-col items-center lg:items-end gap-5">
                <img
                  src="/images/WIGTN_LOGO_NAVY.png"
                  alt="WIGTN"
                  className="w-full max-w-xs lg:max-w-md h-auto"
                />
                <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400">
                  <span>Research</span>
                  <span className="h-1 w-1 rounded-full bg-violet" />
                  <span>Publish</span>
                  <span className="h-1 w-1 rounded-full bg-violet" />
                  <span>Consult</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stat band */}
          <motion.div
            variants={rise}
            custom={4}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-gray-200 bg-white/40 backdrop-blur-sm overflow-hidden"
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={[
                  "p-6 md:p-8",
                  i % 2 !== 0 ? "border-l border-gray-200" : "",
                  i === 0 ? "" : "md:border-l md:border-gray-200",
                  i >= 2 ? "border-t border-gray-200 md:border-t-0" : "",
                ].join(" ")}
              >
                <div className="text-3xl md:text-[2.5rem] font-bold tracking-tight leading-none tabular-nums">
                  {s.value}
                </div>
                <div className="mt-3 text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ───── 01 Research ───── */}
        <section id="research" className="max-w-6xl mx-auto px-6 py-16 md:py-24 scroll-mt-20">
          <IndexRule n="01" label="Research" />
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Featured */}
            <motion.div variants={rise} initial="hidden" whileInView="show" viewport={VIEWPORT}>
              <Link href={articleHref(FEATURED.slug)} className="group block">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-violet/15 via-violet/5 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-7xl font-bold text-violet/25 select-none">w.</span>
                  </div>
                  <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.14em] uppercase text-violet-dark bg-white/80 backdrop-blur px-2.5 py-1 rounded-full">
                    {FEATURED.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold leading-snug tracking-tight group-hover:text-violet-dark transition-colors">
                  {FEATURED.title}
                </h3>
                <p className="mt-3 text-gray-500 leading-relaxed">{FEATURED.summary}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                  <span>{FEATURED.date}</span>
                  <span>·</span>
                  <span>{FEATURED.readTime} read</span>
                </div>
              </Link>
            </motion.div>

            {/* List */}
            <div className="flex flex-col divide-y divide-gray-200 border-t border-gray-200">
              {REPORTS.map((r, i) => (
                <motion.div key={r.slug} variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                  <Link href={articleHref(r.slug)} className="group flex items-start gap-5 py-5">
                    <div className="flex-1">
                      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-violet">
                        {r.tag}
                      </span>
                      <h4 className="mt-1.5 text-lg font-semibold leading-snug group-hover:text-violet-dark transition-colors">
                        {r.title}
                      </h4>
                      <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                        <span>{r.date}</span>
                        <span>·</span>
                        <span>{r.readTime}</span>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-gray-300 group-hover:text-violet transition-colors"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 02 Events ───── */}
        <section id="events" className="max-w-6xl mx-auto px-6 py-16 md:py-24 scroll-mt-20">
          <IndexRule n="02" label="Events · Conferences · Awards" />
          <div className="grid md:grid-cols-2 gap-6">
            {EVENTS.map((e, i) => {
              const Icon = e.icon ? EVENT_ICON[e.icon] : MapPin;
              return (
                <motion.div key={e.slug} variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                  <Link
                    href={articleHref(e.slug)}
                    className="group block rounded-2xl border border-gray-200 bg-white/70 overflow-hidden hover:border-violet/40 hover:shadow-[0_12px_40px_rgba(139,92,246,0.08)] transition-all"
                  >
                    <div className="flex items-center justify-between px-6 pt-6">
                      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-violet">
                        {e.tag}
                      </span>
                      <Icon className="text-violet" size={22} strokeWidth={1.5} />
                    </div>
                    <div className="px-6 pb-6 pt-3">
                      <h3 className="text-xl font-semibold leading-snug group-hover:text-violet-dark transition-colors">
                        {e.title}
                      </h3>
                      <p className="mt-3 text-sm text-gray-500 leading-relaxed">{e.summary}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} /> {e.date}
                        </span>
                        {e.place && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={13} /> {e.place}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ───── 03 Community ───── */}
        <section id="community" className="max-w-6xl mx-auto px-6 py-16 md:py-24 scroll-mt-20">
          <IndexRule n="03" label="Community · Meetups · Seminars" />
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {COMMUNITY.map((c, i) => (
              <motion.div key={c.slug} variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                <Link href={articleHref(c.slug)} className="group flex items-start gap-6 py-6">
                  <span className="text-xs text-gray-400 pt-1 w-24 shrink-0">{c.date}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold group-hover:text-violet-dark transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">{c.summary}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-gray-300 group-hover:text-violet transition-colors mt-1 shrink-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ───── 04 Tech Insights + YouTube ───── */}
        <section id="insights" className="max-w-6xl mx-auto px-6 py-16 md:py-24 scroll-mt-20">
          <IndexRule n="04" label="Tech Insights" />
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div className="lg:col-span-2" variants={rise} initial="hidden" whileInView="show" viewport={VIEWPORT}>
              <Link
                href={articleHref(INSIGHTS[0].slug)}
                className="group relative flex h-full min-h-[280px] items-end overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-violet-dark"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="text-violet-dark ml-1" size={26} fill="currentColor" />
                  </div>
                </div>
                <div className="relative p-6 text-white">
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-violet-light">
                    YouTube · New
                  </span>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold">{INSIGHTS[0].title}</h3>
                </div>
              </Link>
            </motion.div>

            <div className="flex flex-col gap-6">
              {INSIGHTS.map((s, i) => (
                <motion.div key={s.slug} className="flex-1" variants={rise} custom={i} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                  <Link
                    href={articleHref(s.slug)}
                    className="group block h-full rounded-2xl border border-gray-200 bg-white/70 p-6 hover:border-violet/40 transition-colors"
                  >
                    <h3 className="text-base font-semibold leading-snug group-hover:text-violet-dark transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.summary}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 05 Partners ───── */}
        <section id="partners" className="max-w-6xl mx-auto px-6 py-16 md:py-24 scroll-mt-20">
          <IndexRule n="05" label="Partners" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight max-w-lg">
              Organizations we officially partner with
            </h2>
            <p className="text-gray-500 max-w-sm">
              Partners we grow research, products, and markets with. Being listed here
              is a mark of trust.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className={`flex items-center justify-center h-24 rounded-2xl border text-sm font-semibold tracking-wide transition-colors ${
                  p === "MEGACODE"
                    ? "border-violet/40 bg-violet/5 text-violet-dark"
                    : "border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                {p}
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-center text-[11px] tracking-[0.22em] uppercase text-gray-400 mb-5">
              Powered by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-gray-300 text-sm font-medium">
              {POWERED_BY.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ───── 06 Who we are ───── */}
        <section id="team" className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 scroll-mt-20">
          <IndexRule n="06" label="Who we are" />
          <div className="relative rounded-3xl border border-gray-200 bg-white/70 p-8 md:p-14 overflow-hidden">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)" }}
            />
            <h2 className="relative text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight max-w-3xl leading-tight">
              Researchers, together, solving real problems for enterprises.
            </h2>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {TEAM_BADGES.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-gray-200 bg-[#FAFAFA] px-4 py-2 text-sm text-gray-600"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

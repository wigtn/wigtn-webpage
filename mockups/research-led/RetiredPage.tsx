import { PageShell } from "./chrome";

/**
 * A page that used to live at this URL and now lives somewhere else.
 *
 * `output: "export"` means there is no server to issue a 301, so this is the
 * next best thing: a meta refresh for browsers, a canonical link in the head
 * for crawlers (set in generateMetadata), and real visible text for anyone the
 * refresh does not reach. The delay is 0 so a normal visitor never reads it.
 *
 * The visible copy matters anyway. Someone arriving from a two-year-old link
 * should be able to tell that the page moved on purpose rather than rotted, and
 * a crawler renders this text even when it ignores the refresh.
 *
 * Two destinations, two different sentences. Most retired URLs point at the
 * tech-report site, but /work points at /news on this same site. One hardcoded
 * paragraph about "the tech reports" was wrong on that page, which is why the
 * copy is chosen from `to` rather than assumed.
 */
export function RetiredPage({ to, title }: { to: string; title: string }) {
  const offSite = to.startsWith("http");

  return (
    <PageShell>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-6 py-32">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
          Moved
        </span>
        <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
          {offSite ? `${title} is now in the tech reports` : `This is now ${title}`}
        </h1>
        <p className="mt-5 leading-relaxed text-ink-3">
          {offSite
            ? "Technical write-ups moved to the WIGTN tech-report site, where each one carries its method, its measurements and its limitations. This site now covers what the team does: events, releases and news."
            : "The page that used to be here grouped work that has since moved to the tech-report site. What is left of it, the events and the awards, lives in Updates."}
        </p>
        <a
          href={to}
          className="group mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-line/15 px-6 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:border-brand hover:bg-brand/10"
        >
          Continue to {title}{" "}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </PageShell>
  );
}

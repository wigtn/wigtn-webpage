"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";
import { RESULTS } from "@/constants/results";

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

export function Results() {
  const { language, t } = useLanguage();
  const { processText } = useBudouX();

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

      <div className="max-w-5xl mx-auto px-6 space-y-4">
        {RESULTS.map((item) => {
          const description = item.description[language];

          if (item.type === "product") {
            return (
              <Link
                key={item.id}
                href={item.link}
                className="group block bg-white rounded-2xl border border-gray-200 p-5 hover:border-violet/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-16 h-16 md:w-[72px] md:h-[72px] flex-shrink-0 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm`}
                  >
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {item.name.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-violet transition-colors">
                        {item.name}
                      </h3>
                      <StatusBadge status={item.status} />
                      {item.badge && <BadgeLabel text={item.badge} />}
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-violet transition-colors ml-auto flex-shrink-0" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {processText(description)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl border border-gray-200 p-5 hover:border-violet/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-16 h-16 md:w-[72px] md:h-[72px] flex-shrink-0 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm`}
                >
                  <GitHubIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-violet transition-colors">
                      {item.name}
                    </h3>
                    <StatusBadge status={item.status} />
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-violet transition-colors ml-auto flex-shrink-0" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

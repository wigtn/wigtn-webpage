"use client";

import { useLanguage } from "@/lib/i18n";

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

const PLUGINS = [
  {
    id: "wigtn-plugins-with-claude-code",
    name: "WIGTN Plugins with Claude Code",
    repo: "https://github.com/wigtn/wigtn-plugins-with-claude-code.git",
  },
  {
    id: "cursor-skills-toolkit",
    name: "Cursor Skills Toolkit",
    repo: "https://github.com/wigtn/cursor-skills-toolkit.git",
  },
];

export function Plugins() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet dark:text-violet-light mb-6 block tracking-wide">PLUGINS</span>
        <h2 className="text-section text-foreground dark:text-white mb-4">Open Source</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">Now it&apos;s your turn. Powered by WIGTN AI-native tools.</p>

        <div>
          {PLUGINS.map((plugin, index) => (
            <div
              key={plugin.id}
              className={`group py-8 ${
                index !== PLUGINS.length - 1 ? "border-b border-slate-200 dark:border-gray-800" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2 group-hover:text-violet dark:group-hover:text-violet-light transition-colors">
                    {plugin.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{t.plugins.items[index]}</p>
                </div>
                <a
                  href={plugin.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-violet dark:hover:text-violet-light transition-colors flex-shrink-0"
                >
                  <span>GitHub</span>
                  <GitHubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

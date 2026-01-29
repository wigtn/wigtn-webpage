import { Github } from "lucide-react";
import { CONTENT } from "@/constants";

export function Plugins() {
  const { label, title, description, items } = CONTENT.plugins;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet dark:text-violet-light mb-6 block tracking-wide">{label}</span>
        <h2 className="text-section text-foreground dark:text-white mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">{description}</p>

        <div className="space-y-6">
          {items.map((plugin) => (
            <div
              key={plugin.id}
              className="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-violet/50 dark:hover:border-violet-light/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 group-hover:text-violet dark:group-hover:text-violet-light transition-colors">
                    {plugin.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{plugin.description}</p>
                </div>
                <a
                  href={plugin.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full hover:border-violet hover:text-violet dark:hover:border-violet-light dark:hover:text-violet-light transition-colors flex-shrink-0"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

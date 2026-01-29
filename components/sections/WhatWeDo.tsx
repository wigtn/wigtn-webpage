import { CONTENT } from "@/constants";

export function WhatWeDo() {
  const { label, title, description, items } = CONTENT.whatWeDo;

  return (
    <section id="what-we-do" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet dark:text-violet-light mb-6 block tracking-wide">{label}</span>
        <h2 className="text-section text-foreground dark:text-white mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">{description}</p>

        <div className="space-y-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group pb-8 border-b border-slate-200 dark:border-gray-800 last:border-b-0 last:pb-0"
            >
              <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2 group-hover:text-violet dark:group-hover:text-violet-light transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

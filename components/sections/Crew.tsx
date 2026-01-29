import { CONTENT } from "@/constants";

export function Crew() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-hero text-foreground dark:text-white">
          {CONTENT.crew.title}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
          AI Native builders. Fast prototyping, strong engineering, shipping real things.
        </p>
      </div>
    </section>
  );
}

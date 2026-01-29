import { CONTENT } from "@/constants";

export function About() {
  const { label, tagline, text } = CONTENT.about;

  return (
    <section id="about" className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-sm font-semibold text-violet mb-6 block tracking-wide">{label}</span>
        <h2 className="text-section text-foreground mb-6">
          {tagline}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  );
}

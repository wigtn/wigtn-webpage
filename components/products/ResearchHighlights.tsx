"use client";

interface ResearchHighlightsProps {
  title: string;
  items: string[];
}

export function ResearchHighlights({ title, items }: ResearchHighlightsProps) {
  return (
    <div className="border-l-4 border-violet bg-violet/5 rounded-r-xl p-6 my-6">
      <h4 className="text-base font-semibold text-foreground mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
            <span className="text-violet mt-0.5 flex-shrink-0">&#8226;</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import type { ContentBlock, ResearchSection as ResearchSectionType } from "@/constants/projects";
import { ResearchHighlights } from "./ResearchHighlights";
import { BenchmarkTable } from "./BenchmarkTable";
import { FigureGallery } from "./FigureGallery";

interface ResearchSectionProps {
  section: ResearchSectionType;
  bgWhite?: boolean;
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "prose":
      return (
        <p
          key={index}
          className="text-base text-gray-700 leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    case "highlights":
      return <ResearchHighlights key={index} title={block.title} items={block.items} />;
    case "list":
      return (
        <ul key={index} className="space-y-2 my-4 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
              <span className="text-violet mt-0.5 flex-shrink-0">&#8226;</span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return <BenchmarkTable key={index} caption={block.caption} headers={block.headers} rows={block.rows} />;
    case "figure":
      return <FigureGallery key={index} images={block.images} layout={block.layout} />;
    default:
      return null;
  }
}

export function ResearchSectionComponent({ section, bgWhite }: ResearchSectionProps) {
  return (
    <section id={section.id} className={`py-12 md:py-16 ${bgWhite ? "bg-white" : ""}`}>
      <div className="max-w-5xl mx-auto px-6">
        {section.subtitle && (
          <span className="text-xs font-semibold text-violet mb-2 block tracking-wide uppercase">
            {section.subtitle}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          {section.title}
        </h2>
        {section.blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </section>
  );
}

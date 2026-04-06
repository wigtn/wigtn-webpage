"use client";

import { useEffect, useState } from "react";

export interface TocEntry {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (intersections) => {
        // Find the first entry that is intersecting from the top
        for (const entry of intersections) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    const elements: Element[] = [];
    for (const { id } of entries) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      for (const el of elements) observer.unobserve(el);
    };
  }, [entries]);

  if (entries.length === 0) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="hidden xl:block fixed right-[max(1rem,calc((100vw-80rem)/2+1rem))] top-32 w-56">
      <div className="border-l border-gray-200 pl-4">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
          On this page
        </span>
        <ul className="space-y-1.5">
          {entries.map((entry) => (
            <li key={entry.id}>
              <button
                onClick={() => handleClick(entry.id)}
                className={`text-left text-[13px] leading-snug transition-colors w-full truncate ${
                  activeId === entry.id
                    ? "text-violet font-medium"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {entry.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

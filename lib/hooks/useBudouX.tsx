"use client";

import React, { useMemo } from "react";
import { loadDefaultJapaneseParser } from "budoux";
import { useLanguage } from "@/lib/i18n";

const jaParser = loadDefaultJapaneseParser();

export function useBudouX() {
  const { language } = useLanguage();

  const processText = useMemo(() => {
    return (text: string) => {
      if (!text) return text;

      // Handle HTML tags like <br>
      if (text.includes("<br>") || text.includes("<br/>")) {
        const parts = text.split(/<br\s*\/?>/);
        return parts.map((part, i) => (
          <React.Fragment key={i}>
            {processSegment(part, language)}
            {i < parts.length - 1 && <br />}
          </React.Fragment>
        ));
      }
      return processSegment(text, language);
    };
  }, [language]);

  return { processText };
}

function processSegment(text: string, language: string): React.ReactNode {
  // Korean: use word-break: keep-all for natural Korean line-breaking
  if (language === "ko") {
    return <span style={{ wordBreak: "keep-all" }}>{text}</span>;
  }

  // Japanese: use BudouX for ML-based line-breaking
  if (language === "ja") {
    const chunks = jaParser.parse(text);
    return chunks.map((chunk, i) => (
      <React.Fragment key={i}>
        <span style={{ display: "inline-block" }}>{chunk}</span>
        {i < chunks.length - 1 && <wbr />}
      </React.Fragment>
    ));
  }

  // English: return as-is
  return text;
}

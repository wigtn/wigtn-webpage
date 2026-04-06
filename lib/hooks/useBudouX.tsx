"use client";

import React, { useMemo } from "react";

export function useBudouX() {
  const processText = useMemo(() => {
    return (text: string): React.ReactNode => {
      if (!text) return text;

      // Handle HTML tags like <br>
      if (text.includes("<br>") || text.includes("<br/>")) {
        const parts = text.split(/<br\s*\/?>/);
        return parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && <br />}
          </React.Fragment>
        ));
      }
      return text;
    };
  }, []);

  return { processText };
}

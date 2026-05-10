"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useTokenStats } from "@/lib/useTokenStats";

const STATS_URL = process.env.NEXT_PUBLIC_STATS_URL;

export function TokenCounter() {
  const total = useTokenStats(STATS_URL);
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    if (total == null) return;
    const controls = animate(prev.current, total, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prev.current = total;
    return () => controls.stop();
  }, [total]);

  if (!STATS_URL || total == null) return null;

  return (
    <p className="mt-6 md:mt-7 text-xs sm:text-sm text-neutral-500 tabular-nums">
      <span className="font-medium text-neutral-700">
        {display.toLocaleString()}
      </span>{" "}
      tokens processed by the crew
    </p>
  );
}

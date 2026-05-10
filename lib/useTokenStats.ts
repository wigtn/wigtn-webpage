"use client";

import { useEffect, useState } from "react";

interface TotalsPayload {
  totals?: { sum?: number };
}

export function useTokenStats(baseUrl: string | undefined): number | null {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    if (!baseUrl) return;

    let cancelled = false;
    let es: EventSource | null = null;
    let pollTimer: number | null = null;

    const apply = (data: TotalsPayload) => {
      const v = data?.totals?.sum;
      if (typeof v === "number" && !cancelled) setTotal(v);
    };

    const startPolling = () => {
      if (pollTimer != null) return;
      const tick = async () => {
        try {
          const r = await fetch(`${baseUrl}/api/usage/totals`, {
            cache: "no-store",
          });
          if (r.ok) apply(await r.json());
        } catch {
          /* swallow — next tick will retry */
        }
      };
      void tick();
      pollTimer = window.setInterval(tick, 30_000);
    };

    try {
      es = new EventSource(`${baseUrl}/api/usage/stream`);
      es.addEventListener("totals", (ev) => {
        try {
          apply(JSON.parse((ev as MessageEvent).data));
        } catch {
          /* malformed event — ignore */
        }
      });
      es.onerror = () => {
        es?.close();
        es = null;
        startPolling();
      };
    } catch {
      startPolling();
    }

    return () => {
      cancelled = true;
      es?.close();
      if (pollTimer != null) clearInterval(pollTimer);
    };
  }, [baseUrl]);

  return total;
}

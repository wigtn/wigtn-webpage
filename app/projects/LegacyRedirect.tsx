"use client";

/**
 * Client-side redirect for legacy /projects/* URLs. The site is a static
 * export (output: "export"), so HTTP redirects are unavailable. The
 * exported stub forwards on load instead. The old light-theme project
 * pages are superseded by Updates. This used to forward to /work, which has
 * since been retired and forwards to /news itself; pointing straight at /news
 * removes the middle hop and the "Projects" label that outlived the page.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LegacyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/news");
  }, [router]);
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper text-ink-4">
      <p>
        This page has moved, taking you to{" "}
        <Link href="/news" className="underline hover:text-ink">
          Updates
        </Link>
        …
      </p>
    </main>
  );
}

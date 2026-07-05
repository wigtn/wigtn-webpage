"use client";

/**
 * Client-side redirect for legacy /projects/* URLs. The site is a static
 * export (output: "export"), so HTTP redirects are unavailable — the
 * exported stub forwards on load instead. The old light-theme project
 * pages are superseded by the research-led /work/ page.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LegacyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/work/");
  }, [router]);
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-zinc-400">
      <p>
        This page has moved — taking you to{" "}
        <Link href="/work/" className="underline hover:text-white">
          Projects
        </Link>
        …
      </p>
    </main>
  );
}

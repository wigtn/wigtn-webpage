"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Saves and restores the scroll position of the <main> snap container
 * so that browser back-navigation returns to the exact scroll position.
 */
export function ScrollRestore() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    // Restore saved position for this path
    const saved = sessionStorage.getItem(`scroll:${pathname}`);
    if (saved) {
      main.scrollTop = Number(saved);
    }

    // Save position on scroll
    const save = () => {
      sessionStorage.setItem(`scroll:${pathname}`, String(main.scrollTop));
    };

    main.addEventListener("scroll", save, { passive: true });
    return () => main.removeEventListener("scroll", save);
  }, [pathname]);

  return null;
}

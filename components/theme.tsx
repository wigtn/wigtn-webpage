"use client";

/**
 * Theme (light ⇄ dark): demo wiring for the meeting.
 * ------------------------------------------------------------------
 * The whole site reads its colors from CSS variables declared in
 * app/globals.css under `:root` (light) and `.dark`. Flipping the theme is
 * therefore a single class toggle on <html>; nothing re-renders.
 *
 * Resolution order: explicit choice in localStorage → OS preference. Until
 * someone picks a side, the site keeps tracking the OS so a dark-mode laptop
 * lands on dark.
 */

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  // Enable the cross-fade only for the duration of the swap, so the transition
  // never bleeds into hover states or route changes.
  root.classList.add("theme-transition");
  root.classList.toggle("dark", theme === "dark");
  window.setTimeout(() => root.classList.remove("theme-transition"), 300);
}

export function useTheme() {
  // Start "light" to match the server-rendered markup, then reconcile in the
  // effect below. The pre-paint script has already set the real class, so
  // this never causes a visible flash.
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Re-resolve here as a CSP/storage-safe fallback. The pre-paint script is
    // still the fast path, but the hydrated control must not blindly trust a
    // missing class if that script or localStorage access was blocked.
    const initial = storedTheme() ?? systemTheme();
    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);
    setMounted(true);

    // Keep following the OS until the visitor makes an explicit choice.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (storedTheme()) return;
      const next = systemTheme();
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* private mode: the toggle still works for this session */
      }
      return next;
    });
  }, []);

  return { theme, toggle, mounted };
}

/** Header control: sun on dark, moon on light. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      // Before mount both themes are plausible, so don't announce a stale
      // label to assistive tech.
      aria-label={mounted ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Switch theme"}
      title={mounted ? (isDark ? "Light mode" : "Dark mode") : undefined}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/15 text-ink-2 transition-colors hover:border-ink hover:text-ink ${className}`}
    >
      {/* Both icons are rendered and swapped by CSS so the control is correct
          on the very first paint, before React hydrates. */}
      <Moon size={16} className="dark:hidden" />
      <Sun size={16} className="hidden dark:block" />
    </button>
  );
}

/**
 * Theme constants shared by the server layout and the client toggle.
 * Kept out of components/theme.tsx because that file is "use client": a
 * server component can't read plain values across that boundary.
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "wigtn-theme";

/**
 * Runs before first paint (inlined into <head>) so the page never flashes the
 * wrong theme. Dependency-free on purpose, since an external module would load too
 * late. Resolution order: explicit choice in localStorage → dark.
 *
 * Dark is the site's theme since 2026-10-20; light is opt-in through the
 * header toggle. It was light from 2026-10-19, and before that the OS
 * preference decided the first visit. A visitor who already picked a side
 * keeps it. The server-rendered <html> already carries `dark`, so the page is
 * dark even where this script cannot run; the script only takes it off for a
 * stored "light".
 */
export const themeInitScript = `
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
  } catch (e) {}
  document.documentElement.classList.toggle("dark", stored !== "light");
})();
`.trim();

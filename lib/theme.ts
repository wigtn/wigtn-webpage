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
 * late. Resolution order: explicit choice in localStorage → OS preference.
 */
export const themeInitScript = `
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
  } catch (e) {}
  var theme =
    stored === "light" || stored === "dark"
      ? stored
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
})();
`.trim();

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
 * late. Resolution order: explicit choice in localStorage → light.
 *
 * Light is the site's theme; dark is opt-in through the header toggle. The OS
 * preference used to decide the first visit, which put every dark-mode laptop
 * on the dark site. A visitor who already picked a side keeps it.
 */
export const themeInitScript = `
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
  } catch (e) {}
  document.documentElement.classList.toggle("dark", stored === "dark");
})();
`.trim();

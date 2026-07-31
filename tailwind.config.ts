import type { Config } from "tailwindcss";

/* Semantic color token. Resolves to `rgb(var(--x) / <alpha>)` so every
 * token supports Tailwind's `/opacity` suffix (e.g. `border-line/[0.08]`)
 * while its actual value is swapped by the `.dark` class in globals.css. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mockups/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#0A0A0A",
        background: "#FAFAFA",
        violet: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
        },
        /* Pantone 265 C (standard conversion), the research-led mockup accent.
         * All three shift per theme so purple keeps the same perceived weight
         * on paper and on ink. `brand-dark` is the "one step down" fill used
         * for hover on filled brand buttons. */
        brand: {
          DEFAULT: token("brand"),
          light: token("brand-light"),
          dark: token("brand-dark"),
        },

        /* ── Theme tokens (light ⇄ dark) ────────────────────────────────
         * paper*  = surfaces, back to front: page → sunken → raised → tint
         * ink*    = text, 1 (strongest) → 5 (faintest)
         * rule    = solid hairline; line = alpha hairline / hover wash
         * accent  = the brand tone that stays legible ON the page surface
         * Values live in app/globals.css under :root and .dark. */
        paper: {
          DEFAULT: token("paper"),
          raised: token("paper-raised"),
          sunken: token("paper-sunken"),
          tint: token("paper-tint"),
        },
        ink: {
          DEFAULT: token("ink"),
          2: token("ink-2"),
          3: token("ink-3"),
          4: token("ink-4"),
          5: token("ink-5"),
        },
        rule: token("rule"),
        line: token("line"),
        accent: token("accent"),
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "sans-serif"],
        /* Display grotesk for headlines. Latin glyphs render in Space Grotesk;
         * Hangul falls back per-glyph to Pretendard, so mixed KR/EN titles work. */
        display: ["Space Grotesk", "Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        /* Real mono so index numbers / dates / labels stop falling back to the
         * OS default (Menlo vs Consolas). This is the research-lab texture. */
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

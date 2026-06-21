import type { Config } from "tailwindcss";

const config: Config = {
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
        /* Pantone 265 C (standard conversion) — research-led mockup accent.
         * Swap these three hexes if the exact brand spec differs. */
        brand: {
          DEFAULT: "#753BBD",
          light: "#9D7BE0",
          dark: "#5A2E97",
        },
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "sans-serif"],
        /* Display grotesk for headlines. Latin glyphs render in Space Grotesk;
         * Hangul falls back per-glyph to Pretendard, so mixed KR/EN titles work. */
        display: ["Space Grotesk", "Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        /* Real mono so index numbers / dates / labels stop falling back to the
         * OS default (Menlo vs Consolas) — this is the research-lab texture. */
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

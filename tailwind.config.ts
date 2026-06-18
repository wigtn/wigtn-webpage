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
        // Trendy, open-licensed pair scoped to the research-led mockup.
        display: ["var(--font-display)", "Pretendard Variable", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Pretendard Variable", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

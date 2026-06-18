import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";

/**
 * Fonts scoped to the research-led mockup only (so the real site keeps
 * Pretendard). Both are open-licensed (SIL OFL):
 *   - Space Grotesk → display / headings (techy, geometric)
 *   - Inter → body
 * Exposed as CSS variables consumed by tailwind's `font-display` / `font-body`.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function ResearchLedLayout({ children }: { children: ReactNode }) {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}

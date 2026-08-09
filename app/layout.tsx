import type { Metadata, Viewport } from "next";
import { ScrollRestore } from "@/components/ScrollRestore";
import { DESCRIPTION, ORG_NAME, SITE_URL } from "@/lib/brand";
import { organizationSchema } from "@/lib/schema";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* Sub-pages override `title`, `description`, `alternates` and `openGraph.url`.
 * Anything a page leaves unset is inherited from here, which is why /team and
 * /notices used to advertise og:url = https://wigtn.com: they set no metadata at
 * all, so a shared link to either resolved to the homepage card. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: ORG_NAME,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: ORG_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: ORG_NAME,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: themeInitScript stamps `dark` on <html> before
    // React hydrates, so the class list legitimately differs from the SSR HTML.
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* Display (Space Grotesk) + mono (JetBrains Mono), see tailwind fontFamily */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
        <link rel="alternate" href="/llms.txt" type="text/plain" title="LLMs.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-paper text-ink">
        <ScrollRestore />
        {children}
      </body>
    </html>
  );
}

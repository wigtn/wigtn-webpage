import type { Metadata, Viewport } from "next";
import { ScrollRestore } from "@/components/ScrollRestore";
import { DESCRIPTION, ORG_NAME, SITE_URL } from "@/lib/brand";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/metadata";
import { organizationSchema } from "@/lib/schema";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* What every page inherits. Each route sets its own title, description,
 * canonical and cards through pageMetadata (lib/metadata.ts); the layout sets
 * no canonical or og:url, because a page that inherited one (the 404, and
 * /team and /notices before they had metadata) claimed to be the homepage. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: ORG_NAME,
    template: `%s | ${ORG_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: {
    siteName: ORG_NAME,
    type: "website",
    locale: "en_US",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: DEFAULT_SOCIAL_IMAGE.url, alt: DEFAULT_SOCIAL_IMAGE.alt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Dark is the default, so the SSR HTML ships with `dark` on <html>.
    // suppressHydrationWarning: themeInitScript takes it off before React
    // hydrates for a visitor who chose light, so the class list can
    // legitimately differ from the SSR HTML.
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
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

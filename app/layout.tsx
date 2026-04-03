import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/lib/i18n";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wigtn.com"),
  title: "WIGTN Crew",
  description: "We prove ourselves by what we build, not how long we've built.",
  openGraph: {
    title: "WIGTN Crew",
    description: "AI-native open-source research crew building practical, domain-specialized AI tools.",
    url: "https://wigtn.com",
    siteName: "WIGTN",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="alternate" href="/llms.txt" type="text/plain" title="LLMs.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#FAFAFA] text-foreground">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { AD_CONFIG } from "@/lib/ads";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BriefUtils - Free Online Tools for Everyone",
  description: "A collection of simple, fast, and free online tools including PNG to JPEG converter, word counter, JSON formatter, QR code generator, and more. No registration required.",
  keywords: "online tools, free tools, png to jpeg, word counter, json formatter, qr code generator, age calculator",
  authors: [{ name: "BriefUtils" }],
  creator: "BriefUtils",
  publisher: "BriefUtils",
  robots: "index, follow",
  other: {
    "google-adsense-account": "ca-pub-2701468620398349",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://briefutils.com",
    siteName: "BriefUtils",
    title: "BriefUtils - Free Online Tools for Everyone",
    description: "A collection of simple, fast, and free online tools including PNG to JPEG converter, word counter, JSON formatter, QR code generator, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BriefUtils - Free Online Tools for Everyone",
    description: "A collection of simple, fast, and free online tools including PNG to JPEG converter, word counter, JSON formatter, QR code generator, and more.",
    creator: "@briefutils",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google AdSense */}
        {AD_CONFIG.ENABLED && (
          <>
            <Script
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CONFIG.PUBLISHER_ID}`}
              strategy="beforeInteractive"
              crossOrigin="anonymous"
            />
            {AD_CONFIG.AUTO_ADS && (
              <Script id="adsense-auto-ads" strategy="afterInteractive">
                {`
                  if (typeof window !== 'undefined') {
                    // Prevent duplicate auto ads initialization
                    if (!window.adsbygoogle_initialized) {
                      window.adsbygoogle_initialized = true;
                      // Ensure adsbygoogle array exists
                      window.adsbygoogle = window.adsbygoogle || [];
                      // Only push auto ads config once
                      window.adsbygoogle.push({
                        google_ad_client: "${AD_CONFIG.PUBLISHER_ID}",
                        enable_page_level_ads: true
                      });
                    }
                  }
                `}
              </Script>
            )}
          </>
        )}
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

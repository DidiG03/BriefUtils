import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { AD_CONFIG } from "@/lib/ads";
import { ClerkProvider } from "@clerk/nextjs";
import ClerkUserBridge from "@/components/ClerkUserBridge";
import AdsterraPopunder from "@/components/AdsterraPopunder";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BriefUtils - Free Online Tools for Everyone",
  description: "A collection of simple, fast, and free online tools including PNG to JPEG converter, word counter, JSON formatter, QR code generator, and more. No registration required.",
  keywords: "online tools, free tools, png to jpeg, word counter, json formatter, qr code generator, age calculator",
  authors: [{ name: "BriefUtils" }],
  creator: "BriefUtils",
  publisher: "BriefUtils",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/fav.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/fav.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/fav.ico',
  },
  other: {
    "google-adsense-account": AD_CONFIG.PUBLISHER_ID,
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

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
      {/* Google AdSense */}
      {AD_CONFIG.ENABLED && AD_CONFIG.PUBLISHER_ID && process.env.NODE_ENV === 'production' && (
        <>
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CONFIG.PUBLISHER_ID}`}
            strategy="beforeInteractive"
            crossOrigin="anonymous"
          />
          
          {/* Ad Blocking Recovery */}
          {AD_CONFIG.AD_BLOCKING_RECOVERY && (
            <>
              <Script
                src={`https://fundingchoicesmessages.google.com/i/${AD_CONFIG.PUBLISHER_ID}?ers=1`}
                strategy="beforeInteractive"
              />
              <Script id="ad-blocking-recovery" strategy="beforeInteractive">
                {`
                  (function() {
                    function signalGooglefcPresent() {
                      if (!window.frames['googlefcPresent']) {
                        if (document.body) {
                          const iframe = document.createElement('iframe');
                          iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1px; position: absolute;';
                          iframe.name = 'googlefcPresent';
                          document.body.appendChild(iframe);
                        } else {
                          setTimeout(signalGooglefcPresent, 0);
                        }
                      }
                    }
                    signalGooglefcPresent();
                  })();
                `}
              </Script>
            </>
          )}

          {AD_CONFIG.AUTO_ADS && (
            <Script id="adsense-auto-ads" strategy="afterInteractive">
              {`
                (function() {
                  if (typeof window === 'undefined') return;
                  
                  // Prevent duplicate auto ads initialization
                  if (window.adsbygoogle_auto_ads_initialized) return;
                  window.adsbygoogle_auto_ads_initialized = true;
                  
                  // Wait for adsbygoogle to be available
                  function initAutoAds() {
                    try {
                      // Skip auto ads for premium users
                      var clerkUser = (window).__clerk_user__;
                      if (clerkUser && clerkUser.publicMetadata && clerkUser.publicMetadata.isPremium) {
                        return;
                      }
                    } catch (e) {}
                    if (window.adsbygoogle) {
                      try {
                        window.adsbygoogle = window.adsbygoogle || [];
                        window.adsbygoogle.push({
                          google_ad_client: "${AD_CONFIG.PUBLISHER_ID}",
                          enable_page_level_ads: true
                        });
                      } catch (e) {
                        console.warn('Auto ads already initialized');
                      }
                    } else {
                      // Retry if adsbygoogle is not ready
                      setTimeout(initAutoAds, 100);
                    }
                  }
                  
                  initAutoAds();
                })();
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    return (
      <>
        <AdsterraPopunder />
        <AppShell>{children}</AppShell>
      </>
    );
  }
  return (
    <ClerkProvider>
      <ClerkUserBridge />
      <AdsterraPopunder />
      <AppShell>{children}</AppShell>
    </ClerkProvider>
  );
}

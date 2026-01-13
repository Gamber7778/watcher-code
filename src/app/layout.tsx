import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#121110',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Код Смотрителя | Артефакт Намерения",
  description: "Практический курс по Трансерфингу реальности. Интерактивная система + закрытый практикум + персональное сопровождение.",
  metadataBase: new URL('https://watcher-code.vercel.app'),
  openGraph: {
    title: "Код Смотрителя | Артефакт Намерения",
    description: "Практический курс по Трансерфингу реальности. Интерактивная система + закрытый практикум + персональное сопровождение.",
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Код Смотрителя | Артефакт Намерения",
    description: "Практический курс по Трансерфингу реальности. Интерактивная система + закрытый практикум + персональное сопровождение.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${manrope.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TBKC4J9949"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TBKC4J9949');
          `}
        </Script>
        
        {children}
      </body>
    </html>
  );
}

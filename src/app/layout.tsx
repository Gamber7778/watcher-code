import type { Metadata, Viewport } from "next";
import "./school-fonts.css";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#121110',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Код Смотрителя — программа, уроки и сопровождение",
  description: "«Код Смотрителя»: видеоуроки, тексты и практика на учебной платформе в вашем темпе. Курс с поддержкой — $95. Персональная работа с Вадимом — шесть месяцев.",
  metadataBase: new URL('https://zeland.it.com'),
  openGraph: {
    title: "Код Смотрителя — программа, уроки и сопровождение",
    description: "«Код Смотрителя»: видеоуроки, тексты и практика на учебной платформе в вашем темпе. Курс с поддержкой — $95. Персональная работа с Вадимом — шесть месяцев.",
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Код Смотрителя — программа, уроки и сопровождение",
    description: "«Код Смотрителя»: видеоуроки, тексты и практика на учебной платформе в вашем темпе. Курс с поддержкой — $95. Персональная работа с Вадимом — шесть месяцев.",
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
        className={"antialiased"} data-analytics-id="G-TBKC4J9949"
      >
        {/* Google Analytics */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            if (!['/course','/course/'].includes(location.pathname)) {
            const script = document.createElement('script');
            script.src='https://www.googletagmanager.com/gtag/js?id=G-TBKC4J9949';
            script.async=true;document.head.append(script);
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TBKC4J9949');
            }
          `}
        </Script>
        
        {children}
      </body>
    </html>
  );
}

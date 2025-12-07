import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
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
  themeColor: '#121110',
};

export const metadata: Metadata = {
  title: "Код Смотрителя | Артефакт Намерения",
  description: "Интерактивная Система + Закрытое Сообщество + Личное Сопровождение Вадима Зеланда.",
  metadataBase: new URL('https://watcher-code.vercel.app'),
  openGraph: {
    title: "Код Смотрителя | Артефакт Намерения",
    description: "Интерактивная Система + Закрытое Сообщество + Личное Сопровождение Вадима Зеланда.",
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Код Смотрителя | Артефакт Намерения",
    description: "Интерактивная Система + Закрытое Сообщество + Личное Сопровождение Вадима Зеланда.",
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
        {children}
      </body>
    </html>
  );
}

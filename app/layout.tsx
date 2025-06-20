import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Cinema+ | Смотрите фильмы онлайн",
  description:
    "Современная платформа для просмотра фильмов и сериалов онлайн. Большая коллекция контента в высоком качестве.",
  keywords: "фильмы, сериалы, онлайн, кино, Cinema+",
  authors: [{ name: "NBKN.ru" }],
  openGraph: {
    title: "Cinema+ | Смотрите фильмы онлайн",
    description: "Современная платформа для просмотра фильмов и сериалов онлайн",
    type: "website",
    locale: "ru_RU",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/fonts/mw-medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YJDSNZBKG0"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJDSNZBKG0');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

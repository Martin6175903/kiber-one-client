import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./global.css";
import { SITE_DESCRIPTION, SITE_NAME } from '@/src/constants/seo.constants'
import React from 'react'
import Providers from '@/src/app/providers'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION
}

const franklinGothicBook = localFont({
  src: '../../public/fonts/franklinGothicBook.woff2',
  variable: "--font-franklin-gothic-book"
})

const franklinGothicMediumCond = localFont({
  src: '../../public/fonts/franklinGothicMediumCond.ttf',
  variable: "--font-franklin-gothic-medium-cond"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${franklinGothicBook.variable} ${franklinGothicMediumCond.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

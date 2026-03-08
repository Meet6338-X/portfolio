import type { Metadata } from 'next';
import './globals.css';
import { portfolioConfig } from '@/config/portfolio.config';

const { seo, name } = portfolioConfig;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name }],
  creator: name,
  publisher: name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-coral-five-89.vercel.app',
    siteName: name,
    images: [{ url: seo.ogImage, width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    creator: seo.twitterHandle,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

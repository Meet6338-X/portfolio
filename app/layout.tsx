import type { Metadata } from 'next';
import './globals.css';
import { portfolioConfig } from '@/config/portfolio.config';
import { getAbsoluteUrl, getSiteUrl } from '@/lib/site';

const { seo, name } = portfolioConfig;
const siteUrl = getSiteUrl();
const ogImageUrl = seo.ogImage.startsWith('http') ? seo.ogImage : getAbsoluteUrl(seo.ogImage);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name }],
  creator: name,
  publisher: name,
  alternates: {
    canonical: siteUrl,
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: siteUrl,
    siteName: name,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${name} profile photo` }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    creator: seo.twitterHandle,
    images: [ogImageUrl],
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

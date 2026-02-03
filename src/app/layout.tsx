import type { Metadata, Viewport } from 'next';
import './globals.css';
import { nunito } from './fonts';
import { AuthProvider } from '@/contexts/AuthContext';

// Correct: Separate Viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  // Sets the base for all relative URLs (og:image, canonical, etc.)
  metadataBase: new URL('https://kotfood.vercel.app/'),
  title: {
    default: 'Kotfood | Budget-Friendly Student Recipes',
    template: '%s | Kotfood',
  },
  description: 'Easy, cheap, and student-approved recipes for your kot life.',
  openGraph: {
    title: 'Kotfood | Easy Student Cooking',
    description:
      'Master the art of student cooking with budget-friendly recipes.',
    url: 'https://kotfood.be',
    siteName: 'Kotfood',
    images: [
      {
        url: '/thumbnail/thumbnail.jpg', // Automatically resolved via metadataBase
        width: 1200,
        height: 630,
        alt: 'Kotfood - Cooking for students',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kotfood | Budget Student Recipes',
    images: ['/thumbnail/thumbnail.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${nunito.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

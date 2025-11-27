import './globals.css';
import type { ReactNode } from 'react';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'Bright Beginnings Preschool - Where Learning Begins with Joy',
  description: 'Nurturing young minds through play-based learning. Quality early childhood education for ages 2-5. Enroll your child today at Bright Beginnings Preschool!',
  keywords: 'preschool, early childhood education, kindergarten, daycare, child development, Bright Beginnings',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

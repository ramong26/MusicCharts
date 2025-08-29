import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from './providers/QueryProvider';
import { Archivo_Black, Oswald } from 'next/font/google';
import HeaderMain from '@/shared/components/HeaderMain/HeaderMain';

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SoundTalk',
  description: '음악 차트 & 플레이리스트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${oswald.variable} ${archivoBlack.variable}`}>
        <HeaderMain />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

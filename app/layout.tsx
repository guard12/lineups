import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar, Footer } from './components';

const latoLight = localFont({
  src: './fonts/Lato-Light.woff',
  variable: '--font-lato-light',
  weight: '100 900',
});
const latoRegular = localFont({
  src: './fonts/Lato-Regular.woff',
  variable: '--font-lato-regular',
  weight: '100 900',
});
const latoBold = localFont({
  src: './fonts/Lato-Bold.woff',
  variable: '--font-lato-bold',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Lineups',
  description: 'Lineups is a sports team management app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${latoLight.variable} ${latoRegular.variable} ${latoBold.variable} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}

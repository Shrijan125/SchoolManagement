import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NextSessionProvider from '@/providers/session-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Akshar Vidya Griha',
  description: 'Designed by Devaxis studio',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={'class'}
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NextSessionProvider session={session}>
            {children}
          </NextSessionProvider>
        </ThemeProvider>
        <Toaster></Toaster>
      </body>
    </html>
  );
}

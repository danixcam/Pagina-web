import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tu Portal Empresarial',
  description: 'Portal empresarial con achachairú',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Script de Font Awesome en el head */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
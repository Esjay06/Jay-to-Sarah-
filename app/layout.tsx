import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For You',
  description: 'An honest conversation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-darkBg text-gray-100 min-h-screen selection:bg-purple-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}

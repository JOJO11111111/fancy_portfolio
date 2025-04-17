import './globals.css';
import { Orbitron, Rajdhani, Exo_2 } from 'next/font/google';
import type { Metadata } from 'next';

// Font configurations
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-rajdhani' });
const exo2 = Exo_2({ subsets: ['latin'], variable: '--font-exo2' });

export const metadata: Metadata = {
  title: 'Tiffany | Cyberpunk Portfolio',
  description: 'A cyberpunk-themed portfolio website showcasing my digital creations and technical skills.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${exo2.variable}`}>
      <body>
        <div className="scan-line"></div>
        {children}
      </body>
    </html>
  );
} 
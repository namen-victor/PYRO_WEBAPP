import type { ReactNode } from 'react';
import './globals.css';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'PyroSolutions Inc. | Get Noticed. Get Hired.',
  description: 'Land your dream job in as fast as 4 weeks. We offer AI & human career services to help you stand out.',
  metadataBase: new URL('https://www.pyrosolutionsinc.com'),
  openGraph: {
    title: 'PyroSolutions Inc. | Get Noticed. Get Hired.',
    description: 'Land your dream job in as fast as 4 weeks. We offer AI & human career services to help you stand out.',
    url: 'https://www.pyrosolutionsinc.com',
    siteName: 'PyroSolutions Inc.',
    images: [
      {
        url: 'https://www.pyrosolutionsinc.com/social-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'PyroSolutions Inc. - Get Noticed. Get Hired.',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyroSolutions Inc. | Get Noticed. Get Hired.',
    description: 'Land your dream job in as fast as 4 weeks. We offer AI & human career services to help you stand out.',
    images: ['https://www.pyrosolutionsinc.com/social-preview.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ 
          padding: '12px 16px', 
          borderBottom: '1px solid #eee',
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Logo size="sm" />
            </div>
            <div id="header-role-badge"></div>
          </div>
        </header>
        <main style={{ padding: 16, minHeight: 'calc(100vh - 60px)' }}>{children}</main>
      </body>
    </html>
  );
}




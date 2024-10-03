import './globals.scss';
import { ReactNode } from 'react';
import { ThemeProvider } from '../components/ThemeContext';
import Navbar from '@/components/Navbar';
import BootstrapJS from '@/components/BootstrapJS';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'SPEED App',
  description: 'A web application for evidence-based software practices',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <BootstrapJS />
      <body>
        <ThemeProvider>
          <Navbar />
          <div className='content-wrapper'>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

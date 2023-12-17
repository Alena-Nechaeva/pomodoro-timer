import './globals.css';
import type { Metadata } from 'next';
import SFUIDisplay from 'next/font/local';
import StoreProvider from '@/store/StoreProvider';
import Header from './components/Header/Header';

const displayFont = SFUIDisplay({
  src: [
    {
      path: '../../font/bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../font/medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../font/regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../font/light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../font/thin.woff2',
      weight: '200',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Pomodoro timer',
  description: 'React course project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${displayFont.className} dark:bg-darkBg`}>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
        <div id='modal-root'></div>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';

import Providers from '~/app/providers';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = '3Xg';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | 3Xg' },
  description:
    'A modern E-commerce platform that allows you to buy and sell products online.',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://3-xg.vercel.app/',
    title:
      '3Xg - A modern E-commerce platform that allows you to buy and sell products online.',
    description:
      'A modern E-commerce platform that allows you to buy and sell products online.',
    images: {
      url: 'https://3-xg.vercel.app/',
      alt: '3Xg',
    },
  },
  twitter: {
    creator: '@mikie_1',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;

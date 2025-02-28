import type { DeepPartial, Theme } from '@chakra-ui/react';
import localFont from 'next/font/local';

// Inter_28pt-Thin.ttf
// Inter_28pt-ThinItalic.ttf
// Inter_28pt-ExtraLight.ttf
// Inter_28pt-ExtraLightItalic.ttf
// Inter_28pt-Light.ttf
// Inter_28pt-LightItalic.ttf
// Inter_28pt-Regular.ttf
// Inter_28pt-Italic.ttf
// Inter_28pt-Medium.ttf
// Inter_28pt-MediumItalic.ttf
// Inter_28pt-SemiBold.ttf
// Inter_28pt-SemiBoldItalic.ttf
// Inter_28pt-Bold.ttf
// Inter_28pt-BoldItalic.ttf
// Inter_28pt-ExtraBold.ttf
// Inter_28pt-ExtraBoldItalic.ttf
// Inter_28pt-Black.ttf
// Inter_28pt-BlackItalic.ttf

const Inter = localFont({
  src: [
    {
      path: '../../../../public/font/Inter/Inter_28pt-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Inter/Inter_28pt-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
});

export const fonts: DeepPartial<Theme['fonts']> = {
  heading: Inter.style.fontFamily,
  body: Inter.style.fontFamily,
};

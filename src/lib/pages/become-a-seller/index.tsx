'use client';

import LayoutSeller from '~/lib/components/layout/LayoutSeller';
import Grow from '~/lib/components/seller/Grow';
import Hero from '~/lib/components/seller/Hero';
import NewsLetter from '~/lib/components/seller/NewsLetter';
import WhySell from '~/lib/components/seller/WhySell';

const BecomeASeller = () => {
  return (
    <LayoutSeller>
      <Hero />
      <WhySell />
      <Grow />
      <NewsLetter />
    </LayoutSeller>
  );
};

export default BecomeASeller;

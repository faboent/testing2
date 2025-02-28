'use client';

import LayoutSeller from '~/lib/components/layout/LayoutSeller';
import How from '~/lib/components/seller/How';
import Newsletter from '~/lib/components/seller/NewsLetter';
import Steps from '~/lib/components/seller/Steps';
import Video from '~/lib/components/seller/Video';

const BecomeASeller = () => {
  return (
    <LayoutSeller bg="white">
      <How />
      <Steps />
      <Video />
      <Newsletter />
    </LayoutSeller>
  );
};

export default BecomeASeller;

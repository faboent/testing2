import { Box } from '@chakra-ui/react';

import Footer from './Footer';
import HeaderSeller from './HeaderSeller';

type LayoutProps = {
  children: React.ReactNode;
  bg?: string;
};

const LayoutSeller = ({ children, bg = 'brand.500' }: LayoutProps) => {
  return (
    <Box w="full">
      <HeaderSeller bg={bg} />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default LayoutSeller;

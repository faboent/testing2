'use client';

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Box margin="8">
        <Box as="main" marginY={22}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

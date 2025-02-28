import { Container, Box, VStack } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
  showNavMenu?: boolean;
};

const Layout = ({ children, showNavMenu = false }: LayoutProps) => {
  return (
    <VStack spacing={0} bg="#F5F5F5">
      <Header showNavMenu={showNavMenu} />
      <Container
        maxW="container.lg"
        pt={{
          base: '100px',
          md: '110px',
        }}
      >
        <Box as="main" flex="1">
          {children}
        </Box>
      </Container>
      <Footer />
    </VStack>
  );
};

export default Layout;

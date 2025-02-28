import { Box } from '@chakra-ui/react';

import NavBottom from './NavBottom';
import NavMobile from './NavMobile';
import NavTop from './NavTop';

const Header = ({ showNavMenu }: any) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="white"
      boxShadow="sm"
    >
      <NavTop />
      <NavMobile />
      <NavBottom showNavMenu={showNavMenu} />
    </Box>
  );
};

export default Header;

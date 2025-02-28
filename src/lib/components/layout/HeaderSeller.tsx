import { Box } from '@chakra-ui/react';

import NavMobile2 from './NavMobile2';
import NavTop2 from './NavTop2';

const HeaderSeller = ({ bg }: { bg: string }) => {
  return (
    <Box position="fixed" top={0} left={0} right={0} zIndex={1000}>
      <NavTop2 bg={bg} />
      <NavMobile2 bg={bg} />
    </Box>
  );
};

export default HeaderSeller;

'use client';

import { Container, HStack, Box, Image, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import Drawer2 from './Drawer2';

const NavMobile2 = ({ bg }: { bg: string }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box
      bg={scrolled ? 'white' : bg}
      w="100%"
      display={{ base: 'flex', md: 'none' }}
      py={2}
    >
      <Container
        maxW={{
          base: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
        }}
      >
        <HStack
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          flexDir={{ base: 'row', md: 'row' }}
        >
          <HStack alignItems="center" spacing={2}>
            <IconButton
              aria-label="menu"
              variant="ghost"
              size="sm"
              _hover={{
                bg: 'transparent',
              }}
              icon={<Image src="/images/menu.svg" alt="menu" boxSize="20px" />}
              onClick={handleToggle}
            />
            <Image
              src="/images/logo-3.svg"
              alt="3XG logo"
              w="100px"
              h="40px"
              cursor="pointer"
              onClick={() => router.push('/')}
            />
          </HStack>

          <HStack alignItems="center" spacing={4}>
            {/*  */}
          </HStack>
        </HStack>
      </Container>

      <Drawer2 isOpen={isOpen} onClose={handleToggle} />
    </Box>
  );
};

export default NavMobile2;

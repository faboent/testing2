'use client';

import {
  Container,
  HStack,
  Link as ChakrLink,
  Box,
  Stack,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '../ui/Button';
import { topLinksSeller } from '~/lib/utils/constants';

const NavTop2 = ({ bg }: { bg: string }) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      bg={scrolled ? 'white' : bg}
      w="100%"
      display={{ base: 'none', md: 'flex' }}
      py={4}
    >
      <Container
        maxW={{
          base: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
        }}
      >
        <HStack
          justifyContent="space-between"
          alignItems="center"
          flexDir={{ base: 'column', md: 'row' }}
          w="100%"
        >
          <HStack spacing={14} alignItems="center">
            <Link href="/">
              <Image src="/images/logo-3.svg" alt="3XG" />
            </Link>
            <HStack
              overflowX={{ base: 'auto', md: 'unset' }}
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              spacing={6}
            >
              {topLinksSeller.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    passHref
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <ChakrLink
                      whiteSpace="nowrap"
                      cursor="pointer"
                      fontSize="md"
                      color="#808080"
                      bg="transparent"
                      fontWeight="400"
                      borderBottomWidth={isActive ? 2 : 0}
                      borderBottomColor={isActive ? 'brand.100' : 'transparent'}
                      _hover={{
                        borderBottomWidth: 2,
                        borderBottomColor: 'brand.100',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {link.label}
                    </ChakrLink>
                  </Link>
                );
              })}
            </HStack>
          </HStack>

          <Stack
            display={{ base: 'none', md: 'flex' }}
            direction="row"
            spacing={6}
            alignItems="center"
          >
            <Link href="/#" passHref>
              <ChakrLink
                color="brand.100"
                fontSize="14"
                fontWeight="500"
                _hover={{
                  color: 'brand.100',
                  textDecoration: 'none',
                }}
              >
                Login
              </ChakrLink>
            </Link>
            <Link href="/#" passHref>
              <Button
                text="Get Started"
                size="sm"
                bg="brand.100"
                fontSize={14}
                fontWeight={500}
              />
            </Link>
          </Stack>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavTop2;

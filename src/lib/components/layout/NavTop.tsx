'use client';

import {
  Container,
  HStack,
  Text,
  Link as ChakrLink,
  Box,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { topLinks } from '~/lib/utils/constants';

const NavTop = () => {
  const pathname = usePathname();

  return (
    <Box
      bg="#F5F5F5"
      w="100%"
      display={{ base: 'none', md: 'flex' }}
      pt={[4, 6]}
      pb={[4, 2]}
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
          <HStack spacing={6} alignItems="center">
            <Text
              color="#212429"
              fontSize="14"
              fontWeight="500"
              display={{ base: 'none', md: 'block' }}
            >
              Welcome to 3XG!
            </Text>

            <HStack
              overflowX={{ base: 'auto', md: 'unset' }}
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {topLinks.map((link) => {
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
                      py={{ base: 4, md: 3 }}
                      px={{ base: 2, md: 6 }}
                      cursor="pointer"
                      fontSize="14"
                      color={isActive ? 'brand.100' : '#212429'}
                      bg={isActive ? 'white' : 'transparent'}
                      fontWeight={isActive ? '600' : '500'}
                      borderTopEndRadius={
                        isActive ? { base: 'none', md: 'lg' } : undefined
                      }
                      borderTopStartRadius={
                        isActive ? { base: 'none', md: 'lg' } : undefined
                      }
                      _hover={{
                        bg: { base: 'transparent', md: 'white' },
                        color: 'brand.100',
                        fontWeight: '600',
                        borderTopEndRadius: { base: 'none', md: 'lg' },
                        borderTopStartRadius: { base: 'none', md: 'lg' },
                        borderBottomEndRadius: 'none',
                        borderBottomStartRadius: 'none',
                      }}
                    >
                      {link.label}
                    </ChakrLink>
                  </Link>
                );
              })}
            </HStack>
          </HStack>

          <Stack display={{ base: 'none', md: 'flex' }}>
            <Link href="/become-a-seller" passHref>
              <ChakrLink
                color="brand.100"
                fontSize="14"
                fontWeight="500"
                _hover={{
                  color: 'brand.100',
                  textDecoration: 'none',
                }}
              >
                Become a seller
              </ChakrLink>
            </Link>
          </Stack>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavTop;

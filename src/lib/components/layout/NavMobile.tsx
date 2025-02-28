'use client';

import {
  Container,
  HStack,
  Box,
  Image,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useGetCartQuery } from '~/lib/redux/services/cart.service';
import { useAppSelector } from '~/lib/redux/store';

import Drawer from './Drawer';

const NavMobile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;

  const { data: cartData } = useGetCartQuery(user?.user_id);

  const cartItems = useMemo(
    () => (Array.isArray(cartData?.message.body) ? cartData.message.body : []),
    [cartData]
  );

  const cartQuantity = useMemo(
    () =>
      Array.isArray(cartItems)
        ? cartItems.reduce(
            (acc: any, item: any) => acc + (item.quantity || 0),
            0
          )
        : 0,
    [cartItems]
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box bg="white" w="100%" display={{ base: 'flex', md: 'none' }} py={2}>
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
              src="/images/logo.svg"
              alt="3XG logo"
              w="70px"
              h="30px"
              cursor="pointer"
              onClick={() => router.push('/')}
            />
          </HStack>

          <HStack alignItems="center" spacing={4}>
            <HStack
              cursor="pointer"
              as={Link}
              href={user ? `/profile/user` : '/auth/login'}
            >
              <Image src="/images/account.svg" alt="cart" boxSize="30px" />
            </HStack>

            <HStack cursor="pointer" as={Link} href="/cart" position="relative">
              <Badge
                position="absolute"
                top={-2}
                right={-1}
                color="white"
                bg="#DB4444"
                borderRadius="50%"
              >
                {cartQuantity}
              </Badge>
              <Image src="/images/cart.svg" alt="cart" boxSize="30px" />
            </HStack>
          </HStack>
        </HStack>
      </Container>

      <Drawer isOpen={isOpen} onClose={handleToggle} />
    </Box>
  );
};

export default NavMobile;

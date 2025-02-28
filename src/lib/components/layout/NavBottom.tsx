'use client';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Container,
  HStack,
  Text,
  Box,
  InputGroup,
  InputRightAddon,
  Input,
  Image,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import ShopCategory from '../categories/ShopCategory';
import Help from '../Help';
import { useGetCartQuery } from '~/lib/redux/services/cart.service';
import { useAppSelector } from '~/lib/redux/store';

const NavBottom = ({ showNavMenu }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;
  console.log('User Data:', user);

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

  const [isShopCategoryVisible, setIsShopCategoryVisible] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState(() => {
    if (pathname?.startsWith('/search/')) {
      return decodeURIComponent(pathname.replace('/search/', ''));
    }
    return '';
  });

  const handleSearch = (e: any) => {
    if (!searchTerm) return;
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
  };

  return (
    <Box bg="white" w="100%" py={2}>
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
          flexDir={{ base: 'column', md: 'row' }}
        >
          <HStack alignItems="center" spacing={4} w={['100%', '65%']}>
            {showNavMenu && (
              <Box
                position="relative"
                onMouseEnter={() => setIsShopCategoryVisible(true)}
                onMouseLeave={() => setIsShopCategoryVisible(false)}
              >
                <IconButton
                  aria-label="menu"
                  variant="ghost"
                  size="sm"
                  _hover={{
                    bg: 'transparent',
                  }}
                  icon={
                    <Image src="/images/menu.svg" alt="menu" boxSize="20px" />
                  }
                  display={{ base: 'none', md: 'flex' }}
                />
                {isShopCategoryVisible && (
                  <Box
                    position="absolute"
                    top="100%"
                    left="0"
                    zIndex="1000"
                    bg="white"
                    boxShadow="md"
                    borderWidth={1}
                    borderColor="#3434341A"
                    w="200px"
                    borderRadius="8"
                  >
                    <ShopCategory />
                  </Box>
                )}
              </Box>
            )}

            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="3XG logo"
                w="88px"
                h="40px"
                display={{ base: 'none', md: 'flex' }}
              />
            </Link>
            <InputGroup>
              <Input
                type="text"
                placeholder="What are you looking for?"
                borderRightRadius={0}
                borderLeftRadius={5}
                bg="white"
                borderWidth={1}
                borderColor="#757575"
                focusBorderColor="brand.100"
                _placeholder={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 400,
                }}
                _hover={{
                  borderColor: 'brand.100',
                }}
                w="100%"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                value={searchTerm}
              />
              <InputRightAddon
                borderRightRadius={5}
                borderLeftRadius={0}
                bg="brand.100"
                color="white"
                cursor="pointer"
                borderWidth={10}
                borderColor="brand.100"
                onClick={handleSearch}
              >
                <Image src="/images/search.svg" alt="search" boxSize="25px" />
              </InputRightAddon>
            </InputGroup>
          </HStack>

          <HStack
            alignItems="center"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            <HStack
              cursor="pointer"
              as={Link}
              href={user ? `/profile/user` : '/auth/login'}
            >
              <Image src="/images/account.svg" alt="cart" boxSize="30px" />
              {user ? (
                <Text
                  color="black"
                  fontSize="14"
                  fontWeight="400"
                  opacity={0.5}
                  style={{
                    textWrap: 'nowrap',
                  }}
                >
                  Hi, @{user?.username}
                </Text>
              ) : (
                <Text
                  color="black"
                  fontSize="14"
                  fontWeight="400"
                  opacity={0.5}
                >
                  Login/Register
                </Text>
              )}
            </HStack>

            <HStack
              cursor="pointer"
              alignItems="center"
              spacing={2}
              position="relative"
              onMouseEnter={() => setIsHelpVisible(true)}
              onMouseLeave={() => setIsHelpVisible(false)}
            >
              <Image src="/images/help.svg" alt="cart" boxSize="30px" />
              <Text color="black" fontSize="14" fontWeight="400" opacity={0.5}>
                Help
              </Text>
              <IconButton
                aria-label="help"
                variant="ghost"
                size="sm"
                icon={<ChevronDownIcon />}
                _hover={{
                  bg: 'transparent',
                }}
                ml={-4}
              />

              {isHelpVisible && (
                <Box
                  position="absolute"
                  top="100%"
                  left="0"
                  zIndex="1000"
                  bg="white"
                  boxShadow="md"
                  borderWidth={1}
                  borderColor="#3434341A"
                  w="200px"
                  borderRadius="8"
                >
                  <Help />
                </Box>
              )}
            </HStack>

            <HStack cursor="pointer" as={Link} href="/cart" position="relative">
              <Badge
                position="absolute"
                top={-2}
                right={30}
                color="white"
                bg="#DB4444"
                borderRadius="50%"
              >
                {cartQuantity}
              </Badge>

              <Image src="/images/cart.svg" alt="cart" boxSize="30px" />
              <Text color="black" fontSize="14" fontWeight="400" opacity={0.5}>
                Cart
              </Text>
            </HStack>

            <HStack cursor="pointer">
              <Image src="/images/wishlist.svg" alt="cart" boxSize="30px" />
              <Text color="black" fontSize="14" fontWeight="400" opacity={0.5}>
                Wishlist
              </Text>
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBottom;

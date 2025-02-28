'use client';

import { VStack, Box, Image, Text, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { logOut } from '~/lib/redux/slices/authSlice';
import { useAppDispatch } from '~/lib/redux/store';

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('profile');

  useEffect(() => {
    const path = pathname.split('/').pop();
    if (path) setActiveMenu(path);
  }, [pathname]);

  const handleLogout = (e: React.MouseEvent, type: string) => {
    if (type === 'logout') {
      e.preventDefault(); // Prevent the default Link behavior
      if (window.confirm('Are you sure you want to logout?')) {
        dispatch(logOut());
      }
    }
  };

  const profileMenu = [
    {
      icon: '/images/profile-user.svg',
      title: 'Profile',
      type: 'user',
      active: activeMenu === 'user',
    },
    {
      icon: '/images/profile-wallet.svg',
      title: 'Wallet',
      type: 'wallet',
      active: activeMenu === 'wallet',
    },
    {
      icon: '/images/orders.svg',
      title: 'Orders',
      type: 'orders',
      active: activeMenu === 'orders',
    },
    {
      icon: '/images/warranty.svg',
      title: 'Warranty Portal',
      type: 'warranty',
      active: activeMenu === 'warranty',
    },
    {
      icon: '/images/coupon-2.svg',
      title: 'Coupon',
      type: 'coupon',
      active: activeMenu === 'coupon',
    },
    {
      icon: '/images/logout.svg',
      title: 'Logout',
      type: 'logout',
      active: activeMenu === 'logout',
    },
  ];

  return (
    <Box w="100%" bg="white" borderRadius={6} boxShadow="5px">
      <VStack alignItems="stretch" spacing={0}>
        {profileMenu.map((item, index) => (
          <HStack
            key={index}
            spacing={6}
            py={4}
            px={6}
            _hover={{ bg: '#21242933' }}
            cursor="pointer"
            borderRadius={6}
            transition="all 0.3s ease"
            bg={item.active ? '#21242933' : 'transparent'}
            as={Link}
            href={`/profile/${item.type}`}
            onClick={(e) => handleLogout(e, item.type)}
          >
            <Image src={item.icon} alt="account" boxSize="20px" />
            <Text
              color={item.type === 'logout' ? 'brand.100' : '#212429'}
              fontSize="md"
              fontWeight="500"
            >
              {item.title}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default ProfileMenu;

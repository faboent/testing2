'use client';

import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Link as ChakraLink,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useMemo } from 'react';

import { useGetCategoriesQuery } from '~/lib/redux/services/product.service';
import { topLinks } from '~/lib/utils/constants';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  const { data: categories } = useGetCategoriesQuery('');

  const allCategories = useMemo(() => {
    return categories?.message?.body;
  }, [categories]);

  return (
    <ChakraDrawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="white">
        <DrawerCloseButton
          onClick={onClose}
          position="fixed"
          top={4}
          right={4}
          size="lg"
          color="brand.100"
        />
        <DrawerHeader>
          <Link href="/" onClick={onClose}>
            <ChakraLink>
              <Image src="/images/logo.svg" alt="Logo" height="auto" />
            </ChakraLink>
          </Link>
        </DrawerHeader>

        <DrawerBody pb="6">
          <VStack align="start" spacing={4} mt={6}>
            <Text fontSize="lg" fontWeight="600" color="#212429">
              Quick Links
            </Text>
            {topLinks.map((link, index) => (
              <Link key={index} href={link.href} passHref>
                <ChakraLink onClick={onClose}>
                  <Text color="#212429" fontSize="md" fontWeight="400">
                    {link.label}
                  </Text>
                </ChakraLink>
              </Link>
            ))}
          </VStack>

          <Divider my={6} />

          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="600" color="#212429">
              Categories
            </Text>
            {/* {categories2.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.name.toLowerCase()}`}
                passHref
              >
                <ChakraLink onClick={onClose}>
                  <Text color="#212429" fontSize="md" fontWeight="400">
                    {category.name}
                  </Text>
                </ChakraLink>
              </Link>
            ))} */}
            {allCategories &&
              Object.entries(allCategories).map(([category]) => (
                <Link href={`/category/${category}`} key={category}>
                  <ChakraLink>
                    <Text color="#212429" fontSize="md" fontWeight="400">
                      {category}
                    </Text>
                  </ChakraLink>
                </Link>
              ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;

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
} from '@chakra-ui/react';
import Link from 'next/link';

import { topLinksSeller } from '~/lib/utils/constants';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Drawer2 = ({ isOpen, onClose }: DrawerProps) => {
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
              <Image src="/images/logo-3.svg" alt="Logo" height="auto" />
            </ChakraLink>
          </Link>
        </DrawerHeader>

        <DrawerBody pb="6">
          <VStack align="start" spacing={4} mt={6}>
            <Text fontSize="lg" fontWeight="600" color="#212429">
              Quick Links
            </Text>
            {topLinksSeller.map((link, index) => (
              <Link key={index} href={link.href} passHref>
                <ChakraLink onClick={onClose}>
                  <Text color="#212429" fontSize="md" fontWeight="400">
                    {link.label}
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

export default Drawer2;

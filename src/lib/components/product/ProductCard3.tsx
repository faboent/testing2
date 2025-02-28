'use client';

/* eslint-disable consistent-return */

import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  CardFooter,
  VStack,
  Badge,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import ReactStars from 'react-stars';

import { formatCurrency, shortenText } from '~/lib/utils/formatter';

type ProductCardProps = {
  item: {
    name: string;
    price: number;
    discount: number;
    image: string;
    rating: number;
    dealExpireTime?: string;
    amountSaved: number;
    moq: number;
  };
};

const ProductCard3 = ({ item }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <Link href="/product-bulk/1">
      <Card
        variant="elevated"
        borderRadius="16"
        position="relative"
        cursor="pointer"
        _hover={{
          borderWidth: '1px',
          borderColor: 'brand.100',
          overflow: 'hidden',
          transform: 'scale(1.05)',
          transition: 'transform 0.5s',
        }}
      >
        <Badge
          position="absolute"
          top={0}
          right={0}
          colorScheme="red"
          borderTopRightRadius={16}
          borderBottomLeftRadius={16}
          px={1.5}
          py={1}
          bg="brand.100"
          fontSize="12px"
          fontWeight="500"
          color="white"
        >
          30%
          <br />
          OFF
        </Badge>

        <CardBody bg="#F5F5F5">
          <VStack>
            <Image
              src={item.image}
              alt="product"
              alignSelf="center"
              objectFit="cover"
              h="160px"
              w="auto"
            />
          </VStack>
        </CardBody>

        <IconButton
          aria-label="Like"
          icon={
            isLiked ? (
              <Image src="/images/heart.svg" w="20px" h="20px" />
            ) : (
              <Image src="/images/heart-3.svg" w="20px" h="20px" />
            )
          }
          position="absolute"
          bottom={[40, 32]}
          right={2}
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          onClick={handleLike}
        />

        <CardFooter px={2} py={2}>
          <Stack spacing="0">
            <Text
              fontSize="14px"
              color="#222222"
              fontWeight="500"
              fontFamily="body"
              display={['none', 'block']}
            >
              {item.name}
            </Text>

            <Text
              fontSize="14px"
              color="#222222"
              fontWeight="500"
              fontFamily="body"
              display={['block', 'none']}
            >
              {shortenText(item.name, 20)}
            </Text>

            <Text
              color="#212429"
              fontSize="md"
              fontWeight="600"
              lineHeight="1.5"
              fontFamily="body"
            >
              {formatCurrency(item.price)}{' '}
              <Text
                as="span"
                color="#3434344D"
                fontSize="14px"
                fontWeight="400"
                textDecoration="line-through"
                opacity="0.5"
              >
                {formatCurrency(item.discount)}
              </Text>
            </Text>

            <HStack w="full">
              <Text
                fontSize="12px"
                fontWeight="500"
                color="#34A853"
                fontFamily="body"
              >
                You Saved: {formatCurrency(item.amountSaved)}
              </Text>
              <Text
                fontSize="12px"
                fontWeight="500"
                color="#212429"
                fontFamily="body"
              >
                MOQ: {item.moq} Pieces
              </Text>
            </HStack>

            <HStack
              w="full"
              justify="space-between"
              flexDirection={['column', 'row']}
              align={['flex-start', 'center']}
            >
              <HStack align="center" spacing="2">
                <Text
                  color="#212429"
                  fontSize={['12px', '14px']}
                  fontWeight="500"
                >
                  {item.rating}
                </Text>
                <ReactStars
                  count={5}
                  size={10}
                  color2="#ffd700"
                  value={4}
                  edit={false}
                />
              </HStack>
            </HStack>
          </Stack>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard3;

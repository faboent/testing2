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
  Progress,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

import { formatCurrency, shortenText } from '~/lib/utils/formatter';
// dealExpireTime: '2022-12-31T23:59:59',
type ProductCardProps = {
  item: {
    name: string;
    price: number;
    discount: number;
    image: string;
    rating: number;
    dealExpireTime?: string;
  };
};

const ProductCard2 = ({ item }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

  useEffect(() => {
    if (!item.dealExpireTime) return;

    const updateCountdown = () => {
      // const now = new Date();
      // const expireTime = new Date(item.dealExpireTime);
      // const difference = expireTime.getTime() - now.getTime();

      const now = new Date();
      const expireTime = new Date(item.dealExpireTime!);
      const difference = expireTime.getTime() - now.getTime();

      if (difference > 0) {
        const hours = String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, '0');
        const minutes = String(
          Math.floor((difference / (1000 * 60)) % 60)
        ).padStart(2, '0');
        const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
          2,
          '0'
        );
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      } else {
        setTimeLeft('00:00:00');
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [item.dealExpireTime]);

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <Link href="/product-deal/1">
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

              <HStack align="center" spacing="0">
                <Badge
                  size="xs"
                  fontSize="10px"
                  fontWeight="500"
                  borderLeftRadius="3px"
                  borderRightRadius={0}
                  bg="#E92F2F"
                  color="white"
                  textTransform="capitalize"
                >
                  Time left
                </Badge>
                <Badge
                  size="xs"
                  fontSize="10px"
                  fontWeight="500"
                  borderLeftRadius={0}
                  borderRightRadius="3px"
                  bg="#E92F2F1A"
                  color="#E92F2F"
                  textTransform="capitalize"
                >
                  {timeLeft}
                </Badge>
              </HStack>
            </HStack>

            <HStack w="full" align="center" spacing={2}>
              <Text
                color="#212429"
                fontSize={['12px', '14px']}
                fontWeight="500"
              >
                30 unit left
              </Text>
              <Progress
                value={80}
                colorScheme="yellow"
                size={['xs', 'sm']}
                w="55%"
                borderRadius="10px"
                bg="#D9D9D9"
              />
            </HStack>
          </Stack>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard2;

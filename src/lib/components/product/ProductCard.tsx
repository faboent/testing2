'use client';

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
import { useEffect, useMemo, useState } from 'react';
import ReactStars from 'react-stars';

import { useWishlistHandler } from '~/lib/hooks/useWishlistHandler';
import { formatCurrency, shortenText } from '~/lib/utils/formatter';

type ProductCardProps = {
  item: {
    item_code: string;
    slug: string;
    productName: string;
    actual_price: number;
    discounted_price: number;
    images: Array<{
      url: string;
      alt: string;
      type: string;
    }>;
    rating: number;
    color: string;
    category: string;
    brand: string;
    discount: number;
    is_favourite: number;
  };
};

const ProductCard = ({ item }: ProductCardProps) => {
  const [images, setImages] = useState<string[]>([]);

  const parsedImages = useMemo(() => {
    try {
      // If images is already an array, map directly
      if (Array.isArray(item?.images)) {
        return item.images.map((img) => img.url);
      }
      // If it's a string, try to parse it
      const imageData = JSON.parse(item?.images || '[]');
      return imageData.map((img: { url: string }) => img.url);
    } catch {
      return ['/images/fallback.svg'];
    }
  }, [item?.images]);

  useEffect(() => {
    setImages(parsedImages);
  }, [parsedImages]);

  const { handleLike, loadingAddToWishList, loadingRemoveFromWishList } =
    useWishlistHandler();

  return (
    <Link href={`/product/${item?.slug}`}>
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
        {item?.discount > 0 && (
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
            zIndex="1"
          >
            {Number(item?.discount)?.toFixed(0)}%
            <br />
            OFF
          </Badge>
        )}

        <CardBody bg="#F5F5F5">
          <VStack>
            <Image
              src={images[0]}
              alt={item.productName}
              alignSelf="center"
              objectFit="cover"
              h="160px"
              w="auto"
              fallback={<Image src="/images/fallback.svg" h="160px" w="auto" />}
              onError={() => {
                setImages(['/images/fallback.svg']);
              }}
            />
          </VStack>
        </CardBody>

        <IconButton
          aria-label="Like"
          icon={
            item?.is_favourite ? (
              <Image src="/images/heart.svg" w="20px" h="20px" />
            ) : (
              <Image src="/images/heart-3.svg" w="20px" h="20px" />
            )
          }
          position="absolute"
          bottom={[24, 24]}
          right={2}
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          onClick={(event) => {
            event.preventDefault();
            handleLike(item);
          }}
          isLoading={loadingAddToWishList || loadingRemoveFromWishList}
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
              {shortenText(item?.productName, 25)}
            </Text>

            <Text
              fontSize="14px"
              color="#222222"
              fontWeight="500"
              fontFamily="body"
              display={['block', 'none']}
            >
              {shortenText(item?.productName, 20)}
            </Text>

            <Text
              color="#212429"
              fontSize="md"
              fontWeight="600"
              lineHeight="1.5"
              fontFamily="body"
            >
              {formatCurrency(item?.discounted_price)}{' '}
              <Text
                as="span"
                color="#3434344D"
                fontSize="14px"
                fontWeight="400"
                textDecoration="line-through"
                opacity="0.5"
              >
                {formatCurrency(item?.actual_price)}
              </Text>
            </Text>

            <HStack align="center" spacing="2">
              <Text color="#212429" fontSize="14px" fontWeight="500">
                {item?.rating}
              </Text>
              <ReactStars
                count={5}
                size={15}
                color2="#ffd700"
                value={item?.rating}
                edit={false}
              />
            </HStack>

            <HStack align="center" spacing="2">
              <Image src="/images/warranty-2.svg" w="20px" h="19px" />
              <Text
                color="#222222"
                fontSize="12px"
                fontWeight="500"
                fontStyle="italic"
              >
                1years warranty
              </Text>
            </HStack>
          </Stack>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;

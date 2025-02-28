'use client';

/* eslint-disable react-hooks/exhaustive-deps */

import {
  Text,
  HStack,
  Stack,
  Input,
  VStack,
  Button,
  Divider,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ReactStars from 'react-stars';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

const discountPercentages = [
  { name: '10%', value: '10' },
  { name: '20%', value: '20' },
  { name: '30%', value: '30' },
  { name: '40%', value: '40' },
  { name: '50%', value: '50' },
];

const servieRating = [
  { name: '4 Star & Up', value: 4 },
  { name: '3 Star & Up', value: 3 },
  { name: '2 Star & Up', value: 2 },
  { name: '1 Star & Up', value: 1 },
];

type FilterProps = {
  minPrice: string;
  setMinPrice: (minPrice: string) => void;
  maxPrice: string;
  setMaxPrice: (maxPrice: string) => void;
  setDiscountPercentage: (discountPercentage: string) => void;
  discountPercentage: any;
  setRating: (rating: string) => void;
  rating: any;
  setColor: (color: string) => void;
  color: string;
};

const Filter = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setDiscountPercentage,
  discountPercentage,
  setRating,
  rating,
  setColor,
  color: selectedColor,
}: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const discountPercentage = searchParams.get('discountPercentage');
    const rating = searchParams.get('rating');
    const color = searchParams.get('color');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (discountPercentage) setDiscountPercentage(discountPercentage);
    if (rating) setRating(rating);
    if (color) setColor(color);
    if (minPrice) setMinPrice(minPrice);
    if (maxPrice) setMaxPrice(maxPrice);
  }, [searchParams]);

  const updateQueryParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams as any);
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        newParams.set(key, params[key]);
      } else {
        newParams.delete(key);
      }
    });
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  const handlePriceRange = (minPrice: string, maxPrice: string) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    updateQueryParams({ minPrice, maxPrice });
  };

  const handleDiscountPercentage = (discountPercentage: string) => {
    setDiscountPercentage(discountPercentage);
    updateQueryParams({ discountPercentage });
  };

  const handleRating = (rating: string) => {
    setRating(rating);
    updateQueryParams({ rating });
  };

  const handleColor = (color: string) => {
    setColor(color);
    updateQueryParams({ color });
  };

  return (
    <VStack align="start" spacing="2" py={4}>
      {/* Categories */}
      <Stack direction="column" spacing="2" w="100%" display="none">
        <Text
          fontSize="14px"
          fontWeight="700"
          color="#212429"
          textAlign="center"
          px={4}
        >
          Categories
        </Text>

        <Stack direction="column" justifyContent="space-between" w="100%">
          <Text
            fontSize="14px"
            fontWeight="400"
            color="#212429"
            px={4}
            _hover={{
              bg: 'brand.100',
              color: 'white',
            }}
            cursor="pointer"
          >
            Phones & Tablets
          </Text>
        </Stack>
      </Stack>

      {/* <Divider w="100%" borderColor="#3434341A" /> */}

      {/* colors */}
      <Stack direction="column" spacing="2" w="100%">
        <Text
          fontSize="14px"
          fontWeight="700"
          color="#212429"
          textAlign="center"
          px={4}
        >
          Color
        </Text>

        <Stack direction="row" spacing="2" w="100%" px={4}>
          {colors.map((color, index) => (
            <Box
              key={index}
              w="20px"
              h="20px"
              borderRadius="50%"
              bg={color}
              mx="1"
              cursor="pointer"
              onClick={() => handleColor(color)}
              borderWidth={color === selectedColor ? '2px' : '0px'}
              borderColor="brand.100"
            />
          ))}
        </Stack>
        <Button
          variant="ghost"
          size="xs"
          color="#222222"
          _hover={{
            bg: 'transparent',
            color: 'brand.100',
          }}
          onClick={() => {
            setColor('');
            handleColor('');
          }}
          isDisabled={!selectedColor}
        >
          Clear
        </Button>
      </Stack>

      <Divider w="100%" borderColor="#3434341A" />

      {/* Price Range */}
      <Stack direction="column" spacing="3" w="100%" px={4}>
        <Text
          fontSize="14px"
          fontWeight="700"
          color="#212429"
          textAlign="center"
        >
          Price Range
        </Text>

        <HStack spacing="2">
          <FormControl>
            <FormLabel fontSize="14px" fontWeight="400" color="#212429" m={0}>
              Min Price
            </FormLabel>
            <Input
              placeholder="Min Price"
              size="sm"
              color="#343434"
              borderColor="#21242933"
              bg="#F0F0F0"
              borderRadius="3px"
              borderWidth={0}
              focusBorderColor="brand.100"
              onChange={(e) => setMinPrice(e.target.value)}
              value={minPrice}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="14px" fontWeight="400" color="#212429" m={0}>
              Max Price
            </FormLabel>
            <Input
              placeholder="Max Price"
              size="sm"
              color="#343434"
              borderColor="#21242933"
              bg="#F0F0F0"
              borderRadius="3px"
              borderWidth={0}
              focusBorderColor="brand.100"
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
            />
          </FormControl>
        </HStack>

        <HStack w="100%" justifyContent="space-between">
          <Button
            isDisabled={!minPrice && !maxPrice}
            onClick={() => handlePriceRange(minPrice, maxPrice)}
            size="sm"
            w="50%"
            variant="solid"
            bg="brand.100"
            color="white"
            borderRadius="5px"
            _hover={{
              bg: 'brand.100',
            }}
          >
            Apply
          </Button>
          <Button
            onClick={() => {
              setMinPrice('');
              setMaxPrice('');
              handlePriceRange('', '');
            }}
            size="sm"
            w="50%"
            variant="outline"
            borderColor="red.500"
            color="red.500"
            bg="white"
            borderRadius="5px"
            isDisabled={!minPrice && !maxPrice}
            _hover={{
              bg: 'transparent',
            }}
          >
            Clear
          </Button>
        </HStack>
      </Stack>

      <Divider w="100%" borderColor="#3434341A" />
      {/* Discount Percentage */}
      <Stack direction="column" spacing="2" w="100%" p={4}>
        <Text
          fontSize="14px"
          fontWeight="700"
          color="#212429"
          textAlign="center"
        >
          Discount Percentage
        </Text>
        <RadioGroup
          value={discountPercentage}
          onChange={(value: any) => handleDiscountPercentage(value)}
          colorScheme="yellow"
        >
          <Stack direction="column" spacing="2">
            {discountPercentages.map((discount, index) => (
              <Radio key={index} value={discount.value}>
                <Text fontSize="14px" color="#212429" fontWeight="400">
                  {discount.name} or more
                </Text>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>

        <Button
          variant="ghost"
          size="xs"
          color="#222222"
          _hover={{
            bg: 'transparent',
            color: 'brand.100',
          }}
          onClick={() => {
            setDiscountPercentage('');
            handleDiscountPercentage('');
          }}
          isDisabled={!discountPercentage}
        >
          Clear
        </Button>
      </Stack>

      <Divider w="100%" borderColor="#3434341A" />

      {/* Service Rating */}
      <Stack direction="column" spacing="2" w="100%" p={4}>
        <Text
          fontSize="14px"
          fontWeight="700"
          color="#212429"
          textAlign="center"
        >
          Product Rating
        </Text>
        <RadioGroup
          value={rating}
          onChange={(value: any) => handleRating(value)}
          colorScheme="yellow"
        >
          <Stack direction="column" spacing="2">
            {servieRating.map((rating, index) => (
              <Radio key={index} value={rating.value.toString()}>
                <ReactStars
                  count={5}
                  size={15}
                  color2="#FFA439"
                  value={rating.value}
                  edit={false}
                />
              </Radio>
            ))}
          </Stack>
        </RadioGroup>

        <Button
          variant="ghost"
          size="xs"
          color="#222222"
          _hover={{
            bg: 'transparent',
            color: 'brand.100',
          }}
          onClick={() => {
            setRating('');
            handleRating('');
          }}
          isDisabled={!rating}
        >
          Clear
        </Button>
      </Stack>
    </VStack>
  );
};

export default Filter;

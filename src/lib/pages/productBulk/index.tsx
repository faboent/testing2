'use client';

/* eslint-disable consistent-return */

import {
  ChevronUpIcon,
  ChevronDownIcon,
  AddIcon,
  MinusIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Grid,
  GridItem,
  Box,
  Image,
  HStack,
  VStack,
  Text,
  IconButton,
  Badge,
  ButtonGroup,
  Button as ChakraButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Avatar,
  Stack,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactStars from 'react-stars';

import Layout from '~/lib/components/layout';
import AlsoViewed from '~/lib/components/product/AlsoViewed';
import ProductCard3 from '~/lib/components/product/ProductCard3';
import Button from '~/lib/components/ui/Button';
import { product3, products, productsBulk } from '~/lib/utils/constants';
import { formatCurrency, formatTime } from '~/lib/utils/formatter';

const ProductDeal = () => {
  const router = useRouter();
  const [visibleStart, setVisibleStart] = useState(0);
  const [currentImage, setCurrentImage] = useState(product3.image);
  const [isLiked, setIsLiked] = useState(false);
  const visibleCount = 5;

  const handleScrollUp = () => {
    setVisibleStart((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollDown = () => {
    setVisibleStart((prev) =>
      Math.min(prev + 1, product3.images.length - visibleCount)
    );
  };

  const visibleImages = product3.images.slice(
    visibleStart,
    visibleStart + visibleCount
  );

  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <Layout showNavMenu>
      <Grid
        templateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
        h="100%"
        mb={5}
        mt={{ base: 5, md: 5 }}
      >
        <GridItem colSpan={{ sm: 1, md: 1, lg: 3 }} h="100%" w="100%">
          <Box
            w="100%"
            h="100%"
            bg="white"
            borderRadius={8}
            boxShadow="5px"
            p={4}
          >
            <Grid
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
                lg: 'repeat(5, 1fr)',
              }}
              gap={2}
            >
              <GridItem colSpan={{ sm: 1, md: 1, lg: 3 }} h="100%" w="100%">
                <HStack spacing={4} alignItems="flex-start">
                  <VStack>
                    <IconButton
                      icon={<ChevronUpIcon fontSize={16} />}
                      onClick={handleScrollUp}
                      isDisabled={visibleStart === 0}
                      aria-label="Scroll up"
                      size="sm"
                      bg="#F0F0F04D"
                      borderRadius="2px"
                    />
                    {visibleImages.map((image, index) => (
                      <Box
                        key={index}
                        bg="#F0F0F0F0"
                        w="60px"
                        h="44px"
                        p={1}
                        overflow="hidden"
                        borderRadius="8px"
                        cursor="pointer"
                        onClick={() => setCurrentImage(image)}
                        _hover={{
                          borderWidth: '1px',
                          borderColor: 'brand.100',
                          overflow: 'hidden',
                          transform: 'scale(1.05)',
                          transition: 'transform 0.5s',
                        }}
                      >
                        <Image
                          src={image}
                          alt="Product Image"
                          w="100%"
                          h="100%"
                          objectFit="contain"
                        />
                      </Box>
                    ))}
                    <IconButton
                      icon={<ChevronDownIcon fontSize={16} />}
                      onClick={handleScrollDown}
                      isDisabled={
                        visibleStart + visibleCount >= product3.images.length
                      }
                      aria-label="Scroll down"
                      size="sm"
                      bg="#F0F0F04D"
                      borderRadius="2px"
                    />
                  </VStack>

                  <VStack
                    alignItems="flex-start"
                    bg="#F0F0F0"
                    w="100%"
                    borderRadius="5px"
                  >
                    <Image
                      src={currentImage}
                      alt="Product Image"
                      w="100%"
                      h="300px"
                      objectFit="contain"
                    />
                  </VStack>
                </HStack>
              </GridItem>

              <GridItem colSpan={{ sm: 0, md: 1, lg: 2 }} h="100%" w="100%">
                <VStack alignItems="flex-start" spacing={1}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="full"
                  >
                    <Badge
                      bg="#092356"
                      color="#F0F0F0"
                      fontSize="14px"
                      fontWeight="600"
                      px={2}
                      borderRadius="5px"
                      textTransform="capitalize"
                    >
                      Mary Beauty Touch
                    </Badge>
                  </HStack>

                  <Text
                    fontSize={['md', 'lg', 'xl']}
                    fontWeight="500"
                    color="#191919"
                  >
                    {product3.name}
                  </Text>

                  <VStack alignItems="flex-start" spacing={0}>
                    <Text fontSize="14px" color="#212429" fontWeight="400">
                      Brand: &nbsp;
                      <Text as="span" fontWeight="300">
                        {product3.brand}
                      </Text>
                    </Text>

                    <Text fontSize="14px" color="#212429" fontWeight="400">
                      Stock availability: &nbsp;
                      <Text as="span" fontWeight="300">
                        In Stock
                      </Text>
                    </Text>

                    <Text fontSize="14px" color="#2124294D" fontWeight="500">
                      Retail Prize: &nbsp;
                      <Text
                        as="span"
                        fontWeight="500"
                        textDecoration="line-through"
                      >
                        {formatCurrency(product3.price)}
                      </Text>
                    </Text>

                    <Text
                      color="#212429FA"
                      fontSize={['md', 'lg']}
                      fontWeight="600"
                      lineHeight="1.5"
                      fontFamily="body"
                    >
                      Retail Prize: &nbsp;
                      <Text as="span" fontWeight="600">
                        {formatCurrency(product3.price)}
                      </Text>
                    </Text>

                    <HStack w="full">
                      <Text
                        fontSize="14px"
                        fontWeight="500"
                        color="#34A853"
                        fontFamily="body"
                      >
                        You Saved: {formatCurrency(product3.amountSaved)}
                      </Text>
                      <Text
                        fontSize="12px"
                        fontWeight="500"
                        color="#212429"
                        fontFamily="body"
                      >
                        MOQ: {product3.moq} Pieces
                      </Text>
                    </HStack>
                  </VStack>

                  <HStack>
                    <HStack spacing={1}>
                      <Text color="#212429" fontSize="14px" fontWeight="500">
                        {product3.rating}
                      </Text>
                      <Image src="/images/star.svg" />
                    </HStack>
                    <Text color="#212429" fontSize="14px" fontWeight="500">
                      {product3.reviews.length} Reviews
                    </Text>
                  </HStack>

                  <HStack
                    w="full"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <HStack>
                      <Text fontSize="md" color="#191919" fontWeight="400">
                        Slot
                      </Text>
                      <ButtonGroup size="sm" isAttached variant="outline">
                        <IconButton
                          aria-label="Remove from friends"
                          icon={<MinusIcon />}
                          borderRadius="0"
                        />
                        <ChakraButton
                          borderRadius="0"
                          color="#191919"
                          fontWeight="400"
                          fontSize="16px"
                        >
                          1
                        </ChakraButton>
                        <IconButton
                          aria-label="Add to friends"
                          icon={<AddIcon />}
                          borderRadius="0"
                        />
                      </ButtonGroup>
                    </HStack>

                    <HStack spacing={0}>
                      <IconButton
                        aria-label="Like"
                        icon={
                          isLiked ? (
                            <Image src="/images/heart.svg" w="20px" h="20px" />
                          ) : (
                            <Image
                              src="/images/heart-3.svg"
                              w="20px"
                              h="20px"
                            />
                          )
                        }
                        variant="ghost"
                        bg="transparent"
                        _hover={{ bg: 'transparent' }}
                        onClick={handleLike}
                      />

                      <IconButton
                        aria-label="Like"
                        icon={<Image src="/images/share.svg" />}
                        variant="ghost"
                        bg="transparent"
                        _hover={{ bg: 'transparent' }}
                      />
                    </HStack>
                  </HStack>

                  <HStack w="full">
                    <Button text="Buy Now" bg="brand.100" size="md" />
                    <Button
                      text="Add to Cart"
                      bg="White"
                      variant="outline"
                      border="brand.100"
                      color="brand.100"
                      size="md"
                    />
                  </HStack>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </GridItem>

        <GridItem colSpan={{ sm: 0, md: 1, lg: 1 }} h="100%" w="100%">
          <VStack alignItems="flex-start" spacing={2}>
            <Box w="100%" h="100%" bg="#E7906B33" borderRadius={8} p={4}>
              <HStack alignItems="flex-start">
                <Image src="/images/transit.svg" />
                <VStack alignItems="flex-start">
                  <Text
                    fontSize="14px"
                    color="#212429"
                    fontWeight="400"
                    lineHeight="16.5px"
                    fontFamily="body"
                  >
                    Same day delivery within lagos on order placed before 1pm
                  </Text>

                  <HStack>
                    <Text
                      fontSize="12px"
                      color="#212429"
                      fontWeight="400"
                      lineHeight="16.5px"
                      fontStyle="italic"
                    >
                      Powered by
                    </Text>
                    <Image src="/images/itransit.svg" />
                  </HStack>
                </VStack>
              </HStack>
            </Box>

            <Box w="100%" h="100%" bg="white" borderRadius={8} p={4}>
              <VStack>
                <Text
                  fontSize="12px"
                  color="#343434"
                  fontWeight="500"
                  textAlign="center"
                >
                  Do you have questions about this product?
                </Text>

                <Button
                  text="CHAT NOW"
                  size="sm"
                  color="brand.100"
                  variant="ghost"
                  icon={<Image src="/images/chat.svg" />}
                  iconPosition="left"
                />
              </VStack>
            </Box>

            <Box w="100%" h="100%" bg="white" borderRadius={8}>
              <HStack
                justifyContent="space-between"
                alignItems="center"
                w="full"
                px={4}
                borderBottomWidth={1}
                borderBottomColor="#3434341A"
                cursor="pointer"
                onClick={() => router.push('/merchant')}
              >
                <Text fontSize="md" color="#212429" fontWeight="600">
                  Merchant Store
                </Text>
                <IconButton
                  aria-label="Like"
                  icon={<ChevronRightIcon />}
                  variant="ghost"
                  bg="transparent"
                  _hover={{ bg: 'transparent' }}
                  p={0}
                  m={0}
                />
              </HStack>

              <VStack spacing={2} p={4} alignItems="flex-start">
                <Text fontSize="14px" color="#212429" fontWeight="500">
                  Sellers performance
                </Text>

                <Text fontSize="14px" color="#21242980" fontWeight="500">
                  Store rating:
                  <Text as="span" fontWeight="500" color="brand.100" ml={4}>
                    97.7%
                  </Text>
                </Text>
                <Text fontSize="14px" color="#21242980" fontWeight="500">
                  Order fulfillment:
                  <Text as="span" fontWeight="500" color="brand.100" ml={4}>
                    97.7%
                  </Text>
                </Text>
                <Text fontSize="14px" color="#21242980" fontWeight="500">
                  Positive review:
                  <Text as="span" fontWeight="500" color="brand.100" ml={4}>
                    97.7%
                  </Text>
                </Text>
              </VStack>
            </Box>
          </VStack>
        </GridItem>
      </Grid>

      <Box w="100%" h="100%" bg="white" borderRadius={8} boxShadow="5px" p={4}>
        <Tabs isFitted>
          <TabList
            display="flex"
            justifyContent="space-around"
            w="100%"
            borderBottomWidth={1}
            borderBottomColor="#F0F0F0"
          >
            <Tab
              _selected={{
                color: 'brand.100',
                borderBottomColor: 'brand.100',
              }}
              fontSize={['14px', 'xl']}
              fontWeight="500"
              color="#212429"
            >
              Description
            </Tab>
            <Tab
              _selected={{
                color: 'brand.100',
                borderBottomColor: 'brand.100',
              }}
              fontSize={['14px', 'xl']}
              fontWeight="500"
              color="#212429"
            >
              Specifications
            </Tab>
            <Tab
              _selected={{
                color: 'brand.100',
                borderBottomColor: 'brand.100',
              }}
              fontSize={['14px', 'xl']}
              fontWeight="500"
              color="#212429"
            >
              Warranty
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text
                fontSize="md"
                color="#212429"
                fontWeight="400"
                textAlign="justify"
                lineHeight="8"
              >
                {product3.description}
              </Text>
            </TabPanel>
            <TabPanel>
              <VStack spacing={2} alignItems="flex-start">
                {product3.specifications?.map((spec, index) => (
                  <Text
                    key={index}
                    fontSize="14px"
                    color="#212429"
                    fontWeight="600"
                  >
                    {spec.name}: &nbsp;
                    <Text
                      as="span"
                      fontSize="14px"
                      color="#212429"
                      fontWeight="400"
                    >
                      {spec.value}
                    </Text>
                  </Text>
                ))}
              </VStack>
            </TabPanel>
            <TabPanel>
              <Text
                fontSize="md"
                color="#212429"
                fontWeight="400"
                textAlign="justify"
                lineHeight="8"
              >
                {product3.warranty}
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <VStack mt={5} w="100%">
        <AlsoViewed name="Customer who viewed this also viewed" />

        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
            'repeat(5, 1fr)',
          ]}
          gap={5}
          w="100%"
          mt={2}
        >
          {productsBulk
            .slice(0, Math.min(productsBulk.length, 5))
            .map((item, index) => (
              <GridItem key={index}>
                <ProductCard3 item={item} />
              </GridItem>
            ))}
        </Grid>
      </VStack>

      {/* reviews */}
      <Box
        w="100%"
        h="100%"
        bg="white"
        borderRadius={8}
        boxShadow="5px"
        p={4}
        mt={5}
      >
        <HStack>
          <Text
            fontSize={['14px', 'lg', 'xl']}
            color="#212429"
            fontWeight="600"
            style={{
              textWrap: 'nowrap',
            }}
          >
            Product Reviews
          </Text>
          <Badge
            bg="#34A85380"
            color="#343434"
            fontSize="12px"
            fontWeight="400"
            px={2}
            borderRadius="5px"
          >
            All from verified purchases
          </Badge>
        </HStack>

        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
          h="100%"
        >
          <GridItem colSpan={{ sm: 0, md: 1, lg: 1 }} h="100%" w="100%">
            <Box
              w="100%"
              h="100%"
              bg="white"
              borderRadius={8}
              p={4}
              borderWidth={1}
              borderColor="#A3A3A333"
            >
              <Text fontSize={['md', 'lg']} color="#212429" fontWeight="600">
                Review Filter
              </Text>

              <CheckboxGroup colorScheme="orange" defaultValue={['1', '2']}>
                <Stack spacing={2} direction="column" mt={2}>
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <Checkbox value={rating.toString()} key={index}>
                      <HStack spacing={1}>
                        <Text color="#212429" fontSize="14px" fontWeight="500">
                          {rating}
                        </Text>
                        <Image src="/images/star2.svg" />
                      </HStack>
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Box>
          </GridItem>

          <GridItem colSpan={{ sm: 1, md: 1, lg: 3 }} h="100%" w="100%">
            <Box
              w="100%"
              h="100%"
              bg="white"
              borderRadius={8}
              boxShadow="5px"
              p={4}
            >
              <Text fontSize={['md', 'lg']} color="#212429" fontWeight="600">
                Review Lists
              </Text>

              <VStack alignItems="flex-start" spacing={0}>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={20}
                  color2="#FFA439"
                  value={4}
                  edit={false}
                />
                <Text
                  fontSize={['md', '18px']}
                  color="#212429"
                  fontWeight="400"
                  textAlign="justify"
                >
                  {product3.reviews[0].review}
                </Text>
                <Text
                  fontSize="14px"
                  color="#21242980"
                  fontWeight="400"
                  textAlign="justify"
                >
                  {formatTime(product3.reviews[0].createdAt)}
                </Text>
                <HStack
                  w="full"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HStack>
                    <Avatar
                      size="sm"
                      name={product3.reviews[0].name}
                      bg="brand.100"
                      color="red.100"
                    />
                    <Text
                      fontSize={['14px', 'md']}
                      color="#212429"
                      fontWeight="400"
                    >
                      {product3.reviews[0].name}
                    </Text>
                  </HStack>

                  <Stack direction="row" spacing={4}>
                    <ChakraButton
                      leftIcon={<Image src="/images/like.svg" />}
                      variant="outline"
                      borderRadius="5px"
                      borderColor="#E4E9EE"
                      size="sm"
                    >
                      128
                    </ChakraButton>
                    <ChakraButton
                      leftIcon={<Image src="/images/unlike.svg" />}
                      variant="outline"
                      borderRadius="5px"
                      borderColor="#E4E9EE"
                      size="sm"
                    >
                      0
                    </ChakraButton>
                  </Stack>
                </HStack>

                <VStack>
                  <ChakraButton variant="link" color="brand.100" size="sm">
                    See more...
                  </ChakraButton>
                </VStack>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      <VStack mt={5} w="100%">
        <AlsoViewed name="More items from seller" />

        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
            'repeat(5, 1fr)',
          ]}
          gap={5}
          w="100%"
          mt={2}
        >
          {productsBulk
            .slice(0, Math.min(productsBulk.length, 5))
            .map((item, index) => (
              <GridItem key={index}>
                <ProductCard3 item={item} />
              </GridItem>
            ))}
        </Grid>
      </VStack>

      <VStack mt={5} w="100%">
        <AlsoViewed name="You may also like" />

        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
            'repeat(5, 1fr)',
          ]}
          gap={5}
          w="100%"
          mt={2}
        >
          {productsBulk
            .slice(0, Math.min(products.length, 5))
            .map((item, index) => (
              <GridItem key={index}>
                <ProductCard3 item={item} />
              </GridItem>
            ))}
        </Grid>
      </VStack>
    </Layout>
  );
};

export default ProductDeal;

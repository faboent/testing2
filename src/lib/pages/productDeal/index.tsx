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
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

import Layout from '~/lib/components/layout';
import AddDeal from '~/lib/components/modals/AddDeal';
import AlsoViewed from '~/lib/components/product/AlsoViewed';
import ProductCard2 from '~/lib/components/product/ProductCard2';
import Button from '~/lib/components/ui/Button';
import Modal from '~/lib/components/ui/Modal';
import { product2, products } from '~/lib/utils/constants';
import { formatCurrency, formatTime } from '~/lib/utils/formatter';

const ProductDeal = () => {
  const router = useRouter();
  const [visibleStart, setVisibleStart] = useState(0);
  const [currentImage, setCurrentImage] = useState(product2.image);
  const [isLiked, setIsLiked] = useState(false);
  const visibleCount = 5;

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleScrollUp = () => {
    setVisibleStart((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollDown = () => {
    setVisibleStart((prev) =>
      Math.min(prev + 1, product2.images.length - visibleCount)
    );
  };

  const visibleImages = product2.images.slice(
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

  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

  useEffect(() => {
    if (!product2.dealExpireTime) return;

    const updateCountdown = () => {
      // const now = new Date();
      // const expireTime = new Date(item.dealExpireTime);
      // const difference = expireTime.getTime() - now.getTime();

      const now = new Date();
      const expireTime = new Date(product2.dealExpireTime!);
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
  }, []);

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
                        visibleStart + visibleCount >= product2.images.length
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
                    {product2.name}
                  </Text>

                  <VStack alignItems="flex-start" spacing={0}>
                    <Text fontSize="14px" color="#212429" fontWeight="400">
                      Slot availability:
                      <Text as="span" fontWeight="300">
                        In Stock
                      </Text>
                    </Text>
                  </VStack>

                  <HStack>
                    <Text
                      color="#212429"
                      fontSize={['lg', 'xl', '2xl']}
                      fontWeight="600"
                      lineHeight="1.5"
                      fontFamily="body"
                    >
                      {formatCurrency(product2.price)}{' '}
                      <Text
                        as="span"
                        color="#2124294D"
                        fontSize={['14px', 'md']}
                        fontWeight="400"
                        textDecoration="line-through"
                        opacity="0.5"
                      >
                        {formatCurrency(product2.discount)}
                      </Text>
                    </Text>

                    <Badge
                      px={1.5}
                      py={1}
                      bg="brand.100"
                      fontSize="14px"
                      fontWeight="500"
                      color="white"
                      borderRadius="8px"
                    >
                      30% OFF
                    </Badge>
                  </HStack>

                  <HStack align="center" spacing="0" m={0} p={0}>
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

                  <HStack>
                    <HStack spacing={1}>
                      <Text color="#212429" fontSize="14px" fontWeight="500">
                        {product2.rating}
                      </Text>
                      <Image src="/images/star.svg" />
                    </HStack>
                    <Text color="#212429" fontSize="14px" fontWeight="500">
                      {product2.reviews.length} Reviews
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
                    <Button
                      text="Buy Now"
                      bg="brand.100"
                      size="md"
                      onClick={onOpen}
                    />
                    <Button
                      text="Add to Cart"
                      bg="White"
                      variant="outline"
                      border="brand.100"
                      color="brand.100"
                      size="md"
                      onClick={onOpen}
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
              Location
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
              Policy
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
                {product2.description}
              </Text>
            </TabPanel>
            <TabPanel>
              <VStack spacing={2} alignItems="flex-start">
                <Grid
                  templateColumns={{
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(6, 1fr)',
                  }}
                  gap={2}
                  w="100%"
                >
                  {product2.locations.map((location, index) => (
                    <GridItem key={index}>
                      <Text
                        fontSize={['14px', 'md']}
                        color="#212429"
                        fontWeight="600"
                        mb="2"
                      >
                        {location.state}
                      </Text>
                      <VStack spacing={2} alignItems="flex-start">
                        {location.places.map((place, index) => (
                          <Text
                            key={index}
                            fontSize="14px"
                            color="#212429"
                            fontWeight="400"
                          >
                            {place}
                          </Text>
                        ))}
                      </VStack>
                    </GridItem>
                  ))}
                </Grid>
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
                {product2.warranty}
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
          {products
            .slice(0, Math.min(products.length, 5))
            .map((item, index) => (
              <GridItem key={index}>
                <ProductCard2 item={item} />
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
                  {product2.reviews[0].review}
                </Text>
                <Text
                  fontSize="14px"
                  color="#21242980"
                  fontWeight="400"
                  textAlign="justify"
                >
                  {formatTime(product2.reviews[0].createdAt)}
                </Text>
                <HStack
                  w="full"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HStack>
                    <Avatar
                      size="sm"
                      name={product2.reviews[0].name}
                      bg="brand.100"
                      color="red.100"
                    />
                    <Text
                      fontSize={['14px', 'md']}
                      color="#212429"
                      fontWeight="400"
                    >
                      {product2.reviews[0].name}
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
          {products
            .slice(0, Math.min(products.length, 5))
            .map((item, index) => (
              <GridItem key={index}>
                <ProductCard2 item={item} />
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
          {products
            .slice(0, Math.min(products.length, 5))
            .map((item, index) => (
              <GridItem key={index}>
                <ProductCard2 item={item} />
              </GridItem>
            ))}
        </Grid>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title=""
        size="md"
        body={<AddDeal onClose={onClose} />}
      />
    </Layout>
  );
};

export default ProductDeal;

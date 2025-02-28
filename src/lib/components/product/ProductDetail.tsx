'use client';

/* eslint-disable radix */

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
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

import Button from '../ui/Button';
import { useWishlistHandler } from '~/lib/hooks/useWishlistHandler';
import {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from '~/lib/redux/services/cart.service';
import { useAppSelector } from '~/lib/redux/store';
import { formatCurrency } from '~/lib/utils/formatter';

type ProductDetailProps = {
  product: {
    item_code: string;
    productName: string;
    actual_price: number;
    discounted_price: number;
    discount: number;
    rating: number;
    reviews: any[];
    is_favourite: number;
    brand: string;
    quantity: string;
    color: any[];
    id: number;
  };
  handleScrollUp: () => void;
  handleScrollDown: () => void;
  visibleStart: number;
  visibleCount: number;
  visibleImages: string[];
  images: string[];
  currentImage: string;
  setCurrentImage: any;
  selectedColor: string;
  setSelectedColor: any;
  isLoading: boolean;
};

const ProductDetail = ({
  product,
  handleScrollUp,
  handleScrollDown,
  visibleStart,
  visibleCount,
  visibleImages,
  images,
  currentImage,
  setCurrentImage,
  selectedColor,
  setSelectedColor,
  isLoading,
}: ProductDetailProps) => {
  const router = useRouter();
  const toast = useToast();

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;

  const [quantity, setQuantity] = useState<number>(1);

  const { handleLike, loadingAddToWishList, loadingRemoveFromWishList } =
    useWishlistHandler();

  const [updateCart, { isLoading: loadingUpdateCart }] =
    useUpdateCartMutation();

  const [addToCart, { isLoading: loadingAddToCart }] = useAddToCartMutation();
  const { data: cartData } = useGetCartQuery(user?.user_id);

  const cartItems = useMemo(
    () => (Array.isArray(cartData?.message.body) ? cartData.message.body : []),
    [cartData]
  );

  // Add this helper function to check if item is in cart
  const isItemInCart = useMemo(() => {
    return cartItems.some((item: any) => item.item_code === product.item_code);
  }, [cartItems, product.item_code]);

  // Add this helper function to get cart item quantity
  const cartItemQuantity = useMemo(() => {
    const cartItem = cartItems.find(
      (item: any) => item.item_code === product.item_code
    );
    return cartItem?.quantity || 0;
  }, [cartItems, product.item_code]);

  const handleAddToCart = async () => {
    if (!userInfo?.user) {
      toast({
        title: 'Please login to add product to cart',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    await addToCart({
      productId: product.id,
      qty: quantity,
      price: Number(product.actual_price),
      discountedPrice: Number(product.discounted_price)
    })
      .unwrap()
      .then(() => {
        toast({
          title: 'Item added to cart',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setQuantity(1);
      })
      .catch((err: any) => {
        toast({
          title: err?.data?.message ?? 'Error adding item to cart',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  const handleBuyNow = async () => {
    if (!userInfo?.user) {
      toast({
        title: 'Please login to buy product',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    await addToCart({
      item_code: product.item_code,
      user_id: user?.user_id,
      quantity,
    })
      .unwrap()
      .then(() => {
        router.push('/checkout');
      })
      .catch((err: any) => {
        toast({
          title: err?.data?.message ?? 'Error adding item to cart',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  // const handleIncreaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const handleDecreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  const handleIncreaseQuantity = async () => {
    if (isItemInCart) {
      await updateCart({
        user_id: user?.user_id,
        item_code: product.item_code,
        quantity: cartItemQuantity + 1,
      })
        .unwrap()
        .then(() => {
          toast({
            title: 'Cart updated successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        })
        .catch((err: any) => {
          toast({
            title: err?.data?.message ?? 'Error updating cart',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        });
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (isItemInCart && cartItemQuantity > 1) {
      await updateCart({
        user_id: user?.user_id,
        item_code: product.item_code,
        quantity: cartItemQuantity - 1,
      })
        .unwrap()
        .then(() => {
          toast({
            title: 'Cart updated successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        })
        .catch((err: any) => {
          toast({
            title: err?.data?.message ?? 'Error updating cart',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        });
    } else if (!isItemInCart && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {isLoading ? (
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
            <Skeleton height="400px" w="100%" borderRadius="10" />
          </GridItem>

          <GridItem colSpan={{ sm: 0, md: 1, lg: 1 }} h="100%" w="100%">
            <Skeleton height="128px" mb={2} borderRadius="8" />
            <Skeleton height="128px" mb={2} borderRadius="8" />
            <Skeleton height="128px" borderRadius="8" />
          </GridItem>
        </Grid>
      ) : (
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
                      {visibleImages?.map((image: any, index: any) => (
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
                          visibleStart + visibleCount >= images.length
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
                      p={2}
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
                  <VStack alignItems="flex-start" spacing={2}>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      w="full"
                    >
                      <Badge
                        bg="#E92F2F"
                        color="#F0F0F0"
                        fontSize="14px"
                        fontWeight="600"
                        px={2}
                        borderRadius="5px"
                        textTransform="capitalize"
                      >
                        Official Store
                      </Badge>
                    </HStack>

                    <Text
                      fontSize={['md', 'lg', 'xl']}
                      fontWeight="500"
                      color="#191919"
                    >
                      {product?.productName}
                    </Text>

                    <VStack alignItems="flex-start" spacing={0}>
                      <Text fontSize="14px" color="#212429" fontWeight="400">
                        Brand: &nbsp;
                        <Text as="span" fontWeight="300">
                          {product?.brand}
                        </Text>
                      </Text>
                      <Text fontSize="14px" color="#212429" fontWeight="400">
                        Stock availability: &nbsp;
                        <Text as="span" fontWeight="300">
                          {parseInt(product?.quantity) > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </Text>
                      </Text>

                      <HStack>
                        <Text
                          fontSize="14px"
                          color="#212429"
                          fontWeight="400"
                          style={{
                            textWrap: 'nowrap',
                          }}
                        >
                          Color availability:
                        </Text>

                        {/* <HStack spacing={1}>
                          {['Natural', 'Black', 'Blue', 'White'].map(
                            (color, index) => (
                              <Box
                                key={index}
                                borderWidth={1}
                                borderColor="brand.100"
                                borderRadius="3px"
                                color="#212429"
                                bg={
                                  selectedColor === color
                                    ? 'brand.100'
                                    : 'transparent'
                                }
                                fontSize="10px"
                                fontWeight="400"
                                w="auto"
                                h="auto"
                                px={2}
                                textTransform="capitalize"
                                cursor="pointer"
                                onClick={() => setSelectedColor(color)}
                              >
                                {color}
                              </Box>
                            )
                          )}
                        </HStack> */}

                        <HStack spacing={1}>
                          {product?.color?.map((color: any, index: any) => (
                            <Box
                              key={index}
                              borderWidth={1}
                              borderColor="brand.100"
                              borderRadius="3px"
                              color="#212429"
                              bg={
                                selectedColor === color?.color
                                  ? 'brand.100'
                                  : 'transparent'
                              }
                              fontSize="10px"
                              fontWeight="400"
                              w="auto"
                              h="auto"
                              px={2}
                              textTransform="capitalize"
                              cursor="pointer"
                              onClick={() => setSelectedColor(color?.color)}
                            >
                              {color?.color}
                            </Box>
                          ))}
                        </HStack>
                      </HStack>
                    </VStack>

                    <HStack>
                      <Text
                        color="#212429"
                        fontSize={['lg', 'xl', '2xl']}
                        fontWeight="600"
                        lineHeight="1.5"
                        fontFamily="body"
                        style={{
                          textWrap: 'nowrap',
                        }}
                      >
                        {formatCurrency(product?.discounted_price)}{' '}
                        <Text
                          as="span"
                          color="#2124294D"
                          fontSize={['14px', 'md']}
                          fontWeight="400"
                          textDecoration="line-through"
                          opacity="0.5"
                          style={{
                            textWrap: 'nowrap',
                          }}
                        >
                          {formatCurrency(product?.actual_price)}
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
                        {product?.discount}% OFF
                      </Badge>
                    </HStack>

                    <HStack>
                      <HStack spacing={1}>
                        <Text color="#212429" fontSize="14px" fontWeight="500">
                          {product?.rating}
                        </Text>
                        <Image src="/images/star.svg" />
                      </HStack>
                      <Text color="#212429" fontSize="14px" fontWeight="500">
                        {product?.reviews?.length ?? 0} Reviews
                      </Text>
                    </HStack>

                    <HStack
                      w="full"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {!isItemInCart && (
                        <HStack>
                          <Text fontSize="md" color="#191919" fontWeight="400">
                            Quantity
                          </Text>
                          <ButtonGroup size="sm" isAttached variant="outline">
                            <IconButton
                              aria-label="remove"
                              icon={<MinusIcon />}
                              borderRadius="0"
                              onClick={handleDecreaseQuantity}
                              isDisabled={quantity === 1}
                            />
                            <ChakraButton
                              borderRadius="0"
                              color="#191919"
                              fontWeight="400"
                              fontSize="16px"
                            >
                              {quantity}
                            </ChakraButton>
                            <IconButton
                              aria-label="add"
                              icon={<AddIcon />}
                              borderRadius="0"
                              onClick={handleIncreaseQuantity}
                              isDisabled={
                                quantity >= parseInt(product?.quantity)
                              }
                            />
                          </ButtonGroup>
                        </HStack>
                      )}

                      <HStack spacing={0}>
                        <IconButton
                          aria-label="Like"
                          icon={
                            product?.is_favourite ? (
                              <Image
                                src="/images/heart.svg"
                                w="20px"
                                h="20px"
                              />
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
                          onClick={(event) => {
                            event.preventDefault();
                            handleLike({
                              item_code: product.item_code,
                              is_favourite: product.is_favourite,
                            });
                          }}
                          isLoading={
                            loadingAddToWishList || loadingRemoveFromWishList
                          }
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
                      {/* <Button
                        text="Buy Now"
                        bg="brand.100"
                        size="md"
                        onClick={handleBuyNow}
                        isDisabled={loadingAddToCart}
                        isLoading={loadingAddToCart}
                      />
                      <Button
                        text="Add to Cart"
                        bg="White"
                        variant="outline"
                        border="brand.100"
                        color="brand.100"
                        size="md"
                        onClick={handleAddToCart}
                        isDisabled={loadingAddToCart}
                        isLoading={loadingAddToCart}
                      /> */}
                      {isItemInCart ? (
                        <HStack>
                          <ButtonGroup
                            size="sm"
                            isAttached
                            variant="outline"
                            w="full"
                          >
                            <IconButton
                              aria-label="remove"
                              icon={<MinusIcon />}
                              borderRadius="0"
                              onClick={handleDecreaseQuantity}
                              isDisabled={cartItemQuantity === 1}
                            />
                            <ChakraButton
                              borderRadius="0"
                              color="#191919"
                              fontWeight="400"
                              fontSize="16px"
                              flex="1"
                              isLoading={loadingUpdateCart}
                            >
                              {cartItemQuantity} in cart
                            </ChakraButton>
                            <IconButton
                              aria-label="add"
                              icon={<AddIcon />}
                              borderRadius="0"
                              onClick={handleIncreaseQuantity}
                              isDisabled={
                                cartItemQuantity >= parseInt(product?.quantity)
                              }
                            />
                          </ButtonGroup>
                        </HStack>
                      ) : (
                        <HStack w="full">
                          <Button
                            text="Buy Now"
                            bg="brand.100"
                            size="md"
                            onClick={handleBuyNow}
                            isDisabled={loadingAddToCart}
                            isLoading={loadingAddToCart}
                          />
                          <Button
                            text="Add to Cart"
                            bg="White"
                            variant="outline"
                            border="brand.100"
                            color="brand.100"
                            size="md"
                            onClick={handleAddToCart}
                            isDisabled={loadingAddToCart}
                            isLoading={loadingAddToCart}
                          />
                        </HStack>
                      )}
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
      )}

      <Box />
    </>
  );
};

export default ProductDetail;

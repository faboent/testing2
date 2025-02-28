'use client';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  VStack,
  Grid,
  GridItem,
  Box,
  Image,
  HStack,
  Text,
  Button as ChakraButton,
  ButtonGroup,
  IconButton,
  Badge,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Button from '../ui/Button';
import { useWishlistHandler } from '~/lib/hooks/useWishlistHandler';
import {
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} from '~/lib/redux/services/cart.service';
import { useAppSelector } from '~/lib/redux/store';
import { formatCurrency, shortenText } from '~/lib/utils/formatter';

type CartItem = {
  cartItems: any[];
  isLoading: boolean;
};

const CartDetail = ({ cartItems, isLoading }: CartItem) => {
  const router = useRouter();
  const toast = useToast();

  const [images, setImages] = useState<string[]>([]);
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;

  const { handleLike, loadingAddToWishList, loadingRemoveFromWishList } =
    useWishlistHandler();

  const [updateCart] = useUpdateCartMutation();

  const [removeFromCart] = useRemoveFromCartMutation();

  const cartTotal = useMemo(
    () =>
      Array.isArray(cartItems)
        ? cartItems.reduce(
            (acc: any, item: any) => acc + item.price * item.quantity,
            0
          )
        : 0,
    [cartItems]
  );

  const parsedImages = useMemo(() => {
    return cartItems?.map((item) => {
      return JSON.parse(item?.image) ?? [];
    });
  }, [cartItems]);

  useEffect(() => {
    setImages(parsedImages);
  }, [parsedImages]);

  const handleUpdateCart = async (item: any, quantity: number) => {
    setLoadingItems((prev) => ({ ...prev, [item.item_code]: true }));
    await updateCart({
      user_id: user?.user_id,
      item_code: item?.item_code,
      quantity,
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
      .catch(() => {
        toast({
          title: 'Cart update failed',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .finally(() => {
        setLoadingItems((prev) => ({ ...prev, [item.item_code]: false }));
      });
  };

  const handleRemoveFromCart = async (item: any) => {
    setLoadingItems((prev) => ({ ...prev, [item.item_code]: true }));
    await removeFromCart({
      userId: user?.user_id,
      itemCode: item?.item_code,
    })
      .unwrap()
      .then(() => {
        toast({
          title: 'Item removed from cart successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch(() => {
        toast({
          title: 'Item removal failed',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .finally(() => {
        setLoadingItems((prev) => ({ ...prev, [item.item_code]: false }));
      });
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
            lg: 'repeat(6, 1fr)',
          }}
          gap={6}
          h="100%"
          mb={5}
          mt={{ base: 5, md: 5 }}
        >
          <GridItem colSpan={{ sm: 1, md: 1, lg: 4 }} h="100%" w="100%">
            <Box w="100%" bg="white" borderRadius={8} boxShadow="5px" p={4}>
              <VStack alignItems="flex-start" spacing={4}>
                {cartItems.length > 0 && (
                  <>
                    {cartItems.map((item, index) => (
                      <HStack
                        key={index}
                        alignItems="flex-start"
                        w="full"
                        justifyContent="space-between"
                        borderBottomWidth={1}
                        borderBottomColor="#3434341A"
                        pb={4}
                        flexDirection={{ base: 'column', md: 'row' }}
                      >
                        <HStack
                          alignItems="flex-start"
                          spacing={4}
                          onClick={() =>
                            router.push(`/product/${item?.item_code}`)
                          }
                          cursor="pointer"
                        >
                          <Image
                            src={images[index]?.[0]}
                            width="51px"
                            height="61px"
                            alt={item?.product_name}
                            fallback={<Skeleton w="51px" h="61px" />}
                          />
                          <VStack alignItems="flex-start" spacing={0}>
                            <Text
                              fontSize="14px"
                              color="#212429"
                              fontWeight="400"
                            >
                              {shortenText(item?.product_name, 30)}
                            </Text>
                            <Text
                              fontSize="12px"
                              color="#21242961"
                              fontWeight="400"
                            >
                              Merchant:{' '}
                              <Text as="span">
                                {item?.seller_name ? item?.seller_name : 'N/A'}
                              </Text>
                            </Text>
                            <Text
                              fontSize="12px"
                              color="#21242961"
                              fontWeight="400"
                            >
                              Stock Availability:{' '}
                              <Text as="span">Limited stock</Text>
                            </Text>
                          </VStack>
                        </HStack>

                        <HStack
                          alignItems="flex-start"
                          spacing={8}
                          display={{ base: 'none', md: 'flex' }}
                        >
                          <ButtonGroup size="sm" isAttached variant="outline">
                            <IconButton
                              aria-label="Decrease quantity"
                              icon={<MinusIcon />}
                              borderRadius="0"
                              isLoading={loadingItems[item.item_code]}
                              isDisabled={
                                item.quantity === 1 ||
                                loadingItems[item.item_code]
                              }
                              onClick={(event) => {
                                event.preventDefault();
                                handleUpdateCart(
                                  item,
                                  (item?.quantity ?? 0) - 1
                                );
                              }}
                            />
                            <ChakraButton
                              borderRadius="0"
                              color="#191919"
                              fontWeight="400"
                              fontSize="16px"
                            >
                              {item?.quantity}
                            </ChakraButton>
                            <IconButton
                              aria-label="Increase quantity"
                              icon={<AddIcon />}
                              borderRadius="0"
                              isLoading={loadingItems[item.item_code]}
                              isDisabled={loadingItems[item.item_code]}
                              onClick={(event) => {
                                event.preventDefault();
                                handleUpdateCart(
                                  item,
                                  (item?.quantity ?? 0) + 1
                                );
                              }}
                            />
                          </ButtonGroup>

                          <VStack alignItems="flex-start" spacing={0}>
                            <Text
                              color="#212429"
                              fontSize={['md', 'lg']}
                              fontWeight="600"
                              fontFamily="body"
                            >
                              {formatCurrency(item?.price)}
                            </Text>
                            {item?.discount && (
                              <HStack alignItems="flex-start" spacing={2}>
                                <Text
                                  as="span"
                                  color="#3434344D"
                                  fontSize="14px"
                                  fontWeight="500"
                                  textDecoration="line-through"
                                  opacity="0.5"
                                >
                                  {formatCurrency(3000)}
                                </Text>
                                <Badge
                                  size="xs"
                                  bg="brand.100"
                                  fontSize="12px"
                                  fontWeight="500"
                                  color="white"
                                  borderRadius="3px"
                                >
                                  -25%
                                </Badge>
                              </HStack>
                            )}

                            <HStack alignItems="flex-start" spacing={4}>
                              <ChakraButton
                                size="sm"
                                fontWeight="500"
                                color="brand.100"
                                fontSize="sm"
                                variant="ghost"
                                leftIcon={<Image src="/images/trash.svg" />}
                                _hover={{ bg: 'transparent' }}
                                m={0}
                                p={0}
                                isLoading={loadingItems[item.item_code]}
                                isDisabled={loadingItems[item.item_code]}
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleRemoveFromCart(item);
                                }}
                              >
                                Remove
                              </ChakraButton>
                              <ChakraButton
                                size="sm"
                                fontWeight="500"
                                color="brand.100"
                                fontSize="sm"
                                variant="ghost"
                                _hover={{ bg: 'transparent' }}
                                m={0}
                                p={0}
                                isLoading={
                                  loadingAddToWishList ||
                                  loadingRemoveFromWishList
                                }
                                isDisabled
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleLike({
                                    item_code: item?.item_code,
                                    is_favourite: 1,
                                  });
                                }}
                              >
                                Add to Wishlist
                              </ChakraButton>
                            </HStack>
                          </VStack>
                        </HStack>

                        {/* mobile */}
                        <HStack
                          justifyContent="space-between"
                          alignItems="flex-start"
                          w="full"
                          display={{ base: 'flex', md: 'none' }}
                          mt={2}
                        >
                          <VStack alignItems="flex-start" spacing={0}>
                            <Text
                              color="#212429"
                              fontSize={['md', 'lg']}
                              fontWeight="600"
                              fontFamily="body"
                            >
                              {formatCurrency(item?.price)}
                            </Text>

                            {item?.discount && (
                              <HStack alignItems="flex-start" spacing={2}>
                                <Text
                                  as="span"
                                  color="#3434344D"
                                  fontSize="14px"
                                  fontWeight="500"
                                  textDecoration="line-through"
                                  opacity="0.5"
                                >
                                  {formatCurrency(3000)}
                                </Text>
                                <Badge
                                  size="xs"
                                  bg="brand.100"
                                  fontSize="12px"
                                  fontWeight="500"
                                  color="white"
                                  borderRadius="3px"
                                >
                                  -25%
                                </Badge>
                              </HStack>
                            )}
                          </VStack>

                          <VStack alignItems="flex-start" spacing={0}>
                            <ButtonGroup size="sm" isAttached variant="outline">
                              <IconButton
                                aria-label="Remove from friends"
                                icon={<MinusIcon />}
                                borderRadius="0"
                                isLoading={loadingItems[item.item_code]}
                                isDisabled={
                                  item.quantity === 1 ||
                                  loadingItems[item.item_code]
                                }
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleUpdateCart(
                                    item,
                                    (item?.quantity ?? 0) - 1
                                  );
                                }}
                              />
                              <ChakraButton
                                borderRadius="0"
                                color="#191919"
                                fontWeight="400"
                                fontSize="16px"
                              >
                                {item?.quantity}
                              </ChakraButton>
                              <IconButton
                                aria-label="Add to friends"
                                icon={<AddIcon />}
                                borderRadius="0"
                                isLoading={loadingItems[item.item_code]}
                                isDisabled={loadingItems[item.item_code]}
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleUpdateCart(
                                    item,
                                    (item?.quantity ?? 0) + 1
                                  );
                                }}
                              />
                            </ButtonGroup>

                            <HStack alignItems="flex-start" spacing={4}>
                              <ChakraButton
                                size="sm"
                                fontWeight="500"
                                color="brand.100"
                                fontSize="sm"
                                variant="ghost"
                                leftIcon={<Image src="/images/trash.svg" />}
                                _hover={{ bg: 'transparent' }}
                                m={0}
                                p={0}
                                isLoading={loadingItems[item.item_code]}
                                isDisabled={loadingItems[item.item_code]}
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleRemoveFromCart(item);
                                }}
                              >
                                Remove
                              </ChakraButton>
                              <ChakraButton
                                size="sm"
                                fontWeight="500"
                                color="brand.100"
                                fontSize="sm"
                                variant="ghost"
                                _hover={{ bg: 'transparent' }}
                                m={0}
                                p={0}
                                isLoading={
                                  loadingAddToWishList ||
                                  loadingRemoveFromWishList
                                }
                                isDisabled
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleLike({
                                    item_code: item?.item_code,
                                    is_favourite: 1,
                                  });
                                }}
                              >
                                Add to Wishlist
                              </ChakraButton>
                            </HStack>
                          </VStack>
                        </HStack>
                      </HStack>
                    ))}
                  </>
                )}

                {cartItems.length === 0 && (
                  <VStack w="full" alignItems="center">
                    {/* <Image src="/images/empty-cart.svg" /> */}
                    <Text
                      fontSize="md"
                      color="#212429"
                      fontWeight="500"
                      textAlign="center"
                    >
                      Your cart is empty
                    </Text>
                  </VStack>
                )}
              </VStack>
            </Box>
          </GridItem>

          <GridItem colSpan={{ sm: 0, md: 1, lg: 2 }} h="100%" w="100%">
            <VStack alignItems="flex-start" spacing={2}>
              <Box w="100%" h="100%" bg="white" borderRadius={8}>
                <VStack
                  w="full"
                  px={4}
                  py={2}
                  borderBottomWidth={1}
                  borderBottomColor="#3434341A"
                >
                  <Text fontSize="md" color="#212429" fontWeight="600">
                    ORDER SUMMARY
                  </Text>
                </VStack>

                <VStack spacing={2} p={4} alignItems="flex-start">
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="full"
                  >
                    <Text fontSize="md" color="#212429" fontWeight="500">
                      Subtotal
                    </Text>

                    <Text fontSize="14px" color="#212429" fontWeight="500">
                      {formatCurrency(cartTotal)}
                    </Text>
                  </HStack>
                </VStack>

                <VStack w="full" p={4} alignItems="flex-start">
                  <VStack w="full">
                    <Button
                      text="Checkout"
                      bg="brand.100"
                      size="sm"
                      fontWeight={600}
                      fontSize={16}
                      onClick={() => router.push('/checkout')}
                      isDisabled={cartItems.length === 0}
                    />
                  </VStack>
                </VStack>
              </Box>

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
            </VStack>
          </GridItem>
        </Grid>
      )}

      <Box />
    </>
  );
};

export default CartDetail;

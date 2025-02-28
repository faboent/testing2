'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  VStack,
  Grid,
  GridItem,
  Box,
  Image,
  HStack,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  Button as ChakraButton,
  Radio,
  Badge,
  Divider,
  Skeleton,
  RadioGroup,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Layout from '~/lib/components/layout';
import AddressModal from '~/lib/components/modals/AddressModal';
import Button from '~/lib/components/ui/Button';
import Modal from '~/lib/components/ui/Modal';
import { usePayStack } from '~/lib/hooks/usePayStack';
import { useGetShippingAddressQuery } from '~/lib/redux/services/account.service';
import { useGetCartQuery } from '~/lib/redux/services/cart.service';
import {
  useGetShippingCostMutation,
  useCreateShipmentMutation,
  useCreateOrderMutation,
} from '~/lib/redux/services/order.service';
import { useAppSelector } from '~/lib/redux/store';
import { formatCurrency, shortenText } from '~/lib/utils/formatter';

const Checkout = () => {
  const router = useRouter();
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;
  const userId = user?.user_id;

  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<
    'Paystack' | 'Wallet' | 'BNPL'
  >('Paystack');
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [shippingCost, setShippingCost] = useState(0);

  const [createShipment, { isLoading: shipmentIsLoading }] =
    useCreateShipmentMutation();

  const [createOrder, { isLoading: orderIsLoading }] = useCreateOrderMutation();

  const [getShippingCost] = useGetShippingCostMutation();

  const pickupCoordinates = {
    pickup_lat: 6.5244,
    pickup_long: 3.3792,
  };

  const { data: shippingAddress, isLoading: shippingAddressLoading } =
    useGetShippingAddressQuery(userId);

  const shippingAddressData = useMemo(
    () => shippingAddress?.data ?? [],
    [shippingAddress]
  );

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const { data: cartData, isLoading: cartIsLoading } = useGetCartQuery(
    user?.user_id
  );
  const cartItems = useMemo(
    () => (Array.isArray(cartData?.message.body) ? cartData.message.body : []),
    [cartData]
  );

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
    return cartItems?.map((item: any) => {
      return JSON.parse(item?.image) ?? [];
    });
  }, [cartItems]);

  useEffect(() => {
    setImages(parsedImages);
  }, [parsedImages]);

  const calculateShippingCost = async () => {
    await getShippingCost({
      pickup_lat: pickupCoordinates.pickup_lat,
      pickup_long: pickupCoordinates.pickup_long,
      dropoff_lat: parseFloat(selectedAddress.latitude),
      dropoff_long: parseFloat(selectedAddress.longitude),
    })
      .unwrap()
      .then((res) => {
        setShippingCost(res?.data?.cost);
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  useEffect(() => {
    calculateShippingCost();
  }, [selectedAddress]);

  const createShipmentHandler = async (orderId: string) => {
    const shipmentData = {
      order_id: orderId,
      user_id: userId,
      shipping_address: selectedAddress?.address,
      first_name: selectedAddress?.firstName,
      last_name: selectedAddress?.lastName,
      phone_number: selectedAddress?.phone,
      lga: selectedAddress?.localGovernment,
      postal_code: selectedAddress?.postalCode,
      latitude: selectedAddress?.latitude,
      longitude: selectedAddress?.longitude,
    };

    await createShipment(shipmentData)
      .unwrap()
      .then((res) => {
        router.push(`/success?orderId=${orderId}`);
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  const createOrderHandler = async () => {
    const orderData = {
      shipping_address: selectedAddress?.address,
      lga: selectedAddress?.localGovernment,
      post_code: selectedAddress?.postalCode,
      subtotal: cartTotal,
      discount: 0,
      shipping_fee: shippingCost,
      payment_method: selectedMethod,
      user_id: userId,
      email: user?.email,
      items: cartItems.map((item: any) => item?.item_code),
    };

    await createOrder(orderData)
      .unwrap()
      .then((res) => {
        const orderId = res?.data?.message?.body?.order_id;
        createShipmentHandler(orderId);
      })
      .catch((err) => {
        toast({
          title: err?.data?.message ?? 'Order creation failed',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  const onSuccessCallback = (reference: any) => {
    createOrderHandler();
  };

  const { initializePayment, onSuccess } = usePayStack(
    user?.email,
    cartTotal + shippingCost,
    onSuccessCallback
  );

  const handlePayment = () => {
    initializePayment(onSuccess);
  };

  useEffect(() => {
    if (shippingAddressData?.length > 0) {
      const defaultAddress = shippingAddressData.find(
        (address: any) => address.isDefault
      );
      setSelectedAddress(defaultAddress || shippingAddressData[0]);
    }
  }, [shippingAddressData]);

  return (
    <Layout showNavMenu>
      {cartIsLoading || shippingAddressLoading ? (
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
            <VStack alignItems="flex-start" spacing={2}>
              <Box
                w="100%"
                h="100%"
                bg="white"
                borderRadius={8}
                boxShadow="5px"
                p={4}
              >
                <VStack alignItems="flex-start" spacing={0}>
                  <HStack>
                    <Image src="/images/checked.svg" />
                    <Text fontSize="md" color="#212429" fontWeight="600">
                      1. SELECT ADDRESS
                    </Text>
                  </HStack>
                </VStack>

                <RadioGroup value={selectedAddress?.shipping_id}>
                  {shippingAddressData?.map((address: any) => (
                    <Box
                      key={address?.shipping_id}
                      onClick={() => setSelectedAddress(address)} // Update state on click
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      borderWidth={1}
                      borderColor={
                        selectedAddress?.shipping_id === address?.shipping_id
                          ? 'brand.100'
                          : '#3434341A'
                      }
                      borderRadius="10px"
                      p={4}
                      mt={4}
                      cursor="pointer"
                      _hover={{ bg: '#F7FAFC' }}
                      bg={
                        selectedAddress?.shipping_id === address?.shipping_id
                          ? '#F7FAFC'
                          : 'white'
                      }
                    >
                      <VStack spacing={2} alignItems="flex-start">
                        <HStack alignItems="center" spacing={2}>
                          <Image src="/images/user.svg" />
                          <Text
                            fontSize="14px"
                            color="#212429"
                            fontWeight="400"
                          >
                            {address?.firstName} {address?.lastName}
                          </Text>
                        </HStack>

                        <HStack alignItems="center" spacing={2}>
                          <Image src="/images/location.svg" />
                          <Text
                            fontSize="14px"
                            color="#212429"
                            fontWeight="400"
                          >
                            {address?.address}
                          </Text>
                        </HStack>

                        <HStack alignItems="center" spacing={2}>
                          <Image src="/images/phone.svg" />
                          <Text
                            fontSize="14px"
                            color="#212429"
                            fontWeight="400"
                          >
                            {address?.phone}
                          </Text>
                        </HStack>

                        <HStack alignItems="center" spacing={2}>
                          {address?.isDefault && (
                            <Badge
                              bg="#21242933"
                              color="#212429"
                              fontSize="12px"
                              fontWeight="400"
                              borderRadius="3px"
                              px={2}
                              py={1}
                              textTransform="capitalize"
                            >
                              Default Address
                            </Badge>
                          )}
                          <ChakraButton
                            bg="brand.100"
                            color="white"
                            borderRadius="3px"
                            fontSize="12px"
                            fontWeight="400"
                            size="xs"
                            _hover={{ bg: 'brand.100' }}
                            leftIcon={<Image src="/images/edit.svg" />}
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpen();
                            }}
                          >
                            Edit Address
                          </ChakraButton>
                        </HStack>
                      </VStack>

                      <Radio
                        value={address?.shipping_id}
                        colorScheme="yellow"
                        size="lg"
                      />
                    </Box>
                  ))}
                </RadioGroup>

                <VStack mt={6}>
                  <Button
                    text="Add Address"
                    bg="brand.100"
                    width="50%"
                    size="sm"
                    onClick={onOpen}
                  />
                </VStack>
              </Box>

              <Box
                w="100%"
                h="100%"
                bg="white"
                borderRadius={8}
                boxShadow="5px"
                p={4}
              >
                <VStack alignItems="flex-start" spacing={0}>
                  <HStack>
                    <Image src="/images/checked.svg" />
                    <Text fontSize="md" color="#212429" fontWeight="600">
                      2. PAYMENT METHOD
                    </Text>
                  </HStack>
                </VStack>

                <RadioGroup
                  value={selectedMethod}
                  onChange={(value) => setSelectedMethod(value as any)}
                >
                  {[
                    {
                      id: 'Paystack',
                      title: 'Online Payment',
                      description: 'We accept Visa and MasterCard',
                      icon: '/images/card.svg',
                      extraIcons: [
                        '/images/visa.svg',
                        '/images/master-card.svg',
                      ],
                    },
                    {
                      id: 'BNPL',
                      title: 'Buy Now, Pay Later',
                      description:
                        'To use this option you must be registered with the BNPL credit provider',
                      icon: '/images/card-time.svg',
                    },
                    {
                      id: 'Wallet',
                      title: 'Wallet',
                      description:
                        'To use this option, your wallet amount must be sufficient for this transaction',
                      icon: '/images/wallet.svg',
                    },
                  ].map((method) => (
                    <HStack
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id as any)}
                      cursor="pointer"
                      justifyContent="space-between"
                      w="full"
                      mt={4}
                      alignItems="flex-start"
                      borderBottomWidth={1}
                      borderBottomColor="#3434341A"
                      pb={4}
                    >
                      <HStack spacing={4} alignItems="flex-start">
                        <Image src={method.icon} />
                        <VStack alignItems="flex-start" spacing={0} mt={-1.5}>
                          <Text fontSize="md" color="#212429" fontWeight="500">
                            {method.title}
                          </Text>
                          <Text
                            fontSize="14px"
                            color="#212429"
                            fontWeight="400"
                            mt={-1}
                          >
                            {method.description}
                          </Text>
                          {method.extraIcons && (
                            <HStack mt={0}>
                              {method.extraIcons.map((icon, index) => (
                                <Image src={icon} key={index} />
                              ))}
                            </HStack>
                          )}
                        </VStack>
                      </HStack>
                      <Radio value={method.id} colorScheme="yellow" size="lg" />
                    </HStack>
                  ))}
                </RadioGroup>
              </Box>

              <VStack mt={4}>
                <Button
                  text="Go back & continue shopping"
                  variant="outline"
                  color="brand.100"
                  border="brand.100"
                  bg="transparent"
                  size="sm"
                  fontWeight={500}
                  fontSize={14}
                  iconPosition="left"
                  icon={<Image src="/images/arrow3.svg" />}
                />
              </VStack>
            </VStack>
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

                <Box
                  w="100%"
                  h="100%"
                  bg="white"
                  borderRadius={8}
                  boxShadow="5px"
                  p={4}
                >
                  <VStack alignItems="flex-start" spacing={4}>
                    {cartItems?.map((item: any, index: any) => (
                      <HStack
                        key={index}
                        alignItems="flex-start"
                        w="full"
                        justifyContent="space-between"
                      >
                        <HStack alignItems="flex-start" spacing={4}>
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
                              {shortenText(item?.product_name, 25)}
                            </Text>
                            <Text
                              fontSize="12px"
                              color="#21242961"
                              fontWeight="400"
                            >
                              Merchant:{' '}
                              <Text as="span">
                                {' '}
                                {item?.seller_name ? item?.seller_name : 'N/A'}
                              </Text>
                            </Text>
                            <Text
                              fontSize="12px"
                              color="#212429"
                              fontWeight="400"
                            >
                              Quantity: <Text as="span">{item?.quantity}</Text>
                            </Text>
                            <Text
                              fontSize="14px"
                              color="#212429FA"
                              fontWeight="600"
                            >
                              {formatCurrency(
                                (item?.price ?? 0) * (item?.quantity ?? 0)
                              )}
                            </Text>
                          </VStack>
                        </HStack>

                        <Badge
                          variant="subtle"
                          bg="#E7906B4D"
                          color="brand.100"
                          fontSize="12px"
                          fontWeight="400"
                          borderRadius="3px"
                        >
                          {item.storeType}
                        </Badge>
                      </HStack>
                    ))}
                  </VStack>

                  <HStack mt={6} justify="flex-end">
                    <Button
                      text="Modify Cart"
                      bg="brand.100"
                      width="40%"
                      size="sm"
                      onClick={() => router.push('/cart')}
                    />
                  </HStack>
                </Box>

                <Divider mt={4} />

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
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="full"
                  >
                    <Text fontSize="md" color="#212429" fontWeight="500">
                      Shipping fee
                    </Text>

                    <Text fontSize="14px" color="#212429" fontWeight="500">
                      {formatCurrency(shippingCost)}
                    </Text>
                  </HStack>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="full"
                  >
                    <Text fontSize="md" color="#212429" fontWeight="500">
                      Discount
                    </Text>

                    <Text fontSize="14px" color="#34A853" fontWeight="500">
                      -{formatCurrency(0)}
                    </Text>
                  </HStack>

                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="full"
                  >
                    <Text fontSize="md" color="#212429" fontWeight="600">
                      Total
                    </Text>

                    <Text fontSize="14px" color="#212429" fontWeight="600">
                      {formatCurrency(cartTotal + shippingCost)}
                    </Text>
                  </HStack>
                </VStack>

                <VStack w="full" p={4} alignItems="flex-start">
                  <HStack w="full">
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Image src="/images/coupon.svg" mt={1} />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Enter coupon"
                        pl={10}
                        borderColor="brand.100"
                        focusBorderColor="brand.100"
                        _placeholder={{ color: '#21242980', fontSize: '14px' }}
                        fontSize="14px"
                        color="#212429"
                      />
                    </InputGroup>

                    <ChakraButton
                      size="sm"
                      variant="ghost"
                      color="brand.100"
                      fontSize="14px"
                      fontWeight="600"
                      _hover={{ bg: 'transparent' }}
                    >
                      Apply
                    </ChakraButton>
                  </HStack>

                  <VStack mt={4} w="full">
                    <Button
                      text="Confirm Order"
                      bg="brand.100"
                      size="sm"
                      fontWeight={600}
                      fontSize={16}
                      isDisabled={!selectedAddress || !selectedMethod}
                      isLoading={orderIsLoading || shipmentIsLoading}
                      // onClick={handlePayment}
                      onClick={() => {
                        if (selectedMethod === 'Paystack') {
                          handlePayment();
                        } else {
                          createOrderHandler();
                        }
                      }}
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title=""
        size="lg"
        body={
          <AddressModal
            onClose={onClose}
            type="create"
            selectedAddress={selectedAddress}
          />
        }
      />
    </Layout>
  );
};

export default Checkout;

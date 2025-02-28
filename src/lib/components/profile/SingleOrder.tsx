'use client';

import {
  VStack,
  Text,
  Skeleton,
  HStack,
  Image,
  Divider,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  Box,
  StepSeparator,
  useSteps,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { useGetOrderQuery } from '~/lib/redux/services/order.service';
import { useAppSelector } from '~/lib/redux/store';
import {
  formatCurrency,
  formatDate3,
  shortenText,
} from '~/lib/utils/formatter';

const SingleOrder = () => {
  const { orderId } = useParams();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;
  const userId = user?.user_id;

  const { data, isLoading } = useGetOrderQuery({ orderId, userId });

  const order = useMemo(() => data?.message?.body?.data, [data]);

  const orderItems = useMemo(() => order?.items, [order]);

  const steps = [
    {
      title: 'Shipment created',
      description: 'Your package is ready',
      icon: '/images/ship-1.svg',
      created: '2024-08-01 11:00:12',
    },
    {
      title: 'Awaiting pick up',
      description: 'Your package is ready, a rider is on the way for pick up',
      icon: '/images/ship-2.svg',
      created: '2024-08-01 11:00:12',
    },
    {
      title: 'In Transit',
      description:
        'Your order is on its way to your location, Tap here to view',
      icon: '/images/ship-3.svg',
      created: '2024-08-01 11:00:12',
    },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <VStack alignItems="stretch" spacing={4}>
      <Text fontSize="md" fontWeight="600" color="#212429">
        Track
      </Text>
      {isLoading ? (
        <VStack h="100%" w="100%" spacing={4}>
          <Skeleton height="100px" w="100%" borderRadius="10" mb={2} />
          <Skeleton height="100px" w="100%" borderRadius="10" mb={2} />
          <Skeleton height="100px" w="100%" borderRadius="10" mb={0} />
        </VStack>
      ) : (
        <>
          <HStack
            justifyContent="space-between"
            w="full"
            alignItems="flex-start"
          >
            <VStack alignItems="flex-start">
              <Text color="#212429" fontSize="sm" fontWeight="600" mb={2}>
                Order ID: #{order?.order_id}
              </Text>

              <VStack alignItems="flex-start" spacing={0}>
                <Text color="#21242980" fontSize="sm" fontWeight="400">
                  Order Date:
                </Text>
                <Text color="#212429" fontSize="sm" fontWeight="500">
                  {/* Wed, 5th August */}
                  {formatDate3(order?.creation)}
                </Text>
              </VStack>

              <VStack alignItems="flex-start" spacing={0}>
                <Text color="#21242980" fontSize="sm" fontWeight="400">
                  Estimated time of arrival :
                </Text>
                <Text color="#212429" fontSize="sm" fontWeight="500">
                  {/* Thur, 6th August{' '} */}
                  {formatDate3(order?.creation)}
                </Text>
              </VStack>
            </VStack>
            <VStack alignItems="flex-end">
              {orderItems?.map((item: any) => (
                <HStack alignItems="flex-start" spacing={4}>
                  <Image
                    src={JSON.parse(item?.image)[0]}
                    width="51px"
                    height="61px"
                    alt="order"
                    fallback={<Skeleton w="51px" h="61px" />}
                  />
                  <VStack alignItems="flex-start" spacing={0}>
                    <Text fontSize="14px" color="#212429" fontWeight="400">
                      {shortenText(item?.product_name, 30)}
                    </Text>
                    <Text fontSize="12px" color="#21242961" fontWeight="400">
                      Merchant: <Text as="span">{item?.seller_name}</Text>
                    </Text>

                    <Text fontSize="12px" color="#212429" fontWeight="400">
                      QTY: <Text as="span">{item?.quantity}</Text>
                    </Text>

                    <Text fontSize="12px" color="#212429FA" fontWeight="600">
                      {formatCurrency(item?.price)}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </HStack>

          <Divider my={4} borderColor="#2124291A" />

          <Stepper
            index={activeStep}
            orientation="vertical"
            height="400px"
            gap="0"
            sx={{
              // Base styles for all indicators
              '& .chakra-step__indicator': {
                bg: '#FF800F',
                color: 'white',
                borderRadius: 'full',
                borderColor: '#FF800F',
              },
              // Override active state
              '& .chakra-step__indicator[data-status="active"]': {
                bg: '#FF800F !important',
                borderColor: '#FF800F !important',
              },
              // Override complete state
              '& .chakra-step__indicator[data-status="complete"]': {
                bg: '#FF800F !important',
                borderColor: '#FF800F !important',
              },
              // Override incomplete state
              '& .chakra-step__indicator[data-status="incomplete"]': {
                bg: '#FF800F !important',
                borderColor: '#FF800F !important',
              },
              // Style for the separator
              '& .chakra-step__separator': {
                borderWidth: '2px',
                borderColor: '#D5D5D5',
                height: 'auto',
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon color="white" />}
                    incomplete={<StepNumber style={{ color: 'white' }} />}
                    active={<StepNumber style={{ color: 'white' }} />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <HStack alignItems="flex-start">
                    <Image src={step.icon} alt={step.title} />
                    <VStack alignItems="flex-start" spacing={0}>
                      <Text color="#212429" fontSize="md" fontWeight="500">
                        {step.title}
                      </Text>
                      <Text color="#212429" fontSize="14px" fontWeight="400">
                        {step.description}
                      </Text>
                      <Text color="#21242980" fontSize="sm" fontWeight="400">
                        {formatDate3(step.created)}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          <HStack
            alignItems="flex-start"
            boxShadow="0px 0px 10px 0px #0000001A"
            borderRadius="10"
            p={4}
            w="fit-content"
          >
            <Image src="/images/home.svg" alt="home-address" />
            <VStack alignItems="flex-start" spacing={0}>
              <Text color="#21242980" fontSize="md" fontWeight="500">
                Delivery Details
              </Text>
              <Text color="#212429" fontSize="14px" fontWeight="400">
                {order?.shipping_address}
              </Text>
              <Text color="#21242980" fontSize="sm" fontWeight="400">
                {order?.shipping_phone ?? 'N/A'}
              </Text>
            </VStack>
          </HStack>
        </>
      )}
    </VStack>
  );
};

export default SingleOrder;

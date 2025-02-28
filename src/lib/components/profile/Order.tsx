'use client';

import {
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Skeleton,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { useGetOrdersQuery } from '~/lib/redux/services/order.service';
import { useAppSelector } from '~/lib/redux/store';

import OrderItem from './OrderItem';

const Orders = () => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;
  const userId = user?.user_id;

  const { data, isLoading } = useGetOrdersQuery(userId);

  const orders = useMemo(
    () => (Array.isArray(data?.message?.body) ? data?.message?.body : []),
    [data?.message?.body]
  );

  const ongiongOrders = useMemo(
    () => orders.filter((order: any) => order.status === 'Ongoing'),
    [orders]
  );

  const deliveredOrders = useMemo(
    () => orders.filter((order: any) => order.status === 'Delivered'),
    [orders]
  );

  const cancelledOrders = useMemo(
    () => orders.filter((order: any) => order.status === 'Cancelled'),
    [orders]
  );

  const tabs = [
    {
      title: 'Ongoing',
      content:
        ongiongOrders.length > 0 ? (
          <OrderItem orders={ongiongOrders} />
        ) : (
          <VStack py={4} spacing={2}>
            <Text color="gray.500" fontSize="sm">
              No ongoing orders found
            </Text>
          </VStack>
        ),
    },
    {
      title: 'Delivered',
      content:
        deliveredOrders.length > 0 ? (
          <OrderItem orders={deliveredOrders} />
        ) : (
          <VStack py={4} spacing={2}>
            <Text color="gray.500" fontSize="sm">
              No delivered orders found
            </Text>
          </VStack>
        ),
    },
    {
      title: 'Cancelled',
      content:
        cancelledOrders.length > 0 ? (
          <OrderItem orders={cancelledOrders} />
        ) : (
          <VStack py={4} spacing={2}>
            <Text color="gray.500" fontSize="sm">
              No cancelled orders found
            </Text>
          </VStack>
        ),
    },
  ];

  return (
    <VStack alignItems="stretch" spacing={4}>
      <Text fontSize="md" fontWeight="600" color="#212429">
        My Order
      </Text>
      {isLoading ? (
        <VStack h="100%" w="100%" spacing={4}>
          <Skeleton height="100px" w="100%" borderRadius="10" mb={2} />
          <Skeleton height="100px" w="100%" borderRadius="10" mb={2} />
          <Skeleton height="100px" w="100%" borderRadius="10" mb={0} />
        </VStack>
      ) : (
        <Tabs variant="soft-rounded" size="sm" isFitted>
          <TabList>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                _selected={{
                  bg: '#E7906B',
                  borderRadius: '5px',
                  color: '#212429',
                }}
                color="#212429CC"
                fontSize="16px"
                fontWeight="500"
              >
                {tab.title}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {tabs.map((tab, index) => (
              <TabPanel key={index} px={0}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </VStack>
  );
};

export default Orders;

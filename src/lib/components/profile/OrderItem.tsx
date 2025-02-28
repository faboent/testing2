'use client';

import { VStack, Text, HStack, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import Button from '../ui/Button';
import { formatDate2, shortenText } from '~/lib/utils/formatter';

const OrderItem = ({ orders }: { orders: any }) => {
  const [image, setImage] = useState<string>('');

  const parsedImage = useMemo(() => {
    try {
      const firstImage = orders[0]?.items[0]?.image;
      return firstImage ? JSON.parse(firstImage)[0] : '';
    } catch {
      return orders[0]?.items[0]?.image || '';
    }
  }, [orders]);

  useEffect(() => {
    setImage(parsedImage);
  }, [parsedImage]);

  return (
    <VStack alignItems="stretch" spacing={4}>
      {orders.map((order: any, index: number) => (
        <VStack
          key={index}
          borderWidth={1}
          borderColor="#2124294D"
          p={4}
          borderRadius={6}
          position="relative"
        >
          <HStack w="full" justify="space-between" align="flex-start">
            <HStack spacing={2} align="flex-start">
              <Image src={image} alt="order" boxSize="89px" />
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="14px" fontWeight="500" color="#212429">
                  {shortenText(order?.items[0]?.product_name, 35)}
                </Text>
                <Text fontSize="sm" fontWeight="400" color="#21242980">
                  Order no:{' '}
                  <Text as="span" color="#212429">
                    #{order?.order_id}
                  </Text>
                </Text>

                <Text fontSize="sm" fontWeight="400" color="#21242980">
                  Delivery address:{' '}
                  <Text as="span" color="#212429">
                    {order?.shipping_address}
                  </Text>
                </Text>

                <Text fontSize="sm" fontWeight="400" color="#21242980">
                  Quantity:{' '}
                  <Text as="span" color="#212429">
                    {order.items.reduce(
                      (acc: number, item: any) => acc + item.quantity,
                      0
                    )}
                  </Text>
                </Text>

                <Text fontSize="sm" fontWeight="400" color="#21242980">
                  Total orders:{' '}
                  <Text as="span" color="#212429">
                    {order?.items?.length}
                  </Text>
                </Text>

                <Text fontSize="sm" fontWeight="400" color="#21242980">
                  Date-Time:{' '}
                  <Text as="span" color="#212429">
                    {formatDate2(order?.creation)}
                  </Text>
                </Text>
              </VStack>
            </HStack>

            <VStack align="flex-start">
              <Link href={`/profile/orders/${order?.order_id}`}>
                <Button
                  text="Track Order"
                  size="xs"
                  fontSize={12}
                  width="auto"
                  bg="brand.100"
                />
              </Link>
            </VStack>
          </HStack>
        </VStack>
      ))}
    </VStack>
  );
};

export default OrderItem;

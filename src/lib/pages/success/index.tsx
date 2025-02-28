'use client';

import {
  VStack,
  Grid,
  GridItem,
  Box,
  Image,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';

import Layout from '~/lib/components/layout';
import AlsoViewed from '~/lib/components/product/AlsoViewed';
import ProductCard from '~/lib/components/product/ProductCard';
import Button from '~/lib/components/ui/Button';
import { useGetProuctsQuery } from '~/lib/redux/services/product.service';

const CheckoutContent = () => {
  const router = useRouter() as any;
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { data: productsData, isLoading } = useGetProuctsQuery('');
  const allProducts = useMemo(
    () => productsData?.message?.body ?? [],
    [productsData]
  );

  return (
    <Layout>
      <VStack mt={10} w="100%">
        <Image
          src="/images/banner7.svg"
          alt="banner7"
          width="100%"
          height="auto"
          borderRadius={16}
        />
      </VStack>
      <Box
        w="100%"
        h="100%"
        bg="white"
        borderRadius={8}
        boxShadow="5px"
        p={4}
        mt={5}
      >
        <VStack w="100%" spacing={5}>
          <VStack w="100%" spacing={5}>
            <Image
              src="/images/gif.svg"
              alt="success"
              width="300px"
              height="305px"
            />
            <VStack spacing={0}>
              <Text fontSize="2xl" fontWeight="600">
                Success!
              </Text>
              <Text
                color="#101010"
                fontSize="14px"
                fontWeight="400"
                textAlign="center"
              >
                Your order{' '}
                <Text as="span" color="brand.100">
                  #{orderId}
                </Text>{' '}
                will be delivered soon.
                <br /> Thank you for choosing 3XG!
              </Text>
            </VStack>

            <VStack w={['100%', '50%']}>
              <Button
                text="Continue Shopping"
                bg="white"
                border="brand.100"
                color="brand.100"
                variant="outline"
                onClick={() => router.push('/')}
              />
              {/* <Button
                text="Veiw Receipt"
                bg="white"
                border="brand.100"
                color="brand.100"
                variant="outline"
              /> */}
              <Button
                text="Track"
                bg="brand.100"
                onClick={() => router.push('/profile?activeMenu=orders')}
              />
            </VStack>
          </VStack>
        </VStack>
      </Box>

      {isLoading ? (
        <VStack mt={5} w="100%">
          <Skeleton height="35px" w="100%" borderRadius="10" />
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
            {[1, 2, 3, 4, 5].map((item, index) => (
              <GridItem key={index}>
                <Skeleton height={['130px', '250px']} borderRadius="16" />
              </GridItem>
            ))}
          </Grid>
        </VStack>
      ) : (
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
            {allProducts
              .slice(0, Math.min(allProducts.length, 5))
              .map((item: any, index: any) => (
                <GridItem key={index}>
                  <ProductCard item={item} />
                </GridItem>
              ))}
          </Grid>
        </VStack>
      )}
    </Layout>
  );
};

const Checkout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;

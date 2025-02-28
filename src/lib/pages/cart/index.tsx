'use client';

import { VStack, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { useMemo } from 'react';

import CartDetail from '~/lib/components/cart/CartDetail';
import Layout from '~/lib/components/layout';
import AlsoViewed from '~/lib/components/product/AlsoViewed';
import ProductCard from '~/lib/components/product/ProductCard';
import { useGetCartQuery } from '~/lib/redux/services/cart.service';
import { useGetProuctsQuery } from '~/lib/redux/services/product.service';
import { useAppSelector } from '~/lib/redux/store';
// import { cartItems } from '~/lib/utils/constants';

const Checkout = () => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;

  const { data: productsData, isLoading } = useGetProuctsQuery('');
  const allProducts = useMemo(
    () => productsData?.message?.body ?? [],
    [productsData]
  );

  const { data: cartData, isLoading: cartIsLoading } = useGetCartQuery(
    user?.user_id
  );
  // const cartItems = useMemo(() => cartData?.message?.body ?? [], [cartData]);
  const cartItems = useMemo(
    () => (Array.isArray(cartData?.message.body) ? cartData.message.body : []),
    [cartData]
  );
  console.log(cartItems, 'cartItems');

  return (
    <Layout showNavMenu>
      <CartDetail
        cartItems={cartItems}
        isLoading={isLoading || cartIsLoading}
      />

      {isLoading || cartIsLoading ? (
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
        <>
          <VStack mt={5} w="100%">
            <AlsoViewed name="My Wislist" />

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

          <VStack mt={5} w="100%">
            <AlsoViewed name="Explore related Items" />

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

          <VStack mt={5} w="100%">
            <AlsoViewed name="Limited Deals" />

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
        </>
      )}
    </Layout>
  );
};

export default Checkout;

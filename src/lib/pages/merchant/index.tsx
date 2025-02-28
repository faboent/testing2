'use client';

import { VStack, Grid, GridItem, Skeleton, Image } from '@chakra-ui/react';
import { useMemo } from 'react';

import Layout from '~/lib/components/layout';
import AlsoViewed from '~/lib/components/product/AlsoViewed';
import ProductCard from '~/lib/components/product/ProductCard';
import RatingCard from '~/lib/components/product/RatingCard';
import { useGetProuctsQuery } from '~/lib/redux/services/product.service';
import { merchantRatingData } from '~/lib/utils/constants';

const Checkout = () => {
  const { data: productsData, isLoading } = useGetProuctsQuery('');
  const allProducts = useMemo(
    () => productsData?.message?.body ?? [],
    [productsData]
  );

  return (
    <Layout showNavMenu>
      <VStack mt={10} w="100%">
        <Image
          src="/images/merchant-banner.svg"
          alt="banner7"
          width="100%"
          height="auto"
          borderRadius={16}
        />
      </VStack>

      <VStack mt={5} w="100%">
        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(5, 1fr)',
          ]}
          gap={2}
          w="100%"
          mt={2}
        >
          {merchantRatingData.map((item, index) => (
            <GridItem key={index}>
              <RatingCard item={item} />
            </GridItem>
          ))}
        </Grid>
      </VStack>

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

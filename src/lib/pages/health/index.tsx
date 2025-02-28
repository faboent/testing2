'use client';

import { VStack, Grid, GridItem, Image, Skeleton } from '@chakra-ui/react';
import { useMemo } from 'react';

import Brands from '~/lib/components/banner/Brands';
import ShopBanner from '~/lib/components/banner/ShopBanner';
import CategoryCard from '~/lib/components/categories/CategoryCard';
import Layout from '~/lib/components/layout';
import MoreTab from '~/lib/components/product/MoreTab';
import MoreTabCategory from '~/lib/components/product/MoreTabCategory';
import ProductCard from '~/lib/components/product/ProductCard';
import { useGetProuctsQuery } from '~/lib/redux/services/product.service';
import { categories } from '~/lib/utils/constants';

const Bulk = () => {
  const { data: productsData, isLoading } = useGetProuctsQuery('');

  const allProducts = useMemo(() => {
    console.log('Raw productsData:', productsData);
    console.log('Message body:', productsData?.message?.body);
    const products = productsData?.message?.body ?? [];
    console.log('Final allProducts:', products);
    return products;
  }, [productsData]);

  return (
    <Layout>
      <ShopBanner isLoading={isLoading} />

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
            <MoreTab name="Smartphones" slug="" />

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
              {allProducts?.slice(0, 10)?.map((item: any, index: any) => (
                <GridItem key={index}>
                  <ProductCard item={item} />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTab name="Accessories" slug="" />

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
              {allProducts?.slice(0, 10)?.map((item: any, index: any) => (
                <GridItem key={index}>
                  <ProductCard item={item} />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTabCategory name="Categories" />

            <Grid
              templateColumns={[
                'repeat(2, 1fr)',
                'repeat(4, 1fr)',
                'repeat(4, 1fr)',
              ]}
              gap={5}
              w="100%"
              mt={2}
            >
              {categories?.slice(0, 10)?.map((item, index) => (
                <GridItem key={index}>
                  <CategoryCard item={item} />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTabCategory name="Brands" />

            <Brands />
          </VStack>

          <VStack mt={10} w="100%">
            <Image
              src="/images/banner7.svg"
              alt="banner7"
              width="100%"
              height="auto"
              borderRadius={16}
            />
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTab name="Home Appliances" slug="" />

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
              {allProducts?.slice(0, 10)?.map((item: any, index: any) => (
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

export default Bulk;

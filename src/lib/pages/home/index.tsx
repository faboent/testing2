'use client';

import { VStack, Grid, GridItem, Image, Skeleton } from '@chakra-ui/react';
import BannerE from '~/lib/components/banner/BannerE';

import Brands from '~/lib/components/banner/Brands';
import ShopBanner from '~/lib/components/banner/ShopBanner';
import ShopDoubleBanner from '~/lib/components/banner/ShopDoubleBanner';
import CategorySlider from '~/lib/components/categories/CategorySlider';
import Layout from '~/lib/components/layout';
import MoreTab from '~/lib/components/product/MoreTab';
import MoreTabCategory from '~/lib/components/product/MoreTabCategory';
import ProductCard from '~/lib/components/product/ProductCard';
import { useProductsByCategory } from '~/lib/hooks/useProductsByCategory';
import { useGetCategoriesQuery } from '~/lib/redux/services/product.service';

const Home = () => {
  const {
    computing,
    electronics,
    gaming,
    musical,
    officeElectronics,
    phonesAndTablets,
    wearables,
    isLoading: productsByCategoryLoading,
  } = useProductsByCategory();

  const { data, isLoading } = useGetCategoriesQuery('');
  console.log(data, 'data');

  return (
    <Layout>
      <ShopBanner isLoading={productsByCategoryLoading || isLoading} />
      <ShopDoubleBanner isLoading={productsByCategoryLoading || isLoading} />

      {productsByCategoryLoading || isLoading ? (
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
            {[1, 2, 3, 4, 5].map((_, index) => (
              <GridItem key={index}>
                <Skeleton height={['130px', '250px']} borderRadius="16" />
              </GridItem>
            ))}
          </Grid>
        </VStack>
      ) : (
        <>
          {computing.length > 0 && (
            <VStack mt={5} w="100%">
              <MoreTab name="Computing" slug="computing" />
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
                {computing?.slice(0, 10)?.map((item: any, index: any) => (
                  <GridItem key={index}>
                    <ProductCard item={item} />
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          )}

          {electronics.length > 0 && (
            <VStack mt={5} w="100%">
              <MoreTab name="Electronics" slug="electronics" />

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
                {electronics?.slice(0, 10)?.map((item: any, index: any) => (
                  <GridItem key={index}>
                    <ProductCard item={item} />
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          )}

          {gaming.length > 0 && (
            <VStack mt={5} w="100%">
              <MoreTab name="Gaming" slug="gaming" />

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
                {gaming?.slice(0, 10)?.map((item: any, index: any) => (
                  <GridItem key={index}>
                    <ProductCard item={item} />
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          )}

          {phonesAndTablets.length > 0 && (
            <VStack mt={5} w="100%">
              <MoreTab name="Phones & Tablets" slug="phones-tablets" />

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
                {phonesAndTablets
                  ?.slice(0, 10)
                  ?.map((item: any, index: any) => (
                    <GridItem key={index}>
                      <ProductCard item={item} />
                    </GridItem>
                  ))}
              </Grid>
            </VStack>
          )}

          <VStack mt={5} w="100%">
            <MoreTabCategory name="Categories" />
            <CategorySlider />
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTabCategory name="Brands" />
            <Brands />
          </VStack>

          <VStack mt={5} w="100%">
            <BannerE />
          </VStack>

          {officeElectronics.length > 0 && (
            <VStack mt={5} w="100%">
              <MoreTab name="Office Electronics" slug="office-electronics" />

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
                {officeElectronics
                  ?.slice(0, 10)
                  ?.map((item: any, index: any) => (
                    <GridItem key={index}>
                      <ProductCard item={item} />
                    </GridItem>
                  ))}
              </Grid>
            </VStack>
          )}

          {wearables.length > 0 && (
            <VStack mt={5} w="100%">
              <MoreTab name="Wearables" slug="wearables" />

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
                {wearables?.slice(0, 10)?.map((item: any, index: any) => (
                  <GridItem key={index}>
                    <ProductCard item={item} />
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          )}

          {musical.length > 0 && (
            <VStack mt={5} w="100%">
              <MoreTab name="Musical" slug="musical" />

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
                {musical?.slice(0, 10)?.map((item: any, index: any) => (
                  <GridItem key={index}>
                    <ProductCard item={item} />
                  </GridItem>
                ))}
              </Grid>
            </VStack>
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;

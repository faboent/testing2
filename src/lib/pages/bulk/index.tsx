'use client';

import { VStack, Grid, GridItem, Image, Skeleton } from '@chakra-ui/react';

import BulkBanner from '~/lib/components/banner/BulkBanner';
import Layout from '~/lib/components/layout';
import MoreTabBulk from '~/lib/components/product/MoreTabBulk';
import ProductCard3 from '~/lib/components/product/ProductCard3';
import { productsBulk } from '~/lib/utils/constants';

const Bulk = () => {
  const isLoading = false;
  const bulkBanners = [
    '/images/bulk1.svg',
    '/images/bulk2.svg',
    '/images/bulk3.svg',
  ];

  return (
    <Layout>
      <BulkBanner />

      <VStack mt={0} w="100%">
        <Grid
          templateColumns={[
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={5}
          w="100%"
          mt={2}
        >
          {bulkBanners.map((item, index) => (
            <GridItem key={index}>
              <Image
                src={item}
                alt={`deal${index + 1}`}
                width="100%"
                height="auto"
                borderRadius={5}
              />
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
            <MoreTabBulk name="Smartphones" />

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
              {productsBulk?.slice(0, 10)?.map((item: any, index: any) => (
                <GridItem key={index}>
                  <ProductCard3 item={item} />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTabBulk name="Accessories" />

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
              {productsBulk?.slice(0, 10)?.map((item: any, index: any) => (
                <GridItem key={index}>
                  <ProductCard3 item={item} />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTabBulk name="Home Appliances" />

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
              {productsBulk?.slice(0, 10)?.map((item: any, index: any) => (
                <GridItem key={index}>
                  <ProductCard3 item={item} />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTabBulk name="Home Appliances" />

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
              {productsBulk?.slice(0, 10)?.map((item: any, index: any) => (
                <GridItem key={index}>
                  <ProductCard3 item={item} />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          <VStack mt={5} w="100%">
            <MoreTabBulk name="Home Appliances" />

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
              {productsBulk?.slice(0, 10)?.map((item: any, index: any) => (
                <GridItem key={index}>
                  <ProductCard3 item={item} />
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

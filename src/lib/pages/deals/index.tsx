import { VStack, Grid, GridItem, Image } from '@chakra-ui/react';

import DealBanner from '~/lib/components/banner/DealBanner';
import Layout from '~/lib/components/layout';
import MoreTab2 from '~/lib/components/product/MoreTab2';
import ProductCard2 from '~/lib/components/product/ProductCard2';
import { products } from '~/lib/utils/constants';

const Deals = () => {
  const deals = [
    '/images/deal1.svg',
    '/images/deal2.svg',
    '/images/deal3.svg',
    '/images/deal4.svg',
    '/images/deal2.svg',
    '/images/deal1.svg',
  ];
  return (
    <Layout>
      <DealBanner />

      <VStack mt={0} w="100%">
        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
            'repeat(6, 1fr)',
          ]}
          gap={5}
          w="100%"
          mt={2}
        >
          {deals.map((item, index) => (
            <GridItem key={index}>
              <Image
                src={item}
                alt={`deal${index + 1}`}
                width="100%"
                height="auto"
                borderRadius={16}
              />
            </GridItem>
          ))}
        </Grid>
      </VStack>

      <VStack mt={5} w="100%">
        <MoreTab2 name="Trending" />

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
          {products.map((item, index) => (
            <GridItem key={index}>
              <ProductCard2 item={item} />
            </GridItem>
          ))}
        </Grid>
      </VStack>

      <VStack mt={5} w="100%">
        <MoreTab2 name="Hot Service" />

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
          {products.map((item, index) => (
            <GridItem key={index}>
              <ProductCard2 item={item} />
            </GridItem>
          ))}
        </Grid>
      </VStack>

      <VStack mt={5} w="100%">
        <MoreTab2 name="Hot Product" />

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
          {products.map((item, index) => (
            <GridItem key={index}>
              <ProductCard2 item={item} />
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Layout>
  );
};

export default Deals;

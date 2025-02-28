import { Image, Grid, GridItem, Skeleton, Box } from '@chakra-ui/react';

const ShopDoubleBanner = ({ isLoading }: any) => {
  return (
    <>
      {isLoading ? (
        <Grid
          templateColumns={{
            base: '1fr 1fr',
            md: '1fr 1fr',
          }}
          gap={2}
          mt={5}
        >
          <GridItem>
            <Skeleton height={['130px', '250px']} />
          </GridItem>
          <GridItem>
            <Skeleton height={['130px', '250px']} />
          </GridItem>
        </Grid>
      ) : (
        <Grid
          templateColumns={{
            base: '1fr 1fr',
            md: '1fr 1fr',
          }}
          gap={2}
          mt={5}
        >
          <GridItem>
            <Image src="/images/banner4.svg" alt="Banner" borderRadius="5" />
          </GridItem>
          <GridItem>
            <Image src="/images/banner5.svg" alt="Banner" borderRadius="5" />
          </GridItem>
        </Grid>
      )}
      <Box />
    </>
  );
};

export default ShopDoubleBanner;

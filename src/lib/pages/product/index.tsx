'use client';

import {
  Grid,
  GridItem,
  Box,
  Image,
  HStack,
  VStack,
  Text,
  Badge,
  Button as ChakraButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Avatar,
  Stack,
  Checkbox,
  CheckboxGroup,
  Skeleton,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ReactStars from 'react-stars';

import Layout from '~/lib/components/layout';
import AlsoViewed from '~/lib/components/product/AlsoViewed';
import ProductCard from '~/lib/components/product/ProductCard';
import ProductDetail from '~/lib/components/product/ProductDetail';
import {
  useGetAllProductsQuery,
  useGetProductQuery,
} from '~/lib/redux/services/product.service';

const Product = () => {
  const { productId } = useParams();
  const [visibleStart, setVisibleStart] = useState(0);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [selectedColor, setSelectedColor] = useState('');
  const visibleCount = 5;

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  const { data: productsData, isLoading } = useGetAllProductsQuery('');
  const allProducts = useMemo(
    () => productsData?.data ?? [],
    [productsData]
  );

  const { data: productData, isLoading: isProductLoading } =
    useGetProductQuery(productId);

  const product = useMemo(
    () => productData?.data ?? {},
    [productData]
  );

  const parsedImages = useMemo(() => {
    return product?.images?.map((img: { url: string }) => img.url) ?? [];
  }, [product?.images]);

  useEffect(() => {
    setImages(parsedImages);
  }, [parsedImages]);

  const handleScrollUp = () => {
    setVisibleStart((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollDown = () => {
    setVisibleStart((prev) => Math.min(prev + 1, images.length - visibleCount));
  };

  const visibleImages = images.slice(visibleStart, visibleStart + visibleCount);

  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };

  return (
    <Layout showNavMenu>
      <ProductDetail
        product={product}
        images={images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        visibleImages={visibleImages}
        handleScrollUp={handleScrollUp}
        handleScrollDown={handleScrollDown}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        visibleStart={visibleStart}
        visibleCount={visibleCount}
        isLoading={isProductLoading || isLoading}
      />

      {isLoading || isProductLoading ? (
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
          <Box
            w="100%"
            h="100%"
            bg="white"
            borderRadius={8}
            boxShadow="5px"
            p={4}
          >
            <Tabs isFitted>
              <TabList
                display="flex"
                justifyContent="space-around"
                w="100%"
                borderBottomWidth={1}
                borderBottomColor="#F0F0F0"
              >
                <Tab
                  _selected={{
                    color: 'brand.100',
                    borderBottomColor: 'brand.100',
                  }}
                  fontSize={['14px', 'xl']}
                  fontWeight="500"
                  color="#212429"
                >
                  Description
                </Tab>
                <Tab
                  _selected={{
                    color: 'brand.100',
                    borderBottomColor: 'brand.100',
                  }}
                  fontSize={['14px', 'xl']}
                  fontWeight="500"
                  color="#212429"
                >
                  Specification
                </Tab>
                <Tab
                  _selected={{
                    color: 'brand.100',
                    borderBottomColor: 'brand.100',
                  }}
                  fontSize={['14px', 'xl']}
                  fontWeight="500"
                  color="#212429"
                >
                  Warranty
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Text
                    fontSize="md"
                    color="#212429"
                    fontWeight="400"
                    textAlign="justify"
                    lineHeight="8"
                  >
                    {product?.description}
                  </Text>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={2} alignItems="flex-start">
                    {product?.specification?.map((spec: any, index: any) => (
                      <Text
                        key={index}
                        fontSize="14px"
                        color="#212429"
                        fontWeight="600"
                      >
                        {spec.key}: &nbsp;
                        <Text
                          as="span"
                          fontSize="14px"
                          color="#212429"
                          fontWeight="400"
                        >
                          {spec.value}
                        </Text>
                      </Text>
                    ))}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <Text
                    fontSize="md"
                    color="#212429"
                    fontWeight="400"
                    textAlign="justify"
                    lineHeight="8"
                  >
                    {product?.warranty}
                  </Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <VStack mt={5} w="100%">
            <AlsoViewed name="Customer who viewed this also viewed" />

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

          <Box
            w="100%"
            h="100%"
            bg="white"
            borderRadius={8}
            boxShadow="5px"
            p={4}
            mt={5}
          >
            <HStack>
              <Text
                fontSize={['14px', 'lg', 'xl']}
                color="#212429"
                fontWeight="600"
                style={{
                  textWrap: 'nowrap',
                }}
              >
                Product Reviews
              </Text>
              <Badge
                bg="#34A85380"
                color="#343434"
                fontSize="12px"
                fontWeight="400"
                px={2}
                borderRadius="5px"
              >
                All from verified purchases
              </Badge>
            </HStack>

            <Grid
              templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
                lg: 'repeat(4, 1fr)',
              }}
              gap={6}
              h="100%"
            >
              <GridItem colSpan={{ sm: 0, md: 1, lg: 1 }} h="100%" w="100%">
                <Box
                  w="100%"
                  h="100%"
                  bg="white"
                  borderRadius={8}
                  p={4}
                  borderWidth={1}
                  borderColor="#A3A3A333"
                >
                  <Text
                    fontSize={['md', 'lg']}
                    color="#212429"
                    fontWeight="600"
                  >
                    Review Filter
                  </Text>

                  <CheckboxGroup colorScheme="orange" defaultValue={['1', '2']}>
                    <Stack spacing={2} direction="column" mt={2}>
                      {[5, 4, 3, 2, 1].map((rating, index) => (
                        <Checkbox value={rating.toString()} key={index}>
                          <HStack spacing={1}>
                            <Text
                              color="#212429"
                              fontSize="14px"
                              fontWeight="500"
                            >
                              {rating}
                            </Text>
                            <Image src="/images/star2.svg" />
                          </HStack>
                        </Checkbox>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                </Box>
              </GridItem>

              <GridItem colSpan={{ sm: 1, md: 1, lg: 3 }} h="100%" w="100%">
                <Box
                  w="100%"
                  h="100%"
                  bg="white"
                  borderRadius={8}
                  boxShadow="5px"
                  p={4}
                >
                  <Text
                    fontSize={['md', 'lg']}
                    color="#212429"
                    fontWeight="600"
                  >
                    Review Lists
                  </Text>

                  <VStack alignItems="flex-start" spacing={0}>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={20}
                      color2="#FFA439"
                      value={4}
                      edit={false}
                    />
                    <Text
                      fontSize={['md', '18px']}
                      color="#212429"
                      fontWeight="400"
                      textAlign="justify"
                    >
                      {/* {product?.reviews[0]?.review} */}
                    </Text>
                    <Text
                      fontSize="14px"
                      color="#21242980"
                      fontWeight="400"
                      textAlign="justify"
                    >
                      {/* {formatTime(product?.reviews[0]?.createdAt)} */}
                    </Text>
                    <HStack
                      w="full"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <HStack>
                        <Avatar
                          size="sm"
                          // name={product.reviews[0].name}
                          bg="brand.100"
                          color="red.100"
                        />
                        <Text
                          fontSize={['14px', 'md']}
                          color="#212429"
                          fontWeight="400"
                        >
                          {/* {product.reviews[0].name} */}
                        </Text>
                      </HStack>

                      <Stack direction="row" spacing={4}>
                        <ChakraButton
                          leftIcon={<Image src="/images/like.svg" />}
                          variant="outline"
                          borderRadius="5px"
                          borderColor="#E4E9EE"
                          size="sm"
                        >
                          128
                        </ChakraButton>
                        <ChakraButton
                          leftIcon={<Image src="/images/unlike.svg" />}
                          variant="outline"
                          borderRadius="5px"
                          borderColor="#E4E9EE"
                          size="sm"
                        >
                          0
                        </ChakraButton>
                      </Stack>
                    </HStack>

                    <VStack>
                      <ChakraButton variant="link" color="brand.100" size="sm">
                        See more...
                      </ChakraButton>
                    </VStack>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </Box>

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

          <VStack mt={5} w="100%">
            <AlsoViewed name="You may also like" />

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

export default Product;

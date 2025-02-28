/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Button as ChakraButton,
  Skeleton,
  Box,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import WarrantyThirdParty from '../modals/WarrantyThirdParty';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input2 from '~/lib/components/ui/Input2';
import {
  useGetClaimedWarrantyQuery,
  useGetActiveWarrantyQuery,
  useGetExpiredWarrantyQuery,
} from '~/lib/redux/services/warranty.service';
import { useAppSelector } from '~/lib/redux/store';

import ClaimWarranty from './ClaimWarranty';
import WarrantyItem from './WarrantyItem';

const Warranty = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;
  const userId = user?.user_id;

  const [isOpen, setIsOpen] = useState(false);
  const [imei, setImei] = useState('');
  const [selectedWarrantyObject, setSelectedWarrantyObject] =
    useState<any>(null);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleClaimWarranty = () => {
    const newParams = new URLSearchParams(searchParams as any);
    newParams.set('isClaim', 'true');
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  const handleCancel = () => {
    const newParams = new URLSearchParams(searchParams as any);
    newParams.delete('isClaim');
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  const isClaimMode = searchParams.get('isClaim') === 'true';

  const { data: activeWarranty, isLoading: isActiveWarrantyLoading } =
    useGetActiveWarrantyQuery(userId);
  const activeWarrantyData = useMemo(() => {
    return activeWarranty?.message?.body ?? [];
  }, [activeWarranty]);

  const { data: claimedWarranty, isLoading: isClaimedWarrantyLoading } =
    useGetClaimedWarrantyQuery(userId);
  const claimedWarrantyData = useMemo(() => {
    return (
      claimedWarranty?.message?.body?.data ??
      claimedWarranty?.message?.body ??
      []
    );
  }, [claimedWarranty]);

  const { data: expiredWarranty, isLoading: isExpiredWarrantyLoading } =
    useGetExpiredWarrantyQuery(userId);
  const expiredWarrantyData = useMemo(() => {
    return expiredWarranty?.message?.body?.data ?? [];
  }, [expiredWarranty]);

  const tabs = [
    {
      title: 'Active',
      content: (
        <>
          {activeWarrantyData.length > 0 ? (
            activeWarrantyData.map((item: any) => (
              <WarrantyItem key={item.id} warranty={item} />
            ))
          ) : (
            <VStack py={4} spacing={2}>
              <Text color="gray.500" fontSize="sm">
                No active warranties found
              </Text>
            </VStack>
          )}
        </>
      ),
    },
    {
      title: 'Claimed',
      content: (
        <>
          {claimedWarrantyData.length > 0 ? (
            claimedWarrantyData.map((item: any) => (
              <WarrantyItem key={item.id} warranty={item} />
            ))
          ) : (
            <VStack py={4} spacing={2}>
              <Text color="gray.500" fontSize="sm">
                No claimed warranties found
              </Text>
            </VStack>
          )}
        </>
      ),
    },
    {
      title: 'Expired',
      content: (
        <>
          {expiredWarrantyData.length > 0 ? (
            expiredWarrantyData.map((item: any) => (
              <WarrantyItem key={item.id} warranty={item} />
            ))
          ) : (
            <VStack py={4} spacing={2}>
              <Text color="gray.500" fontSize="sm">
                No expired warranties found
              </Text>
            </VStack>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {isActiveWarrantyLoading ||
      isClaimedWarrantyLoading ||
      isExpiredWarrantyLoading ? (
        <VStack h="100%" w="100%" spacing={4}>
          <Skeleton height="150px" w="100%" borderRadius="10" mb={2} />
          <Skeleton height="150px" w="100%" borderRadius="10" mb={2} />
          <Skeleton height="150px" w="100%" borderRadius="10" mb={0} />
        </VStack>
      ) : (
        <>
          {!isClaimMode && (
            <VStack spacing={4} alignItems="center" w="full">
              <VStack
                spacing={2}
                alignItems="stretch"
                w="full"
                bg="brand.100"
                p="4"
                borderRadius="10px"
                display="none"
              >
                <Formik
                  initialValues={{
                    imei: '',
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                    onOpen();
                  }}
                >
                  {(props) => (
                    <Form style={{ width: '100%' }}>
                      <Text
                        fontSize="14PX"
                        fontWeight="500"
                        color="white"
                        mb="2"
                      >
                        INPUT IMEI DIGITS HERE
                      </Text>
                      <HStack spacing={2} w="full" alignItems="center">
                        <Input2
                          name="imei"
                          type="number"
                          bg="white"
                          borderWidth={0}
                          labelFontSize={12}
                          labelColor="#FFFFFF"
                          onChange={(e) => setImei(e.target.value)}
                        />
                        <ChakraButton
                          bg="white"
                          color="#DDDDDD"
                          borderRadius="3px"
                          fontSize="12px"
                          fontWeight="500"
                          w="100px"
                          _hover={{
                            bg: 'white',
                            color: 'brand.100',
                          }}
                          type="submit"
                          isDisabled={!imei}
                        >
                          Enter
                        </ChakraButton>
                      </HStack>
                    </Form>
                  )}
                </Formik>
              </VStack>

              <VStack spacing={2} alignItems="stretch" w="full">
                <Text fontSize="sm" fontWeight="500" color="#21242980">
                  Warranty Status
                </Text>
                <Tabs
                  variant="unstyled"
                  size="sm"
                  isFitted
                  border="1px solid #E5E5E5"
                  borderRadius="10px"
                  p="4"
                >
                  <TabList>
                    {tabs.map((tab, index) => (
                      <Tab
                        key={index}
                        _selected={{
                          bg: '#E7906B',
                          borderRadius: '5px',
                          color: '#212429',
                        }}
                        color="#212429CC"
                        fontSize="16px"
                        fontWeight="500"
                      >
                        {tab.title}
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {tabs.map((tab, index) => (
                      <TabPanel key={index} px={0}>
                        {tab.content}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              </VStack>

              <VStack spacing={2} alignItems="stretch" w="full">
                <Text fontSize="sm" fontWeight="500" color="#21242980">
                  Warranty info
                </Text>

                <VStack border="1px solid #E5E5E5" borderRadius="10px" p="4">
                  <Text fontSize="sm" fontWeight="600" color="#212429">
                    Warranty Coverage
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="400"
                    color="#212429"
                    textAlign="center"
                    w={['full', '60%']}
                  >
                    Your device is eligible to 1 year warranty with free pickup
                    and delivery service for factory faults only not user damage
                    such as:
                    <Text fontSize="sm" fontWeight="400" color="brand.100">
                      liquid, damaged screen or any form of physical damaged
                    </Text>
                  </Text>
                </VStack>
              </VStack>

              <VStack spacing={2} alignItems="stretch" w="full">
                <VStack border="1px solid #E5E5E5" borderRadius="10px" p="4">
                  <Text fontSize="sm" fontWeight="600" color="#212429">
                    How it works?
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="400"
                    color="#212429"
                    textAlign="center"
                    w={['full', '60%']}
                  >
                    Kindly tap on the “Claim warranty” button below if they is a
                    factory default on your device within the warrant coverage
                    period identifying the default issue with a pick up
                    date,time and location... You will get a feedback from us in
                    no time.
                  </Text>
                </VStack>
              </VStack>

              <HStack w={['full', '50%']}>
                <Button
                  text="Claim warranty"
                  bg="brand.100"
                  size="sm"
                  onClick={onOpen}
                />
              </HStack>

              <Modal
                isOpen={isOpen}
                onClose={onClose}
                title=""
                size="md"
                body={
                  <WarrantyThirdParty
                    onClose={onClose}
                    imei={imei}
                    handleClaimWarranty={handleClaimWarranty}
                    setSelectedWarrantyObject={setSelectedWarrantyObject}
                    selectedWarrantyObject={selectedWarrantyObject}
                    warranties={activeWarrantyData}
                    userId={userId}
                  />
                }
              />
            </VStack>
          )}
          {isClaimMode && (
            <ClaimWarranty
              handleCancel={handleCancel}
              selectedWarrantyObject={selectedWarrantyObject}
            />
          )}
        </>
      )}
      <Box />
    </>
  );
};

export default Warranty;

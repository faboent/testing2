/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { AddIcon } from '@chakra-ui/icons';
import {
  VStack,
  Grid,
  Box,
  Image,
  Text,
  HStack,
  IconButton,
  Skeleton,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useMemo, useState } from 'react';

import AddressModal from '../modals/AddressModal';
import Modal from '../ui/Modal';
import Button from '~/lib/components/ui/Button';
import Input2 from '~/lib/components/ui/Input2';
import {
  useGetProfileQuery,
  useUpdateprofileMutation,
  useGetShippingAddressQuery,
  useDeleteShippingAddressMutation,
} from '~/lib/redux/services/account.service';
import { useAppSelector } from '~/lib/redux/store';

const PersonalInfo = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'create' | 'update'>('create');
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const { userInfo } = useAppSelector((state) => state.app.auth);
  const userId = userInfo?.user?.user_id;

  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateprofileMutation();

  const [deleteShippingAddress, { isLoading: deleteShippingAddressLoading }] =
    useDeleteShippingAddressMutation();

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery('');

  const profileData = useMemo(() => profile?.data ?? {}, [profile]);
  const { data: shippingAddress, isLoading: shippingAddressLoading } =
    useGetShippingAddressQuery(userId);
  const shippingAddressData = useMemo(
    () => shippingAddress?.data ?? [],
    [shippingAddress]
  );

  const onClose = () => setIsOpen(false);
  const onOpen = (type: 'create' | 'update', address?: any) => {
    setType(type);
    setSelectedAddress(address);
    setIsOpen(true);
  };

  const handleUpdateProfile = async (values: any) => {
    await updateProfile({
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone.toString(),
    })
      .unwrap()
      .then(() => {
        toast({
          title: 'Profile updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch((error: any) => {
        toast({
          title: error?.data?.message ?? 'Profile update failed',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  const handleDeleteShippingAddress = async (shippingId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      await deleteShippingAddress({ userId, shippingId })
        .unwrap()
        .then(() => {
          toast({
            title: 'Address deleted successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        })
        .catch((error) => {
          toast({
            title: error?.data?.message ?? 'An error occurred',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        });
    }
  };

  return (
    <>
      {profileLoading || shippingAddressLoading ? (
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={4}
          h="100%"
        >
          <GridItem colSpan={{ base: 1, md: 1 }} h="100%" w="100%">
            <Skeleton height="400px" w="100%" borderRadius="10" />
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 1 }} h="100%" w="100%">
            <Skeleton height="400px" mb={2} borderRadius="8" />
          </GridItem>
        </Grid>
      ) : (
        <VStack alignItems="stretch" spacing={4}>
          <Text fontSize="md" fontWeight="600" color="#212429">
            Account Information
          </Text>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <Box>
              <VStack
                borderWidth={1}
                borderColor="#2124294D"
                p={4}
                borderRadius={6}
              >
                <Formik
                  initialValues={{
                    username: profileData.username ?? '',
                    email: profileData.email ?? '',
                    first_name: profileData.first_name ?? '',
                    last_name: profileData.last_name ?? '',
                    phone: profileData.phone ?? '',
                  }}
                  onSubmit={(values) => {
                    handleUpdateProfile(values);
                  }}
                >
                  {(props) => (
                    <Form style={{ width: '100%' }}>
                      <VStack spacing={4} w="full" align="stretch" mt={2}>
                        <Text fontSize="md" fontWeight="500" color="#212429">
                          Personal Information
                        </Text>
                        <VStack spacing={2} w="full" align="stretch">
                          <Input2
                            label="Username"
                            name="username"
                            type="text"
                            bg="white"
                            borderWidth={1}
                            borderColor="#2124294D"
                            labelFontSize={12}
                            readOnly
                          />
                          <Input2
                            label="First Name"
                            name="first_name"
                            type="text"
                            bg="white"
                            borderWidth={1}
                            borderColor="#2124294D"
                            labelFontSize={12}
                          />
                          <Input2
                            label="Last Name"
                            name="last_name"
                            type="text"
                            bg="white"
                            borderWidth={1}
                            borderColor="#2124294D"
                            labelFontSize={12}
                          />
                          <Input2
                            label="Email"
                            name="email"
                            type="text"
                            bg="white"
                            borderWidth={1}
                            borderColor="#2124294D"
                            labelFontSize={12}
                            readOnly
                          />
                          <Input2
                            label="Phone Number"
                            name="phone"
                            type="number"
                            bg="white"
                            borderWidth={1}
                            borderColor="#2124294D"
                            labelFontSize={12}
                            maxLength={11}
                          />
                        </VStack>

                        <VStack align="stretch" w="100%" mt={6}>
                          <Button
                            text="Save Changes"
                            bg="brand.100"
                            size="sm"
                            fontSize={16}
                            fontWeight={600}
                            isLoading={updateProfileLoading}
                            isDisabled={updateProfileLoading}
                          />
                        </VStack>
                      </VStack>
                    </Form>
                  )}
                </Formik>
              </VStack>
            </Box>
            <Box>
              <VStack
                borderWidth={1}
                borderColor="#2124294D"
                p={4}
                borderRadius={6}
                align="stretch"
              >
                <HStack justify="space-between" w="full">
                  <Text fontSize="md" fontWeight="500" color="#212429">
                    Delivery Addresses
                  </Text>
                  <Button
                    text="Add Address"
                    size="xs"
                    fontSize={12}
                    width="auto"
                    icon={<AddIcon color="white" />}
                    iconPosition="left"
                    bg="brand.100"
                    onClick={() => onOpen('create')}
                  />
                </HStack>

                {shippingAddressData.map((item: any, index: any) => (
                  <VStack
                    key={index}
                    borderWidth={1}
                    borderColor="#2124294D"
                    p={4}
                    borderRadius={6}
                    align="stretch"
                  >
                    <HStack justify="space-between" w="full">
                      <HStack>
                        {item.isDefault && (
                          <Text
                            fontSize="13px"
                            fontWeight="400"
                            color="#212429"
                          >
                            Default Address
                          </Text>
                        )}
                      </HStack>

                      <IconButton
                        aria-label="edit"
                        bg="transparent"
                        variant="ghost"
                        size="xs"
                        p={0}
                        m={0}
                        _hover={{ bg: 'transparent' }}
                        icon={<Image src="/images/pencil.svg" />}
                        onClick={() => onOpen('update', item)}
                        justifySelf="flex-end"
                      />
                    </HStack>

                    <VStack align="stretch" spacing={1}>
                      <Text fontSize="13px" fontWeight="400" color="#212429B2">
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text fontSize="13px" fontWeight="400" color="#212429B2">
                        {item.address}
                      </Text>
                      <Text fontSize="13px" fontWeight="400" color="#212429B2">
                        {item.phone}
                      </Text>

                      <HStack>
                        {' '}
                        <Button
                          text="Delete Address"
                          size="xs"
                          fontSize={12}
                          width="auto"
                          icon={<Image src="/images/trash-2.svg" />}
                          iconPosition="left"
                          bg="#B3B3B366"
                          color="#212429"
                          fontWeight={400}
                          onClick={() =>
                            handleDeleteShippingAddress(item.shipping_id)
                          }
                          isLoading={deleteShippingAddressLoading}
                          isDisabled={deleteShippingAddressLoading}
                        />
                      </HStack>
                    </VStack>
                  </VStack>
                ))}

                {shippingAddressData.length === 0 && (
                  <VStack w="full" align="center" justify="center" h="300px">
                    <Text fontSize="13px" fontWeight="400" color="#212429B2">
                      No address found
                    </Text>
                  </VStack>
                )}
              </VStack>
            </Box>
          </Grid>
        </VStack>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title=""
        size="lg"
        body={
          <AddressModal
            onClose={onClose}
            type={type}
            selectedAddress={selectedAddress}
          />
        }
      />
    </>
  );
};

export default PersonalInfo;

/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  VStack,
  Image,
  HStack,
  Text,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';

import AddressInput from '../ui/AddressInput';
import Button from '../ui/Button';
import Input2 from '../ui/Input2';
import Select from '../ui/Select';
import {
  useCreateShippingAddressMutation,
  useUpdateShippingAddressMutation,
} from '~/lib/redux/services/account.service';
import { useAppSelector } from '~/lib/redux/store';
import { addressSchema } from '~/lib/schemas/auth.schema';
import { statesAndLgas } from '~/lib/utils/constants';

const AddressModal = ({ onClose, type, selectedAddress }: any) => {
  console.log(selectedAddress, 'selectedAddress');
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const userId = userInfo?.user?.user_id;
  const [isDefault, setIsDefault] = useState(false);

  const [selectedState, setSelectedState] = useState('');
  const [lgaOptions, setLgaOptions] = useState<string[]>([]);

  useEffect(() => {
    if (selectedAddress?.state) {
      const selectedStateData = statesAndLgas.find(
        (s) => s.state === selectedAddress.state
      );
      const lgas = selectedStateData?.lgas || [];
      setLgaOptions(lgas);
      setSelectedState(selectedAddress.state);
    }
  }, [selectedAddress]);

  const [createShippingAddress, { isLoading: createShippingAddressLoading }] =
    useCreateShippingAddressMutation();

  const [updateShippingAddress, { isLoading: updateShippingAddressLoading }] =
    useUpdateShippingAddressMutation();

  const stateOptions = statesAndLgas.map(({ state }) => ({
    label: state,
    value: state,
  }));

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);

    // Find corresponding LGAs for selected state
    const selectedStateData = statesAndLgas.find((s) => s.state === newState);
    const lgas = selectedStateData?.lgas || [];
    setLgaOptions(lgas);
  };

  const handleAddressSelect = (place: any, setFieldValue: any) => {
    let state = '';
    let localGovernment = '';
    let postalCode = '';

    // Extract state, LGA and postal code from address components
    place.address_components?.forEach((component: any) => {
      if (component.types.includes('administrative_area_level_1')) {
        state = component.long_name;
      }
      if (component.types.includes('administrative_area_level_2')) {
        localGovernment = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        postalCode = component.long_name;
      }
    });

    // Set postal code if available
    if (postalCode) {
      setFieldValue('postalCode', postalCode);
    }

    // Update state and trigger LGA options update
    if (state) {
      setSelectedState(state);
      setFieldValue('state', state);

      // Find and set LGA options
      const selectedStateData = statesAndLgas.find((s) => s.state === state);
      const lgas = selectedStateData?.lgas || [];
      setLgaOptions(lgas);

      // If we have a local government, try to match it with available LGAs
      if (localGovernment) {
        const matchedLga = lgas.find(
          (lga) =>
            lga.toLowerCase().includes(localGovernment.toLowerCase()) ||
            localGovernment.toLowerCase().includes(lga.toLowerCase())
        );
        if (matchedLga) {
          setFieldValue('localGovernment', matchedLga);
        }
      }
    }
  };

  const handleCreateShippingAddress = async (values: any) => {
    await createShippingAddress({
      user_id: userId,
      firstName: values?.firstName,
      lastName: values?.lastName,
      phone: values?.phone.toString(),
      address: values?.address,
      localGovernment: values?.localGovernment,
      postalCode: values?.postalCode,
      isDefault,
      latitude: values?.latitude?.toString(),
      longitude: values?.longitude?.toString(),
      state: values?.state,
    })
      .unwrap()
      .then(() => {
        toast({
          title: 'Address created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        onClose();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error?.data?.error ?? 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  const handleUpdateShippingAddress = async (values: any) => {
    const data = {
      user_id: userId,
      firstName: values?.firstName,
      lastName: values?.lastName,
      phone: values?.phone,
      address: values?.address,
      localGovernment: values?.localGovernment,
      postalCode: values?.postalCode,
      isDefault,
      latitude: values?.latitude,
      longitude: values?.longitude,
      state: values?.state,
    };

    await updateShippingAddress({
      userId,
      shippingId: selectedAddress?.shipping_id,
      data,
    })
      .unwrap()
      .then(() => {
        toast({
          title: 'Address updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        onClose();
      })
      .catch((error) => {
        console.log(error?.data);
        toast({
          title: error?.data?.error ?? 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  return (
    <VStack>
      <Formik
        initialValues={{
          firstName: selectedAddress?.firstName ?? '',
          lastName: selectedAddress?.lastName ?? '',
          phone: selectedAddress?.phone ?? '',
          address: selectedAddress?.address ?? '',
          localGovernment: selectedAddress?.localGovernment ?? '',
          postalCode: selectedAddress?.postalCode ?? '',
          latitude: selectedAddress?.latitude ?? '',
          longitude: selectedAddress?.longitude ?? '',
          isDefault: selectedAddress?.isDefault ?? false,
          state: selectedAddress?.state ?? '',
        }}
        onSubmit={(values) => {
          if (type === 'create') {
            handleCreateShippingAddress(values);
          } else {
            handleUpdateShippingAddress(values);
          }
        }}
        validationSchema={addressSchema}
      >
        {(props) => (
          <Form style={{ width: '100%' }}>
            <VStack spacing={4} w="full" align="stretch" mt={2}>
              <HStack>
                <Image src="/images/checked.svg" />
                <Text fontSize="md" color="#212429" fontWeight="600">
                  SHIPPING ADDRESS
                </Text>
              </HStack>

              <VStack spacing={2} w="full" align="stretch">
                <Text
                  fontSize="14px"
                  color="#212429"
                  fontWeight="600"
                  textAlign="left"
                  mb={-2}
                >
                  {type === 'create' ? 'Add New Address' : 'Update Address'}
                </Text>
                <HStack
                  w="full"
                  spacing={2}
                  flexDir={{ base: 'column', md: 'row' }}
                >
                  <Input2 label="First Name" name="firstName" type="text" />

                  <Input2 label="Last Name" name="lastName" type="text" />
                </HStack>

                <HStack
                  w="full"
                  spacing={2}
                  flexDir={{ base: 'column', md: 'row' }}
                >
                  <Input2 label="Phone Number" name="phone" type="number" />

                  <Input2
                    label="Phone Number 2 (Optional)"
                    name="phone2"
                    type="number"
                  />
                </HStack>

                <AddressInput
                  onAddressSelect={(place) =>
                    handleAddressSelect(place, props.setFieldValue)
                  }
                />

                <HStack
                  w="full"
                  spacing={2}
                  flexDir={{ base: 'column', md: 'row' }}
                >
                  <Select
                    label="State"
                    name="state"
                    options={stateOptions}
                    placeholder="Select State"
                    onChange={handleStateChange}
                  />

                  <Select
                    label="LGA"
                    name="localGovernment"
                    options={lgaOptions.map((lga) => ({
                      label: lga,
                      value: lga,
                    }))}
                    placeholder="Select LGA"
                    isDisabled={!selectedState}
                  />
                </HStack>

                <Input2 label="Postal Code" name="postalCode" type="text" />

                <Checkbox
                  colorScheme="yellow"
                  size="md"
                  defaultChecked={isDefault}
                  color="#212429"
                  fontWeight="400"
                  fontSize="12px"
                  onChange={() => setIsDefault(!isDefault)}
                >
                  Set as default address
                </Checkbox>
              </VStack>

              <VStack align="stretch" w="100%" mt={6}>
                <Button
                  text="Save"
                  bg="brand.100"
                  size="sm"
                  fontSize={16}
                  fontWeight={600}
                  isLoading={
                    createShippingAddressLoading || updateShippingAddressLoading
                  }
                  isDisabled={
                    createShippingAddressLoading || updateShippingAddressLoading
                  }
                  type="submit"
                />
                <Button
                  text="Cancel"
                  bg="transparent"
                  size="sm"
                  color="brand.100"
                  fontSize={16}
                  fontWeight={600}
                  onClick={onClose}
                />
              </VStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default AddressModal;

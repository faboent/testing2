/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  VStack,
  HStack,
  Text,
  useToast,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useState } from 'react';

import Button from '../ui/Button';
import Input2 from '../ui/Input2';
import Modal from '../ui/Modal';
import { useThirdPartyWarrantyMutation } from '~/lib/redux/services/warranty.service';
import {
  warrantyThirdPartySchema,
  warrantyPersonalSchema,
} from '~/lib/schemas/auth.schema';

import WarrantySucess from './WarrantySucess';

const WarrantyThirdParty = ({
  onClose,
  handleClaimWarranty,
  warranties,
  userId,
  setSelectedWarrantyObject,
  selectedWarrantyObject,
}: any) => {
  const toast = useToast();
  const [isPersonalDevice, setIsPersonalDevice] = useState<boolean | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState('');
  const [selectedWarrantyData, setSelectedWarrantyData] = useState<any>(null);
  const [showImeiSelection, setShowImeiSelection] = useState(false);
  const [showThirdPartyForm, setShowThirdPartyForm] = useState(false);

  const [thirdPartyWarranty, { isLoading }] = useThirdPartyWarrantyMutation();

  const onCloseModal = () => {
    setIsOpen(false);
    onClose();
  };
  const onOpenModal = () => setIsOpen(true);

  const handleThirdPartyWarranty = async (values: any) => {
    await thirdPartyWarranty({
      ...values,
      user_id: userId,
    })
      .unwrap()
      .then(() => {
        onOpenModal();
      })
      .catch((error: any) => {
        toast({
          title: error?.data?.message ?? 'Warranty application failed',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  const handlePersonalChoice = (isPersonal: boolean) => {
    setIsPersonalDevice(isPersonal);
    setShowImeiSelection(true);
  };

  const handleWarrantySelection = (warranty: any) => {
    setSelectedWarranty(warranty.imei);
    setSelectedWarrantyData(warranty);
    setSelectedWarrantyObject(warranty);
  };

  const handleProceed = () => {
    if (!selectedWarranty) {
      toast({
        title: 'Please select a device',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    if (isPersonalDevice) {
      handleClaimWarranty(selectedWarrantyData);
      onClose();
    } else {
      setShowThirdPartyForm(true);
      setShowImeiSelection(false);
    }
  };

  return (
    <VStack>
      {isPersonalDevice === null && (
        <VStack spacing={4} w="full" my={8}>
          <Text
            fontSize="md"
            color="#212429"
            fontWeight="400"
            textAlign="center"
          >
            Is this device being used by you or someone else? Warranty will be
            transfered to 3rd party if you choose “Not me”
          </Text>
          <HStack
            spacing={4}
            w="full"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              text="Me"
              // bg="brand.100"
              variant="outline"
              border="brand.100"
              color="brand.100"
              size="sm"
              fontSize={16}
              fontWeight={600}
              // onClick={() => {
              //   onClose();
              //   // handleClaimWarranty();
              // }}
              onClick={() => handlePersonalChoice(true)}
              width="100px"
            />
            <Button
              text="Not Me"
              bg="brand.100"
              size="sm"
              fontSize={16}
              fontWeight={600}
              // onClick={() => setIsPersonalDevice(false)}
              onClick={() => handlePersonalChoice(false)}
              width="100px"
            />
          </HStack>
        </VStack>
      )}

      {showImeiSelection && (
        <VStack spacing={4} w="full" my={8}>
          <Text
            fontSize="md"
            color="#212429"
            fontWeight="400"
            textAlign="center"
          >
            Kindly Choose the device warranty you want to claim
          </Text>
          <RadioGroup
            onChange={setSelectedWarranty}
            value={selectedWarranty}
            colorScheme="yellow"
          >
            <VStack alignItems="flex-start" w="full">
              {warranties.map((warranty: any) => (
                <Radio
                  key={warranty?.name}
                  value={warranty?.imei}
                  onChange={() => handleWarrantySelection(warranty)}
                >
                  {warranty?.imei}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
          <HStack mt={6} mb={4}>
            <Button
              text="Proceed"
              bg="brand.100"
              size="sm"
              fontSize={16}
              fontWeight={600}
              onClick={handleProceed}
              isDisabled={!selectedWarranty}
            />
          </HStack>
        </VStack>
      )}

      {showThirdPartyForm && (
        <Formik
          initialValues={{
            imei: selectedWarrantyData?.imei ?? '',
            email: '',
            name: '',
          }}
          onSubmit={(values) => {
            console.log(values, 'values');
            handleThirdPartyWarranty(values);
          }}
          validationSchema={
            isPersonalDevice ? warrantyPersonalSchema : warrantyThirdPartySchema
          }
        >
          {(props) => (
            <Form style={{ width: '100%' }}>
              <VStack spacing={4} w="full" align="stretch" mt={2}>
                <HStack>
                  <Text fontSize="md" color="#212429" fontWeight="600">
                    {isPersonalDevice
                      ? 'Submit your information'
                      : 'Enter 3rd party owner information'}
                  </Text>
                </HStack>

                <VStack spacing={2} w="full" align="stretch">
                  <VStack w="full" spacing={2}>
                    <Input2 label="Imei" name="imei" type="number" />
                    <Input2 label="Name" name="name" type="text" />
                    <Input2 label="Email" name="email" type="email" />
                  </VStack>
                </VStack>

                <VStack align="stretch" w="100%" mt={6} mb={4}>
                  <Button
                    text="Enter"
                    bg="brand.100"
                    size="sm"
                    fontSize={16}
                    fontWeight={600}
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  />
                </VStack>
              </VStack>
            </Form>
          )}
        </Formik>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title=""
        size="md"
        body={<WarrantySucess onClose={onCloseModal} type="thirdParty" />}
      />
    </VStack>
  );
};

export default WarrantyThirdParty;

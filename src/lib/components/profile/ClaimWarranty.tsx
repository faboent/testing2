/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { VStack, Text, HStack, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';

import WarrantySucess from '../modals/WarrantySucess';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import TextArea from '../ui/TextArea';
import Input2 from '~/lib/components/ui/Input2';
import { useApplyWarrantyMutation } from '~/lib/redux/services/warranty.service';
import { useAppSelector } from '~/lib/redux/store';
import { warrantySchema } from '~/lib/schemas/auth.schema';

interface ClaimWarrantyProps {
  handleCancel: () => void;
  selectedWarrantyObject: any;
}

const ClaimWarranty = ({
  handleCancel,
  selectedWarrantyObject,
}: ClaimWarrantyProps) => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;
  const userId = user?.user_id;
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const onCloseModal = () => {
    setIsOpen(false);
    handleCancel();
  };

  const onOpenModal = () => {
    setIsOpen(true);
  };

  const [applyWarranty, { isLoading }] = useApplyWarrantyMutation();

  const handleApplyWarranty = async (values: any) => {
    await applyWarranty({
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

  return (
    <VStack>
      <Text fontSize="14px" fontWeight="500" color="#212429">
        Please provide the information below
      </Text>

      <Formik
        initialValues={{
          imei: selectedWarrantyObject?.imei ?? '',
          brand_model: selectedWarrantyObject?.model_brand ?? '',
          address: selectedWarrantyObject?.address ?? '',
          area: selectedWarrantyObject?.area ?? '',
          date: selectedWarrantyObject?.date ?? '',
          time: selectedWarrantyObject?.time ?? '',
          complain: selectedWarrantyObject?.complain ?? '',
        }}
        onSubmit={(values) => {
          handleApplyWarranty(values);
        }}
        validationSchema={warrantySchema}
      >
        {(props) => (
          <Form style={{ width: '100%' }}>
            <VStack spacing={4} w="full">
              <VStack spacing={2} w={['full', '70%']} align="stretch">
                <Input2
                  label="Brand Model"
                  name="brand_model"
                  type="text"
                  bg="white"
                  borderWidth={1}
                  borderColor="#2124294D"
                  labelFontSize={14}
                  labelColor="#21242980"
                />

                <Input2
                  label="Address"
                  name="address"
                  type="text"
                  bg="white"
                  borderWidth={1}
                  borderColor="#2124294D"
                  labelFontSize={14}
                  labelColor="#21242980"
                />

                <Input2
                  label="Area"
                  name="area"
                  type="text"
                  bg="white"
                  borderWidth={1}
                  borderColor="#2124294D"
                  labelFontSize={14}
                  labelColor="#21242980"
                />

                <HStack spacing={2} w="full" flexDirection={['column', 'row']}>
                  <Input2
                    label="Date"
                    name="date"
                    type="date"
                    bg="white"
                    borderWidth={1}
                    borderColor="#2124294D"
                    labelFontSize={14}
                    labelColor="#21242980"
                  />

                  <Input2
                    label="Time"
                    name="time"
                    type="time"
                    bg="white"
                    borderWidth={1}
                    borderColor="#2124294D"
                    labelFontSize={14}
                    labelColor="#21242980"
                  />
                </HStack>

                <TextArea
                  label="Complain"
                  name="complain"
                  bg="white"
                  borderWidth={1}
                  borderColor="#2124294D"
                  labelFontSize={14}
                  labelColor="#21242980"
                />
              </VStack>

              <VStack align="stretch" w={['full', '70%']} mt={6} spacing={4}>
                <Button
                  text="Claim Warranty"
                  bg="brand.100"
                  size="sm"
                  fontSize={16}
                  fontWeight={600}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                />

                <Button
                  text="Cancel"
                  variant="outline"
                  border="brand.100"
                  color="brand.100"
                  size="sm"
                  fontSize={16}
                  fontWeight={600}
                  onClick={handleCancel}
                />
              </VStack>
            </VStack>
          </Form>
        )}
      </Formik>

      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        title=""
        size="md"
        body={<WarrantySucess onClose={onCloseModal} type="personal" />}
      />
    </VStack>
  );
};

export default ClaimWarranty;

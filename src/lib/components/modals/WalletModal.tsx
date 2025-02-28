/* eslint-disable @typescript-eslint/no-unused-vars */

import { VStack, Image, HStack, Text, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useState } from 'react';

import Button from '../ui/Button';
import Input2 from '../ui/Input2';
import { usePayStack } from '~/lib/hooks/usePayStack';
import { useCompleteWalletTransactionMutation } from '~/lib/redux/services/wallet.service';
import { useAppSelector } from '~/lib/redux/store';
import { walletSchema } from '~/lib/schemas/auth.schema';

const WalletModal = ({ onClose }: any) => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const email = userInfo?.user?.email;
  const userId = userInfo?.user?.user_id;

  const [amount, setAmount] = useState(0);

  const [
    completeWalletTransaction,
    { isLoading: completeWalletTransactionLoading },
  ] = useCompleteWalletTransactionMutation();

  const handleCompleteWalletTransaction = async (values: any) => {
    const body = {
      reference: values.reference,
    };

    await completeWalletTransaction({ body, user_id: userId })
      .unwrap()
      .then(() => {
        toast({
          title: 'Wallet transaction completed successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        onClose();
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
  };

  const onSuccessCallback = (reference: any) => {
    console.log(reference, 'reference');
    handleCompleteWalletTransaction(reference);
  };

  const { initializePayment, onSuccess } = usePayStack(
    email,
    amount,
    onSuccessCallback
  );

  const handlePayment = () => {
    initializePayment(onSuccess);
  };

  return (
    <VStack>
      <Formik
        initialValues={{
          amount: '',
          email: email ?? '',
        }}
        onSubmit={(values) => {
          console.log(values, 'values');
          handlePayment();
        }}
        validationSchema={walletSchema}
      >
        {(props) => (
          <Form style={{ width: '100%' }}>
            <VStack spacing={4} w="full" align="stretch" mt={2}>
              <HStack>
                <Image src="/images/checked.svg" />
                <Text fontSize="md" color="#212429" fontWeight="600">
                  Wallet Top Up
                </Text>
              </HStack>

              <VStack spacing={2} w="full" align="stretch">
                <VStack
                  w="full"
                  spacing={2}
                  flexDir={{ base: 'column', md: 'row' }}
                >
                  <Input2
                    label=""
                    name="amount"
                    type="number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </VStack>
              </VStack>

              <VStack align="stretch" w="100%" mt={6}>
                <Button
                  text="Fund Wallet"
                  bg="brand.100"
                  size="sm"
                  fontSize={16}
                  fontWeight={600}
                  type="submit"
                  isLoading={completeWalletTransactionLoading}
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

export default WalletModal;

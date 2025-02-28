import { usePaystackPayment } from 'react-paystack';

export const usePayStack = (email: string, amount: number, callback?: any) => {
  const config: any = {
    reference: new Date().getTime(),
    email,
    amount: amount * 100,
    publicKey: 'pk_test_c13c9b99fe274eb22cdc922634d2f526ec4e8bc6',
  };

  const onSuccess = (reference: any) => {
    console.log(reference, 'reference22');
    if (callback) {
      callback(reference);
    }
  };

  const initializePayment = usePaystackPayment(config) as any;
  return { initializePayment, onSuccess };
};

export default usePayStack;

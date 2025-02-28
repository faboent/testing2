import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

interface AccountResolutionResult {
  status: boolean;
  message: string;
  data: {
    account_name: string;
  };
}

const usePaystackAccountResolver = () => {
  const toast = useToast();
  const [accountName, setAccountName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const resolveAccount = async (
    accountNumber: string,
    bankCode: string,
    apiKey: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.get<AccountResolutionResult>(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        setAccountName(response.data.data.account_name);
        toast({
          title: 'Success',
          description: 'Account resolved successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  return { accountName, loading, resolveAccount };
};

export default usePaystackAccountResolver;

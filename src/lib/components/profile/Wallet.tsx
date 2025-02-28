'use client';

import { ViewIcon } from '@chakra-ui/icons';
import {
  VStack,
  Grid,
  Box,
  Image,
  Text,
  HStack,
  IconButton,
  Icon,
  Skeleton,
  GridItem,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import WalletModal from '../modals/WalletModal';
import Modal from '../ui/Modal';
import {
  useGetWalletBalanceQuery,
  useGetWalletTransactionsQuery,
} from '~/lib/redux/services/wallet.service';
import { useAppSelector } from '~/lib/redux/store';
import { formatCurrency, formatDate, shortenText } from '~/lib/utils/formatter';

const Wallet = () => {
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const userId = userInfo?.user?.user_id;
  const [isOpen, setIsOpen] = useState(false);

  const { data: walletBalance, isLoading: walletBalanceLoading } =
    useGetWalletBalanceQuery(userId);

  const walletBalanceData = useMemo(() => walletBalance ?? {}, [walletBalance]);

  const { data: walletTransactions, isLoading: walletTransactionsLoading } =
    useGetWalletTransactionsQuery('');

  const walletTransactionsData = useMemo(
    () => walletTransactions?.data ?? [],
    [walletTransactions]
  );

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  return (
    <>
      {walletBalanceLoading || walletTransactionsLoading ? (
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
            Wallet
          </Text>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={4}
            height="100%"
          >
            <VStack
              borderWidth={1}
              borderColor="#2124294D"
              p={4}
              borderRadius={6}
              h="100%"
            >
              <VStack spacing={0} w="full">
                <Text fontSize="13px" fontWeight="600" color="#21242980">
                  Wallet ID:11223344
                </Text>
                <Text fontSize="13px" fontWeight="600" color="#212429">
                  Balance
                </Text>
                <HStack>
                  <Text fontSize="xl" fontWeight="600" color="#212429">
                    {formatCurrency(walletBalanceData?.balance)}
                  </Text>
                  <IconButton
                    aria-label="edit"
                    bg="transparent"
                    variant="ghost"
                    size="xs"
                    p={0}
                    m={0}
                    _hover={{ bg: 'transparent' }}
                    icon={
                      <Icon as={ViewIcon} color="#212429B2" fontSize="20px" />
                    }
                  />
                </HStack>

                <HStack w="full">
                  <Box
                    w="100%"
                    bg="white"
                    borderRadius={6}
                    boxShadow="2xl"
                    p={4}
                    cursor="pointer"
                    onClick={onOpen}
                  >
                    <VStack w="full">
                      <Image src="/images/fund.svg" />
                      <Text fontSize="14px" fontWeight="500" color="#212429">
                        Fund Wallet
                      </Text>
                    </VStack>
                  </Box>
                  <Box
                    w="100%"
                    bg="white"
                    borderRadius={6}
                    boxShadow="2xl"
                    p={4}
                    cursor="pointer"
                  >
                    <VStack w="full">
                      <Image src="/images/transfer.svg" />
                      <Text fontSize="14px" fontWeight="500" color="#212429">
                        Transfer Funds
                      </Text>
                    </VStack>
                  </Box>
                </HStack>
              </VStack>
            </VStack>

            <VStack
              borderWidth={1}
              borderColor="#2124294D"
              p={4}
              borderRadius={6}
              align="stretch"
              h="100%"
              maxH={400}
              overflowY="auto"
            >
              <Text
                fontSize="md"
                fontWeight="600"
                color="#212429"
                textAlign="center"
              >
                Transaction History
              </Text>

              <VStack w="full" spacing={2}>
                {walletTransactionsData?.map(
                  (transaction: any, index: number) => (
                    <HStack
                      key={index}
                      w="full"
                      justifyContent="space-between"
                      align="flex-start"
                    >
                      <HStack alignItems="flex-start">
                        <Box
                          w={2}
                          h={2}
                          bg="#34A853"
                          borderRadius="full"
                          mt={1}
                        />
                        <VStack alignItems="flex-start" spacing={0}>
                          <Text
                            fontSize="12px"
                            fontWeight="600"
                            color="#212429"
                            textTransform="capitalize"
                          >
                            {/* Fund Wallet */}
                            {transaction?.transaction_type}
                          </Text>
                          <Text
                            fontSize="11px"
                            fontWeight="400"
                            color="#212429"
                          >
                            {/* iTranxit/Multiple Delivery */}
                            {transaction?.comments}
                          </Text>
                          <Text
                            fontSize="11px"
                            fontWeight="400"
                            color="#212429"
                          >
                            {shortenText(transaction?.transaction_id, 10)}
                          </Text>
                          <Text
                            fontSize="11px"
                            fontWeight="400"
                            color="#E7906B"
                          >
                            Date: {formatDate(transaction?.createdAt)}
                          </Text>
                        </VStack>
                      </HStack>

                      <VStack alignItems="flex-end" spacing={0}>
                        <Text fontSize="12px" fontWeight="500" color="#212429">
                          {transaction?.transaction_type === 'credit'
                            ? '+'
                            : '-'}
                          {formatCurrency(transaction?.amount)}
                        </Text>
                        <Text fontSize="11px" fontWeight="400" color="#212429">
                          Bal: {formatCurrency(walletBalanceData?.balance)}
                        </Text>
                        <Text
                          fontSize="11px"
                          fontWeight="400"
                          color="#34A853"
                          textTransform="capitalize"
                        >
                          {transaction?.transaction_status}
                        </Text>
                      </VStack>
                    </HStack>
                  )
                )}
              </VStack>
            </VStack>
          </Grid>
        </VStack>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title=""
        size="md"
        body={<WalletModal onClose={onClose} />}
      />
    </>
  );
};

export default Wallet;

'use client';

import {
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import CouponItem from './CouponItem';

const Coupon = () => {
  const tabs = [
    {
      title: 'Unused',
      content: (
        <CouponItem
          amount={100000}
          validUntil="2024-12-31"
          code="ABC123"
          isUnused
        />
      ),
    },
    {
      title: 'Used',
      content: (
        <CouponItem
          amount={200000}
          validUntil="2024-12-31"
          code="ABC123"
          isUnused={false}
        />
      ),
    },
    {
      title: 'Expired',
      content: (
        <CouponItem
          amount={300000}
          validUntil="2024-12-31"
          code="ABC123"
          isUnused={false}
        />
      ),
    },
  ];

  return (
    <VStack alignItems="stretch" spacing={4}>
      <Text fontSize="md" fontWeight="600" color="#212429">
        Coupon/Voucher
      </Text>

      <Tabs variant="soft-rounded" size="sm" isFitted>
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
  );
};

export default Coupon;

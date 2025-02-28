'use client';

import {
  VStack,
  Box,
  Text,
  UnorderedList,
  ListItem,
  HStack,
  Image,
} from '@chakra-ui/react';

import Layout from '~/lib/components/layout';
import { warrantyPolicyData } from '~/lib/utils/constants';

const About = () => {
  return (
    <Layout>
      <Box w="100%" bg="white" borderRadius={6} boxShadow="5px" p={6} my={5}>
        <HStack w="full" align="flex-start" justify="space-between">
          <VStack alignItems="stretch" spacing={6}>
            {warrantyPolicyData.map((section, index) => (
              <VStack key={index} alignItems="flex-start" spacing={3}>
                {section.title && (
                  <Text
                    fontSize={index === 0 ? 'xl' : 'lg'}
                    fontWeight={index === 0 ? '600' : '500'}
                    color="#212429"
                  >
                    {section.title}
                  </Text>
                )}

                {section.description && (
                  <Text color="#212429" fontSize="14px" fontWeight="400">
                    {section.description}
                  </Text>
                )}

                {section.points && (
                  <UnorderedList pl={4} spacing={2}>
                    {section.points.map((point, idx) => (
                      <ListItem
                        key={idx}
                        color="#212429"
                        fontSize="14px"
                        fontWeight="400"
                      >
                        {point}
                      </ListItem>
                    ))}
                  </UnorderedList>
                )}

                {section.subPoints && (
                  <UnorderedList pl={4} spacing={2}>
                    {section.subPoints.map((point, idx) => (
                      <ListItem
                        key={idx}
                        color="#212429"
                        fontSize="14px"
                        fontWeight="400"
                      >
                        {point}
                      </ListItem>
                    ))}
                  </UnorderedList>
                )}

                {section.note && (
                  <Text color="#212429" fontSize="14px" fontWeight="400">
                    {section.note}
                  </Text>
                )}

                {section.contactInfo && (
                  <VStack alignItems="flex-start" spacing={1}>
                    <Text color="#212429" fontSize="14px" fontWeight="400">
                      Name: {section.contactInfo.name}
                    </Text>
                    <Text color="#212429" fontSize="14px" fontWeight="400">
                      Email: {section.contactInfo.email}
                    </Text>
                    <Text color="#212429" fontSize="14px" fontWeight="400">
                      Phone: {section.contactInfo.phone}
                    </Text>
                  </VStack>
                )}

                <Text color="#212429" fontSize="14px" fontWeight="400">
                  Thank you for choosing us! We value your trust and are here to
                  help ensure your shopping experience is worry-free
                </Text>
              </VStack>
            ))}
          </VStack>

          <HStack
            alignItems="flex-start"
            justifyContent="space-between"
            flexDirection="column"
            w="full"
            h="full"
            display={['none', 'flex']}
          >
            <Image src="/images/warranty-policy.svg" alt="Warranty Policy" />
          </HStack>
        </HStack>
      </Box>
    </Layout>
  );
};

export default About;

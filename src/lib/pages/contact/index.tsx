/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {
  VStack,
  Grid,
  GridItem,
  Box,
  Text,
  HStack,
  Image,
  Divider,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import Layout from '~/lib/components/layout';
import Button from '~/lib/components/ui/Button';
import Input2 from '~/lib/components/ui/Input2';
import TextArea from '~/lib/components/ui/TextArea';

const Contact = () => {
  return (
    <Layout>
      <Grid
        templateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
          lg: 'repeat(6, 1fr)',
        }}
        gap={6}
        h="100%"
        mb={5}
        mt={{ base: 5, md: 5 }}
      >
        <GridItem colSpan={{ sm: 0, md: 1, lg: 2 }} h="100%" w="100%">
          <Box w="100%" bg="white" borderRadius={6} boxShadow="5px" p={4}>
            <VStack alignItems="stretch" spacing={6}>
              <HStack>
                <Image src="/images/phone-2.svg" alt="logo" />
                <Text fontSize="md" fontWeight="500" color="#212429">
                  Call To Us
                </Text>
              </HStack>

              <VStack align="flex-start">
                <Text fontSize="14px" fontWeight="400" color="#212429">
                  We are available 24/7, 7 days a week.
                </Text>
                <Text fontSize="14px" fontWeight="400" color="#212429">
                  Phone: +2348016111122
                </Text>
              </VStack>
            </VStack>

            <Divider my={8} borderColor="#000000" />

            <VStack alignItems="stretch" spacing={6}>
              <HStack>
                <Image src="/images/mail-2.svg" alt="logo" />
                <Text fontSize="md" fontWeight="500" color="#212429">
                  Write To US
                </Text>
              </HStack>

              <VStack align="flex-start">
                <Text fontSize="14px" fontWeight="400" color="#212429">
                  Fill out our form and we will contact you within 24 hours.
                </Text>
                <Text fontSize="14px" fontWeight="400" color="#212429">
                  Emails: support@3XG.com
                </Text>
              </VStack>
            </VStack>
          </Box>
        </GridItem>

        <GridItem colSpan={{ sm: 1, md: 1, lg: 4 }} h="100%" w="100%">
          <Box w="100%" bg="white" borderRadius={6} boxShadow="5px" p={6}>
            <Formik
              initialValues={{
                full_name: '',
                email: '',
                phone: '',
                message: '',
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {(props) => (
                <Form style={{ width: '100%' }}>
                  <VStack spacing={4} w="full" align="stretch" mt={2}>
                    <Text fontSize="md" fontWeight="500" color="#212429">
                      Personal Information
                    </Text>
                    <VStack spacing={4} w="full" align="stretch">
                      <HStack
                        w="full"
                        spacing={2}
                        align="flex-start"
                        flexDirection={['column', 'row']}
                      >
                        <Input2
                          placeholder="Your Name"
                          name="full_name"
                          type="text"
                          bg="#F5F5F5"
                          borderWidth={0}
                          borderColor="none"
                          labelFontSize={12}
                        />

                        <Input2
                          placeholder="Your Email"
                          name="email"
                          type="email"
                          bg="#F5F5F5"
                          borderWidth={0}
                          borderColor="none"
                          labelFontSize={12}
                        />

                        <Input2
                          placeholder="Your Phone"
                          name="phone"
                          type="text"
                          bg="#F5F5F5"
                          borderWidth={0}
                          borderColor="none"
                          labelFontSize={12}
                        />
                      </HStack>

                      <TextArea
                        placeholder="Your Message"
                        name="message"
                        bg="#F5F5F5"
                        borderWidth={0}
                        borderColor="none"
                        labelFontSize={12}
                      />
                    </VStack>

                    <VStack align="flex-end" w="100%" mt={6}>
                      <Button
                        text="Send Massage"
                        bg="brand.100"
                        size="md"
                        fontSize={16}
                        fontWeight={500}
                        width="auto"
                      />

                      <Image src="/images/letter_send.svg" alt="contact" />
                    </VStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Contact;

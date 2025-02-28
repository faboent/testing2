'use client';

import {
  VStack,
  Grid,
  GridItem,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
} from '@chakra-ui/react';

const Faq = () => {
  const leftFaq = [
    {
      title: 'How many business account can I have on 3XG?',
      content:
        'You can have one business account per legal entity on 3XG. For multiple brands, you may be able to set up different listings or sub-accounts',
    },
    {
      title: 'Why was my product rejected',
      content:
        'Your product may be rejected due to policy violations, incorrect details, intellectual property issues, or quality concerns. Pricing errors, incorrect categorization, and account issues can also cause rejection. Review the rejection reason, make necessary corrections, and contact support if needed.',
    },
    {
      title: 'What are the requirements for becoming a merchant on 3XG',
      content:
        'To become a merchant on our platform, provide your business details, tax ID, payment account, product listings, and images. You must also comply with our policies, offer valid contact info, and set shipping/return guidelines. Verification and product quality standards may apply.',
    },
    {
      title: 'What types of products can I sell on 3XG?',
      content:
        'On 3XG, you can sell a variety of products like Gadgets, electronics, home goods, beauty items and more, as long as they comply with platform policies. Certain items like illegal or restricted goods are not allowed.',
    },
    {
      title: 'Are there any fees for selling on 3XG?',
      content:
        'Yes, 3XG charges fees, including listing fees, transaction fees (a percentage of each sale), and possible subscription fees for premium accounts. The exact fees depend on your account and services.',
    },
    {
      title: 'How do I get paid for my sales?',
      content:
        'You’ll be paid through your linked payment account (e.g., bank or PayPal). Payments are processed on a regular schedule, such as weekly or monthly. Be sure to set up your payment details in your merchant account to receive your earnings.',
    },
    {
      title: 'When does 3XG reimburse my total earnings ?',
      content: '3XG processes payouts for merchants every 5 working dayds',
    },
    {
      title: 'Can I edit or delete a product listing?',
      content:
        'Yes, you can edit or delete product listings at any time by updating details like title, description, price, images, inventory, and shipping policies. If you no longer wish to sell a product, you can remove it from your store entirely. This ensures your listings stay accurate and up to date.',
    },
    {
      title: 'What happens if a buyer wants to return an item?',
      content:
        'If a buyer wants to return an item, they must follow your store’s return policy. You’ll need to review the request and determine if the return is valid based on the policy. If approved,  you’ll process the refund or exchange as specified',
    },
  ];

  const rightFaq = [
    {
      title: 'How do I track my sales and performance?',
      content:
        'You can track your sales and performance through your merchant dashboard, which provides detailed insights into sales, revenue, customer activity, and other key metrics.',
    },
    {
      title: 'What should I do if I encounter a technical issue?',
      content:
        'You encounter a technical issue, contact customer support for assistance. Provide details of the problem, and they will help resolve it promptly.',
    },
    {
      title: 'How do I handle customer feedback or disputes?',
      content:
        "To handle customer feedback or disputes, respond promptly and professionally. Address concerns respectfully, offer solutions like refunds or exchanges, and ensure you follow your platform's dispute resolution process.",
    },
    {
      title: 'What happens if a buyer wants to return an item?',
      content:
        'You can manage your inventory directly from your merchant dashboard. Update stock levels, add new products, and track sales to ensure your listings reflect current availability',
    },
    {
      title: 'How do I get paid for my sales?',
      content:
        'Your product may be rejected due to policy violations, incorrect details, intellectual property issues, or quality concerns. Pricing errors, incorrect categorization, and account issues can also cause rejection. Review the rejection reason, make necessary corrections, and contact support if needed.',
    },
    {
      title: 'How do i post my product to sell on 3XG?',
      content:
        'In the inventory areas, you will find a section for product listing all product/business types including shop, bulksales,,seals, luxury and health supplies ',
    },
    {
      title: 'What is difference between shop, deals & bulk?',
      content:
        'The shop is a storefront for merchants selling anything Gadget and home appliances and only the kind of products are to be posted for upload in the shop. The deals center is for merchant to post any type of goods including gadgets/home appliances and services. The ulk center is for wholesalers ro post any type of goods for sales',
    },
    {
      title: 'How long to wait for my product to go live?',
      content:
        'A product will go live as soon as the image quality is verified and approved ',
    },
    {
      title: 'How much does 3XG charge on each sales?',
      content: '3XG charges only 3% of the total sales price of each product ',
    },
  ];

  return (
    <Box bg="white" w="full" mt={10} py={10}>
      <Container maxW="container.lg">
        <VStack
          w="100%"
          borderRadius={6}
          boxShadow="5px"
          py={4}
          px={['4', '14']}
          spacing={8}
        >
          <Text color="#212429" fontWeight="700" fontSize={['xl', '2xl']}>
            Frequently asked questions (FAQs)
          </Text>

          <Grid
            templateColumns={{
              sm: 'repeat(1, 1fr)',
              md: 'repeat(1, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
            gap={6}
            w="100%"
          >
            <GridItem colSpan={{ sm: 1, md: 1, lg: 1 }} w="100%">
              <Accordion allowToggle>
                {leftFaq.map((faq, index) => (
                  <AccordionItem
                    borderWidth={1}
                    borderColor="#FFFCFC"
                    bg="#FFFCFC"
                    boxShadow="xl"
                    borderRadius={5}
                    key={index}
                    mb={4}
                    py={2}
                  >
                    <h2>
                      <AccordionButton _expanded={{ bg: 'brand.100' }}>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={['md', 'md']}
                          fontWeight="500"
                          color="#212429"
                        >
                          {faq.title}
                        </Box>
                        <AccordionIcon color="#212429" />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      fontSize="md"
                      fontWeight="400"
                      color="#212429"
                    >
                      {faq.content}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </GridItem>

            <GridItem colSpan={{ sm: 1, md: 1, lg: 1 }} w="100%">
              <Accordion allowToggle>
                {rightFaq.map((faq, index) => (
                  <AccordionItem
                    borderWidth={1}
                    borderColor="#FFFCFC"
                    bg="#FFFCFC"
                    boxShadow="xl"
                    borderRadius={5}
                    key={index}
                    mb={4}
                    py={2}
                  >
                    <h2>
                      <AccordionButton _expanded={{ bg: 'brand.100' }}>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={['md', 'md']}
                          fontWeight="500"
                          color="#212429"
                        >
                          {faq.title}
                        </Box>
                        <AccordionIcon color="#212429" />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      fontSize="md"
                      fontWeight="400"
                      color="#212429"
                    >
                      {faq.content}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Faq;

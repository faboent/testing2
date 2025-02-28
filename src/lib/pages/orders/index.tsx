'use client';

import { Grid, GridItem, Box } from '@chakra-ui/react';

import Layout from '~/lib/components/layout';
import Order from '~/lib/components/profile/Order';
import ProfileMenu from '~/lib/components/profile/ProfileMenu';

const Profile = () => {
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
          <ProfileMenu />
        </GridItem>

        <GridItem colSpan={{ sm: 1, md: 1, lg: 4 }} h="100%" w="100%">
          <Box w="100%" bg="white" borderRadius={6} boxShadow="5px" p={4}>
            <Order />
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Profile;

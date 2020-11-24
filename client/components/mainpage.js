import React from 'react';
import { Container, Box, Grid, Flex, Center } from '@chakra-ui/react';

function MainPage(props) {
  return (
    <Container maxW="xl" centerContent>
      <Center pt="40px" pb="800px">
        {/* <Flex
        direction="column"
        // align="center"
        bg="#e8e8e8"
        color="black"
        width="450px"
        borderRadius="8px"
        padding="30px"
      > */}
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <Box padding="4" bg="#e8e8e8" w="100%" h="100%">
            I'm writing in here to see what happens when I render the page.
          </Box>
          <Box padding="4" bg="#e8e8e8" w="100%" h="10">
            I'm writing in here to see what happens when I render the page.
          </Box>
          <Box padding="4" bg="#e8e8e8" w="100%" h="10">
            I'm writing in here to see what happens when I render the page.
          </Box>
          <Box padding="4" bg="#e8e8e8" w="100%" h="10">
            I'm writing in here to see what happens when I render the page.
          </Box>
        </Grid>
      </Center>
      {/* </Flex> */}
    </Container>
  );
}

export default MainPage;

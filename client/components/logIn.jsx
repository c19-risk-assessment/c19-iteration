import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Center,
  Flex,
  FormControl,
  Icon,
  Input,
  InputLeftAddon,
  Stack,
  InputGroup,
  InputLeftElement,
  CloseButton,
  Button,
} from '@chakra-ui/react';

function LogIn(props) {
  console.log(props);
  return (
    <Container maxW="max" maxH="max">
      <Center pt="40px" pb="800px">
        <Flex
          direction="column"
          align="center"
          bg="#e8e8e8"
          color="black"
          width="450px"
          borderRadius="8px"
          padding="30px"
        >
          <Link to={'/'}>
            <CloseButton className="right" />
          </Link>
          <img
            src="https://pics.clipartpng.com/Red_Coronavirus_PNG_Clipart-3281.png"
            width="225px"
            height="225px"
            margin="15px"
          />
          <form action="submit">
            <Stack spacing={6}>
              <FormControl isRequired>
                <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="Username:" />
                  <Input
                    variant="filled"
                    name="username"
                    onChange={props.inputChange}
                  />
                </InputGroup>
                <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="password:" />
                  <Input
                    variant="filled"
                    name="password"
                    onChange={props.inputChange}
                  />
                </InputGroup>
              </FormControl>
              {/* <Link to={'/'}>
                <Button
                  mt="30px"
                  mb="30px"
                  width="sm"
                  onClick={() => {
                    this.handleSubmit();
                  }}
                >
                  Sign Up!
                </Button>
              </Link> */}
            </Stack>
          </form>
        </Flex>
      </Center>
    </Container>
  );
}

export default LogIn;

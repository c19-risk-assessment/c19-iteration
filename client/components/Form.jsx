import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Icon,
  Input,
  InputLeftAddon,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  Container,
  Flex,
  CloseButton,
  Center,
} from '@chakra-ui/react';

export default function SignUp({ signedUp }) {
  const defaultState = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    addressnumber: '',
    streetaddress: '',
    zipcode: '',
  };

  const [state, setState] = useState(defaultState);

  function firstnameChange(field) {
    setState({
      ...state,
      firstname: field.target.value,
    });
  }

  function lastnameChange(field) {
    setState({
      ...state,
      lastname: field.target.value,
    });
  }

  function addressnumberChange(field) {
    setState({
      ...state,
      addressnumber: field.target.value,
    });
  }

  function streetaddressChange(field) {
    setState({
      ...state,
      streetaddress: field.target.value,
    });
  }

  function zipcodeChange(field) {
    setState({
      ...state,
      zipcode: field.target.value,
    });
  }

  function usernameChange(field) {
    setState({
      ...state,
      username: field.target.value,
    });
  }

  function passwordChange(field) {
    setState({
      ...state,
      password: field.target.value,
    });
  }

  function clicked() {
    signedUp(
      state.firstname,
      state.lastname,
      state.addressnumber,
      state.streetaddress,
      state.zipcode,
      state.username,
      state.password
    );
  }

  // const toast = useToast();

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
                  <InputLeftAddon children="First Name:" />
                  <Input variant="filled" onChange={firstnameChange} />
                </InputGroup>
                <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="Last Name:" />
                  <Input variant="filled" onChange={lastnameChange} />
                </InputGroup>
                {/* <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="Email:" />
                  <Input variant="filled" onChange={emailChange} />
                </InputGroup> */}
                <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="Username:" />
                  <Input variant="filled" onChange={usernameChange} />
                </InputGroup>
                <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="Password:" />
                  <Input variant="filled" onChange={passwordChange} />
                </InputGroup>
                <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="Street Number:" />
                  <Input variant="filled" onChange={addressnumberChange} />
                </InputGroup>
                <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="Street Address:" />
                  <Input variant="filled" onChange={streetaddressChange} />
                </InputGroup>
              </FormControl>
              <Link to={'/'}>
                <Button
                  mt="30px"
                  mb="30px"
                  width="sm"
                  onClick={() => {
                    clicked();
                    toast({
                      title: 'Signed up.',
                      description: "We've created a new account for you.",
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    });
                  }}
                >
                  Sign Up!
                </Button>
              </Link>
            </Stack>
          </form>
        </Flex>
      </Center>
    </Container>
  );
}

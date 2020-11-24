import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  toast
} from '@chakra-ui/react';

class SignUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      addressNumber: '',
      streetAddress: '',
      zipCode: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event) {
    event.preventDefault();
    console.log('This is the event Name ', event.target.name);
    console.log('This is the input value ', event.target.value);


  }
  
  handleSubmit(event) {
    // put the fetch request in here when someone clicks the button.
  }
 

  const toast = useToast();

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
          <form action = 'submit'>
            <Stack spacing={6}>
              <FormControl isRequired>
                <InputGroup mt="10px" width="sm">
                  <InputLeftAddon children="First Name:" />
                  <Input variant="filled" name='firstName' onChange={this.handleInputChange} />
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
                    this.handleSubmit();
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

export default SignUp;
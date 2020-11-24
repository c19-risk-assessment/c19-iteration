import React, { Component } from 'react';
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
  toast,
} from '@chakra-ui/react';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    console.log('This is the event Name ', event.target.name);
    console.log('This is the input value ', event.target.value);
    const curEventName = event.target.name;
    this.setState({
      [curEventName]: event.target.value,
    });
  }

  handleSubmit(event) {
    // put the fetch request in here when someone clicks the button.
    const data = this.state;
    console.log('final data is ', data);
    axios
      .post('/register', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const toast = useToast();
  render() {
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
                    <Input
                      variant="filled"
                      name="firstName"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup mt="10px" width="sm">
                    <InputLeftAddon children="Last Name:" />
                    <Input
                      variant="filled"
                      name="lastName"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup mt="10px" width="sm">
                    <InputLeftAddon children="Email:" />
                    <Input
                      variant="filled"
                      name="email"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup mt="10px" width="sm">
                    <InputLeftAddon children="Username:" />
                    <Input
                      variant="filled"
                      name="userName"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup mt="10px" width="sm">
                    <InputLeftAddon children="Password:" />
                    <Input
                      variant="filled"
                      name="password"
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
                <Link to={'/'}>
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
                </Link>
              </Stack>
            </form>
          </Flex>
        </Center>
      </Container>
    );
  }
}

export default SignUp;

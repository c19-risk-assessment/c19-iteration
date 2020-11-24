import React from 'react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Portal,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div className="navbar">
      <Menu align="right">
        <Flex bg="#e8e8e8" align="right">
          <Box bg="#e8e8e8" w="100%" p={4} color="black">
            COVID-19 Risk Assessment
            <MenuButton as={Button} bg="#EDF2F7" margin="15px" align="right">
              Users
            </MenuButton>
            <MenuList>
              <Link to="/login">
                <MenuItem>Login</MenuItem>
              </Link>
              <Link to="/signup">
                <MenuItem>Sign Up</MenuItem>
              </Link>
            </MenuList>
          </Box>
        </Flex>
      </Menu>
    </div>
  );
}

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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div className="navbar">
      <Menu>
        <MenuButton as={Button} bg="#bedbbb" margin="15px">
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
      </Menu>
    </div>
  );
}

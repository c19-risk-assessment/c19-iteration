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
      <Menu>
        <MenuButton as={Button} bg="#EDF2F7" margin="15px">
          Menu
        </MenuButton>
        <MenuList>
          <Link to="/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link to="/logIn">
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

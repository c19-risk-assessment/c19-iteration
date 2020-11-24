import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  ChakraProvider,
  extendTheme,
  CSSReset,
  ColorModeProvider,
} from '@chakra-ui/react';
import './styles/styles.css';

import App from './App.jsx';

// If we want to change our theme colors, we can do it here.

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

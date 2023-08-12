import React from 'react';
import RoutesApp from './routes/RoutesApp';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} theme='dark' />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RoutesApp />
      </ThemeProvider>
    </>
  );
}

export default App;
 
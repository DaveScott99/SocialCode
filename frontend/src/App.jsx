import React from 'react';
import RoutesApp from './routes/RoutesApp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} theme='dark' />
      <RoutesApp />
    </>
  );
}

export default App;

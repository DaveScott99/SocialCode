import React from 'react';
import RoutesApp from './Routes/RoutesApp';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css'


function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} theme='dark' />
      <BrowserRouter>
        <div className="wrapper">

          <header className='header'>
            <p>Header</p>
          </header>

          <main className="main">
              <RoutesApp />
          </main>

          <aside className="l-sidebar">
              <div className='content-sidebar'>
                <NavBar />
              </div>
          </aside>

        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

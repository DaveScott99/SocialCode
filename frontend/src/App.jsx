import RoutesApp from './Routes/RoutesApp';

import React from 'react';

import './App.css'
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;

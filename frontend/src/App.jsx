import RoutesApp from './Routes/RoutesApp';

import React from 'react';

import './App.css'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer ';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <header className="header"><NavBar /></header>
        <main className="main"><RoutesApp /></main>
        <aside className="l-sidebar">L-sidebar</aside>
      </div>
    </BrowserRouter>
  );
}

export default App;

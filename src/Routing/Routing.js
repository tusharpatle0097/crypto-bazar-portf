import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';
import DarkModeTheme from '../components/context/DarkModeTheme';

const Routing = () => {
  return (
    <>
      <DarkModeTheme>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </DarkModeTheme>
    </>
  )
}

export default Routing
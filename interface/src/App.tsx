import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core';
import { PrivateRoute } from './components/PrivateRoute';
import { useAuth } from './contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/new-product" element={<NewProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
      <ToastContainer />
    </>
  );
}

export default App;
 
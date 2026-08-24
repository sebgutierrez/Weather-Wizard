import React from 'react';
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Forecast from './pages/Forecast/Forecast.jsx';
import About from './pages/About/About.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/forecast',
    element: <Forecast />,
  },
  {
    path: '/about',
    element: <About />,
  }
]);

function App() {
  return ( 
    <RouterProvider router={router} />
  );
}

export default App;

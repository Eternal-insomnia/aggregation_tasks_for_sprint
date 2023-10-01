import React from 'react';
import ReactDOM from 'react-dom/client';
import FirstPage from './FirstPage.js';
import { RouterProvider, createBrowserRouter,  } from 'react-router-dom';
import SecondPage from './SecondPage.js';
import ThirdPage from './ThirdPage.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/users",
    element: <SecondPage />,
  },
  {
    path: "/final",
    element: <ThirdPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

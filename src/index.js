import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
//
import MainArea from './components/MainArea/MainArea';
import Menu1 from './pages/Menu1/Menu1';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <MainArea />,
      },
      {
        path: '/menu1',
        element: <Menu1 />,
      },
      {
        path: '/menu2',
        element: <h1>menu2</h1>,
      },
      {
        path: '/menu3',
        element: <h1>menu3</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

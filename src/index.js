import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
//
import Menu1 from './pages/Menu1/Menu1';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MainPage from './pages/MainPage/MainPage';
import SettingPage from './pages/SettingPage/SettingPage';
import Menu2 from './pages/Menu2/Menu2';
import MyPage from './pages/MyPage/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/menu1',
        element: <Menu1 />,
      },
      {
        path: '/menu2',
        element: <Menu2 />,
      },
      {
        path: '/menu3',
        element: <Menu2 />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/setting',
        element: <SettingPage />,
        errorElement: <ErrorPage />,
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

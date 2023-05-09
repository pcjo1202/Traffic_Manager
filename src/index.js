import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
//
import TrafficStatus from './pages/TrafficStatus/TrafficStatus';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MainPage from './pages/MainPage/MainPage';
import SettingPage from './pages/SettingPage/SettingPage';
import Directions from './pages/Directions/Directions';
import MyPage from './pages/MyPage/MyPage';
import { Kakao } from './services/kakao';

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
        path: '/trafficStatus',
        element: <TrafficStatus />,
      },
      {
        path: '/directions',
        element: <Directions />,
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
  {
    path: '/login',
    element: <h1>로그인 페이지</h1>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/join',
    element: <h1>회원가입 페이지</h1>,
    errorElement: <ErrorPage />,
  },
]);

const kakao = new Kakao();

kakao.getMap();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

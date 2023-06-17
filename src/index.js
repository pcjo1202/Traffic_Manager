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
import StartPage from './pages/StartPage/StartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ResisterPage from './pages/ResisterPage/ResisterPage';
import AuthApi from './services/authApi';
import DirectionsAPI from './services/directionsAPI';
import SearchPath from './services/testtt';

const Auth = new AuthApi();
const Direct = new DirectionsAPI();

const router = createBrowserRouter([
  {
    path: '/',
    // element: <SearchPath />,
    element: <App Auth={Auth} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <MainPage Direct={Direct} />,
      },
      {
        path: '/trafficStatus',
        element: <TrafficStatus />,
      },
      {
        path: '/directions',
        element: <Directions Direct={Direct} />,
      },
      {
        path: '/mypage',
        element: <MyPage Auth={Auth} />,
      },
      {
        path: '/setting',
        element: <SettingPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/start',
    element: <StartPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage Auth={Auth} />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/join',
    element: <ResisterPage Auth={Auth} />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

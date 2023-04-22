import React, { useState } from 'react';
import styles from './App.module.css';
import SlideMenu from './components/slide_menu/slide_menu';
import { Outlet } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <div className={styles.container}>
      <SlideMenu />
      <Outlet />
    </div>
  ) : (
    <h1>로그인 하셈</h1>
  );
}

export default App;

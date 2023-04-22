import React, { useState } from 'react';
import styles from './App.module.css';
import SlideMenu from './components/slide_menu/slide_menu';
import { Outlet } from 'react-router-dom';
import StatusTraffic from './components/StatusTraffic/StatusTraffic';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <div className={styles.container}>
      <SlideMenu />
      <section className={styles.mainSection}>
        <Outlet />
        <StatusTraffic />
      </section>
    </div>
  ) : (
    <h1>로그인 하셈</h1>
  );
}

export default App;

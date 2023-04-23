import React, { useState } from 'react';
import styles from './App.module.css';
import SlideMenu from './components/slide_menu/slide_menu';
import { Outlet, useLocation } from 'react-router-dom';
import StatusTraffic from './components/StatusTraffic/StatusTraffic';

function App() {
  //login 상태는 index로 가져갈듯
  const [isLogin, setIsLogin] = useState(true);

  const location = useLocation();

  // {
  //   location.pathname !== '/mypage' ? <StatusTraffic />
  // }
  return (
    <div className={styles.container}>
      <SlideMenu />
      <section className={styles.mainSection}>
        <Outlet />
        {location.pathname !== '/mypage' && <StatusTraffic />}
      </section>
    </div>
  );
}

export default App;

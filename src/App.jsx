import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import SlideMenu from './components/slide_menu/slide_menu';
import { Outlet, useLocation } from 'react-router-dom';
import StatusTraffic from './components/StatusTraffic/StatusTraffic';
import StartPage from './pages/StartPage/StartPage';

function App({ Auth }) {
  //login 상태는 index로 가져갈듯

  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState('');

  const location = useLocation();

  useEffect(() => {
    console.log(userId);
  }, []);

  return (
    <>
      {isLogin ? (
        //로그인 되어있을 시
        <div className={styles.container}>
          <SlideMenu />
          <section className={styles.mainSection}>
            <main className={styles.main_wrapper}>
              <Outlet />
              {location.pathname !== '/mypage' && <StatusTraffic />}
            </main>
          </section>
        </div>
      ) : (
        //로그인이 안되어 있을 시
        <StartPage />
      )}
    </>
  );
}

export default App;

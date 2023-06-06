import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import SlideMenu from './components/slide_menu/slide_menu';
import { Outlet, useNavigate } from 'react-router-dom';
// import StatusTraffic from './components/StatusTraffic/StatusTraffic';
import StartPage from './pages/StartPage/StartPage';

function App({ Auth }) {
  //login 상태는 index로 가져갈듯

  const [isLogin, setIsLogin] = useState(null); //기본값 null
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('authToken');

    if (userToken) {
      setToken(userToken);
      navigate('/', true);
    }
  }, []);

  //로그인 상태확인 후 라우팅
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [Auth, token]);

  return (
    <>
      {isLogin ? (
        //로그인 되어있을 시
        <div className={styles.container}>
          <SlideMenu Auth={Auth} />
          <section className={styles.mainSection}>
            <main className={styles.main_wrapper}>
              <Outlet />
              {/* {location.pathname !== '/mypage' && <StatusTraffic />} */}
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

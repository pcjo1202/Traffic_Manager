import React, { useEffect, useState } from 'react';
import styles from './LoginPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = ({ Auth }) => {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Auth.login('test', 'test123!');
  }, []);

  // login 버튼 클릭 이벤트
  const handleLogin = async (e) => {
    Auth.login(id, pwd);

    navigate('/');
  };

  return (
    <form className={styles.fr} onSubmit={handleLogin}>
      <div>
        <h1>Login</h1>
        <div>
          <section className={styles.login_form}>
            <form>
              <div className={styles.int_area}>
                <label htmlFor='input_id' placeholder='ID'>
                  ID :{' '}
                </label>
                <input
                  type='text'
                  name='input_id'
                  // value={inputId}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className={styles.int_area}>
                <label htmlFor='input_pw' placeholder='PW'>
                  {/* PW :{' '} */}
                </label>
                <input
                  type='password'
                  name='input_pw'
                  // value={inputPw}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
              <div>
                <button
                  className={styles.btn}
                  type='button'
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>
            <div className={styles.caption}>{}</div>
          </section>
        </div>
      </div>
    </form>
  );
};
export default LoginPage;

import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    console.log('click login');
    console.log('ID : ', inputId);
    console.log('PW : ', inputPw);
    const url = 'http://192.168.56.1:8090/api/users/login';
    const data = {
      id: inputId,
      pw: inputPw,
    };
    const config = { 'Content-Type': 'application/json' };

    axios
      .post(url, data, config)
      .then((res) => {
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={styles.fr}>
      <div>
        <h1>Login</h1>
        <div>
          <section class={styles.login_form}>
            <form>
              <div className={styles.int_area}>
                <label htmlFor='input_id' placeholder='ID'>
                  ID :{' '}
                </label>
                <input
                  type='text'
                  name='input_id'
                  value={inputId}
                  onChange={handleInputId}
                />
              </div>
              <div className={styles.int_area}>
                <label htmlFor='input_pw' placeholder='PW'>
                  PW :{' '}
                </label>
                <input
                  type='password'
                  name='input_pw'
                  value={inputPw}
                  onChange={handleInputPw}
                />
              </div>
              <div>
                <button
                  className={styles.btn}
                  type='button'
                  onClick={onClickLogin}
                >
                  Login
                </button>
              </div>
            </form>
            <div class={styles.caption}>{}</div>
          </section>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;

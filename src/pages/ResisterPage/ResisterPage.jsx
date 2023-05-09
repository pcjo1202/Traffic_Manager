import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import styles from './ResisterPage.module.css';
import App from '../App';
function RegisterPage() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const handleInputName = (e) => {
    setInputName(e.target.value);
  };

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // 회원가입 버튼 클릭 이벤트
  const onClickLogin = () => {
    console.log('click Membership');
    console.log('Email : ', inputEmail);
    console.log('Name : ', inputName);
    console.log('ID : ', inputId);
    console.log('PW : ', inputPw);
    const url = 'http://192.168.56.1:8090/api/users/login';
    const data = {
      Email: inputEmail,
      Name: inputName,
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
    <form className='fr'>
      <div>
        <h1>회원가입</h1>
        <div>
          <section class='login-form'>
            <form>
              <div className='int-area'>
                <label htmlFor='input_email' placeholder='Email'>
                  Email :{' '}
                </label>
                <input
                  type='text'
                  name='input_email'
                  value={inputId}
                  onChange={handleInputEmail}
                />
              </div>
              <div className='int-area'>
                <label htmlFor='input_name' placeholder='Name'>
                  Name :{' '}
                </label>
                <input
                  type='text'
                  name='input_name'
                  value={inputId}
                  onChange={handleInputName}
                />
              </div>
              <div className='int-area'>
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
              <div className='int-area'>
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
                <button className='btn' type='button' onClick={onClickLogin}>
                  회원가입
                </button>
              </div>
            </form>
            <div class='caption'>
              <BrowserRouter>
                <Routes>
                  <Route path='/' Component={App}></Route>
                </Routes>
                <Link to='../App'>로그인 페이지로 돌아가기</Link>
              </BrowserRouter>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
export default RegisterPage;

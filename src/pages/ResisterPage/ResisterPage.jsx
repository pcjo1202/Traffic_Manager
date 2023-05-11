import React, { useEffect, useState } from 'react';
import styles from './ResisterPage.module.css';

function RegisterPage({ Auth }) {
  // const [inputEmail, setInputEmail] = useState('');
  // const [inputName, setInputName] = useState('');
  // const [inputId, setInputId] = useState('');
  // const [inputPw, setInputPw] = useState('');

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다

  const handleInputEmail = (e) => {
    // setInputEmail(e.target.value);
  };

  const handleInputName = (e) => {
    // setInputName(e.target.value);
  };

  const handleInputId = (e) => {
    // setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    // setInputPw(e.target.value);
  };

  // 회원가입 버튼 클릭 이벤트
  const onClickLogin = () => {};

  return (
    <div className={styles.container}>
      <form className={styles.fr}>
        <div>
          <h1>회원가입</h1>
          <div>
            <section className={styles.login_form}>
              <form>
                <div className={styles.int_area}>
                  <label htmlFor='input_email' placeholder='Email'>
                    Email :{' '}
                  </label>
                  <input
                    type='text'
                    name='input_email'
                    // value={inputId}
                    onChange={handleInputEmail}
                  />
                </div>
                <div className={styles.int_area}>
                  <label htmlFor='input_name' placeholder='Name'>
                    Name :{' '}
                  </label>
                  <input
                    type='text'
                    name='input_name'
                    // value={inputId}
                    onChange={handleInputName}
                  />
                </div>
                <div className={styles.int_area}>
                  <label htmlFor='input_id' placeholder='ID'>
                    ID :{' '}
                  </label>
                  <input
                    type='text'
                    name='input_id'
                    // value={inputId}
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
                    // value={inputPw}
                    onChange={handleInputPw}
                  />
                </div>
                <div>
                  <button
                    className={styles.btn}
                    type='button'
                    onClick={onClickLogin}
                  >
                    회원가입
                  </button>
                </div>
              </form>
              <div className={styles.caption}> </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;

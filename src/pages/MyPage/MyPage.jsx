import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.css';

import MainArea from '../../components/MainArea/MainArea';

import profile from '../../images/test.jpeg';
import Header from '../../components/Header/Header';

const MyPage = ({ Auth }) => {
  const [pwdCheck, setPwdCheck] = useState(false);

  // useEffect(() => {

  // }, [pwdCheck]);

  const handlePwdCheck = (e) => {
    e.preventDefault();
    const pwd = e.target.firstChild.value;
    // console.log(pwd);
    Auth.getUserInfo(pwd);
  };
  return (
    <MainArea>
      <Header title='마이페이지' />

      {pwdCheck ? (
        <section className={styles.profile_wrapper}>
          <div className={styles.thumnail_wrapper}>
            <img className={styles.thumnail} src={profile} alt='profile' />
          </div>

          <div className={styles.info_wrapper}>
            <div className={styles.personal_info}>
              <h2>이름</h2>
              <h3>2000년 1월 1일</h3>
            </div>
            <div className={styles.other_info}>뭐넣지</div>
          </div>
        </section>
      ) : (
        <div className={styles.check}>
          <form onSubmit={handlePwdCheck}>
            <input type='password' placeholder='비밀번호 입력' />
            <input type='submit' value='입력' onSubmit={handlePwdCheck} />
          </form>
        </div>
      )}
    </MainArea>
  );
};

export default MyPage;

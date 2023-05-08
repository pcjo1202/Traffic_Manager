import React from 'react';
import styles from './MyPage.module.css';

import MainArea from '../../components/MainArea/MainArea';

import profile from '../../images/test.jpeg';
import Header from '../../components/Header/Header';

const MyPage = () => {
  return (
    <MainArea>
      <Header title='마이페이지' />
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
    </MainArea>
  );
};

export default MyPage;

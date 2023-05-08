import React from 'react';
import MainArea from '../../components/MainArea/MainArea';
import styles from './MainPage.module.css';
import { Paper } from '@mui/material';
import Header from '../../components/Header/Header';
import { ManageAccountsOutlined } from '@mui/icons-material';

const MainPage = () => {
  return (
    <>
      <MainArea>
        <Header title='Traffic Manager'>
          <div className={styles.account_box}>
            <ManageAccountsOutlined
              sx={{ fontSize: '2rem' }}
              className={styles.account_icon}
            />
          </div>
        </Header>
        <section className={styles.main_container}>
          <Paper
            elevation={3}
            className={styles.section_box}
            sx={{ bgcolor: '#ffffff87' }}
          ></Paper>

          <Paper
            elevation={3}
            className={styles.section_box}
            sx={{ bgcolor: '#ffffff87' }}
          ></Paper>

          <Paper
            elevation={3}
            className={styles.section_box}
            sx={{ bgcolor: '#ffffff87' }}
          ></Paper>
          <Paper
            elevation={3}
            className={styles.section_box}
            sx={{ bgcolor: '#ffffff87' }}
          ></Paper>
          <Paper
            elevation={3}
            className={styles.section_box}
            sx={{ bgcolor: '#ffffff87' }}
          ></Paper>
        </section>
      </MainArea>
    </>
  );
};

export default MainPage;

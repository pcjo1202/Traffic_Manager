import React from 'react';
import styles from './Header.module.css';
import { ManageAccountsOutlined } from '@mui/icons-material';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title_box}>
        <h1>타이틀 입니다.</h1>
      </div>
      <div className={styles.account_box}>
        <ManageAccountsOutlined
          sx={{ fontSize: '2rem' }}
          className={styles.account_icon}
        />
      </div>
    </header>
  );
};

export default Header;

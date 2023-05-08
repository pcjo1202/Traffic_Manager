import React from 'react';
import styles from './Header.module.css';

const Header = ({ children, title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.title_box}>
        <h1>{title}</h1>
      </div>
      {children}
    </header>
  );
};

export default Header;

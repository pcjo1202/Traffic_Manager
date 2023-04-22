import React from 'react';
import styles from './MainArea.module.css';

const MainArea = ({ children }) => {
  return (
    <>
      <div className={styles.main_container}>
        <main className={styles.main_box}>{children}</main>
      </div>
    </>
  );
};

export default MainArea;

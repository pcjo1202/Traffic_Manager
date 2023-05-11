import React from 'react';
import styles from './MainArea.module.css';

const MainArea = ({ children, name }) => {
  const ActiveStyle = { flex: '0 0 25%', height: '100%' };

  // console.log(name);
  return (
    <>
      <div
        className={`${styles.main_container}`}
        style={name === 'status' ? ActiveStyle : null}
      >
        <main className={styles.main_box}>{children}</main>
      </div>
    </>
  );
};

export default MainArea;

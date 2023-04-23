import React from 'react';
import styles from './slide_menu.module.css';
import { MenuItem, MenuList, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const SlideMenu = () => {
  const handleSignOut = () => {
    console.log('로그아웃');
  };

  return (
    <>
      <aside>
        <Paper
          className={styles.slide_container}
          sx={{ background: '#ffffff41', padding: '1rem' }}
        >
          <h1 className={styles.logo_box}>
            <Link to='/' className={styles.logo}>
              <img alt='profile' src='/public/images/test.jpeg' />
            </Link>
          </h1>

          {/* Menu List */}
          <MenuList className={styles.menuList}>
            <Link to='/menu1'>
              <MenuItem>
                <span className={styles.item}>메뉴1</span>
              </MenuItem>
            </Link>

            <Link to='/menu2'>
              <MenuItem className={styles.item}>
                <span className={styles.item}>메뉴2</span>
              </MenuItem>
            </Link>

            <Link to='/menu3'>
              <MenuItem>
                <span className={styles.item}>메뉴3</span>
              </MenuItem>
            </Link>
          </MenuList>

          {/* Footer Menu */}
          <MenuList className={styles.footerMenu}>
            <Link to='/setting'>
              <MenuItem>
                <span className={styles.item}>Setting</span>
              </MenuItem>
            </Link>

            <MenuItem onClick={handleSignOut}>
              <span className={`${styles.item} ${styles.signOut}`}>
                Sign out
              </span>
            </MenuItem>

            {/* 임시 버튼 -> 마이페이지에 넣을 예정 */}
            <Link to='/mypage'>
              <MenuItem>
                <span className={styles.item}>mypage</span>
              </MenuItem>
            </Link>
          </MenuList>
        </Paper>
      </aside>
    </>
  );
};

export default SlideMenu;

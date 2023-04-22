import React from 'react';
import styles from './slide_menu.module.css';
import { Avatar, MenuItem, MenuList, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const SlideMenu = () => {
  return (
    <>
      <aside>
        <Paper
          className={styles.slide_container}
          sx={{ background: '#ffffff41', padding: '1rem' }}
        >
          <h1 className={styles.logo}>
            <Avatar
              alt='profile'
              src='/public/images/test.png'
              sx={{ width: '90%' }}
            ></Avatar>
          </h1>

          <MenuList className={styles.menuList} variant='text'>
            <MenuItem textAlign='center' align='center'>
              <Link to='/menu1' />
              <span className={styles.item}>메뉴</span>
            </MenuItem>
            <MenuItem align='center' className={styles.item}>
              <span className={styles.item}>메뉴</span>
            </MenuItem>
            <MenuItem align='center'>
              <span className={styles.item}>메뉴</span>
            </MenuItem>
          </MenuList>
          {/* 여기에 아래 로직 작성 */}
        </Paper>

        {/* <nav className={styles.menu_list_wrapper}>
          <ul className={styles.menu_list}>
            <li className={styles.menu_item}>메뉴1</li>
            <li className={styles.menu_item}>메뉴2</li>
            <li className={styles.menu_item}>메뉴3</li>
            <li className={styles.menu_item}>메뉴4</li>
          </ul>
        </nav>

        <nav className={styles.footer_menu_wrapper}>
          <ul className={styles.menu_list}>
            <li className={styles.menu_item}>Setting</li>
            <li className={styles.menu_item}>sign out</li>
          </ul>
        </nav> */}
      </aside>
    </>
  );
};

export default SlideMenu;

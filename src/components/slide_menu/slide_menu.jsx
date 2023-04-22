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

          {/* Menu List */}
          <MenuList className={styles.menuList} variant='text'>
            <Link to='/menu1'>
              <MenuItem textAlign='center' align='center'>
                <span className={styles.item}>메뉴1</span>
              </MenuItem>
            </Link>

            <Link to='/menu2'>
              <MenuItem align='center' className={styles.item}>
                <span className={styles.item}>메뉴2</span>
              </MenuItem>
            </Link>

            <Link to='/menu3'>
              <MenuItem align='center'>
                <span className={styles.item}>메뉴3</span>
              </MenuItem>
            </Link>
          </MenuList>
          {/* Footer Menu */}
          <MenuList className={styles.footerMenu}>
            <Link to='/setting'>
              <MenuItem align='center'>
                <span className={styles.item}>Setting</span>
              </MenuItem>
            </Link>
          </MenuList>
        </Paper>
      </aside>
    </>
  );
};

export default SlideMenu;

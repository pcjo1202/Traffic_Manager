import React from 'react';
import styles from './slide_menu.module.css';

import logo from '../../images/test.jpeg';
import { MenuItem, MenuList, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const SlideMenu = () => {
  const handleSignOut = () => {
    console.log('로그아웃');
  };

  const menuItem = [
    {
      path: '/',
      name: 'menu1',
    },
    {
      path: '/menu2',
      name: 'menu2',
    },
    {
      path: '/menu3',
      name: 'menu3',
    },
  ];

  const footerItem = [
    {
      path: '/setting',
      name: 'setting',
    },
    {
      path: '/mypage',
      name: 'mypage',
    },
  ];

  return (
    <>
      <aside>
        <Paper
          className={styles.slide_container}
          sx={{ background: '#ffffff41', padding: '1rem' }}
        >
          <h1 className={styles.logo_box}>
            <Link to='/' className={styles.logo}>
              <img alt='logo' src={logo} />
            </Link>
          </h1>

          {/* Menu List */}

          <MenuList className={styles.menuList}>
            {menuItem.map((item, index) => {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) => {
                    return isActive
                      ? `${styles.activeStyle}`
                      : `${styles.deactiveStyle}`;
                  }}
                >
                  <MenuItem>
                    <span className={styles.item}>{item.name}</span>
                  </MenuItem>
                </NavLink>
              );
            })}
          </MenuList>

          {/* Footer Menu */}
          <MenuList className={styles.footerMenu}>
            {footerItem.map((item, index) => {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) => {
                    return isActive
                      ? `${styles.activeStyle}`
                      : `${styles.deactiveStyle}`;
                  }}
                >
                  <MenuItem>
                    <span className={styles.item}>{item.name}</span>
                  </MenuItem>
                </NavLink>
              );
            })}
            <MenuItem onClick={handleSignOut}>
              <span className={`${styles.item} ${styles.signOut}`}>
                Sign out
              </span>
            </MenuItem>
          </MenuList>
        </Paper>
      </aside>
    </>
  );
};

export default SlideMenu;

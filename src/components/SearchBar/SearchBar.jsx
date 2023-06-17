import React from 'react';
import { Search } from '@mui/icons-material';
import styles from './SearchBar.module.css';

const SearchBar = ({ name, placeholder }) => {
  return (
    <>
      <div className={styles.SearchBar_wrapper}>
        <span className={styles.name}>{name}</span>
        <div className={styles.searchInput}>
          <input id={name} type='text' placeholder={placeholder} />
        </div>
      </div>
    </>
  );
};

export default SearchBar;

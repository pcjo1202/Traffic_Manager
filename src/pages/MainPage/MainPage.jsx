import React, { useState } from 'react';
import MainArea from '../../components/MainArea/MainArea';
import styles from './MainPage.module.css';
import { Paper } from '@mui/material';
import Header from '../../components/Header/Header';
import { ManageAccountsOutlined } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { MyLocation } from '@mui/icons-material';

const MainPage = () => {
  const [location, setLocation] = useState('');

  const handleChange = (value) => {
    setLocation(value);
  };

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
            className={`${styles.section_box} ${styles.myLocationPaper}`}
            sx={{ bgcolor: '#ffffff87' }}
          >
            <div className={styles.myLocation_wrapper}>
              <div className={styles.myLocation}>
                <MyLocation />
                <p className={styles.myLocation_info}>강원도 원주시 흥업면</p>
              </div>

              <div className={styles.searchBar}>
                <Search className={styles.search_icon} />
                <input
                  className={styles.search_input}
                  placeholder='위치 검색'
                  value={location}
                  onChange={(event) => {
                    event.preventDefault();
                    handleChange(event.target.value);
                  }}
                />
              </div>
            </div>
          </Paper>

          <Paper
            elevation={3}
            className={`${styles.vicinity_paper} ${styles.section_box} `}
            sx={{ bgcolor: '#ffffff87' }}
          >
            <div className={styles.vicinity}>
              <Header title='대중교통 현황' />
              <div className={styles.transport_status}>
                <div className={`${styles.info_box} ${styles.bus_info}`}>
                  <h1>버스</h1>
                  <div className={styles.info_rank}>
                    <ul className={styles.rank_list}>
                      {
                        //반복문으로 list 작성
                        // rankList.foreach((item) => {
                        //   return (
                        //     <li className={styles.rank_item}>
                        //       <span className={styles.number}>item.number</span>
                        //       <div className={styles.name}>item.name</div>
                        //       <div className={styles.status}>item.status</div>
                        //     </li>
                        //   );
                        // })
                      }
                      <li className={styles.rank_item}>
                        <span className={styles.number}>1</span>
                        <div className={styles.name}>지하철역 이름</div>
                        <div className={styles.status}>상태</div>
                      </li>
                      <li className={styles.rank_item}>
                        <span className={styles.number}>1</span>
                        <div className={styles.name}>지하철역 이름</div>
                        <div className={styles.status}>상태</div>
                      </li>
                      <li className={styles.rank_item}>
                        <span className={styles.number}>1</span>
                        <div className={styles.name}>지하철역 이름</div>
                        <div className={styles.status}>상태</div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={`${styles.info_box} ${styles.subway_info}`}>
                  <h1>지하철</h1>
                  <div className={styles.info_rank}></div>
                </div>
              </div>
            </div>
          </Paper>
        </section>
      </MainArea>
    </>
  );
};

export default MainPage;

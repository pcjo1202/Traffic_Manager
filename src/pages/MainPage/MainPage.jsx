import React, { useState, useEffect } from 'react';
import MainArea from '../../components/MainArea/MainArea';
import styles from './MainPage.module.css';
import { Paper } from '@mui/material';
import Header from '../../components/Header/Header';
import { ManageAccountsOutlined } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { MyLocation } from '@mui/icons-material';

const MainPage = ({ Direct }) => {
  const [location, setLocation] = useState({ x: null, y: null });
  const [nearData, setNearData] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const data = {
        err: 0,
        x: position.coords.latitude,
        y: position.coords.longitude,
      };

      setLocation((prev) => {
        let newData = { ...prev };
        newData = data;
        return newData;
      });
    });

    console.log('헤헤');
    return () => location;
    // Direct.nearby(location.x, location.y);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (location) {
      Direct.nearby(location.x, location.y) //
        .then((data) => {
          setNearData(data);
        });
    }
  }, [location]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.lastChild.value;
    // console.log(value);
    alert(`준비중입니다 ${value}`);
    e.target.lastChild.value = null;
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
                <p
                  className={styles.myLocation_info}
                >{`${location.x}, ${location.y}`}</p>
              </div>

              <form className={styles.searchBar} onSubmit={handleChange}>
                <Search className={styles.search_icon} />
                <input
                  className={styles.search_input}
                  placeholder='위치 검색'
                  // value={location}
                  // onChange={(event) => {
                  //   event.preventDefault();
                  //   handleChange(event.target.value);
                  // }}
                />
              </form>
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
                      <li className={styles.rank_item}>
                        <span className={styles.number}>1</span>
                        <div className={styles.name}>12212</div>
                        <div className={styles.status}>122%</div>
                      </li>
                      {nearData &&
                        nearData.bus.map((item, index) => {
                          if (index < 11) {
                            return (
                              <li key={index} className={styles.rank_item}>
                                <span className={styles.number}>
                                  {index + 1}
                                </span>
                                <div className={styles.name}>{item.busNo}</div>
                                <div className={styles.status}>
                                  {item.traffic}
                                </div>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                </div>

                <div className={`${styles.info_box} ${styles.subway_info}`}>
                  <h1>지하철</h1>
                  <div className={styles.info_rank}>
                    <ul className={styles.rank_list}>
                      <li className={styles.rank_item}>
                        <span className={styles.number}>1</span>
                        <div className={styles.name}>12212</div>
                        <div className={styles.status}>122%</div>
                      </li>
                      {nearData &&
                        nearData.subway.map((item, index) => {
                          if (index < 10) {
                            return (
                              <li key={index} className={styles.rank_item}>
                                <span className={styles.number}>
                                  {index + 1}
                                </span>
                                <div className={styles.name}>
                                  {item.stationName}
                                </div>
                                <div className={styles.status}>
                                  {item.upline}
                                </div>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
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

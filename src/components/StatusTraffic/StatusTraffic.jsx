import React from 'react';
import MainArea from '../MainArea/MainArea';
import styles from './StatusTraffic.module.css';
import Header from '../../components/Header/Header';

const StatusTraffic = () => {
  return (
    <MainArea name='status'>
      <Header title='실시간 트래픽 상태' />
      <div className={styles.traffic_wrapper}>실시간 트래픽 상태</div>
    </MainArea>
  );
};

export default StatusTraffic;

import React from 'react';
import MainArea from '../MainArea/MainArea';
import styles from './StatusTraffic.module.css';

const StatusTraffic = () => {
  return (
    <MainArea>
      <div className={styles.traffic_wrapper}>실시간 트래픽 상태</div>
    </MainArea>
  );
};

export default StatusTraffic;

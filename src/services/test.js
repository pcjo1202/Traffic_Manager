import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import data from '../searchPath.json';
import {
  Container,
  TextField,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles.css';

function SearchPath() {
  const [data, setData] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [sortBy, setSortBy] = useState('averageCongestion'); // 초기 정렬 기준은 averageCongestion입니다
  const [isReady, setIsReady] = useState(false);

  const [sx, setSX] = useState('');
  const [sy, setSY] = useState('');
  const [ex, setEX] = useState('');
  const [ey, setEY] = useState('');

  const handleSortBy = (key) => {
    setSortBy(key);
  };

  const handleToggleSubPath = (index) => {
    if (visibleIndex === index) {
      setVisibleIndex(-1);
    } else {
      setVisibleIndex(index);
    }
  };

  const fetchDataFromAPI = async () => {
    try {
      const apiUrl = 'api/trans/searchPath';
      const fetchedData = await fetchData(apiUrl);
      setData(fetchedData);
      setIsReady(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  async function fetchData(url) {
    try {
      const requestBody = {
        sx: sx,
        sy: sy,
        ex: ex,
        ey: ey,
      };
      const response = await axios.post(url, requestBody);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const valueA = a.info[sortBy];
    const valueB = b.info[sortBy];

    if (typeof valueA === 'string' || typeof valueB === 'string') {
      if (typeof valueA !== 'string') return -1;
      if (typeof valueB !== 'string') return 1;

      return valueA.localeCompare(valueB);
    }

    return parseFloat(valueA) - parseFloat(valueB);
  });

  return (
    <div className='container'>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchDataFromAPI();
          }}
        >
          <input
            type='text'
            placeholder='sx 좌표'
            value={sx}
            onChange={(e) => setSX(e.target.value)}
          />
          <input
            type='text'
            placeholder='sy 좌표'
            value={sy}
            onChange={(e) => setSY(e.target.value)}
          />
          <br />
          <input
            type='text'
            placeholder='ex 좌표'
            value={ex}
            onChange={(e) => setEX(e.target.value)}
          />
          <input
            type='text'
            placeholder='ey 좌표'
            value={ey}
            onChange={(e) => setEY(e.target.value)}
          />
          <button type='submit'>조회</button>
        </form>
      </div>
      {sortedData && isReady && (
        <div className='path-item'>
          <div className='path-subitem'>
            <button onClick={() => handleSortBy('averageCongestion')}>
              최소 혼잡도 순
            </button>
            <button onClick={() => handleSortBy('totalTime')}>
              최소 시간 순
            </button>
          </div>
          {sortedData.map((item, index) => (
            <div key={index} className='path-subitem'>
              <h3>{item.pathType}</h3>
              <div className='info-container'>
                <p className='info-item'>
                  <strong>출발 정류장(역): </strong>{' '}
                  {item.info.firstStartStation}
                </p>
                <p className='info-item'>
                  <strong>도착 정류장(역): </strong> {item.info.lastEndStation}
                </p>
              </div>
              <div className='info-container'>
                <p className='info-item'>
                  <strong>총 거리: </strong> {item.info.totalDistance / 1000}km
                </p>
                {item.info.totalTime > 59 ? (
                  <p className='info-item'>
                    <strong>총 소요 시간: </strong>{' '}
                    {parseInt(item.info.totalTime / 60)}시간{' '}
                    {item.info.totalTime % 60}분
                  </p>
                ) : (
                  <p className='info-item'>
                    <strong>총 소요 시간: </strong> {item.info.totalTime}분
                  </p>
                )}
                <p className='info-item'>
                  <strong>평균 혼잡도: </strong> {item.info.averageCongestion}%
                </p>
              </div>

              <button onClick={() => handleToggleSubPath(index)}>
                {visibleIndex === index ? '숨기기' : '자세히 보기'}
              </button>
              <div
                className={`subpath-container ${
                  visibleIndex === index ? 'visible' : ''
                }`}
              >
                {visibleIndex === index &&
                  item.subPath.map((subItem, subIndex) => (
                    <div key={subIndex} className='subpath-item'>
                      {subItem.trafficType === '도보' && [
                        <p>
                          <strong>
                            {subIndex + 1}. {subItem.trafficType}
                          </strong>
                        </p>,
                        <p>
                          <b>{subItem.distance}m</b> 이동
                        </p>,
                        <p>
                          <strong>소요 시간: </strong> {subItem.sectionTime} 분
                        </p>,
                      ]}
                      {subItem.trafficType === '버스' && [
                        <p>
                          <strong>
                            {subIndex + 1}. {subItem.trafficType} (
                            {subItem.stationCount}개 정류장 이동)
                          </strong>
                        </p>,
                        <p>
                          <b>{subItem.startName}</b> 탑승,{' '}
                          <b>{subItem.endName}</b> 하차
                        </p>,
                        subItem.lane.map((lineItem, lineIndex) => [
                          <p>
                            ({lineIndex + 1}) <b>{lineItem.busNo}번</b>
                          </p>,
                        ]),
                        subItem.arriveCongestion.map((arrItem, arrIndex) => [
                          <p>
                            ({arrIndex + 1}) {arrItem.arrMsg1}
                          </p>,
                          arrItem.busCongestion1 === 'no info' ? (
                            <p>
                              ({arrIndex + 1}) <strong>혼잡도: </strong> 정보가
                              없습니다.
                            </p>
                          ) : (
                            <p>
                              ({arrIndex + 1}) <strong>혼잡도: </strong>{' '}
                              {arrItem.busCongestion1}%
                            </p>
                          ),
                        ]),
                        item.info.totalTime > 59 ? (
                          <p>
                            <strong>소요 시간: </strong>{' '}
                            {parseInt(subItem.sectionTime / 60)}시간{' '}
                            {subItem.sectionTime % 60}분
                          </p>
                        ) : (
                          <p>
                            <strong>소요 시간: </strong> {subItem.sectionTime}분
                          </p>
                        ),
                      ]}
                      {subItem.trafficType === '지하철' && [
                        <p>
                          <strong>
                            {subIndex + 1}. {subItem.trafficType} (
                            {subItem.stationCount}개 정류장 이동)
                          </strong>
                        </p>,
                        subItem.lane.map((lineItem, lineIndex) => [
                          <p>
                            <strong>{lineItem.name}</strong>
                          </p>,
                        ]),
                        <p>
                          <b>{subItem.startName}역</b> 탑승,{' '}
                          <b>{subItem.endName}역</b> 하차
                        </p>,
                        subItem.arrive.map((arrItem, arrIndex) =>
                          arrItem.remainSt === '' ? (
                            <p>{arrItem.arvlMsg1}</p>
                          ) : (
                            <p>
                              {arrItem.arvlMsg1} [{arrItem.remainSt}번째 전]
                            </p>
                          )
                        ),
                        subItem.congestion.map((conItem, conIndex) =>
                          conItem.congestionTrain === 'no info' ? (
                            <p>
                              <strong>혼잡도: </strong> 정보가 없습니다.
                            </p>
                          ) : (
                            <p>
                              <strong>혼잡도: </strong>{' '}
                              {conItem.congestionTrain}%
                            </p>
                          )
                        ),
                        item.info.totalTime > 59 ? (
                          <p>
                            <strong>소요 시간: </strong>{' '}
                            {parseInt(subItem.sectionTime / 60)}시간{' '}
                            {subItem.sectionTime % 60}분
                          </p>
                        ) : (
                          <p>
                            <strong>소요 시간: </strong> {subItem.sectionTime}분
                          </p>
                        ),
                      ]}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPath;

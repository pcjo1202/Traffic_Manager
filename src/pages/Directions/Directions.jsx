/*global kakao*/
import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import MainArea from '../../components/MainArea/MainArea';
import styles from './Directions.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';

import axios from 'axios';

import {
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableRow,
  TableCell,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Directions = ({ Direct }) => {
  const [location, setLocation] = useState({ x: null, y: null });
  const [address, setAddress] = useState({
    start: '',
    end: '',
  });
  const [isActive, setIsActive] = useState(true);
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('averageCongestion'); // 초기 정렬 기준은 averageCongestion입니다
  const [isReady, setIsReady] = useState(false);

  const search_container = useRef();

  //검색 창 닫기
  useEffect(() => {
    // search_container.current.id = 'active';
  }, [isActive]);

  //현재 위치 받아옴
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

    // console.log(search_container.current);
    return () => location;
  }, []);

  //처음 렌더링 되어 현재 위치를 가져왔을 때 카카오 지도 표시
  useEffect(() => {
    FirstMap();
  }, [location]);

  const FirstMap = () => {
    const mapContainer = document.getElementById('map');
    const mapOptions = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(location.x, location.y), //지도의 중심좌표.
      level: 2, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴
  };

  // address를 전달하여 해당 주소의 좌표를 가져옴
  // address 형식 : 강원도 원주시 판부면 아랫거리길5
  // type은 start or end
  const getAddress = async (type, address) => {
    //검색한 주소 좌표 리턴
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    await geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].x, result[0].y);

        setAddress((prev) => {
          let newData = { ...prev };
          newData[type] = { x: String(coords.Ma), y: String(coords.La) };
          // newData[type] = { x: coords.Ma, y: coords.La};
          return newData;
        });

        searchResultMap(coords);
      } else {
        console.log('좌표 가져오지 못함');
      }
    });

    // return result;
  };

  const searchResultMap = (coords) => {
    console.log(coords);
    const mapContainer = document.getElementById('map');
    const mapOptions = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(address.start.x, address.start.y), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴
    // 결과값으로 받은 위치를 마커로 표시합니다
    const marker = new kakao.maps.Marker({
      map: map,
      position: coords,
    });

    // 인포윈도우로 장소에 대한 설명을 표시합니다
    const infowindow = new kakao.maps.InfoWindow({
      content:
        '<div style="width:150px;text-align:center;padding:6px 0;">출발지</div>',
    });
    infowindow.open(map, marker);

    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    map.setCenter(coords);
  };

  const handleSearch = async (start, end) => {
    try {
      await getAddress('start', start);
      await getAddress('end', end);

      const fetchedData = await Direct.search(address);
      setData(fetchedData);
      setIsReady(true);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSortBy = (key) => {
    setSortBy(key);
  };

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
    <MainArea>
      <Header title='길찾기' />
      <div id='map' style={{ width: '100%', height: '100%' }}></div>
      <div id='map2' style={{ width: '100%', height: '100%' }}></div>
      <div className={styles.search_container} ref={search_container}>
        <MainArea name='search'>
          <main className={styles.searchForm_container}>
            <div className={styles.onoff}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  isActive //
                    ? setIsActive(false)
                    : // e.target.value = '열기'
                      setIsActive(false);
                  // e.target.value = '숨기기'
                }}
              >
                숨기기
              </button>
            </div>
            {/* 검색한 내용을 좌표로 변환 */}
            <form
              className={styles.searchForm}
              onSubmit={(e) => {
                e.preventDefault();
                // const start = e.target.querySelector('#start').value;
                // const end = e.target.querySelector('#end').value;
                const start = '서울 송파구 올림픽로 지하 265';
                const end = '서울 강남구 남부순환로 2936';
                handleSearch(start, end);
              }}
            >
              <div className={styles.inputBox}>
                <SearchBar name='start' placeholder='출발지 검색...' />
                <SearchBar name='end' placeholder='도착지 검색...' />
              </div>

              <div className={styles.btn_box}>
                <input
                  className={styles.reset}
                  type='button'
                  value='다시 검색'
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#start').value = '';
                    document.querySelector('#end').value = '';
                  }}
                />
                <input
                  className={styles.searchBtn}
                  type='submit'
                  value='길찾기'
                />
              </div>
            </form>

            {/* 검색결과 */}
            {sortedData && isReady && (
              <div className={styles.result}>
                <div>
                  <div>
                    <Button
                      onClick={() => handleSortBy('averageCongestion')}
                      variant='outlined'
                    >
                      최소 혼잡도 순
                    </Button>
                    <Button
                      onClick={() => handleSortBy('totalTime')}
                      variant='outlined'
                    >
                      최소 시간 순
                    </Button>
                  </div>
                </div>
                {sortedData.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant='h6' sx={{ width: '100%' }}>
                        {item.pathType}
                      </Typography>
                      <Typography align='right'>
                        평균 혼잡도: {item.info.averageCongestion}%
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <div>
                          <Typography>
                            <strong>출발 정류장: </strong>
                            {item.info.firstStartStation}
                          </Typography>
                          <Typography>
                            <strong>도착 정류장: </strong>
                            {item.info.lastEndStation}
                          </Typography>
                        </div>
                        <div>
                          <Typography>
                            <strong>총 거리: </strong>
                            {item.info.totalDistance / 1000}km
                          </Typography>
                          {item.info.totalTime > 59 ? (
                            <Typography>
                              <strong>총 소요 시간: </strong>
                              {parseInt(item.info.totalTime / 60)}시간{' '}
                              {item.info.totalTime % 60}분
                            </Typography>
                          ) : (
                            <Typography>
                              <strong>총 소요 시간: </strong>
                              {item.info.totalTime}분
                            </Typography>
                          )}
                        </div>
                        <div className='subpath-container'>
                          {item.subPath.map((subItem, subIndex) => (
                            <div key={subIndex} className='subpath-item'>
                              {subItem.trafficType === '도보' && (
                                <div>
                                  <Typography>
                                    <strong>
                                      {subIndex + 1}. {subItem.trafficType}
                                    </strong>
                                  </Typography>
                                  <Typography>
                                    <b>{subItem.distance}m</b> 이동
                                  </Typography>
                                  <Typography>
                                    <strong>소요 시간: </strong>
                                    {subItem.sectionTime}분
                                  </Typography>
                                </div>
                              )}
                              {subItem.trafficType === '버스' && (
                                <div>
                                  <Typography>
                                    <strong>
                                      {subIndex + 1}. {subItem.trafficType} (
                                      {subItem.stationCount}개 정류장 이동)
                                    </strong>
                                  </Typography>
                                  <Typography>
                                    <b>{subItem.startName}</b> 탑승,{' '}
                                    <b>{subItem.endName}</b> 하차
                                  </Typography>
                                  <TableContainer variant='outlined'>
                                    <Table>
                                      <TableRow>
                                        {subItem.lane.map(
                                          (lineItem, lineIndex) => (
                                            <TableCell>
                                              <Typography key={lineIndex}>
                                                <b>{lineItem.busNo}번</b>
                                              </Typography>
                                            </TableCell>
                                          )
                                        )}
                                      </TableRow>
                                      <TableRow>
                                        {subItem.arriveCongestion.map(
                                          (arrItem, arrIndex) =>
                                            arrItem.busCongestion1 ===
                                            'no info' ? (
                                              <TableCell>
                                                <Typography key={arrIndex}>
                                                  <strong>혼잡도: </strong>{' '}
                                                  정보가 없습니다.
                                                </Typography>
                                              </TableCell>
                                            ) : (
                                              <TableCell>
                                                <Typography key={arrIndex}>
                                                  <strong>혼잡도: </strong>{' '}
                                                  {arrItem.busCongestion1}%
                                                </Typography>
                                              </TableCell>
                                            )
                                        )}
                                      </TableRow>
                                    </Table>
                                  </TableContainer>
                                  {item.info.totalTime > 59 ? (
                                    <Typography>
                                      <strong>소요 시간: </strong>
                                      {parseInt(
                                        subItem.sectionTime / 60
                                      )}시간 {subItem.sectionTime % 60}분
                                    </Typography>
                                  ) : (
                                    <Typography>
                                      <strong>소요 시간: </strong>
                                      {subItem.sectionTime}분
                                    </Typography>
                                  )}
                                </div>
                              )}
                              {subItem.trafficType === '지하철' && (
                                <div>
                                  <Typography>
                                    <strong>
                                      {subIndex + 1}. {subItem.trafficType} (
                                      {subItem.stationCount}개 정류장 이동)
                                    </strong>
                                  </Typography>
                                  <Typography>
                                    <b>{subItem.startName}역</b> 탑승,{' '}
                                    <b>{subItem.endName}역</b> 하차
                                  </Typography>
                                  <TableContainer variant='outlined'>
                                    <Table>
                                      <TableRow>
                                        {subItem.lane.map(
                                          (lineItem, lineIndex) => (
                                            <TableCell>
                                              <Typography key={lineIndex}>
                                                <strong>{lineItem.name}</strong>
                                              </Typography>
                                            </TableCell>
                                          )
                                        )}
                                      </TableRow>
                                      <TableRow>
                                        {subItem.congestion.map(
                                          (conItem, conIndex) =>
                                            conItem.congestionTrain ===
                                            'no info' ? (
                                              <TableCell>
                                                <Typography key={conIndex}>
                                                  <strong>혼잡도: </strong>{' '}
                                                  정보가 없습니다.
                                                </Typography>
                                              </TableCell>
                                            ) : (
                                              <TableCell>
                                                <Typography key={conIndex}>
                                                  <strong>혼잡도: </strong>{' '}
                                                  {conItem.congestionTrain}%
                                                </Typography>
                                              </TableCell>
                                            )
                                        )}
                                      </TableRow>
                                    </Table>
                                  </TableContainer>
                                  {item.info.totalTime > 59 ? (
                                    <Typography>
                                      <strong>소요 시간: </strong>
                                      {parseInt(
                                        subItem.sectionTime / 60
                                      )}시간 {subItem.sectionTime % 60}분
                                    </Typography>
                                  ) : (
                                    <Typography>
                                      <strong>소요 시간: </strong>
                                      {subItem.sectionTime}분
                                    </Typography>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            )}
          </main>
        </MainArea>
      </div>
    </MainArea>
  );
};

export default Directions;

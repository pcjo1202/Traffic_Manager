import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
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

function SearchPath() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('averageCongestion'); // 초기 정렬 기준은 averageCongestion입니다
  const [isReady, setIsReady] = useState(false);

  const [sx, setSX] = useState('');
  const [sy, setSY] = useState('');
  const [ex, setEX] = useState('');
  const [ey, setEY] = useState('');

  const handleSortBy = (key) => {
    setSortBy(key);
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
      const token = localStorage.getItem('authToken');
      const response = await axios.post(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          sx: sx,
          sy: sy,
          ex: ex,
          ey: ey,
        },
      });
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
    <Container maxWidth='sm'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchDataFromAPI();
        }}
      >
        <Button type='submit' variant='contained' color='primary'>
          조회
        </Button>
      </form>

      {sortedData && isReady && (
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
                                  {subItem.lane.map((lineItem, lineIndex) => (
                                    <TableCell>
                                      <Typography key={lineIndex}>
                                        <b>{lineItem.busNo}번</b>
                                      </Typography>
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  {subItem.arriveCongestion.map(
                                    (arrItem, arrIndex) =>
                                      arrItem.busCongestion1 === 'no info' ? (
                                        <TableCell>
                                          <Typography key={arrIndex}>
                                            <strong>혼잡도: </strong> 정보가
                                            없습니다.
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
                                {parseInt(subItem.sectionTime / 60)}시간{' '}
                                {subItem.sectionTime % 60}분
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
                                  {subItem.lane.map((lineItem, lineIndex) => (
                                    <TableCell>
                                      <Typography key={lineIndex}>
                                        <strong>{lineItem.name}</strong>
                                      </Typography>
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  {subItem.congestion.map((conItem, conIndex) =>
                                    conItem.congestionTrain === 'no info' ? (
                                      <TableCell>
                                        <Typography key={conIndex}>
                                          <strong>혼잡도: </strong> 정보가
                                          없습니다.
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
                                {parseInt(subItem.sectionTime / 60)}시간{' '}
                                {subItem.sectionTime % 60}분
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
    </Container>
  );
}

export default SearchPath;

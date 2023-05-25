import axios from 'axios';

class Directions {
  //뭘까
  search(sx, sy, ex, ey) {
    const url = '/api/check/searchPath';

    const config = { 'Content-Type': 'application/json' };

    const data = {
      sx: sx,
      sy: sy,
      ex: ex,
      ey: ey,
    };

    axios
      .post(url, data, config) //
      .then(console.log) //아마 전달 되는 값은 없을 듯
      .catch(console.log);
  }

  /**
   *
   */

  // 버스 정류장 검색
  searchBus(name) {
    const url = '/api/trans/searchBus';

    const config = { 'Content-Type': 'application/json' };

    const data = {
      name: name, //검색할 정류장 이름
    };

    axios
      .get(url, data, config) //
      .then(console.log) //아마 전달 되는 값은 없을 듯
      .catch(console.log);
  }

  // 지하철역 검색 정류장 검색
  searchSubway(name) {
    const url = '/api/trans/searchPath';

    const config = { 'Content-Type': 'application/json' };

    const data = {
      name: '', //검색할 정류장 이름
    };

    axios
      .get(url, data, config) //
      .then(console.log) //아마 전달 되는 값은 없을 듯
      .catch(console.log);
  }

  //현재 위치 250안에 위치한 버스정류장 ,지하철역 혼잡도
  nearby(x, y) {
    const url = '/api/check/nearby';

    const config = { 'Content-Type': 'application/json' };

    const data = {
      name: '', //검색할 정류장 이름
    };

    axios
      .get(url, data, config) //
      .then(console.log) //아마 전달 되는 값은 없을 듯
      .catch(console.log);
  }
}

export default Directions;

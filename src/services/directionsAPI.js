import axios from 'axios';

class Directions {
  async search(address) {
    try {
      console.log(address);

      const url = 'api/trans/searchPath';

      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        url,
        {
          sx: address.start.x,
          sy: address.start.y,
          ex: address.end.x,
          ey: address.end.y,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  //버스 정류장 검색
  async searchBus(name) {
    try {
      const url = '/api/trans/searchBus';
      const config = { 'Content-Type': 'application/json' };
      const param = {
        name: name, //검색할 정류장 이름
      };

      const response = await axios.get(url, param, config);
    } catch (err) {}
  }
  // 지하철역 검색 정류장 검색
  async searchSubway(name) {
    const url = '/api/trans/searchPath';
    const config = { 'Content-Type': 'application/json' };
    const param = {
      name: name, //검색할 정류장 이름
    };

    const response = await axios.get(url, param, config);
  }

  //근처 뭐가 있는지
  async nearby(x, y) {
    const token = localStorage.getItem('authToken');

    const url = '/api/check/nearby';

    try {
      const response = await axios.get(
        url,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      const bus = response.data.Bus;
      const subway = response.data.Subway;

      return { bus, subway };
    } catch (error) {
      console.log(error);
      return { bus: [], subway: [] };
    }
  }
}

export default Directions;

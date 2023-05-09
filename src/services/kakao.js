import axios from 'axios';

const apikey = process.env.REACT_APP_KAKAO_APIKEY;

export class Kakao {
  constructor(params) {}

  getMap() {
    axios
      .get(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}`, {
        withCredentials: true,
      })
      .then(console.log);
  }
}

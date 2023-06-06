import axios from 'axios';

class AuthApi {
  // constructor(userId, pwd, data, email) {
  //   this.userId = userId;
  //   this.pwd = pwd;
  //   this.data = data;
  //   this.email = email;
  // }
  test() {
    console.log('test');
  }

  // POST , 서버에 로그인 시
  async login(userId, pwd) {
    console.log('로그인 시도');
    try {
      const url = '/api/users/login';

      const data = {
        id: userId,
        pw: pwd,
      };

      const config = { 'Content-Type': 'application/json' };

      const response = await axios.post(url, data, config);

      console.log(response);

      if (response.status === 200) {
        //로그인 성공시
        console.log('성공');
        const token = response.headers.authorization;

        //성공시 토큰 저장
        localStorage.setItem('authToken', token);
      }
    } catch (error) {
      alert(error.response.data['msg']);
      console.error(error.response.data);
      // 로그인 실패 응답 데이터
    }
  }

  join(email, name, userId, pwd) {
    const url = '/api/users/join';

    const config = { 'Content-Type': 'application/json' };

    const data = {
      name: name,
      id: userId,
      pw: pwd,
      email: email,
    };

    axios
      .post(url, data, config) //
      .then(console.log) //아마 전달 되는 값은 없을 듯
      .catch(console.log);
  }

  logout() {
    //세션이나 쿠키에 저장되어있는 정보를 삭제함
    localStorage.removeItem('authToken');
  }

  // 세션에 저장되어있는 토큰을 전달하여, 해당 유저에 대한 정보를 가져온다.
  async getUserInfo(pwd) {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios({
        url: 'api/users/info',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: pwd,
      });

      const status = response.status;

      response.then(console.log);
      if (status === 200) {
        console.log('성공');
      } else if (status === 403) {
        console.log('토큰 만료');
      }
    } catch {}
  }
}

export default AuthApi;

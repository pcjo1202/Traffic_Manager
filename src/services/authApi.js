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
  login(userId, pwd) {
    const url = '/api/users/login';

    const data = {
      id: userId,
      pw: pwd,
    };

    const config = { 'Content-Type': 'application/json' };

    axios
      .post(url, data, config)
      .then(console.log)
      //인증 성공시: 인증토큰을 전달 받을 듯 이걸 세션이나 쿠키에 저장하면 될듯
      //인증 실패시: 에러 문구 전달??
      .catch(console.log);
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
  }

  // 세션에 저장되어있는 토큰을 전달하여, 해당 유저에 대한 정보를 가져온다.
  getUserId(token) {
    const url = '/api/users/info';

    const config = { 'Content-Type': 'application/json' };

    axios
      .get(url, config) //
      .then(console.log)
      .catch(console.log);
  }
}

export default AuthApi;

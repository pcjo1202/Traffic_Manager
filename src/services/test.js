// components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/users/login', {
        id: username,
        pw: password,
      });
      // 로그인 성공 시에 수행할 동작
      if (response.status === 200) {
        // setIsLoggedIn(true);
        dispatch({ type: 'LOGIN' });
        dispatch({
          type: 'SET_TOKEN',
          payload: response.headers['authorization'],
        });
        navigate('/');
        // setToken(response.headers['authorization']);
      }
      console.log(response.data); // 로그인 성공 응답 데이터

      // TODO: 로그인 성공 후에 필요한 동작 수행
    } catch (error) {
      // 로그인 실패 시에 수행할 동작
      alert(error.response.data['msg']);
      console.error(error.response.data); // 로그인 실패 응답 데이터

      // TODO: 로그인 실패 후에 필요한 동작 수행
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type='submit'>로그인</button>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>Signup</Link>
      </p>
    </div>
  );
}

export default Login;

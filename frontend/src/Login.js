import React, { useState } from 'react';
import api from './api';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { username, password });
      setToken(res.data.access_token);
    } catch (e) {
      setMsg('用户名或密码错误');
    }
  };
  return (
    <div>
      <h2>登录</h2>
      <input placeholder="用户名" value={username} onChange={e => setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>登录</button>
      <div style={{color:'red'}}>{msg}</div>
    </div>
  );
}
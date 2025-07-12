import React, { useState } from 'react';
import api from './api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { username, password });
      setMsg('注册成功，请登录');
    } catch (e) {
      setMsg('注册失败，用户名已存在');
    }
  };
  return (
    <div>
      <h2>注册</h2>
      <input placeholder="用户名" value={username} onChange={e => setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleRegister}>注册</button>
      <div style={{color:'red'}}>{msg}</div>
    </div>
  );
}
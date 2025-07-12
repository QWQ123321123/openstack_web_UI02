import React, { useEffect, useState } from 'react';
import api from './api';

export default function Servers({ token }) {
  const [servers, setServers] = useState([]);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    api.get('/os/servers', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setServers(res.data));
  }, [token]);
  const handleAction = (id, action) => {
    api.post(`/os/servers/${id}/action`, { action }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setMsg('操作成功');
        setTimeout(() => setMsg(''), 1000);
        // 刷新
        api.get('/os/servers', { headers: { Authorization: `Bearer ${token}` } })
          .then(res => setServers(res.data));
      });
  };
  return (
    <div>
      <h2>云主机列表</h2>
      <div style={{color:'green'}}>{msg}</div>
      <table border="1">
        <thead>
          <tr>
            <th>名称</th><th>状态</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          {servers.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.status}</td>
              <td>
                <button onClick={() => handleAction(s.id, 'start')}>开机</button>
                <button onClick={() => handleAction(s.id, 'stop')}>关机</button>
                <button onClick={() => handleAction(s.id, 'delete')}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
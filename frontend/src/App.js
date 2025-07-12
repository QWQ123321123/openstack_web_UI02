import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Servers from './Servers';

function App() {
  const [token, setToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <div>
        {showRegister ? <Register /> : <Login setToken={setToken} />}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? '已有账号？去登录' : '没有账号？去注册'}
        </button>
      </div>
    );
  }
  return <Servers token={token} />;
}

export default App;
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.132:5001/api', // 部署时改为后端实际地址
});

export default api;
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : 'https://my-json-server.typicode.com/juanvl/rocketshoesweb/';

const api = axios.create({
  baseURL,
});

export default api;

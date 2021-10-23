import axios from 'axios';

const publicFetch = axios.create({
  baseURL: process.env.REACT_APP_SERVERLESS_URL,
});

export { publicFetch };

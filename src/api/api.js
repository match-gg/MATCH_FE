import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_SEVER_BASE_URL}`,
  timeout : 3000,
});

import axios from 'axios';
import Logger from '../../node_modules/_chivy@0.1.7@chivy';
const log = new Logger('utils/myutils');

const service = axios.create({
  baseURL: '/rest/shop',
  timeout: 5000
});

service.interceptors.request.use(config => {
  return config;
});

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      log.error('response status code is ' + response.status + '.');
      return Promise.reject(new Error('response status code is ' + response.status + '.'));
    }
  },
  error => {
    log.error('error be found ' + JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default service;

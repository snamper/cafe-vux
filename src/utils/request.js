import axios from 'axios';
/* import qs from 'qs'; */
import Logger from 'chivy';
const log = new Logger('utils/request');

const service = axios.create({
  baseURL: '/rest/shop',
  timeout: 5000
});

/* service.interceptors.request.use(config => {
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    config.headers = {
      'Content-Type': 'application/x-www.form-urlencoded'
    };
    return config;
  };
}); */

service.interceptors.response.use(
  response => {
    // log.warn(response);
    if (response.status === 200) {
      // log.debug('RESPONSE IS ' + JSON.stringify(response.data));
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

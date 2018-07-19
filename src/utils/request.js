import axios from 'axios';
import Tools from './tools';
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
    /**
     * 当前HTTP返回不是200则返回error，如果是200则看success或者是status是否为真，如果真则返回数据
     */
    if (response.status === 200) {
      const data = response.data;
      if (Tools.isEmpty(data.success)) {
        return data;
      } else if (data.success) {
        return data;
      } else {
        return Promise.reject(new Error('[success is ' + data.success + '] && [status is ' + data.status + '].'));
      }
    } else {
      // log.error('response status code is ' + response.status + '.');
      return Promise.reject(new Error('response status code is ' + response.status + '.'));
    }
  },
  error => {
    log.error('error be found ' + JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default service;

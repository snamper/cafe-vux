import axios from 'axios';
import Tools from './tools';
import { Toast } from 'vant';
/* import qs from 'qs'; */
import Logger from 'chivy';
const log = new Logger('utils/request');

const service = axios.create({
  baseURL: '/rest/shop',
  timeout: 5000
});

const setMessage = message => {
  log.warn('toast or other ' + message);
  Toast({
    type: 'fail',
    position: 'middle',
    message: message,
    mask: true,
    forbidClick: true,
    duration: 5000
  });
};

service.interceptors.request.use(config => {
  /* config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    config.headers = {
      'Content-Type': 'application/x-www.form-urlencoded'
    };
    return config;
  }; */
  log.debug('url is ' + JSON.stringify(config.url));
  log.debug('data is ' + JSON.stringify(config.data));
  return config;
});

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const data = response.data;
      log.debug('data is array ? ' + Array.isArray(data));
      if (Array.isArray(data) || Tools.isEmpty(data.success) || (Tools.isNotEmpty(data.success) && data.success)) {
        log.debug('success revice data and return value');
        return data;
      }
      if (Tools.isEmpty(data.success)) {
        setMessage('没有Success返回，请检查服务器返回值');
        return Promise.reject(JSON.stringify({type: 'undefined'}));
      } else if (!data.success) {
        // setMessage('操作失败');
        return Promise.reject(JSON.stringify({type: 'false'}));
      }
    } else {
      setMessage('服务器发生故障，请稍后再试');
      return Promise.reject(JSON.stringify({type: response.status}));
    }
  },
  error => {
    setMessage('服务器访问超时，请联系管理员');
    log.error('error be found ' + JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default service;

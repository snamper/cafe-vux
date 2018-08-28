import axios from 'axios';
/* import qs from 'qs'; */
import { toast } from './toast';
import Logger from 'chivy';
const log = new Logger('utils/request');

const service = axios.create({
  baseURL: '/rest/shop',
  timeout: 5000
});

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
      const status = data.envData.responseStatusCode;
      switch (status) {
        case '200':
          if (data.data.length === 1) {
            return data.data[0];
          } else {
            return data.data;
          }
        case '4001':
          toast('服务器故障，查询不到数据');
          return Promise.reject(JSON.stringify({type: status}));
        case '4002':
          toast('创建失败');
          return Promise.reject(JSON.stringify({type: status}));
        case '4003':
          toast('修改失败');
          return Promise.reject(JSON.stringify({type: status}));
        case '4004':
          toast('删除失败');
          return Promise.reject(JSON.stringify({type: status}));
        case '10001':
          toast('分类下有商品，删除失败');
          return Promise.reject(JSON.stringify({type: status}));
        case '10002':
          toast('没有找到相关商品');
          return Promise.reject(JSON.stringify({type: status}));
        case '10003':
          toast('没有找到购买记录');
          return Promise.reject(JSON.stringify({type: status}));
        case '10004':
          toast('购买记录状态更新失败');
          return Promise.reject(JSON.stringify({type: status}));
        case '10005':
          toast('订单状态未改变');
          return Promise.reject(JSON.stringify({type: status}));
        case '10006':
          toast('设置默认地址失败');
          return Promise.reject(JSON.stringify({type: status}));
        case '20001':
          toast('用户不存在');
          return Promise.reject(JSON.stringify({type: status}));
        case '20002':
          toast('提交了空数据');
          return Promise.reject(JSON.stringify({type: status}));
        case '20003':
          toast('用户已经存在');
          return Promise.reject(JSON.stringify({type: status}));
        case '20004':
          toast('登录失败，请检查用户名和密码');
          return Promise.reject(JSON.stringify({type: status}));
        case '30001':
          toast('积分等级已存在');
          return Promise.reject(JSON.stringify({type: status}));
        case '30002':
          toast('积分不存在');
          return Promise.reject(JSON.stringify({type: status}));
        case '30003':
          toast('积分不足');
          return Promise.reject(JSON.stringify({type: status}));
      }
    } else {
      toast('服务器发生故障[' + response.status + ']，请稍后再试', 'fail');
      return Promise.reject(JSON.stringify({type: response.status}));
    }
  },
  error => {
    // toast('服务器访问超时，请联系管理员', 'fail');
    log.error('error be found ' + JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default service;

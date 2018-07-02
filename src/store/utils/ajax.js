import axios from 'axios';
import Logger from 'chivy';
import { isObjNotEmpty } from '@/utils/utils';
const log = new Logger('common/js/ajax');

export const ajax = (url, payload = '') => {
  return new Promise((resolve, reject) => {
    log.debug('The ajax post url is (' + url + ') and post data is (' + JSON.stringify(payload) + ')');
    axios.post(url, payload).then(resp => {
      if (resp.status === 200) {
        const data = resp.data;
        log.debug('The response data is ' + JSON.stringify(data));
        isObjNotEmpty(data) ? resolve(data) : reject(new Error('response data is empty'));
      } else {
        reject(new Error('request url(' + url + ') response status code is ' + resp.status + '.'));
      }
    }).catch(error => {
      reject(new Error(error));
    });
  });
};

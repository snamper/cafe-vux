import WebStorageCache from 'web-storage-cache';
import Logger from 'chivy';
import Tools from './tools';
const wsCache = new WebStorageCache();
const uuidv4 = require('uuid/v4');
const log = new Logger('utils/storage');

const key = {
  member: 'member',
  uuid: 'uuid'
};

export const setStorage = data => {
  var nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  wsCache.set(data.key, data.value, { exp: nextMonth });
};

export const getStorage = key => wsCache.get(key);

export const delStorage = key => wsCache.delete(key);

export const getUuid = () => uuidv4();

// 初始化storage
export const initStorage = () => {
  return new Promise(resolve => {
    /* eslint-disable */
    // debugger
    let result = {};
    const member = getStorage(key.member);
    if (Tools.isNotEmpty(member)) {
      result = {uuid: null, member: member};
    } else {
      let uuid = getStorage(key.uuid);
      if (Tools.isEmpty(uuid)) {
        uuid = uuidv4();
        log.debug('UUID is ' + uuid);
        setStorage({key: key.uuid, value: uuid});
      }
      result = {uuid: uuid, member: null};
    }
    resolve(result);
  });
};
// 登陆成功后
export const setMember = value => {
  delStorage(key.uuid);
  setStorage({key: key.member, value: value});
};

// 注销成功后
export const setUuid = () => {
  delStorage(key.member);
  const uuid = uuidv4();
  setStorage({key: key.uuid, value: uuidv4()});
  return uuid;
};

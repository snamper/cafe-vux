import WebStorageCache from 'web-storage-cache';
import Logger from 'chivy';
import logger from './logger';
const wsCache = new WebStorageCache();
const log = new Logger('utils/storage');
const uuidv4 = require('uuid/v4');

const ops = {
  set: 'set',
  get: 'get',
  remove: 'remove',
  uuid: 'uuid',
  member: 'member',
  init: 'init'
};

/**
 * localStorage
 * @param {*} type 类型，set/get/remove
 * @param {*} key key(uuid, member)
 * @param {*} value 值（remove的时候可以不用输入)
 */
function storage(type, key, value) {
  if (type === ops.set) {
    log.info(logger('set key(', key, ') to storage'));
    // 设置过期时间一个月
    var nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    wsCache.set(key, value, {exp: nextMonth});
  } else if (type === ops.get) {
    log.info(logger('get key(', key, ') from storage'));
    return wsCache.get(key);
  } else if (type === ops.remove) {
    log.info(logger('remove key(', key, ') from storage'));
    wsCache.delete(key);
  }
};

/**
 * 初始化State中的User
 * 1.读取LocalStoage是否存在MemberInfo数据，如果有则返回User对象
 * 2. 没有数据则生成UUID数据并写入到LocalStoage中
 */
function init() {
  const member = storage(ops.get, ops.member);
  if (member !== null) {
    log.debug('read member data which from localStorage is ' + logger(member));
    return {uuid: null, member: member};
  } else {
    let uuid = storage(ops.get, ops.uuid);
    if (uuid === null) {
      uuid = uuidv4();
      log.debug('UUID is ' + logger(uuid));
      storage(ops.set, ops.uuid, uuid);
    }
    return {uuid: uuid, member: null};
  }
};
/**
 * 登陆成功后的操作
 * @param {*} state mutations中的state
 * @param {*} value member的值
 */
function member(state, value) {
  /*
  * 1. 删除state和localstorage中的uuid
  * 2. 新增state和localstorage中的memberinfo
  */
  state.User.uuid = null;
  storage('remove', 'uuid');
  state.User.member = value;
  storage('set', 'member', value);
}
/**
 * 注销后的操作
 * @param {*} state mutations中的state
 */
function clearmember(state) {
  state.User.member = null;
  storage('remove', 'member');
  const uuid = uuidv4();
  state.User.uuid = uuid;
  storage('set', 'uuid', uuid);
}

export { init, member, clearmember };

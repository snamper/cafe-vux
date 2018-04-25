import axios from 'axios';
import Logger from 'chivy';
import { consts } from './consts';
import WebStorageCache from 'web-storage-cache';
const log = new Logger('common/js/util');
const wsCache = new WebStorageCache();

/**
 * ajax请求函数，promise的返回
 * @param {*} url
 * @param {*} param
 * @param {*} flag
 */
export function ajaxPost(url, param) {
    return new Promise((resolve, reject) => {
        log.debug('get (' + url + ') post data is ' + JSON.stringify(param));
        axios.http.post(url, param).then((response) => {
            let result = response.data;
            log.debug('get (' + url + ') response data is ' + JSON.stringify(result));
            if (result === null) {
                reject(new Error('get url(' + url + ') is failed by '));
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * ajax请求函数，promise的返回
 * @param {*} url
 * @param {*} flag
 */
export function ajaxGet(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            let result = response.data;
            log.debug('get (' + url + ') response data is ' + JSON.stringify(result));
            if (result === null) {
                reject(new Error('get url(' + url + ') is failed by '));
            } else {
                resolve(result);
            }
        });
    });
}

// 设置sessionStorage的键值对
export function setSessionStorage(key, value) {
    log.info('set key(' + key + ') to sessionStorage');
    // 设置过期时间一个月
    var nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    wsCache.set(key, JSON.stringify(value), {exp: nextMonth});
    // sessionStorage.setItem(key, JSON.stringify(value));
};
// 根据key获取sessionStorage的值
export function getSessionStorage(key) {
    log.info('get key(' + key + ') from sessionStorage');
    return wsCache.get(key);
    // return JSON.parse(sessionStorage.getItem(key));
};

// 移除sessionStorage的key
export function removeSessionStorage(key) {
    log.info('remove key(' + key + ') from sessionStorage');
    wsCache.delete(key);
    // sessionStorage.removeItem(key);
};

export function gender(value) {
    if (value === consts.sex.man.key) {
        return consts.sex.man.value;
    } else if (value === consts.sex.woman.key) {
        return consts.sex.woman.value;
    } else if (value === consts.sex.man.value) {
        return consts.sex.man.key;
    } else if (value === consts.sex.woman.value) {
        return consts.sex.woman.key;
    } else {
        return undefined;
    }
};

export function setMemberInfo(data, thd) {
    let memberInfo = {
        'third': thd,
        'id': data.id,
        'nick': data.nick,
        'name': data.name,
        'point': data.point,
        'balance': data.balance,
        'gender': gender(data.gender),
        'phone': data.mobile,
        'email': data.email,
        'area': data.area,
        'address': data.address,
        'createTime': data.createTime
    };
    return memberInfo;
};

export function setModifyMemberData(param) {
    let data = null;
    if (param.type === consts.expressType.name) {
        data = {
            userId: param.userId,
            name: param.name
        };
    } else if (param.type === consts.expressType.nick) {
        data = {
            userId: param.userId,
            nick: param.nick
        };
    } else if (param.type === consts.expressType.mobile) {
        data = {
            userId: param.userId,
            mobile: param.mobile
        };
    } else if (param.type === consts.expressType.gender) {
        data = {
            userId: param.userId,
            gender: param.gender
        };
    } else if (param.type === consts.expressType.email) {
        data = {
            userId: param.userId,
            email: param.email
        };
    } else if (param.type === consts.expressType.address) {
        data = {
            userId: param.userId,
            address: param.address
        };
    } else if (param.type === consts.expressType.detailAddress) {
        data = {
            userId: param.userId,
            detailAddress: param.detailAddress
        };
    }
    return data;
};

import axios from 'axios';
import Logger from 'chivy';
import { consts } from './const';
import { querystring } from 'vux';
import WebStorageCache from 'web-storage-cache';
const log = new Logger('common/js/util');
const wsCache = new WebStorageCache();

/**
 * ajax请求函数，promise的返回
 * @param {*} url 
 * @param {*} param 
 * @param {*} flag 
 */
function ajaxPost(url, param, flag) {
    return new Promise((resolve, reject) => {
        log.debug('get (' + url + ') post data is ' + JSON.stringify(param));
        axios.http.post(url, param).then((response) => {
            let result = response.data;
            log.debug('get (' + url + ') response data is ' + JSON.stringify(result));
            if (result === null) {
                reject(new Error('get url(' + url + ') is failed by '));
            } else if (result !== null && flag !== null && result.flag) {
                reject(new Error('get url(' + url + ') is failed by ' + flag + ' is incorrect'));
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * ajax请求函数，promise的返回
 * @param {*} url 
 * @param {*} param 
 * @param {*} flag 
 */
function ajaxGet(url, param, flag) {
    return new Promise((resolve, reject) => {
        log.debug('get (' + url + ') post data is ' + JSON.stringify(param));
        axios.get(url, param).then((response) => {
            let result = response.data;
            log.debug('get (' + url + ') response data is ' + JSON.stringify(result));
            if (result === null) {
                reject(new Error('get url(' + url + ') is failed by '));
            } else if (result !== null && flag !== null && result.flag) {
                reject(new Error('get url(' + url + ') is failed by ' + flag + ' is incorrect'));
            } else {
                resolve(result);
            }
        });
    });
}

// 设置sessionStorage的键值对
function setSessionStorage(key, value) {
    log.info('set key(' + key + ') to sessionStorage');
    // 设置过期时间一个月
    var nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    wsCache.set(key, JSON.stringify(value), {exp: nextMonth});
    // sessionStorage.setItem(key, JSON.stringify(value));
};
// 根据key获取sessionStorage的值
function getSessionStorage(key) {
    log.info('get key(' + key + ') from sessionStorage');
    return wsCache.get(key);
    // return JSON.parse(sessionStorage.getItem(key));
};
// 移除sessionStorage的key
function removeSessionStorage(key) {
    log.info('remove key(' + key + ') from sessionStorage');
    wsCache.delete(key);
    // sessionStorage.removeItem(key);
};

// 根据long时间获取具体的年月日时分秒
function formatDate(date) {
    var datetime = new Date(date);
    var format = {
        Year: 1900 + datetime.getYear(),
        Month: (datetime.getMonth() + 1),
        Day: datetime.getDate(),
        Hour: datetime.getHours(),
        Minute: datetime.getMinutes(),
        Second: datetime.getSeconds()
    };
    log.debug('before add zero pre ' + JSON.stringify(format));
    if (format.Month <= 9) {
        format.Month = '0' + format.Month;
    }
    if (format.Day <= 9) {
        format.Day = '0' + format.Day;
    }
    if (format.Hour <= 9) {
        format.Hour = '0' + format.Hour;
    }
    if (format.Minute <= 9) {
        format.Minute = '0' + format.Minute;
    }
    if (format.Second <= 9) {
        format.Second = '0' + format.Second;
    }
    log.debug('after add zero pre' + JSON.stringify(format));
    return format;
};
// 根据服务端返回的数据存储男女
function gender(value) {
    if (value === consts.sex.MAN.key) {
        return consts.sex.MAN.value;
    } else if (value === consts.sex.WOMEN.key) {
        return consts.sex.WOMEN.value;
    } else if (value === consts.sex.MAN.value) {
        return consts.sex.MAN.key;
    } else if (value === consts.sex.WOMEN.value) {
        return consts.sex.WOMEN.key;
    } else {
        return undefined;
    }
};
// 根据返回状态显示内容
function covertStatus(status) {
    if (status === consts.exchangeType.NOTPAY.key) {
        return consts.exchangeType.NOTPAY.value;
    } else if (status === consts.exchangeType.SUCCESS.key) {
        return consts.exchangeType.SUCCESS.value;
    } else if (status === consts.exchangeType.REFUND.key) {
        return consts.exchangeType.REFUND.value;
    } else if (status === consts.exchangeType.CLOSED.key) {
        return consts.exchangeType.CLOSED.value;
    } else if (status === consts.exchangeType.PAYERROR.key) {
        return consts.exchangeType.PAYERROR.value;
    }
};
// 对象是否为空
function isObjEmpty(obj) {
    if (obj === null || obj === '' || typeof (obj) === 'undefined') {
        return true;
    } else {
        return false;
    }
};
// 判断当前页面是否包含相关信息
function isCurrentJumpPage(url) {
    // 判断是否是从正确的跳转页过来的
    var urlArray = url.split('?');
    if (urlArray.length === 2) {
        var idStr = urlArray[1];
        return querystring.parse(idStr);
    } else {
        return null;
    }
};
// 根据图片大小获取图片地址
function renameImagePath(url, size) {
    if (!isObjEmpty(url)) {
        // log.debug('param url is ' + url);
        var urlArray = url.split('.');
        // log.debug('split array is ' + JSON.stringify(urlArray));
        var current = urlArray[0] + '_' + size + 'X' + size + '.' + urlArray[1];
        return current;
    }
    return null;
};
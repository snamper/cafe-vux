import { exchangeType, sex } from './values';
import Logger from 'chivy';
import WebStorageCache from 'web-storage-cache';
import { AjaxPlugin, querystring } from 'vux';
import Vue from 'vue';
Vue.use(AjaxPlugin);
const log = new Logger('common/js/util');
const wsCache = new WebStorageCache();

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

// 根据long时间获取具体的年月日时分秒
export function formatDate(date) {
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
export function gender(value) {
    if (value === sex.man.key) {
        return sex.man.value;
    } else if (value === sex.woman.key) {
        return sex.woman.value;
    } else if (value === sex.man.value) {
        return sex.man.key;
    } else if (value === sex.woman.value) {
        return sex.woman.key;
    } else {
        return undefined;
    }
};
// 根据返回状态显示内容
export function covertStatus(status) {
    if (status === exchangeType.WAIT4PAY.key) {
        return exchangeType.WAIT4PAY.value;
    } else if (status === exchangeType.WAIT4CONFIRM.key) {
        return exchangeType.WAIT4CONFIRM.value;
    } else if (status === exchangeType.CONFIRM2PAID.key) {
        return exchangeType.CONFIRM2PAID.value;
    } else if (status === exchangeType.SUCCESS.key) {
        return exchangeType.SUCCESS.value;
    }
};
// 对象是否为空
export function isObjEmpty(obj) {
    if (obj === null || obj === '' || typeof (obj) === 'undefined') {
        return true;
    } else {
        return false;
    }
};
// 判断当前页面是否包含相关信息
export function isCurrentJumpPage(url) {
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
export function renameImagePath(url, size) {
    if (!isObjEmpty(url)) {
        // log.debug('param url is ' + url);
        var urlArray = url.split('.');
        // log.debug('split array is ' + JSON.stringify(urlArray));
        var current = urlArray[0] + '_' + size + 'X' + size + '.' + urlArray[1];
        return current;
    }
    return null;
};

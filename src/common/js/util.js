import { exchangeType } from './values';
import Logger from 'chivy';
const log = new Logger('common/js/util');

// 设置sessionStorage的键值对
export var setSessionStorage = function setSessionStorage(key, value) {
    log.info('set key(' + key + ') to sessionStorage');
    sessionStorage.setItem(key, JSON.stringify(value));
};
// 根据key获取sessionStorage的值
export var getSessionStorage = function getSessionStorage(key) {
    log.info('get key(' + key + ') from sessionStorage');
    return JSON.parse(sessionStorage.getItem(key));
};
// 移除sessionStorage的key
export var removeSessionStorage = function removeSessionStorage(key) {
    log.info('remove key(' + key + ') from sessionStorage');
    sessionStorage.removeItem(key);
};

// 根据long时间获取具体的年月日时分秒
export var formatDate = function formatDate(date) {
    var datetime = new Date(date);
    var format = {
        Year: 1900 + datetime.getYear(),
        Month: (datetime.getMonth() + 1),
        Day: datetime.getDate(),
        Hour: datetime.getHours(),
        Minute: datetime.getMinutes(),
        Second: datetime.getSeconds()
    };
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
    log.debug(JSON.stringify(format));
    return format;
};
// 根据服务端返回的数据存储男女
export var gender = function gender(sex) {
    if (sex === 'Male') {
        return '男';
    } else if (sex === 'Famale') {
        return '女';
    } else {
        return undefined;
    }
};
// 根据返回状态显示内容
export var covertStatus = function covertStatus(status) {
    if (status === exchangeType.WAITE4PAY.key) {
        return exchangeType.WAITE4PAY.value;
    } else if (status === exchangeType.WAIT4CONFIRM.key) {
        return exchangeType.WAIT4CONFIRM.value;
    } else if (status === exchangeType.CONFIRM2PAID.key) {
        return exchangeType.CONFIRM2PAID.value;
    } else if (status === exchangeType.SUCCESS.key) {
        return exchangeType.SUCCESS.value;
    }
};
// 对象是否为空
export var isObjEmpty = function isObjEmpty(obj) {
    if (obj === null || obj === '' || typeof (obj) === 'undefined') {
        return true;
    } else {
        return false;
    }
};

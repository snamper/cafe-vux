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

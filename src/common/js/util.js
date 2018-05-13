import axios from 'axios';
import Logger from 'chivy';
import { sex, expressType, payStatus } from './consts';
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
function ajaxPost(url, param) {
    return new Promise((resolve, reject) => {
        log.debug('get (' + url + ') post data is ' + JSON.stringify(param));
        axios.post(url, param).then((response) => {
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
function ajaxGet(url) {
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
function setSessionStorage(key, value) {
    log.info('set key(' + key + ') to sessionStorage');
    // 设置过期时间一个月
    var nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    wsCache.set(key, value, {exp: nextMonth});
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

function gender(value) {
    if (value === sex.MAN.key) {
        return sex.MAN.value;
    } else if (value === sex.WOMEN.key) {
        return sex.WOMEN.value;
    } else if (value === sex.MAN.value) {
        return sex.MAN.key;
    } else if (value === sex.WOMEN.value) {
        return sex.WOMEN.key;
    } else {
        return undefined;
    }
};

function setNotNull(data) {
    return isObjEmpty(data) ? '' : data;
}

function setMemberInfo(data, thd) {
    let memberInfo = {
        third: thd,
        id: setNotNull(data.id),
        nick: setNotNull(data.nick),
        name: setNotNull(data.name),
        point: setNotNull(data.point),
        balance: setNotNull(data.balance),
        gender: setNotNull(gender(data.gender)),
        phone: setNotNull(data.mobile),
        email: setNotNull(data.email),
        area: setNotNull(data.area),
        address: setNotNull(data.address),
        createTime: setNotNull(data.createTime)
    };
    return memberInfo;
};

function setModifyMemberData(param) {
    let data = null;
    if (param.type === expressType.name) {
        data = {
            userId: param.userId,
            name: param.name
        };
    } else if (param.type === expressType.nick) {
        data = {
            userId: param.userId,
            nick: param.nick
        };
    } else if (param.type === expressType.mobile) {
        data = {
            userId: param.userId,
            mobile: param.mobile
        };
    } else if (param.type === expressType.gender) {
        data = {
            userId: param.userId,
            gender: param.gender
        };
    } else if (param.type === expressType.email) {
        data = {
            userId: param.userId,
            email: param.email
        };
    } else if (param.type === expressType.address) {
        data = {
            userId: param.userId,
            address: param.address
        };
    } else if (param.type === expressType.detailAddress) {
        data = {
            userId: param.userId,
            detailAddress: param.detailAddress
        };
    }
    return data;
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
    // log.debug('before add zero pre ' + JSON.stringify(format));
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
    // log.debug('after add zero pre' + JSON.stringify(format));
    return format;
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

// 对象是否为空
function isObjEmpty(obj) {
    if (obj === null || obj === '' || typeof (obj) === 'undefined') {
        return true;
    } else {
        return false;
    }
};

// 根据返回状态显示内容
function covertStatus(status) {
    if (status === payStatus.NOTPAY.key) {
        return payStatus.NOTPAY.value;
    } else if (status === payStatus.SUCCESS.key) {
        return payStatus.SUCCESS.value;
    } else if (status === payStatus.REFUND.key) {
        return payStatus.REFUND.value;
    } else if (status === payStatus.CLOSED.key) {
        return payStatus.CLOSED.value;
    } else if (status === payStatus.PAYERROR.key) {
        return payStatus.PAYERROR.value;
    }
};

function payurl(type, value, order) {
    let url = '';
    if (type === 'wechat') {
        url = '/shop/member/pay/wechat/ui/order.do' + '?payMoney=' + value + '&tradeNo=' + order;
    } else if (type === 'alipay') {
        url = '/shop/member/pay/alipay/ui/order.do' + '?payMoney=' + value + '&tradeNo=' + order;
    }
    return url;
}

function getImageUrl(url, size) {
    if (!isObjEmpty(url)) {
        // log.debug('param url is ' + url);
        var urlArray = url.split('.');
        // log.debug('split array is ' + JSON.stringify(urlArray));
        var current = urlArray[0] + '_' + size + 'X' + size + '.' + urlArray[1];
        return current;
    }
    return url;
}

export {ajaxPost, ajaxGet};
export {setSessionStorage, getSessionStorage, removeSessionStorage};
export {setMemberInfo, gender, setModifyMemberData, getImageUrl};
export {formatDate, isCurrentJumpPage, isObjEmpty, covertStatus, payurl};

import Logger from 'chivy';
const log = new Logger('common/session');
export default {
    'setkey': function setKey(key, value) {
        log.info('set key(' + key + ') to sessionStorage');
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    'getkey': function getKey(key) {
        log.info('get key(' + key + ') from sessionStorage');
        return JSON.parse(sessionStorage.getItem(key));
    }
};

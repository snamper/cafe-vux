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
    },
    'formatDate': function formatDate(date) {
        var datetime = new Date(date);
        var format = {
            'Year': 1900 + datetime.getYear(),
            'Month': (datetime.getMonth() + 1),
            'Day': datetime.getDate(),
            'Hour': datetime.getHours(),
            'Minute': datetime.getMinutes(),
            'Second': datetime.getSeconds()
        };
        return format;
    }
};

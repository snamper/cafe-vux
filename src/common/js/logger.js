import { isObjEmpty } from './util';
function format(value) {
    if (isObjEmpty(value)) {
        return '';
    } else if (typeof (value) === 'object') {
        return JSON.stringify(value);
    } else {
        return value;
    }
}
export default function logger() {
    const str = [];
    for (let i = 0; i < arguments.length; i++) {
        str.push(format(arguments[i]));
    }
    return str.join(' ');
};

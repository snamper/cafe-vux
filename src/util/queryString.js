const QueryString = exports;

QueryString.escape = encodeURIComponent;

QueryString.unescape = s => decodeURIComponent(s.replace(/\+/g, ' '));

const isPlainObject = o => o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;

const isPrimitive = o => o !== Object(o);

const toString = Object.prototype.toString;

const hasOwnProperty = Object.prototype.hasOwnProperty;

const call = val => toString.call(val) === '[object Array]';

const isArray = val => Array.isArray || call(val);

const trim1 = str => str == null ? '' : String.prototype.trim.call(str);

const trim2 = str => str == null ? '' : str.toString().replace(/^\s+/, '').replace(/\s+$/, '');

const trim = String.prototype.trim ? trim1 : trim2;

QueryString.stringify = (obj, sep, eq, arrayKey) => {
  if (!isPlainObject(obj)) {
    return '';
  }
  sep = sep || '&';
  eq = eq || '=';
  arrayKey = arrayKey || false;
  const buf = [];
  let key;
  let val;
  const escape = QueryString.escape;
  for (key in obj) {
    if (!hasOwnProperty.call(obj, key)) {
      continue;
    }
    val = obj[key];
    key = QueryString.escape(key);
    if (isPrimitive(val)) {
      buf.push(key, eq, escape(val + ''), sep);
    } else if (isArray(val) && val.length) {
      for (let i = 0; i < val.length; i++) {
        if (isPrimitive(val[i])) {
          buf.push(key, (arrayKey ? escape('[]') : '') + eq, escape(val[i] + ''), sep);
        }
      }
    } else {
      buf.push(key, eq, sep);
    }
  }
  buf.pop();
  return buf.join('');
};

QueryString.parse = function (str, sep, eq) {
  if (typeof str === 'undefined') {
    str = document.location.search;
  }
  const ret = {};
  if (typeof str !== 'string' || trim(str).length === 0) {
    return ret;
  }
  str = str.replace(/^\?/, '');
  const pairs = str.split(sep || '&');
  eq = eq || '=';
  const unescape = QueryString.unescape;
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split(eq);
    let key = unescape(trim(pair[0]));
    const val = unescape(trim(pair.slice(1).join(eq)));
    const m = key.match(/^(\w+)\[\]$/);
    if (m && m[1]) {
      key = m[1];
    }

    if (hasOwnProperty.call(ret, key)) {
      if (!isArray(ret[key])) {
        ret[key] = [ret[key]];
      }
      ret[key].push(val);
    } else {
      ret[key] = m ? [val] : val;
    }
  }
  return ret;
};

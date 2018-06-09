import Logger from 'chivy';
import { gender, expressType, status } from './consts';
import logger from './logger';
const log = new Logger('common/js/util');

// 对象是否为空
function isObjEmpty(obj) {
  if (obj === null || obj === '' || typeof (obj) === 'undefined') {
      return true;
  } else {
      return false;
  }
};

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

function regexmatch(string, regex) {
  log.info('function regexmatch string is ' + logger(string) + ' and regex str is ' + logger(regex));
  const result = new RegExp(regex).test(string);
  log.debug('result is ' + logger(result));
  return result;
}

function getMemberInfo(data) {
  const memberinfo = {
    balance: setparam(data.balance, 0),
    cardGrade: setparam(data.cardGrade),
    cardNo: setparam(data.cardNo),
    cardStatus: setparam(data.cardStatus),
    createTime: setparam(data.createTime),
    description: setparam(data.description),
    gender: setparam(data.gender),
    id: setparam(data.id),
    name: setparam(data.name),
    point: setparam(data.point, 0),
    phone: setparam(data.phone),
    email: setparam(data.email),
    area: setparam(data.area),
    address: setparam(data.address),
    avator: setparam(data.avator),
    nick: setparam(data.nick)
  };
  return memberinfo;
};

function setparam() {
  if (arguments.length <= 2) {
    return isObjEmpty(arguments[0]) ? arguments[1] ? arguments[1] : '' : arguments[0];
  }
  return '';
}

function getGender(sex) {
  if (sex === gender.Male.key) {
    return gender.Male.value;
  } else if (sex === gender.FaMale.key) {
    return gender.FaMale.value;
  } else if (sex === gender.Male.value) {
    return gender.Male.key;
  } else if (sex === gender.FaMale.value) {
    return gender.FaMale.key;
  }
}

function setModifyMemberData(param) {
  log.debug('setModifyMemberData param is ' + logger(param));
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
  } else if (param.type === expressType.area) {
      data = {
          userId: param.userId,
          address: param.area
      };
  } else if (param.type === expressType.address) {
      data = {
          userId: param.userId,
          detailAddress: param.address
      };
  }
  log.debug('return data is ' + logger(data));
  return data;
};

const coverStatus = type => {
  for (const o in status) {
    if (status[o].key === type) {
      return status[o].value;
    }
  }
};

export { getImageUrl, setparam, logger, regexmatch, getMemberInfo, isObjEmpty, getGender, setModifyMemberData, coverStatus };

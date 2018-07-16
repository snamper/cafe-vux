import querystring from './queryString';
import Logger from 'chivy';
const log = new Logger('utils/myUtils');

// 根据尺寸获取图片
const splitUrl = (url, size) => {
  const array = url.split('.');
  return array[0] + '_' + size + 'X' + size + '.' + array[1];
};

const gender = {
  Male: {
    key: 'M',
    value: '男'
  },
  FeMale: {
    key: 'F',
    value: '女'
  }
};

const regex = {
  // 密码由6-21字母和数字组成
  password: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$',
  account: '^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$',
  mobile: '^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$',
  /* eslint-disable no-useless-escape */
  email: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
  // 中文名
  chineseName: '[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*'
};

const regexMatch = (str, regex) => new RegExp(regex).test(str);
// 小于0的数字前面加0
const appendZero = number => number <= 9 ? ('0' + number) : number;

export default class Utils {
  // 对象是否为空
  static isEmpty = obj => (obj === null || obj === '' || typeof (obj) === 'undefined');
  // 对象非空
  static isNotEmpty = obj => !Utils.isEmpty(obj);

  static isNull = obj => obj === null;

  static isNotNull = obj => !Utils.isNull(obj);

  static isZero = obj => obj === 0;

  static isNotZero = obj => !Utils.isZero(obj);

  static isEqual = (obj1, obj2) => obj1 === obj2;

  static isNotEqual = (obj1, obj2) => !Utils.isEqual(obj1, obj2);

  // 根据图片地址重新计算然后获取重绘后的图片地址
  static resizeImage = (url, size) => Utils.isEmpty(url) ? url : splitUrl(url, size);

  // 判断是否匹配密码
  static isPwdValid = str => regexMatch(str, regex.password);

  // 判断是否匹配账户
  static isAccountValid = str => regexMatch(str, regex.account);

  // 判断是否匹配手机
  static isTelValid = str => regexMatch(str, regex.mobile);

  // 判断是否匹配邮箱
  static isEmailValid = str => regexMatch(str, regex.email);

  // 判断是否匹配中文名
  static isChineseNameValid = str => regexMatch(str, regex.chineseName);

  // 性别转换器
  static sex = sex => {
    switch (sex) {
      case gender.Male.key:
        return gender.Male.value;
      case gender.FaMale.key:
        return gender.FeMale.value;
      case gender.Male.value:
        return gender.Male.key;
      case gender.FeMale.value:
        return gender.FeMale.key;
    }
  };

  // 地址显示
  static convertAddress = addressinfo => {
    /*eslint-disable*/
    // debugger
    if (Utils.isNotEmpty(addressinfo)) {
      const area = addressinfo.province + addressinfo.city + addressinfo.county;
      const detail = Utils.isNotEmpty(addressinfo.address) ? addressinfo.address : addressinfo.address_detail;
      return {
        id: addressinfo.id,
        name: addressinfo.name,
        tel: Utils.isNotEmpty(addressinfo.mobile) ? addressinfo.mobile : addressinfo.tel,
        address: area + detail
      };
    }
    return null;
  }

  // 获取显示名字
  static getUsername = (uuid, member, vistor) => {
    log.debug('reverse ');
    if (Utils.isNotEmpty(uuid)) {
      return vistor;
    } else if (Utils.isNotEmpty(member)) {
      if (Utils.isNotEmpty(member.nick)) {
        return member.nick;
      } else if (Utils.isNotEmpty(member.phone)) {
        return member.phone;
      } else if (Utils.isNotEmpty(member.email)) {
        return member.email;
      }
    }
  }

  // 根据long时间获取具体的年月日时分秒
  static formatDate = date => {
    const datetime = new Date(date);
    return {
      Year: 1900 + datetime.getYear(),
      Month: appendZero((datetime.getMonth() + 1)),
      Day: appendZero(datetime.getDate()),
      Hour: appendZero(datetime.getHours()),
      Minute: appendZero(datetime.getMinutes()),
      Second: appendZero(datetime.getSeconds())
    };
  }
  // 是否从正确的页面跳转回来
  static isCurrentJumpPage = url => {
    const array = url.split('?');
    return array.length === 2 ? querystring.parse(array[1]) : null;
  };
};

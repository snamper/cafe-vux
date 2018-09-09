import querystring from './queryString';
import { appendZero, splitUrl, param } from './utils';
import { isPwdValid, isAccountValid, isTelValid, isEmailValid, isChineseNameValid } from './validate';
import payStatus from './payStatus';
import Logger from 'chivy';
const log = new Logger('utils/tools');

export default class Tools {
  // 对象属性已定义
  static isUndefined = obj => typeof (obj) === 'undefined';
  // 对象属性未定义
  static isNotUndefined = obj => !Tools.isUndefined(obj);
  // 对象是否为空
  static isEmpty = obj => (obj === null || obj === '' || typeof (obj) === 'undefined');
  // 对象非空
  static isNotEmpty = obj => !Tools.isEmpty(obj);

  static isNull = obj => obj === null;

  static isNotNull = obj => !Tools.isNull(obj);

  static isZero = obj => obj === 0;

  static isNotZero = obj => !Tools.isZero(obj);

  static isEqual = (obj1, obj2) => obj1 === obj2;

  static isNotEqual = (obj1, obj2) => !Tools.isEqual(obj1, obj2);

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
    log.debug(url);
    const array = url.split('?');
    return array.length === 2 ? querystring.parse(array[1]) : null;
  };

  // 根据图片地址重新计算然后获取重绘后的图片地址
  static resizeImage = (url, size) => Tools.isEmpty(url) ? url : splitUrl(url, size);

  // 判断是否是在微信浏览器中打开
  static isWeixin = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
  }

  // 性别设置
  static sex = value => {
    switch (value) {
      case 'M':
        return '男';
      case 'F':
        return '女';
      case '男':
        return 'M';
      case '女':
        return 'F';
      default:
        return null;
    }
  }

  // 格式化时间
  static formatTime = (value, separate) => {
    const datetime = Tools.formatDate(value);
    return datetime.Year + separate + datetime.Month + separate + datetime.Day;
  };

  // 时间转换成长整数
  static date2Long = date => {
    const dt = new Date(date.replace(new RegExp('/-/g', 'g'), '/'));
    console.log(dt);
    console.error(dt.getTime());
    return new Date(date.replace(new RegExp('/-/g', 'g'), '/')).getTime();
  };

  // 地址显示
  static convertAddress = addressinfo => {
    /*eslint-disable*/
    // debugger
    if (Tools.isNotEmpty(addressinfo)) {
      const area = addressinfo.province + addressinfo.city + addressinfo.county;
      const detail = Tools.isNotEmpty(addressinfo.address) ? addressinfo.address : addressinfo.address_detail;
      return {
        id: addressinfo.id,
        name: addressinfo.name,
        tel: Tools.isNotEmpty(addressinfo.mobile) ? addressinfo.mobile : addressinfo.tel,
        address: area + detail
      };
    }
    return null;
  };

  // 获取显示名字
  static getUsername = (uuid, member, vistor) => {
    /*eslint-disable*/
    // debugger
    if (Tools.isNotEmpty(uuid)) {
      return vistor;
    } else if (Tools.isNotEmpty(member)) {
      if (Tools.isNotEmpty(member.realName)) {
        return member.realName;
      } else if (Tools.isNotEmpty(member.nick)) {
        return member.nick;
      } else if (Tools.isNotEmpty(member.phone)) {
        return member.phone;
      } else if (Tools.isNotEmpty(member.email)) {
        return member.email;
      }
    }
  };

  // 设置可以修改的数据
  static setModifyData = param => {
    return {
      userId: param.userId,
      name: Tools.isNotEmpty(param.realName) ? param.realName : null,
      nick: Tools.isNotEmpty(param.nick) ? param.nick : null,
      birthday: Tools.isNotEmpty(param.birthDayStr) ? param.birthDayStr.substring(0, 10): null,
      mobile: Tools.isNotEmpty(param.mobile) ? param.mobile : null,
      gender: Tools.isNotEmpty(param.gender) ? param.gender : null,
      email: Tools.isNotEmpty(param.email) ? param.email : null,
      address: Tools.isNotEmpty(param.area) ? param.area : null,
      detailAddress: Tools.isNotEmpty(param.address) ? param.address : null
    };
  };
  // 重组member数据并放入到store.state中
  static getMemberInfo = data => {
    log.debug('getMemberInfo get data is ' + JSON.stringify(data));
    return {
      id: param(data.id),
      realName: param(data.realName),
      email: param(data.email),
      nick: param(data.nick),
      sex: Tools.sex(param(data.genderStr)),
      mobile: param(data.mobile),
      region: param(data.region),
      balance: param(data.balance),
      birthday: param(data.birthDayStr.substring(0, 10)),
      address: param(data.address),
      point: param(data.point),
      valid: param(data.valid)
    };
  };

  static setSearchData = name => {
    return {
      entityName: name,
      envData: {
        pageNo: 1,
        pageSize: 20
      }
    }
  };

  // 暴露操作接口给tools
  static isPwdValid = isPwdValid();
  static isAccountValid = isAccountValid();
  static isTelValid = isTelValid();
  static isEmailValid = isEmailValid();
  static isChineseNameValid = isChineseNameValid();
  static payStatus = payStatus;

};

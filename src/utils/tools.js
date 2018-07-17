import querystring from './queryString';
// 小于0的数字前面加0
const appendZero = number => number <= 9 ? ('0' + number) : number;

// 根据尺寸获取图片
const splitUrl = (url, size) => {
  const array = url.split('.');
  return array[0] + '_' + size + 'X' + size + '.' + array[1];
};

export default class Tools {
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
    const array = url.split('?');
    return array.length === 2 ? querystring.parse(array[1]) : null;
  };

  // 根据图片地址重新计算然后获取重绘后的图片地址
  static resizeImage = (url, size) => Tools.isEmpty(url) ? url : splitUrl(url, size);
};

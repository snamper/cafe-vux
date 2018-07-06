import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
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

const splitUrl = (url, size) => {
  const array = url.split('.');
  return array[0] + '_' + size + 'X' + size + '.' + array[1];
};

// 对象是否为空
export const isObjEmpty = obj => (obj === null || obj === '' || typeof (obj) === 'undefined');
// 对象是否为非空
export const isObjNotEmpty = obj => !isObjEmpty(obj);

// 根据图片地址重新计算然后获取重绘后的图片地址
export const resizeImage = (url, size) => {
  return isObjEmpty(url) ? url : splitUrl(url, size);
};
// 判断是否匹配正则表达式
export const regexMatch = (str, regex) => new RegExp(regex).test(str);

// 性别转换
export const sex = sex => {
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
// Toast提示
export const toast = (message, forbidClick = 'false', type = 'text', position = 'middle', mask = 'false', loadingType = 'circular', duration = 1000) => {
  Toast({
    type,
    position,
    message,
    mask,
    forbidClick,
    loadingType,
    duration
  });
};
// 转换显示的地址
export const convertAddress = addr => {
  if (isObjNotEmpty(addr)) {
    return {
      id: addr.id,
      name: addr.name,
      tel: addr.mobile,
      address: addr.province + addr.city + addr.county + (isObjNotEmpty(addr.address) ? addr.address : addr.address_detail)
    };
  }
  return null;
};
// 根据uuid和member的相关信息显示用户名
/*
* uuid显示游客
* 优先显示昵称，其次显示用户名，再次显示手机号码，最后显示email
*/
export const getUsername = (uuid, member, vistor) => {
  if (isObjNotEmpty(uuid)) {
    return vistor;
  } else if (isObjNotEmpty(member)) {
    if (isObjNotEmpty(member.nick)) {
      return member.nick;
    } else if (isObjNotEmpty(member.name)) {
      return member.name;
    } else if (isObjNotEmpty(member.phone)) {
      return member.phone;
    } else if (isObjNotEmpty(member.email)) {
      return member.email;
    }
  }
};

// 根据long时间获取具体的年月日时分秒
export const formatDate = date => {
  const datetime = new Date(date);
  const format = {
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

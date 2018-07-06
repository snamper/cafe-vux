import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
// 对象是否为空
export const isObjEmpty = obj => (obj === null || obj === '' || typeof (obj) === 'undefined');
// 对象是否为非空
export const isObjNotEmpty = obj => !isObjEmpty(obj);

const splitUrl = (url, size) => {
  const array = url.split('.');
  return array[0] + '_' + size + 'X' + size + '.' + array[1];
};

// 根据图片地址重新计算然后获取重绘后的图片地址
export const resizeImage = (url, size) => {
  return isObjEmpty(url) ? url : splitUrl(url, size);
};
// 判断是否匹配正则表达式
export const regexMatch = (str, regex) => new RegExp(regex).test(str);

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

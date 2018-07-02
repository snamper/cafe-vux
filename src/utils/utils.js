// 对象是否为空
export const isObjEmpty = obj => (obj === null || obj === '' || typeof (obj) === 'undefined');

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
// 根据省市区查找ID
export const findAreaCode = name => {
  const area = require('./area');
  let code = '';
  Object.keys(area.default.county_list).forEach(key => {
    if (area.default.county_list[key] === name) {
      code = key;
      return;
    }
  });
  return code;
};


const regexMatch = (str, regex) => new RegExp(regex).test(str);

// 判断是否匹配密码 密码由6-21字母和数字组成
export const isPwdValid = str => regexMatch(str, '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$');

// 判断是否匹配账户
export const isAccountValid = str => regexMatch(str, '^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$');

// 判断是否匹配手机
export const isTelValid = str => regexMatch(str, '^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$');

// 判断是否匹配邮箱
export const isEmailValid = str => regexMatch(str, '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');

// 判断是否匹配中文名
export const isChineseNameValid = str => regexMatch(str, '[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*');

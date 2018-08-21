import Tools from './tools';

// 小于0的数字前面加0
export const appendZero = number => number <= 9 ? ('0' + number) : number;

// 根据尺寸获取图片
export const splitUrl = (url, size) => {
  const array = url.split('.');
  return array[0] + '_' + size + 'X' + size + '.' + array[1];
};

// 当函数长度小于2的时候，可用，当第一个参数为空的时候显示''，否则显示输入的参数
// 单参数为空显示'', 两参数则显示后者
export const param = (...args) => {
  /* log.debug('args length is ' + args.length); */
  switch (args.length) {
    case 1:
      return Tools.isNotEmpty(args[0]) ? args[0] : '';
    case 2:
      return Tools.isNotEmpty(args[0]) ? args[0] : args[1];
    default:
      return '';
  }
};

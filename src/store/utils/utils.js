import MyUtils from '@/utils/myUtils';
import Logger from 'chivy';
const log = new Logger('store/utils/utils');
const tools = new MyUtils();
// 当函数长度小于2的时候，可用，当第一个参数为空的时候显示''，否则显示输入的参数
// 单参数为空显示'', 两参数则显示后者
const param = (...args) => {
  switch (args.length) {
    case 1:
      log.warn('case is 1');
      return tools.isNotEmpty(args[0]) ? args[0] : '';
    case 2:
      log.warn('case is 2');
      return tools.isNotEmpty(args[0]) ? args[0] : args[1];
    default:
      log.warn('case is default');
      return '';
  }
};

export const getMemberInfo = data => {
  return {
    balance: param(data.balance, 0),
    cardGrade: param(data.cardGrade),
    cardNo: param(data.cardNo),
    cardStatus: param(data.cardStatus),
    createTime: param(data.createTime),
    description: param(data.description),
    gender: param(data.gender),
    id: param(data.id),
    name: param(data.name),
    point: param(data.point, 0),
    phone: param(data.phone),
    email: param(data.email),
    area: param(data.area),
    address: param(data.address),
    avator: param(data.avator),
    nick: param(data.nick)
  };
};

export const setModifyData = param => {
  return {
    userId: param.userId,
    name: tools.isObjNotEmpty(param.name) ? param.name : null,
    nick: tools.isObjNotEmpty(param.nick) ? param.nick : null,
    mobile: tools.isObjNotEmpty(param.mobile) ? param.mobile : null,
    gender: tools.isObjNotEmpty(param.gender) ? param.gender : null,
    email: tools.isObjNotEmpty(param.email) ? param.email : null,
    address: tools.isObjNotEmpty(param.area) ? param.area : null,
    detailAddress: tools.isObjNotEmpty(param.address) ? param.address : null
  };
};


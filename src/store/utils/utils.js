import { isObjNotEmpty } from '@/utils/utils';
import Logger from 'chivy';
const log = new Logger('store/utils');
// 当函数长度小于2的时候，可用，当第一个参数为空的时候显示''，否则显示输入的参数
// 单参数为空显示'', 两参数则显示后者
const param = (...args) => {
  switch (args.length) {
    case 1:
      log.warn('case is 1');
      return isObjNotEmpty(args[0]) ? args[0] : '';
    case 2:
      log.warn('case is 2');
      return isObjNotEmpty(args[0]) ? args[0] : args[1];
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
    name: isObjNotEmpty(param.name) ? param.name : null,
    nick: isObjNotEmpty(param.nick) ? param.nick : null,
    mobile: isObjNotEmpty(param.mobile) ? param.mobile : null,
    gender: isObjNotEmpty(param.gender) ? param.gender : null,
    email: isObjNotEmpty(param.email) ? param.email : null,
    address: isObjNotEmpty(param.area) ? param.area : null,
    detailAddress: isObjNotEmpty(param.address) ? param.address : null
  };
};


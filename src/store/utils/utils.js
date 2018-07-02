import { isObjEmpty, isObjNotEmpty } from '@/utils/utils';
// 当函数长度小于2的时候，可用，当第一个参数为空的时候显示''，否则显示输入的参数
const param = () => arguments.length <= 2 ? isObjEmpty(arguments[0]) ? arguments[1] ? arguments[1] : '' : arguments[0] : '';

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


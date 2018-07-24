import Tools from './tools';
import Logger from 'chivy';
const log = new Logger('utils/memberInfo');
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
// 当函数长度小于2的时候，可用，当第一个参数为空的时候显示''，否则显示输入的参数
// 单参数为空显示'', 两参数则显示后者
const param = (...args) => {
  log.debug('args length is ' + args.length);
  switch (args.length) {
    case 1:
      return Tools.isNotEmpty(args[0]) ? args[0] : '';
    case 2:
      return Tools.isNotEmpty(args[0]) ? args[0] : args[1];
    default:
      return '';
  }
};
// 重组member数据并放入到store.state中
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
    nick: param(data.nick),
    status: param(data.status)
  };
};
// 设置可以修改的数据
export const setModifyData = param => {
  return {
    userId: param.userId,
    name: Tools.isNotEmpty(param.name) ? param.name : null,
    nick: Tools.isNotEmpty(param.nick) ? param.nick : null,
    mobile: Tools.isNotEmpty(param.mobile) ? param.mobile : null,
    gender: Tools.isNotEmpty(param.gender) ? param.gender : null,
    email: Tools.isNotEmpty(param.email) ? param.email : null,
    address: Tools.isNotEmpty(param.area) ? param.area : null,
    detailAddress: Tools.isNotEmpty(param.address) ? param.address : null
  };
};

// 性别转换器
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

// 获取显示名字
export const getUsername = (uuid, member, vistor) => {
  /*eslint-disable*/
  // debugger
  if (Tools.isNotEmpty(uuid)) {
    return vistor;
  } else if (Tools.isNotEmpty(member)) {
    if (Tools.isNotEmpty(member.nick)) {
      return member.nick;
    } else if (Tools.isNotEmpty(member.phone)) {
      return member.phone;
    } else if (Tools.isNotEmpty(member.email)) {
      return member.email;
    } else if (Tools.isNotEmpty(member.name)) {
      return member.name;
    }
  }
};


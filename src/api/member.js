import service from '@/utils/request';
import Logger from 'chivy';
const log = new Logger('api/member');
// 用户是否存在
export const isExistUserName = param => {
  const data = {
    name: param.name
  };
  return service({
    url: '/member/show/ui/isExistUserName.do',
    method: 'post',
    data
  });
};
// 用户登录
export const memberLogin = param => {
  const data = {
    name: param.name,
    passWd: param.passWd
  };
  return service({
    url: '/member/show/ui/memberLogin.do',
    method: 'post',
    data
  });
};
// 获取用户基本信息
export const getBasicInfoList = param => {
  const data = {
    entityId: param.entityId,
    entityName: param.entityName,
    envData: {
      pageNo: 1,
      pageSize: 20
    }
  };
  return service({
    url: '/member/show/ui/getBasicInfoList.do',
    method: 'post',
    data
  });
};
// 注册用户
export const createMember = param => {
  const data = {
    mobile: param.mobile,
    passwd: param.passwd
  };
  log.debug('createMember data is ' + JSON.stringify(data));
  return service({
    url: '/member/show/ui/createMember.do',
    method: 'post',
    data
  });
};
// 修改用户基本信息
export const modifyBasicInfo = param => {
  const data = {
    memberId: param.memberId,
    name: param.name,
    birthDay: param.birthDay,
    genderStr: param.genderStr,
    region: param.region,
    address: param.address
  };
  return service({
    url: '/member/show/ui/modifyBasicInfo.do',
    method: 'post',
    data
  });
};
// 修改用户密码
export const modifyPassword = param => {
  const data = {
    entityId: param.entityId,
    entityName: param.entityName
  };
  return service({
    url: '/member/show/ui/createMember.do',
    method: 'post',
    data
  });
};

export const getMemberById = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/member/show/ui/getMemberById.do',
    method: 'post',
    data
  });
};

// 获取指定用户信息
export const getMember = param => {
  const data = {
    entityId: param.entityId,
    entityName: param.entityName,
    envData: {
      pageNo: 1,
      pageSize: 20
    }
  };
  return service({
    url: '/member/show/ui/getMember.do',
    method: 'post',
    data
  });
};

// 更新会员信息
export const updateMember = param => {
  const data = {
    id: param.id,
    name: param.name,
    mobile: param.mobile,
    email: param.email,
    nick: param.nick
  };
  return service({
    url: '/member/show/ui/updateMember.do',
    method: 'post',
    data
  });
};
// 删除用户
export const deleteMember = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/member/show/ui/deleteMember.do',
    method: 'post',
    data
  });
};


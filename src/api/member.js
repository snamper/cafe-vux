import service from '@/utils/request';
import Logger from 'chivy';
const log = new Logger('api/member');

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

export const modifyBasicInfo = param => {
  const data = {
    userId: param.id,
    name: param.name,
    mobile: param.mobile,
    gender: param.gender,
    email: param.email,
    address: param.address,
    detailAddress: param.detailAddress
  };
  return service({
    url: '/member/show/ui/modifyBasicInfo.do',
    method: 'post',
    data
  });
};

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

export const getBasicInfoList = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/member/show/ui/getBasicInfoList.do',
    method: 'post',
    data
  });
};


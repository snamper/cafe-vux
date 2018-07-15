import service from '@/utils/request';

export const isExistUserName = name => {
  const data = {
    name
  };
  return service({
    url: '/member/show/ui/isExistUserName.do',
    method: 'post',
    data
  });
};

export const memberLogin = (name, passWd) => {
  const data = {
    name,
    passWd
  };
  return service({
    url: '/member/show/ui/memberLogin.do',
    method: 'post',
    data
  });
};

export const createMember = (mobile, passWd) => {
  const data = {
    mobile,
    passWd
  };
  return service({
    url: '/member/show/ui/createMember.do',
    method: 'post',
    data
  });
};

export const modifyBasicInfo = (userId, name, mobile, gender, email, address, detailAddress) => {
  const data = {
    userId,
    name,
    mobile,
    gender,
    email,
    address,
    detailAddress
  };
  return service({
    url: '/member/show/ui/modifyBasicInfo.do',
    method: 'post',
    data
  });
};

export const modifyPassword = (entityId, entityName) => {
  const data = {
    entityId,
    entityName
  };
  return service({
    url: '/member/show/ui/createMember.do',
    method: 'post',
    data
  });
};

export const getMemberById = entityId => {
  const data = {
    entityId
  };
  return service({
    url: '/member/show/ui/getMemberById.do',
    method: 'post',
    data
  });
};

export const getBasicInfoList = entityId => {
  const data = {
    entityId
  };
  return service({
    url: '/member/show/ui/getBasicInfoList.do',
    method: 'post',
    data
  });
};

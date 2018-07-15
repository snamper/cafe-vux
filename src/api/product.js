import service from '@/utils/request';

export const getRecordList = (userId, userCode, needDetail) => {
  const data = {
    userId,
    userCode,
    needDetail
  };
  return service({
    url: '/product/show/ui/getRecordList.do',
    method: 'post',
    data
  });
};

export const saveRecordList = (amount, userId, userCode, cashOrBalance, details) => {
  const data = {
    amount,
    userId,
    userCode,
    cashOrBalance,
    details
  };
  return service({
    url: '/product/show/ui/saveRecordList.do',
    method: 'post',
    data
  });
};

export const alterStatus = (entityId, status) => {
  const data = {
    entityId,
    status
  };
  return service({
    url: '/product/show/ui/alterStatus.do',
    method: 'post',
    data
  });
};

export const getAddresses = entityId => {
  const data = {
    entityId
  };
  return service({
    url: '/product/show/ui/getAddresses.do',
    method: 'post',
    data
  });
};

export const saveAddresses = (memberId, name, province, city, county, address, mobile, code, defaultEntity) => {
  const data = {
    memberId,
    name,
    province,
    city,
    county,
    address,
    mobile,
    code,
    defaultEntity
  };
  return service({
    url: '/product/show/ui/saveAddresses.do',
    method: 'post',
    data
  });
};

export const deleteAddresses = entityId => {
  const data = {
    entityId
  };
  return service({
    url: '/product/show/ui/deleteAddresses.do',
    method: 'post',
    data
  });
};

import service from '@/utils/request';
import Logger from 'chivy';
const log = new Logger('api/product');
export const getCategoriedProducts = () => {
  const data = {
    envData: {
      pageNo: 1,
      pageSize: 1000
    }
  };
  return service({
    url: '/product/show/ui/getCategoriedProducts.do',
    method: 'post',
    data
  });
};

export const getRecordList = param => {
  const data = {
    envData: {
      pageNo: 1,
      pageSize: 1000
    },
    userId: param.userId,
    userCode: param.userCode,
    needDetail: param.needDetail
  };
  return service({
    url: '/product/show/ui/getRecordList.do',
    method: 'post',
    data
  });
};

export const saveRecordList = param => {
  const data = {
    userName: param.userName,
    deliveryLocation: param.deliveryLocation,
    deliveryMobile: param.deliveryMobile,
    deliveryTypeStr: param.deliveryTypeStr,
    message: param.message,
    amount: param.amount,
    userId: param.userId,
    userCode: param.userCode,
    cashOrBalance: param.cashOrBalance,
    details: param.details
  };
  log.debug('saveRecordList param is ' + JSON.stringify(data));
  return service({
    url: '/product/show/ui/saveRecord.do',
    method: 'post',
    data
  });
};

export const alterStatus = param => {
  const data = {
    entityId: param.entityId,
    status: param.status
  };
  return service({
    url: '/product/show/ui/alterStatus.do',
    method: 'post',
    data
  });
};

export const getAddresses = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/product/show/ui/getAddresses.do',
    method: 'post',
    data
  });
};

export const saveAddresses = param => {
  const data = {
    memberId: param.id,
    name: param.name,
    province: param.province,
    city: param.city,
    county: param.county,
    address: param.address,
    mobile: param.mobile,
    areaCode: param.areaCode,
    defaultEntity: param.defaultEntity
  };
  log.debug('address is ' + JSON.stringify(data));
  return service({
    url: '/product/show/ui/saveAddresses.do',
    method: 'post',
    data
  });
};

export const deleteAddresses = param => {
  const data = {
    entityId: param.entityId
  };
  return service({
    url: '/product/show/ui/deleteAddresses.do',
    method: 'post',
    data
  });
};

export const updateAddresses = param => {
  log.debug('updateAddresses param is ' + JSON.stringify(param));
  const data = {
    id: param.id,
    code: param.code,
    name: param.name,
    province: param.province,
    city: param.city,
    county: param.county,
    address: param.address,
    mobile: param.mobile,
    areaCode: param.areaCode,
    defaultEntity: param.defaultEntity
  };
  log.debug('updateAddresses data is ' + JSON.stringify(data));
  return service({
    url: '/shop/product/show/ui/updateAddresses.do',
    method: 'post',
    data
  });
};

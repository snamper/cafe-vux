import service from '@/utils/request';
import Tools from '@/utils/tools';
import Logger from 'chivy';
const log = new Logger('api/product');
// 获取所有商品
export const getCategoriedProducts = (pageSize = 1000) => {
  const data = {
    envData: {
      pageNo: 1,
      pageSize: pageSize
    }
  };
  return service({
    url: '/product/show/ui/getCategoriedProducts.do',
    method: 'post',
    data
  });
};
// 获取订单记录， 默认1000
export const getRecordList = param => {
  const data = {
    envData: {
      pageNo: 1,
      pageSize: Tools.isNotEmpty(param.pageSize) ? param.pageSize : 1000
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
// 保存订单
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
// 更新订单状态
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
// 获取配送地址
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
// 保存配送地址
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
// 删除配送地址
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
// 更新配送地址
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

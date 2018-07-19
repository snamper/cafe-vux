import service from '@/utils/request';

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
  return service({
    url: '/product/show/ui/saveRecordList.do',
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

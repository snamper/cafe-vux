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

export const getRecordList = (userId, userCode, needDetail) => {
  const data = {
    envData: {
      pageNo: 1,
      pageSize: 1000
    },
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

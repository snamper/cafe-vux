const regex = {
  // 密码由6-21字母和数字组成
  password: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$',
  account: '^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$',
  mobile: '^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$',
  /* eslint-disable no-useless-escape */
  email: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
  // 中文名
  chineseName: '[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*'
};

const status = {
  NOTPAY: {
    key: 'NOTPAY',
    value: '待付款',
    status: '等待付款'
  },
  WAIT4DELIVERY: {
    key: 'WAIT4DELIVERY',
    value: '待发货',
    status: '等待发货'
  },
  ALREADYDELIVERY: {
    key: 'ALREADYDELIVERY',
    value: '已发货',
    status: '等待收货'
  },
  FINISH: {
    key: 'FINISH',
    value: '已完成',
    status: '完成订单'
  },
  SUCCESS: {
    key: 'SUCCESS',
    value: '已付款'
  },
  REFUND: {
    key: 'REFUND',
    value: '已退款'
  },
  CLOSED: {
    key: 'CLOSED',
    value: '已关闭',
    sttus: '交易关闭'
  },
  PAYERROR: {
    key: 'PAYERROR',
    value: '付款错误'
  }
};

const deliverPrice = 25;

export { regex, status, deliverPrice };

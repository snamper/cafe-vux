export const status = {
  /**
	 * 交易创建，等待买家付款
	 */
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

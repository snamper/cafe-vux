export default {
  // 全部商品
  goods: [],
  // 订单
  records: [],
  // 提交的订单 需要在真正提交订单的时候去清空
  carts: [],
  // UUID
  uuid: null,
  // 会员信息
  member: null,
  // 是否显示loading页面
  isLoading: false,
  // 快递价格
  deliverPrice: 25,
  // 当前使用的地址
  address: null,
  // 记录的收货人地址 非会员就是一个，会员则是多个
  addresses: []
};

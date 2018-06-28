export default {
    User: {
      uuid: null,
      member: null
    },
    // 全部商品
    goods: [],
    // 订单
    records: [],
    // 提交的订单 需要在真正提交订单的时候去清空
    carts: null,
    // 配送地址
    address: null,
    // 填写的地址
    addresses: [],
    // loading页面
    isLoading: false
};

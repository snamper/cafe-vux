export default {
    // UUID当没有登陆的时候用这个ID作为会员ID
    UUID: null,
    // 会员信息
    memberInfo: null,
    // 状态
    status: {
        // 登陆状态
        login: false,
        // 重名状态
        duplicate: false,
        // 购买记录状态
        record: false,
        // 提醒卖家状态
        alert: false,
        // 修改记录状态
        info: false
    },
    // 购物订单
    recordID: null,
    // 商品
    categorys: null,
    // 购物清单
    recordList: null,
    // 背景图片以及avator
    images: {
        background: '../../static/img/background.jpg',
        avator: '../../static/img/avator.jpg'
    }
};

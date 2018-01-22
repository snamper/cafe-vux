export default {
    // UUID当没有登陆的时候用这个ID作为会员ID
    UUID: null,
    // 会员信息
    memberInfo: null,
    // 购物订单
    recordID: null,
    // 商品
    categorys: null,
    // 购物清单
    records: null,
    // 背景图片以及avator
    images: {
        background: '../../static/img/background.jpg',
        avator: '../../static/img/avator.jpg'
    },
    // 支付类型
    payType: {
        alipay: {
            icon: '../../static/img/alipayicon.png',
            name: '支付宝',
            QR: '../../static/img/alipayQR.jpg'
        },
        wechat: {
            icon: '../../static/img/wechaticon.png',
            name: '微信支付',
            QR: '../../static/img/wechatQR.jpg'
        },
        member: {
            icon: '../../static/img/avator.jpg',
            name: '余额支付'
        }
    },
    // 支付页面显示的内容
    showbutton: {
        confirm: false,
        already: true
    }
};

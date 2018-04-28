export default {
    // 等待状态
    isLoading: false,
     // 商品
    categorys: null,
    // 当前用户信息
    currentUser: {
        // UUID当没有登陆的时候用这个ID作为会员ID
        UUID: null,
         // 会员信息
        memberInfo: null
    },
    recordInfo: {
        // 购物清单
        recordsList: null,
        // 购物订单
        recordID: null,
        // 购物清单
        records: null
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

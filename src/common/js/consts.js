export default {
    url: {
        // 获取分类商品的列表
        categorysList: '/shop/category/show/ui/getCategoriedProducts.do',
        // 获取购买商品列表
        recordList: '/shop/product/show/ui/getRecordList.do',
        // 是否用户名已存在
        existUser: '/shop/member/show/ui/isExistUserName.do',
        // 用户登录接口
        userLogin: '/shop/member/show/ui/memberLogin.do',
        // 用户注册接口
        userRegister: '/shop/member/show/ui/createMember.do',
        // 商品购买接口
        buyGoods: '/shop/product/show/ui/saveRecordList.do',
        // 更新订单状态的接口
        // 入参{entityId: 73, status: "ENSURE2PAID"}
        recordStatus: '/shop/product/show/ui/alterStatus.do',
        // 修改会员信息接口
        basicInfo: '/shop/member/show/ui/modifyBasicInfo.do',
        // 修改密码接口
        modifypwd: '/shop/member/show/ui/modifyPassword.do',
        // 获取三方登陆的会员信息接口
        // 入参 {entityId:252}
        thirdUserInfo: '/shop/member/show/ui/getMemberById.do'
    },
    expressType: {
        mobile: 'mobile',
        nick: 'nick',
        name: 'name',
        email: 'email',
        address: 'address',
        detailAddress: 'detailAddress',
        gender: 'gender'
    },
    session: {
        uuid: 'uuid',
        memberInfo: 'memberInfo'
    },
    payStatus: {
        NOTPAY: {
            key: 'NOTPAY',
            value: '待付款'
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
            value: '已关闭'
        },
        PAYERROR: {
            key: 'PAYERROR',
            value: '付款错误'
        }
    },
    sex: {
        MAN: {
            key: 'Male',
            value: '男'
        },
        WOMEN: {
            key: 'Famale',
            value: '女'
        }
    }
};

export var url = {
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
    recordStatus: '/shop/product/show/ui/alterStatus.do',
    // 修改会员信息接口
    basicInfo: '/shop/member/show/ui/modifyBasicInfo.do',
    // 修改密码接口
    modifypwd: '/shop/member/show/ui/modifyPassword.do'
};

// 传递类型
export var type = {
    mobile: 'mobile',
    name: 'name',
    email: 'email',
    address: 'address',
    detailAddress: 'detailAddress',
    gender: 'gender'
};

// session的key
export var session = {
    uuid: 'uuid',
    memberInfo: 'memberInfo'
};
// 订单状态
export var exchangeType = {
    WAITE4PAY: {
        key: 'WAITE4PAY',
        value: '待付款'
    },
    WAITE4ENSURE: {
        key: 'WAITE4ENSURE',
        value: '已付款'
    },
    ENSURE2PAID: {
        key: 'ENSURE2PAID',
        value: '已确认'
    },
    SUCCESS: {
        key: 'SUCCESS',
        value: '成功'
    }
};

export default {
  main: {
    menu: '主页',
    active: '今日活动',
    cart: '购物车',
    member: '我的'
  },
  menu: {
    buyit: '购买',
    allProduct: '所有商品'
  },
  member: {
    myorder: '我的订单',
    showorders: '查看全部订单',
    wait4pay: '待付款',
    wait4delivery: '待发货',
    alreadydelivery: '已发货',
    finish: '已完成',
    carts: '购物车',
    memberCard: '我的会员卡',
    logout: '注销',
    wantLogin: '我要登录'
  },
  login: {
    vistor: '游客',
    username: '用户名',
    password: '密码',
    inputPassword: '输入密码',
    comfirmPassword: '确认密码',
    usernamePlaceholder: '请输入用户名',
    passwordPlaceholder: '请输入密码',
    accountPlaceholder: '手机号码/邮箱名',
    confirmPlaceholder: '请确认密码',
    login: '登录',
    forgetPassword: '忘记密码',
    vistorVistor: '游客访问',
    register: '注册',
    third: '第三方登录'
  },
  cart: {
    shopName: '树影啡香',
    selectAll: '全选',
    nonSelect: '购物车快饿瘪了~~',
    selectGoods: '请购买商品',
    vistor: '去逛逛',
    delete: '删除',
    pay: '结算',
    finish: '完成',
    edit: '编辑',
    count: '结算'
  },
  activity: {
    productlist: '商品列表',
    subtitle: '蛋糕手工打造'
  },
  address: {
    myaddress: '我的地址',
    finish: '完成',
    tips: '游客只能添加一个地址'
  },
  edit: {
    addAddress: '添加地址',
    editAddress: '修改地址'
  },
  card: {
    myCard: '我的会员卡',
    edit: '修改',
    name: '姓名',
    birthday: '生日',
    sex: '性别',
    tel: '电话号码',
    area: '所在地',
    address: '详细地址',
    point: '积分',
    status: '会员状态',
    notSet: '未设置',
    active: '已激活',
    disactive: '未激活'
  },
  modify: {
    infoSetting: '会员信息设置',
    name: '姓名',
    namePlaceholder: '请输入姓名',
    birthday: '生日',
    select: '请选择',
    sex: '性别',
    tel: '电话号码',
    telPlaceholder: '请输入电话号码',
    email: '电子邮箱',
    emailPlaceholder: '请输入邮箱地址',
    area: '所在地',
    address: '详细地址',
    addressPlaceholder: '请输入街道门牌号',
    male: '男',
    female: '女',
    tips1: '请检查填写内容',
    tips2: '手机已被注册，请重新输入手机号码',
    tips3: '个人信息修改成功',
    tips4: '个人信息修改失败',
    tips5: '请输入中文姓名',
    tips6: '请选择生日',
    tips7: '请输入正确的电话号码',
    tips8: '请输入正确的邮件地址'
  },
  food: {
    productdetail: '商品详情',
    menu: '主页',
    carts: '购物车',
    add2cart: '加入购物车',
    buy: '立即购买'
  },
  order: {
    wait4payOrder: '待付款的订单',
    deliveryType: '配送方式',
    message: '留言',
    messagePlaceholder: '点击给商家留言',
    summary: '合计',
    productTotalPrice: '商品总价',
    memberDiscount: '会员优惠',
    deliveryPrice: '快递费用',
    fastDelivery: '快递',
    submitOrder: '提交订单',
    self: '自提'
  },
  pay: {
    selectPayType: '请选择支付方式',
    totalPrice: totalPrice => `确认支付￥${totalPrice}元`,
    alipay: '支付宝',
    wechat: '微信支付',
    balance: '余额支付',
    tips1: '余额不足，请重新选择支付方式',
    tips2: '此功能暂未开通',
    tips3: '支付成功'
  },
  record: {
    finishOrder: '交易完成的订单',
    buyer: '买家下单',
    accept: '商家接单',
    getGood: '买家提货',
    finish: '交易完成',
    deliveryType: '配送方式',
    buyerMessage: '买家留言',
    message: '留言',
    summary: '合计',
    none: '无',
    amount: '商品金额',
    deliveryPrice: '运费',
    payAmount: '应付金额',
    orderId: id => `订单编号: ${id}`,
    createTime: time => `创建时间: ${time}`,
    cancelOrder: '取消订单',
    confirmOrder: '确认付款',
    timeout: '超时关闭',
    tips1: '取消错误'
  },
  records: {
    orderlist: '订单列表',
    none: '暂无订单',
    all: '全部',
    wait4pay: '待付款',
    wait4delivery: '待发货',
    alreadydelivery: '已发货',
    finish: '已完成',
    orderId: '订单编号:',
    showGoods: length => `查看全部${length}件商品`,
    summary: '合计:',
    tips1: '取消错误'
  },
  sku: {
    success: '添加购物车成功~',
    sepc: '规格'
  },
  addressCard: {
    cotact: name => `收货人：${name}`,
    tel: tel => `联系电话：${tel}`,
    address: address => `配送地址：${address}`,
    addContact: '添加订单联系人信息'
  },
  namePrice: {
    memberPrice: price => `会员价:￥${price}`
  },
  good: {
    delete: '删除'
  },
  error: {
    error: '哎呀，出错了~',
    tips: time => `${time}s后返回主页面`
  }
};

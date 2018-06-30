const url = {
  // 获取分类商品的列表
  getCategoriedProducts: '/shop/category/show/ui/getCategoriedProducts.do',
  // 获取购买商品列表
  getRecordList: '/shop/product/show/ui/getRecordList.do',
  // 是否用户名已存在
  isExistUserName: '/shop/member/show/ui/isExistUserName.do',
  // 用户登录接口
  memberLogin: '/shop/member/show/ui/memberLogin.do',
  // 用户注册接口
  createMember: '/shop/member/show/ui/createMember.do',
  // 商品购买接口
  saveRecordList: '/shop/product/show/ui/saveRecordList.do',
  // 更新订单状态的接口
  alterStatus: '/shop/product/show/ui/alterStatus.do',
  // 修改会员信息接口
  modifyBasicInfo: '/shop/member/show/ui/modifyBasicInfo.do',
  // 修改密码接口
  modifyPassword: '/shop/member/show/ui/modifyPassword.do',
  // 获取三方登陆的会员信息接口
  getMemberById: '/shop/member/show/ui/getMemberById.do',
  // 获取配送地址列表
  getAddresses: '/shop/product/show/ui/getAddresses.do',
  // 保存配送地址
  saveAddresses: '/shop/product/show/ui/saveAddresses.do',
  // 删除配送地址
  deleteAddresses: '/shop/product/show/ui/deleteAddresses.do',
  // 获取会员信息
  getBasicInfoList: '/shop/member/show/ui/getBasicInfoList.do'
};

const consts = {
  session: {
    set: 'set',
    get: 'get',
    remove: 'remove'
  },
  key: {
    uuid: 'uuid',
    member: 'member'
  }
};

const mainswiper = [
  {
    url: '',
    img: '/static/img/maniswiper1.jpg',
    title: 'TianBakery1'
  },
  {
    url: '',
    img: '/static/img/maniswiper2.jpg',
    title: 'TianBakery2'
  }
];

const gender = {
  Male: {
    key: 'M',
    value: '男'
  },
  FaMale: {
    key: 'F',
    value: '女'
  }
};

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

const expressType = {
  mobile: 'mobile',
  nick: 'nick',
  name: 'name',
  email: 'email',
  area: 'area',
  address: 'address',
  gender: 'gender'
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
    value: '已关闭'
  },
  PAYERROR: {
    key: 'PAYERROR',
    value: '付款错误'
  }
};

const deliverPrice = 25;

export { url, consts, mainswiper, regex, gender, expressType, status, deliverPrice };

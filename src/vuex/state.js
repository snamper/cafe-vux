export default {
    isLoading: false,
    categorys: '', // 商品分类信息
    memberInfo: '', // 会员信息
    recordList: '', // 购买商品记录
    uuid: '', // UUID当没有登陆的时候用这个ID作为会员ID
    cashOrBalance: '', // 现金还是余额支付
    recordId: '', // 源自于提交订单后的entityId
    selects: {'menu': true, 'new': false, 'order': false, 'member': false}
};

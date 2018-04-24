### 获取分类商品的列表

    const ApiCategorys = '/shop/category/show/ui/getCategoriedProducts.do';
**入参**

	无

**回参**

	{
	  "分类1": [{
	    "canBook": false,
	    "classifyId": 63,
	    "code": "43b43ac8-f79d-46e2-a968-123386498728",
	    "creatPeriod": "32",
	    "createTime": 1508075218930,
	    "creatorId": -1,
	    "defaultEntity": false,
	    "description": "32",
	    "id": 75,
	    "memberPrice": 32,
	    "name": "test",
	    "objClass": "com.xdt.ums.shop.common.entity.ProductImpl",
	    "price": 21,
	    "slider": false
	  }, {
	    "canBook": false,
	    "classifyId": 63,
	    "code": "e349c5ee-b005-4cb6-93b7-20755a01c385",
	    "creatPeriod": "32",
	    "createTime": 1508075310072,
	    "creatorId": -1,
	    "defaultEntity": false,
	    "id": 76,
	    "memberPrice": 23,
	    "name": "test2",
	    "objClass": "com.xdt.ums.shop.common.entity.ProductImpl",
	    "price": 2313,
	    "slider": false
	  }]
	}


### 获取购买商品列表
    
    const ApiGetRecordList = '/shop/product/show/ui/getRecordList.do';
    
**入参**

备注：这两个入参可选填

	{
	  "userId": "84",
	  "needDetail": "true"
	}
	
	
**回参**

	[{
	  "amount": 500,
	  "code": "464764646",
	  "createTime": 1507470003839,
	  "creatorId": 4646433,
	  "defaultEntity": false,
	  "description": "464dadgaygdad",
	  "details": [
        {
          "amount": 22,
          "code": "0cf24a6a-d464-4657-806f-412b508c24d1",
          "createTime": 1508251633955,
          "creatorId": -1,
          "defaultEntity": false,
          "id": 100,
          "number": 2,
          "imageUrl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1092526953,1928940804&fm=27&gp=0.jpg",
          "objClass": "com.xdt.ums.shop.common.entity.DetailImpl",
          "price": 11,
          "productName": "慕斯蛋糕",
          "productId": 2,
          "recordId": 99
        }
		],
	  "id": 69,
	  "name": "lisi",
	  "objClass": "com.xdt.ums.shop.common.entity.RecordImpl",
	  "status": "success",
	  "userId": 0,
	  "userName": "wangwu"
	}, {
	  "amount": 56,
	  "cashOrBanlance": " ",
	  "code": "34c9829f-d57d-4e35-a8cb-51b861467b21",
	  "createTime": 1508251634463,
	  "creatorId": -1,
	  "defaultEntity": false,
	  "details": [],
	  "id": 99,
	  "objClass": "com.xdt.ums.shop.common.entity.RecordImpl",
	  "status": "success",
	  "userId": 84,
	  "userName": "test3"
	}, {
	  "amount": 56,
	  "cashOrBanlance": " ",
	  "code": "55280e74-0e83-458a-8998-788cb5a9176d",
	  "createTime": 1508251795107,
	  "creatorId": -1,
	  "defaultEntity": false,
	  "details": [],
	  "id": 102,
	  "objClass": "com.xdt.ums.shop.common.entity.RecordImpl",
	  "status": "success",
	  "userId": 84,
	  "userName": "test3"
	}]


### 是否用户名已存在

    const ApiIsExistUserName = '/shop/member/show/ui/isExistUserName.do';

**入参**

	{
	    "name": "123"
	}

**回参**

返回一个JSON对象，并增加对象名为status。

	{
	"balance": 0,
	"id": 0,
	"status": true, //只看status 这个字段
	"success": false
	}
	
### 用户登录接口

    const ApiMemberLogin = '/shop/member/show/ui/memberLogin.do';

**入参**

	{
	  "name": "ccc",
	  "passWd": "dad"
	}

**回参**

	成功：{
	  "status": true,
	  //余额
	  "balance": 0,
	  "cardGrade": "",
	  "cardNo": "",
	  "cardStatus": "",
	  //创建时间
	  "createTime": "2017-10-23 21:04:13",
	  "description": "",
	  "gender": "Male",
	  "handNo": "",
	  "id": 107,
	  // 用户名
	  "name": "ccc",
	  // 积分
	  "point": "1500",
      // 手机号码
	  "phone": "13333333333",
	  // 邮箱
	  "email": "ttt@sss.com",
	  // 所在地区
	  "area": "四川省成都市成华区",
	  // 详细地址
	  "address": "xx路xx街xx号"
	}
	
	失败：{
		"balance":0,
		"id":0,
		"status":"false"
	}
	
### 用户注册接口

    const ApiCreateMember = '/shop/member/show/ui/createMember.do';

**入参**

	{
		//后台需要更新为手机号码,而不是用户名
		"mobile":"13555556666",
		"passwd":"dad"
	}

**回参**

	{
	    "balance": 0,
		"createTime": "18-1-14 下午4:56",
		"id": 92,
		"mobile": "13555556666",
		"status": false,
		"success": true  //看success字段的值
	}
	
### 商品购买接口

	const ApiSaveRecordList = '/shop/product/show/ui/saveRecordList.do';

**入参**

		{
			"amount": 5,
			"userId": 723,
			"userName": "bbb",  ???为什么要传递username, 这个地方的作用是什么? 目前代码是找不到username的话,就传递的phone,是否可以不传
			"cashOrBalance": "BALANCE",
			"paymentTypeStr":"self",   //self,WeChat,alipay
			"details": [{
				"productId": 2,
				"amount": 12,
				"number": 2
			}, {
				"productId": 3,
				"amount": 6,
				"number": 3
			}]
		}

**回参**

	{
	  "entityName": "null",
	  "envData": {
	    "endRow": -1,
	    "language": "",
	    "pageNo": -1,
	    "pageSize": -1,
	    "realTotalRows": -1,
	    "responseStatus": "用户不存在",
	    "startRow": -1,
	    "totalPages": -1,
	    "totalRows": -1,
	    "userIp": "",
	    "userName": ""
	  },
	  "success": false
	}
	
	{
	  "envData": {
	    "endRow": -1,
	    "language": "",
	    "pageNo": -1,
	    "pageSize": -1,
	    "realTotalRows": -1,
	    "responseStatus": "余额不足",
	    "startRow": -1,
	    "totalPages": -1,
	    "totalRows": -1,
	    "userIp": "",
	    "userName": ""
	  },
	  "success": false
	}
	
	{
	  "envData": {
	    "endRow": -1,
	    "language": "",
	    "pageNo": -1,
	    "pageSize": -1,
	    "realTotalRows": -1,
	    "responseStatus": "0",
	    "startRow": -1,
	    "totalPages": -1,
	    "totalRows": -1,
	    "userIp": "",
	    "userName": ""
	  },
	  "success": true
	}

根据 success字段来判断  entityName和responseStatus 表示原因 
用户不存在时 success 为false 并且entityName为null， "responseStatus":"用户不存在"
余额不足时 success 为false 并且 responseStatus":"余额不足"
成功时 success为 true 并且 "responseStatus":"余额支付成功"
现金支付时 "cashOrBalance":一定不要传BALANCE  会返回 uccess为 true 并且 "responseStatus":"现金支付"


### 第三方登陆信息查询接口
    const apixxx = '/shop/member/show/ui/getMemberById.do'

**入参**
	{	
		"entityId" : 252
	}	

**回参**
	{
		"accountType": "WeiBo",
		"balance": 0,
		"createTime": "2018-03-18 20:03:47",
		"description": "Happy everyday!",
		"email": "",
		"id": 252,
		"mobile": "",
		"name": "地狱入口处",
		"nick": "地狱入口处",
		"status": true
	}

### 会员信息修改接口

	const Apixxx = '/shop/member/show/ui/modifyBasicInfo.do';

**入参**

	{
		"userId": 107, //对应的会员ID
		"类型": "value" //不同字段对应的value 一次可传多个字段  
	}
	//建议：修改信息的表单一次取得该用户所有数据并自动填入表单，用户只需修改想要修改的信息 然后调用该接口 保存修改好了的信息。
	例：{
		"userId": 107,
		"name": "william"
	}

	类型: name(用户名), mobile(手机号码), gender(”M“ 男，”F“ 女 默认是男), email(邮箱), address(所在地区), detailAddress(详细地址)

**回参**

	{
	"envData": {
		"endRow": -1,
		"language": "",
		"pageNo": -1,
		"pageSize": -1,
		"realTotalRows": -1,
		"responseStatus": "success",
		"startRow": -1,
		"totalPages": -1,
		"totalRows": -1,
		"userIp": "",
		"userName": ""
		},
	"success":  
	}	

### 密码修改接口

	const Apixxx = '/shop/member/show/ui/modifyPassword.do';

**入参**

	{
		"entityId": "78",
		"entityName": "passwd"
	}

**回参**

	{
	"envData": {
		"endRow": -1,
		"language": "",
		"pageNo": -1,
		"pageSize": -1,
		"realTotalRows": -1,
		"responseStatus": "0",
		"startRow": -1,
		"totalPages": -1,
		"totalRows": -1,
		"userIp": "",
		"userName": ""
		},
	"success": true
}


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
	  "details": [],
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
	    "entityName": "test"
	}

**回参**

返回一个JSON对象，并增加对象名为status。

	{
		"balance":0,
		"id":0,
		"status":true
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
      // 性别
	  "sex": "男",
	  // 邮箱
	  "email": "ttt@sss.com",
	  // 所在地区
	  "Area": "四川省成都市成华区",
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
		"name":"13555556666",
		"passWd":"dad"
	}

**回参**

	{
	  "entityId": "107",
	  "entityName": "ccc",
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
	    "userName": "13555556666"
	  },
	  "success": true
	}
	
### 商品购买接口

	const ApiSaveRecordList = '/shop/product/show/ui/saveRecordList.do';

**入参**

		{
			"amount": 5,
			"userId": 723,
			"userName": "bbb",
			"cashOrBalance": "BALANCE",
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


### 会员信息修改接口

	const Apixxx = '/shop/xxx';

**入参**

	{
		"id": 107,
		"type": "username",
		"value": "test"
	}


类型: username(用户名), phone(手机号码), sex(性别), email(邮箱), address(所在地区), detailAddress(详细地址)

**回参**

	{
		"success": true
	}

### 密码修改接口

	const Apixxx = '/shop/xxx';

**入参**

	{
		"id": 107,
		"passwd": "xxxxx"
	}

**回参**

	{
		"success": true
	}


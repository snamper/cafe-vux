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
	  "userId": "84",//long
	  "needDetail": "true"
	}//会员登录
	{
	  "userCode": "abc",//string
	  "needDetail": "true"
	}//游客登录
	
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

	{"balance":0,"id":0,"status":"true"}

### 用户登录接口

    const ApiMemberLogin = '/shop/member/show/ui/memberLogin.do';

**入参**

	{
	  "name": "ccc",
	  "passWd": "dad"
	}

**回参**


	成功：{"balance":0,
		"cardGrade":"",
		"cardNo":""
		,"cardStatus":""
		,"createTime":"2017-10-30 18:51:06",
		"description":"",
		"gender":"Male",
		"handNo":"","id":141,
		"name":"ccc",
		"status":true}
	
	失败：{"balance":0,
			"id":0,
			"status":false}
	
### 用户注册接口

    const ApiCreateMember = '/shop/member/show/ui/createMember.do';

**入参**

	{
		"name":"ccc",
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
	    "userName": ""
	  },
	  "success": true
	}
	
### 商品购买接口

	const ApiSaveRecordList = '/shop/product/show/ui/saveRecordList.do';

**入参**

	{
	  "amount": 5,
	  "userId": 723,
	  "userCode":"xxxx",
	  "userName": "bbb",
	  "cashOrBalance": "BALANCE",
	  "details": [
	    { "productId": 2, "amount": 12, "number": 2 },
	    { "productId": 3, "amount": 6, "number": 3 }
	  ]
	} //登陆
	
	{
	  "amount": 5,
	  "userCode": "xxxx",
	  "userName": "bbb",
	  "cashOrBalance": "CASH",
	  "details": [
	    { "productId": 2, "amount": 12, "number": 2 },
	    { "productId": 3, "amount": 6, "number": 3 }
	  ]
	}//游客

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
	  "entityId": "138",
	  "envData": {
	    "endRow": -1,
	    "language": "",
	    "pageNo": -1,
	    "pageSize": -1,
	    "realTotalRows": -1,
	    "responseStatus": "余额支付成功",
	    "startRow": -1,
	    "totalPages": -1,
	    "totalRows": -1,
	    "userIp": "",
	    "userName": ""
	  },
	  "success": true
	}
	
	{
	  "entityId": "135",
	  "envData": {
	    "endRow": -1,
	    "language": "",
	    "pageNo": -1,
	    "pageSize": -1,
	    "realTotalRows": -1,
	    "responseStatus": "现金支付",
	    "startRow": -1,
	    "totalPages": -1,
	    "totalRows": -1,
	    "userIp": "",
	    "userName": ""
	  },
	  "success": true
	}
	
	
	
entityId就是recordId 其他不变 成功才会返回id

根据 success字段来判断  entityName和responseStatus 表示原因 
用户不存在时 success 为false 并且entityName为null， "responseStatus":"用户不存在"

余额不足时 success 为false 并且 responseStatus":"余额不足"

成功时 success为 true 并且 "responseStatus":"余额支付成功"

现金支付时 "cashOrBalance":一定不要传BALANCE  会返回 uccess为 true 并且 "responseStatus":"现金支付"
	
### “我已付款”按钮响应接口
	/shop/product/show/ui/alterStatus.do
**入参**
	
status的值就只传WAITE4ENSURE就行了

	{
		"RecordID":132,
		"status":"WAITE4ENSURE"
	} 

**回参**

	{
	  "envData": {
	    "endRow": -1,
	    "language": "en-US",
	    "pageNo": -1,
	    "pageSize": -1,
	    "realTotalRows": -1,
	    "responseStatus": "0",
	    "startRow": -1,
	    "totalPages": -1,
	    "totalRows": -1,
	    "userId": 0,
	    "userIp": "10.0.0.112"
	  },
	  "success": true
	}

### 修改状态接口
	/shop/product/show/ui/alterStatus.do
	**入参**
	/*入参 Status 有4个状态
		WAITE4PAY("WAITE4PAY")//待付款 数据库默认状态
		WAITE4ENSURE("WAITE4ENSURE")//已付款待确认
		ENSURE2PAID("ENSURE2PAID")//已确认付款
		SUCCESS("SUCCESS")//成功
	*/
	{
		"RecordID":74,
		"status":"WAITE4ENSURE" 
	}
	**回参**
    {
        "envData":
        {
            "endRow": -1,
            "language": "en-US",
            "pageNo": -1,
            "pageSize": -1,
            "realTotalRows": -1,
            "responseStatus": "0",
            "startRow": -1,
            "totalPages": -1,
            "totalRows": -1,
            "userId": 0,
            "userIp": "192.168.1.141"
        },
        "success": true
    }


		
		
		
		
		
		
		
		
		
		
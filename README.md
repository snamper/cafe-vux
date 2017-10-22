### 接口文档

##### 分类数据接收API

    const ApiCategorys = '/shop/category/show/ui/getCategoriedProducts.do';
    

**返回数据**

	{
	"甜品": [{
	  "canBook": true,
	  "classifyId": 70,
	  "code": "0090645a-2ca6-4a5b-b250-13a8403930d5",
	  "creatPeriod": "40",
	  "createTime": 1505439759644,
	  "creatorId": -1,
	  "defaultEntity": false,
	  "description": "慕斯蛋糕",
	  "id": 71,
	  "imageSliderUrl": "static/img/silder1.jpg",
	  "imageUrl": "static/img/test1.jpg",
	  "memberPrice": 45,
	  "name": "慕斯蛋糕",
	  "objClass": "com.xdt.ums.shop.common.entity.ProductImpl",
	  "price": 50,
	  "slider": true
	}],
	"咖啡": [{
	"canBook": false,
	"classifyId": 62,
	"code": "5cf0fd83-4a3d-4014-9a66-745fdf80222c",
	"creatPeriod": "34",
	"createTime": 1505439679696,
	"creatorId": -1,
	"defaultEntity": false,
	"description": "得分是",
	"id": 67,
	"imageSliderUrl": "static/img/silder2.jpg",
	"imageUrl": "static/img/test2.jpg",
	"memberPrice": 8,
	"name": "拿铁咖啡",
	"objClass": "com.xdt.ums.shop.common.entity.ProductImpl",
	"price": 10,
	"slider": true
	  },
	  {
	"canBook": true,
	"classifyId": 62,
	"code": "73dde60a-a030-4913-af8f-40e8c3403860",
	"creatPeriod": "67",
	"createTime": 1505439688471,
	"creatorId": -1,
	"defaultEntity": false,
	"description": "45",
	"id": 69,
	"imageSliderUrl": "static/img/silder3.jpg",
	"imageUrl": "static/img/test3.jpg",
	"memberPrice": 34,
	"name": "猫屎咖啡",
	"objClass": "com.xdt.ums.shop.common.entity.ProductImpl",
	"price": 45,
	"slider": false
	  }
	]
	  }


##### 会员登陆接口

    const ApiMemberLogin = '/shop/member/show/ui/memberLogin.do';

**提交数据**

    { 
		username: 'lizhe',
      	password: '658dedfd3a94f5d58ab35cd534d4b484'
	}

**返回数据**

1. 成功

	`{
		"balance": 5,
		"ID": 3,
		"name": "totti"
	}`

2. 失败

`
null
`

##### 创建用户接口

    const ApiCreateMember = '/shop/member/show/ui/createMember.do';

**提交数据**

	{
		"username":"",
		"phone":"18982278872",
		"password":"55758ada4082b0444445b0aee5c45bc7"
	}


**返回数据**

	{
		"entityid":"888",
		"entityName":"Vue"
	}


#####  重复用户名校验
	const ApiIsExistUserName = '/shop/member/show/ui/isExistUserName.do';

**提交数据**

	{
		"totti"
	}

**返回数据**

1. 有重复名字

	true

2. 无重复名字
	
	false

##### 获取用户购物清单
	const ApiGetRecordList = '/shop/product/show/ui/getRecordList.do';

**提交数据**

	{
		"userId":"userId ",
		"needDetail":"true"
	}

**返回数据**

1. needDetail为真
 
		[{
		    "amount": 66,
		    "cashOrBanlance": " ",
		    "code": "34c9829f-d57d-4e35-a8cb-51b861467b21",
		    "createTime": 1508251634463,
		    "creatorId": -1,
		    "defaultEntity": false,
		    "details": [{
		      "amount": 22,
		      "code": "0cf24a6a-d464-4657-806f-412b508c24d1",
		      "createTime": 1508251633955,
		      "creatorId": -1,
		      "defaultEntity": false,
		      "id": 100,
		      "number": 2,
		      "objClass": "com.xdt.ums.shop.common.entity.DetailImpl",
		      "price":11,
		      "productName":"慕斯蛋糕",
		      "productId": 2,
		      "recordId": 99
		    }, {
		      "amount": 44,
		      "code": "c4abae95-d9d0-408d-8397-57c12fd125c1",
		      "createTime": 1508251633955,
		      "creatorId": -1,
		      "defaultEntity": false,
		      "id": 101,
		      "number": 2,
		      "objClass": "com.xdt.ums.shop.common.entity.DetailImpl",
		      "productId": 3,
		      "price":22,
		      "productName":"美式咖啡",
		      "recordId": 99
		    }],
		    "id": 99,
		    "objClass": "com.xdt.ums.shop.common.entity.RecordImpl",
		    "status": "success",
		    "userId": 84,
		    "userName": "test3"
		  }, {
		    "amount": 124,
		    "cashOrBanlance": " ",
		    "code": "55280e74-0e83-458a-8998-788cb5a9176d",
		    "createTime": 1508251795107,
		    "creatorId": -1,
		    "defaultEntity": false,
		    "details": [{
		      "amount": 94,
		      "code": "f9f4c8a8-ec93-4974-9c10-30c0c81be62d",
		      "createTime": 1508251708535,
		      "creatorId": -1,
		      "defaultEntity": false,
		      "id": 103,
		      "number": 2,
		      "objClass": "com.xdt.ums.shop.common.entity.DetailImpl",
		      "productId": 3,
		      "price":32,
		      "productName":"摩卡咖啡",
		      "recordId": 102
		    }, {
		      "amount": 30,
		      "code": "b0c0d78f-3d38-4cd6-9902-7246cf47f980",
		      "createTime": 1508251708535,
		      "creatorId": -1,
		      "defaultEntity": false,
		      "id": 104,
		      "number": 3,
		      "objClass": "com.xdt.ums.shop.common.entity.DetailImpl",
		      "productId": 3,
		      "price":10,
		      "productName":"杯子蛋糕",
		      "recordId": 102
		    }],
		    "id": 102,
		    "objClass": "com.xdt.ums.shop.common.entity.RecordImpl",
		    "status": "success",
		    "userId": 84,
		    "userName": "test3"
		  }]

2. needDetail为假

		[{
		    "amount": 56,
		    "cashOrBanlance": " ",
		    "code": "34c9829f-d57d-4e35-a8cb-51b861467b21",
		    "createTime": 1508251634463,
		    "creatorId": -1,
		    "defaultEntity": false,
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
		    "id": 102,
		    "objClass": "com.xdt.ums.shop.common.entity.RecordImpl",
		    "status": "success",
		    "userId": 84,
		    "userName": "test3"
		  }]
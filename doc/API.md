### 获取分类商品的列表

    const ApiCategorys = '/shop/category/show/ui/getCategoriedProducts.do';
**入参**

	无

**回参**

	{"分类1":[{"canBook":false,"classifyId":63,"code":"43b43ac8-f79d-46e2-a968-123386498728","creatPeriod":"32","createTime":1508075218930,"creatorId":-1,"defaultEntity":false,"description":"32","id":75,"memberPrice":32,"name":"test","objClass":"com.xdt.ums.shop.common.entity.ProductImpl","price":21,"slider":false},{"canBook":false,"classifyId":63,"code":"e349c5ee-b005-4cb6-93b7-20755a01c385","creatPeriod":"32","createTime":1508075310072,"creatorId":-1,"defaultEntity":false,"id":76,"memberPrice":23,"name":"test2","objClass":"com.xdt.ums.shop.common.entity.ProductImpl","price":2313,"slider":false}]}


### 获取购买商品列表
    
    const ApiGetRecordList = '/shop/product/show/ui/getRecordList.do';
    
**入参**
	{"userId":"84","needDetail":"true"} 
	备注：这两个入参可选填
	
**回参**

	[{"amount":500,"code":"464764646","createTime":1507470003839,"creatorId":4646433,"defaultEntity":false,"description":"464dadgaygdad","details":[],"id":69,"name":"lisi","objClass":"com.xdt.ums.shop.common.entity.RecordImpl","status":"success","userId":0,"userName":"wangwu"},{"amount":56,"cashOrBanlance":" ","code":"34c9829f-d57d-4e35-a8cb-51b861467b21","createTime":1508251634463,"creatorId":-1,"defaultEntity":false,"details":[],"id":99,"objClass":"com.xdt.ums.shop.common.entity.RecordImpl","status":"success","userId":84,"userName":"test3"},{"amount":56,"cashOrBanlance":" ","code":"55280e74-0e83-458a-8998-788cb5a9176d","createTime":1508251795107,"creatorId":-1,"defaultEntity":false,"details":[],"id":102,"objClass":"com.xdt.ums.shop.common.entity.RecordImpl","status":"success","userId":84,"userName":"test3"}]

### 是否用户名已存在

    const ApiIsExistUserName = '/shop/member/show/ui/isExistUserName.do';

**入参**

	{"entityName":"test"}

**回参**

	true or false

### 用户登录接口

    const ApiMemberLogin = '/shop/member/show/ui/memberLogin.do';

**入参**

	{"name":"ccc","passWd":"dad"}

**回参**

	{"balance":0,"cardGrade":"","cardNo":"","cardStatus":"","createTime":"2017-10-23 21:04:13","description":"","gender":"Male","handNo":"","id":107,"name":"ccc"}

### 用户注册接口

    const ApiCreateMember = '/shop/member/show/ui/createMember.do';

**入参**

	{"name":"ccc","passWd":"dad"}

**回参**

	{"entityId":"107","entityName":"ccc","envData":{"endRow":-1,"language":"","pageNo":-1,"pageSize":-1,"realTotalRows":-1,"responseStatus":"0","startRow":-1,"totalPages":-1,"totalRows":-1,"userIp":"","userName":""},"success":true}
	
# cafe

> a project about cafe

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
设计思路
1. 分模块进行
2. 主页分成两个模块
    模块1: 底部选项卡（主页，商品，购物车，会员结算）四个部分
    小模块1: 头部logo模块
    小模块2: 增加删除商品数量模块
    模块2: 主页模块
        小模块3：轮播模块
        如果存在热销产品，则显示热销产品列表
            点击热销产品的时候，需要显示详细信息
    模块3: 商品模块
        目前做成商品列表显示。
            点击热销产品的时候，需要显示详细信息
        后续：左侧显示商品的列表，右侧显示商品的详情（仿饿了么）
    模块4: 详细信息模块
        显示商品的详细信息。
    模块5: 显示购物的详细信息
        当购物车有商品的时候，需要在底部显示结算模块。（仿京东)
        小模块4: 结算模块
    模块6：会员管理模块
        小模块5: 登陆模块
        小模块6: 会员管理模块
        小模块7: 充值服务模块
        小模块8: 付款模块 
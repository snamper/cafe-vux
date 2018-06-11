<template>
  <div class="order">
    <van-cell-swipe :right-width="65">
      <van-cell-group>
        <van-cell>
          <template class="title" slot="title">
            <van-checkbox v-model="checked"></van-checkbox>
            <img :src="good.imageUrl" style="height:50px;width: 50px">
          </template>
          <van-icon slot="right-icon" name="search" class="van-cell__right-icon" />
        </van-cell>
      </van-cell-group>
      <span slot="right">删除</span>
    </van-cell-swipe>
  </div>
</template>

<script type="text/ecmascript=6">
import { RadioGroup, Radio, Checkbox, Icon, Cell, CellGroup, CellSwipe } from 'vant';
export default {
  data() {
    return {
      radio: 1,
      checked: false,
      good: {
        canBook: true,
        classifyId: 69,
        code: 'd519d09e-3bbd-4e5e-b044-715b02e75805',
        creatPeriod: '',
        createTime: 1521645341000,
        createTimeAsString: '2018-03-21 23:15:41',
        creatorId: -1,
        defaultEntity: false,
        description: '是肯定分离焦虑斯柯达据了解是开机地方了撒娇的就sad拉开就打算冷风机老大说封口胶辽阔的书法家辽阔的设计费辽阔的设计费鲁大师就发流口水当减肥离开的时间流口水当减肥李松快当减肥流口水当减肥离开的时间发连接的斯洛伐克就电视了开发借了时代峻峰了开机但是飞',
        id: 268,
        imageSliderUrl: '/upload/dongwubinggan-1521645338239.jpg',
        imageUrl: '/upload/dongwubinggan-1521645338239.jpg',
        memberPrice: 88,
        name: '动物饼干',
        objClass: 'com.xdt.ums.shop.common.entity.ProductImpl',
        price: 88,
        slider: true
      }
    };
  },
  props: {
    product: {
      type: Object
    }
  },
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [CellSwipe.name]: CellSwipe,
    [Checkbox.name]: Checkbox,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.van-cell-swipe
  .van-cell-swipe__right,.van-cell-swipe__left
    span
      color: #FFFFFF;
      font-size: 15px;
      width: 65px;
      height: 44px;
      display: inline-block;
      text-align: center;
      line-height: 44px;
      background-color: #F44;
</style>

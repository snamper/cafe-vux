<template>
  <div>
    <div class="banner">
      <van-checkbox class="title" v-model="checked">树影啡香</van-checkbox>
      <span @click="showdelete">编辑</span>
    </div>
    <div class="order" v-for="(product, index) in 10" :key="index">
      <order></order>
    </div>
    <div class="submit">
      <van-submit-bar
        button-text="删除"
        @submit="onSubmit">
        <van-checkbox class="checkbox" v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, CheckboxGroup, SubmitBar } from 'vant';
import order from './order';
export default {
  data() {
    return {
      checked: 1
    }
  },
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [SubmitBar.name]: SubmitBar,
    order
  },
  methods: {
    showdelete() {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.banner
  background-color rgb(244, 244, 244)
  height 40px
  display flex
  .title
    display inline-flex
    align-items center
    padding 10px 10px 10px 25px
  span
    font-size 16px
    line-height 40px
    margin-left auto
    margin-right 10px
.submit
  .van-submit-bar
    bottom 50px
  .checkbox
    padding 15px 15px 15px 25px
</style>

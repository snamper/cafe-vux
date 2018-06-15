<template>
  <div>
    <div class="banner">
      <van-checkbox class="title" v-model="checked">树影啡香</van-checkbox>
      <span @click="showdelete">{{editTitle}}</span>
    </div>
    <div class="order" v-for="(product, index) in 10" :key="index">
      <order></order>
    </div>
    <div class="submit">
      <van-submit-bar
        :button-text="submittitle"
        :price="3050"
        @submit="onSubmit">
        <van-checkbox class="checkbox" v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, CheckboxGroup, SubmitBar } from 'vant';
import order from './order';
import Logger from 'chivy';
const log = new Logger('pages/cart/cart');
export default {
  data() {
    return {
      edit: false,
      checked: 1
    }
  },
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [SubmitBar.name]: SubmitBar,
    order
  },
  computed: {
    submittitle() {
      if (this.edit) {
        return '删除';
      } else {
        return '结算';
      }
    },
    editTitle() {
      if (this.edit) {
        return '完成';
      } else {
        return '编辑';
      }
    }
  },
  methods: {
    showdelete() {
      this.edit = !this.edit;
    },
    onSubmit() {
      if (this.edit) {
        // 删除
      } else {
        // 结算
        log.info('pay');
        this.$router.push({name: 'pay'});
      }
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

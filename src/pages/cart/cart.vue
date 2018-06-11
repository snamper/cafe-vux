<template>
  <div>
    <div class="banner">
      <van-checkbox class="title" v-model="checked">树影啡香</van-checkbox>
      <span @click="showdelete">编辑</span>
    </div>
    <div>
      <order></order>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, CheckboxGroup } from 'vant';
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
  padding 10px
  display flex
  .title
    display inline
  span
    font-size 16px
    line-height 20px
    margin-left auto
    mragin-right 5px
</style>

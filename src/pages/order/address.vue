<template>
  <div class="address van-hairline--bottom">
    <div class="contact">
      <span class="left">
        <van-icon name="location"/>
        <span class="name">收货人: {{name}}</span>
      </span>
      <span class="right">{{mobile}}</span>
    </div>
    <div class="location">收货地址: {{location}}</div>
    <!-- <icon class="van-contact-card__arrow" name="arrow" /> -->
  </div>
</template>

<script type="text/ecmascript=6">
import { Icon } from 'vant';
export default {
  data() {
    return {
      name: '普京',
      mobile: '13333333338',
      location:'四川省成都市成华区洪山北路99号xx小区xx楼xx号'
    };
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.address
  background-color rgb(255, 255, 255)
  padding 10px 0px
  .contact
    padding 10px
    display flex
    .left, .right
      font-size 16px
    .right
      margin-left auto
  .location
    padding-left 30px
    padding-right 5px
</style>

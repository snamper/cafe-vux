<template>
  <div class="address van-hairline--bottom">
    <div v-if="show && address !== null">
      <div class="contact">
        <span class="left">
          <van-icon name="location"/>
          <span class="name">收货人: {{address.name}}</span>
        </span>
        <span class="right">{{address.mobile}}</span>
      </div>
      <div class="location">收货地址: {{address.province}}{{address.city}}{{address.county}}{{address.address}}</div>
    </div>
    <div class="add" v-else>
      <van-row>
        <van-col class="addicon" span="4">
          <van-icon name="add"/>
        </van-col>
        <van-col class="title" span="16">添加订单联系人信息</van-col>
        <van-col class="arrowicon" span="4" @click.native="addaddress">
          <van-icon name="arrow"/>
        </van-col>
      </van-row>
    </div>
    <!-- <icon class="van-contact-card__arrow" name="arrow" /> -->
  </div>
</template>

<script type="text/ecmascript=6">
import { Icon, Row, Col } from 'vant';
import Logger from 'chivy';
import { isObjEmpty } from '../common/js/util';
const log = new Logger('components/orderaddress');
export default {
  data() {
    return {
    };
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    address: {
      type: Object
    }
  },
  components: {
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col
  },
  methods: {
    addaddress() {
      log.info('arrow is clicked');
      this.$emit('addaddress');
    }
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
  .add
    display flex
    height 50px
    .van-row
      width 100%
      height 100%
    .addicon
      padding 5px
      font-size 40px
      line-height 50px
      color blue
    .title
      font-size 18px
      line-height 50px
    .arrowicon
      text-align right
      font-size 20px
      padding 5px
      line-height 50px

</style>

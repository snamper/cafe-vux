<template>
  <div class="pay">
    <van-nav-bar
      title="待付款的订单"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <div class="content">
      <addr :show="false" @addaddress="addaddress"></addr>
      <div class="orderlist" v-for="(good, index) in selectFoods" :key="index">
        <product :good="good"></product>
      </div>
      <van-cell-group>
        <van-cell title="配送方式" :value="delivertype" is-link @click="select"/>
        <van-field
          v-model="comment"
          label="留言"
          placeholder="点击给商家留言">
        </van-field>
        <van-cell title="合计" :value="value"/>
      </van-cell-group>
      <split></split>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div>商品总价</div>
            <div>会员优惠</div>
          </template>
          <div>￥{{totalAttr.normal}}</div>
          <div>￥{{totalAttr.normal - totalAttr.member}}</div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="submit">
      <van-submit-bar
        button-text="提交订单"
        :price="totalAttr.normal * 100"
        @submit="onSubmit">
      </van-submit-bar>
    </div>
    <van-actionsheet v-model="action">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="confirm"
        @cancel="cancel">
      </van-picker>
    </van-actionsheet>
  </div>
</template>

<script type='text/ecmascript=6'>
import { NavBar, Cell, CellGroup, Field, SubmitBar, Actionsheet, Picker } from 'vant';
import product from '../../components/productbanner';
import addr from '../../components/orderaddress';
import split from '../../components/split';
import { mapGetters } from 'vuex';
import Logger from 'chivy';
const log = new Logger('pages/cart/pay');
export default {
  data() {
    return {
      delivertype: '自提',
      action: false,
      comment: '',
      currentContact: {
        name: '张三',
        tel: '13000000000',
      },
      cardType: 'add',
      columns: ['自提','快递']
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [SubmitBar.name]: SubmitBar,
    [Actionsheet.name]: Actionsheet,
    [Picker.name]: Picker,
    product,
    addr,
    split
  },
  computed: {
    ...mapGetters([
      'selectFoods',
      'totalAttr',
    ]),
    value() {
      return '￥' + this.totalAttr.normal;
    }
  },
  methods: {
    back() {

    },
    addaddress() {
      this.$router.push({name: 'address', params: {selectFoods: this.selectFoods, totalAttr: this.totalAttr}});
    },
    addcontact() {
      log.debug('add');
    },
    onSubmit() {

    },
    select() {
      this.action = true;
      log.debug('select type 自提和快递');
    },
    confirm(value) {
      log.debug(JSON.stringify(value));
      this.delivertype = value;
      this.action = false;
    },
    cancel() {
      this.action = false;
    }
  }
};
</script>

<style lang=stylus' rel=stylesheet/stylus' scoped>
.content
  margin-bottom 50px
</style>

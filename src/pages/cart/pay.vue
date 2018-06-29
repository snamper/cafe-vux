<template>
  <div class="pay">
    <van-nav-bar
      title="待付款的订单"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <div class="content">
      <addr :address="address" @addaddress="addaddress"></addr>
      <div class="orderlist" v-for="(good, index) in records" :key="index">
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
            <div v-if="delivertype === '快递'">快递费用</div>
          </template>
          <div>￥{{totalRecords.normal}}</div>
          <div>￥{{totalRecords.normal - totalRecords.member}}</div>
          <div v-if="delivertype === '快递'">￥{{deliverPrice}}</div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="submit">
      <van-submit-bar
        button-text="提交订单"
        :price="price"
        :disabled="address === null ? true : false"
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
import { mapState, mapGetters } from 'vuex';
import product from '../../components/productbanner';
import addr from '../../components/addresscard';
import split from '../../components/split';
import Logger from 'chivy';
import { isObjEmpty } from '../../common/js/util';
import { deliverPrice } from '../../common/js/consts';
const log = new Logger('pages/cart/pay');
export default {
  data() {
    return {
      deliverPrice,
      delivertype: '自提',
      action: false,
      comment: '',
      cardType: 'add',
      columns: ['自提','快递']
    };
  },
  beforeRouteEnter(from, to, next){
    log.debug('to path is ' + to.path);
    log.debug('from path is ' + from.path);
    next(vm => {
      if (vm.records.length === 0) {
        vm.$router.push({name: 'cart'});
      }
    });
  },
  props: {
    address: {
      type: Object,
      default: null
    }
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
    ...mapState([
      'records'
    ]),
    ...mapGetters([
      'totalRecords'
    ]),
    value() {
      return '￥' + this.totalRecords.normal;
    },
    type() {
      isObjEmpty(this.address) ? 'add' : 'edit';
    },
    price() {
      return this.delivertype === '自提' ? this.totalRecords.normal * 100 : (this.totalRecords.normal + this.deliverPrice) * 100;
    },
    deliverType() {
      return this.delivertype === '自提' ? false : true;
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'cart'});
    },
    addaddress() {
      log.debug('jump page to address');
      this.$router.push({name: 'address'});
    },
    onSubmit() {
      log.debug('onsubmit');
      this.$router.push({name: 'payment', params: {deliverType: this.deliverType, address: this.address}});
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
    },
    __back2cart() {
      this.$router.push({name: 'cart'});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.van-nav-bar
  position fixed
  left 0
  top 0
  width 100%
.content
  margin-top 46px
  margin-bottom 50px
</style>

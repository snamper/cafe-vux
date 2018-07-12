<template>
  <div class="pay">
    <van-nav-bar
      :title="$t('order.wait4payOrder')"
      left-arrow
      @click-left="backHistoryPage">
    </van-nav-bar>
    <div class="content">
      <addr :address="ConverAddress(address)" @addaddress="addaddress"></addr>
      <div class="orderlist" v-for="(good, index) in carts" :key="index">
        <product :good="good"></product>
      </div>
      <van-cell-group>
        <van-cell :title="$t('order.deliveryType')" :value="delivertype" is-link @click="select"/>
        <van-field
          v-model="comment"
          :label="$t('order.message')"
          :placeholder="$t('order.messagePlaceholder')">
        </van-field>
        <van-cell :title="$t('order.summary')" :value="value"/>
      </van-cell-group>
      <split></split>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div>{{$t('order.productTotalPrice')}}</div>
            <div>{{$t('order.memberDiscount')}}</div>
            <div v-if="delivertype === columns[1]">{{$t('order.deliveryPrice')}}</div>
          </template>
          <div>￥{{price.normal}}</div>
          <div>￥{{price.normal - price.member}}</div>
          <div v-if="delivertype === columns[1]">￥{{deliverPrice}}</div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="submit">
      <van-submit-bar
        :button-text="$t('order.submitOrder')"
        :price="totalPrice"
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
import product from '@/components/good';
import addr from '@/components/address';
import split from '@/components/split';
import Logger from 'chivy';
const log = new Logger('views/order');
export default {
  data() {
    return {
      delivertype: this.$t('order.self'),
      action: false,
      comment: '',
      cardType: 'add',
      columns: [this.$t('order.self'), this.$t('order.fastDelivery')]
    };
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      log.warn('carts length is ' + vm.$store.state.carts.length);
      if (vm.$store.state.carts.length === 0) {
        vm.$router.push({name: 'cart'});
      }
      /**
       * 当前是否为会员登陆，如果会员登陆则先找出默认地址，并将state中address置为该地址
       * 需要看页面是从哪里来，如果是从address页面来，则不需要做这个服务器获取地址动作
      */
      // debugger
      vm.$toast.clear();
      vm.$store.commit('updateLoadingStatus', {isLoading: true});
      if (to.path !== '/address' && vm.$tools.isNotEmpty(vm.$store.state.member)) {
        log.info('get address from server');
        // 找出默认地址
        vm.GetAddresses(vm.$store.state.member.id).then(() => {
          vm.$store.commit('updateLoadingStatus', {isLoading: false});
        }).catch(error => {
          log.error(error);
          vm.$store.commit('updateLoadingStatus', {isLoading: false});
        });
      }
    });
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
      'address',
      'addresses',
      'carts',
      'deliverPrice'
    ]),
    price() {
      let price = 0;
      let member = 0;
      this.carts.forEach(food => {
        price += food.price * food.count;
        member += (food.memberPrice ? food.memberPrice : 0) * food.count;
      });
      return {normal: price, member: member};
    },
    value() {
      return '￥' + this.price.normal;
    },
    type() {
      this.$tools.isEmpty(this.address) ? 'add' : 'edit';
    },
    totalPrice() {
      return this.delivertype === this.columns[0] ? this.price.normal * 100 : (this.price.normal + this.deliverPrice) * 100;
    },
    deliverType() {
      return this.delivertype === this.columns[0] ? false : true;
    }
  },
  methods: {
    backHistoryPage() {
      this.$router.push({name: 'cart'});
    },
    addaddress() {
      log.info('jump page to address');
      this.$router.push({name: 'address'});
    },
    onSubmit() {
      log.info('onsubmit');
      this.$router.push({name: 'pay', params: {deliverType: this.deliverType, address: this.address}});
    },
    select() {
      this.action = true;
    },
    confirm(value) {
      this.delivertype = value;
      this.action = false;
    },
    cancel() {
      this.action = false;
    },
    // 获取所有配送地址
    GetAddresses(id) {
      return this.$store.dispatch('getAddress', {entityId: id});
    },
    ConverAddress(address) {
      return this.$tools.convertAddress(address);
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

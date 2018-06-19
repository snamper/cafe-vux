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
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
            canBook: true,
            classifyId: 69,
            code: 'd519d09e-3bbd-4e5e-b044-715b02e75805',
            creatPeriod: '',
            createTime: 1521645341000,
            createTimeAsString: '2018-03-21 23:15:41',
            creatorId: -1,
            defaultEntity: false,
            description: '',
            id: 268,
            imageSliderUrl: '/upload/dongwubinggan-1521645338239.jpg',
            imageUrl: '/upload/dongwubinggan-1521645338239.jpg',
            memberPrice: 88,
            name: '动物饼干',
            objClass: 'com.xdt.ums.shop.common.entity.ProductImpl',
            price: 88,
            slider: true,
            count: 1
          },
          {
            canBook: true,
            classifyId: 69,
            code: '117cefbc-bfea-4eef-aa77-38f22af708be',
            creatPeriod: '',
            createTime: 1521645361000,
            createTimeAsString: '2018-03-21 23:16:01',
            creatorId: -1,
            defaultEntity: false,
            description: '',
            id: 269,
            imageSliderUrl: '',
            imageUrl: '/upload/tangshuangbinggan-1521645358754.jpg',
            memberPrice: 168,
            name: '翻糖饼干',
            objClass: 'com.xdt.ums.shop.common.entity.ProductImpl',
            price: 168,
            slider: false,
            count: 1
          },
          {
            canBook: true,
            classifyId: 2,
            code: '0dead79d-f18a-4f64-8234-e98fe17a782e',
            creatPeriod: '',
            createTime: 1521643698000,
            createTimeAsString: '2018-03-21 22:48:18',
            creatorId: -1,
            defaultEntity: false,
            description: '',
            id: 256,
            imageSliderUrl: '',
            imageUrl: '/upload/shaonvxin-1521643682172.jpg',
            memberPrice: 218,
            name: '少女心蛋白糖蛋糕',
            objClass: 'com.xdt.ums.shop.common.entity.ProductImpl',
            price: 218,
            slider: false,
            count: 1
          },
          ,
          {
            canBook: true,
            classifyId: 2,
            code: '0dead79d-f18a-4f64-8234-e98fe17a782e',
            creatPeriod: '',
            createTime: 1521643698000,
            createTimeAsString: '2018-03-21 22:48:18',
            creatorId: -1,
            defaultEntity: false,
            description: '',
            id: 256,
            imageSliderUrl: '',
            imageUrl: '/upload/shaonvxin-1521643682172.jpg',
            memberPrice: 218,
            name: '少女心蛋白糖蛋糕',
            objClass: 'com.xdt.ums.shop.common.entity.ProductImpl',
            price: 218,
            slider: false,
            count: 1
          }
        ]
      }
    },
    totalAttr: {
      type: Object,
      default() {
        return {
          normal: 474,
          member: 474,
          count: 3
        }
      }
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
    ...mapGetters([
      ''
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

<template>
  <div class="pay">
    <van-nav-bar
      title="待付款的订单"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <div class="content">
      <van-contact-card
        :type="cardType"
        :name="currentContact.name"
        :tel="currentContact.tel">
      </van-contact-card>
      <div class="orderlist" v-for="(o,i) in 3" :key="i">
        <order></order>
      </div>
      <van-cell-group>
        <van-cell title="配送方式" value="自提" is-link @click="select"/>
        <van-field
          v-model="birthday"
          label="留言"
          placeholder="点击给商家留言"
          @focus="selectbirthday">
        </van-field>
        <van-cell title="合计" value="￥420.00"/>
      </van-cell-group>
    </div>
    <div class="submit">
      <van-submit-bar
        button-text="提交订单"
        :price="3050"
        @submit="onSubmit">
      </van-submit-bar>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { ContactCard, ContactList, ContactEdit, NavBar, Cell, CellGroup, Field, SubmitBar } from 'vant';
import order from './order';
import Logger from 'chivy';
const log = new Logger('pages/cart/pay');
export default {
  data() {
    return {
      currentContact: {
        name: '张三',
        tel: '13000000000',
      },
      cardType: 'add'
    };
  },
  components: {
    [ContactCard.name]: ContactCard,
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [SubmitBar.name]: SubmitBar,
    order
  },
  methods: {
    back() {

    },
    select() {
      log.debug('select type 自提和快递');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.content
  margin-bottom 50px
</style>

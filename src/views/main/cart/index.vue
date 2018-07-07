<template>
  <div class="cart">
    <div class="cart" v-if="selectFoods.length !== 0">
      <div class="banner">
        <van-checkbox class="title" v-model="checked" @change="onClickSelectAllCheckbox">{{$t('cart.shopName')}}</van-checkbox>
        <span @click="onClickModifySwitch">{{editText}}</span>
      </div>
      <van-checkbox-group v-model="result">
        <div class="order" v-for="(product, index) in selectFoods" :key="index">
          <productbanner showcheckbox :good="product" :edit="!edit"></productbanner>
        </div>
      </van-checkbox-group>
      <div class="submit">
        <van-submit-bar
          :button-text="opsText"
          :disabled="disable"
          :price="price"
          @submit="onSubmit">
          <van-checkbox class="checkbox" v-model="checked" @change="onClickSelectAllCheckbox">{{$t('cart.selectAll')}}</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
    <div v-else class="nocart">
      <div class="text">
        <div class="title">{{$t('cart.nonSelect')}}</div>
        <div class="subtitle">{{$t('cart.selectGoods')}}</div>
        <div class="search">
          <van-button type="default" size="small" @click="jump2MenuPage">{{$t('cart.vistor')}}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, CheckboxGroup, SubmitBar, Button } from 'vant';
import { mapGetters } from 'vuex';
import productbanner from '@/components/good';
import Logger from 'chivy';
const log = new Logger('views/main/cart');
export default {
  data() {
    return {
      show: false,
      edit: false,
      checked: true,
      result: []
    }
  },
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [SubmitBar.name]: SubmitBar,
    [Button.name]: Button,
    productbanner
  },
  activated() {
    log.debug('activated');
    this.SelectFoodIds()
  },
  computed: {
    ...mapGetters([
      'selectFoods',
    ]),
    // 普通价格
    price() {
      let price = 0;
      this.selectFoods.forEach(food => {
        price += food.price * food.count;
      })
      return price * 100;
    },
    opsText() {
      return this.edit ? this.$t('cart.delete') : this.$t('cart.pay');
    },
    editText() {
      return this.edit ? this.$t('cart.finish') : this.$t('cart.edit');
    },
    disable() {
      return this.result.length === 0 && this.opsText === this.$t('cart.count') ? true : false;
    },
    ischecked() {
      return this.result.length === this.selectFoods.length ? true : false;
    }
  },
  methods: {
    onClickModifySwitch() {
      this.edit = !this.edit;
    },
    onSubmit() {
      if (this.edit) {
        // 删除
        this.$store.commit('clearCarts');
      } else {
        // 结算
        const goods = this.SelectedFoods();
        this.$store.dispatch('setcartsgoods', goods).then(() => {
          this.$router.push({name: 'order'});
        });
      }
    },
    jump2MenuPage() {
      this.$router.push({name: 'menu'});
    },
    onClickSelectAllCheckbox() {
      this.checked ? this.SelectFoodIds : this.result = [];
    },
    // 购物车的IDs，用于选择返回
    SelectFoodIds() {
      this.result = [];
      this.selectFoods.forEach(good => {
        this.result.push(good.id);
      });
    },
    // 计算选中的商品
    SelectedFoods() {
      const paygoods = [];
      this.selectFoods.forEach(good => {
        this.result.forEach(id => {
          if (id === good.id) {
            paygoods.push(good);
          }
        })
      });
      return paygoods;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
.cart
  height 100%
  width 100%
  .cart
    .banner
      // bgcolor()
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
    .van-checkbox-group
      margin-bottom 100px
    .submit
      .van-submit-bar
        bottom 50px
      .checkbox
        padding 15px 15px 15px 25px
  .nocart
    .text
      width 100%
      height 100%
      padding 50% 0px
      .title
        font-size 20px
        text-align center
        padding 10px 0px
      .subtitle
        font-size 16px
        text-align center
        padding 5px 0px
        gray-color()
      .search
        margin 15px 0px
        display flex
        justify-content center
        align-items center
        .van-button
          border 1px solid rgb(255, 97, 25)
          price-color()
</style>

<template>
  <div class="cart">
    <div class="cart" v-if="selectFoods.length !== 0">
      <div class="banner">
        <van-checkbox class="title" v-model="checked" @change="selectall">树影啡香</van-checkbox>
        <span @click="showdelete">{{editTitle}}</span>
      </div>
      <van-checkbox-group v-model="result">
        <div class="order" v-for="(product, index) in selectFoods" :key="index">
          <productbanner showcheckbox :good="product" :edit="!edit"></productbanner>
        </div>
      </van-checkbox-group>
      <div class="submit">
        <van-submit-bar
          :button-text="submittitle"
          :disabled="disable"
          :price="totalAttr.normal*100"
          @submit="onSubmit">
          <van-checkbox class="checkbox" v-model="checked" @change="selectall">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
    <div v-else class="nocart">
      <div class="text">
        <div class="title">购物车快饿瘪了~~</div>
        <div class="subtitle">请购买商品</div>
        <div class="search">
          <van-button type="default" size="small" @click="showmain">去逛逛</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Checkbox, CheckboxGroup, SubmitBar, Button } from 'vant';
import { mapGetters } from 'vuex';
import productbanner from '../../components/productbanner';
import Logger from 'chivy';
const log = new Logger('pages/cart/cart');
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
    this.__setselected();
  },
  computed: {
    ...mapGetters([
      'selectFoods',
      'totalAttr',
    ]),
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
    },
    disable() {
      if (this.result.length === 0 && this.submittitle === '结算') {
        return true;
      }
      return false;
    },
    ischecked() {
      if (this.result.length === this.selectFoods.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },
  methods: {
    __setselected() {
      this.result = [];
      this.selectFoods.forEach(good => {
        this.result.push(good.id);
      });
    },
    showdelete() {
      this.edit = !this.edit;
    },
    onSubmit() {
      if (this.edit) {
        // 删除
        this.$store.commit('clearCarts');
      } else {
        // 结算
        // 计算选中的商品
        const goods = this.__selectCartGoods();
        this.$store.dispatch('setcartsgoods', goods).then(() => {
          this.$router.push({name: 'pay'});
        });
      }
    },
    showmain() {
      this.$router.push({name: 'menu'});
    },
    selectall() {
      log.debug('select all');
      // this.select();
      if (this.checked) {
        this.__setselected();
      } else {
        this.result = [];
      }
    },
    __selectCartGoods() {
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
@import '../../common/stylus/mixin.styl';
.cart
  height 100%
  width 100%
  .cart
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

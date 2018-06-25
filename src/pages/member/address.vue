<template>
  <div class="address">
    <van-nav-bar
      title="我的地址"
      left-arrow
      right-text="完成"
      @click-left="back">
    </van-nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    ></van-address-list>
  </div>
</template>

<script type="text/ecmascript=6">
// 判断是否是会员，不是会员则只能添加一个地址，且无法保存地址，如果是会员则可以保存多个地址
import { NavBar, Cell, CellGroup, AddressList, Toast } from 'vant';
import { mapState } from 'vuex';
import { isObjEmpty } from '../../common/js/util';
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        /* {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        } */
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {

    });
  },
  computed: {
    ...mapState([
      'address',
    ])
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [AddressList.name]: AddressList
  },
  methods: {
    onAdd() {
      // 新增收货地址，当address已经存在的情况下，就提示用户不能再次添加地址了
      if (isObjEmpty(this.address)) {
        this.$router.push({name: 'addressedit'});
        return;
      }
      Toast.fail('游客只能添加一个地址');

    },
    onEdit() {
      this.$router.push({name: 'addressedit'});
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

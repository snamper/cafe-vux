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
    />
  </div>
</template>

<script type="text/ecmascript=6">
import { NavBar, Cell, CellGroup, AddressList } from 'vant';
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
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
        }
      ]
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [AddressList.name]: AddressList
  },
  methods: {
    onAdd() {
      this.$router.push({name: 'addressedit'});
    },
    onEdit() {
      this.$router.push({name: 'addressedit'});
    },
    back() {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

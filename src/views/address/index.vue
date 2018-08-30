<template>
  <div class="address">
    <addressList ref="address"></addressList>
  </div>
</template>

<script type="text/ecmascript=6">
import addressList from '@/components/AddressList';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('views/address');
export default {
  name: 'PageAddress',
  data() {
    return {
    };
  },
  components: {
    addressList
  },
  beforeRouteEnter(to, from, next) {
    log.info('beforeRouteEnter address page');
    next(vm => {
        // 当直接进入该页面的时候，退回到主页
        if (vm.$tools.isEmpty(vm.uuid) && vm.$tools.isEmpty(vm.member)) {
          vm.$router.push({name: 'menu'});
        }
        // 购物车为空直接回购物车并且不是从member页面过来的
        if (vm.carts.length === 0 && from.path !== '/member') {
          vm.$router.push({name: 'cart'});
        }
        // 如果address为空则获取一次数据
        if (vm.addresses.length === 0 && vm.$tools.isNotEmpty(vm.member)) {
          vm.$store.dispatch('getAddress', {entityId: vm.member.id});
        }
        // debugger
        // 选中的地址
        vm.$refs.address.chosenAddressId = vm.$tools.isNotEmpty(vm.address) ? vm.address.id : '';
        // 避免从修改页面到其他页面后，不显示列表页面
        vm.$refs.address.ShowListPage();
    })
  },
  computed: {
    ...mapState({
      'uuid': state => state.member.uuid,
      'member': state => state.member.member,
      'addresses': state => state.member.addresses,
      'address': state => state.member.address,
      'carts': state => state.product.carts
    })
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

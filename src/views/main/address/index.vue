<template>
  <div class="page">
    <addressList
      ref="address"
      :backPage="backPage">
    </addressList>
  </div>
</template>

<script type="text/ecmascript-6">
import addressList from '@/components/AddressList';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('views/main/address');
export default {
  nname: 'MainAddress',
  data() {
    return {
      backPage: ''
    };
  },
  components: {
    addressList
  },
  beforeRouteEnter(to, from, next) {
    log.info('beforeRouteEnter expressAddress page');
    // log.debug(from);
    next(vm => {
      vm.backPage = from.name;
      // 当直接进入该页面的时候，退回到主页
      if (vm.$tools.isEmpty(vm.uuid) && vm.$tools.isEmpty(vm.member)) {
        vm.$router.push({name: 'menu'});
      }
      // 如果address为空则获取一次数据
      /* if (vm.addresses.length === 0 && vm.$tools.isNotEmpty(vm.member)) {
        vm.$store.dispatch('getAddress', {entityId: vm.member.id});
      } */
    });
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

<style scoped lang="stylus">
</style>

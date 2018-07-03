<template>
  <div class="address">
    <van-nav-bar
      :title="$t('address.myaddress')"
      left-arrow
      :right-text="$t('address.finish')"
      @click-right="finish"
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
import { mapState, mapGetters } from 'vuex';
import { isObjEmpty, isObjNotEmpty } from '@/utils/utils';
import Logger from 'chivy';
const log = new Logger('pages/member/address');
export default {
  data() {
    return {
      chosenAddressId: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (isObjEmpty(vm.$store.state.User.uuid) && isObjEmpty(vm.$store.state.User.member)) {
        vm.$router.push({name: 'menu'});
      }
      if(isObjNotEmpty(vm.User.member)){
        vm.__getaddresslist();
      }
    })
  },
  computed: {
    ...mapState([
      'User',
      'address',
      'addresses'
    ]),
    ...mapGetters([
      'addressList'
    ]),
    list() {
      if (isObjNotEmpty(this.address)) {
        const list = [];
        list.push(this.__covert(this.address));
        return list;
      } else if(isObjNotEmpty(this.User.member)) {
        return this.addressList;
      }
    },
    chooseId() {
      if (isObjNotEmpty(this.address)) {
        this.chosenAddressId = this.address.memberId;
      } else {
        this.addresses.forEach(address => {
          if (address.defaultEntity) {
            this.chosenAddressId = address.id;
          }
        });
      }
    }
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
      Toast.fail($t('address.tips'));
    },
    onEdit(item, index) {
      //TODO 区分游客还是会员，游客同样可以修改地址
      log.debug('index is ' + index);
      log.debug('this.address is ' + JSON.stringify(this.addresses[index]));
      this.$router.push({name: 'addressedit', params: {address: this.addresses[index]}});
    },
    finish() {
      log.debug('finish');
      const param = this.addresses.length !== 0 ? this.__selectAddress(this.addresses, this.chosenAddressId) : this.address;
      log.debug('param is ' + JSON.stringify(param));
      this.$router.push({name: 'pay', params: {address: param}});
    },
    back() {
      this.$router.push({name: 'pay'});
    },
    __selectAddress(addresses, id) {
      addresses.forEach(address => {
        if (id === address.id) {
          return address;
        }
      });
    },
    __covert(address) {
      return {
        id: address.memberId,
        name: address.name,
        tel: address.mobile,
        address: address.province + address.city + address.county + address.address
      };
    },
    __getaddresslist() {
      const param = {
        entityId: this.User.member.id
      }
      this.$store.dispatch('getAddress', param);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

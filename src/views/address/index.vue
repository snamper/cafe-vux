<template>
  <div class="address">
    <van-nav-bar
      :title="navBarTitle"
      left-arrow
      :right-text="rightText"
      @click-right="jump2PayPage"
      @click-left="backHistoryPage">
    </van-nav-bar>
    <van-address-list v-if="show"
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit">
    </van-address-list>
    <van-address-edit v-else
      :address-info="addressObj"
      :area-list="areaList"
      :show-set-default="showsetdefault"
      show-search-result
      show-delete
      @save="onSave"
      @delete="onDelete">
    </van-address-edit>
  </div>
</template>

<script type="text/ecmascript=6">
// 判断是否是会员，不是会员则只能添加一个地址，且无法保存地址，如果是会员则可以保存多个地址
import { NavBar, Cell, CellGroup, AddressList, AddressEdit } from 'vant';
import { mapState } from 'vuex';
import areaList from '@/utils/area';
import { isObjEmpty, isObjNotEmpty } from '@/utils/utils';
import Logger from 'chivy';
const log = new Logger('address');
export default {
  data() {
    return {
      show: true,
      chosenAddressId: '',
      areaList,
      edit: false,
      // 地址列表
      addresses: [],
      // 需要修改的地址
      address: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    log.info('beforeRouteEnter address page');
    next(vm => {
      vm.$store.dispatch('initUser').then(() => {
        if (isObjEmpty(vm.$store.state.uuid) && isObjEmpty(vm.$store.state.member)) {
          // vm.$router.push({name: 'menu'});
        }
        if(isObjNotEmpty(vm.$store.state.member)){
          vm.GetAddressList(vm.$store.state.member.id);
        }
        vm.show = true;
      });

    })
  },
  computed: {
    ...mapState([
      'uuid',
      "member"
    ]),
    chooseId() {
      if (this.addresses.length === 1) {
        this.chosenAddressId = this.addresses[0].id;
      } else {
        this.addressed.forEach(address => {
          if(address.defaultEntity) {
            this.chosenAddressId = address.id;
          }
        });
      }
    },
    rightText() {
      return this.edit ? '' : this.$t('address.finish');
    },
    // 是否显示默认地址
    showsetdefault() {
      return isObjNotEmpty(this.uuid) ? false : true;
    },
    navBarTitle() {
      return this.show ? this.$t('address.myaddress') : this.edit ? this.$t('address.editAddress') : this.$t('address.addAddress');
    },
    addressObj() {
      return isObjEmpty(this.address) ? {}: {
        id: this.address.id,
        name: this.address.name,
        tel: this.address.mobile,
        province: this.address.province,
        city: this.address.city,
        county: this.address.county,
        address_detail: this.address.address,
        area_code: this.FindAreaCode(this.address.county),
        is_default: isObjEmpty(this.defaultEntity) ? false : this.defaultEntity
      };
    },
    list() {
      const list = [];
      this.addresses.forEach(address => {
        list.push({
          id: address.id,
          name: address.name,
          tel: address.mobile,
          address: address.province + address.city + address.county + address.address
        });
      });
      return list;
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit
  },
  methods: {
    onAdd() {
      // 如果不是会员且已有收获地址，就不显示编辑
      if (isObjNotEmpty(this.uuid) && this.addresses.length !== 0) {
        return;
      }
      // 显示编辑页面
      this.show = false;
    },
    onEdit(item, index) {
      this.show = false;
      this.address = this.addresses[index];
    },
    // 编辑页面中的保存
    onSave() {
      log.info('onSave');
    },
    onDelete() {
      log.info('onDelete');
    },
    jump2PayPage() {
      /* const param = this.addresses.length !== 0 ? this.SelectedAddress(this.addresses, this.chosenAddressId) : this.address;
      this.$router.push({name: 'pay', params: {address: param}}); */
    },
    backHistoryPage() {
      // 如果是添加或者修改地址，则返回前面
      if (this.navBarTitle === this.$t('address.editAddress') || this.navBarTitle === this.$t('address.addAddress')) {
        this.show = true;
      }
      // this.$router.push({name: 'order'});
    },
    ConvertAddress(address) {
      return {
        id: address.id,
        name: address.name,
        tel: address.mobile,
        address: address.province + address.city + address.county + address.address
      };
    },
    GetAddressList(id) {
      this.addresses = [];
      const param = {
        entityId: id
      }
      this.$store.dispatch('getAddress', param).then(resp => {
        resp.forEach(address => {
          this.addresses.push(address);
        });
        log.info('this.addressed is ' + JSON.stringify(this.addresses));
      });
    },
    ClearAddress() {
      this.address = {};
    },
    // 根据地址来查询code
    FindAreaCode(address) {
      let code = '';
      Object.keys(this.areaList.county_list).forEach(key => {
        if (this.areaList.county_list[key] === address) {
          code = key;
          return;
        }
      });
      return code;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

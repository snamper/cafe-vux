<template>
  <div class="address">
    <van-nav-bar
      :title="navBarTitle"
      left-arrow
      :right-text="rightText"
      @click-right="onFinish"
      @click-left="backHistoryPage">
    </van-nav-bar>
    <van-address-list v-if="show"
      v-model="chosenAddressId"
      :list="list"
      @select="onSelect"
      @add="onAdd"
      @edit="onEdit">
    </van-address-list>
    <van-address-edit v-else
      :address-info="addressInfo"
      :area-list="areaList"
      :show-set-default="showsetdefault"
      show-search-result
      :show-delete="showdelete"
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
import { isObjEmpty, isObjNotEmpty, convertAddrss, toast } from '@/utils/utils';
import Logger from 'chivy';
const log = new Logger('address');
export default {
  data() {
    return {
      show: true,
      toast,
      chosenAddressId: '',
      areaList,
      edit: false,
      //当前地址
      currentAddress: isObjNotEmpty(this.address) ? this.address: null,
      // 地址列表
      addresses: []
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit
  },
  beforeRouteEnter(to, from, next) {
    log.info('beforeRouteEnter address page');
    next(vm => {
      // TODO 用后删除
      vm.$store.dispatch('initUser').then(() => {
        // 当直接进入该页面的时候，退回到主页
        if (isObjEmpty(vm.$store.state.uuid) && isObjEmpty(vm.$store.state.member)) {
          vm.$router.push({name: 'menu'});
        }
        // 会员则从服务器获取寄送地址列表
        if(isObjNotEmpty(vm.$store.state.member)) {
          vm.GetAddressList(vm.$store.state.member.id);
        }
        // 当非会员且有地址的时候，默认为该地址
        if (isObjNotEmpty(vm.$store.state.uuid) && vm.addresses.length === 1) {
          vm.chosenAddressId = this.addresses[0].id;
        }
        // 当传过来的addres不为空的时候，设置currentAddress
        if (isObjNotEmpty(vm.address)) {
          vm.currentAddress = vm.address;
        }
        // 避免从修改页面到其他页面后，不显示列表页面
        vm.ShowListPage();
      });
    })
  },
  props: {
    address: {
      type: Object
    }
  },
  computed: {
    ...mapState([
      'uuid',
      "member"
    ]),
    rightText() {
      return this.edit ? '' : this.$t('address.finish');
    },
    // 是否显示默认地址
    showsetdefault() {
      return isObjNotEmpty(this.uuid) ? false : true;
    },
    // 是否显示删除按钮
    showdelete() {
      return isObjNotEmpty(this.uuid) ? false : true;
    },
    navBarTitle() {
      return this.show ? this.$t('address.myaddress') : this.edit ? this.$t('address.editAddress') : this.$t('address.addAddress');
    },
    addressInfo() {
      return isObjEmpty(this.currentAddress) ? null: {
        id: this.currentAddress.id,
        name: this.currentAddress.name,
        tel: isObjNotEmpty(this.currentAddress.mobile) ? this.currentAddress.mobile : this.currentAddress.tel,
        province: this.currentAddress.province,
        city: this.currentAddress.city,
        county: this.currentAddress.county,
        address_detail: isObjNotEmpty(this.currentAddress.address) ? this.currentAddress.address: this.currentAddress.address_detail,
        area_code: this.FindAreaCode(this.currentAddress.county),
        is_default: isObjEmpty(this.currentAddress.defaultEntity) ? false : this.currentAddress.defaultEntity
      };
    },
    list() {
      const list = [];
      this.addresses.forEach(address => {
        list.push({
          id: address.id,
          name: address.name,
          tel: isObjEmpty(address.mobile) ? address.tel : address.mobile,
          address: address.province + address.city + address.county + (isObjEmpty(address.address) ? address.address_detail: address.address)
        });
      });
      return list;
    }
  },
  methods: {
    onAdd() {
      /** 
       * 添加地址，逻辑如下
       * 会员可以添加多个地址
       * 非会员只能添加一个地址
      */
      if (isObjNotEmpty(this.uuid) && this.addresses.length !== 0) {
        this.toast(this.$t('address.tips'));
        return;
      }
      this.ClearAddress();
      // 显示编辑页面
      this.ShowAddPage();
    },
    onEdit(item, index) {
      this.ShowEditPage();
      this.currentAddress = this.addresses[index];
    },
    onSelect(item, index) {
      this.currentAddress = this.addresses[index];
    },
    // 编辑页面中的保存
    onSave(content) {
      // 不论是修改还是新增都会调用该方法，在保存完成之后，需要重新刷新一下列表，否则显示会出问题。
      log.info('onSave');
      const address = {
        memberId: this.uuid ? this.uuid : this.member.id,
        name: content.name,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.address_detail,
        mobile: content.tel,
        isdefault: content.is_default
      };
      // 非会员不需要刷新列表，只需要把currentAddress重置即可。
      if (isObjNotEmpty(this.uuid)) {
        content.id = 0;
        // 清空地址列表，加入新地址，更改选中的id值，更新当前地址
        this.addresses = [];
        this.addresses.push(content);
        this.chosenAddressId = content.id;
        this.currentAddress = this.addresses[0];
        this.ShowListPage();
      } else {
        this.$store.dispatch('saveAddress', address).then(resp => {
          if (resp) {
            this.RefeshList();
          }
        });
      }
    },
    onDelete(content) {
      log.info('onDelete');
      log.info('content is ' + JSON.stringify(content));
      const param = {
        entityId: content.id
      }
      this.$store.dispatch('deleteAddress', param).then(resp => {
        if (resp) {
          this.RefeshList();
        }
      });
    },
    onFinish() {
      // 当前页面为修改页面的时候就返回列表页面
      if (this.show) {
        log.info('onfinish in list page');
        this.$router.push({name: 'order', params: {address: isObjEmpty(this.currentAddress) ? null : this.currentAddress}});
      } else {
        log.info('onfinish in edit page');
        this.ShowListPage();
      }
    },
    backHistoryPage() {
      // 如果是添加或者修改地址，则返回前面
      if (this.navBarTitle === this.$t('address.editAddress') || this.navBarTitle === this.$t('address.addAddress')) {
        this.show = true;
      } else {
        this.$router.push({name: 'order', params: { address: this.address}});
      }
    },
    GetAddressList(id) {
      return new Promise(resolve => {
        this.addresses = [];
        const param = {
          entityId: id
        }
        log.debug('param is ' + JSON.stringify(param));
        this.$store.dispatch('getAddress', param).then(resp => {
          resp.forEach(address => {
            if (address.defaultEntity) {
              this.chosenAddressId = address.id;
              this.currentAddress = address;
            }
            this.addresses.push(address);
          });
          log.debug('this.addressed is ' + JSON.stringify(this.addresses));
        });
        resolve();
      });
    },
    ClearAddress() {
      this.currentAddress = {};
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
    },
    // 显示编辑页面
    ShowEditPage() {
      this.show = false;
      this.edit = true;
    },
    // 显示列表页面
    ShowListPage() {
      this.show = true;
      this.edit = false;
    },
    // 显示新增页面
    ShowAddPage() {
      this.show = false;
      this.edit = false;
    },
    // 刷新List
    RefeshList() {
      this.GetAddressList(this.member.id).then(() => {
        this.showListPage();
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

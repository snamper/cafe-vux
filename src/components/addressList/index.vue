<template>
  <div class="page">
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

<script type="text/ecmascript-6">
// 判断是否是会员，不是会员则只能添加一个地址，且无法保存地址，如果是会员则可以保存多个地址
import { NavBar, Cell, CellGroup, AddressList, AddressEdit } from 'vant';
import { mapState } from 'vuex';
import areaList from '@/utils/area';
import Logger from 'chivy';
const log = new Logger('components/addressList');
export default {
  name: 'AddressList',
  data() {
    return {
      // 显示页面
      show: true,
      // 修改页面 (false表示新增， true表示修改)
      edit: false,
      // 选中的ID
      chosenAddressId: '',
      // 当前选中的地址
      currentSelectAddress: '',
      // 省市区列表
      areaList,
      addAddress: '添加地址',
      editAddress: '修改地址'
    };
  },
  props: {
    backPage: {
      type: String,
      default: 'order'
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [AddressList.name]: AddressList,
    [AddressEdit.name]: AddressEdit
  },
  created() {
    this.RefeshList();
  },
  computed: {
    ...mapState({
      'uuid': state => state.member.uuid,
      'member': state => state.member.member,
      'addresses': state => state.member.addresses,
      'address': state => state.member.address,
      'carts': state => state.product.carts
    }),
    // 是否显示完成按钮
    rightText() {
      return this.edit ? '' : '完成';
    },
    // 是否显示默认地址
    showsetdefault() {
      return this.$tools.isEmpty(this.uuid);
    },
    // 是否显示删除按钮
    showdelete() {
      return this.$tools.isEmpty(this.uuid);
    },
    // 显示新增地址还是编辑地址
    navBarTitle() {
      return this.show ? '我的地址' : this.edit ? this.editAddress : this.addAddress;
    },
    // 修改地址中的地址信息
    addressInfo() {
      /**
       * 当前显示的是修改的页面的时候，判断选中的地址是否为空，当为空的时候返回address，否则返回选中的地址currentSelectAddress
       * 当前显示的是新增页面的时候，返回{}
      */
      if (this.edit && this.$tools.isEmpty(this.address)) {
        // 修改页面
        return this.ConvertAddress(this.currentSelectAddress);
      } else if (this.edit && this.$tools.isNotEmpty(this.address)) {
        // 设置当前选中的地址
        this.currentSelectAddress = this.address;
        return this.ConvertAddress(this.currentSelectAddress);
      } else {
        return {};
      }
    },
    // 地址列表中的地址列表
    list() {
      const list = [];
      if (this.$tools.isNotEmpty(this.addresses) && this.addresses.length > 0) {
        // 默认选择第一个地址
        this.chosenAddressId = this.address.id;
        this.addresses.forEach(address => {
          list.push({
            id: address.id,
            name: address.name,
            areaCode: address.areaCode,
            tel: this.$tools.isEmpty(address.mobile) ? address.tel : address.mobile,
            address: address.province + address.city + address.county + (this.$tools.isEmpty(address.address) ? '' : address.address)
          });
        });
      }
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
      if (this.$tools.isNotEmpty(this.uuid) && this.$tools.isNotEmpty(this.address)) {
        this.$toast('游客只能添加一个地址');
        return;
      }
      // 显示编辑页面
      this.ShowAddPage();
    },
    onEdit(item, index) {
      this.ShowEditPage();
      this.$store.commit('UPDATE_ADDRESS', this.addresses[index]);
    },
    // 选中的时候保存临时变量
    onSelect(item, index) {
      this.currentSelectAddress = this.addresses[index];
    },
    // 编辑页面中的保存
    onSave(content) {
      // 不论是修改还是新增都会调用该方法，在保存完成之后，需要重新刷新一下列表，否则显示会出问题。
      log.info('onSave');
      log.debug('onSave content is ' + JSON.stringify(content));
      // 组织需要提交的数据
      const address = {
        // TODO 需要理解一下
        id: this.$tools.isNotEmpty(content.id) ? content.id : this.$tools.isNotEmpty(this.member) ? this.member.id : '',
        code: this.uuid,
        name: content.name,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        mobile: content.tel,
        areaCode: content.areaCode,
        defaultEntity: content.isDefault
      };
      log.debug('onSave address is ' + JSON.stringify(address));
      /**
       * 非会员情况
       * 新增的时候只需要更新address，同时更新addresses数组
       * 修改的时候只需要更新address，同事更新addresses数组
       * 会员情况
       * 新增的时候需要提交服务器，并刷新列表
       * 修改的时候需要提交服务器，并刷新列表
      */
     // 非会员的情况
      if (this.$tools.isNotEmpty(this.uuid)) {
        address.id = this.uuid;
        this.$store.commit('UPDATE_ADDRESS', address);
        this.$store.commit('UPDATE_ADDRESSES', [address]);
        this.chosenAddressId = address.id;
        this.currentSelectAddress = address;
        this.ShowListPage();
      } else {
        // 新增
        if (!this.edit) {
          log.info('add address');
          this.$store.dispatch('saveAddress', address).then(() => {
            this.RefeshList();
          });
        } else {
          log.info('modify address');
          this.$store.dispatch('modifyAddress', address).then(() => {
            this.RefeshList();
          });
        }
      }
    },
    onDelete(content) {
      log.info('onDelete');
      log.info('content is ' + JSON.stringify(content));
      const param = {
        entityId: content.id
      };
      this.$store.dispatch('deleteAddress', param).then(() => {
        this.RefeshList();
      });
    },
    onFinish() {
      // 当前页面为修改页面的时候就返回列表页面
      if (this.show) {
        log.info('onfinish in list page');
        this.$store.commit('UPDATE_ADDRESS', this.currentSelectAddress);
        this.$router.push({name: this.backPage});
      } else {
        log.info('onfinish in edit page');
        this.ShowListPage();
      }
    },
    backHistoryPage() {
      // 如果是添加或者修改地址，则返回前面
      if (this.navBarTitle === this.editAddress || this.navBarTitle === this.addAddress) {
        this.ShowListPage();
      } else {
        this.$router.push({name: this.backPage});
      }
    },
    GetAddressList(id) {
      return this.$store.dispatch('getAddress', {entityId: id});
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
      if (this.$tools.isNotEmpty(this.member)) {
        this.GetAddressList(this.member.id).then(() => {
          log.debug('RefeshList');
          this.$store.commit('SET_DEFAULT_ADDRESS');
          this.show = true;
          this.edit = false;
        });
      }
    },
    // 返回适合显示的address
    ConvertAddress(address) {
      log.debug('this.ConvertAddress\'address is ' + JSON.stringify(address));
      return {
        id: this.address.id,
        name: this.address.name,
        tel: this.$tools.isNotEmpty(this.address.mobile) ? this.address.mobile : this.address.tel,
        province: this.address.province,
        city: this.address.city,
        county: this.address.county,
        addressDetail: this.$tools.isNotEmpty(this.address.address) ? this.address.address : '',
        areaCode: this.address.areaCode,
        isDefault: this.$tools.isEmpty(this.address.defaultEntity) ? false : this.address.defaultEntity
      };
    }
  }
};
</script>

<style scoped lang="stylus">
</style>

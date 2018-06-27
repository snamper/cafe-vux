<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      right-text="完成"
      @click-left="back"
      @click-right="onSave">
    </van-nav-bar>
    <van-address-edit
      :address-info="addressinfo"
      :area-list="areaList"
      :show-set-default="showsetdefault"
      show-search-result
      :search-result="searchResult"
      @save="onSave">
    </van-address-edit>
  </div>
</template>

<script type="text/ecmascript=6">
import { AddressEdit, NavBar } from 'vant';
import areaList from '../../common/js/area.js';
import { mapState } from 'vuex';
import { isObjEmpty, findCode } from '../../common/js/util.js';
import Logger from 'chivy';
const log = new Logger('pages/member/addressedit');
export default {
  data() {
    return {
      areaList,
      searchResult: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (isObjEmpty(vm.$store.state.User.uuid) && isObjEmpty(vm.$store.state.User.member)) {
        // vm.$router.push({name: 'cart'});
      }
    })
  },
  props: {
    address: {
      type: Object,
      default: null
    }
  },
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar
  },
  computed: {
    ...mapState([
      'User'
    ]),
    showsetdefault() {
      return isObjEmpty(this.User.uuid) ? true: false;
    },
    title() {
      return isObjEmpty(this.address) ? '添加地址' : '修改地址';
    },
    addressinfo() {
      log.debug('findcode is ' + findCode(this.address.county));
      return isObjEmpty(this.address) ? {}: {
        id: this.address.id,
        name: this.address.name,
        tel: this.address.mobile,
        province: this.address.province,
        city: this.address.city,
        county: this.address.county,
        address_detail: this.address.address,
        area_code: findCode(this.address.county),
        is_default: this.defaultEntity
      };
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'address'});
    },
    onSave(content) {
      log.debug('content is ' + JSON.stringify(content));
      const address = {
        memberId: this.User.uuid ? this.User.uuid : this.User.member.id,
        name: content.name,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.address_detail,
        mobile: content.tel,
        isdefault: content.is_default
      };
      if (!isObjEmpty(this.User.uuid)) {
        this.$store.commit('update', {type: 'address', value: address});
        this.$router.push({name: 'address'});
      } else {
        this.$store.dispatch('saveAddress', address);
      }
    },
    __check(address) {
      for (let key in address) {
        if (isObjEmpty(address[key])) {
          return false;
        }
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

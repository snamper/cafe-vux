<template>
  <div>
    <van-nav-bar
      title="添加地址"
      left-arrow
      right-text="完成"
      @click-left="back"
      @click-right="onSave">
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
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
import Logger from 'chivy';
import { isObjEmpty } from '../../common/js/util.js';
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
      if (isObjEmpty(vm.User.uuid) && isObjEmpty(vm.User.member)) {
        vm.$router.push({name: 'member'});
      }
    })
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
      if (this.User.uuid) {
        this.$store.commit('update', {type: 'address', value: address});
      } else {
        this.$store.dispatch('saveAddress', address);
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

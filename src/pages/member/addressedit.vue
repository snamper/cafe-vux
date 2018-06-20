<template>
  <div>
    <van-nav-bar
      title="添加地址"
      left-arrow
      right-text="完成"
      @click-left="back">
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @change-detail="onChangeDetail">
    </van-address-edit>
  </div>
</template>

<script type="text/ecmascript=6">
import { AddressEdit, NavBar } from 'vant';
import areaList from '../../common/js/area.js';
import Logger from 'chivy';
const log = new Logger('pages/member/addressedit');
export default {
  data() {
    return {
      areaList,
      searchResult: []
    }
  },
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    onSave(content) {
      log.debug('content is ' + JSON.stringify(content));
      // {"name":"23","tel":"13333333333","province":"北京市","city":"北京市","county":"东城区","area_code":"110101","postal_code":"","address_detail":"123456","is_default":true}
    },
    onChangeDetail() {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

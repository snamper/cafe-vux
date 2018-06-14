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

    },
    onSave() {

    },
    onChangeDetail() {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

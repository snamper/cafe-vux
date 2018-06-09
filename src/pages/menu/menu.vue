<template>
  <div>
    <logo></logo>
    <tipsbar></tipsbar>
  </div>
</template>

<script type="text/ecmascript=6">
import { Swipe, SwipeItem, Lazyload } from 'vant';
import logo from '../../components/logo';
import tipsbar from '../../components/tipsbar';
export default {
  data() {
    return {
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    logo,
    tipsbar
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

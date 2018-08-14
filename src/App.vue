<template>
  <div id="app">
    <loading v-if="isLoading"></loading>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script type="text/ecmascript=6">
import { mapState } from 'vuex';
import loading from '@/components/loading';
export default {
  name: 'App',
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },
  components: {
    loading
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app
  width 100%
  height 100%
  overflow-x hidden;
</style>

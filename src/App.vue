<template>
  <div id="app">
    <div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script type="text/ecmascript=6">
import { mapState } from 'vuex';
import loading from './components/loading';
export default {
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

<style>
#app{
  width:100%;
  height:100%;
  overflow-x: hidden;
}
</style>

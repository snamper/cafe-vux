<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script type="text/ecmascript=6">
export default {
  components: {
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

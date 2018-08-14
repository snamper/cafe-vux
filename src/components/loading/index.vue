<template>
 <div class="loading">
   <img :src="url">
 </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      url: '../../../static/img/loading.gif'
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.loading
  position absolute
  top 0px
  left 0px
  z-index 1
  height 100%
  width 100%
  overflow hidden
  display flex
  justify-content center
  align-items center
  background-color rgb(233, 233, 233)
</style>

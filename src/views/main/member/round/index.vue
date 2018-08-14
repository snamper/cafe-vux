<template>
  <div class="round-wrapper">
    <span>{{number}}</span>
  </div>
</template>

<script>
export default {
  name: 'Round',
  props: {
    number: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.round-wrapper
  span
    padding 5px 15px
    width 10px
    height 10px
    background-color gray;
    color white
    text-align center
    border-radius 50%
</style>

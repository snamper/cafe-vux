<template>
  <div class="pagenotfound">
    <div class="content">
      <avator :url="img" :size="200" :radius="50"></avator>
      <div class="text">{{$t('error.error')}}</div>
      <div class="tips">{{time}}{{$t('error.tips')}}</div>
    </div>
    <div class="tips"></div>
  </div>
</template>

<script>
import avator from '@/components/avator';
export default {
  data() {
    return {
      img: '../../../static/img/tian.jpg',
      time: 5
    };
  },
  components: {
    avator
  },
  mounted() {
    setInterval(this.__count, 1000);
  },
  methods: {
    __count() {
      if (this.time > 0) {
        this.time--;
      } else {
        this.time = 0;
        this.$router.push({name: 'menu'});
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pagenotfound
  width 100%
  height 80%
  overflow hidden
  display flex
  justify-content center
  align-items center
  .text
    font-size 30px
    padding 10px 0px
    margin 10px 0px
    text-align center
  .tips
    text-align center
    font-size 18px
</style>

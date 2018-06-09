<template>
  <div>
    <div class="logo-wrapper">
      <img :src="image">
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import Logger from 'chivy';
const log = new Logger('components/logo');
export default {
  data() {
    return {
      ratio: '',
      image1x: '../../static/img/logo@1X.jpg',
      image2x: '../../static/img/logo@2X.jpg',
      image3x: '../../static/img/logo@3X.jpg'
    }
  },
  created() {
    this.ratio = Math.floor(window.devicePixelRatio);
    log.info('ratio is ' + this.ratio);
  },
  computed: {
    image() {
      if (this.ratio === 2) {
        return this.image2x;
      } else if(this.ratio === 3) {
        return this.image3x;
      } else {
        return this.image1x;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.logo-wrapper
  img
    width 100%
    height auto
</style>

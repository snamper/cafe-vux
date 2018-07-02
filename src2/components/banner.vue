<template>
  <div class="banner van-hairline--top-bottom" v-if="title" :style="{height:height + 'px'}">
    <h1 :style="{fontSize: titleSize + 'px'}" @click="onTitle">{{title}}</h1>
    <h3 v-if="subtitle" :style="{fontSize: subTitleSize + 'px'}" @click="onSubtitle">{{subtitle}}</h3>
  </div>
</template>

<script type="text/ecmascript=6">
import { isObjEmpty } from '../common/js/util';
export default {
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    titleSize: {
      type: Number,
      default: 20
    },
    subTitleSize: {
      type: Number,
      default: 14
    }
  },
  computed: {
    height() {
      let height = 0;
      if(isObjEmpty(this.subtitle)) { 
        height = 20 + this.titleSize;
      } else {
        height = 40 + this.titleSize + this.subTitleSize;
      }
      return height;
    }
  },
  methods: {
    onTitle() {
      this.$emit('clickTitle');
    },
    onSubtitle() {
      this.$emit('clickSubTitle');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.banner
  display flex
  justify-content center
  flex-wrap wrap
  height 75px
  h1,h3
    width 100%
    text-align center
    padding 10px
  h1
    height 20px
    line-height 20px
    font-weight 900
  h3
    height 14px
    line-height 14px
</style>

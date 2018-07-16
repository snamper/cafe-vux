<template>
 <div>
   <div v-for="(good, index) in goods" :key="index"></div>
 </div>
</template>

<script>
// import service from '@/util/request';
export default {
  data () {
    return {
      goods: []
    };
  },
  created() {
    console.log('start created');
    this.$store.dispatch('getGoods').then(data => {
      console.log(data);
    });
    /* console.log('start created');
    service({
      url: 'http://10.100.193.31:15080/rest/shop/product/show/ui/getCategoriedProducts.do',
      method: 'post',
      data: {
        envData: {
          pageNo: 1,
          pageSize: 20
        }
      }
    }).then(resp => {
      console.log(JSON.stringify(resp));
    }); */
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>

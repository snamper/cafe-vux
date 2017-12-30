<template>
    <div>
        <loading  v-if="loading"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
import { Loading } from 'vux';
export default {
    data() {
        return {
            loading: false,
            product: null
        };
    },
    created() {
        this.fetchData(this.$route.params.recordID);
        this.product = null;
        this.loading = true;
    },
    watch: {
        '$route': 'fetchData'
    },
    components: {
        Loading
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

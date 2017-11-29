<template>
    <div>
        <logo></logo>
        <loginbar :image="image" v-show="!memberInfo"></loginbar>
        <memberbar :image="image" :memberInfo="memberInfo" v-show="memberInfo"></memberbar>
    </div>
</template>

<script type="text/ecmascript-6">
import logo from '../../components/logo/logo';
import loginbar from '../../components/loginbar/loginbar';
import memberbar from '../../components/loginbar/memberbar';
import { mapState } from 'vuex';
import Logger from 'chivy';
const log = new Logger('cafe/member');
export default {
    data() {
        return {
            image: '../../../../static/img/avator.jpg'
        };
    },
    mounted() {
        log.info(typeof (this.memberInfo));
        if (!this.memberInfo) {
            this.$router.push({path: '/login'});
        }
    },
    computed: {
        ...mapState([
            'memberInfo'
        ])
    },
    methods: {
        loginPage() {}
    },
    components: {
        logo,
        loginbar,
        memberbar
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
        
        
</style>

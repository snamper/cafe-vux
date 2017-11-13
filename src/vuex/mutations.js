import Vue from 'vue';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');

export default {
    // 修改分类列表
    m_categorys(state, categorys) {
        // log.info('before modify categorys');
        state.categorys = categorys;
        // log.info('after modify categorys');
    },
    add_count_categorys(state, param) {
        // log.debug('setting count attr in product: ' + JSON.stringify(param));
        state.categorys.forEach((category) => {
            category.list.forEach((product) => {
                if (param === product) {
                    if (!product.count) {
                        Vue.set(product, 'count', 1);
                    } else {
                        product.count++;
                    }
                }
            });
        });
    },
    sub_count_categorys(state, param) {
        state.categorys.forEach((category) => {
            category.list.forEach((product) => {
                if (param === product) {
                    product.count--;
                }
            });
        });
    },
    getMember(state) {
        state.member = JSON.parse(sessionStorage.getItem('member'));
        log.debug('Get member from sesionstorage is ' + JSON.stringify(state.member));
    },
    setUUID(state, payload) {
        log.debug('before uuid change, the uuid is ' + state.uuid);
        state.uuid = payload;
        log.debug('after uuid change, the uuid is ' + state.uuid);
    },
    showOrder(state, payload) {
        state.showOrder = payload;
    },
    setMember(state, payload) {
        state.memberInfo = payload;
    }
};

import Vue from 'vue';
import Logger from 'chivy';
const log = new Logger('cafe/mutations');

export const mutations = {
    // 修改分类列表
    m_categorys(state, categorys) {
        log.info('before modify categorys');
        state.categorys = categorys;
        log.info('after modify categorys');
    },
    add_count_categorys(state, param) {
        log.debug('setting count attr in product: ' + JSON.stringify(param));
        for (let category in state.categorys) {
            state.categorys[category].forEach((product) => {
            if (param === product) {
                if (!product.count) {
                    Vue.set(product, 'count', 1);
                } else {
                    product.count++;
                }
            }
            });
        }
    },
    getMember(state) {
        state.member = JSON.parse(sessionStorage.getItem('member'));
        log.debug('Get member from sesionstorage is ' + JSON.stringify(state.member));
    }
};

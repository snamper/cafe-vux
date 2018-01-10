import Vue from 'vue';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');

export default {
    updateLoadingStatus (state, payload) {
        state.isLoading = payload.isLoading;
    },
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
    setUUID(state, payload) {
        log.debug('before uuid change, the uuid is ' + state.uuid);
        state.uuid = payload;
        log.debug('after uuid change, the uuid is ' + state.uuid);
    },
    setMember(state, payload) {
        state.memberInfo = payload;
    },
    setCashorBalance(state, payload) {
        state.cashOrBalance = payload;
    },
    clearCarts(state) {
        state.categorys.forEach((category) => {
            category.list.forEach((food) => {
                food.count = 0;
            });
        });
    },
    setrecordList(state, payload) {
        state.recordList = payload;
    },
    setuuid(state, payload) {
        state.uuid = payload;
    },
    setrecordId(state, payload) {
        state.recordId = payload;
    },
    changeSelect(state, payload) {
        // {'menu': true, 'new': false, 'order': false, 'member': false}
        for (let key in payload) {
            if (key === 'menu') {
                state.selects.menu = payload[key];
            } else if (key === 'new') {
                state.selects.new = payload[key];
            } else if (key === 'order') {
                state.selects.order = payload[key];
            } else if (key === 'member') {
                state.selects.member = payload[key];
            }
        }
    }
};

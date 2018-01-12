import Vue from 'vue';
import config from '../config/config';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');
const url = config.basicInfo;

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
    },
    modifyMemberInfo(state, payload) {
        log.debug('payload is ' + JSON.stringify(payload));
        log.debug('modify url is ' + url);
        this.$http.post(url, payload).then((response) => {
            let result = response.data;
            if (result.success) {
                // 修改this.memberInfo信息
                this.$vux.toast.text('修改成功', 'center');
                if (payload.type === config.type.gender) {
                    state.memberInfo.gender = payload.gender;
                } else if (payload.type === config.type.phone) {
                    state.memberInfo.phone = payload.mobile;
                } else if (payload.type === config.type.name) {
                    state.memberInfo.name = payload.name;
                } else if (payload.type === config.type.email) {
                    state.memberInfo.email = payload.email;
                } else if (payload.type === config.type.address) {
                    state.memberInfo.area = payload.address;
                } else if (payload.type === config.type.detailAddress) {
                    state.memberInfo.address = payload.address;
                }
            } else {
                this.$vux.toast.text('修改失败', 'center');
            }
        });
    }
};

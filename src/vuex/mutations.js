import Logger from 'chivy';
const log = new Logger('vuex/mutations');
export default {
    // 更新UUID
    updateUUID(state, payload) {
        state.UUID = payload;
    },
    // 更新登陆状态
    updateStateLogin(state, payload) {
        log.debug('function (updateStateLogin)' + 'get param is ' + payload);
        state.status.login = payload;
    },
    // 更新会员信息
    updatememberInfo(state, payload) {
        state.memberInfo = payload;
    },
    // 更新是否重名状态
    updateStateDuplicate(state, payload) {
        state.status.duplicate = payload;
    }
};

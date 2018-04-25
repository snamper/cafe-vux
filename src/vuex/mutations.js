import { getSessionStorage, setSessionStorage, removeSessionStorage } from '../common/js/util';
import { consts } from '../common/js/consts';
import Logger from 'chivy';
const log = new Logger('vuex/mutations');
const uuidv4 = require('uuid/v4');
export default {
    // 初始化UUID
    initUUID(state) {
        /**
         * 1. 读取LocalStoage是否存在MemberInfo数据，如果有则保存到state中
         * 2. 没有数据则生成UUID数据并写入到LocalStoage中
         */
        let memberInfo = getSessionStorage(consts.session.memberInfo);
        if (memberInfo !== null) {
            log.debug('memberInfo is ' + JSON.stringfy(memberInfo));
            // 保存到state中
            state.currentUser.memberInfo = memberInfo;
        } else {
            let uuid = getSessionStorage(consts.session.uuid);
            if (uuid === null) {
                uuid = uuidv4();
                log.debug('UUID is ' + uuid);
                // 写入到LocalStorage
                setSessionStorage(consts.session.uuid, uuid);
            }
            // 保存到uuid到state中
            state.currentUser.UUID = uuid;
        }
    },
    // 注销用户
    logout(state) {
        state.currentUser.memberInfo = null;
        removeSessionStorage(consts.session.memberInfo);
    },
    // 更新商品
    updateStateCategorys(state, payload) {
        state.categorys = payload;
    },
    // 更新loading状态
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading;
    }
};

import { setSessionStorage, getSessionStorage, gender } from '../common/js/util';
import { session, url } from '../common/js/values';
import Vue from 'vue';
import { AjaxPlugin } from 'vux';
import Logger from 'chivy';
const log = new Logger('vuex/actions');
const uuidv4 = require('uuid/v4');
Vue.use(AjaxPlugin);

export default {
    // 初始化uuid
    initUUID(context) {
        // 读取sessionStorage中是否存在UUID，如果存在则写入state中，如果不存在，则生成并写入sessionStorage中
        let uuid = getSessionStorage(session.uuid);
        if (uuid === null) {
            log.debug('cannot get uuid from sessionStorage');
            uuid = uuidv4();
            setSessionStorage(session.uuid, uuid);
        }
        log.debug('uuid is ' + JSON.stringify(uuid));
        context.commit('updateUUID', uuid);
    },
    // 登陆动作,提交到服务端后,存入数据的到SessionStorage,并更新state的状态
    // state状态用于判断是否登陆成功用dispatch().then()来操作
    login(context, payload) {
        Vue.http.post(url.userLogin, payload).then((response) => {
            let result = response.data;
            // log.debug(JSON.stringify(result));
            if (result.status) {
                let memberInfo = {
                    'id': result.id,
                    'name': result.name,
                    'point': result.point,
                    'balance': result.balance,
                    'gender': gender(result.gender),
                    'phone': result.phone,
                    'email': result.email,
                    'area': result.area,
                    'address': result.address,
                    'createTime': result.createTime
                };
                context.commit('updatememberInfo', memberInfo);
                // 存储到sessionStorage中
                log.info('Save register user to sessionStorage');
                setSessionStorage(session.memberInfo, memberInfo);
                // 更新登陆状态
                context.commit('updateStateLogin', true);
            }
        });
    },
    // 注册动作,成功后返回数据存入memberInfo中
    resigter(context, payload) {
        Vue.http.post(url.userRegister, payload).then((response) => {
            let result = response.data;
            log.debug(JSON.stringify(result));
            if (result.status) {
                let memberInfo = {
                    'id': result.entityId,
                    'name': '',
                    'point': 0,
                    'balance': 0,
                    'gender': '',
                    'phone': result.entityName,
                    'email': '',
                    'area': '',
                    'address': '',
                    'createTime': result.createTime
                };
                context.commit('updatememberInfo', memberInfo);
                // 存储到sessionStorage中
                log.info('Save register user to sessionStorage');
                setSessionStorage(session.memberInfo, memberInfo);
                // 更新登陆状态
                context.commit('updateStateLogin', true);
            }
        });
    },
    // 是否有重复的用户名或者邮箱名
    duplicate(context, payload) {
        Vue.http.post(url.userRegister, payload).then((response) => {
            let result = response.data;
            // 检测是否重名
            context.commit('updateStateDuplicate', result.status);
        });
    },
    getCategorys(context) {
        Vue.http.get(url.categorysList).then((response) => {
            let result = response.data;
            if (result != null) {
                log.debug('updateStateCategorys');
                context.commit('updateStateCategorys', result);
            }
        });
    }
};

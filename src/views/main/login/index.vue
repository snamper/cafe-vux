<template>
  <div class="login">
    <div class="logo">
      <avator
        :url="img.url"
        :width="img.width"
        :height="img.height">
      </avator>
    </div>
    <div class="input" v-if="showlogin">
      <van-cell-group>
        <van-field
          v-model="username.content"
          :label="$t('login.username')"
          icon="clear"
          :placeholder="$t('login.usernamePlaceholder')"
          required
          :error="username.error"
          @blur="check(username)"
          @click-icon="clean(username)"
        />
        <van-field
          v-model="password.content"
          type="password"
          :label="$t('login.password')"
          :placeholder="$t('login.inputPassword')"
          @blur="check(password)"
          :error="password.error"
          @click-icon="clean(password)"
          required
        />
      </van-cell-group>
    </div>
    <div class="input" v-else>
      <van-cell-group>
        <van-field
          v-model="account.content"
          :label="$t('login.username')"
          icon="clear"
          :placeholder="$t('login.accountPlaceholder')"
          required
          :error="account.error"
          @blur="checkduplicate(account)"
          @click-icon="clean(account)"
        />
        <van-field
          v-model="pwd.content"
          type="password"
          :label="$t('login.inputPassword')"
          :placeholder="$t('login.passwordPlaceholder')"
          :error="pwd.error"
          @blur="check(pwd)"
          @click-icon="clean(pwd)"
          required
        />
        <van-field
          v-model="repwd.content"
          type="password"
          :label="$t('login.comfirmPassword')"
          :placeholder="$t('login.confirmPlaceholder')"
          :error="repwd.error"
          @blur="check(repwd)"
          @click-icon="clean(repwd)"
          required
        />
      </van-cell-group>
    </div>
    <div class="submit" v-if="showlogin">
      <div class="login">
        <van-button style="width:97%" type="primary" @click="login" :disabled="disable.login">{{$t('login.login')}}</van-button>
      </div>
      <div class="ops">
        <van-row type="flex">
          <van-col class="forget" span="8" @click.native="forget">{{$t('login.forgetPassword')}}</van-col>
          <van-col class="vistor" span="8" @click.native="vistor">{{$t('login.vistorVistor')}}</van-col>
          <van-col class="register" span="8" @click.native="show">{{$t('login.register')}}</van-col>
        </van-row>
      </div>
    </div>
    <div class="submit" v-else>
      <div class="submit-wrapper">
        <van-button class="registerbtn" type="primary" @click="register" :disabled="disable.register">{{$t('login.register')}}</van-button>
        <van-button class="loginbtn"  type="default" @click="show">{{$t('login.login')}}</van-button>
      </div>
    </div>
    <div class="foot">
      <div class="divider">{{$t('login.third')}}</div>
      <div class="icon">
        <avator
          :url="third.weibo.url"
          :radius="third.weibo.radius">
        </avator>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button, Field, CellGroup, Toast, Row, Col } from 'vant';
import avator from '../../components/avator';
import { mapState } from 'vuex';
import md5 from 'blueimp-md5';
import { regex } from '../../common/js/consts.js';
import { regexmatch, isObjEmpty } from '../../common/js/util.js';
import Logger from 'chivy';
const log = new Logger('login');
export default {
  data() {
    return {
      showlogin: true,
      disable: {
        login: false,
        register: false
      },
      img: {
        url: './img/tian.jpg',
        width: 100,
        height: 100
      },
      third: {
        weibo: {
          url: './weibo.png',
          radius: 50
        }
      },
      username: {
        key: 'username',
        content: '',
        error: false
      },
      password: {
        key: 'password',
        content: '',
        error: false
      },
      account: {
        key: 'account',
        content: '',
        error: false
      },
      pwd: {
        key: 'pwd',
        content: '',
        error: false
      },
      repwd: {
        key: 'repwd',
        content: '',
        error: false
      }
    }
  },
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    avator
  },
  computed: {
    ...mapState([
      'User'
    ])
  },
  beforeRouteEnter(to, from, next) {
    log.info('beforeRouteEnter');
    next(vm => {
      log.debug('uuid is ' + vm.User.uuid);
      if (vm.User.uuid === null) {
        vm.$router.push({name: 'member'});
      }
    })
  },
  methods: {
    vistor() {
      this.$router.push({name: 'member'});
    },
    show() {
      this.showlogin = !this.showlogin;
    },
    login() {
      this.disable.login = true;
      const valid = !this.username.error && !this.password.error && !isObjEmpty(this.username.content) && !isObjEmpty(this.password.content);
      if (valid) {
        // 用户登录
        const param = {
          name: this.username.content,
          passWd: md5(this.password.content)
        };
        this.$store.dispatch('login', param).then(() => {
          this.__toast('登录成功').then(() => {
            this.disable.login = false;
            this.__jump();
          });
        }).catch((error) => {
          this.__toast('登录失败').then(() => {
            this.disable.login = false;
            this.__fail(true);
          });
        });
      } else {
        this.__toast('请填写正确的内容');
        this.disable.login = false;
      }
    },
    register() {
      this.disable.register = true;
      const valid = !this.account.error && !this.pwd.error && !this.repwd.error && !isObjEmpty(this.account.content) && !isObjEmpty(this.pwd.content) && !isObjEmpty(this.repwd.content);
      if(valid) {
        // 注册用户
        const param ={
          mobile: this.account.content,
          passWd: md5(this.pwd)
        };
        this.$store.dispatch('resigter', param).then(() => {
          this.__toast('注册成功').then(() => {
            this.disable.register = false;
            this.__jump();
          });
        }).catch((error) => {
          this.__toast('注册失败').then(() => {
            this.__fail(true);
            this.disable.register = false;
          })
        });
      } else {
        this.__toast('请填写正确的信息');
        this.disable.register = false;
      }
    },
    checkduplicate(data) {
      // debugger
      let avalid = true;
      avalid = avalid && (data.content !== '' ? true : false);
      avalid = avalid && this.__checkAccount(data.content);
      if (avalid) {
        this.$store.dispatch('duplicate', {name: data.content}).then(resp => {
          log.debug(data.content + ' is duplicate in server? ' + resp);
          if (resp) {
            this.__toast('用户名重复，请重新输入用户名');
            this.account.content = '';
            data.error = true;
          }
        });
      } else {
        data.error = true;
      }
    },
    forgetPwd() {
      log.info('forget password');
    },
    check(data) {
      let error = false;
      data.error = error;
      if (data.content === '') {
        error = true;
      }
      switch(data.key) {
        case this.username.key:
          error = !this.__checkAccount(data.content);
          if(error) {
            this.__toast('账户可以是邮箱或者手机号码');
          }
          break;
        case this.pwd.key:
          error = !regexmatch(data.content, regex.password);
          if(error) {
            this.__toast('密码由6-21字母和数字组成');
          }
          break;
        case this.repwd.key:
          error = this.repwd.content !== this.pwd.content ? true: false;
          if(error) {
            this.__toast('两次输入的密码不一致');
          }
          break;
      }
      log.debug(data.key + ' check result is ' + error);
      data.error = error;
    },
    clean(data) {
      log.debug('clean data is ' + JSON.stringify(data));
      data.content = '';
    },
    __checkAccount(account) {
      if (regexmatch(account, regex.mobile)) {
        return true;
      } else if(regexmatch(account, regex.email)) {
        return true;
      } else if(regexmatch(account, regex.account)) {
        return true;
      } else {
        return false;
      }
    },
    __fail(status) {
      // 密码清空
      this.showlogin = status;
      this.username.content = '';
      this.password.content = '';
      this.account.content = '';
      this.pwd.content = '';
      this.repwd.content = '';
    },
    __toast(content) {
      return new Promise((resolve, reject) => {
        Toast({
          message: content,
          forbidClick: true,
          duration: 1000
        });
        resolve();
      });
    },
    __jump() {
      this.$router.push({name: 'member'});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login
  margin-bottom 50px
  .logo
    display flex
    justify-content center
    align-items center
    height 160px
    width 100%
    margin-top 10px
  .input
    margin 10px 0px
  .submit
    width 100%
    .login
      display flex
      justify-content center
      margin 10px 0px
    .ops
      .van-row
        .van-col
          font-size 18px
          padding 10px 0
          display flex
        .register
          justify-content flex-end
          padding-right 10px
        .vistor
          justify-content center
        .forget
          justify-content flex-start
          padding-left 10px
    .submit-wrapper
      display flex
      justify-content space-between
      .registerbtn,.loginbtn
        display inline-block
        width 45%
      .registerbtn
        margin-left 15px
      .loginbtn
        margin-right 15px
  .foot
    .divider
      font-size 18px
      padding 10px
      margin 10px 0px
      display flex
      justify-content center
    .icon
      display flex
      justify-content center
</style>

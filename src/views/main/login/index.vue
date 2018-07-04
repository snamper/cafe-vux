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
          @blur="checkAvaliable(username)"
          @click-icon="username.content = ''"
        />
        <van-field
          v-model="password.content"
          type="password"
          :label="$t('login.password')"
          :placeholder="$t('login.inputPassword')"
          @blur="checkAvaliable(password)"
          :error="password.error"
          @click-icon="password.content = ''"
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
          @blur="checkAccountDuplicate(account)"
          @click-icon="account.content = ''"
        />
        <van-field
          v-model="pwd.content"
          type="password"
          :label="$t('login.inputPassword')"
          :placeholder="$t('login.passwordPlaceholder')"
          :error="pwd.error"
          @blur="checkAvaliable(pwd)"
          @click-icon="pwd.content = ''"
          required
        />
        <van-field
          v-model="repwd.content"
          type="password"
          :label="$t('login.comfirmPassword')"
          :placeholder="$t('login.confirmPlaceholder')"
          :error="repwd.error"
          @blur="checkAvaliable(repwd)"
          @click-icon="repwd.content = ''"
          required
        />
      </van-cell-group>
    </div>
    <div class="submit" v-if="showlogin">
      <div class="login">
        <van-button style="width:97%" type="primary" @click="onClickLogin" :disabled="disable.login">{{$t('login.login')}}</van-button>
      </div>
      <div class="ops">
        <van-row type="flex">
          <van-col class="forget" span="8" @click.native="onClickForget">{{$t('login.forgetPassword')}}</van-col>
          <van-col class="vistor" span="8" @click.native="onClickVistor">{{$t('login.vistorVistor')}}</van-col>
          <van-col class="register" span="8" @click.native="onClickShow">{{$t('login.register')}}</van-col>
        </van-row>
      </div>
    </div>
    <div class="submit" v-else>
      <div class="submit-wrapper">
        <van-button class="registerbtn" type="primary" @click="onClickRegister" :disabled="disable.register">{{$t('login.register')}}</van-button>
        <van-button class="loginbtn"  type="default" @click="onClickShow">{{$t('login.login')}}</van-button>
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
import avator from '@/components/avator';
import { mapState } from 'vuex';
import md5 from 'blueimp-md5';
import { regex } from '@/utils/consts.js';
import { regexmatch, isObjEmpty, toast } from '@/utils/utils.js';
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
        url: '../../../../static/img/tian.jpg',
        width: 100,
        height: 100
      },
      third: {
        weibo: {
          url: '../../../../static/img/weibo.png',
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
    next(vm => {
      log.debug('uuid is ' + vm.User.uuid);
      if (isObjEmpty(vm.User.uuid)) {
        vm.$router.push({name: 'member'});
      }
    })
  },
  methods: {
    onClickVistor() {
      this.$router.push({name: 'member'});
    },
    onClickShow() {
      this.showlogin = !this.showlogin;
    },
    onClickLogin() {
      this.disable.login = true;
      const valid = !this.username.error && !this.password.error && !isObjEmpty(this.username.content) && !isObjEmpty(this.password.content);
      if (valid) {
        // 用户登录
        const param = {
          name: this.username.content,
          passWd: md5(this.password.content)
        };
        this.$store.dispatch('login', param).then(() => {
          this.Tips($t('login.tips1')).then(() => {
            this.disable.login = false;
            this.Jump2MemberPage();
          });
        }).catch((error) => {
          this.Tips($t('login.tips2')).then(() => {
            this.disable.login = false;
            this.ResetField(true);
          });
        });
      } else {
        this.Tips($t('login.tips3'));
        this.disable.login = false;
      }
    },
    onClickRegister() {
      this.disable.register = true;
      const valid = !this.account.error && !this.pwd.error && !this.repwd.error && !isObjEmpty(this.account.content) && !isObjEmpty(this.pwd.content) && !isObjEmpty(this.repwd.content);
      if (!valid) {
        this.Tips($t('login.tips3'));
        this.disable.register = false;
        return;
      }
      // 注册用户
      const param ={
        mobile: this.account.content,
        passWd: md5(this.pwd)
      };
      this.$store.dispatch('resigter', param).then(() => {
        this.Tips($t('login.tips4')).then(() => {
          this.disable.register = false;
          this.Jump2MemberPage();
        });
      }).catch((error) => {
        this.Tips($t('login.tips5')).then(() => {
          this.ResetField(true);
          this.disable.register = false;
        })
      });
    },
    checkAccountDuplicate(data) {
      // debugger
      const avalid = isObjNotEmpty(data.content) && this.CheckAccountAvaliable(data.content);
      if  (!avalid) {
        data.error = true;
        return;
      }
      this.$store.dispatch('duplicate', {name: data.content}).then(resp => {
        log.debug(data.content + ' is duplicate in server? ' + resp);
        if (resp) {
          this.Tips($t('login.tips6'));
          this.account.content = '';
          data.error = true;
        }
      });

    },
    onClickForget() {
      log.info('forget password');
    },
    checkAvaliable(data) {
      let error = false;
      data.error = error;
      if (data.content === '') {
        error = true;
      }
      switch(data.key) {
        case this.username.key:
          error = !this.CheckAccountAvaliable(data.content);
          if(error) {
            this.Tips($t('login.tips7'));
          }
          break;
        case this.pwd.key:
          error = !regexmatch(data.content, regex.password);
          if(error) {
            this.Tips($t('login.tips8'));
          }
          break;
        case this.repwd.key:
          error = this.repwd.content !== this.pwd.content ? true: false;
          if(error) {
            this.Tips($t('login.tips9'));
          }
          break;
      }
      log.debug(data.key + ' check result is ' + error);
      data.error = error;
    },
    CheckAccountAvaliable(account) {
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
    ResetField(status) {
      // 密码清空
      this.showlogin = status;
      this.username.content = '';
      this.password.content = '';
      this.account.content = '';
      this.pwd.content = '';
      this.repwd.content = '';
    },
    Tips(content) {
      return new Promise((resolve, reject) => {
        this.toast(content, true);
        resolve();
      });
    },
    Jump2MemberPage() {
      this.$router.push({name: 'member'});
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
.login
  bgcolor()
  bottom()
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

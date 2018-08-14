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
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          :error="username.error"
          @blur="checkAvaliable(username)"
          @click-icon="username.content = ''"
        />
        <van-field
          v-model="password.content"
          type="password"
          label="密码"
          placeholder="请输入密码"
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
          label="用户名"
          icon="clear"
          placeholder="手机号码/邮箱名"
          required
          :error="account.error"
          @blur="checkAccountDuplicate(account)"
          @click-icon="account.content = ''"
        />
        <van-field
          v-model="pwd.content"
          type="password"
          label="输入密码"
          placeholder="请输入密码"
          :error="pwd.error"
          @blur="checkAvaliable(pwd)"
          @click-icon="pwd.content = ''"
          required
        />
        <van-field
          v-model="repwd.content"
          type="password"
          label="确认密码"
          placeholder="请确认密码"
          :error="repwd.error"
          @blur="checkAvaliable(repwd)"
          @click-icon="repwd.content = ''"
          required
        />
      </van-cell-group>
    </div>
    <div class="submit" v-if="showlogin">
      <div class="login">
        <van-button style="width:97%" type="primary" @click="onClickLogin" :disabled="disable.login">登录</van-button>
      </div>
      <div class="ops">
        <van-row type="flex">
          <van-col class="forget" span="8" @click.native="onClickForget">忘记密码</van-col>
          <van-col class="vistor" span="8" @click.native="onClickVistor">游客访问</van-col>
          <van-col class="register" span="8" @click.native="onClickShow">注册</van-col>
        </van-row>
      </div>
    </div>
    <div class="submit" v-else>
      <div class="submit-wrapper">
        <van-button class="registerbtn" type="primary" @click="onClickRegister" :disabled="disable.register">注册</van-button>
        <van-button class="loginbtn"  type="default" @click="onClickShow">登录</van-button>
      </div>
    </div>
    <div class="foot">
      <div class="divider">第三方登录</div>
      <div class="icon">
        <avator
          @click.native="onClickWeibo"
          :url="third.weibo.url"
          :radius="third.weibo.radius">
        </avator>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript=6">
import { Button, Field, CellGroup, Row, Col } from 'vant';
import avator from '@/components/avator';
import { mapState } from 'vuex';
import md5 from 'blueimp-md5';
import { isPwdValid, isAccountValid, isTelValid, isEmailValid, isChineseNameValid } from '@/utils/validate';
import Logger from 'chivy';
const log = new Logger('views/main/login');
export default {
  name: 'Login',
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
    ...mapState({
      'uuid': state => state.member.uuid
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      log.debug('uuid is ' + vm.uuid);
      if (vm.$tools.isEmpty(vm.uuid)) {
        vm.$router.push({name: 'member'});
      }
    })
  },
  methods: {
    // 微博登陆
    onClickWeibo() {
      log.info('weibo login');
      this.$toast('暂未开放第三方登陆');
      // window.location.href = '/shop/member/show/ui/loginByOauth2.do?accountType=weibo';
    },
    // 游客
    onClickVistor() {
      this.$router.push({name: 'member'});
    },
    // 显示登陆和注册
    onClickShow() {
      this.showlogin = !this.showlogin;
    },
    // 登陆
    onClickLogin() {
      this.disable.login = true;
      const valid = !this.username.error && !this.password.error && !this.$tools.isEmpty(this.username.content) && !this.$tools.isEmpty(this.password.content);
      if (!valid) {
        this.$toast({message: '请填写正确的内容', mask: true, type: 'fail'});
        this.disable.login = false;
        return;
      }
      // 用户登录
      const param = {
        name: this.username.content,
        passWd: md5(this.password.content)
      };
      this.$toast('登录中', true, 'loading');
      this.$store.dispatch('login', param).then(() => {
        log.info('login success');
        this.$toast({message: '登录成功', mask: true, type: 'success'});
        this.disable.login = false;
        this.Jump2MemberPage();
      }).catch((error) => {
        this.$toast({message: '登录失败', mask: true, type: 'fail'});
        this.disable.login = false;
        this.ResetField(true);
      });
    },
    // 注册
    onClickRegister() {
      this.disable.register = true;
      const valid = !this.account.error && !this.pwd.error && !this.repwd.error && !this.$tools.isEmpty(this.account.content) && !this.$tools.isEmpty(this.pwd.content) && !this.$tools.isEmpty(this.repwd.content);
      if (!valid) {
        this.$toast({message: '请填写正确的内容', mask: true, type: 'fail'});
        this.disable.register = false;
        return;
      }
      // 注册用户
      const param ={
        name: this.account.content,
        passwd: md5(this.pwd)
      };
      this.$toast({message: '登录中', mask: true, type: 'loading'});
      this.$store.dispatch('resigter', param).then(() => {
        this.$toast({message: '注册成功', mask: true, type: 'success'});
        this.disable.register = false;
        this.Jump2MemberPage();
      }).catch(error => {
        log.error('error is ' + JSON.stringify(error));
        this.$toast({message: '注册失败', mask: true, type: 'fail'});
        this.ResetField(true);
        this.disable.register = false;
      });
    },
    // 检查账户是否重复
    checkAccountDuplicate(data) {
      if (this.$tools.isEmpty(data.content)){
        return;
      }
      // debugger
      if  (!this.CheckAccountAvaliable(data.content)) {
        data.error = true;
        return;
      }
      this.$store.dispatch('duplicate', data.content).then(resp => {
          this.$toast({message: '用户名重复，请重新输入用户名', mask: true, type: 'text'});
          this.account.content = '';
          data.error = true;
      }).catch(error => {
        log.error('account is duplicate, error is ' + JSON.stringify(error));
        data.error = false;
      });

    },
    // 忘记密码
    onClickForget() {
      log.info('forget password');
    },
    checkAvaliable(data) {
      let error = false;
      data.error = error;
      if (data.content === '') {
        error = true;
        return;
      }
      switch(data.key) {
        case this.username.key:
          error = !this.CheckAccountAvaliable(data.content);
          if(error) {
            this.$toast('账户可以是邮箱或者手机号码');
          }
          break;
        case this.pwd.key:
          error = !isPwdValid(data.content);
          if(error) {
            this.$toast('密码由6-21字母和数字组成');
          }
          break;
        case this.repwd.key:
          error = this.repwd.content !== this.pwd.content ? true: false;
          if(error) {
             this.$toast('两次输入的密码不一致');
          }
          break;
      }
      log.debug(data.key + ' check result is ' + error);
      data.error = error;
    },
    // 检查账号是否可用
    CheckAccountAvaliable(account) {
      if (isTelValid(account)) {
        return true;
      } else if (isEmailValid(account)) {
        return true;
      } else if (isAccountValid(account)) {
        return true;
      }
      return false;
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

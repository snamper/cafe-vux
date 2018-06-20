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
          v-model="username"
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          required
          @click-icon="username = ''"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
    </div>
    <div class="input" v-else>
      <van-cell-group>
        <van-field
          v-model="account"
          label="用户名"
          icon="clear"
          placeholder="手机号码/邮箱名/用户名"
          required
          @click-icon="username = ''"
        />
        <van-field
          v-model="pwd"
          type="password"
          label="输入密码"
          placeholder="请输入密码"
          required
        />
        <van-field
          v-model="repwd"
          type="password"
          label="确认密码"
          placeholder="请确认密码"
          required
        />
      </van-cell-group>
    </div>
    <div class="submit" v-if="showlogin">
      <div class="login">
        <van-button style="width:97%" type="primary" @click="login">登录</van-button>
      </div>
      <div class="ops">
        <span class="forget" @click="forgetPwd">忘记密码</span>
        <span class="register" @click="show">注册</span>
      </div>
    </div>
    <div class="submit" v-else>
      <div class="submit-wrapper">
        <van-button class="registerbtn" type="primary" @click="register">注册</van-button>
        <van-button class="loginbtn"  type="primary" @click="show">登录</van-button>
      </div>
    </div>
    <div class="foot">
      <div class="divider">
        第三方登录
      </div>
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
import { Button, Field, CellGroup } from 'vant';
import avator from '../../components/avator';
import Logger from 'chivy';
const log = new Logger('page/member/login');
export default {
  data() {
    return {
      showlogin: false,
      img: {
        url: '../../../static/img/tian.jpg',
        width: 100,
        height: 100
      },
      third: {
        weibo: {
          url: '../../../static/img/weibo.png',
          radius: 50
        }
      },
      username: '',
      password: '',
      account: '',
      pwd: '',
      repwd: ''
    }
  },
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    avator
  },
  methods: {
    show() {
      this.showlogin = !this.showlogin;
    },
    login() {
      if (this.username === '' || this.password === '') {
        this.__toast('用户名和密码不能为空');
      } else {
        // 用户登录
        const param = {
          name: this.username,
          passWd: md5(this.password)
        };
        this.$store.dispatch('login', param).then(() => {
          this.__jump();
        }).catch((error) => {
          this.__fail(true);
        });
      }
    },
    register() {
      if (this.$refs.account.invalid) {
        this.__toast('请填写手机号码/邮箱/用户名');
      } else if (this.$refs.pwd.invalid) {
        this.__toast('请输入正确的密码');
      } else if (this.pwd !== this.repwd) {
        this.__toast('两次输入的密码不一致，请重新输入');
        this.$refs.pwd.reset();
        this.$refs.repwd.reset();
      } else {
        // 注册用户
        const param ={
          mobile: this.account,
          passWd: md5(this.pwd)
        };
        this.$store.dispatch('resigter', param).then(() => {
          this.__jump();
        }).catch((error) => {
          this.__fail(true);
        });
      }
    },
    forgetPwd() {
      log.info('forget password');
    },
    checkduplicate() {
      if (this.account !== '') {
        // 校验账户是否重复
        const param = {name: account};
        // 服务端校验
        this.$store.dispatch('duplicate', param).then((resp) => {
          if (resp) {
            this.__toast('用户名已被占用，请重新输入');
            this.$ref.account.reset();
          }
        }).catch((error) => {
          this.__fail(false);
        });
      }
    },
    __fail(status) {
      // 密码清空
      this.showlogin = status;
      this.username = '';
      this.password = '';
      this.account = '';
      this.pwd = '';
      this.repwd = '';
    },
    __toast(content) {
      this.$vux.toast.text(content, 'middle');
    },
    __jump() {
      /*
       * 1. 当页面从pay页面跳转过来的时候，需要记录过来的页面，并在登录完成后跳转回到pay页面
       * 2. 当前页面刷新（保持原页面)
       * 3. 当页面不是从pay跳转过来的，当登录成功后，则需要跳转到member也页面
       *
      */
     log.debug('from path is ' + this.from);
      if (this.from === '/balance') {
        if (this.type.type === 'address') {
          this.$router.push({name: 'balance'});
        } else if(this.type.type === 'pay') {
          this.$router.push({name: 'pay'});
        }
      } else {
        this.$router.push({name: 'member'});
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    display flex
    .forget, .register
      font-size 16px
      padding 10px
    .register
      margin-left auto
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
    margin-bottom 10px
    display flex
    justify-content center
  .icon
    display flex
    justify-content center
</style>

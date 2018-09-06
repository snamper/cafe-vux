<template>
  <div class="login-wrapper">
    <div class="logo">
      <avator
        :url="img.url"
        :width="img.width"
        :height="img.height">
      </avator>
    </div>
    <div class="login">
      <van-cell-group >
        <field
          :fields="fields">
        </field>
      </van-cell-group>
    </div>
    <div class="submit">
      <div class="login">
        <van-button style="width:97%" type="primary" @click.native="onClickLogin">登录</van-button>
      </div>
      <div class="ops">
        <van-row type="flex">
          <van-col class="forget" span="8" @click.native="onClickForget">忘记密码</van-col>
          <van-col class="vistor" span="8" @click.native="onClickVistor" >游客访问</van-col>
          <van-col class="register" span="8" @click.native="onClickRegister">注册</van-col>
        </van-row>
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

<script>
import { Button, CellGroup, Row, Col } from 'vant';
import avator from '@/components/avator';
import field from '@/components/field';
import md5 from 'blueimp-md5';
import Logger from 'chivy';
const log = new Logger('views/main/login');
export default {
  name: 'Login',
  data () {
    return {
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
      fields: [
        {content: '', label: '用户名', icon: 'close', placeholder: '请输入手机号码', required: true, post: false, error: false, desc: 'mobile', errorMessage: '请输入正确的手机号码'},
        {content: '', label: '密码', icon: 'close', placeholder: '请输入密码', required: true, error: false, desc: 'password', type: 'password'}
      ]
    };
  },
  components: {
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    field,
    avator
  },
  methods: {
    // 游客
    onClickVistor() {
      this.$router.push({name: 'member'});
    },
    onClickRegister() {
      this.$router.push({name: 'register'});
    },
    // 微博登陆
    onClickWeibo() {
      log.info('weibo login');
      this.$toast('暂未开放第三方登陆');
      // window.location.href = '/shop/member/show/ui/loginByOauth2.do?accountType=weibo';
    },
    onClickForget() {
      this.$toast('请联系管理员重置密码');
    },
    onClickLogin() {
      const content = this._isContentNotEmpty(this.fields);
      if (!content.result) {
        this.$toast(content.errorMessage);
        return;
      }
      const errors = this._IteratorPage(this.fields);
      if (errors.result) {
        this.$toast(errors.errorMessage);
        return;
      }
      const user = {
        name: this.fields[0].content,
        passWd: md5(this.fields[1].content)
      };
      this.$store.dispatch('login', user).then(() => {
        this.$router.push({name: 'member'});
      });
    },
    _isContentNotEmpty(page) {
      let result = true;
      const errorMessage = '请填写带*号的选项';
      page.filter(item => item.required === true).forEach(item => {
        // log.debug(this.$tools.isNotEmpty(item.content));
        result = result && this.$tools.isNotEmpty(item.content);
        // log.warn(result);
      });
      return {result, errorMessage};
    },
    // 遍历数组，当发现有error为true的时候返回真，否则是假
    _IteratorPage(page) {
      let result = false;
      const errorMessage = '请填写正确的内容';
      page.filter(item => item.required === true).forEach(item => {
        result = result || item.error;
      });
      return {result, errorMessage};
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../styles/mixin.styl';
.login-wrapper
  bgcolor()
  bottom()
  .logo
    display flex
    justify-content center
    align-items center
    height 160px
    width 100%
    margin-top 10px
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

<template>
  <div class="register-wrapper">
    <van-nav-bar
      title="会员注册"
      :left-arrow="true"
      @click-left="back">
    </van-nav-bar>
    <div class="register-first">
      <van-cell-group >
        <field
          @blurrepwd="repwd"
          @birthday="birthday"
          @sex="sex"
          @area="area"
          :fields="fields">
        </field>
      </van-cell-group>
    </div>
    <div class="save-first" v-if="step">
      <van-button style="width:95%" type="primary" plain  @click.native="next">下一步</van-button>
      <van-button style="width:95%;" type="primary" @click.native="login">我要登录</van-button>
    </div>
    <div class="save-second" v-else>
      <van-button style="width:95%" type="primary" @click.native="save">注册会员</van-button>
    </div>
    <van-actionsheet v-model="show.action">
      <van-datetime-picker
        v-if="show.birthday"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @confirm="confirmBirthday"
        @cancel="cancel">
      </van-datetime-picker>
      <van-picker
        show-toolbar
        v-if="show.sex"
        :columns="sexcolumns"
        @confirm="confirmSex"
        @cancel="cancel">
      </van-picker>
      <van-area
        :area-list="areaList"
        v-if="show.area"
        @confirm="confirmArea"
        @cancel="cancel">
      </van-area>
    </van-actionsheet>
  </div>
</template>

<script>
/*
* 页面分两个步骤显示，第一个步骤注册会员，第二个部分选择填写数据。
* 当第一个页面填写完成的时候并不会进行注册动作，只有当第二个部分完成填写的时候才进行会员注册
*/
import { Button, Field, CellGroup, DatetimePicker, Picker, Area, Actionsheet, NavBar } from 'vant';
import field from '@/components/field';
import AreaList from '@/utils/area.js';
import md5 from 'blueimp-md5';
import Logger from 'chivy';
const log = new Logger('components/register');
export default {
  name: 'Register',
  data () {
    return {
      img: {
        url: '../../../static/img/tian.jpg',
        width: 100,
        height: 100
      },
      leftArrow: false,
      // 控制显示第一页还是第二页
      step: true,
      page1: [
        {content: '', label: '手机号码', icon: 'close', placeholder: '请输入手机号码', required: true, error: false, post: true, desc: 'mobile', errorMessage: '请输入正确的手机号码'},
        {content: '', label: '输入密码', icon: 'close', placeholder: '请输入密码', required: true, error: false, desc: 'pwd', type: 'password', errorMessage: '密码必须由6-21字母和数字组成'},
        {content: '', label: '确认密码', icon: 'close', placeholder: '请确认密码', required: true, error: false, desc: 'repwd', type: 'password', errorMessage: '两次输入的密码不一致'}
      ],
      page2: [
        {content: '', label: '姓名', icon: 'close', placeholder: '请输入姓名', required: true, error: false, desc: 'name', errorMessage: '请输入正确的中文名字'},
        {content: '', label: '生日', placeholder: '请选择', required: true, error: false, desc: 'birthday', popup: true},
        {content: '', label: '性别', placeholder: '请选择', required: true, error: false, desc: 'sex', popup: true},
        {content: '', label: '电子邮箱', icon: 'close', placeholder: '请输入邮箱地址', required: false, error: false, desc: 'email', errorMessage: '请输入正确的电子邮箱'},
        {content: '', label: '微信号', icon: 'close', placeholder: '请输入您的微信号', required: false, error: false, desc: 'wechat', errorMessage: '请输入正确的微信号'},
        {content: '', label: '所在地', placeholder: '请选择', required: false, error: false, desc: 'area', popup: true},
        {content: '', label: '详细地址', icon: 'close', placeholder: '请输入街道门牌号', required: false, error: false, desc: 'address'}
      ],
      show: {
        action: false,
        birthday: false,
        sex: false,
        area: false
      },
      areaList: AreaList,
      sexcolumns: ['女', '男'],
      currentDate: new Date(),
      minDate: new Date(1900, 1, 1)
    };
  },
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [DatetimePicker.name]: DatetimePicker,
    [Picker.name]: Picker,
    [Area.name]: Area,
    [Actionsheet.name]: Actionsheet,
    [NavBar.name]: NavBar,
    field
  },
  computed: {
    fields() {
      return this.step ? this.page1 : this.page2;
    }
  },
  methods: {
    login() {
      this.$router.push({name: 'login'});
    },
    back() {
      log.debug('back');
      if (this.leftArrow) {
        this.step = true;
        this.leftArrow = false;
      } else {
        this.$router.push({name: 'member'});
      }
    },
    next() {
      log.debug('next');
      /* eslint-disable */
      /* debugger */
      const content = this._isContentNotEmpty(this.page1);
      log.debug('content is ' + JSON.stringify(content));
      if (!content.result) {
        this.$toast(content.errorMessage);
        return;
      }
      const errors = this._IteratorPage(this.page1);
      log.debug('errors is ' + JSON.stringify(errors));
      if (errors.result) {
        this.$toast(errors.errorMessage);
        return;
      }
      // 显示第二页并显示回退按钮
      this.leftArrow = true;
      this.step = false;
    },
    save() {
      log.debug('save');
      /**
       * 1. 先判断page1和page2是否为空， 其中需要判断page1和page2是否有错误
       * 2. 当没有错误的时候，做两个动作 a. createMember创建用户，b. modifyBasicInfo改用户信息
      */
      const content = this._isContentNotEmpty(this.page2);
      log.debug('save content is ' + JSON.stringify(content));
      if (!content.result) {
        this.$toast(content.errorMessage);
        return;
      }
      const errors = this._IteratorPage(this.page2);
      if (errors.result) {
        this.$toast(errors.errorMessage);
        return;
      }
      const register = {
        mobile: this.page1[0].content,
        passWd: md5(this.page1[1].content),
        realName: this.page2[0].content,
        birthDay: this.$tools.isNotEmpty(this.page2[1].content) ? this.$tools.date2Long(this.page2[1].content) : '',
        genderStr: this.$tools.sex(this.page2[2].content),
        email: this.page2[3].content,
        wechat: this.page2[4].content,
        region: this.page2[5].content,
        address: this.page2[6].content
      };
      log.debug('register data is ' + JSON.stringify(register));
      this.$store.dispatch('resigter', register).then(resp => {
        this.$router.push({name: 'member'});
      }).catch(error => {
        // 注册失败，需要清空数据并显示第一页

      });
    },
    repwd() {
      this.page1[2].error = false;
      if (this.page1[1].content !== this.page1[2].content) {
        this.page1[2].error = true;
        this.$toast(this.page1[2].errorMessage);
      }
    },
    birthday() {
      this._closeAllActionSheet();
      this.show.action = true;
      this.show.birthday = true;
    },
    sex() {
      this._closeAllActionSheet();
      this.show.action = true;
      this.show.sex = true;
    },
    area() {
      this._closeAllActionSheet();
      this.show.action = true;
      this.show.area = true;
    },
    confirmBirthday(value) {
      const date = this.$tools.formatDate(value);
      this.page2[1].content = date.Year + '-' + date.Month + '-' + date.Day;
      this._closeAllActionSheet();
    },
    confirmSex(value) {
      this.page2[2].content = value;
      this._closeAllActionSheet();
    },
    confirmArea(value) {
      if (value[0].code !== '-1' && value[1].code !== '-1' && value[2].code !== '-1') {
        this.page2[5].content = value[0].name + '-' + value[1].name + '-' + value[2].name;
      }
      this._closeAllActionSheet();
    },
    cancel() {
      this._closeAllActionSheet();
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
    },
    _closeAllActionSheet() {
      this.show.area = false;
      this.show.birthday = false;
      this.show.action = false;
      this.show.sex = false;
    },
    _clearInput() {
      this.page1.forEach(field => {
        field.content = '';
      });
      this.page2.forEach(field => {
        field.content = '';
      });
      this.step = true;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.save-first, .save-second
  display flex
  flex-direction column
  justify-content center
  align-items center
  .van-button
    margin 5px 0 2px 0

</style>

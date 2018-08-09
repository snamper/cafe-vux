<template>
  <div class="register-wrapper">
    <van-nav-bar
      title="会员注册"
      :left-arrow="leftArrow"
      @click-left="back">
    </van-nav-bar>
    <div class="register-first">
      <van-cell-group >
        <field :fields="fields"></field>
      </van-cell-group>
    </div>
    <div class="save-first" v-if="step">
      <van-button style="width:95%" type="primary" @click.native="next">下一步</van-button>
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
        @confirm="dateConfirm"
        @cancel="cancel">
      </van-datetime-picker>
      <van-picker
        show-toolbar
        v-if="show.sex"
        :columns="sexcolumns"
        @confirm="pickerConfirm"
        @cancel="cancel">
      </van-picker>
      <van-area
        :area-list="areaList"
        v-if="show.area"
        @confirm="areaConfirm"
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
/* import md5 from 'blueimp-md5'; */
import Logger from 'chivy';
const log = new Logger('components/register');
export default {
  data () {
    return {
      img: {
        url: '../../../static/img/tian.jpg',
        width: 100,
        height: 100
      },
      // Navbar是否要显示，默认不显示，只有当第二步的时候才显示
      leftArrow: false,
      // 控制显示第一页还是第二页
      step: true,
      page1: [
        {content: '', label: '用户名', placeholder: '手机号码/邮箱名', required: true, error: false, desc: 'account', errorMessage: '用户名不能包含特殊字符'},
        {content: '', label: '输入密码', placeholder: '请输入密码', required: true, error: false, desc: 'pwd', type: 'password', errorMessage: '密码不能包含特殊字符'},
        {content: '', label: '确认密码', placeholder: '请确认密码', required: true, error: false, desc: 'repwd', type: 'password', errorMessage: '两次输入的密码不一致'}
      ],
      page2: [
        {content: '', label: '姓名', placeholder: '请输入姓名', required: true, error: false, desc: 'name', errorMessage: '请输入正确的中文名字'},
        {content: '', label: '生日', placeholder: '请选择', required: true, error: false, desc: 'birthday'},
        {content: '', label: '性别', placeholder: '请选择', required: true, error: false, desc: 'sex'},
        {content: '', label: '电话号码', placeholder: '请输入电话号码', required: true, error: false, desc: 'mobile'},
        {content: '', label: '电子邮箱', placeholder: '请输入邮箱地址', required: false, error: false, desc: 'email'},
        {content: '', label: '微信号', placeholder: '请输入您的微信号', required: false, error: false, desc: 'wechat'},
        {content: '', label: '所在地', placeholder: '请选择', required: false, error: false, desc: 'area'},
        {content: '', label: '详细地址', placeholder: '请输入街道门牌号', required: false, error: false, desc: 'address'}
      ],
      show: {
        birthday: false,
        sex: false,
        area: false
      }
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
    back() {
      log.debug('back');
      // 返回按钮点击后显示第一页并不显示回退按钮
      this.leftArrow = false;
      this.step = true;
    },
    next() {
      log.debug('next');
      // 显示第二页并显示回退按钮
      this.leftArrow = true;
      this.step = false;
    },
    save() {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>

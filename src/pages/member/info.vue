<template>
  <div class="info">
    <van-nav-bar
      title="会员信息设置"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="name"
        label="姓名"
        icon="clear"
        placeholder="请输入姓名"
        required
        @focus="close"
        @click-icon="name = ''">
      </van-field>
      <van-field
        v-model="birthday"
        label="生日"
        placeholder="请选择"
        required
        @focus="selectbirthday">
      </van-field>
      <van-field
        v-model="sex"
        label="性别"
        placeholder="请选择"
        required
        @focus="selectsex">
      </van-field>
      <van-field
        v-model="mobile"
        label="电话号码"
        icon="clear"
        placeholder="请输入电话号码"
        required
        @focus="close"
        @click-icon="name = ''">
      </van-field>
      <van-field
        v-model="area"
        label="所在地"
        placeholder="请选择"
        @focus="selectarea">
      </van-field>
      <van-field
        v-model="address"
        label="详细地址"
        placeholder="请输入街道门牌号"
        @focus="selectarea">
      </van-field>
    </van-cell-group>
    <van-actionsheet v-model="show.action">
      <van-datetime-picker
        v-if="show.birthday"
        v-model="currentDate"
        type="date"
        @confirm="confirm"
        @cancel="cancel">
      </van-datetime-picker>
      <van-picker
        show-toolbar
        v-if="show.sex"
        :columns="sexcolumns"
        @confirm="confirm"
        @cancel="cancel">
      </van-picker>
      <van-area
        :area-list="areaList"
        v-if="show.area"
        @confirm="confirm"
        @cancel="cancel">
      </van-area>
    </van-actionsheet>
  </div>
</template>

<script type="text/ecmascript=6">
import { Field, NavBar, CellGroup, DatetimePicker, Picker, Area, Actionsheet } from 'vant';
import AreaList from '../../common/js/area.js';
export default {
  data() {
    return {
      show: {
        birthday: false,
        sex: false,
        area: false,
        action: false
      },
      address: '',
      area: '',
      areaList: AreaList,
      sex: '',
      sexcolumns: ['请选择', '男', '女' ],
      name: '',
      birthday: '',
      currentDate: '',
      minDate: '',
      mobile: ''
    };
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker,
    [Picker.name]: Picker,
    [Area.name]: Area,
    [Actionsheet.name]: Actionsheet
  },
  methods: {
    close() {
      this.show.area = false;
      this.show.birthday = false;
      this.show.action = false;
      this.show.sex = false;
    },
    back() {

    },
    selectarea() {
      this.show.area = true;
      this.show.action = true;
      // 禁止手机调用输入法
      document.activeElement.blur();
    },
    selectbirthday() {
      this.show.birthday = true;
      this.show.action = true;
      // 禁止手机调用输入法
      document.activeElement.blur();
    },
    selectsex() {
      this.show.sex = true;
      this.show.action = true;
      document.activeElement.blur();
    },
    confirm() {
      this.close();
    },
    cancel() {
      this.close();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

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
    </van-cell-group>
    <van-datetime-picker v-if="show.birthday"
        v-model="currentDate"
        type="date"
        @confirm="confirm"
        @cancel="cancel">
    </van-datetime-picker>
    <van-dialog
      v-model="show.sex"
      show-cancel-button>
      <van-picker 
          show-toolbar
          v-if="show.sex"
          :columns="sexcolumns" 
          @confirm="confirm"
          @cancel="cancel">
      </van-picker>
    </van-dialog>
  </div>
</template>

<script type="text/ecmascript=6">
import { Field, NavBar, CellGroup, DatetimePicker, Picker, Dialog } from 'vant';
export default {
  data() {
    return {
      show: {
        birthday: false,
        sex: false
      },
      sex: '',
      sexcolumns: ['请选择', '男', '女' ],
      name: '',
      birthday: '',
      currentDate: '',
      minDate: ''
    };
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog
  },
  methods: {
    close() {
      this.show.birthday = false;
      this.show.sex = false;
    },
    back() {

    },
    selectbirthday() {
      this.show.birthday = true;
      // 禁止手机调用输入法
      document.activeElement.blur();
    },
    selectsex() {
      this.show.sex = true;
      document.activeElement.blur();
    },
    confirm() {
      this.show.birthday = false;
      this.show.sex = false;
    },
    cancel() {
      this.show.birthday = false;
      this.show.sex = false;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.van-picker
  position fixed
  left 0px
  bottom 0px
  width 100%
</style>

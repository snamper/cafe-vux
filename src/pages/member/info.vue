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
        @click-icon="name = ''"
      />
      <van-field
        v-model="birthday"
        label="生日"
        placeholder="请选择"
        required
        @focus="selectbirthday"
      />
    </van-cell-group>
    <van-datetime-picker v-if="show"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
    />
  </div>
</template>

<script type="text/ecmascript=6">
import { Field, NavBar, CellGroup, DatetimePicker } from 'vant';
export default {
  data() {
    return {
      show: false,
      name: '',
      birthday: ''
    };
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker
  },
  methods: {
    back() {

    },
    selectbirthday() {
      this.show = true;
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

<template>
  <div class="info">
    <van-nav-bar
      title="会员信息设置"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="name.content"
        label="姓名"
        icon="clear"
        placeholder="请输入姓名"
        required
        :error="name.error"
        @blur="check(name)"
        @focus="close"
        @click-icon="name.content = ''">
      </van-field>
      <van-field
        v-model="birthday.content"
        label="生日"
        placeholder="请选择"
        required
        :error="birthday.error"
        @blur="check(birthday)"
        @focus="selectbirthday">
      </van-field>
      <van-field
        v-model="sex.content"
        label="性别"
        placeholder="请选择"
        @focus="selectsex">
      </van-field>
      <van-field
        v-model="mobile.content"
        label="电话号码"
        icon="clear"
        placeholder="请输入电话号码"
        required
        :error="mobile.error"
        @blur="check(mobile)"
        @focus="close"
        @click-icon="mobile.content = ''">
      </van-field>
      <van-field
        v-model="email.content"
        label="电子邮箱"
        icon="clear"
        placeholder="请输入邮箱地址"
        required
        :error="email.error"
        @blur="check(email)"
        @focus="close"
        @click-icon="email.content = ''">
      </van-field>
      <van-field
        v-model="area.content"
        label="所在地"
        placeholder="请选择"
        @focus="selectarea">
      </van-field>
      <van-field
        v-model="address.content"
        label="详细地址"
        :error="address.error"
        placeholder="请输入街道门牌号">
      </van-field>
    </van-cell-group>
    <div class="save">
      <van-button style="width:95%" type="primary" @click.native="save">保存</van-button>
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

<script type="text/ecmascript=6">
import { Field, NavBar, CellGroup, DatetimePicker, Picker, Area, Actionsheet, Button, Toast } from 'vant';
import { mapState } from 'vuex';
import AreaList from '@/utils/area.js';
import Logger from 'chivy';
const log = new Logger('views/modify');
export default {
  name: 'Modify',
  data() {
    return {
      show: {
        birthday: false,
        sex: false,
        area: false,
        action: false
      },
      areaList: AreaList,
      sexcolumns: ['请选择', '男', '女'],
      currentDate: new Date(),
      minDate: new Date(1900, 1, 1),
      mobile: {
        key: 'mobile',
        content: '',
        error: false
      },
      name: {
        key: 'name',
        content: '',
        error: false
      },
      birthday: {
        key: 'birthday',
        content: '',
        error: false
      },
      sex: {
        key: 'sex',
        content: '',
        error: false
      },
      address: {
        key: 'address',
        content: '',
        error: false
      },
      area: {
        key: 'area',
        content: '',
        error: false
      },
      email: {
        key: 'email',
        content: '',
        error: false
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path !== '/card' || vm.$tools.isEmpty(vm.member)) {
        vm.$router.push({name: 'member'});
      }
    });
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker,
    [Picker.name]: Picker,
    [Area.name]: Area,
    [Actionsheet.name]: Actionsheet,
    [Button.name]: Button
  },
  computed: {
    ...mapState({
      'uuid': state => state.member.uuid,
      'member': state => state.member.member
    })
  },
  methods: {
    close() {
      this.show.area = false;
      this.show.birthday = false;
      this.show.action = false;
      this.show.sex = false;
    },
    back() {
      this.$router.push({name: 'card'});
    },
    selectarea() {
      this.close();
      this.show.area = true;
      this.show.action = true;
      // 禁止手机调用输入法
      document.activeElement.blur();
    },
    selectbirthday() {
      this.close();
      this.show.birthday = true;
      this.show.action = true;
      // 禁止手机调用输入法
      document.activeElement.blur();
    },
    selectsex() {
      this.close();
      this.show.sex = true;
      this.show.action = true;
      document.activeElement.blur();
    },
    cancel() {
      this.close();
    },
    dateConfirm(value) {
      const date = formatDate(value);
      this.birthday.content = date.Year + '-' + date.Month + '-' + date.Day;
      this.close();
    },
    pickerConfirm(data) {
      if (data !== this.sexcolumns[0]) {
        this.sex.content = data;
      }
      this.close();
    },
    areaConfirm(data) {
      if(data[0].code !== '-1' && data[1].code !== '-1' && data[2].code !== '-1') {
        this.area.content = data[0].name + data[1].name + data[2].name;
      }
      this.close();
    },
    save() {
      const error = this.name.error || this.birthday.error || this.mobile.error || this.$tools.isEmpty(this.name.content) || this.$tools.isEmpty(this.birthday.content) || this.$tools.isEmpty (this.mobile.content);
      if (error) {
        this.$toast('请检查填写内容');
      } else {
        // 查重
        this.$store.dispatch('duplicate', this.mobile.content).then(resp => {
          if (resp) {
            this.$toast('手机已被注册，请重新输入手机号码');
            this.mobile.content = '';
          } else {
            const param = {
              userId: this.member.id,
              name: this.name.content,
              mobile: this.mobile.content,
              gender: this.$tools.isEmpty(this.sex.content) ? this.sex.content : null,
              email: this.$tools.isEmpty(this.email.content) ? this.email.content : null,
              address: this.$tools.isEmpty(this.area.content) ? this.area.content : null,
              detailAddress : this.$tools.isEmpty(this.address.content) ? this.address.content : null
            }
            this.$store.dispatch('modifyInfo', param).then(resp => {
              // TODO 需要更新state中的内容
              this.$toast.success('个人信息修改成功');
            }).catch(error => {
              log.error('error is ' + JSON.stringify(error));
              this.$toast.fail('个人信息修改失败');
            });
          }
        });
      }
    },
    check(data) {
      let error = false;
      // debugger
      switch(data.key) {
        case this.name.key:
          error = this.$tools.isEmpty(this.name.content) || !this.$tools.isChineseNameValid(data.content);
          if (error) {
            this.$toast('请输入中文姓名');
          }
          break;
        case this.birthday.key:
          error = this.$tools.isEmpty(this.birthday.content);
          if(error) {
            this.$toast('请选择生日');
          }
          break;
        case this.mobile.key:
          error = this.$tools.isEmpty(this.mobile.content) || !this.$tools.isTelValid(data.content);
          if(error) {
            this.$toast('请输入正确的电话号码');
          }
          break;
        case this.email.key:
          error = this.$tools.isEmpty(this.email.content) || !this.$tools.isEmailValid(data.content);
          if(error) {
            this.$toast('请输入正确的邮件地址');
          }
      }
      data.error = error;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.info
  .save
    display flex
    justify-content center
    margin 10px 0
    padding 10px 0
</style>

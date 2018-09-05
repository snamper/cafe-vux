<template>
  <div class="info">
    <van-nav-bar
      title="会员信息设置"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <field
        @birthday="birthday"
        @sex="sex"
        @area="area"
        :fields="fields">
      </field>
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

<script type="text/ecmascript=6">
import { Button, Field, CellGroup, DatetimePicker, Picker, Area, Actionsheet, NavBar } from 'vant';
import field from '@/components/field';
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
      sexcolumns: ['女', '男'],
      currentDate: new Date(),
      minDate: new Date(1900, 1, 1),
      fields: [
        {content: '', label: '姓名', icon: 'close', placeholder: '请输入中文姓名', required: true, error: false, desc: 'name', errorMessage: '请输入正确的中文姓名'},
        {content: '', label: '生日', icon: 'close', placeholder: '请选择生日', required: true, error: false, desc: 'birthday', errorMessage: '请选择正确的生日'},
        {content: '', label: '性别', icon: 'close', placeholder: '请选择性别', required: true, error: false, desc: 'sex', errorMessage: '请选择性别'},
        {content: '', label: '电子邮箱', icon: 'close', placeholder: '请输入电子邮箱', required: false, error: false, desc: 'email', errorMessage: '请输入正确的电子邮箱'},
        {content: '', label: '所在地', icon: 'close', placeholder: '请选择所在地', required: false, error: false, desc: 'area', errorMessage: '请选择正确的所在地'},
        {content: '', label: '详细地址', icon: 'close', placeholder: '请输入详细地址', required: false, error: false, desc: 'address', errorMessage: '请输入详细地址'}
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path !== '/card' || vm.member) {
        // vm.$router.push({name: 'member'});
      }
      // TODO需要将数据填入其中
      vm.fields[0].content = vm.member.realName;
      vm.fields[1].content = vm.member.birthday;
      vm.fields[2].content = vm.member.sex;
      vm.fields[3].content = vm.member.email;
      vm.fields[4].content = vm.member.region;
      vm.fields[5].content = vm.member.address;
    });
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
    ...mapState({
      'uuid': state => state.member.uuid,
      'member': state => state.member.member
    })
  },
  methods: {
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
    close() {
      this.show.area = false;
      this.show.birthday = false;
      this.show.action = false;
      this.show.sex = false;
    },
    back() {
      this.$router.push({name: 'card'});
    },
    cancel() {
      this.close();
    },
    confirmBirthday(value) {
      const date = this.$tools.formatDate(value);
      this.fields[1].content = date.Year + '-' + date.Month + '-' + date.Day;
      this._closeAllActionSheet();
    },
    confirmSex(value) {
      this.fields[2].content = value;
      this._closeAllActionSheet();
    },
    confirmArea(value) {
      if (value[0].code !== '-1' && value[1].code !== '-1' && value[2].code !== '-1') {
        this.fields[4].content = value[0].name + '-' + value[1].name + '-' + value[2].name;
      }
      this._closeAllActionSheet();
    },
    save() {
      log.info('save function');
      /**
       * 1. 先判断page1和page2是否为空， 其中需要判断page1和page2是否有错误
       * 2. 当没有错误的时候，做两个动作 a. createMember创建用户，b. modifyBasicInfo改用户信息
      */
      const content = this._isContentNotEmpty(this.fields);
      log.debug('save content is ' + JSON.stringify(content));
      if (!content.result) {
        this.$toast(content.errorMessage);
        return;
      }
      const errors = this._IteratorPage(this.fields);
      if (errors.result) {
        this.$toast(errors.errorMessage);
        return;
      }
      log.info('TODO');
      /* const register = {
        mobile: this.page1[0].content,
        passWd: md5(this.page1[1].content),
        realName: this.page2[0].content,
        birthDay: this.$tools.isNotEmpty(this.page2[1].content) ? this.$tools.date2Long(this.page2[1].content) : '',
        genderStr: this.$tools.sex(this.page2[2].content),
        email: this.page2[3].content,
        wechat: this.page2[4].content,
        region: this.page2[5].content,
        address: this.page2[6].content
      }; */
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
      this.fields.forEach(field => {
        field.content = '';
      });
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

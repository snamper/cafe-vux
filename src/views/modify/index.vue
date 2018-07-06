<template>
  <div class="info">
    <van-nav-bar
      :title="$t('modify.infoSetting')"
      left-arrow
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="name.content"
        :label="$t('modify.name')"
        icon="clear"
        :placeholder="$t('modify.namePlaceholder')"
        required
        :error="name.error"
        @blur="check(name)"
        @focus="close"
        @click-icon="name.content = ''">
      </van-field>
      <van-field
        v-model="birthday.content"
        :label="$t('modify.birthday')"
        :placeholder="$t('modify.select')"
        required
        :error="birthday.error"
        @blur="check(birthday)"
        @focus="selectbirthday">
      </van-field>
      <van-field
        v-model="sex.content"
        :label="$t('modify.sex')"
        :placeholder="$t('modify.select')"
        @focus="selectsex">
      </van-field>
      <van-field
        v-model="mobile.content"
        :label="$t('modify.tel')"
        icon="clear"
        :placeholder="$t('modify.telPlaceholder')"
        required
        :error="mobile.error"
        @blur="check(mobile)"
        @focus="close"
        @click-icon="mobile.content = ''">
      </van-field>
      <van-field
        v-model="email.content"
        :label="$t('modify.email')"
        icon="clear"
        :placeholder="$t('modify.emailPlaceholder')"
        required
        :error="email.error"
        @blur="check(email)"
        @focus="close"
        @click-icon="email.content = ''">
      </van-field>
      <van-field
        v-model="area.content"
        :label="$t('modify.area')"
        :placeholder="$t('modify.select')"
        @focus="selectarea">
      </van-field>
      <van-field
        v-model="address.content"
        :label="$t('modify.address')"
        :error="address.error"
        :placeholder="$t('modify.addressPlaceholder')">
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
import { regexMatch, formatDate, isObjEmpty, toast } from '@/utils/utils.js';
import { regex } from '@/utils/consts.js';
import Logger from 'chivy';
const log = new Logger('vuex/member/info');
export default {
  data() {
    return {
      toast,
      show: {
        birthday: false,
        sex: false,
        area: false,
        action: false
      },
      areaList: AreaList,
      sexcolumns: [this.$t('modify.select'), this.$t('modify.male'), this.$t('modify.female')],
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
      if (from.path !== '/card' || isObjEmpty(vm.$store.state.member)) {
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
    ...mapState([
      'uuid',
      'member'
    ])
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
      const error = this.name.error || this.birthday.error || this.mobile.error || isObjEmpty(this.name.content) || isObjEmpty(this.birthday.content) || isObjEmpty (this.mobile.content);
      if (error) {
        this.toast(this.$t('modify.tips1'));
      } else {
        // 查重
        this.$store.dispatch('duplicate', {name: this.mobile.content}).then(resp => {
          if (resp) {
            this.toast(this.$t('modify.tips2'));
            this.mobile.content = '';
          } else {
            const param = {
              userId: this.member.id,
              name: this.name.content,
              mobile: this.mobile.content,
              gender: isObjEmpty(this.sex.content) ? this.sex.content : null,
              email: isObjEmpty(this.email.content) ? this.email.content : null,
              address: isObjEmpty(this.area.content) ? this.area.content : null,
              detailAddress : isObjEmpty(this.address.content) ? this.address.content : null
            }
            this.$store.dispatch('modifyInfo', param).then(resp => {
              if (resp) {
                this.toast(this.$t('modify.tips3'), 'success');
                //TODO 需要更新state中的内容
              } else {
                this.toast(this.$t('modify.tips4'), 'fail');
              }
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
          error = isObjEmpty(this.name.content) || !regexMatch(data.content, regex.chineseName) ;
          if (error) {
            this.toast(this.$t('modify.tips5'));
          }
          break;
        case this.birthday.key:
          error = isObjEmpty(this.birthday.content);
          if(error) {
            this.toast(this.$t('modify.tips6'));
          }
          break;
        case this.mobile.key:
          error = isObjEmpty(this.mobile.content) || !regexMatch(data.content, regex.mobile);
          if(error) {
            this.toast(this.$t('modify.tips7'));
          }
          break;
        case this.email.key:
          error = isObjEmpty(this.email.content) || !regexMatch(data.content, regex.email);
          if(error) {
            this.toast(this.$t('modify.tips8'));
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

<template>
  <div>
    <div  v-for="(field, index) in fields" :key="index">
      <van-field
        @blur="blur(field)"
        @focus="focus(field)"
        @click-icon="field.content = ''"
        v-model="field.content"
        :required="field.required"
        :type="field.type"
        :label="field.label"
        :icon="field.icon"
        :placeholder="field.placeholder"
        :error="field.error">
      </van-field>
    </div>
  </div>
</template>

<script>
import { Field } from 'vant';
import { isAccountValid, isTelValid, isEmailValid, isChineseNameValid } from '@/utils/validate';
import Logger from 'chivy';
const log = new Logger('components/field');
export default {
  props: {
    fields: {
      type: Array
    }
  },
  components: {
    [Field.name]: Field
  },
  methods: {
    blur(field) {
      if (field.required) {
        this.$tools.isEmpty(field.content) ? field.error = true : field.error = false;
        this.$toast(field.errorMessage);
      } else {
        switch (field.desc) {
          case 'account':
            if (!this._checkAccountAvaliable(field.content)) {
              field.error = true;
              this.$toast(field.errorMessage);
              return;
            }
            this.$store.dispatch('duplicate', field.content).then(resp => {
              this.$toast({message: '用户名重复，请重新输入用户名', mask: true, type: 'text'});
              field.content = '';
              field.error = true;
            }).catch(error => {
              log.error('error is ' + JSON.stringify(error));
              field.error = false;
            });
            break;
          case 'name':
            if (!isChineseNameValid(field.content)) {
              field.error = true;
              this.$toast(field.errorMessage);
            }
            break;
          case 'mobile':
            if (!isTelValid(field.content)) {
              field.error = true;
              this.$toast(field.errorMessage);
            }
            break;
          case 'email':
            if (!isEmailValid(field.content)) {
              field.error = true;
              this.$toast(field.errorMessage);
            }
            break;
          // 默认则弹出desc的方法
          default:
            this.$emit(field.desc, field);
        }
      }
    },
    focus(field) {
      this.$emit(field.desc, field);
    },
    // 检查账号是否可用
    _checkAccountAvaliable(account) {
      if (isTelValid(account)) {
        return true;
      } else if (isEmailValid(account)) {
        return true;
      } else if (isAccountValid(account)) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>

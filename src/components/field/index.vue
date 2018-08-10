<template>
  <div>
    <div  v-for="(field, index) in fields" :key="index">
      <van-field
        @blur="blur(field)"
        @focus="focus(field)"
        @click-icon="clear(field)"
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
import { isTelValid, isEmailValid, isChineseNameValid, isPwdValid } from '@/utils/validate';
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
      log.debug('field is ' + JSON.stringify(field));
      field.content = field.content.trim();
      if (field.required && this.$tools.isEmpty(field.content)) {
        if (!field.popup) {
          field.error = true;
          this.$toast(field.label + '不能为空');
        }
      } else {
        field.error = false;
        switch (field.desc) {
          case 'account':
            if (!isTelValid(field.content)) {
              field.error = true;
              this.$toast(field.errorMessage);
            } else {
              this.$store.dispatch('duplicate', {name: field.content}).then(resp => {
                if (resp.status) {
                  this.$toast({message: '用户名重复，请重新输入用户名', mask: false, type: 'text'});
                  field.error = true;
                }
              }).catch(error => {
                log.error('error is ' + JSON.stringify(error));
                field.error = false;
              });
            }
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
          case 'pwd':
            if (!isPwdValid(field.content)) {
              field.error = true;
              this.$toast(field.errorMessage);
            }
            break;
          // 默认则弹出desc的方法
          default:
            this.$emit('blur' + field.desc, field);
        }
      }
    },
    focus(field) {
      this.$emit(field.desc, field);
    },
    clear(field) {
      field.content = '';
      field.error = false;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


</style>

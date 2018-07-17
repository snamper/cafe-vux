import Vue from '../../node_modules/_vue@2.5.16@vue';
import VueI18n from '../../node_modules/_vue-i18n@8.0.0@vue-i18n';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
  zh: {
    ...zhLocale
  }
};

const i18n = new VueI18n({
  locale: 'zh',
  messages
});

export default i18n;

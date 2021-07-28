import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from './router';
import '@/plugins/ui';
import '@/plugins/vuePlugins';
import '@/common/directives/clickOutside';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import App from '@/App.vue';
import '@/plugins/ui';
import '@/common/directives/clickOutside';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

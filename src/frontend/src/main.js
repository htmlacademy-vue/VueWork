import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import '@/plugins/ui';
import '@/plugins/vuePlugins';
import '@/common/directives/clickOutside';

Vue.config.productionTip = false;

const init = async() => {
  const module = await import('@/router');
  const router = await module.default;
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
};

init();

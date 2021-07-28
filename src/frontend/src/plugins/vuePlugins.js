import Vue from 'vue';
import Notifier from '@/plugins/notifier';
import store from '@/store';

const plugins = {
  install (Vue) {
    Vue.mixin({
      computed: {
        $notifier: () => new Notifier(store)
      }
    });
  }
};

Vue.use(plugins);

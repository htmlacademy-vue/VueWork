<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import { setAuth } from '@/common/helpers';

export default {
  name: 'App',
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    // Note: check auth
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    // Note: fetch initial data
    this.$store.dispatch('init');
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>

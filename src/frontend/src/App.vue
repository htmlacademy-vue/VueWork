<template>
  <div id="app">
    <AppLayout />
  </div>
</template>
<script>
import AppLayout from '@/layouts/AppLayout';

export default {
  name: 'App',
  components: {
    AppLayout
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>

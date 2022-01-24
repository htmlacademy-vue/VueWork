<template>
  <div class="app-layout-main">
    <AppNotifications />
    <AppLayoutHeader />
    <div class="content">
      <AppLayoutMainSidebar />
      <slot />
    </div>
  </div>
</template>

<script>
import AppLayoutMainSidebar from '@/layouts/AppLayoutMainSidebar';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';

export default {
  name: 'AppLayoutMain',
  components: {
    AppLayoutMainSidebar,
    AppLayoutHeader
  }
};
</script>

<style lang="scss" scoped>
.app-layout-main {
  display: flex;
  flex-direction: column;

  height: 100vh;
}

.content {
  display: flex;
  flex-grow: 1;
}
</style>

<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <div class="content">
      <AppLayoutMainSidebar />
      <IndexHome />
    </div>
  </div>
</template>

<script>
import AppLayoutMainSidebar from '@/layouts/AppLayoutMainSidebar';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import IndexHome from '@/views/Index';

export default {
  name: 'AppLayout',
  components: {
    AppLayoutMainSidebar,
    AppLayoutHeader,
    IndexHome
  }
};
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;

  height: 100vh;
}

.content {
  display: flex;
  flex-grow: 1;
}
</style>

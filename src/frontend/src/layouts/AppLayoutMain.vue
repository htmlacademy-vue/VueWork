<template>
  <div class="app-layout-main">
    <AppNotifications />
    <AppLayoutHeader
      :show-menu="isAuthenticated"
      :show-login="!isAuthenticated && $route.name !== 'Login' "
    />
    <div class="content">
      <AppLayoutMainSidebar
        v-if="isAuthenticated"
        data-test="sidebar"
      />
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppLayoutMainSidebar from '@/layouts/AppLayoutMainSidebar';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';

export default {
  name: 'AppLayoutMain',
  components: {
    AppLayoutMainSidebar,
    AppLayoutHeader
  },

  computed: {
    ...mapState(['Auth']),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    }
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

<template>
  <div class="app-layout-default">
    <AppLayoutHeader
      :show-menu="false"
      :filters="filters"
      @applyFilters="$emit('applyFilters', $event)"
    />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from '@/layouts/AppLayoutHeader';

export default {
  name: 'AppLayoutDefault',
  components: {
    AppLayoutHeader
  },
  props: {
    filters: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.app-layout-default {
  display: flex;
  flex-direction: column;

  height: 100vh;
}
</style>

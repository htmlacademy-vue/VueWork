<template>
  <div class="app-layout-main">
    <AppLayoutHeader
      :filters="filters"
      @applyFilters="$emit('applyFilters', $event)"
    />
    <div class="content">
      <AppLayoutMainSidebar
        :tasks="tasks"
        :filters="filters"
        @updateTasks="$emit('updateTasks', $event)"
      />
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
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
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

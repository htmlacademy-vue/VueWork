<template>
  <div class="app-layout">
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
      <IndexHome
        :tasks="tasks"
        :filters="filters"
        @updateTasks="$emit('updateTasks', $event)"
        @applyFilters="$emit('applyFilters', $event)"
      />
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

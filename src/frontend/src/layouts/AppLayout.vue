<template>
  <component
    :is="layout"
    :tasks="layoutTasks"
    :filters="filters"
    @updateTasks="$emit('updateTasks', $event)"
    @applyFilters="$emit('applyFilters', $event)"
  >
    <slot />
  </component>
</template>

<script>

const defaultLayout = 'AppLayoutDefault';

export default {
  name: 'AppLayout',
  props: {
    tasks: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },

    layoutTasks() {
      return this.$route.meta.layout !== defaultLayout ? this.tasks : null;
    }
  }
};
</script>

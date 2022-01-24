<template>
  <div>
    <TaskCardView :tasks="tasks" />
  </div>
</template>

<script>
import TaskCardView from '@/modules/tasks/components/TaskCardView';

export default {
  name: 'TaskView',
  layout: 'AppLayoutMain',
  components: { TaskCardView },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
};
</script>

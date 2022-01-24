<template>
  <div>
    <TaskCardView />
  </div>
</template>

<script>
import TaskCardView from '@/modules/tasks/components/TaskCardView';

export default {
  name: 'TaskView',
  components: { TaskCardView }
};
</script>

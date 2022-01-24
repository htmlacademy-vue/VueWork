<template>
  <TaskCardCreator
    @addTask="$emit('addTask', $event)"
  />
</template>

<script>
import TaskCardCreator from '@/modules/tasks/components/TaskCardCreator';

export default {
  name: 'TaskCreate',
  components: {
    TaskCardCreator
  }
};
</script>

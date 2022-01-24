<template>
  <TaskCardCreator
    v-if="task"
    :task-to-edit="task"
    @editTask="$emit('editTask', $event)"
    @deleteTask="$emit('deleteTask', $event)"
  />
</template>

<script>
import TaskCardCreator from '@/modules/tasks/components/TaskCardCreator';
import { createNewDate } from '@/common/helpers';

export default {
  name: 'TaskEdit',
  components: { TaskCardCreator },
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      task: null
    };
  },
  created () {
    const id = this.$route.params.id;
    const task = this.tasks.find(task => +task.id === +id);
    if (task) {
      task.dueDate = task.dueDate ? new Date(task.dueDate) : createNewDate();
      task.ticks = task.ticks || [];
      this.task = task;
    } else {
      this.$router.push('/');
    }
  }
};
</script>

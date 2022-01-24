<template>
  <TaskCardCreator
    v-if="task"
    :task-to-edit="task"
  />
</template>

<script>
import { mapState } from 'vuex';
import TaskCardCreator from '@/modules/tasks/components/TaskCardCreator';
import { createNewDate } from '@/common/helpers';

export default {
  name: 'TaskEdit',
  components: {
    TaskCardCreator
  },
  data() {
    return {
      task: null
    };
  },
  computed: {
    ...mapState('Tasks', ['tasks'])
  },
  created() {
    const task = this.tasks.find(task => {
      return +task.id === +this.$route.params.id;
    });
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

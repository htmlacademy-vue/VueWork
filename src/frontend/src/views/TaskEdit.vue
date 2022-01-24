<template>
  <TaskCardCreator
    v-if="task"
    :task-to-edit="task"
  />
</template>

<script>
import { mapState } from 'vuex';
import TaskCardCreator from '@/modules/tasks/components/TaskCardCreator';
import { TASK_DETAILS_CONFIG } from '@/common/queryConfig';

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
  async created() {
    try {
      this.task = await this.$api.tasks.get(
        this.$route.params.id, TASK_DETAILS_CONFIG
      );
    } catch {
      this.$router.go(-1);
    }
  }
};
</script>

<template>
  <TaskCardCreator />
</template>

<script>
import TaskCardCreator from '@/modules/tasks/components/TaskCardCreator';
import { auth, isAdmin } from '@/middlewares';

export default {
  name: 'TaskCreate',
  middlewares: [auth, isAdmin],
  components: {
    TaskCardCreator
  }
};
</script>

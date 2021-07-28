import { cloneDeep } from 'lodash';

const getTargetColumnTasks = (toColumnId, tasks) => {
  return tasks.filter(task => task.columnId === toColumnId);
};

const addActive = (active, toTask, tasks) => {
  const activeClone = cloneDeep(active);
  const tasksClone = cloneDeep(tasks);
  const activeIndex = tasksClone.findIndex(task => task.id === active.id);
  if (~activeIndex) {
    tasksClone.splice(activeIndex, 1);
  }

  tasksClone.sort((a, b) => a.sortOrder - b.sortOrder);

  if (toTask) {
    const toTaskIndex = tasksClone.findIndex(task => task.id === toTask.id);
    tasksClone.splice(toTaskIndex, 0, activeClone);
  } else {
    tasksClone.push(activeClone);
  }

  return tasksClone;
};

export default {
  methods: {
    $moveTask(active, toTask) {
      // Note: prevent update if task is not moving
      if (toTask && active.id === toTask.id) {
        return;
      }

      const toColumnId = this.column ? this.column.id : null;
      const targetColumnTasks = getTargetColumnTasks(toColumnId, this.tasks);
      const activeClone = cloneDeep({ ...active, columnId: toColumnId });
      const resultTasks = addActive(activeClone, toTask, targetColumnTasks);
      const tasksToUpdate = [];

      resultTasks.forEach((task, index) => {
        if (task.sortOrder !== index || task.id === active.id) {
          const newTask = cloneDeep({ ...task, sortOrder: index });
          tasksToUpdate.push(newTask);
        }
      });

      tasksToUpdate.map(task => this.$store.dispatch('Tasks/put', task));
    }
  }
};

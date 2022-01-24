import {
  UPDATE_ENTITY
} from '@/store/mutations-types';


export default {
  namespaced: true,
  actions: {
    async post({ commit, rootState }, tick) {
      const data = await this.$api.ticks.post(tick);
      const task = rootState.Tasks.tasks.find(({ id }) => id === tick.taskId);
      if (task) {
        if (Array.isArray(task.ticks)) {
          task.ticks = [...task.ticks, data];
        } else {
          task.ticks = [data];
        }
        commit(UPDATE_ENTITY,
          {
            module: 'Tasks',
            entity: 'tasks',
            value: task
          }, { root: true }
        );
      }
    },

    async put({ commit, rootState }, tick) {
      await this.$api.ticks.put(tick);
      const task = rootState.Tasks.tasks.find(({ id }) => id === tick.taskId);
      if (task && task.ticks) {
        const index = task.ticks.findIndex(({ id }) => id === tick.id);
        if (index) {
          task.ticks.splice(index, 1, tick);
          commit(UPDATE_ENTITY,
            {
              module: 'Tasks',
              entity: 'tasks',
              value: task
            }, { root: true }
          );
        }
      }
    },

    async delete({ commit }, id) {
      await this.$api.ticks.delete(id);
    }
  }
};

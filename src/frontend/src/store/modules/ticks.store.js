import {
  UPDATE_ENTITY
} from '@/store/mutations-types';
import { uniqueId } from 'lodash';


export default {
  namespaced: true,
  actions: {
    post({ commit, rootState }, tick) {
      // TODO: Add api call
      const newTick = {
        ...tick,
        id: uniqueId()
      };
      const task = rootState.Tasks.tasks.find(({ id }) => id === tick.taskId);
      if (task) {
        if (Array.isArray(task.ticks)) {
          // TODO: use api data instead of newTick
          task.ticks = [...task.ticks, newTick];
        } else {
          // TODO: use api data instead of tick
          task.ticks = [newTick];
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

    put({ commit, rootState }, tick) {
      // TODO: Add api call
      const task = rootState.Tasks.tasks.find(({ id }) => id === tick.taskId);

      if (task && task.ticks) {
        const index = task.ticks.findIndex(({ id }) => id === tick.id);
        if (~index) {
          task.ticks.splice(index, 1, tick);
          commit(UPDATE_ENTITY,
            {
              module: 'Tasks',
              entity: 'tasks',
              value: task
            }, { root: true }
          );
        } else {
          task.ticks.push(tick);
        }
      }
    },

    delete(_, id) {
      // TODO: Add api call
    }
  }
};

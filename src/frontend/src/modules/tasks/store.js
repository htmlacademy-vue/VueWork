import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_FILTERS
} from '@/store/mutations-types';
import { cloneDeep } from 'lodash';
import { capitalize } from '@/common/helpers';

const entity = 'tasks';
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    tasks: [],
    filters: {
      search: '',
      users: [],
      statuses: []
    }
  },

  getters: {
    filteredTasks({ filters, tasks }) {
      const filtersAreEmpty = Object.values(filters)
        .every(value => !value.length);
      if (filtersAreEmpty) {
        // Note: to avoid tasks filtering if the filter are not set
        return tasks;
      }

      const searchFilter = task => task.title
        .toLowerCase()
        .includes(filters.search.toLowerCase().trim());

      const usersFilter = task => filters.users
        .some(userId => userId === task.userId);

      const statusesFilter = task => filters.statuses
        .some(el => el === task.status || el === task.timeStatus);

      return tasks.filter(task => {
        let result = {
          search: searchFilter,
          users: usersFilter,
          statuses: statusesFilter
        };
        return Object.entries(result)
          .every(([key, callback]) => !filters[key].length || callback(task));
      });
    },
    sidebarTasksCount:
      state => state.tasks.filter(({ columnId }) => !columnId).length,
    getTaskById: state => id => state.tasks.find(task => +task.id === +id)
  },

  mutations: {
    [UPDATE_FILTERS](state, filter) {
      state.filters = { ...state.filters, ...filter };
    }
  },

  actions: {
    async query({ commit }, config) {
      const data = await this.$api.tasks.query(config);
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: data
        }, { root: true }
      );
    },

    async post({ commit }, task) {
      const taskCopy = cloneDeep(task);
      const data = await this.$api.tasks.post(taskCopy);
      commit(ADD_ENTITY,
        {
          ...namespace,
          value: data
        }, { root: true }
      );
      return data;
    },

    async put({ commit, rootState }, task) {
      // Note: commit before api request for smooth drag-n-drop
      commit(UPDATE_ENTITY,
        {
          ...namespace,
          value: task
        }, { root: true }
      );

      const newTask = await this.$api.tasks.put(task);

      if (newTask.userId) {
        const taskUser = rootState.users
          .find(({ id }) => id === newTask.userId);
        newTask.user = taskUser || null;
      }

      // Note: confirm update
      commit(UPDATE_ENTITY,
        {
          ...namespace,
          value: newTask
        }, { root: true }
      );
    },

    async delete({ commit }, id) {
      await this.$api.tasks.delete(id);
      commit(DELETE_ENTITY,
        {
          ...namespace,
          id
        }, { root: true }
      );
    }
  }
};

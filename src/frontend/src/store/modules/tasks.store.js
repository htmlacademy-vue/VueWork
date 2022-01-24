import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_FILTERS
} from '@/store/mutations-types';
import { capitalize, normalizeTask } from '@/common/helpers';
import jsonTasks from '@/static/tasks.json';

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
    query({ commit }) {
      const data = jsonTasks.map(task => normalizeTask(task));
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: data
        }, { root: true }
      );
    },

    post({ state, commit, rootState }, task) {
      const id = state.tasks.length + 1;
      const newTask = normalizeTask({
        ...task,
        ticks: [],
        id
      });
      if (newTask.userId) {
        const taskUser = rootState.users
          .find(({ id }) => id === newTask.userId);
        newTask.user = taskUser || null;
      }
      commit(ADD_ENTITY,
        {
          ...namespace,
          value: newTask
        }, { root: true }
      );
      return newTask;
    },

    put({ commit, rootState }, task) {
      const { status, timeStatus, user, ...result } = task;

      const newTask = normalizeTask({
        ...result,
        ticks: result.ticks || []
      });

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

    delete({ commit }, id) {
      // TODO: Add api call
      commit(DELETE_ENTITY,
        {
          ...namespace,
          id
        }, { root: true }
      );
    }
  }
};

<template>
  <div id="app">
    <AppLayout
      :tasks="filteredTasks"
      :filters="filters"
      @updateTasks="updateTasks"
      @applyFilters="applyFilters"
    >
      <router-view
        :tasks="routeProps.tasks"
        :filters="routeProps.filters"
        @updateTasks="updateTasks"
        @applyFilters="applyFilters"
        @addTask="addTask"
        @editTask="editTask"
        @deleteTask="deleteTask"
      />
    </AppLayout>
  </div>
</template>

<script>
import tasks from '@/static/tasks.json';
import users from '@/static/users.json';
import { normalizeTask } from '@/common/helpers';

export default {
  name: 'App',
  data() {
    return {
      tasks: tasks.map(task => normalizeTask(task)),
      filters: {
        search: '',
        users: [],
        statuses: []
      }
    };
  },
  computed: {
    // temporary solution for props that we will get from vuex later
    routeProps() {
      const routes = {
        IndexHome: { tasks: this.filteredTasks, filters: this.filters },
        TaskView: { tasks: this.filteredTasks, filters: this.filters },
        TaskEdit: { tasks: this.filteredTasks, filters: null },
        TaskCreate: { tasks: null, filters: null }
      };
      return routes[this.$route.name] || {};
    },

    filteredTasks() {
      const filtersAreEmpty = Object.values(this.filters)
        .every(value => !value.length);
      if (filtersAreEmpty) {
        // Note: to avoid tasks filtering if the filter are not set
        return this.tasks;
      }

      const searchFilter = task => task.title
        .toLowerCase()
        .includes(this.filters.search.toLowerCase().trim());

      const usersFilter = task => this.filters.users
        .some(userId => userId === task.userId);

      const statusesFilter = task => this.filters.statuses
        .some(el => el === task.status || el === task.timeStatus);

      return this.tasks.filter(task => {
        let result = {
          search: searchFilter,
          users: usersFilter,
          statuses: statusesFilter
        };
        return Object.entries(result)
          .every(([key, callback]) =>
            !this.filters[key].length || callback(task));
      });
    }
  },
  methods: {
    updateTasks(tasksToUpdate) {
      tasksToUpdate.forEach(task => {
        const index = this.tasks.findIndex(({ id }) => id === task.id);
        if (~index) {
          this.tasks.splice(index, 1, task);
        }
      });
    },
    applyFilters({ item, entity }) {
      if (!Array.isArray(this.filters[entity])) {
        this.filters[entity] = item;
      } else {
        const resultValues = [...this.filters[entity]];
        const itemIndex = resultValues.findIndex(el => el === item);
        ~itemIndex
          ? resultValues.splice(itemIndex, 1)
          : resultValues.push(item);
        this.filters[entity] = resultValues;
      }
    },
    addTask(task) {
      const newTask = normalizeTask(task);
      newTask.id = this.tasks.length + 1;
      newTask.sortOrder = this.tasks.filter(task => !task.columnId).length;
      if (newTask.userId) {
        newTask.user = { ...this.getTaskUser(newTask.userId) };
      }
      this.tasks = [...this.tasks, newTask];
    },
    editTask(task) {
      const index = this.tasks.findIndex(({ id }) => task.id === id);
      if (~index) {
        const newTask = normalizeTask(task);
        if (newTask.userId) {
          newTask.user = { ...this.getTaskUser(newTask.userId) };
        }
        this.$set(this.tasks, index, newTask);
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    getTaskUser(userId) {
      return users.find(user => user.id === userId);
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>

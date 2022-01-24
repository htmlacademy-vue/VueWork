<template>
  <div id="app">
    <AppLayout
      :tasks="filteredTasks"
      :filters="filters"
      @updateTasks="updateTasks"
      @applyFilters="applyFilters"
    />
  </div>
</template>
<script>
import AppLayout from '@/layouts/AppLayout';
import tasks from '@/static/tasks.json';
import { normalizeTask } from '@/common/helpers';

export default {
  name: 'App',
  components: {
    AppLayout
  },
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
    }
  }
};
</script>

<style lang="scss">
@import "assets/scss/app";
</style>

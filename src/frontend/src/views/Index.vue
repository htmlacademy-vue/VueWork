<template>
  <section class="desk">
    <div class="desk__header">
      <div class="desk__header-top">
        <h1 class="desk__title">
          Design Coffee Lab
        </h1>
        <button
          class="desk__add"
          type="button"
        >
          Добавить столбец
        </button>
      </div>
      <div class="desk__filters">
        <div class="desk__user-filter">
          <ul class="user-filter">
            <li
              v-for="user in users"
              :key="user.id"
              :title="user.name"
              class="user-filter__item"
            >
              <a class="user-filter__button">
                <img
                  :src="user.avatar"
                  alt="Аватар юзера"
                  width="24"
                  height="24"
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="desk__meta-filter">
          <ul class="meta-filter">
            <li
              v-for="({ value, label }) in STATUSES"
              :key="value"
              class="meta-filter__item"
            >
              <a
                class="meta-filter__status"
                :class="`meta-filter__status--${value}`"
                :title="label"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      v-if="columns.length"
      ref="columns"
      class="desk__columns"
    >
      <div
        v-for="column in columns"
        :key="column.id"
        class="column"
      >
        <h2 class="column__name">
          <span>{{ column.title }}</span>
        </h2>

        <div class="column__target-area">
          <div
            v-for="task in columnTasks[column.id]"
            :key="task.id"
            class="column__task"
          >
            <div class="task">
              <div
                v-if="task.user"
                class="task__user"
              >
                <div class="task__avatar">
                  <img
                    :src="task.user.avatar"
                    :alt="task.user.name"
                    width="20"
                    height="20"
                  />
                </div>
                {{ task.user.name }}
              </div>

              <div class="task__statuses">
                <span
                  v-if="task.status"
                  class="task__status"
                  :class="`task__status--${task.status}`"
                />
                <span
                  v-if="task.timeStatus"
                  class="task__status"
                  :class="`task__status--${task.timeStatus}`"
                />
              </div>

              <h5
                class="task__title"
                :class="{ 'task__title--first': !task.user }"
              >
                {{ task.title }}
              </h5>

              <ul
                v-if="task.tags && task.tags.length"
                class="task__tags"
              >
                <li
                  v-for="(tag, index) in task.tags"
                  :key="index"
                >
                  <span class="task__tag">
                    {{ tag }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p
      v-else
      class="desk__emptiness"
    >
      Пока нет ни одной колонки
    </p>
  </section>
</template>

<script>
import columns from '@/static/columns.json';
import tasks from '@/static/tasks.json';
import users from '@/static/users.json';
import { STATUSES } from '@/common/constants';
import {
  getTagsArrayFromString,
  normalizeTask
} from '@/common/helpers';

export default {
  name: 'IndexHome',
  data() {
    return {
      columns,
      tasks: tasks.map(task => normalizeTask(task)),
      users,
      STATUSES
    };
  },
  computed: {
    columnTasks() {
      return this.tasks
        .filter(({ columnId }) => columnId)
        .reduce((accumulator, task) => {
          task.tags = getTagsArrayFromString(task.tags);
          if (accumulator[task.columnId]) {
            accumulator[task.columnId] = [...accumulator[task.columnId], task];
          } else {
            accumulator[task.columnId] = [task];
          }
          return accumulator;
        }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/meta-filter.scss";
@import "~@/assets/scss/blocks/user-filter.scss";
@import "~@/assets/scss/blocks/column.scss";
@import "~@/assets/scss/blocks/task.scss";

.desk {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  width: calc(100% - 400px);
  padding-top: 27px;

  background-color: $white-900;

  &--rubber {
    width: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;

    margin-bottom: 24px;
    padding: 0 17px;
  }

  &__header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
  }

  &__title {
    margin: 0;
    margin-right: auto;

    color: $black-900;

    @include m-s24-h21;
  }

  &__add {
    position: relative;

    margin: 0;
    padding: 0 0 0 35px;

    cursor: pointer;

    color: $blue-gray-600;
    border: none;
    outline: none;
    background-color: transparent;

    &::before {
      width: 24px;
      height: 24px;

      content: "";

      background-image: url("~@/assets/img/icon-add.svg");

      @include p_center-v;
    }

    &:hover {
      color: $blue-600;
    }

    &:active {
      color: $blue-300;
    }
  }

  &__filters {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin-top: 16px;
  }

  &__user-filter {
    margin-right: 40px;
  }

  &__columns {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    flex-grow: 1;

    border-top: 1px solid $blue-gray-200;
  }

  &__emptiness {
    margin: 0;
    padding-left: 17px;

    @include r-s14-h21;
  }
}
</style>

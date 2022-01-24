<template>
  <section class="desk">
    <router-view :tasks="tasks" />
    <div class="desk__header">
      <div class="desk__header-top">
        <h1 class="desk__title">
          Design Coffee Lab
        </h1>
        <button
          class="desk__add"
          type="button"
          @click="addColumn"
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
              :class="{ active: filters.users.some(id => id === user.id) }"
              @click="applyFilters(user.id, 'users')"
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
              :class="{ active: filters.statuses.some(s => s === value) }"
              @click="applyFilters(value, 'statuses')"
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
      <DeskColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :tasks="tasks"
        @update="updateColumn"
        @delete="deleteColumn"
        @updateTasks="$emit('updateTasks', $event)"
      />
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
import users from '@/static/users.json';
import { STATUSES } from '@/common/constants';
import DeskColumn from '@/modules/columns/components/DeskColumn';
import { uniqueId } from 'lodash';

export default {
  name: 'IndexHome',
  components: { DeskColumn },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      columns,
      users,
      STATUSES,
      newColumnTitle: 'Новый столбец'
    };
  },
  methods: {
    addColumn() {
      this.columns = [
        ...this.columns,
        { id: uniqueId('column_'), title: this.newColumnTitle }
      ];
    },
    updateColumn(column) {
      const index = this.columns.findIndex(({ id }) => id === column.id);
      if (~index) {
        this.columns.splice(index, 1, column);
      }
    },
    deleteColumn(id) {
      this.columns = this.columns.filter(column => column.id !== id);
    },
    applyFilters(item, entity) {
      this.$emit('applyFilters', { item, entity });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/user-filter.scss";
@import "~@/assets/scss/blocks/meta-filter.scss";

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

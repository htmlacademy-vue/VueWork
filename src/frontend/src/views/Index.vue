<template>
  <section
    class="desk"
    :class="{'desk--rubber': isUserAuthorized}"
  >
    <router-view />
    <div class="desk__header">
      <div class="desk__header-top">
        <h1 class="desk__title">
          Design Coffee Lab
        </h1>

        <button
          v-if="getUserAttribute('isAdmin')"
          class="desk__add"
          type="button"
          data-test="add-column"
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
              data-test="user-filter"
              @click="filterTasks(user.id, 'users')"
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
              data-test="status-filter"
              @click="filterTasks(value, 'statuses')"
            >
              <a
                class="meta-filter__status"
                :class="`meta-filter__status--${value}`"
                :title="label"
                data-test="status-filter-icon"
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
        data-test="columns"
        @update="put($event)"
        @delete="deleteColumn"
      />
    </div>

    <p
      v-else
      class="desk__emptiness"
      data-test="no-columns-text"
    >
      Пока нет ни одной колонки
    </p>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import { STATUSES } from '@/common/constants';
import DeskColumn from '@/modules/columns/components/DeskColumn';
import { UPDATE_FILTERS } from '@/store/mutations-types';

export default {
  name: 'IndexHome',
  layout: 'AppLayoutMain',
  components: {
    DeskColumn
  },

  data() {
    return {
      newColumnTitle: 'Новый столбец',
      STATUSES
    };
  },

  computed: {
    ...mapState(['users']),
    ...mapState('Auth', ['user']),
    ...mapState('Columns', ['columns']),
    ...mapState('Tasks', ['filters']),
    ...mapGetters('Auth', ['getUserAttribute']),
    isUserAuthorized() {
      return this.user && Object.keys(this.user).length;
    }
  },

  methods: {
    ...mapActions('Columns', ['post', 'put', 'delete']),
    ...mapMutations('Tasks', {
      updateFilters: UPDATE_FILTERS
    }),
    async addColumn() {
      await this.post({ title: this.newColumnTitle });
      // Note: move horizontal scroll to the new column
      this.$refs.columns.scrollLeft = this.$refs.columns.scrollWidth;
    },

    deleteColumn(id) {
      this.delete(id);
    },

    filterTasks(item, entity) {
      const resultValues = [...this.filters[entity]];
      const itemIndex = resultValues.findIndex(el => el === item);
      ~itemIndex
        ? resultValues.splice(itemIndex, 1)
        : resultValues.push(item);
      this.updateFilters({
        [entity]: resultValues
      });
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

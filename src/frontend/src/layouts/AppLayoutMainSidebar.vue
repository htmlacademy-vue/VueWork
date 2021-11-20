<template>
  <AppDrop
    class="backlog"
    :class="{ 'backlog--hide': backlogIsHidden }"
    @drop="$moveTask"
  >
    <button
      class="backlog__title"
      @click="backlogIsHidden = !backlogIsHidden"
    >
      <span>
        Бэклог
      </span>
    </button>
    <div
      v-show="!backlogIsHidden"
      class="backlog__content"
    >
      <div class="backlog__scroll">
        <div class="backlog__collapse">
          <div class="backlog__user">
            <div class="backlog__account">
              <img
                :src="getUserAttribute('avatar')"
                :alt="getUserAttribute('name')"
                width="32"
                height="32"
              />
              {{ getUserAttribute('name') }}
            </div>

            <div class="backlog__counter">
              {{ sidebarTasks.length }}
            </div>
          </div>

          <div class="backlog__target-area">
            <TaskCard
              v-for="task in sidebarTasks"
              :key="task.id"
              :task="task"
              class="backlog__task"
              @drop="$moveTask($event, task)"
              @click="$router.push({ path: `/${task.id}` })"
            />
          </div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { moveTask } from '@/common/mixins';
import AppDrop from '@/common/components/AppDrop';
import TaskCard from '@/modules/tasks/components/TaskCard';

export default {
  name: 'AppLayoutMainSidebar',
  components: {
    AppDrop,
    TaskCard
  },

  mixins: [moveTask],

  data() {
    return {
      backlogIsHidden: false
    };
  },

  computed: {
    ...mapState('Auth', ['user']),
    ...mapState('Tasks', ['tasks']),
    ...mapGetters('Auth', ['getUserAttribute']),
    ...mapGetters('Tasks', ['filteredTasks']),
    sidebarTasks() {
      if (!this.user) {
        return [];
      }
      const { isAdmin, id: userId } = this.user;
      return this.filteredTasks
        .filter(task => !task.columnId && (isAdmin || task.userId === userId))
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
  }
};
</script>

<style lang="scss" scoped>
.backlog {
  $bl: ".backlog";
  $animationSpeed: 0.5s;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  min-width: 400px;
  max-width: 400px;
  padding-top: 16px;
  overflow: hidden;

  background-color: $gray-100;

  &__title {
    position: relative;
    height: 26px;
    margin-bottom: 5px;
    margin-left: 12px;
    padding-left: 28px;

    cursor: pointer;
    text-align: left;

    color: $blue-gray-600;
    border: none;
    background-color: transparent;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;

      width: 24px;
      height: 24px;

      content: "";
      transition: $animationSpeed;
      transform: translateY(-53%) rotate(180deg);

      background-image: url("~@/assets/img/arrow-right.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }

    span {
      @include m-s14-h21;
    }
  }

  &--hide {
    min-width: 40px;
    max-width: 40px;

    #{$bl}__title {
      &::before {
        transform: translateY(-53%);
      }
    }

    #{$bl}__scroll {
      visibility: hidden;
      overflow: hidden;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: $gray-100;
    width: 400px;
  }

  &__scroll {
    overflow-y: auto;
    flex-grow: 1;

    height: 1px;
    padding-bottom: 20px;
  }

  &__collapse {
    padding-bottom: 1px;

    border-bottom: 1px solid $blue-gray-200;
  }

  &__user {
    display: flex;
    align-items: center;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 15px 12px;

    text-align: left;

    border: none;
    outline: none;
    background-color: transparent;

    &:active {
      color: inherit;
    }
  }

  &__account {
    display: flex;
    align-items: center;

    max-width: 80%;
    margin-right: auto;

    @include m-s18-h21;

    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;

      border-radius: 50%;
    }
  }

  &__counter {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    padding-top: 6px;

    text-align: center;

    border-radius: 50%;
    background-color: $blue-gray-100;

    @include m-s18-h21;
  }

  &__arrow {
    width: 10px;
    height: 30px;
    margin: 0 0 0 18px;
    padding: 0;

    cursor: pointer;

    border: none;
    outline: none;
    background-color: transparent;
    background-image: url("~@/assets/img/icon-arrow.svg");
    background-repeat: no-repeat;
    background-position: center;

    &--top {
      transform: rotate(180deg);
    }
  }

  &__task {
    margin-right: 12px;
    margin-bottom: 11px;
    margin-left: 12px;
  }
}
</style>

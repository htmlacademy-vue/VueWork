<template>
  <div class="backlog">
    <button class="backlog__title">
      <span>
        Бэклог
      </span>
    </button>
    <div class="backlog__content">
      <div class="backlog__scroll">
        <div class="backlog__collapse">
          <div class="backlog__user">
            <div class="backlog__account">
              <img
                src="/public/user6.jpg"
                alt="Ваш аватар"
                width="32"
                height="32"
              />
              Игорь Пятин
            </div>

            <div class="backlog__counter">
              {{ sidebarTasks.length }}
            </div>
          </div>

          <div class="backlog__target-area">
            <div
              v-for="task in sidebarTasks"
              :key="task.id"
              class="backlog__task"
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
    </div>
  </div>
</template>

<script>
import tasks from '@/static/tasks.json';
import { normalizeTask, getTagsArrayFromString } from '@/common/helpers';

export default {
  name: 'AppLayoutMainSidebar',
  data() {
    return {
      tasks: tasks.map(task => normalizeTask(task))
    };
  },
  computed: {
    sidebarTasks() {
      return this.tasks
        .filter(task => !task.columnId)
        .map(task => ({
          ...task,
          tags: getTagsArrayFromString(task.tags)
        }));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/task.scss";

.backlog {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex-grow: 1;

  min-width: 400px;
  max-width: 400px;
  padding-top: 16px;

  background-color: $gray-100;

  $bl: ".backlog";

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

    width: 400px;

    background-color: $gray-100;
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

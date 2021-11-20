<template>
  <AppDrop
    data-test="app-drop"
    @drop="$emit('drop', $event)"
  >
    <AppDrag :transfer-data="task">
      <div
        class="task"
        data-test="task-card"
        @click="$emit('click', task.id)"
      >
        <div
          v-if="task.user"
          class="task__user"
        >
          <div class="task__avatar">
            <img
              :src="task.user.avatar"
              alt="Аватар пользователя"
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
            data-test="task-status"
            :class="`task__status--${task.status}`"
          />
          <span
            v-if="task.timeStatus"
            class="task__status"
            data-test="task-time-status"
            :class="`task__status--${task.timeStatus}`"
          />
        </div>
        <h5
          class="task__title"
          :class="{ 'task__title--first': !task.user }"
        >
          {{ task.title }}
        </h5>
        <TaskCardTags
          v-if="task.tags && task.tags.length"
          :tags="task.tags"
          data-test="task-card-tags"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from '@/common/components/AppDrag';
import AppDrop from '@/common/components/AppDrop';
import TaskCardTags from '@/modules/tasks/components/TaskCardTags';

export default {
  name: 'TaskCard',
  components: {
    AppDrag,
    AppDrop,
    TaskCardTags
  },

  props: {
    task: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  flex-wrap: wrap;

  padding: 8px;

  cursor: pointer;

  border-radius: 6px;
  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  $bl: ".task";

  &:hover {
    background-color: $blue-200;
  }

  &:active {
    box-shadow: 0 2px 4px $shadow-500;
  }

  &--backlog {
    box-shadow: none;

    #{$bl}__title {
      order: -2;

      max-width: 290px;
      margin-top: 0;
      margin-right: auto;
    }

    #{$bl}__statuses {
      order: -1;

      margin-left: 20px;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 80%;
    margin-right: auto;

    @include m-s10-h21;
  }

  &__avatar {
    margin-right: 4px;

    img {
      display: block;

      width: 20px;
      height: 20px;
    }
  }

  &__statuses {
    display: flex;
    align-items: center;
    align-self: flex-start;

    height: 16px;
    margin: 3px 0 0 auto;
  }

  &__status {
    width: 8px;
    height: 8px;
    margin-left: 8px;

    border-radius: 50%;

    &:first-child {
      margin-left: 0;
    }

    &--green {
      background-color: $green-600;
    }

    &--orange {
      background-color: $orange-600;
    }

    &--red {
      background-color: $red-600;
    }

    &--time {
      width: 16px;
      height: 16px;

      background-image: url("~@/assets/img/status-time.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--alert {
      width: 16px;
      height: 16px;

      background-image: url("~@/assets/img/status-alert.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &__title {
    width: 100%;
    margin-top: 9px;
    margin-bottom: 0;

    @include r-s14-h21;

    &--first {
      order: -1;

      width: 85%;
      margin-top: 0;
    }
  }
}
</style>

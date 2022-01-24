<template>
  <AppDrop
    class="column"
    @drop="$moveTask"
  >
    <h2 class="column__name">
      <span v-if="!isInputShowed">
        {{ columnTitle }}
      </span>

      <input
        v-else
        ref="title"
        v-model="columnTitle"
        type="text"
        class="column__input"
        name="column_title"
        @blur="updateInput"
      />

      <AppIcon
        v-if="!isInputShowed && isAdmin"
        class="icon--edit"
        @click="showInput"
      />
      <AppIcon
        v-if="!isInputShowed && isAdmin && !columnTasks.length"
        class="icon--trash"
        @click="$emit('delete', column.id)"
      />
    </h2>

    <div class="column__target-area">
      <transition-group name="tasks">
        <TaskCard
          v-for="task in columnTasks"
          :key="task.id"
          :task="task"
          class="column__task"
          @drop="$moveTask($event, task)"
          @click="$router.push({ path: `/${task.id}` })"
        />
      </transition-group>
    </div>
  </AppDrop>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { moveTask } from '@/common/mixins';
import AppDrop from '@/common/components/AppDrop';
import TaskCard from '@/modules/tasks/components/TaskCard';

export default {
  name: 'DeskColumn',
  components: {
    AppDrop,
    TaskCard
  },

  mixins: [moveTask],

  props: {
    column: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      columnTitle: this.column.title,
      isInputShowed: false
    };
  },

  computed: {
    ...mapState('Tasks', ['tasks']),
    ...mapGetters('Tasks', ['filteredTasks']),
    ...mapGetters('Auth', ['getUserAttribute']),
    columnTasks() {
      return this.filteredTasks
        .filter(task => task.columnId === this.column.id)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    },
    isAdmin() {
      return this.getUserAttribute('isAdmin');
    }
  },

  methods: {
    async showInput() {
      this.isInputShowed = true;
      await this.$nextTick();
      this.$refs.title.focus();
    },

    updateInput() {
      this.isInputShowed = false;
      if (this.column.title === this.columnTitle) {
        return;
      }
      this.$emit('update', {
        ...this.column,
        title: this.columnTitle
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;

  padding-top: 15px;

  border-right: 1px solid $blue-gray-200;

  $bl: ".column";

  &__name,
  &__input {
    display: flex;
    align-items: center;

    margin: 0 8px;

    color: $blue-gray-600;

    @include m-s14-h21;

    &:hover {
      #{$bl}__button {
        opacity: 1;
      }
    }
  }

  &__input {
    margin: 0;
    padding: 0;

    border: none;
    border-bottom: 1px solid $blue-gray-200;
    outline: none;
  }

  &__target-area {
    overflow-y: auto;
    flex-grow: 1;

    min-width: 224px;
    max-width: 380px;
    height: 1px;
    padding-right: 8px;
    padding-bottom: 30px;
    padding-left: 8px;

    @media (min-width: 1500px) {
      min-width: 244px;
    }
  }

  &__task {
    display: block;

    margin-top: 16px;
  }

  &__button {
    margin: 0;
    padding: 0;

    transition: opacity $animationSpeed;
    transform: scale(0.8);

    opacity: 0;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &__update {
    margin-right: 5px;
    margin-left: 5px;
  }
}

// Transitions
.tasks-enter-active,
.tasks-leave-active {
  transition: all $animationSpeed ease;
}

.tasks-enter,
.tasks-leave-to {
  transform: scale(1.1);

  opacity: 0;
}
</style>

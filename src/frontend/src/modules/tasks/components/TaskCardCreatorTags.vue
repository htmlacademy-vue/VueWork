<template>
  <div class="task-card__tags">
    <div class="task-card__tags--text">
      Добавьте тэги, разделенные символом #
    </div>
    <transition name="replace">
      <TaskCardCreatorTagsAnalyzer
        v-if="showAnalyzer"
        class="task-card__tags-analyzer"
        :tags="tags"
        @setTags="setTags"
      />
    </transition>
  </div>
</template>

<script>
import TaskCardCreatorTagsAnalyzer
  from '@/modules/tasks/components/TaskCardCreatorTagsAnalyzer';

export default {
  name: 'TaskCardCreatorTags',
  components: { TaskCardCreatorTagsAnalyzer },
  props: {
    tags: {
      type: String,
      required: true
    }
  },
  data: () => ({
    showAnalyzer: true
  }),
  methods: {
    setTags(tags, refresh) {
      if (refresh) {
        this.showAnalyzer = false;
        this.$emit('setTags', tags);
        setTimeout(() => {
          this.showAnalyzer = true;
        }, 100);
      } else {
        this.$emit('setTags', tags);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.task-card__tags {
  &-analyzer {
    box-sizing: border-box;
    padding: 8px;

    color: $blue-gray-600;
    border: 1px solid $gray-100;
    border-radius: 6px;
    outline: none;

    @include r-s14-h21;
  }

  &--text {
    padding: 10px 0;

    color: $blue-gray-600;

    @include r-s10-h12;
  }
}

// Transitions
.replace-enter-active,
.replace-leave-active {
  transition: opacity $animationSpeed;
}

.replace-enter,
.replace-leave-to {
  opacity: 0;
}
</style>

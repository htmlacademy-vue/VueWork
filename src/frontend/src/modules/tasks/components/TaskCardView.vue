<template>
  <div
    v-if="!!task"
    ref="dialog"
    class="task-card"
    tabindex="0"
    @click.self="closeDialog"
    @keydown.esc="closeDialog"
  >
    <section class="task-card__wrapper">
      <button
        class="task-card__close"
        type="button"
        @click="closeDialog"
      />
      <div class="task-card__block">
        <div class="task-card__row">
          <h1 class="task-card__name task-card__name--min">
            {{ task ? task.title : '' }}
          </h1>

          <a
            class="task-card__edit"
            @click="$router.push({
              name: 'TaskEdit',
              params: { id: $route.params.id }
            })"
          >
            Редактировать задачу
          </a>
        </div>
        <p class="task-card__date">
          {{ $taskCardDate }}
        </p>
      </div>

      <div class="task-card__block">
        <ul class="task-card__params">
          <li v-if="task && task.user">
            Участник:
            <div class="task-card__participant">
              <button
                type="button"
                class="task-card__user"
              >
                <img
                  :src="task.user.avatar"
                  :alt="task.user.name"
                />
                {{ task.user.name }}
              </button>
            </div>
          </li>
          <li v-if="dueDate">
            Срок:
            <button
              type="button"
              class="task-card__date-link"
            >
              {{ dueDate }}
            </button>
          </li>
        </ul>
      </div>

      <div class="task-card__block">
        <div
          v-if="task && task.description"
          class="task-card__description"
        >
          <h4 class="task-card__title">
            Описание
          </h4>
          <p>{{ task.description }}</p>
        </div>
      </div>

      <div
        v-if="task && task.url && task.urlDescription"
        class="task-card__block task-card__links"
      >
        <h4 class="task-card__title">
          Ссылки
        </h4>

        <div class="task-card__links-item">
          <a
            :href="task.url"
            target="_blank"
          >
            {{ task.urlDescription || 'ссылка' }}
          </a>
        </div>
      </div>

      <div
        v-if="task && task.ticks && task.ticks.length"
        class="task-card__block"
      >
        <TaskCardViewTicksList
          :ticks="task.ticks"
          disabled
          @updateTick="put"
        />
      </div>

      <div
        v-if="task && task.tags && task.tags.length"
        class="task-card__block"
      >
        <h4 class="task-card__title">
          Метки
        </h4>
        <TaskCardTags
          :tags="task.tags"
        />
      </div>

      <TaskCardViewComments
        v-if="task && (user || task.comments)"
        class="task-card__comments"
        :comments="task.comments || []"
        :task-id="task.id"
        @new-comment="addCommentToList"
      />
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { getReadableDate, getTimeAgo } from '@/common/helpers';
import { taskCardName } from '@/common/mixins';
import TaskCardViewTicksList
from '@/modules/tasks/components/TaskCardViewTicksList';
import TaskCardTags from '@/modules/tasks/components/TaskCardTags';
import TaskCardViewComments
from '@/modules/tasks/components/TaskCardViewComments';

export default {
  name: 'TaskCardView',
  components: {
    TaskCardViewTicksList,
    TaskCardTags,
    TaskCardViewComments
  },
  mixins: [taskCardName],
  data: () => ({
    task: null
  }),
  computed: {
    ...mapState('Tasks', ['tasks']),
    ...mapState('Auth', ['user']),
    ...mapGetters('Tasks', ['getTaskById']),
    dueDate() {
      if (!this.task) {
        return false;
      }
      const { dueDate } = this.task;
      return dueDate ? getReadableDate(dueDate) : false;
    },
    timeAgo() {
      return getTimeAgo(this.task?.dueDate);
    }
  },
  created() {
    const id = this.$route.params.id;
    const task = this.tasks.find(task => +task.id === +id);
    if (task) {
      this.task = task;
    } else {
      this.$router.push('/').catch(() => {});
    }
  },
  mounted() {
    this.$refs.dialog?.focus();
  },
  methods: {
    ...mapActions('Ticks', ['put']),
    addCommentToList(comment) {
      this.task.comments
        ? this.task.comments.push(comment)
        : this.$set(this.task, 'comments', [comment]);
    },
    closeDialog() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/task-card.scss";
</style>

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
        data-test="close-btn"
        @click="closeDialog"
      />
      <div class="task-card__block">
        <div class="task-card__row">
          <h1
            class="task-card__name"
            :class="{ 'task-card__name--min' : isAdmin }"
            data-test="task-name"
          >
            {{ task ? task.title : '' }}
          </h1>

          <a
            v-if="isAdmin"
            class="task-card__edit"
            data-test="edit-btn"
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
          <li
            v-if="task && task.user"
            data-test="task-user"
          >
            Участник:
            <div class="task-card__participant">
              <button
                type="button"
                class="task-card__user"
              >
                <img
                  :src="task.user.avatar"
                  alt="Вика Некрасова"
                />
                {{ task.user.name }}
              </button>
            </div>
          </li>
          <li
            v-if="dueDate"
            data-test="task-date"
          >
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
          data-test="task-description"
        >
          <h4 class="task-card__title">
            Описание
          </h4>
          <p>{{ task.description }}</p>
        </div>
      </div>

      <div
        v-if="task && task.url"
        class="task-card__block task-card__links"
        data-test="task-url"
      >
        <h4 class="task-card__title">
          Ссылки
        </h4>

        <div class="task-card__links-item">
          <a
            :href="task.url"
            target="_blank"
          >
            {{ task.urlDescription || task.url }}
          </a>
        </div>
      </div>

      <div
        v-if="showTicks"
        class="task-card__block"
        data-test="task-ticks-block"
      >
        <TaskCardViewTicksList
          :ticks="task.ticks"
          disabled
          data-test="task-ticks"
          @updateTick="put"
        />
      </div>

      <div
        v-if="showTags"
        class="task-card__block"
      >
        <h4 class="task-card__title">
          Метки
        </h4>
        <TaskCardTags
          :tags="task.tags"
          data-test="task-tags"
        />
      </div>

      <TaskCardViewComments
        v-if="task && (user || task.comments)"
        class="task-card__comments"
        :comments="task.comments || []"
        :task-id="task.id"
        data-test="task-comments"
        @new-comment="addCommentToList"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { getReadableDate, getTimeAgo } from '@/common/helpers';
import { taskCardName } from '@/common/mixins';
import { TASK_DETAILS_CONFIG } from '@/common/queryConfig';
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
    ...mapGetters('Tasks', ['getTaskById']),
    ...mapGetters('Auth', ['getUserAttribute']),
    ...mapState('Auth', ['user']),
    dueDate() {
      if (!this.task) {
        return false;
      }
      const { dueDate } = this.task;
      return dueDate ? getReadableDate(dueDate) : false;
    },
    timeAgo() {
      return getTimeAgo(this.task?.dueDate);
    },
    isAdmin() {
      return this.getUserAttribute('isAdmin');
    },
    isTaskOwner() {
      if (!this.user) {
        return false;
      }
      const { isAdmin, id: userId } = this.user;
      return isAdmin || userId === this.task.userId;
    },
    showTicks() {
      return this.task && this.task.ticks
          && this.task.ticks.length && this.isTaskOwner;
    },
    showTags() {
      return this.task && this.task.tags && this.task.tags.length;
    }
  },
  watch: {
    task: {
      async handler(task) {
        if (task) {
          await this.$nextTick();
          this.$refs.dialog?.focus();
        }
      }
    }
  },
  async created() {
    try {
      const id = this.$route.params.id;
      this.task = await this.$api.tasks.get(id, TASK_DETAILS_CONFIG);
    } catch {
      this.$router.push('/').catch(() => {});
    }
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

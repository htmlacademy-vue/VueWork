<template>
  <div class="task-card__comments">
    <h2 class="task-card__title">
      Комментарии
    </h2>
    <div class="comments">
      <ul class="comments__list">
        <li
          v-for="comment in comments"
          :key="comment.id"
          class="comments__item"
        >
          <div class="comments__user">
            <img
              :src="comment.user.avatar"
              :alt="comment.user.name"
              width="30"
              height="30"
            />
            {{ comment.user.name }}
          </div>
          <p>{{ comment.text }}</p>
        </li>
      </ul>

      <form
        v-if="user"
        action="#"
        class="comments__form"
        method="post"
      >
        <AppTextarea
          v-model="newComment"
          name="comment_text"
          placeholder="Введите текст комментария"
          :error-text="validations.newComment.error"
        />
        <button
          type="submit"
          @click.prevent="submit"
        >
          Написать комментарий
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { validator } from '@/common/mixins';

export default {
  name: 'TaskCardViewComments',
  mixins: [validator],
  props: {
    taskId: {
      type: Number,
      required: true
    },
    comments: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    newComment: '',
    validations: {
      newComment: {
        error: '',
        rules: ['isNotEmpty']
      }
    }
  }),
  computed: {
    ...mapState('Auth', ['user'])
  },
  watch: {
    newComment() {
      this.$clearValidationErrors();
    }
  },
  methods: {
    async submit() {
      if (!this.$validateFields(
        { newComment: this.newComment }, this.validations)
      ) {
        return;
      }
      const { id, name, avatar } = this.user;
      const comment = await this.$api.comments.post({
        text: this.newComment,
        taskId: this.taskId,
        userId: id
      });
      this.newComment = '';
      this.$emit('new-comment', {
        ...comment,
        user: { id, name, avatar }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.comments {
  &__list {
    @include clear-list;
  }

  &__item {
    margin-top: 24px;

    p {
      @include r-s14-h21;
    }

    strong {
      color: $blue-600;

      @include r-s14-h21;
    }
  }

  &__user {
    display: flex;
    align-items: center;

    width: 100%;
    margin: 0;
    padding: 0;

    text-align: left;

    background-color: transparent;

    @include r-s14-h16;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;

      border-radius: 50%;
    }

    span {
      display: block;

      box-sizing: border-box;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      padding-top: 5px;

      text-align: center;

      color: $white-900;
      border-radius: 50%;
      background-color: $green-700;

      @include m-s14-h21;
    }
  }

  &__form {
    margin-top: 24px;

    button {
      display: block;

      margin: 0;
      margin-top: 15px;
      margin-left: auto;
      padding: 0;

      cursor: pointer;
      transition: opacity $animationSpeed;

      opacity: 0.5;
      color: $blue-gray-600;
      border: none;
      outline: none;
      background-color: transparent;

      @include m-s14-h21;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>

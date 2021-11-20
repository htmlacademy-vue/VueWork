<template>
  <li>
    Участник:
    <div class="task-card__participant">
      <button
        v-if="!currentWorker"
        type="button"
        class="task-card__link"
        data-test="add-user-button"
        @click.stop="isMenuOpened = !isMenuOpened"
      >
        добавить пользователя
      </button>
      <button
        v-else
        data-test="selected-user-button"
        class="users-list__user"
      >
        <img
          :src="currentWorker.avatar"
          @click.stop="isMenuOpened = !isMenuOpened"
        />
        <span @click.stop="isMenuOpened = !isMenuOpened">
          {{ currentWorker.name }}
        </span>
        <AppIcon
          class="icon--trash users-list__icon"
          data-test="app-icon"
          @click="$emit('select', null)"
        />
      </button>
      <div class="task-card__users">
        <ul
          v-if="isMenuOpened"
          v-click-outside="hideUserMenu"
          data-test="users-list"
          class="users-list"
        >
          <li
            v-for="user in users"
            :key="user.id"
            data-test="user"
          >
            <button
              class="users-list__user"
              @click="setUser(user.id)"
            >
              <img :src="user.avatar" />
              <span>{{ user.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskCardCreatorUserSelector',
  model: {
    prop: 'currentWorkerId',
    event: 'select'
  },
  props: {
    currentWorkerId: {
      type: [String],
      default: null
    }
  },
  data() {
    return {
      isMenuOpened: false
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    currentWorker() {
      return this.users.find(({ id }) => id === this.currentWorkerId);
    }
  },
  methods: {
    setUser(id) {
      this.$emit('select', id);
      this.hideUserMenu();
    },
    hideUserMenu() {
      this.isMenuOpened = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.task-card {
  &__participant {
    display: inline-block;

    margin-left: 10px;

    vertical-align: baseline;
  }

  &__users {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;

    display: block;

    box-sizing: border-box;
    width: 210px;

    border-radius: 6px;
    background-color: $white-900;
    box-shadow: 0 4px 8px $shadow-500;
  }
}

.users-list {
  margin: 0;
  padding: 8px;

  list-style-type: none;

  li {
    margin-bottom: 10px;
  }

  &__user {
    position: relative;

    display: flex;
    align-items: center;

    width: 100%;
    margin: 0;
    padding: 0 23px 0 0;

    cursor: pointer;
    text-align: left;

    border: 0;
    outline: 0;
    background-color: transparent;

    font-family: inherit;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 16px;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;

      border-radius: 50%;
    }

    &:hover {
      text-decoration: none;

      .users-list__icon {
        opacity: 1;
      }
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 0;

    transition: opacity $animationSpeed;
    transform: translateY(-50%);

    opacity: 0;
  }
}

</style>

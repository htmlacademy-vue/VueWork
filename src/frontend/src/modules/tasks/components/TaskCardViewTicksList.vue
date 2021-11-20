<template>
  <div class="task-card__check-list">
    <h4 class="task-card__title">
      Чеклист
      <button
        v-if="!disabled"
        type="button"
        class="task-card__plus"
        data-test="create-tick"
        @click="$emit('createTick')"
      />
    </h4>
    <ul
      v-if="ticks.length"
      class="task-card__list"
    >
      <li
        v-for="tick in ticks"
        :key="tick.id || tick.uuid"
        class="task-card__item"
        data-test="tick"
      >
        <div class="task-card__checkbox">
          <label class="checkbox">
            <div class="checkbox__icon">
              <input
                type="checkbox"
                name="remember"
                :checked="tick.done"
                @click="updateTick(tick, 'done', !tick.done)"
              />
              <span />
            </div>
            <div class="checkbox__label">
              <input
                v-if="!disabled"
                type="text"
                name="checkbox_name"
                :value="tick.text"
                max="64"
                placeholder="Введите текст пункта"
                data-test="tick-text-input"
                @change="updateTick(tick, 'text', $event.target.value)"
              />
              <span
                v-else
                data-test="tick-text"
              >
                {{ tick.text }}
              </span>
            </div>
          </label>
        </div>

        <div
          class="task-card__icons"
          :class="{'task-card__icons--hidden': disabled}"
          data-test="icons-block"
        >
          <AppIcon
            class="icon--trash"
            data-test="delete-icon"
            @click="$emit('removeTick', { uuid: tick.uuid })"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskCardViewTicksList',
  props: {
    ticks: {
      type: [Array],
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateTick(tick, property, value) {
      const tickCopy = Object.assign({}, tick);
      tickCopy[property] = value;
      this.$emit('updateTick', tickCopy);
    }
  }
};
</script>

<style lang="scss" scoped>
.task-card {
  &__checkbox {
    flex-grow: 1;

    margin-left: -7px;
  }

  &__list {
    @include clear-list;

    margin-top: 15px;
  }

  &__icons--hidden {
    display: none;
  }

  &__plus {
    display: inline-block;

    width: 14px;
    height: 14px;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: opacity $animationSpeed;
    vertical-align: middle;

    opacity: .8;
    border: none;
    border-radius: 50%;
    outline: none;
    background-color: transparent;
    background-image: url("~@/assets/img/icon-plus.svg");
    background-size: cover;

    &:hover {
      opacity: 1;
    }

    &--circle {
      width: 30px;
      height: 30px;
      margin-top: 10px;

      background-image: url("~@/assets/img/icon-add.svg");
    }
  }
}
</style>

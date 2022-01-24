<template>
  <button
    class="button"
    :type="type"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  display: block;

  box-sizing: border-box;
  width: 196px;
  margin: 0;
  padding: 17px 0;

  cursor: pointer;
  transition: $animationSpeed;
  text-align: center;
  text-transform: uppercase;

  color: $white-900;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 4px 8px $shadow-500;

  @include m-s14-h21;

  &--primary {
    background-color: $blue-600;

    &:hover:not(:active) {
      background-color: $blue-500;
      box-shadow: 0px 8px 16px $shadow-600;
    }

    &:active {
      background-color: $blue-700;
      box-shadow: 0px 4px 8px $shadow-500;
    }
  }

  &--error {
    background-color: $red-600;

    &:hover:not(:active) {
      background-color: $red-500;
      box-shadow: 0px 8px 16px $shadow-600;
    }

    &:active {
      background-color: $red-700;
      box-shadow: 0px 4px 8px $shadow-500;
    }
  }

  &--border {
    color: $blue-gray-600;
    border: 1px solid $blue-gray-600;
    background-color: $white-900;

    &:hover:not(:active) {
      background-color: $white-900;
    }

    &:active {
      background-color: $white-700;
    }
  }

  &--disabled {
    pointer-events: none;

    opacity: 0.5;
  }
}
</style>

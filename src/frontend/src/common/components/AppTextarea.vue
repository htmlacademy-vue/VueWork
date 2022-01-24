<template>
  <div class="text-field">
    <textarea
      :value="value"
      :type="type"
      :name="name"
      class="text-field__input"
      :class="{'text-field__input--error': showError}"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <span
      v-if="showError"
      class="text-field__text"
    >
      {{ errorText }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    errorText: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showError() {
      return !this.value && !!this.errorText;
    }
  }
};
</script>

<style lang="scss" scoped>
.text-field {
  position: relative;

  &__input {
    display: block;

    box-sizing: border-box;
    width: 100%;
    height: 90px;
    margin-top: 16px;
    padding: 16px;

    resize: none;
    transition: border-color $animationSpeed;

    color: $blue-gray-600;
    border: 1px solid $gray-100;
    border-radius: 6px;
    outline: none;

    @include r-s14-h21;

    &:focus {
      border-color: $blue-600;
    }

    &--error {
      border-color: $red-600;
    }
  }

  &__text {
    position: absolute;
    bottom: -12px;
    left: 0;

    color: $red-600;

    @include r-s10-h12;
  }
}
</style>

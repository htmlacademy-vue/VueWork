<template>
  <div class="text-field">
    <input
      ref="input"
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
      return !!this.errorText;
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
    margin: 0;
    padding: 12px 16px;

    color: $gray-900;
    border: 1px solid $white-800;
    border-radius: 6px;

    &--error {
      border-color: $red-600;
    }

    &:focus {
      border-color: $blue-600;
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

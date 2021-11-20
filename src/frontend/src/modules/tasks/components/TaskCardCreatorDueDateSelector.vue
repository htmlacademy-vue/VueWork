<template>
  <li>
    Срок:
    <div class="task-card__datepicker">
      <Datepicker
        :value="dueDate"
        format="dd.MM.yyyy"
        :disabled-dates="disabledDates"
        @input="$emit('input', $event)"
      />
    </div>
  </li>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'TaskCardCreatorDueDateSelector',
  components: { Datepicker },
  model: {
    prop: 'dueDate',
    event: 'input'
  },
  props: {
    dueDate: {
      type: [Date, String],
      default: null
    }
  },
  computed: {
    disabledDates() {
      return {
        to: new Date()
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.task-card {
  &__datepicker {
    margin-left: 5px;

    &::v-deep input {
      margin: 0;
      padding: 0;

      text-decoration: none;

      color: $gray-900;
      border: none;
      outline: 0;
      cursor: pointer;

      @include r-s16-h21;
    }
  }
}
</style>

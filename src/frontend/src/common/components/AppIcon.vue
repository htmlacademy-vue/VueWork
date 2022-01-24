<template>
  <button
    class="column__button column__update icon"
    type="button"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'AppIcon'
};
</script>

<style lang="scss" scoped>
.icon {
  display: block;

  margin: 0;
  padding: 0;

  cursor: pointer;

  border: none;
  background-color: transparent;

  &--edit {
    width: 14px;
    height: 14px;

    background-image: url("~@/assets/img/icon-pencil.svg");
    background-size: cover;
  }

  &--trash {
    width: 14px;
    height: 18px;

    background-image: url("~@/assets/img/icon-trash.svg");
    background-size: cover;
  }
}
</style>

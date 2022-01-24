<template>
  <div class="modal">
    <div class="modal__box">
      <div class="modal__header">
        <div class="modal__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="VueWork logo"
            width="135"
            height="21"
          />
        </div>
      </div>
      <div class="modal__content">
        <slot />
      </div>
      <div class="modal__action">
        <AppButton class="button--primary">
          Close
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueModal'
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  display: flex;
  overflow-x: auto;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;

  &__box {
    position: relative;

    width: 500px;

    background-color: $white-900;
    box-shadow: 0 4px 8px $shadow-500;
  }

  &__header {
    padding: 20px;
  }

  &__content {
    padding: 40px;
  }

  &__action {
    display: flex;
    justify-content: flex-end;

    padding: 40px;
  }
}
</style>

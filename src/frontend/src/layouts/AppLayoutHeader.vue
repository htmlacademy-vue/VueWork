<template>
  <header class="header">
    <div class="header__logo">
      <a class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="VueWork logo"
          width="147"
          height="23"
        />
      </a>
    </div>
    <div>
      <form
        action="#"
        class="header__search"
      >
        <input
          type="search"
          name="search"
          required
          placeholder="Поиск"
        />
        <button type="submit">
          Найти
        </button>
      </form>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppLayoutHeader'
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: $header-height;
  padding: 15px 12px;

  background-color: $blue-600;
  box-shadow: 0 2px 4px $shadow-900;

  &__logo {
    margin-right: auto;
  }

  &__items {
    display: flex;
    align-items: center;
  }

  &__search {
    position: relative;

    input {
      margin: 0;
      padding: 11px 11px 11px 40px;

      color: $white-900;
      border: 1px solid $white-800;
      border-radius: 6px;
      background-color: transparent;

      @include m-s14-h21;
    }

    button {
      position: absolute;
      top: 50%;
      left: 11px;

      overflow: hidden;

      width: 17px;
      height: 17px;
      padding: 0;

      transform: translateY(-50%);

      color: transparent;
      border: none;
      outline: none;
      background-color: transparent;
      background-image: url("~@/assets/img/icon-search.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &__create-task {
    margin-right: 18px;
    padding: 13px 14px 11px;

    text-transform: uppercase;

    color: $black-700;
    border-radius: 6px;
    background: $white-800;
    box-shadow: 0 4px 8px $shadow-500;

    @include m-s14-h21;

    &:hover {
      background-color: $yellow-300;
    }

    &:active {
      background-color: $white-900;
    }
  }

  &__login {
    position: relative;

    padding: 10px;
    padding-left: 37px;

    cursor: pointer;

    color: $white-900;
    border-radius: 6px;

    @include m-s14-h21;

    &::before {
      position: absolute;
      top: 8px;
      left: 12px;

      width: 16px;
      height: 21px;

      content: "";

      background-image: url("~@/assets/img/login.svg");
    }

    &:hover {
      background-color: $blue-800;
    }

    &:active {
      box-shadow: 0 0 3px 1px $gray-100;
    }
  }

  &__user {
    cursor: pointer;

    img {
      display: block;

      width: 40px;
      height: 40px;

      border-radius: 50%;
    }
  }

  &__menu {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
  }
}
</style>

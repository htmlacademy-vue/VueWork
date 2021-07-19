<template>
  <div id="app">
    <div class="main">
      <img
        src="~@/assets/img/logo.svg"
        width="300"
        height="47"
        alt="VueWork"
      />
      <h1>Добро пожаловать!</h1>
      <p>
        Это проект Vuework для обучения на профессиональном онлайн‑курсе<br />
        <b>«Vue.js для опытных разработчиков».</b>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import "assets/scss/app";

#app {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $blue-600;
  top: 0;
  left: 0;
}

.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $white-900;

  img {
    display: block;
    margin: 0 auto;
  }

  h1 {
    @include m-s36-h21;
    text-align: center;
    margin-bottom: 0;
  }

  p {
    font-size: 20px;
    line-height: 30px;
    text-align: center;
  }

  b {
    font-size: 1.2em;
  }
}
</style>

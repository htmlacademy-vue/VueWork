import Vue from 'vue';

Vue.directive('click-outside', {
  bind(el, binding, vNode) {
    el.clickOutsideEvent = function (event) {
      if (el !== event.target && !el.contains(event.target)) {
        vNode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
});

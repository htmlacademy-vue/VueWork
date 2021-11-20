import notificationTypes from '@/common/enums/notificationTypes';

// eslint-disable-next-line max-len
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields

export default class Notifier {
  #store;
  constructor(store) {
    this.#store = store;
  }

  info(text) {
    this.#store.dispatch('createNotification', {
      text,
      type: notificationTypes.INFO
    });
  }

  success(text) {
    this.#store.dispatch('createNotification', {
      text,
      type: notificationTypes.SUCCESS
    });
  }

  error(text) {
    this.#store.dispatch('createNotification', {
      text,
      type: notificationTypes.ERROR
    });
  }

  warning(text) {
    this.#store.dispatch('createNotification', {
      text,
      type: notificationTypes.WARNING
    });
  }
}

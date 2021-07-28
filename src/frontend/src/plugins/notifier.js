import notificationTypes from '@/common/enums/notificationTypes';

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
    console.log(text);
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

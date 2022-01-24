import {
  MINUTE_IN_SEC,
  HOUR_IN_SEC,
  DAY_IN_SEC,
  MONTH_IN_SEC,
  YEAR_IN_SEC,
  TAG_SEPARATOR
} from '@/common/constants';
import resources from '@/common/enums/resources';
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
  TaskApiService
} from '@/services/api.service';
import { SET_ENTITY } from '@/store/mutations-types';
import users from '@/static/users';

export const capitalize = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const setAuth = store => {
  store.$api.auth.setAuthHeader();
  store.dispatch('Auth/getMe');
};

export const getTagsArrayFromString = tags => {
  const array = tags.split(TAG_SEPARATOR);
  return array.slice(1, array.length);
};

export const getReadableDate = date => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = newDate.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${day}.${month}.${year}`;
};

export const getTimeAgo = date => {
  if (!date) {
    return '... время не указано ...';
  }
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / YEAR_IN_SEC;
  function getString(number, pronounce) {
    return `${number} ${pronounce} назад`;
  }
  function getPronounce(number, single, pluralTwoFour, pluralFive) {
    return number === 1
      ? single
      : number > 1 && number < 5
        ? pluralTwoFour
        : pluralFive;
  }
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'год', 'года', 'лет');
    return getString(number, pronounce);
  }
  interval = seconds / MONTH_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'месяц', 'месяца', 'месяцев');
    return getString(number, pronounce);
  }
  interval = seconds / DAY_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'день', 'дня', 'дней');
    return getString(number, pronounce);
  }
  interval = seconds / HOUR_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'час', 'часа', 'часов');
    return getString(number, pronounce);
  }
  interval = seconds / MINUTE_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'минуту', 'минуты', 'минут');
    return getString(number, pronounce);
  }
  return 'сейчас';
};

export const createUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const createNewDate = () => {
  return new Date(new Date().setHours(23,59,59,999));
};

export const createResources = notifier => {
  return {
    [resources.USERS]:
      new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.TASKS]: new TaskApiService(notifier),
    [resources.COLUMNS]:
      new CrudApiService(resources.COLUMNS, notifier),
    [resources.TICKS]: new CrudApiService(resources.TICKS, notifier),
    [resources.COMMENTS]:
      new CrudApiService(resources.COMMENTS, notifier)
  };
};

export const authenticateUser = store => {
  store.commit(SET_ENTITY, {
    module: 'Auth',
    entity: 'user',
    value: users[0]
  }, { root: true });
  store.commit(SET_ENTITY, {
    module: 'Auth',
    entity: 'isAuthenticated',
    value: true
  }, { root: true });
};

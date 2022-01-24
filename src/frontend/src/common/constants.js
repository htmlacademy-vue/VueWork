export const STATUSES = [
  {
    label: 'Важно, не срочно',
    value: 'green'
  },
  {
    label: 'Срочно, не важно',
    value: 'orange'
  },
  {
    label: 'Срочно, важно',
    value: 'red'
  },
  {
    label: 'Дедлайн',
    value: 'time'
  },
  {
    label: 'Просрочено',
    value: 'alert'
  }
];

export const SEC = 1000;
export const MINUTE_IN_SEC = 60;
export const HOUR_IN_SEC = MINUTE_IN_SEC * 60;
export const DAY_IN_SEC = HOUR_IN_SEC * 24;
export const MONTH_IN_SEC = DAY_IN_SEC * 30;
export const YEAR_IN_SEC = DAY_IN_SEC * 365;
export const DAY_IN_MILLISEC = DAY_IN_SEC * SEC;

export const MESSAGE_LIVE_TIME = 3 * SEC;

export const MOVE = 'move';
export const TAG_SEPARATOR = '#';
export const DATA_TRANSFER_PAYLOAD = 'payload';

/* eslint-disable */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
/* eslint-enable */

export const KEY_CODE_ENTER = 13;

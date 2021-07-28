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
export const DAY_IN_MILLISEC = DAY_IN_SEC * SEC;

export const TAG_SEPARATOR = '#';

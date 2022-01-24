import JwtService from '@/services/jwt.service';
import taskStatuses from '@/common/enums/taskStatuses';
import timeStatuses from '@/common/enums/timeStatuses';
import { DAY_IN_MILLISEC } from '@/common/constants';
import axios from '@/plugins/axios';

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : '';
  }

  async login(params) {
    const { data } = await axios.post('login', params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete('logout');
    return data;
  }

  async getMe() {
    const { data } = await axios.get('whoAmI');
    return data;
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(
      `${this.#resource}/${entity.id}`,
      entity
    );
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class TaskApiService extends CrudApiService {
  constructor(notifier) {
    super('tasks', notifier);
  }

  static getTimeStatus(dueDate) {
    if (!dueDate) {
      return '';
    }
    const currentTime = +new Date();
    const taskTime = Date.parse(dueDate);
    const timeDelta = taskTime - currentTime;
    if (timeDelta > DAY_IN_MILLISEC) {
      return '';
    }
    return timeDelta < 0 ? timeStatuses.DEADLINE : timeStatuses.EXPIRED;
  }

  _normalize(task) {
    return {
      ...task,
      ticks: task.ticks || [],
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      status: task.statusId ? taskStatuses[task.statusId] : '',
      timeStatus: TaskApiService.getTimeStatus(task.dueDate)
    };
  }

  _createRequest(task) {
    const { ticks, comments, status, timeStatus, user, ...request } = task;
    return request;
  }

  async query(config = {}) {
    const tasks = await super.query(config);
    return tasks.map(task => this._normalize(task));
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`tasks/${id}`, config);
    return this._normalize(data);
  }

  async post(task) {
    const { data: newTask } =
      await axios.post('tasks', this._createRequest(task));
    return this._normalize(newTask);
  }
  async put(task) {
    await axios.put(`tasks/${task.id}`, this._createRequest(task));
    return this._normalize(task);
  }
}

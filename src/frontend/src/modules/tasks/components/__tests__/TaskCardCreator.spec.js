import { mount, createLocalVue } from '@vue/test-utils';
import TaskCardCreator from '@/modules/tasks/components/TaskCardCreator';
import TaskCardViewTicksList
  from '@/modules/tasks/components/TaskCardViewTicksList';
import AppButton from '@/common/components/AppButton';
import AppIcon from '@/common/components/AppIcon';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';
import tasks from '@/static/tasks.json';
import users from '@/static/users.json';

const localVue = createLocalVue();
localVue.component('AppButton', AppButton);
localVue.component('AppIcon', AppIcon);
localVue.use(Vuex);

const taskToEdit = {
  ...tasks[1],
  user: users[0],
  status: 'green',
  timeStatus: 'alert'
};

const mocks = {
  $router: {
    push: jest.fn()
  },
  $route: {
    params: { id: 1 }
  }
};

describe('TaskCardCreator', () => {

  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(TaskCardCreator, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('closes dialog on click', async () => {
    createComponent({ localVue, store, mocks });
    const dialog = wrapper.find('[data-test="dialog"]');
    await dialog.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalled();
  });

  it ('closes dialog on esc', async () => {
    createComponent({ localVue, store, mocks });
    const dialog = wrapper.find('[data-test="dialog"]');
    await dialog.trigger('keydown.esc');
    expect(mocks.$router.push).toHaveBeenCalled();
  });

  it ('closes dialog on click to close button', async () => {
    createComponent({ localVue, store, mocks });
    const button = wrapper.find('[data-test="close-button"]');
    await button.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalled();
  });

  it ('delete task', async () => {
    const propsData = {
      taskToEdit
    };
    createComponent({ localVue, store, mocks, propsData });
    const spyOnRemoveTask = jest.spyOn(wrapper.vm, 'taskDelete');
    const button = wrapper.find('[data-test="remove-task-button"]');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe('Удалить Задачу');
    await button.trigger('click');
    expect(spyOnRemoveTask).toHaveBeenCalled();
  });

  it('renders status list', () => {
    createComponent({ localVue, store, mocks });
    const list = wrapper.findAll('[data-test="status-list"]');
    expect(list.exists()).toBeTruthy();
    expect(list.length).toBe(3);
  });

  it('set status', async () => {
    createComponent({ localVue, store, mocks });
    const spyOnSetStatus = jest.spyOn(wrapper.vm, 'setStatus');
    const listItem = wrapper.find('[data-test="status-list"]');
    await listItem.trigger('click');
    expect(spyOnSetStatus).toHaveBeenCalledWith('green');
  });

  it('renders task date', () => {
    const propsData = {
      taskToEdit
    };
    createComponent({ localVue, store, mocks, propsData });
    const dateField = wrapper.find('[data-test="task-date"]');
    expect(dateField.text()).toBe('# 2 создана ... время не указано ...');
  });

  it('render url error test', async () => {
    createComponent({ localVue, store, mocks });
    const errorTest = 'url error';
    await wrapper.setData({ validations: {
      title: {
        error: '',
        rules: ['required']
      },
      url: {
        error: errorTest,
        rules: ['url']
      }
    }
    });
    const errorField = wrapper.find('[data-test="url-error"]');
    expect(errorField.text()).toBe(errorTest);
  });

  it('renders TaskCardViewTicksList', async () => {
    createComponent({ localVue, store, mocks });
    const ticksList = wrapper.findComponent(TaskCardViewTicksList);
    ticksList.vm.$emit('createTick');
    ticksList.vm.$emit('updateTick', { id: 1 });
    ticksList.vm.$emit('removeTick', { id: 1 });
    expect(ticksList.emitted().createTick).toBeTruthy();
    expect(ticksList.emitted().updateTick).toBeTruthy();
    expect(ticksList.emitted().removeTick).toBeTruthy();
  });

  it ('closes dialog on cancel click', async () => {
    createComponent({ localVue, store, mocks });
    const dialog = wrapper.find('[data-test="cancel-button"]');
    await dialog.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalled();
  });

  it ('submit new task', async () => {
    createComponent({ localVue, store, mocks });
    const dialog = wrapper.find('[data-test="submit-button"]');
    const spyValidateFields = jest.spyOn(wrapper.vm, '$validateFields');
    await dialog.trigger('click');
    expect(spyValidateFields).toHaveBeenCalled();
  });
});

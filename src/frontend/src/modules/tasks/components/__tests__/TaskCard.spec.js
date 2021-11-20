import { mount } from '@vue/test-utils';
import TaskCard from '@/modules/tasks/components/TaskCard';
import { generateMockStore } from '@/store/mocks';
import tasks from '@/static/tasks.json';
import users from '@/static/users.json';

const task = {
  ...tasks[1],
  user: users[0],
  status: 'green',
  timeStatus: 'alert'
};

const propsData = {
  task
};

describe('TaskCard', () => {
  let wrapper;
  let store;

  const createComponent = options => {
    wrapper = mount(TaskCard, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('component rendered', () => {
    createComponent({ store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('emits drop event', async () => {
    createComponent({ store, propsData });
    const appDropElement = wrapper.find('[data-test="app-drop"]');
    await appDropElement.vm.$emit('drop', '');
    expect(wrapper.emitted().drop).toBeTruthy();
  });

  it('emits click event', async () => {
    createComponent({ store, propsData });
    const taskCard = wrapper.find('[data-test="task-card"]');
    await taskCard.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('shows task status', () => {
    createComponent({ store, propsData });
    const status = wrapper.find('[data-test="task-status"]');
    expect(status.exists()).toBeTruthy();
    expect(status.attributes('class')).toContain('task__status--green');
  });

  it('does not show task status', () => {
    const propsData = {
      task: {
        ...task,
        status: ''
      }
    };
    createComponent({ store, propsData });
    const status = wrapper.find('[data-test="task-status"]');
    expect(status.exists()).toBeFalsy();
  });

  it('shows task time status', () => {
    createComponent({ store, propsData });
    const status = wrapper.find('[data-test="task-time-status"]');
    expect(status.exists()).toBeTruthy();
    expect(status.attributes('class')).toContain('task__status--alert');
  });

  it('does not show task time status', () => {
    const propsData = {
      task: {
        ...task,
        timeStatus: ''
      }
    };
    createComponent({ store, propsData });
    const status = wrapper.find('[data-test="task-time-status"]');
    expect(status.exists()).toBeFalsy();
  });

  it('renders TaskCardTags component', () => {
    createComponent({ store, propsData });
    const taskCardComponent = wrapper.find('[data-test="task-card-tags"]');
    expect(taskCardComponent.exists()).toBeTruthy();
  });

  it('does not render TaskCardTags component with no tags', () => {
    const propsData = {
      task: {
        ...task,
        tags: ''
      }
    };
    createComponent({ store, propsData });
    const taskCardComponent = wrapper.find('[data-test="task-card-tags"]');
    expect(taskCardComponent.exists()).toBeFalsy();
  });
});
